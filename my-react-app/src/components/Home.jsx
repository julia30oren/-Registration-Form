import React from 'react';
import mainAxios from "../axios/mainAxias"


export default function Home() {

    const callServer = async () => {

        console.log("request sent to server");
        const result = await mainAxios.get("test")
        console.log(result)
    }

    return <div>
        <h1> Home Page </h1>
        <button onClick={callServer}>  Call server </button>
    </div>
}