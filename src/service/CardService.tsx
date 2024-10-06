import { db } from '../firebaseConfig'; // Import your Firebase configuration
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Card, { Contact } from '../modal/Card';

import { storage } from '../firebaseConfig'; // Adjust the import as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

class CardService {



  cardsCollection: any;

  constructor() {
    this.cardsCollection = collection(db, 'cards'); // Assuming 'cards' is your Firestore collection name
  }


  async loadAll() {
    const cardSnapshot = await getDocs(this.cardsCollection);
    const cards = cardSnapshot.docs.map(doc => {
      const data = doc.data() as Card;
      const contact: Contact = {
        address: data.contact?.address || '',
        phoneNumber: data.contact?.phoneNumber || '',
        email: data.contact?.email || ''
      };
      return new Card(doc.id,
        data.title,
        data.subTitle,
        data.tags,
        data.description,
        data.bannerPicture,
        data.profilePicture,
        data.contact);
    });
    return cards;
  }


  async addCard(card: Card) {
    const cardData = {
      title: card.title,
      subTitle: card.subTitle,
      tags: card.tags,
      description: card.description,
      bannerPicture: card.bannerPicture,
      profilePicture: card.profilePicture,
      contact: card.contact
    };
    await addDoc(this.cardsCollection, cardData);
  }


  async uploadImage(file: File) {
    const storageRef = ref(storage, `userImages/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL; // Return the download URL
  }


  async getUserCardById(id: string | null) {
    if (!id) {
      throw new Error('ID must be provided');
    }

    const cardRef = doc(this.cardsCollection, id);
    const cardDoc = await getDoc(cardRef); // Fetch the document
    if (!cardDoc.exists()) {
      throw new Error('No such document!');
    }
    const data = cardDoc.data() as Card; // Get the data from the document
    const contact: Contact = {
      address: data.contact?.address || '',
      phoneNumber: data.contact?.phoneNumber || '',
      email: data.contact?.email || ''
    };

    return new Card(cardDoc.id,
      data.title,
      data.subTitle,
      data.tags,
      data.description,
      data.bannerPicture,
      data.profilePicture,
      contact);
  }

}

export default new CardService();