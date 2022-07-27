import { initializeApp } from "firebase/app";
import { getFirestore, addDoc } from "firebase/firestore";
import "firebase/firestore";
import {getDocs, collection} from"firebase/firestore";

const Trigger = require("../entities/Trigger");

const firebaseConfig = {
    apiKey: "AIzaSyCgvr9RFTVPbQBKLFcdBCt3qwmhxogkmkM",
    authDomain: "trigggermycontract.firebaseapp.com",
    projectId: "trigggermycontract",
    storageBucket: "trigggermycontract.appspot.com",
    messagingSenderId: "976970159149",
    appId: "1:976970159149:web:008281e49a520dbcdf54a4",
    measurementId: "G-JPRH5K3QMW"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllTriggers(web3) {
    const tabReturn = [];
    const docs = await getDocs(collection(db, "users"));    

    docs.forEach((doc) => {
        const datas= doc.data();
        
            tabReturn.push(
            
                new Trigger(datas.maker,
                    datas.contractToCall,
                    datas.functionToCall,
                    datas.interval,
                    datas.inWork,
                    datas.lastTick
                    )
            );   
        });
    
    return tabReturn;
}

export async function getTriggerByAddrFrom(address, web3){
   const tabReturn = [];
    const docs = await getDocs(collection(db, "users"));    

    docs.forEach((doc) => {
        const datas= doc.data();
        console.log(datas);
        console.log(datas.FromAddress);
        if (datas.FromAddress == web3)

        tabReturn.push(
            Trigger(datas.maker,
                    datas.contractToCall,
                    datas.functionToCall,
                    datas.interval,
                    datas.inWork,
                    datas.lastTick
                    )
        );   

/*
        tabReturn.push({
        
            fromAddress: datas.FromAddress,
            contractCall : datas.ContractToCall,
            functionToCall: datas.FunctionToCall,
            timing : datas.timing

        });   */
    });
    
    return tabReturn;

}

export async function addToDB(userAddr, contractAdd, functionToCall, timing){
    try {
    const docRef = await addDoc(collection(db, "users"), {
        maker: userAddr,
        contractToCall : contractAdd,
        functionToCall :functionToCall,
        interval : "daily", 
        inWork: false,
        lastTick : 0
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}
