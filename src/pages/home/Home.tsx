import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonPage, IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon } from '@ionic/react';
import './Home.css'; // Add your custom styles here
import { ellipsisHorizontal, ellipsisVertical, personCircle, search, share } from 'ionicons/icons';

const Home: React.FC = () => {
    // Sample user data
    const user = {
        username: 'Ajay Donode',
        followers: 150,
        following: 75,
        bannerPicture: 'https://picsum.photos/500/200', // Placeholder image
        profilePicture: 'https://picsum.photos/100/100' // Placeholder image
    };

    return (

        <div className="fullscreen-div">
             <IonCard>
             <img src={user.bannerPicture}  />
                <IonCardHeader>
                    <IonAvatar className="avatar">
                        <img src={user.profilePicture} alt="Profile" />
                        <span>{user.username}</span>
                    </IonAvatar>
                </IonCardHeader>
                <IonCardContent>
                    <div className="user-stats">
                        <span>{user.followers} Followers</span>
                        <span>{user.following} Following</span>
                    </div>
                </IonCardContent>
                <IonToolbar>
        <IonButtons slot="secondary">
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
        </IonButtons>
       
      </IonToolbar>
            </IonCard>
            <div className="feed">
                {/* Add feed items here */}
                <p>Welcome to Dnex Plumbing, where we believe that quality plumbing is the backbone of a comfortable home. With over 10+ Years of experience in the plumbing industry, our dedicated team of certified professionals is committed to providing top-notch services that meet your needs and exceed your expectations.

At [Your Company Name], we understand that plumbing issues can arise unexpectedly, causing stress and inconvenience. That’s why we offer a comprehensive range of services, from routine maintenance and repairs to emergency plumbing solutions. Our mission is to ensure that your plumbing systems function efficiently and reliably, allowing you to focus on what truly matters—your home and family.

We pride ourselves on our transparent pricing, punctual service, and customer satisfaction guarantee. Our team is equipped with the latest tools and techniques to tackle any plumbing challenge, big or small. Whether it’s a leaky faucet, a clogged drain, or a complete bathroom renovation, you can count on us to deliver exceptional results.

Join countless satisfied customers who have trusted [Your Company Name] for their plumbing needs. Contact us today for a free estimate and experience the difference of working with a plumbing company that puts your needs first!</p>
            </div>
        </div>
    );
};
export default Home;