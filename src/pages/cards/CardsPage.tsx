import React, { useEffect, useState ,useRef} from 'react';

import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonFab, IonFabButton, IonIcon, IonLabel, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import './CardsPage.css';
import { add, heart, locationSharp, mail, person, phonePortraitSharp, share, wallet } from 'ionicons/icons';
import AddCard from './AddCards';
import CardService from '../../service/CardService';
import { useHistory } from 'react-router';


const CardsPage: React.FC = () => {
    
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
    const [cards, setCardList] = useState<any[]>([]); // Manage cards state
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const history = useHistory();
    
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

    const handleAddCard = async (newCard: any) => {
        await CardService.addCard(newCard);
        fetchCards(); // Refresh the card list after adding a new card
        setIsModalOpen(false); 
    };

    const fetchCards = async () => {
        try {
            const fetchedCards = await CardService.loadAll();
            setCardList(fetchedCards);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
        setIsModalOpen(false); 
    };

    useEffect(() => {
        fetchCards();
    }, []); // Fetch cards on component mount


    const openUserCard = (id: number) => {
        history.push('CardUser?id='+id);
    };

    return (
        <div>
            <IonSearchbar></IonSearchbar>
            {cards.map((card) => (
                <IonCard key={card.id} >
                    <IonCardHeader onClick={(event) => handleCardClick(card.id, event)}>
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
                                    <IonIcon icon={phonePortraitSharp}></IonIcon> {card.contact?.phoneNumber}
                                </IonText>
                                <br></br>
                                <IonText class="email">
                                    <IonIcon icon={mail}></IonIcon> {card.contact?.email}
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
                            <IonChip onClick={() => openUserCard(card.id)}>
                                <IonIcon icon={person} color="primary"></IonIcon>
                                <IonLabel>visit</IonLabel>
                            </IonChip>
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
            <IonFab vertical="bottom" horizontal="center" onClick={() => setIsModalOpen(true)}>
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
            <AddCard isOpen={isModalOpen}  onClose={() => setIsModalOpen(false)} onAddCard={handleAddCard} /> 
        </div>
        
    )
};

export default CardsPage;