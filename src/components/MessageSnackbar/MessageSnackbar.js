import React from 'react'
import {Snackbar} from '@material-ui/core'
import {Alert} from '@material-ui/lab' 
const MessageSnackbar =(props)=> {
        return (
        <Snackbar open={props.open} autoHideDuration={1000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
        )
}
export default MessageSnackbar
