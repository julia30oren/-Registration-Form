import React from 'react';
import axios from 'axios';

const registerUrl = "http://localhost:5000/registration";

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confPass: '',
      F_name: '',
      L_name: ''
    }
  }

  handleOnChange = (e) => {

    const { target } = e;
    this.setState({ [target.name]: target.value });
    console.log(target.value)

  }

  handleRegister = async () => {
    if (this.state.password === this.state.confPass) {
      console.log("click", registerUrl, this.state.email, this.state.password, this.state.F_name, this.state.L_name)
      const result = await axios.post(registerUrl, { email: this.state.email, password: this.state.password, F_name: this.state.F_name, L_name: this.state.L_name });
      const { message, redirect } = result.data;
      alert(message);
      if (redirect === true) {
        console.log('-- redirect true');
        this.props.history.push('/login')
      }
    } else {
      alert('passwords does not match');
    }
  }


  render() {
    return (
      <div className="App">
        <h1>Registration</h1>
        <div className="loginForm">

          <form>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email"
                onChange={this.handleOnChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password must contain only 4 digits!</label>
              <input type="password" name="password" className="form-control" id="password" placeholder="Password"
                onChange={this.handleOnChange} />
            </div>

            <div className="form-group">
              <label htmlFor="confPass"> Password Confirmation</label>
              <input type="password" name="confPass" className="form-control" id="confPass" placeholder="Password"
                onChange={this.handleOnChange} />
            </div>

            <div className="form-group">
              <label htmlFor="F_name">First name must contain only letters and not less than two.</label>
              <input type="text" name="F_name" className="form-control" id="F_name" placeholder="First name"
                onChange={this.handleOnChange} />
            </div>

            <div className="form-group">
              <label htmlFor="L_name">Last name must contain only letters and not less than two.</label>
              <input type="text" name="L_name" className="form-control" id="L_name" placeholder="Last name"
                onChange={this.handleOnChange} />
            </div>

            <button type="button" className="btn btn-success btn-block loginBut"
              onClick={this.handleRegister}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}