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

  const getUsersLists = () => {
    const currentUsersList = [];
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    let query = FireStore.collection(collectionName);
    if (filter.favorite) query = query.where('favorite', '==', filter.favorite);
    if (filter.hidden) query = query.where('hidden', '==', filter.hidden);
    // query = query.orderBy('name', 'desc');
    return query
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
