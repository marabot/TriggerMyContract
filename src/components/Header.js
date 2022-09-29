import React, {useEffect} from "react";
import Web3 from 'web3';
import Web3Modal from "web3modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Header({
     setWeb3, setAccounts, setChainId
}){    
    // Web3modal instance
    let web3Modal;
    
    // Chosen wallet provider given by the dialog window
    let provider;
    
    // Address of the selected account
    let selectedAccount;

    let web3;

    function init() {

     //   console.log("Initializing example");
     //   console.log("WalletConnectProvider is", WalletConnectProvider);
      
        // Tell Web3modal what providers we have available.
        // Built-in web browser provider (only one can exist as a time)
        // like MetaMask, Brave or Opera is added automatically by Web3modal
        const providerOptions = {
         /* walletconnect: {
            package: WalletConnectProvider,
            options: {
              // Mikko's test key - don't copy as your mileage may vary
              infuraId: "3198ac3a6fb44350a28522ea60608de7",
            }
          },*/
        };
        
         onConnect();
 

        web3Modal = new Web3Modal({
          cacheProvider: false, // optional
          providerOptions, // required
        });      
      }
      
      async function fetchAccountData() {
    
        // Get a Web3 instance for the wallet
       // const web3 = new Web3(provider);       
          if (window.ethereum) {
            web3 = new Web3(window.ethereum);   
            setWeb3(web3);     
            await window.ethereum.enable(); 
          
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            // Use Mist/MetaMask's provider.
            web3 = window.web3;
            setWeb3(web3);
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
       }
      
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      
    
      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId();
      console.log("chainId");
      console.log(chainId);
      setChainId(chainId);

        // Load chain information over an HTTP API
       
      if (chainId===1)
      {
        document.querySelector("#network-name").textContent = "Ethereum MainNet";
      }else if (chainId===1337){
        document.querySelector("#network-name").textContent = "Truffle Local";
      }       
      else{
        document.querySelector("#network-name").textContent = "unknowNetwork";
      }
            
      /* const chainData =  EvmChains.getChain(chainId);
      
        document.querySelector("#network-name").textContent = chainData.name;
      */
        // Get list of accounts of the connected wallet
      
        // MetaMask does not give you all accounts, only the selected account
        //console.log("Got accounts", accounts);
        selectedAccount = accounts[0];
        
        selectedAccount=accounts[0].substring(0,5)+ "..." + accounts[0].substring(accounts[0].length-3)
        document.querySelector("#selected-account").textContent = selectedAccount;
  
        // Display fully loaded UI for wallet data
        document.querySelector("#prepare").style.display = "none";
        document.querySelector("#connected").style.display = "block";
      
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
      
        // TODO: Which providers have close method?
        if(provider.close) {
          await provider.close();
      
          // If the cached provider is not cleared,
          // WalletConnect will default to the existing session
          // and does not allow to re-scan the QR code with a new wallet.
          // Depending on your use case you may want or want not his behavir.
          await web3Modal.clearCachedProvider();
          provider = null;
        }
      
        selectedAccount = null;
      
        // Set the UI back to the initial state
        document.querySelector("#prepare").style.display = "block";
        document.querySelector("#connected").style.display = "none";

        setWeb3([]);
        setAccounts([]);
        
      }
      
    window.addEventListener('DOMContentLoaded', async () => {
      init();

      const connectBtn= document.querySelector("#btn-connect");
      if(connectBtn) connectBtn.addEventListener("click", onConnect);
      const disconnectBtn= document.querySelector("#btn-disconnect")
      if(disconnectBtn)disconnectBtn.addEventListener("click", onDisconnect);
    });

    const displayNone={
        display :"none"
    }

  
  const styleAddr= {
      color:"white",
      textAlign:"center",      
      fontSize:"20px",
      borderColor:"black",
      borderSize:"3"
  }
  
  
  const styleTitreBack= {    
      color:"white",    
      fontSize:"30px",
      paddingLeft:"10px"
  }

  const boutonMenu= {
   
    color:"white",
    backgroundColor:"#55225520",  
    borderColor:"#ffffff",
    fontSize:15,
    width:"150px",
    borderRadius: "20px"
 }


 const container={
  display:"flex",
  backgroundColor:"#222222ff",  
  width:"100%",
  height:"110px",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"20px"  
}

 const wrongNetworkMess={
  textAlign:"center",   
    fontSize:15,   
    color:"white"
 }
  /*
   // infos web3
   <div id="accounts">  </div>
 
  */

   useEffect(()=>{
            
    
    //init();
    },[]);



    return(    
        <div style={container}>         
            
              <div style={styleTitreBack}>
                            <div className="header-title" style={styleTitreBack}>
                                    TriggerMyContract
                            </div>
                        </div> 
                   <div id="prepare" >
                      <button id="btn-connect" style={boutonMenu}> connect</button>
                  </div>
                  <div id="connected" style={displayNone}>
                      <div id="header" >    
                        <button id="btn-disconnect"  style={boutonMenu}> disconnect</button>
                                    <div  style={styleAddr} id='selected-account'>   </div>
                                    <div id="network-name" style={wrongNetworkMess}></div>
                        </div>
                    </div>
        </div>
    );
}

export default Header;