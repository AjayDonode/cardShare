// AddUserModal.tsx
import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonModal,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonIcon,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';

interface AddUserModalProps {
    isOpen: boolean;
    onDidDismiss: () => void;
    onAddUser: (name: string, category: string) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onDidDismiss, onAddUser }) => {
    const [userName, setUserName] = useState('');
    const [userCategory, setUserCategory] = useState('');

    const handleAddUser = () => {
        if (userName && userCategory) {
            onAddUser(userName, userCategory);
            setUserName('');
            setUserCategory('');
            onDidDismiss();
        }
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
            <IonHeader>
                <IonToolbar>
                     <IonButtons slot="start">
                     <IonButton onClick={onDidDismiss}>
                            <IonIcon icon={chevronBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Add Card</IonTitle>
                    {/* <IonButton slot="end" onClick={onDidDismiss}>Close</IonButton> */}
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonItem>
                    <IonLabel position="stacked">Existing Category</IonLabel>
                    <IonSelect
                        value={userCategory}
                        onIonChange={(e) => setUserCategory(e.detail.value!)}
                    >
                        <IonSelectOption value="a">Category A </IonSelectOption>
                        <IonSelectOption value="b">Category B</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Add to New Catagory</IonLabel>
                    <IonInput
                        value={userName}
                        onIonChange={(e) => setUserName(e.detail.value!)}
                        placeholder="Enter user name"
                    />
                </IonItem>
               
                <IonButton expand="full" onClick={handleAddUser}>Add User</IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddUserModal;
