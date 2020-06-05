import React from 'react'
import {RequestBody, CommentPanel} from '../../containers'
import {withRouter} from 'react-router-dom'
class RequestPage extends React.Component {

    render(){
       
    return (
        <React.Fragment>
            <RequestBody history={this.props.history} id={this.props.match.params.number}/>
            <CommentPanel id={this.props.match.params.number}/>
        </React.Fragment>)
    }
}
export default withRouter(RequestPage);