import React from "react";
import coin_icon from "../../../assets/coin-icon.svg";
import {useSelector} from "react-redux";

const Balance = () => {
    const dataStore = useSelector(state => state.data);

    return (
        <div className="balance_container">
            <div className="score_container">
                <span className="balance_title">balance</span>
                <div className="balance_block"><span className="number_block">{dataStore.balance}</span><img
                    className="coin_icon" src={coin_icon} alt="score"/></div>
            </div>
        </div>
    );
}

export default Balance;