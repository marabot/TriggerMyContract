import React, { useState, useEffect, force } from 'react';
import '../../custom.css';
import {switchTriggerState} from '../../utils/firebase.js';

function TriggerCard(trigger){

    const [Running, setRunnning] = React.useState(trigger.inWork);  
   
    const OnOffButton = function (triggerId){
             
        if (Running==true){
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

    useEffect(()=>{

        const init = async()=>{
        setRunnning(trigger.trigger.inWork);    
        } 

        init();
    },[]);

    return(    
        
        <div>            
            <table className="TabTrigger">
                 <tbody>
                     <tr>
                         <td className = "cellTabTriggerLabel">Maker</td>
                         <td className = "cellTabTriggerInfos">{trigger.trigger.maker}</td>   
                         <td className = "cellTabTriggerLabelInterval">Interval</td>                           
                         <td className = "cellTabTrigger"> {Running?"Running":"Paused"}</td>  
                     </tr>
                     <tr>
                         <td className="cellTabTriggerLabel">contract</td>
                         <td className="cellTabTriggerInfos">{trigger.trigger.contractToCall}</td> 
                         <td className="cellTabTrigger">{trigger.trigger.interval}</td>
                         <td className="cellTabTrigger">Last tick : {trigger.trigger.lastTick}</td>
                         <td className="cellTabTrigger">{OnOffButton(trigger.trigger.id)}</td>  
                     </tr>
                     <tr>
                         <td className="cellTabTriggerLabel">function</td>
                         <td className="cellTabTriggerInfos">{trigger.trigger.functionToCall}</td>
                     </tr>
                 </tbody>
             </table>                                                        
         </div> 
    )
}

export default TriggerCard;