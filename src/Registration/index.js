import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            username : '',
            password : ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const registerResponse = await fetch('http://localhost:8080/users/register', {
                method       :  'POST',
                credentials  :  'include',
                body         :  JSON.stringify(this.state),
                headers      :  {
                    'Content-type'  :  'application/json'
                }  
            });
            console.log(registerResponse);
            if(!registerResponse.ok) {
                throw new Error("Something Wrong!");
            }

            const parsedRegisterResponse = await registerResponse.json();

            if(parsedRegisterResponse.logged == true) {
                this.props.handleLogin(parsedRegisterResponse.username, parsedRegisterResponse.userId);
                this.props.history.push('/users/' + parsedRegisterResponse.userId);
            } else {
                alert('Username eists or Credintional is wrong. Try again.');
                this.props.history.push('/register/');
            }        
        } catch (err) {
            console.log(err);
            return err;        
        }
    }

    render() {
        return(
            <div>
                <div><Link to={ {pathname:'/'} }>Home</Link></div>

                <form onSubmit={this.handleRegisterSubmit}>
                    <h1>Create User</h1>
                    <lable>
                        Username:
                        <input type='text' name='username' placeholder='Username' required onChange={this.handleInput} />
                    </lable>
                    <lable>
                        Password:
                        <input type='password' name='password' placeholder='Password'  onChange={this.handleInput} />
                    </lable>
                    <input type='Submit' />
                </form>
            </div>
        )
    }
}

export default Registration;