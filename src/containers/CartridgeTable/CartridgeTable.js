import React, {useState} from "react"
import {getRequest} from '../../utils/requests'
import {CircularProgress,Box,Paper} from '@material-ui/core'
import { isThisSecond } from "date-fns"
export default class CartridgeTable extends React.Component{
   state={
       data:[],
       loader:true,
   }
    componentDidMount=()=>{
        let token=localStorage.getItem("token")
        getRequest('printers/cartridges/',{resolve:(data)=>{this.successCartridges(data)},reject:()=>{this.setState({loader:false})}},token)
        // this.setState({loader:false})
   }
   successCartridges=(data)=>{
        this.setState({data:data['results'],loader:false})
   }
   
    render(){
       if(this.state.loader){return(<Box height="100vh" display="flex" justifyContent="center" alignItems="center"><CircularProgress/></Box>)}
       else{
           return(<React.Fragment>
               <Box width={500} display="flex" flexDirection="column" justifyContent="space-between">
                <Box mb={2} color="text.primary" fontSize={18} fontWeight={500}>Картриджи в наличии</Box>
                {this.state.data.map((x,index)=>{return(
                    <div key={`${index}-table-cartridge-item`} style={{display:"flex",justifyContent:"space-between"}}>
                        <Box color="text.primary" mr={3} fontSize={16}>{x["name"]}</Box>
                        <Box color="text.secondary" fontSize={16}>{`${x["count"]} (шт.)`}</Box>
                    </div>
                )})}
                </Box>
                </React.Fragment>
           )
       }
   }

}
