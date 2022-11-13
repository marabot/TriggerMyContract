
function WelcomeCard(triggers){
    // console.log("Card List");
    // console.log(triggers);  
   

    const triggersContainer={
        display:"flex",        
        flexDirection:"column",
        color:"white",
        padding:"52px",
        width:"100%",
        height:"100%",
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
               
                <p>1  - Connect and create your automated Triggersend some Funds to the TMCaddress automatically created</p>
                <p>2 - send some Funds to the TMCaddress automatically created</p>
                
                <p>3  -  Turn on  you Task, and be carefree</p>
                
            </div>
                
     
                
           
        </div>                    
    );
}

export default WelcomeCard;