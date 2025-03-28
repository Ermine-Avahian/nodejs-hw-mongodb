import { SORT_ORDER } from '../constans/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// Get all contacts for a user with pagination, sorting, and filtering
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

// Get a contact by its ID and ensure it belongs to the current user
export const getContactById = async (contactId, userId) => {
  const data = await ContactsCollection.findOne({ _id: contactId, userId });
  return data;
};

// Create a new contact
export const createContact = async (payload) => {
  const data = await ContactsCollection.create(payload);
  return data;
};

// Delete a contact by its ID and ensure it belongs to the current user
export const deleteContact = async (contactId, userId) => {
  const data = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return data;
};

// Update a contact by its ID and ensure it belongs to the current user

export const updateContact = async (contactId, payload = {}, userId) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return rawResult.value;
};
