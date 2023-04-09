import TriggerCard from './TriggerCard.js';
import React, {useEffect, useState} from "react";


function TriggerCardList({triggers, reload}){
    // console.log("Card List");
    // console.log(triggers);

    const [BigScreen, setBigScreen] = useState(window.matchMedia("(min-width: 600px)").matches);

    useEffect(()=>{
        window
        .matchMedia("(min-width: 600px)")
        .addEventListener('change', e => setBigScreen( e.matches ));
  
      },[]);

    const isReady = ()=>{
        return (
            triggers.length!==0
        );
    }  
 
    if (!isReady){
        return <div>Loading</div>;
    }
   
    const reload2 = async()=>{
        reload();
    }

    const triggersContainer={
        padding:"12px",
        width:BigScreen?"50vw":"100vw",
        height:"auto",
        backgroundColor:"#1f282b", 
        borderColor:"#f33fff",
        borderRadius:"10px",
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
        gridGap:"0px",               
        justifyContent:"center",
        alignItems:"center",
        padding:"2vw",
    }


    return(    
        <div style = {triggersContainer}>
           
           {
           triggers.map((trigger,i)=>{
            
                return ( 
                    
                    <div key={i}>
                        
                        <TriggerCard
                            trigger = {trigger} 
                            reload={reload2}                       
                        ></TriggerCard>
                    
                    </div>)
            })
           }
           
        </div>                    
    );
}

export default TriggerCardList;