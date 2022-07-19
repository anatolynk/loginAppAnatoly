import React, { useState, useEffect } from 'react';
/**
 * @param {InstanceType} FireStore - Firestore instance - firestore()
 * @param {String} collectionName - Collection name: users, ...
 * @param {Object} filter - Object with fields - favorite: true or false
 * @returns {State} isLoading, isError, errorMessage, getUsersLists, data
 */
const useCollections = (FireStore, collectionName, filter = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);

  function onResult(QuerySnapshot) {
    const currentUsersList = [];

    QuerySnapshot.forEach(documentSnapshot => {
      if (Object.keys(filter).length) {
        if (filter.favorite === documentSnapshot.data().favorite) {
          currentUsersList.push({
            id: documentSnapshot.id.toString(),
            data: documentSnapshot.data(),
          });
        }
      } else
        currentUsersList.push({
          id: documentSnapshot.id.toString(),
          data: documentSnapshot.data(),
        });
    });
    setData(currentUsersList);
    setIsLoading(false);
  }

  function onError(error) {
    setIsError(true);
    setErrorMessage(error.message);
    setIsLoading(false);
  }

  useEffect(() => {
    const subscribe = FireStore.collection(collectionName).onSnapshot(
      onResult,
      onError,
    );
    return () => subscribe();
  }, []);

  return { isLoading, isError, errorMessage, data };
};

export default useCollections;
