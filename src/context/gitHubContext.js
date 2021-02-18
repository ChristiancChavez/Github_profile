import React, { createContext, useState } from 'react';

export const GithubContext = createContext();
const GitHubContextProvider = (props) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState();
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');

    return (
        <GithubContext 
            value={
                {
                    name, 
                    setName,
                    lastName, 
                    setLastName,
                    id, 
                    setId,
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
        </GithubContext>
    );
};

export default GitHubContextProvider;
