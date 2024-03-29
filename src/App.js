
import './App.css';
import TriggerCardList from './components/triggerCard/TriggerCardList.js';
import AddButton from './components/buttonAddTrigger/AddButton.js';
import WelcomeCard from './components/welcomeCard/WelcomeCard.js';
import {getAllTriggers} from './utils/firebase.js';
import HEADER from './components/Header.js';
import React, { useState, useEffect } from 'react';
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });


function App() {

  const [Web3, setWeb3] = useState([]);
  const [account, setAccount] = useState([]);
  const [ChainId, setChainId] = useState('');
  const [Triggers, setTriggers]=useState([]);
  const [UserTriggers, setUserTriggers] =useState([]);   

 
  const butAddDiv={
    display:"flex",
    justifyContent:"space-around",
    padding:"30px",
    width:"100%",
    borderColor:"#f33fff",
    borderRadius:"20px",
    backgroundColor:"#1f282b"
 }

  const reload = async()=>{
    let all = await getAllTriggers(); 
    console.log(all);  
    setTriggers(all);  

  }

  useEffect(()=>{

    const init = async()=>{ 
      let all = await getAllTriggers(); 
      console.log(all);  
      setTriggers(all);        
      document.body.style.backgroundColor = "#1f282b";

    } 
    
    init();
  },[ChainId]);
    
  
  const displayAllTriggers=()=>{
    if (UserTriggers.length===0){
      return <div ><WelcomeCard></WelcomeCard></div>;

    }else
    {
      return (
        <div >
            <TriggerCardList 
                    triggers= {UserTriggers} 
                    reload={reload}               
              ></TriggerCardList>   
          </div> 
      );
    }
  }


  useEffect(() => { 
    
   setUserTriggers(Triggers.filter(e => e.maker === account[0]).filter(e=>e.deleted === false));  

  }, [Triggers,account, ChainId]);


  return (
    <div className="App">
       <HEADER      
          setWeb3={setWeb3}
          setAccounts={setAccount}
          setChainId={setChainId}
          ChainId={ChainId}          
          />     
       
          
        <div style={butAddDiv}>        
            <AddButton 
              userAddress={account[0]}  
              chainId={ChainId}    
            ></AddButton>         
        </div>     

        {displayAllTriggers(UserTriggers)}
        
      </div>
    
  );
}

export default App;
