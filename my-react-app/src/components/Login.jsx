import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const loginUrl = "http://localhost:5000/login";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnChange = (e) => {

        const { target } = e;
        this.setState({ [target.name]: target.value });
        console.log(target.value)
    }

    handleRegister = async () => {
        console.log("click", loginUrl, this.state)
        const result = await axios.post(loginUrl, this.state);
        const { message, redirect, token, cookie_token } = result.data;
        alert(message);
        if (redirect && token) {

            localStorage.setItem("token", token)
            // save to cookies
            document.cookie = `cookie_token = ${cookie_token}`;
            this.props.history.push('/info')
        } else {
            alert('user in not loged in');
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Login</h1>
                <div className="loginForm">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email"
                                onChange={this.handleOnChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Password"
                                onChange={this.handleOnChange} />
                        </div>

                        <button type="button" className="btn btn-success btn-block loginBut"
                            onClick={this.handleRegister}>Submit</button>
                    </form>

                    <div className="NavBar logLink">
                        <Link to="/passwordChenge"> Chenge Password </Link> /
                    <Link to="/registration"> Registration </Link>
                    </div>
                </div>
            </div>
        );
    }
}

