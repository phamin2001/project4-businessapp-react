import React, { Component } from 'react';
import { withRouter, Link} from 'react-router-dom';

class EditBusiness extends Component {
    constructor() {
        super();

        this.state = {
            name:     '',
            location: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]  : e.target.value
        })
    }

    handleEditBusiness = async (e) => {
        e.preventDefault();

        try {
            const editResponse = await fetch(`${process.env.REACT_APP_BACKEND}` + 'users/' + this.props.loggedInUserId + '/businesses/' + this.props.editedBusiness.id, {
                // 'http://localhost:8080/'
            
                method        :  'PUT',
                credentials   :  'include',
                body          :  JSON.stringify(this.state),
                headers       : {
                    'Content-type'  :  'application/json'
                }
            });

            if(!editResponse.ok) {
                throw Error(editResponse.statusText)
            }

            const parsedEditResponse = await editResponse.json();

            this.props.handleEditedBusiness(parsedEditResponse);
            this.props.history.push('/users/' + this.props.loggedInUserId);

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    render() {
        return(
            <div>
                <div><Link to={ {pathname:'/users/' + `${this.props.loggedInUserId}`} }>Businesses</Link></div>

                <form onSubmit={this.handleEditBusiness}>
                    <h1>Edit Topic: </h1>
                    <label>
                        Name*
                        <input type='text' name='name' placeholder={this.props.editedBusiness.name} onChange={this.handleInput} />
                    </label><br/>
                    <label>
                        Location*
                        <input type='text' name='location' placeholder={this.props.editedBusiness.location} onChange={this.handleInput} />
                    </label><br/>
                    <input type='Submit' /><br/>
                </form><br/>

                (* is required)

            </div>
        )
    }
}

export default EditBusiness;