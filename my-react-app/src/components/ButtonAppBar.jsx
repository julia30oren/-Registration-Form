import React from "react";
import { Link } from "react-router-dom";


export default function ButtonAppBar() {

    return (
        <div className="NavBar">
            <Link to="/home">Home / </Link>
            <Link to="/registration">Registration / </Link>
            <Link to="/login">Login / </Link>
        </div>
    );
}