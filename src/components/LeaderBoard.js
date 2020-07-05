import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Avatar, Typography, Box } from '@material-ui/core'

class LeaderBoard extends Component {
	createGrid(user){
		return (
			<Grid container key={user.id} style={{ border: "1px solid #008080", marginTop: 18, borderRadius: 6, padding: 8 }}>
				<Grid item xs={3} style={{display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid #008080" }}><Avatar alt={user.name} src={user.avatarURL} style={{ width:80, height:80, alignSelf: "center" }} /></Grid>
				<Grid item xs={6} style={{display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid #008080" }}>
					<Box style={{ padding: 10}}>
						<Typography variant="h6">{ user.name }</Typography>
						<Grid container  style={{ borderBottom:"1px solid #b2d8d8"}}>
							<Grid item xs ={10} style={{ padding: "5px 0px" }}>Answered Questions</Grid>
							<Grid item xs ={2} style={{ padding: "5px 0px" }}>{ Object.keys(user.answers).length }</Grid>
						</Grid>
						<Grid container >
							<Grid item xs ={10} style={{ padding: "5px 0px" }}>Created Questions</Grid>
							<Grid item xs ={2} style={{ padding: "5px 0px" }}>{user.questions.length}</Grid>
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={3} style={{display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<div><Typography variant="subtitle2" style={{ textAlign:"center", fontWeight: "bold"}}>Score</Typography></div>
					<div style={{display: "flex", justifyContent: "center" }}>
						<div className="lb-score"><span className="lb-score-points">{user.score}</span></div>
					</div>
				</Grid>
			</Grid>
		)
	}
	render(){
		const { users } = this.props
		const usersWithScore = {}
		const orderedUsersWithScore = {}

		Object.keys(users).forEach( uid => {
			const user = users[uid]
			user.score = Object.keys(user.answers).length + user.questions.length
			usersWithScore[uid] = user
		})

		Object.keys(users)
			.map( uid => users[uid])
			.sort((a,b) => b.score - a.score)
			.forEach( user => {
				orderedUsersWithScore[user.id] = user
			})
		
		// console.log(orderedUsersWithScore)

		return (
			<Grid container>
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					{
						Object.keys(orderedUsersWithScore).map( uid => {
							return this.createGrid( orderedUsersWithScore[uid] )
						})
					}
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		)
	}
}

const mapStateToProps = ({users}) => {
	return { users }
}

export default connect(mapStateToProps)(LeaderBoard)