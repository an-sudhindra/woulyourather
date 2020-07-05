import React from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Card, CardHeader, CardContent, CardActions, Button, Grid, Select } from '@material-ui/core'

// import './../css/card.css'
import './../css/button.css'

class Login extends React.Component {
	state = {
		selectedUser: null,
	}
	referrer = null

	componentDidMount(){
		const {
			history,
			location: { pathname }
		} = this.props;
		this.referrer = pathname;
		history.push("/login");
	}

	handleUserChange = (event) => {
		this.setState({ selectedUser: event.target.value})
	}

	handleLogin = () => {
		const { history } = this.props;
		this.props.setAuthedUser(this.state.selectedUser)
		if (this.referrer === "/logout" || this.referrer === "/login") {
			history.push("/")
		} else {
			history.push(this.referrer)
		}
	}

	render(){
		const { users } = this.props

		return(
			<Grid justify="center" container alignItems="center" style={{ paddingTop:25 }}>
				<Card style={{ width: 400 }} varient="outlined">
					<CardHeader  style={{ textAlign: "center" }} title="Welcome to Would You Rather App" />
					<CardContent style={{ textAlign: "center" }} >
						Plase sign in to continue.<br/><br/>
						<Select native style={{ width:300 }} onChange={this.handleUserChange}>
							<option value={0}>Select User...</option>
							{
								Object.keys(users).map( userId => (
									<option key={userId} value={userId} >{users[userId].name}</option>
								))
							}
						</Select>
					</CardContent>
					<CardActions style={{justifyContent: 'center'}}>
						<Button style={{ width:300 }} onClick={this.handleLogin}>Sign In</Button>
					</CardActions>
				</Card>
			</Grid>
		)
	}
}

function mapStateToProps( {users} ){
	return {
		users
	}
}

export default connect(mapStateToProps, { setAuthedUser })(Login);