import { initializeApp } from "firebase/app";
import { getFirestore, addDoc,updateDoc, doc,getDoc,getDocs,setDoc, collection } from "firebase/firestore";
require('dotenv').config();

const ethers= require("ethers");

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
const mnemonic=process.env.REACT_APP_MNEMONIC_MAIN;



export async function getAllTriggers() {
    const tabReturn = [];
    try{
        const docs = await getDocs(collection(db, "triggers"));   

        docs.forEach((doc) => {
            const datas= doc.data();
               
                tabReturn.push(            
                        new Trigger(
                            doc.id,
                            datas.label,
                            datas.maker,
                            datas.chain,
                            datas.contractToCall,
                            datas.functionToCall,
                            datas.interval,
                            datas.inWork,
                            datas.lastTick
                            )
                );   
            });    
    }catch(e){
      console.log("pas de trigers en BD");

    }
    
    return tabReturn;
}


export async function TryRegisterUser(userAddr){
    
    let alreadyExist= false
 
    try{
        const docs = await getDocs(collection(db, "accounts"));    
        //docRef = doc(db, "accounts", userAddr);
        //console.log(docs);
        docs.forEach((doc) => {
            
            // console.log(doc.id);
             //console.log(userAddr);
            if (doc.id===userAddr.userAddress)
            {
                alreadyExist=true;
            }
        });  
        /*
        console.log("exist?");
        console.log(alreadyExist);*/
        if (!alreadyExist){
            await createUserWallet(userAddr);
        }
       
    }catch(e){
        console.log(e);

    }

   

/*
    try {
        const docRef = await addDoc(collection(db, "accounts", userAddr), {
            AddressUser: userAddr,
            AddressWallet : userWallet
        });
 /// TODO  recuperer valeur de nextWalletNumber pour l'incrémenter
        docRef = doc(db, "walletCount", "jWOjs0DoolfRfgYhJxNF");
        let newValue= 999;
        const result = await updateDoc(docRef, {
            nextWalletNumber : newValue
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
*/
      
};

export async function getTMCWalletIndex(userAddress){
    const docRef = doc(db, "accounts", userAddress);  
    const docSnap = await getDoc(docRef);

    return docSnap.data().mnemonicIndex;
}


export async function getTMCWalletAddress(userAddress){
    const docRef = doc(db, "accounts", userAddress);  
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())return docSnap.data().walletTMC;
    return undefined;
}



export async function createUserWallet(userAddr){
   // console.log("try to create");
   // console.log(userAddr);
    let nextWalletIndex;
    const docs = await getDocs(collection(db, "walletCount"));    
    //docRef = doc(db, "accounts", userAddr);
    //console.log(docs);
    docs.forEach((doc) => {
       nextWalletIndex = doc.data().nextWalletNumber;
    });  
    
    let path = "m/44'/60'/1'/0/" + nextWalletIndex.toString() ;
    
    let newTMCWallet = ethers.Wallet.fromMnemonic(mnemonic, path);
    console.log(newTMCWallet);
    console.log(newTMCWallet.address);

   // - Générer wallet user  
    try {
        await setDoc(doc(db, "accounts", userAddr.userAddress), {
            walletTMC:newTMCWallet.address,
            mnemonicIndex: nextWalletIndex
        });

        // incrementation nextWallet
        const docRef = doc(db, "walletCount", "jWOjs0DoolfRfgYhJxNF");
        await updateDoc(docRef, {
            nextWalletNumber : nextWalletIndex+1
        });

        } catch (e) {
            console.error("Error creating userWallet: ", e);
        }
}

export async function getTriggerByAddrFrom(address, web3){
   const tabReturn = [];
    const docs = await getDocs(collection(db, "triggers"));    

    docs.forEach((doc) => {
        const datas= doc.data();     
      
        if (datas.FromAddress === web3)

        tabReturn.push(
            Trigger(
                    datas.label,
                    datas.maker,
                    datas.chain,
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
    
    const docRef = doc(db, "triggers", id);
    const result = await updateDoc(docRef, {
        inWork : newValue
    });
   return result;
}

export async function addToDB(label, userAddr, network, contractAddr, functionToCall, interval){
    try {
    const docRef = await addDoc(collection(db, "triggers"), {
        label:label,
        maker: userAddr,
        chain : network,
        contractToCall : contractAddr,
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
