import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';

const AddCard: React.FC<{ isOpen: boolean; onClose: () => void; onAddCard: (newCard: any) => void; }> = ({ isOpen, onClose, onAddCard }) => {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = () => {
        const newCard = {
            id: Date.now(), // Simple ID generation
            title,
            subTitle,
            description,
            contact: {
                phone,
                address,
            },
            tags: tags.split(',').map(tag => tag.trim()), // Convert tags to array
            profilePicture: 'https://picsum.photos/100/100', // Placeholder
        };

        console.log("modal "+newCard);

        onAddCard(newCard);
        onClose(); // Close modal after adding
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add New Card</IonTitle>
                    <IonButton slot="end" onClick={onClose}>Close</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Title</IonLabel>
                    <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Subtitle</IonLabel>
                    <IonInput value={subTitle} onIonChange={e => setSubTitle(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput value={description} onIonChange={e => setDescription(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Phone</IonLabel>
                    <IonInput value={phone} onIonChange={e => setPhone(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Address</IonLabel>
                    <IonInput value={address} onIonChange={e => setAddress(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tags (comma separated)</IonLabel>
                    <IonInput value={tags} onIonChange={e => setTags(e.detail.value!)} />
                </IonItem>
                <IonButton expand="full" onClick={handleSubmit}>Add Card</IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddCard;