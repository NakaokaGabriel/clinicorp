import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Firestore, DocumentReference, DocumentData, FieldValue, getDocs, getDoc } from 'firebase/firestore';

import FirestoreConnection from "./DatabaseConnection";

export default class FirestoreAdapter implements FirestoreConnection {
  db: Firestore;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIRESTORE_API_KEY,
      authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
      projectId: process.env.FIRESTORE_PROJECT_ID,
      storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
      appId: process.env.FIRESTORE_APP_ID
    };

    initializeApp(firebaseConfig);

    this.db = getFirestore();
  }

  async query(referenceModel: string, col: string, data: DocumentData): Promise<DocumentReference> {
    const firebaseModel = {
      add: addDoc,
      getAll: getDocs,
      get: getDoc
    } as any;

    return firebaseModel[referenceModel](collection(this.db, col), referenceModel === 'add' ? data : null);
  }
}