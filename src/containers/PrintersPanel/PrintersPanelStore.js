import { observable, action, decorate } from "mobx"
import {  getRequest, postRequest } from "../../utils/requests"

class PrinterPanelStore {

    loader=true
    data=[]
    id=""
    errorText=""
    errorOpen=false
    history={}
    modalOpen=false
    problemText=""
    successOpen=false
    selectedPrinter=""
    _successClose=()=>{this.successOpen=false}
    _errorClose=()=>{this.errorOpen=false}
    _problemChange=(e)=>{this.problemText=e.target.value}
    _modalOpen=()=>{this.modalOpen=true}
    _modalClose=()=>{this.modalOpen=false}
    getInfo=async()=>{
        this.loader=true
        let url=`printers/`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.data=data['results'];console.log("Принтеры",this.data)},reject:this.errorCallback},token)
        this.loader=false
    }
    sendInfo=async()=>{
        this.loader=true
        let url=`printers/broke/`
        let token=localStorage.getItem('token')
        await postRequest(url,{"printer":this.selectedPrinter,"comment":this.problemText},{resolve:this.successBrokeCallback,reject:this.errorCallback},token)
    }
    successBrokeCallback=async()=>{
        this.modalOpen=false
        await this.getInfo()
        this.successText="Отправлено!"
        this.successOpen=true
    }
    errorCallback=(errorMessage,code)=>{
        this.loader=false
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        console.log("PADENIE")
        this.errorText = `Ошибка ${code}`
        this.errorOpen = true
    }
}
decorate(PrinterPanelStore,
    {
        loader: observable,
        errorText:observable,
        errorOpen: observable,
        successOpen:observable,
        modalOpen:observable,
        problemText:observable,
        selectedPrinter:observable,
        _problemChange:action,
        getInfo: action,
        _modalClose:action,
        _modalOpen:action,
        _errorClose:action,
        _successClose:action,
    })
export default new PrinterPanelStore();