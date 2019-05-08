import React, { Component } from 'react';
import { throwStatement } from '@babel/types';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username            : '',
            password            : '',
            parsedLoginResponse : []
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }



    render() {
        return(
            <div>
                <form onSubmit={this.hadnleLoginSubmit}>
                    <h1>Login</h1>
                    <label>
                        Username:
                        <input type='text' name='username' placehodler='Username' onChange={this.handleInput}/>
                    </label>
                    <lable>
                        Password:
                        <input type='password' name='password' placeholder='Password' onChange={this.handleInput}/>
                    </lable>
                    <input type='Submit' />
                </form><br/>
            </div>
        )
    }
}

export default Login;