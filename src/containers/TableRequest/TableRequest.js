import React from 'react';
import { observer, inject } from 'mobx-react'
import {
    ExpandMoreIcon, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel,
    SelectComponent, Box, RequestSearchField, DatePicker, CheckBox, CircularProgress
} from '../../components'
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
                    <ExpansionPanel>
                        <Box width={800}>
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
                </React.Fragment>
            )
        }
    }
}

export default withRouter(inject('TableRequestStore')(observer(TableRequest)));