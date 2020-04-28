import { observable,  action, decorate } from "mobx"
import { getRequest } from "../../utils/requests"
export class TableRequestStore {
    searchword = "";
    date = null;
    cabinet = "";
    cabinets = [];
    showClosedRequests = false;
    tableLoader = false;
    reqs = [];
    history={};
    errorText="";
    errorOpen=false;
    _searchwordChange = (e) => {
        this.searchword = e.target.value
    }

    _filterClick = async () => {
        this.tableLoader = true
        this.reqs = []
        let url = "req/?"
        if (this.searchword !== "") url = url + "search=" + this.searchword + "&"
        if (this.date !== null) url = url + "date=" + this.date + "&"
        if (this.cabinet !== "") url = url + "cabinet=" + this.cabinet + "&"
        if (this.showClosedRequests) url=url+"status="+this.showClosedRequests
        const token = localStorage.getItem('token')
        await getRequest(url, { resolve: this.successReqCallback, reject: this.errorCallback }, token)
        this.tableLoader=false;
    }
    _dateChange = (date) => {
        if (date !== null) {
        this.date = date
            let month = '' + (date.getMonth() + 1)
            let day = '' + date.getDate()
            let year = date.getFullYear()
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            this.date = `${year + "-" + month + "-" + day}`
        }else{this.date=date}
    }
    _cabinetChange = (e) => {
        this.cabinet = e.target.value
    }
    _showClosedRequests = (e) => {
        this.showClosedRequests = e.target.checked
    }
    _errorClose=()=>{
        this.errorOpen=false;
    }
    getCabinets = async () => {
        const token = localStorage.getItem('token')
        this.tableLoader = true
        await getRequest("cities/cabinets/", { resolve: this.successCabinetCallback, reject: this.errorCallback }, token)
        await getRequest("req/", { resolve: this.successReqCallback, reject: this.errorCallback }, token)
        this.tableLoader=false
    }
    successReqCallback = (data) => {
        this.reqs = data
    }
    successCabinetCallback = (data) => {
        this.cabinets = data
    }
    errorCallback = (errorMessage, code) => {
        console.log(code)
        if(code===401){
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        this.errorText=errorMessage
        this.errorOpen = true
    }

}
decorate(TableRequestStore,
    {
        _searchwordChange: action,
        _dateChange: action,
        _cabinetChange: action,
        _showClosedRequests: action,
        _onSearchClick: action,
        _errorClose:action,
        tableLoader: observable,
        searchword: observable,
        date: observable,
        errorOpen:observable,
        showClosedRequests:observable,
        cabinet:observable,
        
    }
)

export default new TableRequestStore();