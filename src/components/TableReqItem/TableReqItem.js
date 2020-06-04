import React from 'react'
import { ListItem, ListItemText, Box, Typography, ListItemSecondaryAction } from '@material-ui/core'
import { DriveEta } from '@material-ui/icons'
import { CheckCircle } from '@material-ui/icons'
import {CheckoutFlag,FinishedFlag,ActualReqFlag,ProcessReqFlag} from '../../components/index'
export const TableReqItem = (props) => {
    console.log("отрисовка")
    if (props.items.length === 0) {
        return (<React.Fragment>
            <Box p={2}>
                <Typography color="textSecondary">{"Пусто"}</Typography>
            </Box>
        </React.Fragment>)
    }
    else {
        return (
            <React.Fragment>
                {props.items.map(
                    (item, index) => {
                        return (
                            <ListItem key={`${index}-table-req-item`} onClick={()=>props.onClick(item['id'])} button divider={index !== (props.items.length - 1)}>
                                <Box display="flex" flexDirection="column">
                                    <ListItemText primary={`${item["id"]}. ${item["shortname"]}`} />
                                    <Typography variant="caption" color="textSecondary">{item["date"]}</Typography></Box>
                                <ListItemSecondaryAction>
                                    <Box display="flex">
                                        {item["checkout"] && <CheckoutFlag/>}
                                        {item["status"]==="3" && <FinishedFlag item={item}/>}
                                        {item["status"]==="2" && <ProcessReqFlag  item={item}/>}
                                    </Box>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }

                )}
            </React.Fragment>)

    }
} 