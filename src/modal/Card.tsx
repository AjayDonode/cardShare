// src/models/Card.js

export type Contact = {
  address: string;
  phoneNumber: string;
  email: string;
};

class Card {
  id: string;
  title: string;
  subTitle: string;
  tags: string[];
  description: string;
  bannerPicture: string;
  profilePicture: string;
  contact: Contact
    
  constructor(id:string, title:string, subTitle:string, tags:string[], description:string, bannerPicture:string, profilePicture:string, contact: Contact) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.tags = tags; // Should be an array
    this.description = description;
    this.bannerPicture = bannerPicture;
    this.profilePicture = profilePicture;
    this.contact = contact;
  }

  // Example method to format tags
  getFormattedTags() {
    return this.tags.join(', ');
  }
}

export default Card;


