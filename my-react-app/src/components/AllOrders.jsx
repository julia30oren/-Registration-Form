import React from 'react';
import axios from 'axios';
import OrdersTable from './OrdersTable';

const loginUrl = "http://localhost:5000/orders";

export default class AllOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: ''
        }
    }

    handleGetAllOrders = async () => {
        const result = await axios.get(loginUrl);
        this.setState({ orders: result.data })
        // console.log(this.state)
    }

    render() {
        // console.log(this.state)
        return (
            <div className="App">
                <div>{this.state.orders === '' ?
                    <div><button type="button" className="btn btn-primary" onClick={this.handleGetAllOrders}>Get All Orders</button></div> :
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
            </div >
        );
    }
}

