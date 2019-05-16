import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isParenthesizedExpression } from '@babel/types';

class NewBusiness extends Component {
    constructor() {
        super();

        this.state = {
            name      : '',
            location  : ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleNewBusinessSubmit = async (e) => {

        console.log('here');

        e.preventDefault();

        try {
            const newBusinessResponse = await fetch('http://localhost:8080/users/' + this.props.loggedInUserId + '/businesses', {
                method        :  'POST',
                credentials   :  'include',
                body          :  JSON.stringify(this.state),
                headers       :  {
                    'Content-type' : 'application/json'
                }
            });

            if(!newBusinessResponse.ok) {
                alert('Somethign wrong or user already has this business in this location!');
                this.props.history.push('/user/' + this.props.loggedInUserId + '/businesses/newbusiness');
            }

            const parsedNewBusinessResponse = await newBusinessResponse.json();
            this.props.history.push('/users/' + this.props.loggedInUserId);

        
        } catch (err) {
            console.log(err);
            return err;        
        }
    }
 
    render() {
        return(
            <div>
                <div><Link to={ {pathname:'/users/' + `${this.props.loggedInUserId}`} }>Profile</Link></div>

                <form onSubmit={this.handleNewBusinessSubmit}>
                    <h1>New Business</h1>
                    <label>
                        Name:
                        <input type='text' name='name' onChange={this.handleInput} />
                    </label>
                    <lable>
                        Location:
                        <input type='text' name='location' onChange={this.handleInput} />
                    </lable>
                    <input type='Submit' />

                </form>
            </div>
        )
    }
}

export default NewBusiness;