import React from 'react';
//Style
import './form.scss';

const Form = () => {
    return (
        <form className="form">
            <label className="form-label">
                Name
                <input required className="form-label__input" type="text" name="name" />
            </label>
            <label className="form-label">
                LastName
                <input required className="form-label__input" type="text" name="lastName" />
            </label>
            <label className="form-label">
                Id
                <input required className="form-label__input" type="text" name="id" />
            </label>
            <label className="form-label">
                Birthday's Date
                <input required className="form-label__input" type="Date" name="date" />
            </label>
            <label className="form-label">
                E-mail
                <input required className="form-label__input" type="text" name="e-mail" />
            </label>
            <label className="form-label">
                GitHub User
                <input required className="form-label__input" type="text" name="user" />
            </label>
            <input className="form-submit" type="submit" value="Search profile" />
        </form>
    );
};

export default Form;
