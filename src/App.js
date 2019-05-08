import './App.css';
import React, { Component }  from 'react';
import { Route, Switch}      from 'react-router-dom';
import AuthenticationGateway from './AuthenticationGateway';
import Login                 from './Login';


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
    }
  }

  handleLogin = (loggedInUsername, loggedInUserId) => {
    this.setState({
      username : loggedInUsername,
      userId   : loggedInUserId
    })
  }



  render() {
    return (
      <main>
        <Switch>
          <Route exact path          =  '/'       component = { AuthenticationGateway } />
          <Route exact path          =  '/login'  
                       render        =  { (props) => ( <Login {...props}
                       handleLogin   =  {this.handleLogin} />)}
          />




        </Switch>
      </main>
    )
  }
}

export default App;
