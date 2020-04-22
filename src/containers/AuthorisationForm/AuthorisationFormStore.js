import { observable, computed, action, decorate } from "mobx"
import {postRequest} from '../../utils/requests'
import pathes from '../../utils/routing'
export class AuthorisationFormStore{
    username="";
    password="";
    history={};
    successOpen=false
    errorOpen=false
    buttonLoader=false
    showErrorSnackBar=false
    _usernameChange = event => {
        this.username=event.target.value
    };
    _passwordChange=event=>{
        this.password=event.target.value
    }
    _logInClick=(history)=>{
        this.buttonLoader=true
        this.history=history
        console.log('Запрос авторизации')
        const callbacks={
            resolve:this.successLogInCallback,
            reject:this.errorLogInCallback,
        }
        let data={name:this.username,password:this.password}
        postRequest('user/auth/',data,callbacks)
    }
    _successClose=()=>{
        this.successOpen=false
    }
    _errorClose=()=>{
        this.errorOpen=false
    }

    successLogInCallback=(successMessage)=>{
        this.successOpen=true
        this.buttonLoader=false
        localStorage.setItem('token',`Bearer ${successMessage["token"]}`)
        this.history.push(pathes["listRequestsPath"])
    }
    errorLogInCallback=(errorMessage)=>{
        console.log(`все в гамне ${JSON.stringify(errorMessage)}`)
        this.errorOpen=true
        this.buttonLoader=false
    }
    

}
decorate(AuthorisationFormStore,
    {
        errorOpen:observable,
        successOpen:observable,
        buttonLoader:observable,
        _usernameChange:action,
        _passwordChange:action,
        _logInClick:action,
    }
)
export default new AuthorisationFormStore();