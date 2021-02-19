import React, { useContext } from 'react';
//Style
import './form.scss';
//Context
import { GithubContext } from '../../context/gitHubContext';

const Form = () => {

    const { setName, setLastName, setDate, setEmail, setUser } = useContext(GithubContext);
    return (
        <form className="form">
            <label className="form-label">
                Name
                <input required className="form-label__input" type="text" name="name" onChange={(e)=> setName(e.target.value)} />
            </label>
            <label className="form-label">
                LastName
                <input required className="form-label__input" type="text" name="lastName" onChange={(e)=> setLastName(e.target.value)} />
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
            <input className="form-submit" type="submit" value="Search profile" />
        </form>
    );
};

export default Form;
