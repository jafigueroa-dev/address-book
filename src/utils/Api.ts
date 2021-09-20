import axios from "axios";
import { ContactResponse, ContactResponsePaginated } from "../types/contact";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * Function that creates new contact information
 * @param {String} firstName - First name of contact
 * @param {String} lastName - Last name of contact
 * @param {String[]} emails - Email list of contact
 * @return {ContactResponse | null} - Returns the newly created contact or null if failed
 */
export const createContact = async (
  firstName: string,
  lastName: string,
  emails: string[]
): Promise<ContactResponse | null> => {
  const response: ContactResponse = await api
    .post(`/contacts`, {
      firstName: firstName,
      lastName: lastName,
      emails: emails,
    })
    .then(res => res.data)
    .catch(error => null);

  return response;
};

/**
 * Function that deletes contact information
 * @param {Number} contactId - ID of a contact
 * @return {Boolean} - Returns whether it was deleted or not
 */
export const deleteContact = async (contactId: number): Promise<boolean> => {
  const response = await api
    .delete(`/contacts/${contactId}`)
    .then(_ => true)
    .catch(_ => false);

  return response;
};

/**
 * Function that updates contact information
 * @param {Number} contactId - ID of contact
 * @param {String} firstName - First name of contact
 * @param {String} lastName - Last name of contact
 * @param {String[]} emails - Email list of contact
 * @return {ContactResponse | null} - Returns the newly updated contact or null if failed
 */
export const updateContact = async (
  contactId: number,
  firstName: string,
  lastName: string,
  emails: string[]
): Promise<ContactResponse | null> => {
  const response = await api
    .put(`/contacts/${contactId}`, {
      firstName: firstName,
      lastName: lastName,
      emails: emails,
    })
    .then(res => res.data)
    .catch(error => null);

  return response;
};

/**
 * Function that retrieves contact information
 * @param {Number} contactId - ID of contact
 * @return {ContactResponse | null} - Returns the contact or null if failed
 */
export const getContact = async (
  contactId: number
): Promise<ContactResponse | null> => {
  const response = await api
    .get(`/contacts/${contactId}`)
    .then(res => res.data)
    .catch(error => null);

  return response;
};

/**
 * Function that retrieves paginated list of contacts
 * @param {Number} page - Page to retrieve list of contacts
 * @return {ContactResponsePaginated | null} - Returns paginated contact list or null if failed
 */
export const getContactPaginated = async (
  page: number
): Promise<ContactResponsePaginated | null> => {
  const response: ContactResponsePaginated = await api
    .get(`/contacts/paginated?page=${page}`)
    .then(res => res.data)
    .catch(error => null);

  return response;
};
