import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
	apiKey: "AIzaSyDQNzmC0xsSLzr19PpIXCyv-Rw-Ccsq29M",
	authDomain: "crwn-db-fad25.firebaseapp.com",
	projectId: "crwn-db-fad25",
	storageBucket: "crwn-db-fad25.appspot.com",
	messagingSenderId: "298381483543",
	appId: "1:298381483543:web:f164a2b4b5bce73def8652",
	measurementId: "G-SKWWF2K5B9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider?.setCustomParameters({ prompt: 'select_account' });

console.log(provider);

export const signInWithGoogle = () => {
	auth.signInWithPopup(provider);
};

export default firebase;
