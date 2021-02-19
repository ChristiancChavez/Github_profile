import React, { useContext } from 'react';
//Components
import Repository from '.././Repository';
//Context
import { GithubContext } from '../../context/gitHubContext';


const Repositories = () => {

    const { repos } = useContext(GithubContext);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Created</th>
                        <th>Watchers</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map(repo => 
                        <Repository
                            name={repo.name}
                            id={repo.id}
                            watchers={repo.watchers_count}
                            created={repo.created_at}
                            url={repo.html_url}
                        />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Repositories;
