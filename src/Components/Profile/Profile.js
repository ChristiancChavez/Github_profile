import React, { useState } from 'react';
//Style
import './profile.scss';
//Dependencies
import axios from 'axios';
//Components
//import Repositories from '../Repositories';

const Profile = () => {

    const [profile, setProfile] = useState({});

    const handleGetRepos = async () => {
        console.log('get repos');
        try {
            const fetchData =  await axios.get( "https://api.github.com/users/ChristiancChavez");
            console.log(fetchData.data);
            setProfile(fetchData.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile">
            <div className="profile-content">
                <img className="profile-content__image" src="" alt ="" />
                <span className="profile-content__info">{profile.login}</span>
                <span className="profile-content__info">chchavez</span>
                <span className="profile-content__info">04/16/1991</span>
                <span className="profile-content__info">christiancchavez10@hotmail.com</span>
                <span className="profile-content__info">{profile.id}</span>
                <span className="profile-content__info">Followers{profile.followers}</span>
                <span className="profile-content__info">Following{profile.folowing}</span>
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
