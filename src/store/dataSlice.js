import {createSlice} from '@reduxjs/toolkit';
import {getUserInfo} from "./thunk";

export class Direction {
    static UP = 0;
    static RIGHT = 1;
    static DOWN = 2;
    static LEFT = 3;
    static None = 7;
}

export class GameStatus {
    static LIVE = 1;
    static GAME_OVER = 2;
}

let initialState = {
    user_id: null,

    EMPTY_CELL_ID: 0,
    SNAKE_HEAD_ID: 1,
    SNAKE_TAIL_ID: 2,
    FOOD_ID: 3,
    board: {
        width: 16,
        height: 16,
    },
    map: [[]],
    freeCells: [],
    foodPosition: null,
    balance: 0,
    life: 1,
    snakeHeadPosition: {
        x: 5,
        y: 5,
    },
    snakeTail: [{
        x: 5,
        y: 6,
    }, {
        x: 5,
        y: 7,
    }],
    snakeDirection: Direction.None,
    gameStatus: GameStatus.LIVE,
};

const reinitSnakeGame = (state) => {
    state.balance = 0;
    state.balance = 0;
    state.score = 0;
    state.snakeHeadPosition = {
        x: 5,
        y: 5,
    };
    state.snakeTail = [{
        x: 5,
        y: 6,
    }, {
        x: 5,
        y: 7,
    }];
    state.snakeDirection = Direction.None;
    state.gameStatus = GameStatus.LIVE;
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        moveSnake(state, action) {
            if (state.gameStatus === GameStatus.GAME_OVER) {
                reinitSnakeGame(state);
                return;
            }
            if (state.snakeDirection === Direction.None) {
                return;
            }

            function getNewPosition(pos) {
                switch (state.snakeDirection) {
                    case Direction.UP:
                        return {
                            x: pos.x - 1,
                            y: pos.y,
                        };
                    case Direction.RIGHT:
                        return {
                            x: pos.x,
                            y: pos.y + 1,
                        };
                    case Direction.DOWN:
                        return {
                            x: pos.x + 1,
                            y: pos.y,
                        };
                    case Direction.LEFT:
                        return {
                            x: pos.x,
                            y: pos.y - 1,
                        }
                    default: {
                        return {
                            x: pos.x,
                            y: pos.y,
                        };
                    }
                }
            }

            function minusLife(state) {
                state.gameStatus = GameStatus.GAME_OVER;
                state.life -= 1;
            }

            function checkGameOver(pos) {
                return pos.x >= state.board.width || pos.x < 0 || pos.y >= state.board.height || pos.y < 0;
            }

            if (checkGameOver(state.snakeHeadPosition)) {
                minusLife(state);
                return;
            }

            let prev_pos = state.snakeHeadPosition;
            // Новая позиция для головы змейки
            state.snakeHeadPosition = getNewPosition(state.snakeHeadPosition);

            // Передвигаем ячейки тела змеи на позицию вперед
            for (let i in state.snakeTail) {
                let prev_pos_local = state.snakeTail[i];

                // Проверка на поедание змейки самой же собой
                if (state.snakeHeadPosition.x === state.snakeTail[i].x &&
                    state.snakeHeadPosition.y === state.snakeTail[i].y) {
                    minusLife(state);
                    return;
                }

                state.snakeTail[i] = prev_pos;
                prev_pos = prev_pos_local;
            }

            // Проверка на поедание еды головой змейки
            if (state.snakeHeadPosition.x === state.foodPosition.x &&
                state.snakeHeadPosition.y === state.foodPosition.y) {
                state.balance += 1;

                state.foodPosition = null;
                state.snakeTail.push(prev_pos);
            }
            state.gameStatus = GameStatus.LIVE;
        },
        generateMap(state, action) {
            function generateFood(state) {
                const randomIndex = Math.floor(Math.random() * state.freeCells.length);
                state.foodPosition = state.freeCells[randomIndex];
                state.map[state.foodPosition.x][state.foodPosition.y] = state.FOOD_ID;
            }

            state.freeCells = [];
            for (let i = 0; i < state.board.width; i++) {
                state.map[i] = [];
                for (let j = 0; j < state.board.height; j++) {
                    if (state.foodPosition !== null && state.foodPosition.x === i && j === state.foodPosition.y) {
                        state.map[i][j] = state.FOOD_ID;
                        continue;
                    }
                    if (i === state.snakeHeadPosition.x && j === state.snakeHeadPosition.y) {
                        state.map[i][j] = state.SNAKE_HEAD_ID;
                        continue;
                    }
                    let flag = false;
                    for (let tailSnake of state.snakeTail) {
                        if (tailSnake.x === i && tailSnake.y === j) {
                            state.map[i][j] = state.SNAKE_TAIL_ID;
                            flag = true;
                            break;
                        }
                    }
                    if (flag) continue;
                    state.map[i][j] = state.EMPTY_CELL_ID;
                    state.freeCells.push({x: i, y: j});
                }
            }
            state.foodPosition === null && generateFood(state);
        },
        setSnakeDirection(state, action) {
            if (state.snakeDirection === Direction.UP && action.payload === Direction.DOWN ||
                state.snakeDirection === Direction.DOWN && action.payload === Direction.UP) {
                return;
            }
            if (state.snakeDirection === Direction.LEFT && action.payload === Direction.RIGHT ||
                state.snakeDirection === Direction.RIGHT && action.payload === Direction.LEFT) {
                return;
            }
            state.snakeDirection = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state, action) => {
                console.log(state, action);
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                console.log(state, action);
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.life = action.payload.life;
                state.balance = action.payload.balance;
                console.log(state, action);
            });
    }
});

export const {
    generateMap,
    setSnakeDirection,
    moveSnake,
    setUserId
} = dataSlice.actions;
export default dataSlice.reducer;