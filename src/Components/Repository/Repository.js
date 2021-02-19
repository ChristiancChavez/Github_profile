import React from 'react';

const Repository = ({ name, id, watchers, created, url }) => {

     return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{url}</td>
            <td>{created}</td>
            <td>{watchers}</td>
        </tr>
    );
};

export default Repository;
