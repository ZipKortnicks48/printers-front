import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { AccessTime } from '@material-ui/icons'
export const ActualReqFlag = (props) => {
    return (<React.Fragment><Box mr={3} display="flex" edge="end" aria-label="delete">
        <Typography style={{ color: "blue" }} >Задача все еще не закрыта</Typography>
        <AccessTime style={{ color: "blue" }} />
    </Box>
    </React.Fragment>
    )

}