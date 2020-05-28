import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { DriveEta } from '@material-ui/icons'
export const CheckoutFlag = (props) => {
    return (<React.Fragment><Box mr={3} display="flex" edge="end" aria-label="delete">
        <Typography style={{ color: "orange" }} >Планировать выезд</Typography>
        <DriveEta style={{ color: "orange" }} />
    </Box>
    </React.Fragment>
    )

}