import React from 'react'
import { inject, observer } from 'mobx-react'
import { CircularProgress, Typography, Box } from '@material-ui/core'
import { CheckoutFlag, FinishedFlag, ActualReqFlag } from '../../components'
import {Button} from '@material-ui/core'
class RequestBody extends React.Component {

    store = this.props.RequestBodyStore
    componentDidMount = () => {
        this.store.id = this.props.id
        this.store.getInfo()
    }

    render() {
        if (this.store.loader) return (<React.Fragment><Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box></React.Fragment>); else return (
            <React.Fragment>
                <Box p={4}>
                    <Box mb={2}><Typography variant="h2" color="textPrimary">{this.store.data['shortname']}</Typography></Box>
                    <Box mb={4} justifyContent="space-between" display="flex">
                        <Typography variant="body2" color="textSecondary">{`Дата заявки: ${this.store.data['date']}`}</Typography>
                        <Typography variant="body2" color="textSecondary">{`№: ${this.store.data['id']}`}</Typography>
                    </Box>
                    
                    <Box mb={2}>
                        <Typography variant="body1" color="textPrimary">{this.store.data['description']}</Typography>
                    </Box>
                    <Box fullWidth display="flex" justifyContent="flex-end"><Box display="flex" flexDirection="column">
                        {this.store.data["checkout"]&&<Box mb={2}><CheckoutFlag /></Box>}
                        {this.store.data["status"]?<Box mb={2}><FinishedFlag item={this.store.data} /></Box>:<Box><ActualReqFlag /></Box>}
                    </Box>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="body1" color="textSecondary">{`Кабинет: ${this.store.data['cabinet']}`}</Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="body1" color="textSecondary">{`Планируемая дата выполнения: ${this.store.data['deadline']}`}</Typography>
                    </Box>
                    <Button variant="outlined" onClick={()=>{this.props.history.push('/requests')}}>{`<< Вернуться к списку заявок`}</Button>
                </Box>
            </React.Fragment>
        )
    }
}

export default inject('RequestBodyStore')(observer(RequestBody));