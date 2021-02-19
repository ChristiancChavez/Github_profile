import React from 'react';
//Style
import './repository.scss';

const Repository = ({ name, id, created, url }) => {

     return (
        <tr className="repository">
            <td className="repository__info">{id}</td>
            <td className="repository__info">{name}</td>
            <td className="repository__info">
                <a className="repository__info__url" href={url} target="blank">{url}</a>
            </td>
            <td className="repository__info">{created}</td>
        </tr>
    );
};

export default Repository;
