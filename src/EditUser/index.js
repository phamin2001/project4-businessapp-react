import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class EditUser extends Component {
    constructor() {
        super();

        this.state = {
            username :  '',
            password :  ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const editResponse = await fetch('http://localhost:8080/users/' + this.props.loggedInUserId, {
                method         :  'PUT',
                credentials    :  'include',
                body           :  JSON.stringify(this.state),
                headers        :  {
                    'Content-type' : 'application/json'
                }
            })

            if(editResponse.status != 200) {
                throw Error('Something Wrong!!!');
            }

            const editParseUser = await editParseUser.json();
            console.log(editParseUser);


        
        } catch (err) {
            console.log(err);
            return err;        
        }
    }
 
    render() {
        return(
            <div>
                <div><Link to={ {pathname:'/users/' + `${this.props.loggedInUserId}`} }>Profile</Link></div>
                
                <form onSubmit={this.handleEditSubmit}>
                    <h1>Edit User</h1>
                    <label>
                        Username*:
                        <input type='text' name='username' placeholder={this.props.loggedInUsername} onChange={this.handleInput} />
                    </label>
                    <label>
                        Password*:
                        <input type='password' name='password' onChange={this.handleInput} />
                    </label>
                    <input type='Submit' />
                </form>
                
            </div>
        )
    }
}

export default EditUser;