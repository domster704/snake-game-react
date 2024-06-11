import React from 'react';
import {useDispatch} from "react-redux";
import Snake from "./components/Snake/Snake";
import {useLocation} from "react-router-dom";
import {setUserId} from "./store/dataSlice";
import {getUserInfo} from "./store/thunk";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const user_id = parseInt(queryParams.get('user_id'))
        dispatch(setUserId(user_id));
        dispatch(getUserInfo({
            user_id: user_id
        }))
    }, [location.search]);

    return (
        <div>
            <Snake/>
        </div>
    );
}

export default App;