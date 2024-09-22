import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const data = [
    { id: 1, title: 'Card 1', tags:["plumber", "bathroom", "remodelling"], description: 'Description for Card 1' },
    { id: 2, title: 'Card 2', description: 'Description for Card 2' },
    { id: 3, title: 'Card 3', description: 'Description for Card 3' },
    { id: 4, title: 'Card 4', description: 'Description for Card 4' },
    { id: 5, title: 'Card 5', description: 'Description for Card 5' },
    { id: 3, title: 'Card 6', description: 'Description for Card 6' },
    { id: 4, title: 'Card 7', description: 'Description for Card 7' },
    { id: 5, title: 'Card 8', description: 'Description for Card 8' },
];

const Cards: React.FC = () => (
    <div>
        {data.map((item) => (
            <IonCard key={item.id}>
                <IonCardHeader>
                    <IonCardTitle>{item.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {item.description}
                </IonCardContent>
            </IonCard>
        ))}
    </div>

);

export default Cards;