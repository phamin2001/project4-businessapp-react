import React, { Component } from 'react';
import { withRouter, Link} from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            businesses : []
        }
    }

    componentDidMount() {
        this.getUserBusinesses();
    }

    getUserBusinesses = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/' + this.props.loggedInUserId + '/businesses', {
                method       :   'GET',
                credentials  :   'include'
            });
    
            if(response.status != 200) {
                throw new Error("Something wrong!!");
            }

            const businessesParsed = await response.json();
            this.props.handleCompleteUserBusinessesInfo(businessesParsed);
            this.setState({
                businesses : businessesParsed
            })
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    deleteUser = async (e) => {
        try {
            let verify = window.confirm('Are you sure!!');

            if(verify) {
                const deleteUser = await fetch('http://localhost:8080/users/' + this.props.loggedInUserId, {
                    method        :  'DELETE',
                    credentials   :  'include'
                });

                const parsedResonse = await deleteUser.json();

                if(parsedResonse.status == 'OK') {
                    alert('Sorry! You Delete your profile.');
                    this.props.history.push('/');
                }
            } else {
                alert('Good Choice!');
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
    logOutUser = async (e) => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method          :   'POST',
                credentials     :   'include'
            });
            
            if(!response.ok) {
                throw Error("Something wrong with logout");
            }

            const parsedResponse = await response.json();
            if(parsedResponse.status == 200) {
                this.props.history.push('/');
            }
        
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    handleCurrentBusiness = (selectedBusiness) => {
        this.props.handleEditedBusiness(selectedBusiness);
    }

    render() {
        const userBusinessesList = this.state.businesses.map((business, i) => {
            return (
                <li onClick = {this.handleCurrentBusiness.bind(null, business)}>
                    <Link to={ {pathname: '/users/' + `${this.props.loggedInUserId}` + '/businesses/' + `${business.id}`} }> {business.name} ,  {business.location}</Link>
                </li>
            )

        })
        
        return(
            <div>
                <label>
                    <h2>Welcome: {this.props.loggedInUsername}</h2>
                </label><br/>
                <label>
                    <button name = 'edit' onClick = { () => this.props.history.push('/users/' + `${this.props.loggedInUserId}` + '/edit') } > Edit Your Profile</button><br/>
                </label>
                <label>
                    <button name = 'delete' onClick = {this.deleteUser} > Delete Your Profile</button><br/>
                </label>
                <label>
                    <button name = 'logout' onClick = {this.logOutUser} > Log Out</button><br/>
                </label>
                <label>
                    <h3>All User Businesses:  </h3>
                        {userBusinessesList}
                </label>
                <label> 
                    <h3><button onClick = { () => this.props.history.push('/users/' + `${this.props.loggedInUserId}` + '/businesses/newbusiness') }>Add New Business</button></h3>
                </label>
                <label>
                    <h2><button onClick = { () => this.props.history.push('/users/' + `${this.props.loggedInUserId}` + '/businesses/') }>Check Your Businesses</button></h2>
                </label>
            </div>
        )
    }
}

export default User;