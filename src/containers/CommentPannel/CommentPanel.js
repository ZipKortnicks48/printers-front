import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@material-ui/core'

class CommentPanel extends React.Component {
    store = this.props.CommentPanelStore
    componentDidMount = () => {
        this.store.id = this.props.id
        this.store.getInfo()
    }
    render() {
        console.log(this.store)
      if(this.store.loader)return(<CircularProgress/>);else  return (
            <React.Fragment>
                <Box p={4}>
                <Paper><Typography component="div" style={{ backgroundColor: '#e9ecef' }}>
                    <Box p={2}>
                            {/* <Typography color="textPrimary"> Комментарии</Typography> */}
                            <TextField
                                id="standard-multiline-static"
                                label="Комментарий"
                                multiline
                                rows="2"
                                fullWidth
                                placeholder="Введите текст.."
                                variant="outlined"
                            />
                            <Box mt={1} display="flex" justifyContent="flex-end"><Button variant="outlined" size="small" color="primary" >Отправить</Button></Box>
                            123123123
                        </Box>
                    </Typography></Paper>
                </Box>
            </React.Fragment>)
    }
}
export default inject('CommentPanelStore')(observer(CommentPanel));