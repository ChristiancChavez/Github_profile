import React, { useContext } from 'react';
//Style
import './form.scss';
//Context
import { GithubContext } from '../../context/gitHubContext';
//Dependencies
import axios from 'axios';

const Form = () => {

    const { setName, setLastName, setDate, setEmail, setUser, setCompany, user, setProfile, setShowProfile } = useContext(GithubContext);

    const handleProfileData = async (e, user) => {
        e.preventDefault();
        console.log('hola soy search profile');
        try {
            const fetchUserGithub =  await axios.get(`https://api.github.com/users/${user}`);
            console.log(fetchUserGithub.data);
            setProfile(fetchUserGithub.data);
        } catch (error) {
            console.log(error);
        }
        //setName(''); 
        //setLastName(''); 
        //setDate(''); 
        //setEmail(''); 
        //setUser(''); 
        //setCompany('');
        setShowProfile(true);
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={(e) => handleProfileData(e, user)}>
                <label className="form-label">
                    Name
                    <input required className="form-label__input" type="text" name="name" onChange={(e)=> setName(e.target.value)} />
                </label>
                <label className="form-label">
                    LastName
                    <input required className="form-label__input" type="text" name="lastName" onChange={(e)=> setLastName(e.target.value)} />
                </label>
                <label className="form-label">
                    Company
                    <input required className="form-label__input" type="text" name="company" onChange={(e)=> setCompany(e.target.value)} />
                </label>
                <label className="form-label">
                    Birthday's Date
                    <input required className="form-label__input" type="Date" name="date" onChange={(e)=> setDate(e.target.value)} />
                </label>
                <label className="form-label">
                    E-mail
                    <input required className="form-label__input" type="text" name="e-mail" onChange={(e)=> setEmail(e.target.value)} />
                </label>
                <label className="form-label">
                    GitHub User
                    <input required className="form-label__input" type="text" name="user" onChange={(e)=> setUser(e.target.value)} />
                </label>
                <span></span>
                <input className="form-submit" type="submit" value="Search profile" />
            </form>
        </div>
    );
};

export default Form;
