import React from 'react';
import {
    ListItem, ListItemText,  Typography, ListItemSecondaryAction, CircularProgress, Box, Paper,
    List, FormControlLabel, Chip
} from '@material-ui/core'
import {Pagination} from '@material-ui/lab'  
import { getRequest } from '../../utils/requests'

export default class CartridgeOrderTable extends React.Component {
    state = {
        data: [],
        loader: true,
        limit:4,
    }
    componentDidMount = () => {
        let token = localStorage.getItem("token")
        getRequest('printers/order_list/', { resolve: (data) => { this.successAct(data) }, reject: async () => { await this.setState({ loader: false }) } }, token)
    }
    successAct = async (data) => {
        await this.setState({ data: data['results'], loader: false, count_pages:Math.ceil(data['count']/this.state.limit) })
    }
    _pageChange=async (event,value)=>{
        await this.setState({page:value,loader:true})
        let token = localStorage.getItem("token")
        getRequest(`printers/order_list/?limit=${this.state.limit}&offset=${(this.state.page-1)*this.state.limit}`, { resolve: (data) => { this.successAct(data) }, reject: () => { this.setState({ loader: false }) } }, token)
    }
    render() {
        if (this.state.loader) { return (<Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>) }
        else {
            return (<React.Fragment>
                <Box width={500} display="flex" flexDirection="column">
                    <Box mb={2} color="text.primary" fontSize={18} fontWeight={500}>Заказы комплекса</Box>
                    <List component="nav" aria-label="mailbox folders">
                    {this.state.data.map((item,index) => {
                        if(item['status']!==4) return (<div key={`${index}-table-order-item`} >
                            <ListItem key={`${index}-table-order-item`} divider={index !== (item.length - 1)}>
                                <Box display="flex" flexDirection="column">
                                    <ListItemText primary={`${item["id"]}. ${item["cartridge"]["name"]}`} />
                                    <Typography variant="caption" color="textSecondary">{`Заказ картриджа на принтер ${item["printer"]["printer"]["name"]}`}</Typography>
                                    <Typography variant="caption" color="textSecondary">{item["date"]}</Typography>
                                    {item["date_finish"]!==null&&<Typography variant="caption" color="textSecondary">{`Заказ был закрыт ${item["date_finish"]}`}</Typography>}
                                </Box>
                                <ListItemSecondaryAction>
                                    <Box display="flex">
                                        {item["status"] === 0 && <Chip color="primary" size="small" label="Заказ ожидает" />}
                                        {item["status"] === 1 && <Chip size="small" label="Ожидает заправки" />}
                                        {item["status"] === 2 && <Chip  size="small" label="Заказ в заправке" />}
                                    </Box>
                                </ListItemSecondaryAction>
                            </ListItem>
                            </div>
                        )
                    })}
                    <Pagination onChange={this._pageChange} page={this.state.page} count={this.state.count_pages}/>
                    </List>
                </Box>
            </React.Fragment>
            )
        }
    }

}
