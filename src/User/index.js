import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);

    }
    
    logOutUser = async (e) => {
        try {
            const response = await fetch('http://localhost:8080/login/logout', {
                method          :   'POST',
                credentials     :   'include'
            });

            console.log(response);

        
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        
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
                {/* <label>
                    <h3>All User Businesses: <Link to={ {pathname: '/users/' + `${this.props.loggedInUserId}` + '/businesses'} }>{userBusinessesList}</Link></h3>
                </label> */}
                <label> 
                    <h3><button onClick = { () => this.props.history.push('/users/' + `${this.props.loggedInUserId}` + '/businesses/newbusiness') }>Add New Business</button></h3>
                </label>
                <label>
                    <h2><button onClick = { () => this.props.history.push('/users/' + `${this.props.loggedInUserId}` + '/business/search') }>Check Your Businesses</button></h2>
                </label>
            </div>
        )
    }
}

export default User;