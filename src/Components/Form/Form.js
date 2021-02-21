import React, { useContext, useState } from 'react';
//Style
import './form.scss';
//Context
import { GithubContext } from '../../context/gitHubContext';
//Dependencies
import axios from 'axios';
//Components
import Validation from '../Validation';

const Form = () => {

    const { setName, setLastName, setDate, setEmail, setUser, setCompany, user, setProfile, setShowProfile, name, lastName, date, email, company } = useContext(GithubContext);
    const [messageFormWithoutData, setMessageFormWithoutData] = useState(false);
    const [invalidData, setInvalidData] = useState([]);
    const [errorName, setErrorName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [errorCompany, setErrorCompany] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const testNumeric = /^[0-9]+$/;

    const handleProfileData = async (e, user) => {
        e.preventDefault();
        if(name && lastName && date && email && user && company) {
            try {
                const fetchUserGithub =  await axios.get(`https://api.github.com/users/${user}`);
                setProfile(fetchUserGithub.data);
                setShowProfile(true);
                setMessageFormWithoutData(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            setMessageFormWithoutData(true);
        }
    };

    const validDateYear = (date) => {
        const getToday = new Date();
        const currentYear = date.split('-');
        const yearNumber = Number(currentYear[0]);
        const yearString = currentYear[0].split('');
        if(date !== getToday && yearNumber < 2005 && yearString.length === 4 && date.trim() !== ''){
            setDate(date);
            console.log('YEAR, valido');
            setErrorDate(false);
        } else {
            setInvalidData([...invalidData, `Birthday's date`]);
            console.log('YEAR, invalido');
            setErrorDate(true);
            setDate('');
        }
    };
        
    const validateName = (name) => {
        if(testNumeric.test(name) || name.trim() === '') {
            console.log('NAME, invalido');
            setInvalidData([...invalidData, 'name']);
            setErrorName(true);
        }
        else {
            setName(name);
            setErrorName(false);
            console.log('NAME, valido');
        }
    };

    const validateLastName = (lastName) => {
        if(testNumeric.test(lastName) || lastName.trim() === '') {
            console.log('LASTNAME, invalido');
            setInvalidData([...invalidData, 'lastName']);
            setErrorLastName(true);
        }
        else {
            setLastName(lastName);
            setErrorLastName(false);
            console.log('LASTNAME, valido');
        }
    };

    const validateCompany = (company) => {
        if(testNumeric.test(company) || company.trim() === '') {
            console.log('COMPANY, invalido');
            setInvalidData([...invalidData, 'company']);
            setErrorCompany(true);
        }
        else {
            setCompany(company);
            setErrorCompany(false);
            console.log('COMPANY, valido');
        }
    };

    const validateEmail = (email) => {
        const regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email);
        console.log(regexEmail);
        if( email.trim() === '' || !regexEmail) {
            console.log('EMAIL, invalido');
            setInvalidData([...invalidData, 'email']);
            setErrorEmail(true);
        }
        else {
            setEmail(email);
            setErrorEmail(false);
            console.log('EMAIL, valido');
        }
    };

    const validateUser = (user) => {
        if(testNumeric.test(user) || user.trim() === '') {
            console.log('USER, invalido');
            setInvalidData([...invalidData, 'user']);
            setErrorUser(true);
        }
        else {
            setUser(user);
            setErrorUser(false);
            console.log('USER, valido');
        }
    };

    const handleCloseMessageError = () => {
        setMessageFormWithoutData(false);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={(e) => handleProfileData(e, user)}>
                <label className="form-label">
                    Name
                    <input required className="form-label__input" type="text" name="name" onChange={(e)=> validateName(e.target.value)} />
                    {errorName && <Validation />}
                </label>
                <label className="form-label">
                    LastName
                    <input required className="form-label__input" type="text" name="lastName" onChange={(e)=> validateLastName(e.target.value)} />
                    {errorLastName && <Validation />}
                </label>
                <label className="form-label">
                    Company
                    <input required className="form-label__input" type="text" name="company" onChange={(e)=> validateCompany(e.target.value)} />
                    {errorCompany && <Validation />}
                </label>
                <label className="form-label">
                    Birthday's Date
                    <input required className="form-label__input" type="date" name="date" onChange={(e)=> validDateYear(e.target.value)} />
                    {errorDate && <Validation />}
                </label>
                <label className="form-label">
                    E-mail
                    <input required className="form-label__input" type="email" name="email" onChange={(e)=> validateEmail(e.target.value)} />
                    {errorEmail && <Validation />} 
                </label>
                <label className="form-label">
                    GitHub User
                    <input required className="form-label__input" type="text" name="user" onChange={(e)=> validateUser(e.target.value)} />
                    {errorUser && <Validation />}
                </label>
                <span></span>
                <input className="form-submit" type="submit" value="Search profile" />
            </form>
            {messageFormWithoutData &&
                <div className="form-message">
                    <div className="form-message__list">
                        <span>Fill correctly these categories</span>
                        <ul>
                            {!!invalidData.length && invalidData.map(data =>
                                <li>{data}</li> )
                            }
                        </ul>
                    </div>
                    <button className="form-message__close" onClick={handleCloseMessageError}>X</button>
                </div>
            }
        </div>
    );
};

export default Form;
