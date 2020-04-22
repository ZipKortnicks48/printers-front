import React from 'react'
import { InputLabel, Select, MenuItem, FormControl, Box } from '../index'
const SelectComponent = (props) => {
    console.log(props.items)
    return (

        <Box className={props.className}><FormControl style={{ minWidth: 120 }} spacing={3} >

            <InputLabel>{props.label}</InputLabel>
            <Select onChange={props.onChange}>
                {
                    props.items.map((x)=><MenuItem value={x['id']}>{`${x['number']} ${x['name']}`}</MenuItem>)
                }
            </Select>

        </FormControl>
        </Box>

    )
}
export default SelectComponent
