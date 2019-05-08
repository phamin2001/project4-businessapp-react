import React, { Component } from 'react';

class User extends Component {
    

    render() {
        return(
            <div>
                <label>
                    <h2>Welcome: {this.props.loggedInUsername}</h2>
                </label><br/>
                <label>
                    <button name= 'edit' onClick = {() => this.props.history.push({`/users/${this.props.loggedInUserId}`})} 
                </label>
                
            </div>
        )
    }
}

export default User;