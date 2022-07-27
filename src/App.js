import logo from './logo.svg';
import './App.css';
import TriggerCardList from './components/triggerCard/TriggerCardList.js';
import AddButton from './components/buttonAddTrigger/AddButton.js';
//import AddButton from './components/triggerCard/TriggerCardList.js';
import {getAllTriggers} from './utils/firebase.js';
import HEADER from './components/Header.js';
import React, { useState, useEffect } from 'react';



function App() {

  const [Web3, setWeb3] = useState([]);
  const [account, setAccount] = useState([]);
  const [Triggers, setTriggers]=useState([]);

  let allTriggs= [];
/*
  const getFromDB= async()=>{
    allTriggs = await getAllTriggers();  
  };
*/
  function test(trigs){
    console.log("ccc");
    setTriggers(trigs);
    allTriggs= trigs;
    console.log(Triggers);
  }
 
  useEffect(()=>{
    console.log("init");
    const init = async()=>{
     let all = await getAllTriggers();
     //test(all);
    // console.log(allTriggs);
     setTriggers(all);
     console.log("init2");
     console.log(all);
     console.log(Triggers);
    } 

    init();
    },[]);

  //if (Triggers.length==0) return <div>loading</div>;
  return (
    
    <div className="App">
    <HEADER      
      setWeb3={setWeb3}
      setAccounts={setAccount}>
    </HEADER>

<AddButton></AddButton>
      
      <TriggerCardList 
              triggers= {Triggers}
            ></TriggerCardList>        
     
    </div>
  );
}

export default App;
