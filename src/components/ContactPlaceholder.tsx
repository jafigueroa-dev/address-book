import * as React from "react";

type ContactPlaceholderProps = {};

const ContactPlaceholder: React.FunctionComponent<ContactPlaceholderProps> =
  props => {
    return (
      <>
        <div className="relative h-64 w-full p-4">
          <div className="absolute inset-0 flex items-center justify-center cursor-default md:text-4xl text-gray-700 font-medium m-4">
            Select a contact or create a new one
          </div>
        </div>
      </>
    );
  };

export default ContactPlaceholder;
