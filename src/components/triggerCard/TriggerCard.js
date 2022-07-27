import React, { useState, useEffect } from 'react';
import '../../custom.css';

const OnOffButton = function (runningState, stopTrigger, startTrigger){
    if (runningState){
        return <button > Stop </button>
    }else
    {
        return <button> Start</button>
    }
}

function TriggerCard(trigger){
    console.log("triggerCard");
    console.log(trigger.trigger.fromAddress);
    const t= trigger.trigger;
    const onOffState = trigger.trigger.inWork;
  //  console.log(trigger.trigger.fromAddress);
 // if (trigger.trigger.fromAddress) console.log(trigger.trigger.fromAddress);   

    return(    
        <div>
           <table className="TabTrigger">
                    <tr>
                        <td className="cellTabTriggerLabel">Maker</td>
                        <td className="cellTabTriggerInfos">{trigger.trigger.maker}</td>   
                        <td  className="cellTabTriggerLabelInterval">Interval</td>                           
                        <td className="cellTabTrigger"> {onOffState?"Running":"Paused"}</td>  
                    </tr>
                    <tr>
                        <td className="cellTabTriggerLabel">contract</td>
                        <td className="cellTabTriggerInfos">{trigger.trigger.contractToCall}</td> 
                        <td className="cellTabTrigger">{trigger.trigger.interval}</td>
                        <td className="cellTabTrigger">Last tick : {trigger.trigger.lastTick}</td>
                        <td className="cellTabTrigger">{OnOffButton(onOffState)}</td>  
                    </tr>
                    <tr>
                        <td className="cellTabTriggerLabel">function</td>
                        <td className="cellTabTriggerInfos">{trigger.trigger.functionToCall}</td>
                    </tr>
                    </table>                                   
        </div>             
    );
}

export default TriggerCard;