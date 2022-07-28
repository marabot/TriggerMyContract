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
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [UserTriggers, setUserTriggers] =useState([]);
   
  useEffect(()=>{

    const init = async()=>{ 
      let all = await getAllTriggers();     
      console.log("initttt"); 
      setTriggers(all);    
    } 
    
    init();
  },[]);

  useEffect(() => { 
   setUserTriggers(Triggers.filter(e => e.maker == account[0]));
  }, [Triggers,account]);


  //if (Triggers.length==0) return <div>loading</div>;
  return (
    
    <div className="App">
    <HEADER      
      setWeb3={setWeb3}
      setAccounts={setAccount}>
    </HEADER>

<AddButton></AddButton>
      
      <TriggerCardList 
              triggers= {UserTriggers}
             
            ></TriggerCardList>        
     
    </div>
  );
}

export default App;
