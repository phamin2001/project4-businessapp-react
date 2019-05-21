import React, { Component } from 'react';
import SearchContainer      from '../SearchContainer';
import { Link }             from 'react-router-dom';

const yelp = require('yelp-fusion');

class Businesses extends Component {
    constructor(){
        super();

        this.state = {
            name              :  '',
            location          :  '',
            loading           :  true,
            searchBusinesses  :  []
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]  : e.target.value
        })
    }

    handleChange = async (e) => {

        const apiKey = 'KgLAKJxptImNUckyyiY72zixbqz2g1DS3M0T-HiT3vxmBe45SlsJ6JnKwtAxdK452lLukwC2iOgFwQqmt5WVzOPQygE9oEadbtztsmWIE5TjFZA9icZr-zLwffLIXHYx';
        
        const searchRequest = {
            term     : e.target.value.split(" ")[0],
            location : e.target.value.split(" ")[1]
        }

        const client = yelp.client(apiKey);

        try {

            const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + 
                                          e.target.value.split(" ")[0] + '&location=' + e.target.value.split(" ")[1], {
                                        method         :   'GET',
                                        headers        :  {
                                            'Authorization'  : `Bearer ${apiKey}`,
                                            'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Headers' : 'Content-Type',
                                            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
                                            'Access-Control-Allow-Credentials' : 'true'
                                        }
                                     });

            const parsedResponse = await response.json();
            console.log(parsedResponse);
            this.setState({
                searchBusinesses: parsedResponse,
                loading: false
            })

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const apiKey = 'KgLAKJxptImNUckyyiY72zixbqz2g1DS3M0T-HiT3vxmBe45SlsJ6JnKwtAxdK452lLukwC2iOgFwQqmt5WVzOPQygE9oEadbtztsmWIE5TjFZA9icZr-zLwffLIXHYx';

        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + 
                                            this.state.name + '&location=' + this.state.location, {
                                                method         :   'GET',
                                                headers        :  {
                                                    'Authorization'  : `Bearer ${apiKey}`,
                                                    'Access-Control-Allow-Origin': '*',
                                                    'Access-Control-Allow-Headers' : 'Content-Type',
                                                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
                                                    'Access-Control-Allow-Credentials' : 'true'
                                                }
                                            });

            const parsedResponse = await response.json();
            console.log(parsedResponse);
            this.setState({
                searchBusinesses: parsedResponse,
                loading: false
            })
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        const userBusinesses = this.props.completeUserBusinessesInfo.loggedInUserBusinesses.map((business, i) => {
            return (
                <option value={`${business.name} ${business.location}`}>
                    {business.name} {business.location}
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
                   <form onSubmit={this.handleSubmit} >
                        <lable>
                            <h2>Search Business Address:</h2>
                            Name: <input type='text' name='name' placeholder='Name of Business' onChange={this.handleInput} />
                            Location: <input type='text' name='location' placeholder='Location' onChange={this.handleInput} />
                        </lable>
                    <button type='submit'>Search</button>
                   </form>
                </div>

                <div>
                    {this.state.loading ? <span>Type in the searh box</span> : <SearchContainer searchBusinesses = {this.state.searchBusinesses} />}
                </div>

            </div>
        )
    }

}

export default Businesses;