import React from 'react'
import { inject, observer } from 'mobx-react'
import {
    CircularProgress, ListItem, TextField, Dialog,
    DialogContent, DialogTitle, DialogActions, ListItemSecondaryAction, Box, Typography, Button, DialogContentText,
} from '@material-ui/core'
import {MessageSnackbar} from "../../components/index"
class PrinterPanel extends React.Component {
    store = this.props.PrinterPanelStore
    componentDidMount = () => {
        //запрос принтера и доступных картриджей для каждого принтера, загрузка стора, загрузка истории
        this.store.history = this.props.history
        this.store.getInfo()
    }
    render() {

        if (this.store.loader) { return (<CircularProgress />) } else return (
            <React.Fragment>
                {this.store.data.map((item, index) => <React.Fragment key={`index-printer-item-${index}`}>
                    <ListItem button divider={index !== (this.store.data.length - 1)}>
                        <Box color="text.primary" display="flex" flexDirection="column">
                            <Box display="flex" alignItems="center"><Box mr={1} fontSize={16}> {item["printer"]["producer"]["name"]+" "+item["printer"]["name"]}</Box>
                                {item['status'] === 1 && <Box color="#2196f3" fontSize={16}> • Работает</Box>}
                                {item['status']===2&&<Box color="#e63946" fontSize={16}> • Сломан</Box>}
                                {item['status']===3&&<Box color="#457b9d" fontSize={16}> • Диагностика</Box>}
                                {item['status']===4&&<Box color="#fca311" fontSize={16}> • Ремонт</Box>}
                                {item['status']===5&&<Box color="#02c39a" fontSize={16}> • Прибыл из ремонта. Ожидает</Box>}
                                {item['status']===6&&<Box color="#d8e2dc" fontSize={16}> • Списан. Недоступен</Box>}
                            </Box>
                            <Typography variant="caption" color="textSecondary">{`ID:${item["id"]}`}</Typography>
                            <Typography variant="caption" color="textSecondary">{`Статус:${item["status_note"]}`}</Typography>
                            <Typography variant="caption" color="textSecondary">{`Кабинет:${item["cabinet"]["name"]}`}</Typography>
                        </Box>
                        <ListItemSecondaryAction>
                            <Box display="flex">
                                {item["status"] === 1 && <Button onClick={()=>{this.store._modalOpen();this.store.selectedPrinter=String(item["id"])}} variant="outlined" size="small" >Сообщить о проблеме</Button>}
                            </Box>
                        </ListItemSecondaryAction>
                    </ListItem>
                </React.Fragment>)}
                <Dialog open={this.store.modalOpen} onClose={this.store._modalClose}>
                    <Box>
                        <DialogTitle>Опишите поломку</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Введите описание неисправности</DialogContentText>
                            <TextField
                                fullWidth
                                label="Опишите проблему"
                                multiline
                                rows={6}
                                variant="outlined"
                                value={this.store.problemText}
                                onChange={this.store._problemChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.store.sendInfo} >Отправить</Button>
                            <Button onClick={this.store._modalClose}>Отмена</Button>
                        </DialogActions>
                        <MessageSnackbar open={this.store.errorOpen} severity="error" onClose={this.store._errorClose} message={this.store.errorText} />
                        <MessageSnackbar open={this.store.successOpen} severity="success" onClose={this.store._successClose} message={this.store.successText} />
                    </Box>
                </Dialog>
            </React.Fragment>
        )
    }
}
export default inject('PrinterPanelStore')(observer(PrinterPanel));