import React from 'react';
import axios from 'axios';

const chengePassUrl = "http://localhost:5000/login/PasswordChenge";

export default class PasswordChenge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            newpass: '',
            confpass: ''
        }
    }


    handleOnChange = (e) => {

        const { target } = e;
        this.setState({ [target.name]: target.value });
        console.log(target.value)
    }

    handleChengePass = async () => {
        if (this.state.newpass === this.state.confpass) {
            console.log("click", chengePassUrl, { email: this.state.email, password: this.state.password, newpass: this.state.newpass })

            const result = await axios.post(chengePassUrl, { email: this.state.email, password: this.state.password, newpass: this.state.newpass });
            const { message, redirect } = result.data;
            alert(message);
            if (redirect) {
                this.props.history.push('/login')
            }
        } else {
            alert('passwords does not match');
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Password Chenge</h1>
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

                        <div className="form-group">
                            <label htmlFor="newpass">New Password</label>
                            <input type="password" name="newpass" className="form-control" id="newpass" placeholder="New Password"
                                onChange={this.handleOnChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confpass">Password Confirmation</label>
                            <input type="password" name="confpass" className="form-control" id="confpass" placeholder="Password Confirmation"
                                onChange={this.handleOnChange} />
                        </div>

                        <button type="button" className="btn btn-success btn-block loginBut"
                            onClick={this.handleChengePass}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

