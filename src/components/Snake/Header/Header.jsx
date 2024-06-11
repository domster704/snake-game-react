import React from "react";
import menu_svg from "../../../assets/menu.svg";
import {useSelector} from "react-redux";

const Header = () => {
    const dataStore = useSelector(state => state.data);

    return (
        <header className="header_block">
            <div className="app_header"><span className="app_header_title">SNAKE</span></div>
            <div><span className="number_block">LIFE: {dataStore.life}</span></div>
        </header>
    );
}

export default Header;