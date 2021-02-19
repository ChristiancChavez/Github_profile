import React, { useContext, useState } from 'react';
//Style
import './profile.scss';
//Dependencies
import axios from 'axios';
//Components
import Repositories from '../Repositories';
//Context
import { GithubContext } from '../../context/gitHubContext';


const Profile = () => {

    const { name, lastName, date, email, user, company, setRepos, profile, showProfile } = useContext(GithubContext);
    const [showRepos, setShowRepos] = useState(false);

    const handleGetRepos = async () => {
        try {
            const fetchReposUser =  await axios.get(`https://api.github.com/users/${user}/repos`);
            console.log(fetchReposUser.data);
            setRepos(fetchReposUser.data);
            setShowRepos(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile">
            {showProfile && 
                <div className="profile-content">
                    <a href={profile.html_url} target="blank">
                        <img className="profile-content__image" src={profile.avatar_url} alt ={user} />
                    </a>
                    <span className="profile-content__info">{name.toUpperCase()} {lastName.toUpperCase()}</span>
                    <span className="profile-content__info">{user}</span>
                    <span className="profile-content__info">{email}</span>
                    <span className="profile-content__info">{company}</span>
                    <span className="profile-content__info">Birthday: {date}</span>
                    <span className="profile-content__info">Id: {profile.id}</span>
                    <span className="profile-content__info">Followers: {profile.followers}</span>
                    <span className="profile-content__info">Following: {profile.following}</span>
                    <button className="profile-content__repos" onClick={handleGetRepos}>See Repositories</button>
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
