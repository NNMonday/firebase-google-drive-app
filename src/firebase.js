import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyCNrq0JyFjy1590t4RycFnBohR_AcduJp8",
    authDomain: "fire-drive-dev.firebaseapp.com",
    projectId: "fire-drive-dev",
    storageBucket: "fire-drive-dev.appspot.com",
    messagingSenderId: "682124107282",
    appId: "1:682124107282:web:9958ec4a548b5c362182cb"
});

const auth = getAuth(app);
const firestore = getFirestore(app);
const database = {
    folders: collection(firestore, 'folders'),
    file: collection(firestore, "files"),
    myDoc: doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    }
}
export {
    auth,
    database,
};

export default app;