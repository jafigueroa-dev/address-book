export type Contact = {
  firstName: string;
  lastName: string;
  emails: string[];
};

export type ContactResponse = Contact & {
  id: number;
};

export type ContactResponsePaginated = {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  contacts: ContactResponse[];
};
