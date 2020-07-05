import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'

class PageNotFound extends Component {
    render(){
        return(
            <Grid container style={{ marginTop: "5%"}}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ textAlign: "center" }}>Page Not Found</Typography>
                    <Typography variant="subtitle2" style={{ textAlign: "center" }}>Sorry, the page you are looking for is not found</Typography>
                </Grid>
            </Grid>
        )
    }
}

export default PageNotFound