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
    page=1;
    limit=10
    count_pages=1;
    _successClose=()=>{this.successOpen=false}
    _errorClose=()=>{this.errorOpen=false}
    _problemChange=(e)=>{this.problemText=e.target.value}
    _modalOpen=()=>{this.modalOpen=true}
    _modalClose=()=>{this.modalOpen=false}
    _pageChange=(event,value)=>{
        this.page=value
        this.getInfo()
    }
    getInfo=async()=>{
        this.loader=true
        let url=`printers/?limit=${this.limit}&offset=${(this.page-1)*this.limit}`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.data=data['results'];console.log("Принтеры",this.data);this.count_pages=Math.ceil(data['count']/this.limit)},reject:this.errorCallback},token)
        this.loader=false
    }
    orderCartridge=async(printer)=>{
        this.loader=true
        let url='printers/order/'
        let token=localStorage.getItem('token')
        await postRequest(url,{"printer":printer},{resolve:this.successOrder,reject:this.errorCallback},token)
        this.loader=false
    }
    successOrder=async()=>{
        this.modalOpen=false
        await this.getInfo()
        this.successText="Картридж заказан"
        this.successOpen=true
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
        page:observable,
        limit:observable,
        _problemChange:action,
        getInfo: action,
        _pageChange:action,
        _modalClose:action,
        _modalOpen:action,
        _errorClose:action,
        _successClose:action,
    })
export default new PrinterPanelStore();