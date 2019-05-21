import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

const yelp = require('yelp-fusion');

class Businesses extends Component {
    constructor(){
        super();

        this.state = {
            query             :  '',
            loading           :  true,
            searchBusinesses  :  [],
            name              :  '',
            location          :  ''
        }
    }




    handleChange = async (e) => {
        // console.log(e.target.value.split(" ")[0]);
        // console.log(e.target.value.split(" ")[1]);

        const apiKey = '<KgLAKJxptImNUckyyiY72zixbqz2g1DS3M0T-HiT3vxmBe45SlsJ6JnKwtAxdK452lLukwC2iOgFwQqmt5WVzOPQygE9oEadbtztsmWIE5TjFZA9icZr-zLwffLIXHYx>';
        
        const searchRequest = {
            term     : e.target.value.split(" ")[0],
            location : e.target.value.split(" ")[1]
        }

        const client = yelp.client(apiKey);

        try {
            // const response = await client.search(searchRequest, {
            //     method : 'no-cors'
            // });




            const response = await fetch('https://api.yelp.com/v3/businesses/search?term=' + 
                                        e.target.value.split(" ")[0] + '&location=' + e.target.value.split(" ")[1], {
                                        method         :   'GET',
                                        'mode'           :   'no-cors',
                                        headers        :  {
                                            'Authorization'  : 'Bearer apiKey'
                                        }
                                     });
                   
            console.log(response);

            // const parsedResponse = await response.json();
            // console.log(parsedResponse);
                              
        
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
                   
                </div>

                
                
            </div>
        )
    }

}

export default Businesses;