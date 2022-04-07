
//Create App Connection
import firebaseConfig from "./env";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);

//Auth
import type { User } from 'firebase/auth'

//Firestore
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import type { CollectionReference, DocumentReference, DocumentData } from 'firebase/firestore'
const DB = getFirestore(app);


//Firestore Functions

/**
 * Returns true if the firestore doc exists
 * @param d a firestore doc()
 * @returns true if the doc exists and false otherwise
 */
async function isDoc(d:DocumentReference<DocumentData>):Promise<boolean> {
    return (await getDoc(d)).exists();
}





export { app, DB, isDoc, collection, doc, getDoc, setDoc }