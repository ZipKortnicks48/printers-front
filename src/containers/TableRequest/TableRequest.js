import React from 'react';
import { observer, inject } from 'mobx-react'
import { SelectComponent, RequestSearchField, DatePicker, CheckBox, } from '../../components'
import {
    ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, CircularProgress, Box, Paper,
    List, ListItem, ListItemText, Divider, ListItemSecondaryAction,  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CheckCircle, DriveEta } from '@material-ui/icons'
import { withRouter } from "react-router";
import classNames from "./tablerequest.module.css"

class TableRequest extends React.Component {

    componentDidMount = () => {
        let store = this.props.TableRequestStore
        store.getCabinets()
    }

    render() {
        let store = this.props.TableRequestStore
        if (store.tableLoader) { return (<CircularProgress />) } else {
            return (
                <React.Fragment>
                    <Box mb={2}>
                        <ExpansionPanel >
                            <Box width={"100%"}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <RequestSearchField onChange={store._searchwordChange} placeholder="Введите название или номер заявки" />
                                </ExpansionPanelSummary>
                            </Box>
                            <ExpansionPanelDetails>
                                <DatePicker onChange={store._dateChange} />
                                <SelectComponent items={store.cabinets} onChange={store._cabinetChange} label="Кабинет" className={classNames.select} />
                                <CheckBox onChange={store._showClosedRequests} className={classNames.checkbox} label="Отобразить не закрытые заявки" />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Box>
                    <Paper>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button divider>
                                <Box display="flex" flexDirection="column">
                                    <ListItemText primary="1 Привезти провод" />
                                    <Typography variant="caption" color="textSecondary">24-04-2020</Typography>
                                </Box>
                            </ListItem>
                          
                            <ListItem button divider>
                                <Box display="flex" flexDirection="column"><ListItemText primary="2 Нужны картриджи" /><Typography variant="caption" color="textSecondary">24-04-2020</Typography></Box>
                            </ListItem>
                            <ListItem button divider>
                               <Box display="flex" flexDirection="column">
                               <ListItemText primary="3 Сломался компьютер" />
                               <Typography variant="caption" color="textSecondary">24-04-2020</Typography></Box> 
                                <ListItemSecondaryAction>
                                    <Box display="flex">
                                        <Box mr={3} display="flex" edge="end" aria-label="delete">
                                            <Typography style={{ color: "orange" }} >Планировать выезд</Typography>
                                            <DriveEta style={{ color: "orange" }} />
                                        </Box>
                                        <Box display="flex" edge="end" aria-label="delete">
                                            <Typography style={{ color: "green" }} >Выполнена 25-04-2020</Typography>
                                            <CheckCircle style={{ color: "green" }} />
                                        </Box>
                                    </Box>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem button>
                            <Box display="flex" flexDirection="column"><ListItemText primary="4 Не работает 1с" /><Typography variant="caption" color="textSecondary">24-04-2020</Typography></Box>
                            </ListItem>
                        </List>
                    </Paper>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(inject('TableRequestStore')(observer(TableRequest)));