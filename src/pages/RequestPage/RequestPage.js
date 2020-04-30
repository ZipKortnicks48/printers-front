import React from 'react'
import {RequestBody} from '../../containers'
import {withRouter} from 'react-router-dom'
class RequestPage extends React.Component {

    render(){
    return (
        <React.Fragment>
            <RequestBody/>
        </React.Fragment>)
    }
}
export default withRouter(RequestPage);