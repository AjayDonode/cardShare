import { db } from '../firebaseConfig'; // Import your Firebase configuration
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Card, { Contact } from '../modal/Card';
import { contract } from 'ionicons/icons';

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
            data.profilePicture, 
            data.contact);
        });
        return cards;
      }


      async addCard(card:Card) {
        const cardData = {
          title: card.title,
          subTitle: card.subTitle,
          tags: card.tags,
          description: card.description,
          profilePicture: card.profilePicture,
          contact:card.contact
        };
        await addDoc(this.cardsCollection, cardData);
      }
    
}

export default new CardService();