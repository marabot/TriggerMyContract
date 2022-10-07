import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {TryRegisterUser} from '../../utils/firebase.js';
require('dotenv').config();


function DepositButton(userWallet){
  
    const [UserAddr, setUserAddr] = useState('');
    const [DepositValue, setDepositValue] = useState(0);
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
    const deposit = async () => {    
       await TryRegisterUser(UserAddr);
      // TMC_AccountsContract.deposit({value:DepositValue});

       setShow(false);
    };

  

    useEffect(()=>{
        
        const init = async()=>{ 
          setUserAddr(userWallet);          
        } 
        
        if (userWallet.userAddress===undefined) {
            document.querySelector("#buttonDeposit").disabled = 1;
        }else
        {
            document.querySelector("#buttonDeposit").disabled = 0;
        }
        
       
        init();
      },[userWallet]);   
     

    return(            
       
        <div>
         <Button id="buttonDeposit" variant="primary" onClick={handleShow}> Deposit</Button> 

                <Modal show={show} style={{opacity:1}} animation={false} onHide={handleClose}>    

                    <Modal.Header closeButton>
                            <Modal.Title>Deposit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>    
                        <label>Amount</label><br/>
                        <input value={DepositValue} type="text" name="to" onChange={e=>setDepositValue(e.target.value)}/><br/>
                        
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={deposit}>
                            Deposit
                        </Button>
                    </Modal.Footer>   
                </Modal>       
          
        </div>            
    );
}

export default DepositButton;