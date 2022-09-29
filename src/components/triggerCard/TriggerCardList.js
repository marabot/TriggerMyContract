import TriggerCard from './TriggerCard.js';

function TriggerCardList(triggers){
    // console.log("Card List");
    // console.log(triggers);

    const isReady = ()=>{
        return (
            triggers.length!==0
        );
    }  
 
    if (!isReady){
        return <div>Loading</div>;
    }
   

    const triggersContainer={
        padding:"12px",
        width:"100%",
        height:"100%",
        backgroundColor:"#51111120", 
        borderColor:"#f33fff",
        borderRadius:"10px"
    }

    return(    
        <div style = {triggersContainer}>
           
           {
           triggers.triggers.map((trigger,i)=>{
            
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