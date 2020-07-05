import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, Avatar, CardContent, Grid, CardActions, Button, Typography, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, Box, LinearProgress, Badge } from '@material-ui/core'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class ViewQuestion extends Component {
	state = {
		selectedOption: null,
	}

	setRadioValue = (e, data) => {
		this.setState({ selectedOption: data });
	}

	isQuestionAnsweredByUser(){
		const { authedUser, questions } = this.props
		const questionId = this.props.match.params.questionId
		const question = questions[questionId]
		
		if(question){
			return (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) ? true : false
		} else {
			return false
		}
	}

	handleAnswerSubmit = () => {
		const questionId = this.props.match.params.questionId
		const answer = (this.state.selectedOption === "1") ? "optionOne" : "optionTwo"
		const { authedUser, handleAnswerQuestion } = this.props;
		handleAnswerQuestion({ authedUser, questionId, answer });
	}

	render(){
		const questionId = this.props.match.params.questionId
		const { users, questions, authedUser } = this.props

		const question = questions[questionId]

		if(!question) {
			return <Redirect to="/404" />
		} else {
		
		const optionOneVoteCount = question.optionOne.votes.length
		const optionTwoVoteCount = question.optionTwo.votes.length
		const totalVoteCount = optionOneVoteCount + optionTwoVoteCount

		const onePercentage = Math.round((optionOneVoteCount / totalVoteCount) * 10000) / 100;
		const twoPercentage = Math.round((optionTwoVoteCount / totalVoteCount) * 10000) / 100;

		const userVotedOptionOne = question.optionOne.votes.includes(authedUser)
		const userVotedOptionTwo = question.optionTwo.votes.includes(authedUser)
		
		return (this.isQuestionAnsweredByUser() === false) 
			? (
			<Grid container>
				<Grid item xs={3}></Grid>
				<Grid item xs={5}>
					<Card variant="outlined" style={{ marginTop: 15 }}>
						<CardHeader title={`${users[questions[questionId].author].name} asks:`}></CardHeader>
						<CardContent style={{ padding:12 }}>
							<Grid container>
								<Grid item xs={3} style={{display: "flex", flexDirection: "column", justifyContent: "center" }}><Avatar alt={users[questions[questionId].author].name} src={users[questions[questionId].author].avatarURL} style={{ width:100, height:100, alignSelf: "center" }} /></Grid>
								<Grid item xs={9}>
									<div>
										<Typography varient="h4">Would you rather</Typography>
										<FormControl>
											<FormLabel component="legend"></FormLabel>
											<RadioGroup value={this.state.selectedOption} name="wouldyourather" onChange={this.setRadioValue}>
												<FormControlLabel value="1" control={<Radio color="primary" />} label={questions[questionId].optionOne.text} />
												<FormControlLabel value="2" control={<Radio color="primary" />} label={questions[questionId].optionTwo.text} />
											</RadioGroup>
										</FormControl>
									</div>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions style={{justifyContent: 'center'}}>
							<Button disabled={ this.state.selectedOption? false : true }style={{ width:"96%"}} onClick={this.handleAnswerSubmit}>Submit</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		) 
		: (
			<Grid container>
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					<Card variant="outlined" style={{ marginTop: 15 }}>
					<CardHeader title={`${users[question.author].name} asks:`}></CardHeader>
						<CardContent style={{ padding:12 }}>
							<Grid container>
								<Grid item xs={4} style={{display: "flex", flexDirection: "column", justifyContent: "center" }}><Avatar alt={users[questions[questionId].author].name} src={users[questions[questionId].author].avatarURL} style={{ width:80, height:80, alignSelf: "center" }} /></Grid>
								<Grid item xs={8}>
									<Typography varient="subtitle1" style={{ fontWeight: "bold", marginBottom:8 }}>Results :</Typography>
									{ userVotedOptionOne && <Badge badgeContent="Your vote" color="secondary" style={{ width: "100%"}} /> }
									<Card varient="outlined" style={{ backgroundColor: "#E5F2F2", width: "100%", marginBottom: 15 }}>
										<CardContent style={{ padding:8}}>
											<Typography variant="body2" style={{ fontWeight: "bold"}}>Would you rather {question.optionOne.text}?</Typography>
											<Box display="flex" alignItems="center" style={{ marginTop: 10 }}>
												<Box width="100%" mr={1}>
													<LinearProgress variant="determinate" value={onePercentage}/>
												</Box>
												<Box minWidth={50}>
													<Typography variant="body2" style={{ fontWeight: "bold"}}>{onePercentage} %</Typography>
												</Box>
											</Box>
											<Typography variant="body2" style={{ fontWeight: "bold", textAlign: "center"}}>{optionOneVoteCount} out of {totalVoteCount} votes</Typography>
										</CardContent>
									</Card>
									{ userVotedOptionTwo && <Badge badgeContent="Your vote" color="secondary" style={{ width: "100%"}} /> }
									<Card varient="outlined" style={{ backgroundColor: "#E5F2F2" }}>
										<CardContent style={{ padding: 8 }}>
											<Typography variant="body2" style={{ fontWeight: "bold"}}>Would you rather {question.optionTwo.text}?</Typography>
											<Box display="flex" alignItems="center" style={{ marginTop: 10 }}>
												<Box width="100%" mr={1}>
													<LinearProgress variant="determinate" value={twoPercentage}/>
												</Box>
												<Box minWidth={50}>
													<Typography variant="body2" style={{ fontWeight: "bold"}}>{twoPercentage} %</Typography>
												</Box>
											</Box>
											<Typography variant="body2" style={{ fontWeight: "bold", textAlign: "center"}}>{optionTwoVoteCount} out of {totalVoteCount} votes</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		)
		}
	}
}

const mapStateToProps = state => {
	return {
		users: state.users, 
		questions: state.questions,
		authedUser: state.authedUser,
	}
}

export default connect(mapStateToProps, {handleAnswerQuestion})(ViewQuestion);