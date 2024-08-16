
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore ,collection, addDoc,increment ,onSnapshot,deleteDoc,doc,setDoc,updateDoc,serverTimestamp  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC56dQFMU3Jg4C_mdtzjHSPN4nOe0FnV4o",
  authDomain: "phone-6aa72.firebaseapp.com",
  projectId: "phone-6aa72",
  storageBucket: "phone-6aa72.appspot.com",
  messagingSenderId: "963576307016",
  appId: "1:963576307016:web:8459e5e8e8c8425172e77d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export{
    db,
    collection,
    addDoc,
    increment,
    onSnapshot,
    deleteDoc,
    doc,
    setDoc ,
    updateDoc ,
    serverTimestamp
}