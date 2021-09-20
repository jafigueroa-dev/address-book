import { useEffect, useState } from "react";
import { ContactResponse } from "../types/contact";
import { getContact } from "../utils/Api";

const useContactFetch = (currentContact: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState<ContactResponse>({
    id: -1,
    firstName: "Loading...",
    lastName: "Loading...",
    emails: [],
  });

  useEffect(() => {
    const retrieveContactData = async () => {
      setLoading(true);
      setError(false);

      const data = await getContact(currentContact);
      if (data !== null) {
        setContact(data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    };
    if (currentContact === -2) {
      setContact({ id: -2, firstName: "", lastName: "", emails: [] });
    } else {
      retrieveContactData();
    }
  }, [currentContact]);

  return { loading, error, contact };
};

export default useContactFetch;
