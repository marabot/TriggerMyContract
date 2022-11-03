import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addToDB} from '../../utils/firebase.js';


function AddButton({userAddress, chainId}){
  
  
   
    const [Label, setLabel] = useState('');
    const [ToContract, setToContract] = useState('');
    const [FunctionToCall, setFunctionToCall] =useState('');
    const [Timing, setTiming] = useState(0);   
    const [UserAddr, setUserAddr] = useState('');
    const [ShowIntervalType, setShowintervalType] = useState('every');

    const [show, setShow] = useState(false); 
    const [Days, setDays] = useState(0);
    const [Hours, setHours] = useState(0);
    const [Minutes, setMinutes] = useState(0);
    
    
    const handleClose = () => setShow(false); 
    
    
    
    const handleCloseAndSave = () => {    
    
       addToDB(Label, userAddress, chainId, ToContract, FunctionToCall, Timing );      
       setToContract('');
       setFunctionToCall('');
       setTiming('daily');
       setShow(false);
    };

    const handleShow = () => {          
        setShow(true);          
    };
  
    const selectInterval={
        width:"30px", 
        borderColor:"#000000",
        borderRadius:"1px",
        backgroundColor:"#cccccc"
     }

     const interval={
        display:"flex",    
        width:"70%",
        justifyContent:"space-around",
     }

    useEffect(()=>{        
              
        if (userAddress===undefined || (chainId!==1 && chainId!==5)) {
            document.querySelector("#buttonAdd").disabled = 1;
        }else
        {
            document.querySelector("#buttonAdd").disabled = 0;
        }   
     
        setTiming(timing);
       
      },[userAddress, chainId, Days, Hours, Minutes]);
    
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
                        <label>Interval</label><br/>    
                        <div>        
                            <div  id ="interval" style={interval}>
                                <div > Days : <input style={selectInterval} type="text" value={Days} name="d" id="days" onChange={e=>setDays(e.target.value)}/> </div> +
                                <div > Hours : <input style={selectInterval} type="text" value={Hours} name="h" id="hours" onChange={e=>setHours(e.target.value)}/> </div> +
                                <div > Minutes : <input style={selectInterval} type="text" value={Minutes} name="m" id="minutes" onChange={e=>setMinutes(e.target.value)}/> </div>
                            </div>
                        </div>                        
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