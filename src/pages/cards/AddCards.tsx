import React, { useEffect, useRef, useState } from 'react';
import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AddCards.css';
import CardService from '../../service/CardService';
import Card, { Contact } from '../../modal/Card';

const AddCard: React.FC<{ isOpen: boolean; onClose: () => void; onAddCard: (newCard: any) => void; }> = ({ isOpen, onClose, onAddCard }) => {
   // const page = useRef(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const [newCard, setNewCard] = useState({
        title: '',
        subTitle: '',
        tags: '',
        description: '',
        bannerPicture:'',
        profilePicture: '',
        contact: {
            address: '',
            phoneNumber: '',
            email: ''
        }
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(''); // To store the uploaded image URL
    const [defaultImage, setDefaultImage] = useState<string>(''); // To store the random default image
    const [defaultBanner, setDefaultBanner] = useState<string>(''); // To store the random default image



    const defaultImages = [
        './resources/users/handy_1.png',
        './resources/users/handy_2.png',
        './resources/users/handy_3.png',
        './resources/users/handy_4.png',
      ];

      const defaultBanners = [
        './resources/banners/bg_1.png',
        './resources/banners/bg_2.png',
        './resources/banners/bg_3.png',
        './resources/banners/bg_4.png',
      ];
    
      const getRandomDefaultBanner = ()=> {
        const randomIndex = Math.floor(Math.random() * defaultBanners.length);
        return defaultBanners[randomIndex];
    }
      // Function to get a random image from the array
      const getRandomDefaultImage = () => {
        const randomIndex = Math.floor(Math.random() * defaultImages.length);
        return defaultImages[randomIndex];
      };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const downloadURL = await CardService.uploadImage(file); // Call the uploadImage method
                setImageUrl(downloadURL); // Update the image URL state
                setNewCard({ ...newCard, profilePicture: downloadURL }); // Update the newCard state with the image URL
                setImageFile(file); // Store the file reference if needed
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle the error (e.g., show a message to the user)
            }
        }
    };
    
    const handleSubmit = async () => {
        const finalBannerPicture = newCard.bannerPicture || defaultBanner;
        const finalProfilePicture = newCard.profilePicture || defaultImage;
        const card = new Card(
            '',
            newCard.title,
            newCard.subTitle,
            newCard.tags.split(',').map(tag => tag.trim()),
            newCard.description,
            finalBannerPicture,
            finalProfilePicture, 
            newCard.contact
        );
        console.log(card);
        await onAddCard(card);
        setImageUrl(''); // Clear previous image
        setNewCard({ title: '', subTitle: '', tags: '', description: '', bannerPicture: '', profilePicture: '', contact: { address: '', phoneNumber: '', email: '' } }); // Reset form
    };

    useEffect(() => {
        if (isOpen) {
            setDefaultBanner(getRandomDefaultBanner());
            setDefaultImage(getRandomDefaultImage());
            setImageUrl(''); // Clear previous image
            setNewCard({ title: '', subTitle: '', tags: '', description: '', bannerPicture: '', profilePicture: '', contact: { address: '', phoneNumber: '', email: '' } }); // Reset form
        }
    }, [isOpen]);

    return (
       
            <IonModal isOpen={isOpen} onDidDismiss={onClose} presentingElement={presentingElement!}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={onClose}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle>Add New Card</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={handleSubmit}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                     {/* Avatar Section */}
                     <div className="upload-user-image">
                     <img src={getRandomDefaultBanner() } alt="Banner"/>
                        <IonLabel>Profile Picture</IonLabel>
                        <IonAvatar className="avatar-center avatar-large">
                            <img src={imageUrl || getRandomDefaultImage() } alt="User Avatar"/>
                        </IonAvatar>
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="fileInput" />
                        <IonButton fill="clear"  className="link-button" onClick={() => document.getElementById('fileInput')?.click()}>Upload Image</IonButton>
                    </div>
                    <IonItem>
                        <IonInput label="Business Name" label-placement="floating" placeholder="Handiworks co" value={newCard.title} onIonChange={(e) => setNewCard({ ...newCard, title: e.target.value as string })} />
                    </IonItem>
                    <IonItem>
                        <IonInput label="Name" label-placement="floating" placeholder="Your Name" value={newCard.subTitle} onIonChange={(e) => setNewCard({ ...newCard, subTitle: e.target.value as string })} />
                    </IonItem>
                  
                    <IonItem>
                        <IonInput label="Description" label-placement="floating" placeholder="Write about your company and services" value={newCard.description} onIonChange={e => setNewCard({ ...newCard, description: e.target.value as string })} />
                    </IonItem>
                    <IonItem>
                        <IonInput label="Phone Number" label-placement="floating" placeholder="000-000-0000"  value={newCard.contact.phoneNumber} onIonChange={e => setNewCard({ ...newCard, contact: { ...newCard.contact, phoneNumber: e.target.value as string } })} />
                    </IonItem>
                    <IonItem>
                        <IonInput label="Email" label-placement="floating" placeholder="Your Email" value={newCard.contact.email} onIonChange={(e) => setNewCard({ ...newCard, contact: { ...newCard.contact, email: e.target.value as string }})} />
                    </IonItem>
                    <IonItem>
                        <IonInput label="Address" label-placement="floating" placeholder="Your Business address" value={newCard.contact.address} onIonChange={e => setNewCard({ ...newCard, contact: { ...newCard.contact, address: e.target.value as string } })} />
                    </IonItem>
                    <IonItem>
                        <IonInput label="Tags" label-placement="floating" placeholder="Add ',' seperate tags to catagorize your business" value={newCard.tags} onIonChange={e => setNewCard({ ...newCard, tags: e.target.value as string })} />
                    </IonItem>
                </IonContent>
            </IonModal>
    );
};

export default AddCard;