
import './App.css';
import TriggerCardList from './components/triggerCard/TriggerCardList.js';
import AddButton from './components/buttonAddTrigger/AddButton.js';
import {getAllTriggers} from './utils/firebase.js';
import HEADER from './components/Header.js';
import React, { useState, useEffect } from 'react';
import DepositButton from './components/buttonDeposit/DepositButton.js';
import { findByLabelText } from '@testing-library/react';
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
    borderRadius:"20px"
 }


  useEffect(()=>{

    const init = async()=>{ 
      let all = await getAllTriggers();     
      console.log("init"); 
      setTriggers(all);  
      console.log("cchhhhain");
      console.log(ChainId);
    } 
    
    init();
  },[ChainId]);
    
  
  const displayAllTriggers=()=>{
    if (UserTriggers.length==0){
      return <div>Create your Trigger by connecting your wallet</div>;

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

          <DepositButton
            userAddress={account[0]}
            web3={Web3}
              
          ></DepositButton> 
        </div>

        {displayAllTriggers(UserTriggers)}
        
      </div>

  );
}

export default App;
