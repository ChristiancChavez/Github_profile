import React, { useContext, useEffect, useState } from 'react';
//Style
import './form.scss';
//Context
import { GithubContext } from '../../context/gitHubContext';
//Dependencies
import axios from 'axios';

const Form = () => {

    const { setName, setLastName, setDate, setEmail, setUser, setCompany, user, setProfile, setShowProfile, name, lastName, date, email, company } = useContext(GithubContext);
    const [messageFormWithoutData, setMessageFormWithoutData] = useState(false);
    const [invalidData, setInvalidData] = useState(['hbbhb', 'hglhghg']);

    const handleProfileData = async (e, user) => {
        e.preventDefault();
        if(name.trim() !=='' && lastName.trim() !=='' && date.trim() !=='' && email.trim() !=='' && user.trim() !=='' && company.trim() !=='') {
            try {
                const fetchUserGithub =  await axios.get(`https://api.github.com/users/${user}`);
                setProfile(fetchUserGithub.data);
            } catch (error) {
                console.log(error);
            }
            setShowProfile(true);
            setMessageFormWithoutData(false);
        } else {
            setMessageFormWithoutData(true);
            setName(''); 
            setLastName(''); 
            setDate(''); 
            setEmail(''); 
            setUser(''); 
            setCompany('');
        }
    };

    const showMessageInvalid = (invalidData) => {
        return invalidData.map(data =>
            <li>{data}</li>    
        )  
    };

    const validDateYear = (date) => {
        const getToday = new Date();
        const currentYear = date.split('-');
        const yearNumber = Number(currentYear[0]);
        const yearString = currentYear[0].split('');
        if(date !== getToday && yearNumber < 2005 && yearString.length === 4){
            setDate(date);
            console.log('ES VALIDO EL AÑO');
        } else {
            setInvalidData([...invalidData, `Birthday's date`]);
        }
    };
        
    const validateName = (name) => {
        const testNumeric = /^[0-9]+$/;
        if(name.match(testNumeric)){
            console.log('contiene nuemros, invalido');
        }
        else {
            console.log('solo texto, valido');
        }
    };

    const handleCloseMessageFill = () => {
        setMessageFormWithoutData(false);
    };
    console.log(invalidData,'ES INVALIDO EL AÑO');

    return (
        <div className="form-container">
            <form className="form" onSubmit={(e) => handleProfileData(e, user)}>
                <label className="form-label">
                    Name
                    <input required className="form-label__input" type="text" name="name" onChange={(e)=> validateName(e.target.value)} />
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
                    <input required className="form-label__input" type="Date" name="date" onChange={(e)=> validDateYear(e.target.value)} />
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
            {messageFormWithoutData &&
                <div className="form-message">
                    <div className="form-message__list">
                        <span>Fill correctly these categories</span>
                        <ul>
                            {!!invalidData.length && showMessageInvalid()}
                        </ul>
                    </div>
                    <button className="form-message__close" onClick={handleCloseMessageFill}>X</button>
                </div>
            }
        </div>
    );
};

export default Form;
