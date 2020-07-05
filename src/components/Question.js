import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, Avatar, CardContent, Grid, CardActions, Button } from '@material-ui/core'

class Question extends Component {
	render(){
		const { questionData, author } = this.props
		return(
			<Card variant="outlined" style={{ marginTop: 15 }}>
				<CardHeader style={{ textAlign: "left !important" }} title={`${author.name} asks:`}>Content</CardHeader>
				<CardContent style={{ padding:12 }}>
					<Grid container>
						<Grid item xs={3} style={{display: "flex", flexDirection: "column", justifyContent: "center" }}><Avatar alt="{ author.name }" src={ author.avatarURL } style={{ width:50, height:50, alignSelf:"center" }} /></Grid>
						<Grid item xs={9} style={{ paddingLeft: 10 }}>
							<div>
								<b>Would you rather</b>
								<p>{questionData.optionOne.text} <b>or</b> {questionData.optionTwo.text}?</p>
							</div>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions style={{justifyContent: 'center'}}>
					<Link to={`/questions/${questionData.id}`} style={{ width: "100%", textDecoration: "none" }}>
						<Button style={{ width:"96%"}}>View Poll</Button>
					</Link>
				</CardActions>
			</Card>
		)
	}
}

export default Question