import React from 'react';
import axios from 'axios';

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
        const { message, redirect, token } = result.data;
        alert(message);
        if (redirect && token) {
            this.state.token = token;
            this.props.history.push('/orders')
        }
        console.log(this.state)
    }




    render() {
        return (
            <div className="App">
                <h1>Login</h1>

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

                    <button type="button" className="btn btn-primary"
                        onClick={this.handleRegister}>Submit</button>
                </form>
            </div>
        );
    }
}

