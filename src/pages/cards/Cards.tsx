import React, { useState } from 'react';

import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonLabel, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Cards.css';
import { add, addCircle, book, heart, link, locationSharp, phonePortraitSharp, scanCircle, share, shareOutline, thumbsUpSharp, trendingUpOutline, wallet } from 'ionicons/icons';
import AddCard from './AddCards';
const data = [
    { id: 1, title: 'Electrician', subTitle: 'Mr Singh', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 1', profilePicture: 'https://picsum.photos/100/100', contact: { phone: 4089211804, address: null } },
    { id: 2, title: 'Plumber', subTitle: 'Josh desoza', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 2', profilePicture: 'https://picsum.photos/100/100' },
    { id: 3, title: 'Card 3', subTitle: 'Card 3', tags: ["plumber", "bathroom", "remodelling"], description: 'The best plumber of the region here. for Card 3Description for \n Card 3Description for Card 3', profilePicture: 'https://picsum.photos/100/100' },
    { id: 4, title: 'Card 4', subTitle: 'Card 4', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 4', profilePicture: 'https://picsum.photos/100/100' },
    { id: 5, title: 'Card 5', subTitle: 'Card 1', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 5', profilePicture: 'https://picsum.photos/100/100' },
    { id: 6, title: 'Card 6', subTitle: 'Card 1', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 6', profilePicture: 'https://picsum.photos/100/100' },
    { id: 7, title: 'Card 7', subTitle: 'Card 1', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 7', profilePicture: 'https://picsum.photos/100/100' },
    { id: 8, title: 'Card 8', subTitle: 'Card 1', tags: ["plumber", "bathroom", "remodelling"], description: 'Description for Card 8', profilePicture: 'https://picsum.photos/100/100' },
];

const Cards: React.FC = () => {

    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
    const [cards, setCards] = useState(data); // Manage cards state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleCard = (id: number) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    const handleCardClick = (id: number, event: React.MouseEvent) => {
        // Check if the click event target is the footer
        if ((event.target as HTMLElement).closest('ion-toolbar')) {
            return; // Do nothing if clicked on footer
        }
        toggleCard(id); // Otherwise, toggle the card
    };

    const handleAddCard = (newCard: any) => {
        console.log(newCard);
        setCards((prevCards) => [...prevCards, newCard]); // Add new card to the state
    };

    return (
        <div>
            <IonSearchbar></IonSearchbar>
            {data.map((item) => (
                <IonCard key={item.id} onClick={(e) => handleCardClick(item.id, e)}>
                    <IonCardHeader>
                        <div className="header-container">
                            <IonAvatar className="custom-avatar">
                                <img src={item.profilePicture} />
                            </IonAvatar>
                            <div className="text-container">
                                <IonCardTitle>{item.title}</IonCardTitle>
                                <IonCardSubtitle>{item.subTitle}</IonCardSubtitle>
                            </div>
                        </div>
                    </IonCardHeader>
                    <IonCardContent>

                        {expandedCardId === item.id ? item.description : item.description.split('. ')[0] + '.'}
                        {expandedCardId === item.id && (
                            <div>
                                <IonText class="contact">
                                    <IonIcon icon={phonePortraitSharp}></IonIcon> {item.contact?.phone}
                                </IonText>
                                <br></br>
                                {item.contact?.address && (
                                    <IonText class="contact">
                                        <IonIcon icon={locationSharp}></IonIcon> {item.contact.address}
                                    </IonText>
                                )}
                            </div>
                        )}
                    </IonCardContent>
                    {expandedCardId === item.id && (
                        <IonToolbar>
                            <IonChip>
                                <IonIcon icon={wallet} color="primary"></IonIcon>
                                <IonLabel>Keep</IonLabel>
                            </IonChip>
                            <IonChip>
                                <IonIcon icon={heart} color="primary"></IonIcon>
                                <IonLabel>Love</IonLabel>
                            </IonChip>
                            <IonChip>
                                <IonIcon icon={share} color="primary"></IonIcon>
                                <IonLabel>Share</IonLabel>
                            </IonChip>
                        </IonToolbar>
                    )}
                </IonCard>
            ))}
            <IonFab vertical="bottom" horizontal="end" slot="fixed" onClick={() => setIsModalOpen(true)}>
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
            <AddCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddCard={handleAddCard} />
        </div>
    )
};

export default Cards;