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

    const { setName, setLastName, setDate, setEmail, setUser, setCompany, user, setProfile, setShowProfile } = useContext(GithubContext);
    const [messageFormWithoutData, setMessageFormWithoutData] = useState(false);
    const [invalidData, setInvalidData] = useState([]);
    const [errorName, setErrorName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [errorCompany, setErrorCompany] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const testNumeric = /^[0-9]+$/;
    const [nameForm, setNameForm] = useState('');
    const [lastNameForm, setLastNameForm] = useState('');
    const [dateForm, setDateForm] = useState('');
    const [userForm, setUserForm] = useState('');
    const [emailForm, setEmailForm] = useState('');
    const [companyForm, setCompanyForm] = useState('');

    const cleanFields = () => {
        setDateForm('');
        setNameForm('');
        setCompanyForm('');
        setEmailForm('');
        setUserForm('');
        setLastNameForm('');
    }; 

    const handleProfileData = async (e, user) => {
        e.preventDefault();
        if(!(errorName || errorCompany || errorEmail || errorDate || errorUser || errorLastName)) {
            try {
                const fetchUserGithub =  await axios.get(`https://api.github.com/users/${user}`);
                setProfile(fetchUserGithub.data);
                setShowProfile(true);
                setMessageFormWithoutData(false);
                cleanFields();
                console.log('VALIDOS CAMPOS');
            } catch (error) {
                console.log(error);
            }
        } else {
            setMessageFormWithoutData(true);
            console.log('INVALIDOS CAMPOS');
        }
    };

    const validationField = (data, text, setDataError, setData,  setDataForm) => {
        console.log(text);
        switch(text) {
            
            case 'email':
                const regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(data);
                setDataForm(data);
                if( data.trim() === '' || !regexEmail) {
                    setInvalidData([...invalidData, text]);
                    setDataError(true);
                } else {
                    setData(data);
                    setDataError(false);
                    setInvalidData([...invalidData]);
                }
                break;
            case 'year':
                setDataForm(data);
                const getToday = new Date();
                const currentYear = data.split('-');
                const yearNumber = Number(currentYear[0]);
                const yearString = currentYear[0].split('');
                if(data !== getToday && yearNumber < 2005 && yearString.length === 4 && data.trim() !== ''){
                    setData(data);
                    setDataError(false);
                    setDataForm(data);
                    setInvalidData([...invalidData]);
                } else {
                    setInvalidData([...invalidData, `Birthday's date`]);
                    setDataError(true);
                }
                break;
            case 'name': 
            case 'lastName': 
            case 'company':
            case 'user':
                setDataForm(data);
                if(testNumeric.test(data) || data.trim() === '') {
                    setInvalidData([...invalidData, text]);
                    setDataError(true);
                }
                else {
                    setData(data);
                    setDataForm(data);
                    setDataError(false);
                    setInvalidData([...invalidData]);
                }
                break;
            default:
                    return ''
        }
    }

    const handleCloseMessageError = () => {
        setMessageFormWithoutData(false);
    };

    const filterRepeatErrors = invalidData.filter((data, index) => {
        return invalidData.indexOf(data) === index;
    });

    return (
        <div className="form-container">
            <form noValidate className="form" onSubmit={(e) => handleProfileData(e, user)}>
                <label className="form-label">
                    Name
                    <input required className="form-label__input" type="text" name="name" value={nameForm} onChange={(e)=> validationField(e.target.value, 'name', setErrorName, setName, setNameForm )} />
                    {errorName && <Validation />}
                </label>
                <label className="form-label">
                    LastName
                    <input required className="form-label__input" type="text" name="lastName" value={lastNameForm} onChange={(e)=> validationField(e.target.value, 'lastName', setErrorLastName, setLastName, setLastNameForm)} />
                    {errorLastName && <Validation />}
                </label>
                <label className="form-label">
                    Company
                    <input required className="form-label__input" type="text" name="company" value={companyForm} onChange={(e)=> validationField(e.target.value, 'company', setErrorCompany, setCompany, setCompanyForm)} />
                    {errorCompany && <Validation />}
                </label>
                <label className="form-label">
                    Birthday's Date
                    <input required className="form-label__input" type="date" name="date" value={dateForm} onChange={(e)=> validationField(e.target.value, 'year', setErrorDate, setDate, setDateForm)} />
                    {errorDate && <Validation />}
                </label>
                <label className="form-label">
                    E-mail
                    <input required className="form-label__input" type="email" name="email" value={emailForm} onChange={(e)=> validationField(e.target.value, 'email', setErrorEmail, setEmail, setEmailForm)} />
                    {errorEmail && <Validation />} 
                </label>
                <label className="form-label">
                    GitHub User
                    <input required className="form-label__input" type="text" name="user" value={userForm} onChange={(e)=> validationField(e.target.value, 'user', setErrorUser, setUser, setUserForm)} />
                    {errorUser && <Validation />}
                </label>
                <span></span>
                <input className="form-submit" type="submit" value="Search profile" />
            </form>
            {messageFormWithoutData &&
                <div className="form-message">
                    <div className="form-message-content">
                        <div className="form-message-content__list">
                            <span>Fill correctly these fields</span>
                            <ul>
                                {!!invalidData.length && filterRepeatErrors.map(data =>
                                    <li key={data}>{data}</li> )
                                }
                            </ul>
                        </div>
                        <button className="form-message-content__close" onClick={handleCloseMessageError}>X</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Form;
