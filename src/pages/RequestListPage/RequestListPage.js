import React from 'react'
import { TableRequest } from '../../containers/index'
import { Box, Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const RequestListPage = (props) => {
    return (
        <React.Fragment>
            <Box mb={4}  display="flex" flexDirection="row" alignItems="center" fontSize={16} color="text.secondary">Вы вошли под пользователем:
            <Box pl={1} fontSize={16} color="text.primary">{localStorage.getItem('name')}</Box>
                <Box fullWidth display="flex" flexDirection="row" >
                    <Button onClick={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('name')
                        props.history.push('/')
                    }}><ExitToAppIcon fontSize="small" /></Button>
                </Box>
            </Box>
            <TableRequest />
        </React.Fragment>)
}
export default RequestListPage;