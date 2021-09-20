import { useEffect, useState } from "react";
import { ContactResponse } from "../types/contact";
import { getContactPaginated } from "../utils/Api";

const usePaginatedFetch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [contactList, setContactList] = useState<ContactResponse[]>([]);

  useEffect(() => {
    const retrievePaginatedData = async () => {
      setLoading(true);
      setError(false);

      const data = await getContactPaginated(pageNumber);

      if (data !== null) {
        setContactList(prevList => [...prevList, ...data.contacts]);
        setHasMore(pageNumber * data.itemsPerPage < data.totalItems);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    };

    retrievePaginatedData();
  }, [pageNumber, setContactList]);

  return {
    loading,
    error,
    contactList,
    hasMore,
    pageNumber,
    setPageNumber,
  };
};

export default usePaginatedFetch;
