import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class Businesses extends Comment {
    constructor(){
        super();

        this.state = {
            query       :  '',
            loading     :  true,
            searchNews  :  [],
            name        :  '',
            location    :  ''
        }
    }




    handleChange = async (e) => {
        console.log(e)

        // try {
        //     const response = await fetch()
        //                       .url('https://api.yelp.com/v3/businesses/search?term=' + 
        //                                 this.state.name + '&location=' + this.state.location)
        
        // } catch (err) {
        //     console.log(err);
        //     return err;
        // }
    }

    render() {
        const userBusinesses = this.props.completeUserBusinessesInfo.loggedInUserBusinesses.map((business, i) => {
            return (
                <option value={business.name}>
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

                <div>
                   
                </div>
                
            </div>
        )
    }

}

export default Businesses;