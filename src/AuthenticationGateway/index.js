import React, { Component } from 'react';

class AuthenticationGateway extends Component {

    render() {
        return(
            <div>
                <lable>
                    <h1>Welcome to Business App</h1>
                    <h2>Please Login or Create your Profile:</h2>
                </lable>
                <div><button name = 'login'     onClick={() => this.props.history.push('/login')}>Login</button></div>
                <div><button name = 'register'  onClick={() => this.props.history.push('/register')}>Create User</button></div>
            </div>
        )
    }
}

export default AuthenticationGateway;