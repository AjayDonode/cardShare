import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonPage, IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonCardSubtitle, IonChip, IonText, IonFab, IonFabButton, IonFabList } from '@ionic/react';
import './Home.css'; // Add your custom styles here
import { chevronForwardCircle, ellipsisHorizontal, ellipsisVertical, link, locationSharp, personCircle, phoneLandscapeOutline, phonePortrait, phonePortraitSharp, pin, pricetag, printOutline, qrCodeOutline, search, share, shareOutline, star, thumbsUpSharp, trendingUpOutline, warning } from 'ionicons/icons';

const Home: React.FC = () => {
    // Sample user data
    const user = {
        username: 'Ajay Donode',
        title: "Software Services",
        subTitle: null,
        description: "we provide best software solution for small business",
        contact: 4089211874,
        address: '1052 S Jacobs Drive, CA - 95391',
        followers: 150,
        following: 75,
        bannerPicture: 'https://picsum.photos/500/200', // Placeholder image
        profilePicture: 'https://picsum.photos/100/100' // Placeholder image
    };

    return (

        <div className="fullscreen-div">
            <IonCard>
                <img src={user.bannerPicture} />
                <IonCardHeader>
                    <IonAvatar className="avatar">
                        <img src={user.profilePicture} alt="Profile" />
                        <IonLabel>{user.username}</IonLabel>
                    </IonAvatar>
                </IonCardHeader>
                <IonCardContent>

                    <p>
                        <br></br>
                        <IonText class='title'>
                            {user.title}
                        </IonText>
                        <br></br>
                        <IonText class="contact">
                            <IonIcon icon={phonePortraitSharp}></IonIcon> {user.contact}
                        </IonText>
                        <br></br>
                        <IonText class="contact">
                            <IonIcon icon={locationSharp}></IonIcon> {user.address}
                        </IonText>
                    </p>
                    <p>
                        {user.description}
                    </p> </IonCardContent>
                <IonToolbar>

                    {/* <br></br> */}
                    <IonChip>
                        <IonIcon icon={thumbsUpSharp} color="primary"></IonIcon>
                        <IonLabel>{user.followers} Boosters</IonLabel>
                    </IonChip>
                    <IonChip>
                        <IonIcon icon={trendingUpOutline} color="primary"></IonIcon>
                        <IonLabel>{user.following} SatiScore</IonLabel>
                    </IonChip>

                    {/* <IonButtons slot="secondary">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                        </IonButton>
                        <IonButton>
                            <IonIcon slot="icon-only" icon={search}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton>
                            <IonIcon slot="icon-only" ios={share} md={share}></IonIcon>
                        </IonButton>
                    </IonButtons> */}

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

        </div>

    );
};
export default Home;