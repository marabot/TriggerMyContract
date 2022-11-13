import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../custom.css';
import TimestampToString from '../Misc/TimestampToString.js';

import {switchTriggerState, deleteTrigger, getResultCallByTrigger} from '../../utils/firebase.js';

function TriggerCard({trigger, reload}){

    const [Running, setRunnning] = React.useState(trigger.inWork);  
    const [Show, setShow] = useState(false); 
    const [ShowWarning, setShowWarning] = useState(false); 
    const [ShowHistory, setShowHistory] = useState(false);
    const [CallHistory, setCallHistory] = useState([]);

    const handleClose = () => setShow(false); 
    const handleCloseHistory = () => setShowHistory(false);
    const detailsClick = () => setShow(true);
    const HistoryClick = () => setShowHistory(true);
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

    const DeleteAction = (id)=>
    {   
        deleteTrigger(id); 
        setShowWarning(false);  
        reload();
    }
      
       
    const detailsLink = {       
        color:"blue",
        fontSize: "15px", 
        height:"29px",
        textAlign:"center",
    }

    const detailsCell={
        display:"flex",
        flexDirection:"column"
    }

    const buttonDelete={
        fontSize:"13px",
    }

    const modalStyle={
        width:"1600px",    
      
    }
    
    const modalStyleDetails={
        width:"1900px",    
      
    }


    const modalSectionStyle={
        backgroundColor: "rgb(236, 236, 236)", 
        width:"1000px",
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    const modalSectionDetailsStyle={
        backgroundColor: "rgb(236, 236, 236)",
        width:"600px",
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    const main = {
        width:"1200px",
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    const result = {
        fontSize:"13px",
        borderTop:"1px solid black"
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
        const callsHistory = await getResultCallByTrigger(trigger.id);
        
       
        setCallHistory(callsHistory);
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
                        <td width="10%" rowSpan="2">                            
                            <div style={detailsLink} onClick={detailsClick}>Details...</div>
                            <div style={detailsLink} onClick={HistoryClick}>History...</div>    
                            <div style={detailsLink}><button style={buttonDelete} onClick={()=>deleteClick()}> Delete </button></div>                           
                        </td>
                     </tr>
                     <tr>
                        <td className = "cellTabTriggerInfos">{trigger.label}</td>   
                        <td className="cellTabTriggerInfos">{trigger.contractToCall}</td>   
                        <td className="cellTabTriggerCentered">{OnOffButton(trigger.id)}</td>     
                        <td className = "cellTabTrigger"> {stateColor(Running)}</td>
                        <td colSpan="5"></td>    
                     </tr>
                    
                </tbody>
            </table>    
      
            <Modal show={Show}  style={modalStyleDetails} animation={true} onHide={handleClose} centered>    

                    <Modal.Header closeButton  style={modalSectionDetailsStyle} >
                            <Modal.Title>DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalSectionDetailsStyle}>
                    <table className="TabTrigger">
                            <tbody>                               
                                <tr><td className = "cellTabTriggerLabel" >Name</td></tr>
                                <tr><td className = "cellTabTriggerInfos" >{trigger.label}</td></tr>

                                <tr><td className = "cellTabTriggerLabel" >Maker</td></tr>
                                <tr><td className = "cellTabTriggerInfos" >{trigger.maker}</td></tr>

                                <tr><td className="cellTabTriggerLabel" >contract called</td></tr>
                                <tr><td className="cellTabTriggerInfos" >{trigger.contractToCall}</td></tr>

                                <tr><td className="cellTabTriggerLabel" >function called</td></tr>
                                <tr><td className="cellTabTriggerInfos" >{trigger.functionToCall}</td></tr>

                                <tr><td className = "cellTabTriggerLabel" >Interval</td></tr>
                                <tr><td className="cellTabTriggerInfos" >{trigger.interval}</td></tr>

                                <tr><td className="cellTabTriggerLabel" >state</td></tr>
                                <tr><td className = "cellTabTriggerInfos" > {Running?"Running":"Paused"} </td></tr>
                                
                                <tr><td className = "cellTabTriggerLabel" >Last tick Cost</td></tr>
                                <tr><td className="cellTabTriggerInfos" >{trigger.lastTick}</td></tr>  
                            </tbody>
                    </table> 
                    </Modal.Body>

                    <Modal.Footer style={modalSectionDetailsStyle}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>                      
                    </Modal.Footer>   
                </Modal> 
                
                
                 <Modal show={ShowHistory} style={modalStyle} animation={true} onHide={handleCloseHistory} centered>    

                    <Modal.Header closeButton style={modalSectionStyle}>
                            <Modal.Title>DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalSectionStyle}>
                    <table className="TabTrigger">                                    
                            <tbody>                              
                                {CallHistory.map((c)=>{
                                    return (
                                            <tr style={result}>
                                                <td><TimestampToString timestamp = {c.time}/></td>                                            
                                                <td>| txHash  {c.txHash}</td>
                                                <td>| fees :  {c.fees} ETH</td>
                                                <td>| gas used : {c.gasUsed}</td>
                                                <td>| status : {c.status?"success":"reverted"}</td>                                                
                                            </tr>                                        
                                         )
                                })}
                            </tbody>
                    </table> 
                    </Modal.Body>

                    <Modal.Footer style={modalSectionStyle} >
                        <Button variant="secondary" onClick={handleCloseWarning}>
                            Close
                        </Button>                      
                    </Modal.Footer>   
                </Modal> 

                <Modal show={ShowWarning} style={modalStyle} animation={true} onHide={handleCloseWarning} centered>    
                    <Modal.Header closeButton style={modalSectionStyle}>
                            <Modal.Title>Confirm Delete "{trigger.label}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalSectionStyle}>
                     <div></div>
                    </Modal.Body>

                    <Modal.Footer style={modalSectionStyle} >
                        <Button variant="secondary" onClick={handleCloseWarning}>
                            Cancel
                        </Button>         
                        <Button variant="secondary" onClick={()=>DeleteAction(trigger.id)}>
                            Delete
                        </Button>                   
                    </Modal.Footer>   
                </Modal> 
           </div>
                          
        
    )
}

export default TriggerCard;