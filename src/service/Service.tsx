import { db } from '../firebaseConfig'; // Import your Firebase configuration
import { addDoc, collection, getDocs } from 'firebase/firestore';

class Service {
    async getData() {
        const Collection = collection(db, 'collection'); // 'cards' is your Firestore collection name
        const cardSnapshot = await getDocs(Collection);
        return cardSnapshot.docs.map(doc =>{ const data = doc.data(); console.log("Data "+data.title); ({ id: doc.id,  ...doc.data() }) });
    }

    async addData(data:Object){
        try {
          const docRef = await addDoc(collection(db, "collection"), data);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
}

export default new Service();