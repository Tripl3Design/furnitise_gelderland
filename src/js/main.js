
// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS_9V0jgZzX-AXMZsEfefvelDyyiKJnBs",
  authDomain: "furnitise-4bca3.firebaseapp.com",
  databaseURL: "https://furnitise-4bca3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "furnitise-4bca3",
  storageBucket: "furnitise-4bca3.appspot.com",
  messagingSenderId: "391193820430",
  appId: "1:391193820430:web:916a16f9835ee525672b5f",
  measurementId: "G-WBEEX3ZL78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


logEvent(analytics, 'notification_received');

/*
// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

//get collection data
getDocs(colRef)
.then ((snapshot) => {
let books = []
snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
})
console.log(books)
})
.catch(err =>{
console.log(err.message)
})

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
uploadBytes(storageRef, bytes).then((snapshot) => {
console.log('Uploaded an array!');
});
*/











