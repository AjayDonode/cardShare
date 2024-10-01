import React, { useRef, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { db } from '../../firebaseConfig'; // Import your Firebase configuration
import { addDoc, collection } from '@firebase/firestore';
import CardService from '../../service/CardService';
import Card, { Contact } from '../../modal/Card';

const AddCard: React.FC<{ isOpen: boolean; onClose: () => void; onAddCard: (newCard: any) => void; }> = ({ isOpen, onClose, onAddCard }) => {
    // const [title, setTitle] = useState('');
    // const [subTitle, setSubTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [phone, setPhone] = useState('');
    // const [address, setAddress] = useState('');
    // const [tags, setTags] = useState('');
    const page = useRef(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

    const [newCard, setNewCard] = useState<{
        title: string;
        subTitle: string;
        tags: string;
        description: string;
        profilePicture: string;
        contact: Contact;
      }>({
        title: '',
        subTitle: '',
        tags: '',
        description: '',
        profilePicture: '',
        contact: {
          address: '',
          phoneNumber: '',
          email: ''
        }
      });
    
    const handleSubmit = async () => {
        const card = new Card(
             // Simple ID generation
            '',
            newCard.title,
            newCard.subTitle,
            newCard.tags.split(',').map(tag=>tag.trim()),
            newCard.description,
            newCard.profilePicture, // Placeholder
            newCard.contact
        );
        await onAddCard(card); 
        setNewCard({ title: '', subTitle: '', tags: '', description: '', profilePicture: '', contact: { address: '', phoneNumber: '', email: '' } }); // Reset form
 
    };

    return (
        <IonPage ref={page}>
        <IonModal isOpen={isOpen} onDidDismiss={onClose} presentingElement={presentingElement!}>
            <IonHeader>
                <IonToolbar>
                <IonButtons>
                    <IonBackButton> cancel </IonBackButton>
                </IonButtons>
                    <IonTitle>Add New Card</IonTitle>
                    <IonButton slot="start" onClick={onClose}>Close</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Business Name</IonLabel>
                    <IonInput value={newCard.title} onIonChange={(e) => setNewCard({...newCard, title: e.target.value as string})} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Your Name</IonLabel>
                    <IonInput value={newCard.subTitle} onIonChange={(e) => setNewCard({...newCard, subTitle: e.target.value as string})}  />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput value={newCard.description} onIonChange={e => setNewCard({...newCard, description: e.target.value as string})}  />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Phone</IonLabel>
                    <IonInput value={newCard.contact.phoneNumber} onIonChange={e =>  setNewCard({...newCard, description: e.target.value as string})} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Address</IonLabel>
                    <IonInput value={newCard.contact.address} onIonChange={e =>  setNewCard({...newCard, description: e.target.value as string})} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tags (comma separated)</IonLabel>
                    <IonInput value={newCard.tags} onIonChange={e => setNewCard({...newCard, tags: e.target.value as string})} />
                </IonItem>
                <IonButton expand="full" onClick={handleSubmit}>Add</IonButton>
            </IonContent>
        </IonModal>
        </IonPage>
    );
};

export default AddCard;