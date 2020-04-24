import { observable, computed, action, decorate } from "mobx"
import { postRequest } from '../../utils/requests'
import pathes from '../../utils/routing'
import {getRequest} from "../../utils/requests"
export class TableRequestStore {
    searchword = "";
    date = "";
    cabinet = "";
    cabinets=[];
    showClosedRequests = false;
    tableLoader = false;
    
    _searchwordChange = (e) => {
        console.log(e.target.value)
        this.searchword = e.target.value
    }
    _dateChange = (date) => {
        this.date = date
        let month = '' + (date.getMonth() + 1)
        let day = '' + date.getDate()
        let year = date.getFullYear()
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        this.date=`${year+"-"+month+"-"+day}`
        console.log(this.date)
    }
    _cabinetChange = (e) => {
        console.log(e.target.value)
        this.cabinet = e.target.value
    }
    _showClosedRequests = (e) => {
        console.log(e.target.checked)
        this.showClosedRequests = e.target.checked
    }
    getCabinets=()=>{
        const callbacks={
            resolve:this.successCabinetCallback,
            reject:this.errorCallback,
        }
        const token=localStorage.getItem('token')
        this.tableLoader=true
        getRequest("cities/cabinets/",callbacks,token)
        getRequest("req/",{resolve:this.successReqCallback,reject:this.errorCallback},token)
    }
    successReqCallback=(data)=>{
        this.reqs=data
        console.log("Это заявки",this.reqs)
        this.tableLoader=false;
    }
    successCabinetCallback=(data)=>{
        this.cabinets=data
        console.log("Это кабинеты",this.cabinets)
    }
    errorCallback=(errorMessage)=>{
        console.log(`все в гамне ${JSON.stringify(errorMessage)}`)
        this.errorOpen=true
        this.tableLoader=false
    }
    

    _onSearchClick = (e) => {
        
    }

    successLogInCallback = (successMessage) => {
        this.successOpen = true
        this.buttonLoader = false
        localStorage.setItem('token', `Bearer ${successMessage["token"]}`)
        this.history.push(pathes["listRequestsPath"])
    }
    errorLogInCallback = (errorMessage) => {
        console.log(`все в гамне ${JSON.stringify(errorMessage)}`)
        this.errorOpen = true
        this.buttonLoader = false
    }


}
decorate(TableRequestStore,
    {
        _searchwordChange: action,
        _dateChange: action,
        _cabinetChange: action,
        _showClosedRequests: action,
        _onSearchClick: action,
        tableLoader: observable,
        searchword: observable,
    }
)

export default new TableRequestStore();