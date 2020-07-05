import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from './actions/shared'
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'
import LoadingBar from "react-redux-loading";

import Header from './components/Header'
import Login from './components/Login'
import Logout from './components/Logout'
import Dashboard from './components/Dashboard'
import ViewQuestion from './components/ViewQuestion'
import NewQuestion from './components/NewQuestion'
import LeaderBoard from './components/LeaderBoard'
import PageNotFound from './components/PageNotFound'

class App extends React.Component {
  state = {
	tabIndex: 0
  }

  resetTabIndex = () => {
	  this.setState({ tabIndex: 0})
  }

  componentDidMount(){
	this.props.dispatch(handleInitialData());
  }

  handleTabChange = (e, data) => {
    this.setState({ tabIndex: data });
  };

  render(){
	console.log("App.js : ", this.props)
	const {authedUser} = this.props
	console.log(authedUser)

	if(!authedUser){
	  return (
		<BrowserRouter>
		  <Container>
			<Header />
			<Switch>
			  <Route path="/" component={Login} />
			</Switch>
		  </Container>
		</BrowserRouter>
	  )
	}

	return (
	  <BrowserRouter>
		<React.Fragment>
		  <LoadingBar style={{ zIndex: 1000 }} />
		  <Container>
		  <Header />
		  <Switch>
			<Route path="/" exact render={() => {
					return (
					  <Dashboard
						handleTabChange={this.handleTabChange}
						tabIndex={this.state.tabIndex}
					  />
					);
				  }} />
			<Route path="/questions/:questionId" component={ViewQuestion} />
			<Route path="/add" render={ history => {
				return <NewQuestion resetTabIndex={this.resetTabIndex} history={history.history} />
			}} />
			<Route path="/leaderboard" component={LeaderBoard} />
			<Route path="/logout" component={ Logout } />
			<Route path="/login" exact component={ Login } />
			<Route path="/404" exact component={ PageNotFound } />
			<Route path="/" component={ PageNotFound } />
		  </Switch>
		  </Container>
		</React.Fragment>
	  </BrowserRouter>
	);
  }
}

function mapStateToprops( { authedUser, questions } ){
  return {
	authedUser,
	questions,
  }
}

export default connect(mapStateToprops)(App);