import React, { useState, useContext } from 'react';
//Style
import './profile.scss';
//Dependencies
import axios from 'axios';
//Components
//import Repositories from '../Repositories';
//Context
import { GithubContext } from '../../context/gitHubContext';

const Profile = () => {

    const { name, lastName, date, email, user } = useContext(GithubContext);
    const [profile, setProfile] = useState({});

    const handleGetRepos = async () => {
        console.log('get repos');
        try {
            const fetchInfoGithub =  await axios.get( "https://api.github.com/users/ChristiancChavez");
            console.log(fetchInfoGithub.data);
            setProfile(fetchInfoGithub.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile">
            <div className="profile-content">
                <a href={profile.html_url} target="blank">
                    <img className="profile-content__image" src={profile.avatar_url} alt ={user} />
                </a>
                <span className="profile-content__info">{name} {lastName}</span>
                <span className="profile-content__info">{profile.login}</span>
                <span className="profile-content__info">{email}</span>
                <span className="profile-content__info">Birthday: {date}</span>
                <span className="profile-content__info">Id: {profile.id}</span>
                <span className="profile-content__info">Followers: {profile.followers}</span>
                <span className="profile-content__info">Following: {profile.following}</span>
                <button className="profile-content__repos" onClick={handleGetRepos}>See Repositories</button>
            </div>
            {!!profile.lenght && 
                profile.map(profile => (
                    <div>
                        aqui van los profile
                        {profile}
                    </div>
                ))
            }
        </div>
    );
};

export default Profile;
