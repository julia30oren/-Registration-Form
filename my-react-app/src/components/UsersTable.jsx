import React from 'react';

const UsersTable = (props) => {
    return (

        <tr>
            <td>{props.id_users}</td>
            <td>{props.email}</td>
            <td>{props.password}</td>
            <td>{props.first_name}</td>
            <td>{props.last_name}</td>
        </tr>

    )
}

export default UsersTable;
