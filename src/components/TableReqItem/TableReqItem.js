import React from 'react'
import { ListItem, ListItemText, Box, Typography, ListItemSecondaryAction } from '@material-ui/core'
import { DriveEta } from '@material-ui/icons'
import { CheckCircle } from '@material-ui/icons'
export const TableReqItem = (props) => {

    if (props.items.length === 0) {
        return (<React.Fragment>
            <Box>
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
                            <ListItem key={`${index}-table-req-item`} button divider={index !== props.items.length - 1}>
                                <Box display="flex" flexDirection="column">
                                    <ListItemText primary={`${item["id"]} ${item["shortname"]}`} />
                                    <Typography variant="caption" color="textSecondary">{item["date"]}</Typography></Box>
                                <ListItemSecondaryAction>
                                    <Box display="flex">
                                        {item["checkout"] && <Box mr={3} display="flex" edge="end" aria-label="delete">
                                            <Typography style={{ color: "orange" }} >Планировать выезд</Typography>
                                            <DriveEta style={{ color: "orange" }} />
                                        </Box>}
                                        {item["status"] && <Box display="flex" edge="end" aria-label="delete">
                                            <Typography style={{ color: "green" }} >{`Выполнена ${item["finishdate"]}`}</Typography>
                                            <CheckCircle style={{ color: "green" }} />
                                        </Box>}
                                    </Box>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }

                )}
            </React.Fragment>)

    }
} 