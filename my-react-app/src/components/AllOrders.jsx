import React from 'react';
import axios from 'axios';
import '../App.css';
import OrdersTable from './OrdersTable';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const ordersUrl = "http://localhost:5000/orders";
const ordersSortUrl = "http://localhost:5000/orders/sortBy";

export default class AllOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: '',
            ship_city: '',
            payment_type: '',
            sortedOrders: '',
            // paymentOptions: ''
        }
    }

    handleGetAllOrders = async () => {
        const result = await axios.get(ordersUrl, this.state.token);
        this.setState({ orders: result.data });
        this.setState({ sortedOrders: '' });
    }

    handleChoise = (e) => {
        const { target } = e;
        this.setState({ [target.name]: target.value });
    }

    handleSort = async () => {
        console.log("click", ordersSortUrl, { ship_city: this.state.ship_city, payment_type: this.state.payment_type });
        const result = await axios.post(ordersSortUrl, { ship_city: this.state.ship_city, payment_type: this.state.payment_type });
        console.log(result)
        this.setState({ sortedOrders: result.data });
        this.setState({ orders: '' });
    }

    handleClearState = () => {
        this.setState({ orders: '' });
        this.setState({ sortedOrders: '' });
    }

    render() {
        console.log(this.state)

        return (
            <div className="App">
                {varCheck()}

                <div className='get'>
                    <form>
                        <div className="form-group row">
                            <div className="col">
                                {/* <label htmlFor="ship_city">City select</label> */}
                                <select className="form-control" id="ship_city" name="ship_city" onChange={this.handleChoise}>
                                    <option defaultValue="selected">City select</option>
                                    <option>Boise</option>
                                    <option>Chicago</option>
                                    <option>Denver</option>
                                    <option>Las Vegas</option>
                                </select>
                            </div>

                            <div className="col">
                                {/* <label htmlFor="payment_type">Payment Type select</label> */}
                                <select className="form-control" id="payment_type" name="payment_type" onChange={this.handleChoise}>
                                    <option defaultValue="selected">Payment Type select</option>
                                    <option>Check</option>
                                    <option>Credit Card</option>
                                    <option>Cash</option>
                                </select>
                            </div>

                            <div className="col">
                                <button type="button" className="btn btn-warning"
                                    onClick={this.handleSort}>Search</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-warning"
                                    onClick={this.handleGetAllOrders}>Get All Orders</button>
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
                        {this.state.orders === '' && localStorage.token ?
                            <div className='getAllBtn'></div> :
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
                    <div>
                        {this.state.sortedOrders.length === 0 && localStorage.token ?
                            <div></div> :
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
                                        {this.state.sortedOrders.map((order, i) => {
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
                </div >

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