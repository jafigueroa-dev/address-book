import { Spinner } from "@chakra-ui/react";
import * as React from "react";
import { useCallback, useRef } from "react";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { useContactContext } from "../state/ContactContext";

const ContactList: React.FC<{}> = props => {
  const { loading, error, contactList, hasMore, setPageNumber } =
    usePaginatedFetch();

  const { currentContact, setCurrentContact } = useContactContext();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastContactElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );

  return (
    <div className="flex flex-col items-center overflow-y-auto w-full h-screen">
      {contactList.map(({ id, firstName, lastName }, index) => {
        if (index + 1 === contactList.length) {
          return (
            <button
              key={id}
              ref={lastContactElementRef}
              onClick={() => setCurrentContact(id)}
              className={`block w-full text-left font-normal m-0 py-1 px-4 text-lg hover:bg-blue-400 hover:text-white ${
                currentContact !== id ? "" : "bg-blue-500 text-white"
              }`}
            >
              {firstName + " " + lastName}
            </button>
          );
        } else {
          return (
            <button
              key={id}
              onClick={() => setCurrentContact(id)}
              className={`block w-full text-left font-normal m-0 py-1 px-4 text-lg hover:bg-blue-400 hover:text-white ${
                currentContact !== id ? "" : "bg-blue-500 text-white"
              }`}
            >
              {firstName} {lastName}
            </button>
          );
        }
      })}
      {loading && <Spinner />}
      {error && <div className="font-medium">Request failed...</div>}
      <div className="mb-48" />
    </div>
  );
};

export default ContactList;
