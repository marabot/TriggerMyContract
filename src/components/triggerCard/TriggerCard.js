import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../custom.css';
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

    const deleteThisTrigger = (id)=>
    {   
        deleteTrigger(id);   
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
        backgroundColor: "rgb(236, 236, 236)", 
        width:"600px"
    }
    
    const modalStyleResults={
        backgroundColor: "rgb(236, 236, 236)", 
        width:"1000px"
    }

    const main = {
        width:"1200px"
    }

    const result = {
        fontSize:"13px"
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
                        <td width="10%" rowspan="2">                            
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

            <Modal show={Show} style={{opacity:1, margin:50}} animation={false} onHide={handleClose} centered>    

                    <Modal.Header closeButton  style={modalStyle}>
                            <Modal.Title>DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalStyle}>
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
                                <tr><td className = "cellTabTriggerInfos" > {Running?"Running":"Paused"}</td></tr>
                                
                                <tr><td className = "cellTabTriggerLabel" >Last tick Cost</td></tr>
                                <tr><td className="cellTabTriggerInfos" >{trigger.lastTick}</td></tr>  
                            </tbody>
                    </table> 
                    </Modal.Body>

                    <Modal.Footer  style={modalStyle}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>                      
                    </Modal.Footer>   
                </Modal> 

                
                 <Modal show={ShowHistory} style={{opacity:1, margin:"auto"}} animation={false} onHide={handleCloseHistory} centered>    

                    <Modal.Header closeButton  style={modalStyleResults}>
                            <Modal.Title>DETAILS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={modalStyleResults}>
                    <table className="TabTrigger">        
                            
                            <tbody>
                              
                                {CallHistory.map((c)=>{
                                    return (
                                            <tr style={result}>
                                                <td>time :  {c.time}</td>                                            
                                                <td>txHash : {c.txHash}</td>
                                                <td>fees :  {c.fees}</td>
                                                <td>gasUsed : {c.gasUsed}</td>
                                                <td>status : {c.status}</td>
                                            </tr>                                        
                                         )
                                })}
                            </tbody>
                    </table> 
                    </Modal.Body>

                    <Modal.Footer  style={modalStyleResults}>
                        <Button variant="secondary" onClick={handleCloseHistory}>
                            Close
                        </Button>                      
                    </Modal.Footer>   
                </Modal>   
                          
         </div> 
    )
}

export default TriggerCard;