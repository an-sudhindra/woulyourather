import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Question from './Question'

import { Grid, Paper, Tabs, Tab, Typography } from '@material-ui/core'

function TabPanel(props) {
	const { children, value, index, questions, allQuestions, authedUser, users, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			style={{border:1}}
			{...other}
		>
		{value === index && (
			<Grid container >
				<Grid item xs={2}></Grid>
				<Grid item xs={8}>
				{ (questions.length)?
					questions.map((id) =>(
						<Question key={id} questionData = {allQuestions[id]} author={users[allQuestions[id].author]}/>
					))
					: <Typography variant="h6" style={{ paddingTop: 50, textAlign: "center" }}>No questions to display</Typography>
				}
				</Grid>
				<Grid item xs={2}></Grid>
			</Grid>
		)}
	  </div>
	);
}
  
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const sortQuestions = questions => {
	const sortedQuestions = {};
	Object.keys(questions)
	  .map(key => questions[key])
	  .sort((a, b) => b.timestamp - a.timestamp)
	  .forEach(question => {
		sortedQuestions[question.id] = question;
	  });
	return sortedQuestions;
  };

class Dashboard extends Component {

	getUnansweredQuestions = () => {
		const { questions, authedUser } = this.props
		const unansweredQuestions = Object.keys(questions).filter( (questionId) => !(questions[questionId].optionOne.votes.includes(authedUser) || questions[questionId].optionTwo.votes.includes(authedUser)) )
		return unansweredQuestions
	}
	getAnsweredQuestions = () => {
		const { questions, authedUser } = this.props
		const answeredQuestions = Object.keys(questions).filter( (questionId) => (questions[questionId].optionOne.votes.includes(authedUser) || questions[questionId].optionTwo.votes.includes(authedUser)) )
		return answeredQuestions
	}

	render() {
		const unansweredQuestions = this.getUnansweredQuestions()
		const answeredQuestions = this.getAnsweredQuestions()
		return (
			<Grid justify="center" container alignItems="center" style={{ paddingTop:25 }}>
				<Grid item xs={4} />
				<Grid item xs={4}>
					<Paper style={{ width: 500}}>
						<Tabs value={this.props.tabIndex} variant="fullWidth" onChange={ (event, data) => this.props.handleTabChange(event, data) }>
							<Tab value={0} label="Unanswered Questions">
							</Tab>
							<Tab value={1} label="Answered Questions">
							</Tab>
						</Tabs>
					</Paper>
					<TabPanel style={{ width: 500}} value={0} index={this.props.tabIndex} questions={unansweredQuestions} allQuestions={this.props.questions} authedUser = {this.props.authedUser} users={this.props.users}>
					</TabPanel>
					<TabPanel style={{ width: 500}} value={1} index={this.props.tabIndex} questions={answeredQuestions} allQuestions={this.props.questions} authedUser = {this.props.authedUser} users={this.props.users}>
					</TabPanel>
				</Grid>
				<Grid item xs={4} />
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.users,
		authedUser: state.authedUser,
		questions: sortQuestions(state.questions),
	}
}

export default connect(mapStateToProps)(Dashboard)