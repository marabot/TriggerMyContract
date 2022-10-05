import { findByLabelText } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import '../../custom.css';
import {switchTriggerState} from '../../utils/firebase.js';

function TriggerCard(trigger){

    const [Running, setRunnning] = React.useState(trigger.inWork);  
    const [DetailsDisplay, setDetailsDisplay] = useState(false);

    const OnOffButton = function (triggerId){
             
        if (Running===true){
            return <button onClick={()=>switchInWork(triggerId, false)}> Stop </button>
        }else
        {
            return <button onClick={()=>switchInWork(triggerId, true)}> Start</button>
        }   
    }    
    
    const switchInWork = (id, value)=>
    {
        switchTriggerState(id, value);    
        setRunnning(value);
    }

    const detailsLink = {
        display:"flex",
        justifyContent:"flex-end",   
        color:"blue", 
        padding:"8px", 
        paddingRight:"30px"
    }


    
    const main = {
        width:"1200px"
    }

    const detailsClick= ()=>{
        if (DetailsDisplay===false)setDetailsDisplay(true);
        if (DetailsDisplay===true)setDetailsDisplay(false);
    };

    const detailsDisplayLabels=function(){

            if (DetailsDisplay){           
                return (
                <tr id="detailsRow1" >
                    <td className = "cellTabTriggerLabel">Maker</td>
                    <td className="cellTabTriggerLabel">function called</td>
                    <td className = "cellTabTriggerLabel">Interval</td>  
                    <td className = "cellTabTriggerLabel">Last tick Cost</td>  
                </tr>

                )
            }
    }

    const detailsDisplayInfos=function(){
        if (DetailsDisplay){           
            return (
            <tr id="detailsRow2" >            
                <td className = "cellTabTriggerInfos">{trigger.trigger.maker}</td>              
                <td className="cellTabTriggerInfos">{trigger.trigger.functionToCall}</td> 
                <td className="cellTabTrigger">{trigger.trigger.interval}</td>
                <td className="cellTabTrigger">{trigger.trigger.lastTick}</td>                       
            </tr>

            )
        }
}


    useEffect(()=>{

        const init = async()=>{
        setRunnning(trigger.trigger.inWork);    
        } 

        init();

    },[trigger]);

    return(    
        
        <div style={main}>            
            <table className="TabTrigger">
                 <tbody>
                     <tr>
                        <td className = "cellTabTriggerLabel">Name</td>
                        <td className="cellTabTriggerLabel">contract called</td>
                        <td></td>
                        <td className="cellTabTriggerLabel">state</td>
                     </tr>
                     <tr>
                        <td className = "cellTabTriggerInfos">{trigger.trigger.label}</td>   
                        <td className="cellTabTriggerInfos">{trigger.trigger.contractToCall}</td>   
                        <td className="cellTabTriggerCentered">{OnOffButton(trigger.trigger.id)}</td>     
                        <td className = "cellTabTrigger"> {Running?"Running":"Paused"}</td>    
                     </tr>
                     <tr>
                        <td colspan="5"><div style={detailsLink} onClick={detailsClick}>Details...</div></td>
                     </tr>

                      {detailsDisplayLabels()}
                      {detailsDisplayInfos()}
                                        
                   
                        </tbody>
                    </table>                                                        
         </div> 
    )
}

export default TriggerCard;