import './App.css';
import React, { Component }  from 'react';
import { Route, Switch}      from 'react-router-dom';
import AuthenticationGateway from './AuthenticationGateway';
import Login                 from './Login';
import User                  from  './User';


const My404 = () => {
  return (
    <div>
      You are lost!!!
    </div>
  )
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      username : '',
      userId   : '',
      completeUserBusinessesInfo : {
        loggedInUserBusinesses  :  []
      },
      editedBusiness : {}
    }
  }

  handleLogin = (loggedInUsername, loggedInUserId) => {
    this.setState({
      username : loggedInUsername,
      userId   : loggedInUserId
    })
  }

  handleCompleteUserBusinessesInfo = (businessesParsed) => {
    this.setState({
      completeUserBusinessesInfo : {
        loggedInUserBusinesses : businessesParsed
      }
    })
  }

  handleEditedBusiiness = (business) => {
    this.setState({
      editedBusiness : business
    })
  }

  render() {
    const { handleUserId }    = this.state.userId;
    const { handleBusinessId} = this.state.editedBusiness.id;

    return (
      <main>
        <Switch>
          <Route exact path                               =  '/'       component = { AuthenticationGateway } />
          <Route exact path                               =  '/login'  
                       render                             =  { (props) => ( <Login {...props}
                       handleLogin                        =  {this.handleLogin} />)}
          />
          <Route exact path                               =  '/users/:handleUserId'
                       render                             =  { (props) => ( <User {...props}
                       loggedInUsername                   =  {this.state.username}
                       loggedInUserId                     =  {this.state.userId}
                       handleCompleteUserBusinessesInfo   =  {this.handleCompleteUserBusinessesInfo} 
                       handleEditedBusiiness              =  {this.handleEditedBusiiness} />)} 
          />
          <Route exact path                               =  '/users/:handleUserId/businesses/:handleBusinessId' component = { EditBusiness} />




        </Switch>
      </main>
    )
  }
}

export default App;
