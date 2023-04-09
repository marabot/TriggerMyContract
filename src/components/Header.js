import React, {useEffect, useState} from "react";
import Web3 from 'web3';
import Web3Modal from "web3modal";
import logo from "./cmonDoSomethingcontract.png";
import {TryRegisterUser} from '../utils/firebase.js';
import { findByLabelText } from "@testing-library/react";
import DepositButton from "./buttonDeposit/DepositButton";
import WithdrawButton from "./WithdrawButton/WithdrawButton";
import {getTMCWalletAddress,getTMCWalletIndex} from "../utils/firebase.js";
const ethers= require("ethers");
require('dotenv').config();

function Header({
     setWeb3, setAccounts, setChainId, ChainId
}){    
    // Web3modal instance
    let web3Modal;
    
    // Chosen wallet provider given by the dialog window
    let provider;
    
    // Address of the selected account
    let selectedAccount;

    let web3={id:5};
  
  
    const [UserAddr, SetUserAddr]= useState([]);
    const [Web3Lib, setWeb3Lib]= useState([]);
    const [smallScreen, setSmallScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
    
    function init() {
          
        // Tell Web3modal what providers we have available.
        // Built-in web browser provider (only one can exist as a time)
        // like MetaMask, Brave or Opera is added automatically by Web3modal
        const providerOptions = {
         
        };
        
        

        web3Modal = new Web3Modal({
          cacheProvider: false, // optional
          providerOptions, // required
        });      
        onConnect(); 
      }
      
      async function fetchAccountData() {
    
        // Get a Web3 instance for the wallet
       // const web3 = new Web3(provider);       
          if (window.ethereum) {
            web3 = new Web3(window.ethereum);   
            setWeb3(web3);     
            setWeb3Lib(web3);
            await window.ethereum.enable(); 
          
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            // Use Mist/MetaMask's provider.
            web3 = window.web3;
            setWeb3(web3);
            setWeb3Lib(web3);
            console.log("Injected web3 detected.");
          
          }
          // Fallback to localhost; use dev console port by default...
          else {
            const provider = new Web3.providers.HttpProvider(
              "http://localhost:9545"
            );
            
            web3 = new Web3(provider);
            console.log("No web3 instance injected, using Local web3.");
            setWeb3(web3);
            setWeb3Lib(web3);
          }
      
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      
    
      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId();

     
      setChainId(chainId);

      // Load chain information over an HTTP API
       
      if (chainId===1)
      {
        document.querySelector("#network-name").textContent = "Ethereum MainNet";
      }
      else if (chainId===1337){
        document.querySelector("#network-name").textContent = "Truffle Local";
      }
      else if (chainId===5){
        document.querySelector("#network-name").textContent = "Goerli";
      }           
      else{
        document.querySelector("#network-name").textContent = "network not supported";
      }
            
      /* const chainData =  EvmChains.getChain(chainId);
      
        document.querySelector("#network-name").textContent = chainData.name;
      */
        // Get list of accounts of the connected wallet
      
        // MetaMask does not give you all accounts, only the selected account
        //console.log("Got accounts", accounts);
        selectedAccount = accounts[0];

       
        // Display connected account
        selectedAccount=accounts[0].substring(0,5)+ "..." + accounts[0].substring(accounts[0].length-3)
        document.querySelector("#selected-account").textContent = selectedAccount;
      
       // Display balance TMCwallet
       const tmcwalletAddr = await getTMCWalletAddress(accounts[0]);   
       if (tmcwalletAddr!=undefined){
        
       const balance = await web3.eth.getBalance(tmcwalletAddr);        
           document.querySelector("#balanceTMC").textContent =  web3.utils.fromWei(balance).toString().substring(0,10) + " ETH";       
       }


        // Display fully loaded UI for wallet data
        document.querySelector("#prepare").style.display = "none";
        document.querySelector("#connected").style.display = "block";
       
        SetUserAddr(accounts[0]);
      
       // console.log(accounts[0]);
        await TryRegisterUser({userAddress:accounts[0]});
       
      }
    
      async function refreshAccountData() {
    
        // If any current data is displayed when
        // the user is switching acounts in the wallet
        // immediate hide this data
        if (document.querySelector("#connected")) document.querySelector("#connected").style.display = "none";       
        if (document.querySelector("#prepare")) document.querySelector("#prepare").style.display = "block";
      
        // Disable button while UI is loading.
        // fetchAccountData() will take a while as it communicates
        // with Ethereum node via JSON-RPC and loads chain data
        // over an API call.
        if (document.querySelector("#btn-connect"))document.querySelector("#btn-connect").setAttribute("disabled", "disabled");
        await fetchAccountData(provider);
        if (document.querySelector("#btn-connect"))document.querySelector("#btn-connect").removeAttribute("disabled");
      }
      
    
      async function onConnect() {
    
        //console.log("Opening a dialog", web3Modal);
        try {
          provider = await web3Modal.connect();
          
         
        } catch(e) {
          console.log("Could not get a wallet connection", e);
          return;
        }
      
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
          fetchAccountData();
        });
      
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
          fetchAccountData();
        });
      
        // Subscribe to networkId change
        provider.on("networkChanged", (networkId) => {
          fetchAccountData();
        });
      
        await refreshAccountData();
      
      }
    
      async function onDisconnect() {
    
        console.log("Killing the wallet connection", provider);
      
        
        if (provider!=undefined && provider!=null){        
          if(provider.close) {
            await provider.close();
        
            // If the cached provider is not cleared,
            // WalletConnect will default to the existing session
            // and does not allow to re-scan the QR code with a new wallet.
            // Depending on your use case you may want or want not his behavir.
            await web3Modal.clearCachedProvider();
            provider = null;
          
          }
        }

        selectedAccount = null;
      
        // Set the UI back to the initial state
        document.querySelector("#prepare").style.display = "block";
        document.querySelector("#connected").style.display = "none";
        document.querySelector("#selected-account").textContent = "";
        document.querySelector("#balanceTMC").textContent = "";  
        setWeb3([]);
        const chainId = await web3.eth.getChainId();
        setChainId('');
        setAccounts([]);
        SetUserAddr([]);
        
      }
      
    window.addEventListener('DOMContentLoaded', async () => {
      init();

      const connectBtn= document.querySelector("#btn-connect");
      if(connectBtn) connectBtn.addEventListener("click", onConnect);
      const disconnectBtn= document.querySelector("#btn-disconnect")
      if(disconnectBtn)disconnectBtn.addEventListener("click", onDisconnect);
    });



  const deposit =  async  (amount)=>{
  
    const TMCWallet  = await getTMCWalletAddress(UserAddr);    
    let accounts = await Web3Lib.eth.getAccounts();
    
    var options = {value:Web3Lib.utils.toWei(amount),to:TMCWallet,from:accounts[0] };  
    
    const tx = await Web3Lib.eth.sendTransaction(options);   
   // console.log("Tx :");  
   // console.log(tx); 
  }

  const withdraw =  async ()=>{
  
  const TMCwalletIndex = await getTMCWalletIndex(UserAddr);
   
   
  //  provider =  new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_ENDPOINT); 
    const provider =  new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_ENDPOINT); 
   
    const TMCwallet = ethers.Wallet.fromMnemonic(process.env.REACT_APP_MNEMONIC_MAIN, `m/44'/60'/1'/0/` + TMCwalletIndex.toString());  
    const TMCSigner = new ethers.Wallet(TMCwallet.privateKey, provider);  
  
   // const TMCwalletSigner = new ethers.Wallet(TMCwallet.privateKey, provider);  
    const balance = await Web3Lib.eth.getBalance(TMCwallet.address);
   // const balance = await TMCwalletSigner.getBalance();
   

    const balanceWei = ethers.utils.formatEther(balance);
   
  
    const inttt= balanceWei.substring(0, balanceWei.length-14);   // TODO pourquoi devoir couper pour parseEthers?
    
    //const val =  ethers.utils.parseEther(ethers.utils.formatEther(balance));
 
    const val =  ethers.utils.parseEther(inttt);
 

    TMCSigner.sendTransaction({to:UserAddr, value:val});

  }

  const displayNone={
    display :"none"
  }

  
  const styleAddr= {
    display:"flex",
    color:"white",   
    fontSize:"20px",
    borderColor:"black",
    borderSize:"3",
    width:"300px"
  }
  
  
  const styleTitreBack= { 
      display:"flex",   
      alignItems:"center",
      color:"white",    
      fontSize:smallScreen?"30px":"10px",
  }

  const boutonMenu= {
   
    color:"white",
    backgroundColor:"#063970",  
    borderColor:"#ffffff",
    fontSize:15,
    width:"150px",
    height:"30px",
    borderRadius: "20px",
    marginLeft:"15px"
   
 }


 const container={
  display:"flex",
  backgroundColor:"#1f282b",  
  width: smallScreen?"60%":"90%",
  justifyContent:"space-between",
  alignItems:"center",
  marginTop:"20px"  
}

 const wrongNetworkMess={
    fontSize:15,   
    color:"white",
    width:"400px", 
    textAlign:"center"
 }

 const logoStyle= {
    height:"80px"
 }

 const connectContainer= {
  display:"flex",
  color:"white", 
  width:"200px",
  flexDirection:"column"
  
}


