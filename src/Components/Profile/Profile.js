import React, { useContext, useEffect, useState } from 'react';
//Style
import './profile.scss';
//Dependencies
import axios from 'axios';
//Components
import Repositories from '../Repositories';
//Context
import { GithubContext } from '../../context/gitHubContext';
// Requests
import { requestFirstPageRepos } from '../../request/request';


const Profile = () => {

    const { name, lastName, date, email, user, company, profile, showProfile, setNumRepos, setRepos, reposPerPage } = useContext(GithubContext);
    const [showRepos, setShowRepos] = useState(false);
    const [loading, setLoading] = useState(false);
    const urlRepo = `https://api.github.com/users/${user}/repos`;
    const nameUpper = name.toUpperCase();
    const lastNameUpper =  lastName.toUpperCase();

    const handleGetFullRepos = async (reposPerPage) => {
        try {
            const fetchReposUser =  await axios.get(urlRepo);
            const lengthFetchedRepos = fetchReposUser.data.length;
            const numOfTabsRepos = Math.ceil(lengthFetchedRepos / reposPerPage);
            setNumRepos(numOfTabsRepos);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleFirstPageRepos = async () => {
    //     try {
    //         const fetchReposUser =  await axios.get(`${urlRepo}?page=1&per_page=${reposPerPage}`);
    //         setRepos(fetchReposUser.data);
    //         setShowRepos(true);
    //         setLoading(false);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleFirstPageRepos = async (user) => {
        try {
            const fetchReposUser =  await requestFirstPageRepos(user);
            setRepos(fetchReposUser.data);
            setShowRepos(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        if (user) {
            handleGetFullRepos(reposPerPage);
        }
    }, [user]);
    

    return (
        <div className="profile">
            {loading &&
                <h1>loading......</h1>
            }
            {showProfile && 
                <div className="profile-content">
                    <a href={profile.html_url} target="blank">
                        <img className="profile-content__image" src={profile.avatar_url} alt ={user} />
                    </a>
                    <span className="profile-content__info">{`${nameUpper} ${lastNameUpper}`}</span>
                    <span className="profile-content__info">{user}</span>
                    <span className="profile-content__info">{email}</span>
                    <span className="profile-content__info">{company}</span>
                    <span className="profile-content__info">Birthday: {date}</span>
                    <span className="profile-content__info">Id: {profile.id}</span>
                    <span className="profile-content__info">Followers: {profile.followers}</span>
                    <span className="profile-content__info">Following: {profile.following}</span>
                    <button className="profile-content__repos" onClick={() => handleFirstPageRepos(user)}>See Repositories</button>
                </div>
            }
            {showRepos &&
                <div className="profile-repos">
                    <Repositories />
                </div>
            }
        </div>
    );
};

export default Profile;
