import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ButtonAppBar from '../src/components/ButtonAppBar';
import Register from '../src/components/Registration';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import AllOrders from './components/AllOrders';


export default function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <ButtonAppBar />

                <Switch>
                    <Route path="/orders" component={AllOrders} />
                    <Route path="/registration" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={Home} />
                </Switch>

            </BrowserRouter>
        </div>
    )
}

