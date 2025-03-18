import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const getContactById = async (contactId) => {
  const data = await ContactsCollection.findById(contactId);
  return data;
};

export const createContact = async (payload) => {
  const data = await ContactsCollection.create(payload);
  return data;
};

export const deleteContact = async (contactId) => {
  const data = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return data;
};

export const updateContact = async (contactId, payload = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
