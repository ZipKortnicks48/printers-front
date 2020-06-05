import { observable, action, decorate } from "mobx"
import { postRequest, getRequest } from "../../utils/requests"

class CommentPanelStore {
    loader=true
    data={}
    id=""
    errorText=""
    errorOpen=false
    getInfo=async ()=>{
        this.loader=true
        let url=`req/comments/?req=${this.id}`
        let token=localStorage.getItem('token')
        await getRequest(url,{resolve:(data)=>{this.data=data},reject:this.errorCallback},token)
        console.log(this.data)
        this.loader=false
    }
    errorCallback = (errorMessage, code) => {
        console.log(code)
        if (code === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.history.push("/")
        }
        this.errorText = `Ошибка получения ${code}`
        this.errorOpen = true
    }
    
}
decorate(CommentPanelStore,
    {
        loader: observable,
        errorOpen: observable,
        getInfo: action,
    })
export default new CommentPanelStore();