const connectLine1= {
  display:"flex",
  flexDirection:"row", 
  justifyContent:"flex-end",
  alignItems:"center",
  paddingBottom:"8px"
  
}

const connectLine2= {
  display:"flex",
  flexDirection:"row", 
  justifyContent:"space-evenly",
  height:"30px"  
}

const connectLine3= {
  display:"flex",
  flexDirection:"row", 
  justifyContent:"flex-end"
  
}
 
 
  /*
   // infos web3
   <div id="accounts">  </div>
 
  */

   useEffect(()=>{
      window
      .matchMedia("(min-width: 800px)")
      .addEventListener('change', e => setSmallScreen( e.matches ));

    },[]);

// TODO display founds

    return(    
        <div style={container}>               
            <div style={styleTitreBack}>
                <img  style= {logoStyle} alt="" src={logo}></img>                     
                              <div className="header-title" style={styleTitreBack}>
                                      TriggerMyContract
                              </div>
            </div> 
            <div style={connectContainer}>
              <div style={connectLine1}> 
                    <div style={styleAddr} id='selected-account'>  </div>
                    <div id="prepare">
                       <button id="btn-connect" style={boutonMenu}> &emsp; connect &emsp;</button>
                    </div>
                    <div id="connected" style={displayNone}>
                        <button id="btn-disconnect"  style={boutonMenu}> disconnect</button>       
                    </div>
               </div>

              <div style={connectLine2}>
                <div id="balanceTMC" style={styleAddr}> </div>
                <div id="network-name" style={wrongNetworkMess}> - </div> 
              </div>
              <div id="buttons" style={connectLine3}>
                <DepositButton
                      userWallet={UserAddr}
                      deposit={deposit}
                      chainId={ChainId}>                      
                </DepositButton>

                <WithdrawButton
                      userWallet={UserAddr}
                      withdraw={withdraw}
                      chainId={ChainId}>
                </WithdrawButton>
              </div>             
           </div>
        </div>
    );
}

export default Header;