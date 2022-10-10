
import './App.css';
import TriggerCardList from './components/triggerCard/TriggerCardList.js';
import AddButton from './components/buttonAddTrigger/AddButton.js';
import WelcomeCard from './components/welcomeCard/WelcomeCard.js';
import {getAllTriggers} from './utils/firebase.js';
import HEADER from './components/Header.js';
import React, { useState, useEffect } from 'react';
import DepositButton from './components/buttonDeposit/DepositButton.js';
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });


function App() {

  const [Web3, setWeb3] = useState([]);
  const [account, setAccount] = useState([]);
  const [ChainId, setChainId] = useState('');
  const [Triggers, setTriggers]=useState([]);
  const [UserTriggers, setUserTriggers] =useState([]);
   

 
  const butAddAndDepositDiv={
    display:"flex",
    justifyContent:"space-around",
    padding:"30px",
    width:"50%",
    //backgroundColor:"#51111120", 
    borderColor:"#f33fff",
    borderRadius:"20px",
    backgroundColor:"#1f282b"
 }


  useEffect(()=>{

    const init = async()=>{ 
      let all = await getAllTriggers();     
      console.log("init"); 
      setTriggers(all);  
      console.log("cchhhhain");
      console.log(ChainId);
      
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
              ></TriggerCardList>   
          </div> 
      );
    }
  }


  useEffect(() => { 
   setUserTriggers(Triggers.filter(e => e.maker === account[0]));
  }, [Triggers,account]);


  return (
    
    <div className="App">
      <HEADER      
        setWeb3={setWeb3}
        setAccounts={setAccount}
        setChainId={setChainId}
        />
        
      <div style={butAddAndDepositDiv}>
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
