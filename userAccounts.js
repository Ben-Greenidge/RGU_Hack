import { auth } from "./firebaseConfig";
import {
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
} from "firebase/auth";

export function createUser(username, password) {
 return createUserWithEmailAndPassword(auth, username, password);
}

export function loginUser(username, password) {
 return signInWithEmailAndPassword(auth, username, password);
}

export function saveElement(username, element) {
 // Implement saving logic here
}

export function getSavedElements(username) {
 // Implement retrieval logic here
 return [];
}
