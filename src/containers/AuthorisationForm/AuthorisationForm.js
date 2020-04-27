import React from 'react';
import { observer, inject } from 'mobx-react'
import { TextField, Box, Button, CircularProgress } from '@material-ui/core'
import { MessageSnackbar } from "../../components/"
import { withRouter } from "react-router";
class AuthorisationForm extends React.Component {
    render() {
        let store = this.props.AuthorisationFormStore
        return (
            <React.Fragment>
                <Box display="flex" flexDirection="column" height="100vh" alignItems="center" justifyContent="center">
                    <Box py={3} color="text.primary">Система сбора заявок ОГУП "Липецкоблводоканал"</Box>
                    <Box py={1}>
                        <TextField onChange={store._usernameChange}  color="primary" label="Логин" variant="outlined" />
                    </Box>
                    <Box py={1}>
                        <TextField onChange={store._passwordChange}  type="password" label="Пароль" variant="outlined" />
                    </Box>
                    <Box py={1}>
                        {!store.buttonLoader ?
                            <Button onClick={() => store._logInClick(this.props.history)} variant="contained" color="primary">Войти</Button> :
                            <Button variant="contained" color="primary" disabled><CircularProgress /></Button>
                        }
                        <MessageSnackbar open={store.errorOpen} severity="error" onClose={store._errorClose} message="Неверный логин или пароль" />
                    </Box>
                </Box>
            </React.Fragment>
        )
    }
}

export default withRouter(inject('AuthorisationFormStore')(observer(AuthorisationForm)));