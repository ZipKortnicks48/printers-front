import React from 'react'
import {CartridgeTable,CartridgeOrderTable} from '../../containers/index'
class CartridgePage extends React.Component{
    render(){
        return(<div style={{color:"black",display:"flex",justifyContent:"space-between",width:"100%"}}><CartridgeOrderTable/><CartridgeTable/></div>)
    }
}
export default CartridgePage