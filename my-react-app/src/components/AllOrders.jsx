import React from 'react';
import axios from 'axios';
import '../App.css';
import UsersTable from './UsersTable';
import OrdersTable from './OrdersTable';

const ordersUrl = "http://localhost:5000/orders";
const usersUrl = "http://localhost:5000/users";


export default class AllOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: '',
            users: ''
        }
    }

    handleGetAllOrders = async () => {
        const result = await axios.get(ordersUrl);
        this.setState({ orders: result.data })
        // console.log(this.state)
    }

    handleGetAllUsers = async () => {
        const result = await axios.get(usersUrl);
        this.setState({ users: result.data })
        // console.log(this.state)
    }

    render() {
        // console.log(this.state)
        return (
            <div className="App">
                <div className='getBTN'>{this.state.orders === '' ?
                    <div className='getAllBtn'><button type="button" className="btn btn-primary" onClick={this.handleGetAllOrders}>Get All Orders</button></div> :
                    // <div className="table"><p>{JSON.stringify(this.state.orders)}</p>< OrdersTable /></div>}
                    <div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Order_Id</th>
                                    <th scope="col">Employee_Id</th>
                                    <th scope="col">Customer_Id</th>
                                    <th scope="col">Ship_Name</th>
                                    <th scope="col">Ship_Address</th>
                                    <th scope="col">Ship_City</th>
                                    <th scope="col">Ship_Country_Region</th>
                                    <th scope="col">Shipping_Fee</th>
                                    <th scope="col">Payment_Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((order, i) => {
                                    return (
                                        < OrdersTable key={i}
                                            id={order.id}
                                            employee_id={order.employee_id}
                                            customer_id={order.customer_id}
                                            ship_name={order.ship_name}
                                            ship_address={order.ship_address}
                                            ship_city={order.ship_city}
                                            ship_country_region={order.ship_country_region}
                                            shipping_fee={order.shipping_fee}
                                            payment_type={order.payment_type}
                                        />
                                    )
                                })}
                            </tbody >
                        </table >
                    </div>}
                </div>
                <div className='getBTN'>{this.state.users === '' ?
                    <div className='getAllBtn'><button type="button" className="btn btn-primary" onClick={this.handleGetAllUsers}>Get All Users</button></div> :
                    // <div className="table"><p>{JSON.stringify(this.state.users)}</p></div>}
                    <div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">User_Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">First_name</th>
                                    <th scope="col">Last_name</th>
                                    <th scope="col">Token</th>
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
                                            token={user.token}
                                        />
                                    )
                                })}
                            </tbody >
                        </table >
                    </div>}
                </div>
            </div >
        );
    }
}

