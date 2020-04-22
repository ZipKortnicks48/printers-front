
import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers/"
const DatePicker = (props) => {
    return (
        <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    label="Укажите дату"
                    onChange={props.onChange}
                />
            </MuiPickersUtilsProvider>
        </React.Fragment>
    )
}
export default DatePicker