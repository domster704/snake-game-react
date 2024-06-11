import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Direction, generateMap, moveSnake, setSnakeDirection} from "../../../store/dataSlice";
import BoardCell from "./BoardCell/BoardCell";

const DIRECTION_KEYS = {
    'ArrowDown': Direction.DOWN,
    's': Direction.DOWN,
    'ArrowUp': Direction.UP,
    'w': Direction.UP,
    'ArrowLeft': Direction.LEFT,
    'a': Direction.LEFT,
    'ArrowRight': Direction.RIGHT,
    'd': Direction.RIGHT,
}

let intervalGame = null;

const Board = () => {
    const dataStore = useSelector(state => state.data);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(generateMap());

        document.addEventListener('keydown', (e) => {
            if (!DIRECTION_KEYS.hasOwnProperty(e.key)) {
                return;
            }
            dispatch(setSnakeDirection(DIRECTION_KEYS[e.key]));
        });

        return document.removeEventListener('keydown', null);
    }, [])

    React.useEffect(() => {
        if (dataStore.life === 0) {
            alert('You are out of lives');
            intervalGame !== null && clearInterval(intervalGame);
            return;
        }
        intervalGame = setInterval(() => {
            dispatch(moveSnake());
            dispatch(generateMap());
        }, 400)
    }, [dataStore.life])

    return (
        <div className="board_container">
            <div className="board_gridBox">
                {
                    dataStore.map.map((row, indexRow) => {
                        return <div className="board_row" key={indexRow}>
                            {
                                row.map((col, index) => {
                                    return <BoardCell
                                        x={indexRow}
                                        y={index}
                                        key={`${indexRow}_${index}`}
                                    />
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Board;