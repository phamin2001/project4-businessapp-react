import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username            : '',
            password            : ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    hadnleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await fetch('http://localhost:8080/users/login', {
                method       :  'POST',
                credentials  :  'include',
                body         :   JSON.stringify(this.state),
                headers      :   {
                    'Content-type' : 'application/json'
                }
            });
            console.log(loginResponse);

            if(loginResponse.status != 200) {
                throw new Error("Invalid User!!");
            }

            const parsedLoginResponse = await loginResponse.json();
            // console.log(parsedLoginResponse)
            
            if(parsedLoginResponse.logged) {
                this.props.handleLogin(parsedLoginResponse.username, parsedLoginResponse.userId);
                this.props.history.push('/users/' + parsedLoginResponse.userId);
            } else {
                alert('something wrong, try again.');
                this.props.history.push('/login');
            }
        } catch (err) {
            console.log(err);
            return err;
        }
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