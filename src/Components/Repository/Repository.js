import React from 'react';
//Style
import './repository.scss';

const Repository = ({ name, id, created, url }) => {

    const transformDate = created.split('-');
    const dateTransformed = `${transformDate[0]}-${transformDate[1]}`;

     return (
        <tr className="repository">
            <td className="repository__info">{id}</td>
            <td className="repository__info">{name}</td>
            <td className="repository__info">
                <a className="repository__info__url" href={url} target="blank">{url}</a>
            </td>
            <td className="repository__info">{dateTransformed}</td>
        </tr>
    );
};

export default Repository;
