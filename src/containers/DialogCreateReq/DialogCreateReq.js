import React from 'react'
import { Typography, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from '@material-ui/core'
import { CheckBox, DatePicker, SelectComponent } from '../../components/index'
 class DialogCreateReq extends React.Component {
    state={
        name:"",
        text:"",
        cabinet:"",
        deadline:null,
        checkout:false
    }
    
    render() {
        const store=this.props.DialogCreateReqStore
        return (
            <React.Fragment>
                <DialogTitle>Создание новой заявки</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Для создания заявки заполните форму.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название заявки"
                        fullWidth
                    />
                    <Box display="flex" flexDirection="column">
                    <Box mt={2} mb={2}>
                    <TextField
                        fullWidth
                        label="Опишите проблему"
                        multiline
                        rows={6}
                        variant="outlined"
                    />
                    </Box>
                    <Box mb={2}>
                    <Typography  variant="caption">Выберите кабинет</Typography>
                    </Box>
                    {/* <SelectComponent items={this.props.items} label="cabinet" /> */}
                    <DatePicker label="Крайний срок" value={this.state.deadline}/>
                    <CheckBox label="Запланировать выезд"></CheckBox>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={this.props.close} color="primary">
                        Создать
                    </Button>
                </DialogActions></React.Fragment>
        )
    }
}
export default inject('DialogCreateReqStore')(observer(DialogCreateReq));