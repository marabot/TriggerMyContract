import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addToDB} from '../../utils/firebase.js';


function AddButton({userAddress, chainId}){
  
  
    const [ChainId, setChainId] = useState('');  
    const [Label, setLabel] = useState('');
    const [ToContract, setToContract] = useState('');
    const [FunctionToCall, setFunctionToCall] =useState('');
    const [Timing, setTiming] = useState('daily');   
    const [UserAddr, setUserAddr] = useState('');

    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false); 
    
        
    
    const handleCloseAndSave = () => {    
        
       addToDB(Label, userAddress, ChainId, ToContract, FunctionToCall, Timing );      
       setToContract('');
       setFunctionToCall('');
       setTiming('daily');
       setShow(false);
    };

    const handleShow = () => {   
       
        setShow(true);          
    };

    useEffect(()=>{        
          
        if (userAddress===undefined) {
            document.querySelector("#buttonAdd").disabled = 1;
        }else
        {
            document.querySelector("#buttonAdd").disabled = 0;
        }    
     
      },[userAddress]);

    const options = function(){   
       
        return (
            <select name="timing" onChange={e=>setTiming(e.target.value)}>  
                <option value="every minute">every minute</option>
                <option value="hourly">hourly</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>    
            </select>
        )
    };



    return(            
       
        <div>
            <Button id="buttonAdd" variant="primary" onClick={handleShow}> Create new Trigger </Button> 

             <Modal show={show} style={{opacity:1}} animation={false} onHide={handleClose}>    
            
                    <Modal.Header closeButton>
                            <Modal.Title>Create new Trigger</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>    
                        <label>Name</label><br/>
                        <input value={Label} type="text" name="to" onChange={e=>setLabel(e.target.value)}/><br/>
                        <label>to</label><br/>
                        <input value={ToContract} type="text" name="to" onChange={e=>setToContract(e.target.value)}/><br/>
                        <label>function to call</label><br/>
                        <input value={FunctionToCall} type="text" name="function" onChange={e=>setFunctionToCall(e.target.value)}/><br/>
                        <label>function to call</label><br/>
                        {options()}
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseAndSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>   
              </Modal>       
        </div>            
    );
}

export default AddButton;