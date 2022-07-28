import React, { useState, useEffect } from 'react';
import TriggerCard from './TriggerCard.js';

function TriggerCardList(triggers){
     console.log("Card List");
    console.log(triggers);

    const isReady = ()=>{
        return (
            triggers.length!=0
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
                       
                    ></TriggerCard>
                
                </div>)
           })
           }
           
        </div>                    
    );
}

export default TriggerCardList;