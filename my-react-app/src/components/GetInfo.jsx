import React from 'react';
import AllOrders from './AllOrders';
import AllUsers from './AllUsers';
import jwt from 'jsonwebtoken'

export default class GetInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // tokenVar: false
        }
    }

    render() {

        return (
            <div className="App">
                {varCheck()}
                {localStorage.token ?
                    <div>
                        <AllOrders />
                        <hr />
                        <AllUsers />
                    </div> :
                    <div>{alert('you need to be loged in!')},{this.props.history.push('/login')}</div>
                }
            </div >
        );
    }
}

function varCheck() {
    const token = localStorage.token;
    const key = document.cookie.split('=');

    jwt.verify(token, key[1], (err, decoded) => {
        if (err) {
            console.log('_____verification failed');
            localStorage.removeItem("token");
            return alert('_____verification failed');
        }
    })
}