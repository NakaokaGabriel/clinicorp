import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  DocumentReference,
  DocumentData,
  getDocs,
  getDoc,
  runTransaction,
  doc,
  setDoc,
  orderBy,
  query
} from "firebase/firestore";

import FirestoreConnection from "./DatabaseConnection";

export default class FirestoreAdapter implements FirestoreConnection {
  db: Firestore;
  app: FirebaseApp;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIRESTORE_API_KEY,
      authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
      projectId: process.env.FIRESTORE_PROJECT_ID,
      storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
      appId: process.env.FIRESTORE_APP_ID,
    };

    initializeApp(firebaseConfig);
    this.app = initializeApp(firebaseConfig);

    this.db = getFirestore();
  }

  async getNextId(): Promise<number> {
    const counterDocRef = doc(this.db, "task", "task");
    let nextId: number = 0;

    await runTransaction(this.db, async (transaction) => {
      const counterDoc = await transaction.get(counterDocRef);

      if (!counterDoc.exists()) {
        // Initialize the counter if it doesn't exist
        nextId = 1;
        transaction.set(counterDocRef, { count: nextId });
      } else {
        // Increment the counter and get the new value
        nextId = counterDoc.data().count + 1;
        transaction.update(counterDocRef, { count: nextId });
      }
    });

    return nextId;
  }

  async query(
    referenceModel: string,
    col: string,
    data: DocumentData,
  ): Promise<DocumentReference> {
    const firebaseModel = {
      add: addDoc,
      getAll: getDocs,
      get: getDoc,
    } as any;

    if (referenceModel === "add") {
      const nextId = await this.getNextId();
      const docRef = doc(this.db, col, nextId.toString());
      await setDoc(docRef, {
        id: nextId,
        ...data,
      });
      return docRef;
    }

    const modelQuery = query(collection(this.db, col), orderBy("id", "asc"));

    return firebaseModel[referenceModel](modelQuery);
  }

  disconnect(): void {
    deleteApp(this.app);
  }
}
