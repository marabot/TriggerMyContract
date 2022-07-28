import React, { useState, useEffect } from 'react';
import TriggerCard from './TriggerCard.js';

function TriggerCardList(triggers, updateFunction){
     
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
           
           {triggers.triggers.map((trigger,i)=>{
            
              return ( 
                
                <div key={i}>
                    
                    <TriggerCard
                        trigger = {trigger}
                        updateFunction={updateFunction}
                    ></TriggerCard>
                
                </div>)
           })
           }
           
        </div>                    
    );
}

export default TriggerCardList;