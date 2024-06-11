import React from "react";
import {useSelector} from "react-redux";
import snakeHeadGif from "../../../../assets/snake-head-b654d306.gif";
import foodIcon from "../../../../assets/apple.webp"

const BoardCell = ({x, y}) => {
    const dataStore = useSelector(state => state.data);

    return (
        <div className="board_cell">
            {
                dataStore.map[x][y] === dataStore.SNAKE_HEAD_ID && <div className="snake">
                    <div className="snake_head" style={{transform: `rotate(${90 * dataStore.snakeDirection}deg)`}}><img
                        src={snakeHeadGif} alt="Snake Head"/></div>
                </div>
                ||
                dataStore.map[x][y] === dataStore.SNAKE_TAIL_ID && <div className="snake">
                    <div className="snake_body"></div>
                </div>
                ||
                dataStore.map[x][y] === dataStore.FOOD_ID &&
                <div><img src={foodIcon} className="foodApple" alt=""/></div>
            }
        </div>
    );
}

export default BoardCell;