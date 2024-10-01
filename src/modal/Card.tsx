// src/models/Card.js

export type Contact = {
  address: string;
  phoneNumber: string;
  email: string;
};

class Card {
  id: String;
  title: String;
  subTitle: String;
  tags: String[];
  description: String;
  profilePicture: String;
  contact: Contact
  constructor(id:String, title:String, subTitle:String, tags:String[], description:String, profilePicture:String, contact: Contact) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.tags = tags; // Should be an array
    this.description = description;
    this.profilePicture = profilePicture;
    this.contact = contact;
  }

  // Example method to format tags
  getFormattedTags() {
    return this.tags.join(', ');
  }
}

export default Card;


