import React from 'react';

const OrdersTable = (props) => {
  return (

    <tr>
      <td>{props.id}</td>
      <td>{props.employee_id}</td>
      <td>{props.customer_id}</td>
      <td>{props.ship_name}</td>
      <td>{props.ship_address}</td>
      <td>{props.ship_city}</td>
      <td>{props.ship_country_region}</td>
      <td>{props.shipping_fee}</td>
      <td>{props.payment_type}</td>
    </tr>

  )
}

export default OrdersTable;
