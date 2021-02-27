import React, {useState, createContext, useContext} from 'react';

export const PeopleContext = createContext();

export const PeopleProvider = props => {
    const [people, setPeople] = useState([]);
    return <PeopleContext.Provider value={[people, setPeople]} {...props} ></PeopleContext.Provider>;
};

export const usePeopleStore = () => useContext(PeopleContext);
