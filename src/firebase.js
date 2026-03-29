import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA_TBFdZMjBCwGQT42uX4EAxSWge4jXWh4",
  authDomain: "amanttra-organics.firebaseapp.com",
  projectId: "amanttra-organics",
  storageBucket: "amanttra-organics.firebasestorage.app",
  messagingSenderId: "878964785176",
  appId: "1:878964785176:web:b07e44da1257b9376fc36d",
  measurementId: "G-18CDBRGKEP"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)