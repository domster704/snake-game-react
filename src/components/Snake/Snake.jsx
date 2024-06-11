import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {generateMap} from "../../store/dataSlice";
import Control from "./Control/Control";
import Balance from "./Balance/Balance";
import Header from "./Header/Header";
import Board from "./Board/Board";

const Snake = () => {
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(generateMap());
    }, [])

    return (
        <div className="main_container">
            <Header/>
            <div className="app_container">
                <Board/>
                <Balance/>
            </div>
            {/*<div className={style.boardBlock}>*/}
            {/*    <div className={style.header}>*/}
            {/*        <img src={menu_svg} alt="" width={50} height={50}/>*/}

            {/*    </div>*/}

            {/*    <div className={style.board} style={{*/}
            {/*        gridTemplateColumns: `repeat(${data.board.width}, 2em)`,*/}
            {/*        gridTemplateRows: `repeat(${data.board.height}, 2em)`*/}
            {/*    }}>*/}
            {/*        {*/}
            {/*            data.map.map((row, indexRow) => {*/}
            {/*                return row.map((cell, index) => {*/}
            {/*                    return <BoardCell key={`${indexRow}_${index}`} cell={cell}/>*/}
            {/*                })*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Control/>
        </div>
    );
}

export default Snake;