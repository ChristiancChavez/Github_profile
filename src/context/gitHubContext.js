import React, { createContext, useState } from 'react';

export const GithubContext = createContext();
const GitHubContextProvider = (props) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');

    return (
        <GithubContext.Provider 
            value={
                {
                    name, 
                    setName,
                    lastName, 
                    setLastName,
                    date, 
                    setDate,
                    email, 
                    setEmail,
                    user, 
                    setUser,
                }
            }
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GitHubContextProvider;
