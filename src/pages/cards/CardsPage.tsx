import React, { useEffect, useState } from 'react';

import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonLabel, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './CardsPage.css';
import { add, addCircle, book, heart, link, locationSharp, phonePortraitSharp, scanCircle, share, shareOutline, thumbsUpSharp, trendingUpOutline, wallet } from 'ionicons/icons';
import AddCard from './AddCards';
import CardService from '../../service/CardService';
import Card from '../../modal/Card';


const CardsPage: React.FC = () => {

    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
    const [newCard, setCards] = useState([]); // Manage cards state
    const [cards, setCardList] = useState<any[]>([]); // Manage cards state
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const toggleCard = (id: number) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    const handleCardClick = (id: number, event: React.MouseEvent) => {
        // Check if the click event target is the footer
        console.log("clicked card is "+id);
        if ((event.target as HTMLElement).closest('ion-toolbar')) {
            return; // Do nothing if clicked on footer
        }
        console.log("clicked card is "+id);
        toggleCard(id); // Otherwise, toggle the card
    };

    const handleAddCard = async (newCard: any) => {
        await CardService.addCard(newCard);
        fetchCards(); // Refresh the card list after adding a new card
        setIsModalOpen(false); // Close the modal
       // setCards((prevCard) => [...prevCard]); // Add new card to the state
    };

    const fetchCards = async () => {
        try {
            const fetchedCards = await CardService.loadAll();
            setCardList(fetchedCards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []); // Fetch cards on component mount


    
    return (
        <div>
            <IonSearchbar></IonSearchbar>
            {cards.map((card) => (
                <IonCard key={card.id} onClick={(e) => handleCardClick(card.id, e)}>
                    <IonCardHeader>
                        <div className="header-container">
                            <IonAvatar className="custom-avatar">
                                <img src={card.profilePicture} />
                            </IonAvatar>
                            <div className="text-container">
                                <IonCardTitle>{card.title}</IonCardTitle>
                                <IonCardSubtitle>{card.subTitle}</IonCardSubtitle>
                            </div>
                        </div>
                    </IonCardHeader>
                    <IonCardContent>

                        {expandedCardId === card.id ? card.description : card.description.split('. ')[0] + '.'}
                        {expandedCardId === card.id && (
                            <div>
                                <IonText class="contact">
                                    <IonIcon icon={phonePortraitSharp}></IonIcon> {card.contact?.phone}
                                </IonText>
                                <br></br>
                                {card.contact?.address && (
                                    <IonText class="contact">
                                        <IonIcon icon={locationSharp}></IonIcon> {card.contact.address}
                                    </IonText>
                                )}
                            </div>
                        )}
                    </IonCardContent>
                    {expandedCardId === card.id && (
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

export default CardsPage;