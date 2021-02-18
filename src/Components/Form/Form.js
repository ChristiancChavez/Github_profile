import React from 'react';

const Form = () => {
    return (
        <form>
            <label>
                Name
                <input type="text" name="name" />
            </label>
            <label>
                E-mail
                <input type="text" name="e-mail" />
            </label>
            <label>
                Date
                <input type="Date" name="date" />
            </label>
            <label>
                Name
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Search profile" />
        </form>
    );
};

export default Form;
