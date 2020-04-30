import React from 'react'
import {inject,observer} from 'mobx-react'
class RequestBody extends React.Component{
    render()
    {
        return(
            <React.Fragment>Ghbdtn</React.Fragment>
        )
    }
}

export default inject('RequestBodyStore')(observer(RequestBody));