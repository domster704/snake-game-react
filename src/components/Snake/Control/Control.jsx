import React from "react";
import arrow_top from "../../../assets/arrow-top.svg"
import arrow_left from "../../../assets/arrow-left.svg"
import arrow_bottom from "../../../assets/arrow-bottom.svg"
import arrow_right from "../../../assets/arrow-right.svg"
import arrow_center from "../../../assets/arrow-center.svg"
import {useDispatch, useSelector} from "react-redux";
import {Direction, setSnakeDirection} from "../../../store/dataSlice";


const Control = (props) => {
    const dataStore = useSelector(state => state.data);
    const dispatch = useDispatch();

    const onClick = (e, direction) => {
        dispatch(setSnakeDirection(direction));
    }

    return (
        <div className="control_container">
            <div className="controls">
                <button
                    onClick={(e) => onClick(e, Direction.UP)}>
                    <img className="icon-button" src={arrow_top} alt="Top"/>
                </button>
                <div>
                    <button
                        onClick={(e) => onClick(e, Direction.LEFT)}>
                        <img className="icon-button" src={arrow_left} alt="Left"/></button>
                    <button
                        onClick={(e) => {
                            if (dataStore.snakeDirection !== Direction.None) {
                                return;
                            }
                            onClick(e, Direction.LEFT)
                        }}>
                        <img className="icon-button" src={arrow_center} alt="Start"/></button>
                    <button
                        onClick={(e) => onClick(e, Direction.RIGHT)}>
                        <img className="icon-button" src={arrow_right} alt="Right"/></button>
                </div>
                <button
                    onClick={(e) => onClick(e, Direction.DOWN)}>
                    <img className="icon-button" src={arrow_bottom} alt="Bottom"/></button>
            </div>
        </div>
    );
}

export default Control;