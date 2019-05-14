import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class Businesses extends Comment {
    constructor(){
        super();

        this.state = {
            query       :  '',
            loading     :  true,
            searchNews  :  []
        }
    }




    handleChange = async (e) => {
        try {
            const response = await fetch
        
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        const userBusinesses = this.props.completeUserBusinessesInfo.loggedInUserBusinesses.map((business, i) => {
            return (
                <option value={topic.title}>
                    {business.name}, {business.location}
                </option>
            )
        })
        
        return(
            <div>
                <div><Link to={ {pathname:'/users/' + `${this.props.loggedInUserId}`} }>Profile</Link></div>

                <label>
                    <h1>Select Your Favorite Topics:</h1>
                    <select onChange={this.handleChange}>
                        <option>Please Select</option>
                        {userBusinesses}
                    </select>
                </label>
                
            </div>
        )
    }

}