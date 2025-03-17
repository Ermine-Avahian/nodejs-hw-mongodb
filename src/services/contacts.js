import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const getContactById = async (contactId) => {
  const data = await ContactsCollection.findById(contactId);
  return data;
};
