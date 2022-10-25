import { findByLabelText } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../custom.css';
import {switchTriggerState, deleteTrigger} from '../../utils/firebase.js';

function TriggerCard({trigger, reload}){

    const [Running, setRunnning] = React.useState(trigger.inWork);  
    const [DetailsDisplay, setDetailsDisplay] = useState(false);
    const [show, setShow] = useState(false); 
    const [showWarning, setShowWarning] = useState(false); 

    
    const handleClose = () => setShow(false); 
    const detailsClick = () => setShow(true);
    const handleCloseWarning = () => setShowWarning(false); 
    const deleteClick = () => setShowWarning(true);
    
    const OnOffButton = function (triggerId){
             
        if (Running===true){
            return <button onClick={()=>switchInWork(triggerId, false)}> Stop </button>
        }else
        {
            return <button onClick={()=>switchInWork(triggerId, true)}> Start</button>
        }   
    }    
    
    const switchInWork = (id, value)=>
    {
        switchTriggerState(id, value);    
        setRunnning(value);
    }

    const deleteThisTrigger = (id)=>
    {   
        deleteTrigger(id);   
        reload();
    }

    
  
    
       
    const detailsLink = {
        display:"flex",
        justifyContent:"flex-end",   
        color:"blue",
        fontSize: "20px", 
        padding:"8px", 
        paddingRight:"30px"
    }

    const modalStyle={
        backgroundColor: "rgb(236, 236, 236)", 
        width:"600px"
    }

    
    const main = {
        width:"1200px"
    }

    const stateColor=(running)=>{
        if (running){
            return(
                <div style={{color:"green"}}>Running</div>
            )
        }else
        {
            return(
                <div style={{color:"red"}}> Paused </div>
            )
        }
    }

    useEffect(()=>{

        const init = async()=>{
        setRunnning(trigger.inWork);    
        } 

        init();

    },[trigger]);

    return(    
        
        <div style={main}>            
            <table className="TabTrigger">
                <tbody>
                     <tr>
                        <td width="25%" className = "cellTabTriggerLabel">Name</td>
                        <td width="45%" className="cellTabTriggerLabel">contract called</td>
                        <td width="10%"></td>
                        <td width ="10%" className="cellTabTriggerLabel">state</td>
                        <td width="10%"><div style={detailsLink} onClick={detailsClick}>Details...</div></td>
                     </tr>
                     <tr>
                        <td className = "cellTabTriggerInfos">{trigger.label}</td>   
                        <td className="cellTabTriggerInfos">{trigger.contractToCall}</td>   
                        <td className="cellTabTriggerCentered">{OnOffButton(trigger.id)}</td>     
                        <td className = "cellTabTrigger"> {stateColor(Running)}</td>
                        <td colSpan="5"><button onClick={()=>deleteClick()}> Delete </button></td>    
                     </tr>
                    
                </tbody>
            </table>    

            <Modal show={show} style={{opacity:1, margin:100}} animation={false} onHide={handleClose}>    

                    <Modal.Header closeButton  style={modalStyle}>
                            <Modal.Title>DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalStyle}>
                    <table className="TabTrigger">
                            <tbody>
                                <tr><td className = "cellTabTriggerLabel">Name</td></tr>
                                <tr><td className = "cellTabTriggerInfos">{trigger.label}</td></tr>

                                <tr><td className = "cellTabTriggerLabel">Maker</td></tr>
                                <tr><td className = "cellTabTriggerInfos">{trigger.maker}</td></tr>

                                <tr><td className="cellTabTriggerLabel">contract called</td></tr>
                                <tr><td className="cellTabTriggerInfos">{trigger.contractToCall}</td></tr>

                                <tr><td className="cellTabTriggerLabel">function called</td></tr>
                                <tr><td className="cellTabTriggerInfos">{trigger.functionToCall}</td></tr>

                                <tr><td className = "cellTabTriggerLabel">Interval</td></tr>
                                <tr><td className="cellTabTriggerInfos">{trigger.interval}</td></tr>

                                <tr><td className="cellTabTriggerLabel">state</td></tr>
                                <tr><td className = "cellTabTrigger"> {Running?"Running":"Paused"}</td></tr>
                                
                                <tr><td className = "cellTabTriggerLabel">Last tick Cost</td></tr>
                                <tr><td className="cellTabTriggerInfos">{trigger.lastTick}</td></tr>                            
                            </tbody>
                    </table>    
                    </Modal.Body>

                    <Modal.Footer  style={modalStyle}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>                      
                    </Modal.Footer>   
                </Modal>   

                  <Modal show={showWarning} style={{opacity:1, margin:100}} animation={false} onHide={handleCloseWarning}>    

                    <Modal.Header closeButton  style={modalStyle}>
                            <Modal.Title>DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalStyle}>
                    {trigger.label} will be deleted
                    </Modal.Body>

                    <Modal.Footer  style={modalStyle}>
                        <Button variant="secondary" onClick={handleCloseWarning}>
                            Cancel
                        </Button>     
                        <Button variant="secondary" onClick={()=>deleteThisTrigger(trigger.id)}>
                            Confirm
                        </Button>                     
                    </Modal.Footer>   
                </Modal>                                                             
         </div> 
    )
}

export default TriggerCard;