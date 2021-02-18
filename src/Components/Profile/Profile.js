import React from 'react';
//Style
import './profile.scss';
//Components
import Repositories from '../Repositories';

const Profile = () => {
    return (
        <div className="profile">
            <div className="profile-content">
                <img className="profile-content__image" src="" alt ="" />
                <span className="profile-content__info">Christian Chávez</span>
                <span className="profile-content__info">chchavez</span>
                <span className="profile-content__info">04/16/1991</span>
                <span className="profile-content__info">christiancchavez10@hotmail.com</span>
                <button className="profile-content__repos" type="button">See Repositories</button>
            </div>
            <Repositories />
        </div>
    );
};

export default Profile;
