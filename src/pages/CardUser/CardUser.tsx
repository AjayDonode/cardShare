import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonPage, IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonCardSubtitle, IonChip, IonText, IonFab, IonFabButton, IonFabList } from '@ionic/react';
import { chevronForwardCircle, ellipsisHorizontal, ellipsisVertical, link, locationSharp, personCircle, phonePortraitSharp, thumbsUpSharp, trendingUpOutline, shareOutline, qrCodeOutline, printOutline, mailSharp } from 'ionicons/icons';
import { useLocation } from 'react-router';
import CardService from '../../service/CardService';
import Card from '../../modal/Card';
import AddUserModal from './modal/AddUserModal';

const CardUser: React.FC = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const [card, setUser] = useState<Card | null>(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State to handle loading status
    const [error, setError] = useState<string | null>(null); // State to handle errors
    const [users, setUsers] = useState<{ name: string; category: string }[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const addUser = (name: string, category: string) => {
        setUsers([...users, { name, category }]);
    };

    useEffect(() => {

        const fetchUserData = async () => {
            setLoading(true); // Start loading
            try {
                const userData = await CardService.getUserCardById(id);
                console.log("fetched user data ", userData)
                setUser(userData); // Set user data to state
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message); // Set error message
                } else {
                    setError('An unknown error occurred'); // Handle unexpected error types
                }
            } finally {
                setLoading(false); // Set loading to false
            }
        };
        fetchUserData();
    }, [id]); // Dependency array includes id

    if (loading) {
        return <div>Loading...</div>; // You can customize your loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    if (!card) {
        return <div>No card found.</div>;
    }


    return (
        <div className="fullscreen-div">

            <IonCard>
                <img src={card?.bannerPicture} alt="Banner" />
                <IonCardHeader>
                    <IonAvatar className="avatar">
                        <img src={card?.profilePicture} alt="Profile" />
                        <IonLabel>{card?.title}</IonLabel>
                    </IonAvatar>
                </IonCardHeader>
                <IonCardContent>
                    <p>
                        <IonText className='title'>{card?.title}</IonText>
                        <br />
                        <IonText className="contact">
                            <IonIcon icon={phonePortraitSharp}></IonIcon>  <a href={`tel:${card?.contact.phoneNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {card?.contact.phoneNumber}
                            </a>
                        </IonText>
                        <br/>
                        <IonText className="contact">
                            <IonIcon icon={mailSharp}></IonIcon>  <a href={`mailto:${card?.contact.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {card?.contact.email}
                            </a>
                        </IonText>
                        <br />
                        <IonText className="contact">
                            <IonIcon icon={locationSharp}></IonIcon> {card?.contact.address}
                        </IonText>
                    </p>
                    <p>{card?.description}</p>
                </IonCardContent>
                <IonToolbar>
                    <IonChip>
                        <IonIcon icon={thumbsUpSharp} color="primary" onClick={() => setModalOpen(true)} ></IonIcon>
                        <IonLabel>Boosters</IonLabel>
                    </IonChip>
                    <IonChip>
                        <IonIcon icon={trendingUpOutline} color="primary"></IonIcon>
                        <IonLabel>SatiScore</IonLabel>
                    </IonChip>
                </IonToolbar>
            </IonCard>
            <IonFab slot="fixed" vertical="center" horizontal="end">
                <IonFabButton>
                    <IonIcon icon={shareOutline}></IonIcon>
                </IonFabButton>
                <IonFabList side="start">
                    <IonFabButton>
                        <IonIcon icon={link}></IonIcon>
                    </IonFabButton>
                    <IonFabButton>
                        <IonIcon icon={qrCodeOutline}></IonIcon>
                    </IonFabButton>
                    <IonFabButton>
                        <IonIcon icon={printOutline}></IonIcon>
                    </IonFabButton>
                </IonFabList>
            </IonFab>

            <AddUserModal
                    isOpen={modalOpen}
                    onDidDismiss={() => setModalOpen(false)}
                    onAddUser={addUser}
                />
           
        </div>
    );
};

export default CardUser;
