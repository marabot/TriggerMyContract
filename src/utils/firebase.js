import { initializeApp } from "firebase/app";
import { getFirestore, addDoc,updateDoc, doc,getDocs, collection } from "firebase/firestore";
import "firebase/firestore";

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

export async function getAllTriggers() {
    const tabReturn = [];
    const docs = await getDocs(collection(db, "users"));   

    docs.forEach((doc) => {
        const datas= doc.data();
        console.log("doooc");
    console.log(doc.id);
            tabReturn.push(            
                    new Trigger(
                        doc.id,
                        datas.maker,
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
      
        if (datas.FromAddress == web3)

        tabReturn.push(
            Trigger(
                    datas.maker,
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

export async function switchTriggerState(id, newValue){
    // Add a new document in collection "cities"
    const docRef = doc(db, "users", id);
    const result = await updateDoc(docRef, {
        inWork : newValue
    });
   return result;
}

export async function addToDB(userAddr, contractAdd, functionToCall, interval){
    try {
    const docRef = await addDoc(collection(db, "users"), {
        maker: userAddr,
        contractToCall : contractAdd,
        functionToCall :functionToCall,
        interval : interval, 
        inWork: false,
        lastTick : 0
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}
