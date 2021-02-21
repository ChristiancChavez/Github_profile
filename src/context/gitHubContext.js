import React, { createContext, useState } from 'react';

export const GithubContext = createContext();
const GitHubContextProvider = (props) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState();
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [company, setCompany] = useState('');
    const [repos, setRepos] = useState([]);
    const [profile, setProfile] = useState({});
    const [showProfile, setShowProfile] = useState(false);
    const [numRepos, setNumRepos] = useState(0);
    const reposPerPage = 10;


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
                    company, 
                    setCompany,
                    repos, 
                    setRepos,
                    profile, 
                    setProfile,
                    showProfile, 
                    setShowProfile,
                    numRepos, 
                    setNumRepos,
                    reposPerPage
                }
            }
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GitHubContextProvider;
