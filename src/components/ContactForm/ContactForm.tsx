import { useToast } from "@chakra-ui/react";
import { FieldArray, FieldAttributes, Form, Formik } from "formik";
import * as React from "react";
import { useRef } from "react";
import useContactFetch from "../../hooks/useContactFetch";
import { useContactContext } from "../../state/ContactContext";
import { createContact, deleteContact, updateContact } from "../../utils/Api";
import AddIcon from "../Icons/AddIcon";
import ArrayInputField from "../Inputs/ArrayInputField";
import InputField from "../Inputs/InputField";
import { ContactFormSchema } from "./ContactForm.schema";

export type ContactFormProps = {
  updateContactList: () => void;
  currentContact: number;
};

const ContactForm: React.FC<ContactFormProps> = ({
  currentContact,
  updateContactList,
}) => {
  const { contact } = useContactFetch(currentContact);
  const { setCurrentContact } = useContactContext();

  const toast = useToast();

  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <div key={contact.id}>
      <Formik
        initialValues={{
          firstName: contact.firstName,
          lastName: contact.lastName,
          emails: contact.emails,
        }}
        validationSchema={ContactFormSchema}
        onSubmit={values => {
          if (contact.id === -2) {
            createContact(
              values.firstName,
              values.lastName,
              values.emails
            ).then(res => {
              if (res) setCurrentContact(res.id);
              updateContactList();
              toast({
                title: "Created.",
                description: `${values.firstName} ${values.lastName} contact has been created.`,
                status: "success",
                variant: "left-accent",
                position: "bottom",
                duration: 5000,
              });
            });
          } else {
            updateContact(
              contact.id,
              values.firstName,
              values.lastName,
              values.emails
            ).then(_ => {
              updateContactList();
              toast({
                title: "Updated.",
                description: `${values.firstName} ${values.lastName} contact has been updated.`,
                status: "info",
                variant: "left-accent",
                position: "bottom",
                duration: 5000,
              });
            });
          }
        }}
      >
        {({ values, errors }) => (
          <Form>
            <div className="grid grid-cols-2">
              <div className="col-span-2 md:flex md:flex-1">
                <InputField
                  placeholder="Enter first name"
                  name="firstName"
                  label="First Name"
                />
                <InputField
                  placeholder="Enter last name"
                  name="lastName"
                  label="Last Name"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="p-2">
                  <label className="font-medium text-sm">Emails</label>
                  <FieldArray name="emails">
                    {arrayHelpers => (
                      <div>
                        {values.emails.map((email, index) => {
                          if (index + 1 === values.emails?.length) {
                            return (
                              <div
                                ref={inputRef}
                                key={index}
                                className="flex flex-1"
                              >
                                <ArrayInputField
                                  name={`emails.${index}`}
                                  index={index}
                                  value={email}
                                  placeholder="Enter email here"
                                  arrayHelper={arrayHelpers}
                                />
                              </div>
                            );
                          } else {
                            return (
                              <div key={index} className="flex flex-1">
                                <ArrayInputField
                                  name={`emails.${index}`}
                                  index={index}
                                  value={email}
                                  placeholder="Enter email here"
                                  arrayHelper={arrayHelpers}
                                />
                              </div>
                            );
                          }
                        })}
                        <div
                          className="flex flex-1 items-center cursor-pointer mt-2"
                          onClick={() => {
                            arrayHelpers.push("");
                            if (inputRef.current)
                              setTimeout(() => {
                                const lastArrayInput: FieldAttributes<any> =
                                  inputRef.current?.children[0];
                                lastArrayInput.focus();
                              }, 20);
                          }}
                        >
                          <AddIcon width="24" height="24" />
                          <div className="text-blue-400 font-normal ml-2">
                            add email
                          </div>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            </div>
            <div className="md:justify-between md:w-full md:flex md:flex-1">
              {currentContact !== -2 ? (
                <button
                  type="button"
                  onClick={() => {
                    deleteContact(contact.id).then(_ => {
                      setCurrentContact(-1);
                      updateContactList();
                      toast({
                        title: "Deleted.",
                        description: `${values.firstName} ${values.lastName} contact has been deleted.`,
                        status: "info",
                        variant: "left-accent",
                        position: "bottom",
                        duration: 5000,
                      });
                    });
                  }}
                  className="bg-red-400 hover:bg-red-600 text-white font-normal py-2 px-4 m-2 rounded-none"
                >
                  Delete
                </button>
              ) : null}
              <div className="flex md:flex-1 md:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentContact(-1);
                  }}
                  className="bg-white border border-blue-500 m-2 hover:bg-blue-50 text-black font-normal py-2 px-4 rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-blue-400 m-2 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded-none ${
                    errors.emails || errors.firstName || errors.lastName
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
