import React, { useState, useEffect } from 'react';

const useCollections = (FireStore, collectionName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);

  const getUsersLists = () => {
    const currentUsersList = [];
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    return FireStore.collection(collectionName)
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(documentSnapshot => {
          currentUsersList.push({
            id: documentSnapshot.id.toString(),
            data: documentSnapshot.data(),
          });
        });
        setData(currentUsersList);
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUsersLists();
  }, [FireStore, collectionName]);

  return { isLoading, isError, errorMessage, getUsersLists, data };
};

export default useCollections;
