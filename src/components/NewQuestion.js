import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Card, CardHeader, CardContent, CardActions, Button, Typography, TextField } from '@material-ui/core'

import { handleAddQuestion } from './../actions/questions'

class NewQuestion extends Component {
	state = {
		optionOneText: "",
		optionTwoText: "",
		validatedOptions: false,
	} 

	handleOptionOne = async (event) => {
		await this.setState({ optionOneText: event.target.value  })
		return (this.validateOptions()) ? this.enableSubmit() : this.disableSubmit()
	}

	handleOptionTwo = async (event) => {
		await this.setState({ optionTwoText: event.target.value })
		return (this.validateOptions()) ? this.enableSubmit() : this.disableSubmit()
	}

	validateOptions(){
		return ((this.state.optionOneText.trim().length > 0) && (this.state.optionTwoText.trim().length > 0)) ? true : false
	}

	enableSubmit = () => {
		this.setState({ validatedOptions: true })
	}

	disableSubmit = () => {
		this.setState({ validatedOptions: false })
	}

	handleSubmit = async () => {
		const { optionOneText, optionTwoText } = this.state
		const { authedUser, history, resetTabIndex } =  this.props
		await this.props.handleAddQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser,
		});
		resetTabIndex()
		history.push("/")
	}

	render(){
		return (
			<Grid container>
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					<Card variant="outlined" style={{ marginTop: 15 }}>
						<CardHeader title="Create a New Question" style={{ textAlign:"center"}}></CardHeader>
						<CardContent style={{ padding:12}}>
							<Typography variant="body2">Complete the question.</Typography>
							<Typography variant="h6">Would you rather...</Typography>
							<TextField id="option-one" label="Option One" onChange={ this.handleOptionOne } value={ this.state.optionOneText } helperText="" variant="outlined" style={{ width: "96%" }} autoFocus></TextField>
							<Typography variant="subtitle2" style={{ marginTop: 10, textAlign:"center"}}>OR</Typography>
							<TextField id="option-two" label="Option Two" onChange={ this.handleOptionTwo } value={ this.state.optionTwoText } helperText="" variant="outlined" style={{ width: "96%" }}></TextField>
						</CardContent>
						<CardActions style={{justifyContent: 'center'}}>
							<Button disabled={ this.state.validatedOptions? false : true }style={{ width:"96%" }} onClick={ this.handleSubmit }>Submit</Button>
						</CardActions>
					</Card>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.users,
		authedUser: state.authedUser,
	}
}

export default connect(mapStateToProps, {handleAddQuestion})(NewQuestion)