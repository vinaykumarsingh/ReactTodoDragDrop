import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import HomeView from "../View/HomeView";

const HomeController = () => {
    const listsInController = useSelector(state => state.listReducer.lists, shallowEqual)

    return (
        <div className="listsContainer">
            <HomeView lists={listsInController} />
        </div>
    )
}
export default HomeController