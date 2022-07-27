import React, { useState, useEffect } from 'react';
import TriggerCard from './TriggerCard.js';

function TriggerCardList(triggers){

    console.log("triggerCards");
    console.log(triggers);
   // console.log(triggers.triggers[0].FromAddress);
 //   console.log(props.triggers[0]);


    const isReady = ()=>{
        return (
            triggers.triggers.length!=0
        );
    }  
 
    if (!isReady){
        return <div>Loading</div>;
    }

    return(    
        <div>
            <table className="TabTriggerLabel">
                    <tr>
                        <td className="cellTabTrigger">Creator</td>      
                        <td className="cellTabTrigger">Contract To trigger</td>  
                        <td className="cellTabTrigger">Function to call</td>   
                        <td className="cellTabTrigger">Interval</td> 
                        <td> On / Off</td>               
                    </tr>
            </table>
           {triggers.triggers.map((trigger,i)=>{
              return (  <TriggerCard
                trigger = {trigger}
                ></TriggerCard>)
           })
           }
           
        </div>                    
    );
}

export default TriggerCardList;