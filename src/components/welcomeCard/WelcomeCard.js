
function WelcomeCard(triggers){
    // console.log("Card List");
    // console.log(triggers);  
   

    const triggersContainer={
        display:"flex",        
        flexDirection:"column",
        color:"white",
        padding:"12px",
        width:"100%",
        height:"100%",
        backgroundColor:"#51111120", 
        borderColor:"#f33fff",
        borderRadius:"10px"
    }

    const plzConnect= {
        color:"white",
        flexSelf:"flex-start",
        padding:"50px"

    }
  //TODO afficher TMC adress quadn connecté
    return(    
        <div >
            <div
            style = {triggersContainer}>
               
                <p>1 - Connect and send some Funds to the TMCaddress automatically created</p>
                <p>2 - Create your automated Trigger</p>
                
                <p>3 - Turn on  you Task, and be carefree</p>
                
             </div>
                
        <p style={plzConnect}> Connect to create your first automated Trigger</p>

                
           
        </div>                    
    );
}

export default WelcomeCard;