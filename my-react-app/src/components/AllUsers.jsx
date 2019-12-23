import React from 'react';
import axios from 'axios';
import '../App.css';
import UsersTable from './UsersTable';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const usersUrl = "http://localhost:5000/users";
const usersByNameUrl = "http://localhost:5000/users/byName";

export default class AllOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: '',
            name: '',
            ResByName: ''
        }
    }

    handleGetAllUsers = async () => {
        if (localStorage.token) {
            const resultAll = await axios.get(usersUrl);
            this.setState({ users: resultAll.data });
            this.setState({ ResByName: '' });
        }
    }

    handleOnChange = (e) => {
        const { target } = e;
        this.setState({ name: target.value });
        // console.log(target.value)
    }

    handleSearch = async () => {
        console.log("click", usersByNameUrl, { name: this.state.name })
        const result = await axios.post(usersByNameUrl, { name: this.state.name });
        this.setState({ ResByName: result.data });
        this.setState({ users: '' });
    }

    handleClearState = () => {
        this.setState({ users: '' });
        this.setState({ ResByName: '' });
    }

    render() {
        return (
            <div className="App">
                {varCheck()}
                <div className='get'>
                    <form>
                        <div className="form-group row">
                            <div className="col">
                                {/* <label htmlFor="name">User by Name</label> */}
                                <input type="text" name="name" className="form-control" id="name" placeholder="Search Users By Name"
                                    onChange={this.handleOnChange} />
                            </div>

                            <div className="col">
                                <button type="button" className="btn btn-info"
                                    onClick={this.handleSearch}>Search</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-info"
                                    onClick={this.handleGetAllUsers}>Get All Users</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary"
                                    onClick={this.handleClearState}>X</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="searchRes">
                    <div>
                        {this.state.users === '' && localStorage.token ?
                            <div></div> :
                            <div>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">User_Id</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">First_name</th>
                                            <th scope="col">Last_name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.users.map((user, k) => {
                                            return (
                                                < UsersTable key={k}
                                                    id_users={user.id_users}
                                                    email={user.email}
                                                    password={user.password}
                                                    first_name={user.first_name}
                                                    last_name={user.last_name}
                                                />
                                            )
                                        })
                                        }
                                    </tbody >
                                </table >
                            </div>}
                        <div>
                            {this.state.ResByName.length === 0 && localStorage.token ?
                                <div></div> :
                                <div>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">User_Id</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Password</th>
                                                <th scope="col">First_name</th>
                                                <th scope="col">Last_name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.ResByName.map((user, k) => {
                                                return (
                                                    < UsersTable key={k}
                                                        id_users={user.id_users}
                                                        email={user.email}
                                                        password={user.password}
                                                        first_name={user.first_name}
                                                        last_name={user.last_name}
                                                    />
                                                )
                                            })
                                            }
                                        </tbody >
                                    </table >
                                </div>}
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

function varCheck() {
    const token = localStorage.token;
    jwt.verify(token, 'ghjd23_jhbbgv54', (err, decoded) => {
        if (err) {
            localStorage.removeItem("token");
            alert('_____verification failed');
            return <Redirect to="/login" />
        }
    })
}