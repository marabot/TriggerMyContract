import React, { useEffect,useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {addToDB} from '../../utils/firebase.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Timestamp } from 'firebase/firestore';

function AddButton({userAddress, chainId}){
    
   
    const [Label, setLabel] = useState('');
    const [ToContract, setToContract] = useState('');
    const [FunctionToCall, setFunctionToCall] =useState('');
    const [Timing, setTiming] = useState(0);   
    const [UserAddr, setUserAddr] = useState('');
    const [IsIntervalEvery, SetIsIntervalEvery] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [Show, setShow] = useState(false); 
    const [Days, setDays] = useState(0);
    const [Hours, setHours] = useState(0);
    const [Minutes, setMinutes] = useState(0);

    const [IsLoaded, setIsLoaded] = useState(false);

    const [ParamType1, setParamType1] = useState('none');
    const [ParamValue1, setParaValue1]= useState('');
    const [ParamType2, setParamType2] = useState('none');
    const [ParamValue2, setParaValue2]= useState('');
    const [ParamType3, setParamType3] = useState('none');
    const [ParamValue3, setParaValue3]= useState('');
    
    const handleClose = () => setShow(false);        
    
    const handleCloseAndSave = () => {    
        let lastTick;
        lastTick = IsIntervalEvery?0:Timestamp.fromDate(startDate).seconds - Timing;       

        const params='';
        if (ParamType1==='none'){
            params=';;';
        }else if (ParamType2==='none'){
            params = ParamValue1 + ';;';
        }else if (ParamType3==='none'){
            params = ParamValue1+ ';' + ParamValue2 + ';';
        }else{
            params = ParamValue1+ ';' + ParamValue2 + ';'+ ParamValue3;
        }        
       
       addToDB(Label, userAddress, chainId, ToContract, FunctionToCall, Timing, lastTick );      
       setToContract('');
       setFunctionToCall('');
       setTiming('daily');
       setShow(false);
    };

    const handleShow = () => {    
        
        setShow(true);     
       
    };

    const datepicker= () => {
        
        return (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        );
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

     const parameter={
        display:"flex",    
        width:"90%",
        justifyContent:"space-around",
     }

     const parameterValue={       
        width:"290px",
        
     }

     function onLoad() {
        console.log("onload");
        const divParam2= document.querySelector("#param2");
        const divParam3=  document.querySelector("#param3");
        divParam2.style.display='none';
        divParam3.style.display = 'none';
      }

    useEffect(()=>{      
        setParamType1('none');
    },[]);

    useEffect(()=>{        
         
       
        if (userAddress===undefined || (chainId!==1 && chainId!==5)) {
            document.querySelector("#buttonAdd").disabled = 1;
        }else
        {
            document.querySelector("#buttonAdd").disabled = 0;
        }   

     
        const radioStartNow = document.querySelector("#startNow");
        const radioStartat = document.querySelector("#startAt");
        const datePicker = document.querySelector("#datepicker");
        const selectType1 = document.querySelector("#selectType1");
        const selectType2 = document.querySelector("#selectType2");
        const selectType3 = document.querySelector("#selectType3");
        const divParam2= document.querySelector("#param2");
        const divParam3=  document.querySelector("#param3");
       
        console.log(selectType1);
        console.log(selectType2);
        if (selectType1 ){
            console.log(selectType1.value==="none");
          
            if (ParamType1==='none'){
                divParam2.style.display='none';
                divParam3.style.display = 'none';
            }
            else
            {
                divParam2.style.display='flex';
                divParam2.style.flexDirection="column"
                divParam3.style.display = ParamType2==='none'? "none":"flex"; 
                divParam3.style.flexDirection="column"; 
            }    
        }


        if (radioStartNow && radioStartat)
        {
            if (!radioStartNow.checked && !radioStartat.checked) radioStartNow.checked = 1;


            if (IsIntervalEvery){
               radioStartNow.checked = 1;
               radioStartat.checked = 0;
               datePicker.style.display = "none";
            }else
            {
               radioStartNow.checked = 0;
               radioStartat.checked = 1;
               datePicker.style.display = "flex";
            }
        }
        

        const timing= parseInt(Days)*3600*24 +  parseInt(Hours)*3600 + parseInt(Minutes)*60;
        setTiming(timing);
       
      },[userAddress, chainId, Days, Hours, Minutes, IsIntervalEvery, ParamType1, ParamType2, ParamType3, Show]);
    


    return(            
       
        <div>
            <Button id="buttonAdd" variant="primary" onClick={handleShow}> Create new Trigger </Button> 
           
             <Modal show={Show} style={{opacity:1}} animation={false} onHide={handleClose}>    
            
                    <Modal.Header closeButton>
                            <Modal.Title>Create new Trigger</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>    
                        <label>Name</label><br/>
                        <input value={Label} type="text" name="to" onChange={e=>setLabel(e.target.value)} style ={parameterValue}/><br/>
                        <label>to</label><br/>
                        <input value={ToContract} type="text" name="to" onChange={e=>setToContract(e.target.value)} style ={parameterValue}/><br/>
                        <label>function to call</label><br/>
                        <input value={FunctionToCall} type="text" name="function" onChange={e=>setFunctionToCall(e.target.value)} style ={parameterValue}/><br/><br/>
                        
                        <div>Parameter 1
                            <div style ={parameter}>
                                <div>
                                    <Form.Select aria-label="Default select example" size ="sm" id="selectType1" onChange={e=>setParamType1(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="uint">uint</option>
                                        <option value="string">string</option>
                                        <option value="bool">boolean</option>
                                    </Form.Select>
                                
                                </div>
                                <div >
                                <input value={Label} type="text" name="to" onChange={e=>setParaValue1(e.target.value)} style ={parameterValue}/><br/>
                                </div>
                                
                            </div>
                        </div>
                        <div id="param2">
                            <div>Parameter 2</div>
                            <div style ={parameter} >
                            
                                <div>
                                    <Form.Select aria-label="Default select example" size ="sm" id="selectType2" onChange={e=>setParamType2(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="uint">uint</option>
                                        <option value="string">string</option>
                                        <option value="bool">boolean</option>
                                    </Form.Select>
                                
                                </div>
                                <div >
                                <input value={Label} type="text" name="to" onChange={e=>setParaValue2(e.target.value)} style ={parameterValue}/><br/>
                                </div>
                                
                            </div> 
                        </div>
                        <div id= "param3">Parameter 3
                            <div style ={parameter} >                        
                                <div>
                                    <Form.Select aria-label="Default select example" size ="sm" id="selectType2" onLoad={()=>onLoad()} onChange={e=>setParamType3(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="uint">uint</option>
                                        <option value="string">string</option>
                                        <option value="bool">boolean</option>
                                    </Form.Select>
                                
                                </div>
                                <div >
                                <input value={Label} type="text" name="to" onChange={e=>setParaValue3(e.target.value)} style ={parameterValue}/><br/>
                                </div>
                                
                            </div>
                        </div><br/>
                        <label>Interval</label><br/> 
                        
                        <div id="start">
                            <div><input name="now" type="radio"  id="startNow" onChange={()=>SetIsIntervalEvery(true)}/> Now 
                            <div>        
                            <div  id ="interval" style={interval}>
                                <div > Days : <input style={selectInterval} type="text" value={Days} name="d" id="days" onChange={e=>setDays(e.target.value)}/> </div> +
                                <div > Hours : <input style={selectInterval} type="text" value={Hours} name="h" id="hours" onChange={e=>setHours(e.target.value)}/> </div> +
                                <div > Minutes : <input style={selectInterval} type="text" value={Minutes} name="m" id="minutes" onChange={e=>setMinutes(e.target.value)}/> </div>
                            </div>
                        </div>     
                            
                            </div>    
                            <div><input name="at" type="radio"  id="startAt" onChange={()=>SetIsIntervalEvery(false)}/> At a time</div>
                            <div id ="datepicker">{datepicker()}  </div>
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