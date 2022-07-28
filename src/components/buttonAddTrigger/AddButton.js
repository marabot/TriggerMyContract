import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addToDB} from '../../utils/firebase.js';


function AddButton(){
  
    const [UserAddr, setUserAddr] = useState('');
    const [ToContract, setToContract] = useState('');
    const [FunctionToCall, setFunctionToCall] =useState('');
    const [Timing, setTiming] = useState('daily');   
   
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);  

    const handleCloseAndSave = () => {    
       addToDB(UserAddr, ToContract, FunctionToCall, Timing);
       setUserAddr('');
       setToContract('');
       setFunctionToCall('');
       setTiming('daily');
       setShow(false);
    };

    const handleShow = () => {
        console.log(show);
        setShow(true);
        console.log(show);        
    };

    const options = function(){  

        return (
            <select name="timing" onChange={e=>setTiming(e.target.value)}>  
                <option value="hourly">hourly</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>    
            </select>
        )
    };
 
     

    return(            
       
        <div>
            <Button variant="primary" onClick={handleShow}> Add new Trigger </Button> 

             <Modal show={show} style={{opacity:1}} animation={false} onHide={handleClose}>    
            
                    <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                        <label>from</label><br/>
                        <input value={UserAddr} type="text" name="from" onChange={e=>setUserAddr(e.target.value)}/><br/>
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