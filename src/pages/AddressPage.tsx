import * as React from "react";
import { useState } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList";
import ContactPlaceholder from "../components/ContactPlaceholder";
import AddIcon from "../components/Icons/AddIcon";
import { ContactContext } from "../state/ContactContext";

const AddressPage: React.FC<{}> = props => {
  const [currentContact, setCurrentContact] = useState<number>(-2);
  const [contactListKey, updateContactListKey] = useState(1);

  const updateContactList = () => {
    updateContactListKey(prev => prev + 1);
  };

  return (
    <ContactContext.Provider value={{ currentContact, setCurrentContact }}>
      <main className="flex flex-1 h-screen overflow-hidden select-none">
        <div className="bg-blue-50 w-48 md:w-52">
          <div className="flex items-center space-x-1 m-2 py-3">
            <div className="font-medium text-4xl md:ml-1 md:mr-2">Contacts</div>
            <div
              onClick={() => setCurrentContact(-2)}
              className="cursor-pointer"
              title="Add new contact"
            >
              <AddIcon width="30" height="30" />
            </div>
          </div>
          <ContactList key={contactListKey} />
        </div>
        <div className="w-full md:p-10 md:max-w-screen-md">
          {currentContact !== -1 ? (
            <ContactForm
              currentContact={currentContact}
              updateContactList={updateContactList}
            />
          ) : (
            <ContactPlaceholder />
          )}
        </div>
      </main>
    </ContactContext.Provider>
  );
};

export default AddressPage;
