import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

require('dotenv').config();


function WithdrawButton({userWallet, withdraw, chainId}){
  
    const [UserAddr, setUserAddr] = useState('');
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);    
       
    
    /*
    console.log("infos !!");
    console.log(userWallet);
    console.log(TMC_Accounts);
    console.log(web3);
    */

    //const TMC_AccountsContract = new ethers.Contract("0x3c9dCDE8541444b9019e0f9f70bDCdd3bA8AA6cB", TMC_Accounts, userWallet);    
    const action = async () => {    
 
      console.log("action");

       await withdraw();
       setShow(false);
    };

    const style= {
        margin:"5px",
        backgroundColor:"#0f3260",
        borderColor:"#05447a"
    }

    useEffect(()=>{
        
        const init = async()=>{ 
          setUserAddr(userWallet);          
        } 
        
        if (userWallet.length===0 || (chainId!==1 && chainId!==5)) {
            document.querySelector("#buttonWithdraw").disabled = 1;
        }else
        {
            document.querySelector("#buttonWithdraw").disabled = 0;
        }
        
       
        init();
      },[userWallet, chainId]);   
     

    return(            
       
        <div>
         <Button id="buttonWithdraw" variant="primary" onClick={handleShow} style={style}> Withdraw</Button> 

                <Modal show={show} style={{opacity:1}} animation={false} onHide={handleClose}>    

                    <Modal.Header closeButton>
                            <Modal.Title>Withdraw</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This action will sent back all your funds for this network and Triggers will be paused.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"   onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"  style={style} onClick={action}>
                            Withdraw
                        </Button>
                    </Modal.Footer>   
                </Modal>       
          
        </div>            
    );
}

export default WithdrawButton;