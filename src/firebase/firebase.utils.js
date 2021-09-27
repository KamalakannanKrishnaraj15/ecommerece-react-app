import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import uuid from "react-native-uuid"; 

const config = {
	apiKey: "AIzaSyDQNzmC0xsSLzr19PpIXCyv-Rw-Ccsq29M",
	authDomain: "crwn-db-fad25.firebaseapp.com",
	projectId: "crwn-db-fad25",
	storageBucket: "crwn-db-fad25.appspot.com",
	messagingSenderId: "298381483543",
	appId: "1:298381483543:web:f164a2b4b5bce73def8652",
	measurementId: "G-SKWWF2K5B9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth?.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log(error);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getUniqueId = () => uuid.v4();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
	/* To update each collection item with uuid within the items aray  */
	objectsToAdd.forEach((obj) => {
		if (obj?.items?.length) {
			obj.items.forEach(shopItem => {
				if (!shopItem?.id) {
					shopItem.id = getUniqueId();
				}
			});
		}
	});
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


const provider = new firebase.auth.GoogleAuthProvider();

provider?.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = (func = null) => {
	auth.signInWithPopup(provider);
	if (func) {
		func();
	}
};

export default firebase;
