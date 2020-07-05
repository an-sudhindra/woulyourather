import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Grid, Avatar } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import './../css/header.css'

class Header extends Component {
	render(){
		const { users } = this.props

		return(
			<AppBar position="static" className="appbar" elevation={0}>
				<Toolbar variant="dense" style={{minHeight:35}}>
					<Grid justify="space-between" container spacing={8} alignItems="center">
						<Grid item>
							<Link to="/">Home</Link>
							<Link to="/add">Ask Question</Link>
							<Link to="/leaderboard">Leader Board</Link>
						</Grid>
						{ (this.props.authedUser === null) ?
							<Grid item>
								<IconButton color="default">
									<AccountCircle/>
								</IconButton>
								<Link to="/login">Sign In</Link>
							</Grid>
							:
							<Grid item>
								<span>Hello, { users[this.props.authedUser].name }</span>
								<IconButton color="default">
									<Avatar src={ users[this.props.authedUser].avatarURL } style={{ height:20, width:20 }} />
								</IconButton>
								<Link to="/logout">Sign Out</Link>
							</Grid>
						}
					</Grid>
				</Toolbar>
			</AppBar>
		)
	}
}

function mapStateToprops( state ){
	return { authedUser: state.authedUser, users: state.users }
}
export default connect(mapStateToprops)(Header)