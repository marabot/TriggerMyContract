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
            return <button onClick={()=>switchInWork(triggerId, false)} style={switchOnOff}> Stop </button>
        }else
        {
            return <button onClick={()=>switchInWork(triggerId, true)} style={switchOnOff}> Start</button>
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
        fontSize: "11px", 
        height:"29px",
        textAlign:"center",
        paddingTop:"3px",
    }

    const detailsCell={
        display:"flex",
        flexDirection:"column"
    }

    const buttonDelete={
        fontSize:"11px",
    }

    const switchOnOff={
        fontSize:"14px",
    }

    const modalStyle={
        width:"800px",    
      
    }
    
    const modalStyleDetails={
        width:"600px",    
      
    }


    const modalSectionStyle={
        backgroundColor: "rgb(236, 236, 236)", 
        width:"600px",
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
        width:"300px",
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        margin:'10px'
    }

    const result = {
        fontSize:"12px",
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
           
            <table className="TabTriggerGrid">
                <tbody>                     
                        <tr><td width ="25%" className = "cellTabTriggerLabelGrid"> Name </td></tr>
                        <tr><td width ="25%" className = "cellTabTriggerInfosGrid">{trigger.label}</td></tr>
                        <tr><td width ="25%" className = "cellTabTriggerLabelGrid"> Contract </td></tr>
                        <tr><td width ="20%" className = "cellTabTriggerInfosGrid">{trigger.contractToCall.substring(0,5) + "..." + trigger.contractToCall.substring(trigger.contractToCall.length-3,trigger.contractToCall.length)} </td></tr>                      
                        <tr><td width ="15%" className = "cellTabTriggerInfosState">{stateColor(Running)} <p></p> {OnOffButton(trigger.id)}</td></tr>
                        <tr><td width="25%" className = "cellTabTriggerInfosState" rowSpan="2">                            
                            <div style={detailsLink} onClick={detailsClick}>Details...</div>
                            <div style={detailsLink} onClick={HistoryClick}>History...</div>    
                            <div style={detailsLink}><button style={buttonDelete} onClick={()=>deleteClick()}> Delete </button></div>                           
                        </td></tr>          
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
                        <Button variant="secondary" onClick={handleCloseHistory}>
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