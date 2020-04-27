import React from 'react';
import { observer, inject } from 'mobx-react'
import { SelectComponent, RequestSearchField, DatePicker, CheckBox, TableReqItem, MessageSnackbar} from '../../components'
import {
    ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, CircularProgress, Box, Paper,
    List, FormControlLabel
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withRouter } from "react-router";
import classNames from "./tablerequest.module.css"
class TableRequest extends React.Component {
    componentDidMount = () => {
        console.log("mount")
        let store = this.props.TableRequestStore
        store.history=this.props.history
        store.getCabinets()
    }
    render() {
        let store = this.props.TableRequestStore
        if (store.tableLoader) { return (<CircularProgress />) } else {
            return (
                <React.Fragment>
                    <Box mb={2}>
                        <ExpansionPanel>
                            <Box width={"100%"}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <FormControlLabel
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<RequestSearchField 
                                            onClick={store._filterClick}
                                            onChange={store._searchwordChange}
                                            value={store.searchword}
                                            placeholder="Введите название или номер заявки" />
                                        }
                                        style={{ width: '100%' }}
                                    />
                                </ExpansionPanelSummary>
                            </Box>
                            <ExpansionPanelDetails>
                                <DatePicker value={store.date} onChange={store._dateChange} />
                                <SelectComponent value={store.cabinet} items={store.cabinets} onChange={store._cabinetChange} label="Кабинет" className={classNames.select} />
                                <CheckBox checked={store.showClosedRequests} onChange={store._showClosedRequests} className={classNames.checkbox} label="Отобразить не закрытые заявки" />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Box>
                    <Paper>
                        <List component="nav" aria-label="mailbox folders">
                            <TableReqItem items={store.reqs} />
                        </List>
                    </Paper>
                    <MessageSnackbar open={store.errorOpen} severity="error" onClose={store._errorClose} message={store.errorText} />
                </React.Fragment>
            )
        }
    }
}

export default withRouter(inject('TableRequestStore')(observer(TableRequest)));