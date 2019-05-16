import './App.css';
import React, { Component }  from   'react';
import { Route, Switch}      from   'react-router-dom';
import AuthenticationGateway from   './AuthenticationGateway';
import Login                 from   './Login';
import User                  from   './User';
import EditBusiness          from   './EditBusiness';
import Registration          from   './Registration';
import EditUser              from   './EditUser';
import Businesses            from   './Businesses';
import NewBusiness           from   './NewBusiness';


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

  handleEditedBusiness = (business) => {
    this.setState({
      editedBusiness : business
    })
  }

  render() {
    const handleUserId      = this.state.userId;
    const handleBusinessId  = this.state.editedBusiness.id;

    return (
      <main>
        <Switch>
          <Route exact path                               =  '/'       component = { AuthenticationGateway } />
          <Route exact path                               =  '/login'  
                       render                             =  { (props) => ( <Login {...props}
                       handleLogin                        =  {this.handleLogin} />)}
          />
          <Route exact path                               =  '/register'
                       render                             =  { (props) => ( <Registration {...props}
                       handleLogin                        =  {this.handleLogin} />)}
          />
          <Route exact path                               =  '/users/:handleUserId'
                       render                             =  { (props) => ( <User {...props}
                       loggedInUsername                   =  {this.state.username}
                       loggedInUserId                     =  {this.state.userId}
                       handleCompleteUserBusinessesInfo   =  {this.handleCompleteUserBusinessesInfo} 
                       handleEditedBusiness               =  {this.handleEditedBusiness} />)} 
          />
          <Route exact path                               =  '/users/:handleUserId/edit'
                       render                             =  { (props) => ( <EditUser {...props}
                       loggedInUsername                   =  {this.state.username}
                       loggedInUserId                     =  {this.state.userId} 
                       handleLogin                        =  {this.handleLogin} />)}
          />

          <Route exact path                               =  '/users/:handleUserId/businesses/newbusiness'
                       render                             =  { (props) => ( <NewBusiness {...props} 
                       loggedInUserId                     =  {this.state.userId} />)}
          />


          <Route exact path                               =  '/users/:handleUserId/businesses/:handleBusinessId'
                       render                             =  { (props) => ( <EditBusiness {...props}
                       loggedInUsername                   =  {this.state.username}
                       loggedInUserId                     =  {this.state.userId}
                       editedBusiness                     =  {this.state.editedBusiness} 
                       handleEditedBusiness               =  {this.handleEditedBusiness} />)} 
          />
          <Route exact path                               =  '/users/:handleUserId/businesses'
                       render                             =  { (props) => ( <Businesses {...props} 
                       loggedInUsername                   =  {this.state.username}
                       loggedInUserId                     =  {this.state.userId} 
                       completeUserBusinessesInfo         =  {this.state.completeUserBusinessesInfo} />)}
          />
      

          <Route component = { My404 } />

        </Switch>
      </main>
    )
  }
}

export default App;
