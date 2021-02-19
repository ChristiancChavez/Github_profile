import React, { useContext } from 'react';
//Components
import Repository from '.././Repository';
//Context
import { GithubContext } from '../../context/gitHubContext';
//Styles 
import './repositories.scss';


const Repositories = () => {

    const { repos } = useContext(GithubContext);

    return (
        <div className="repositories">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map(repo => 
                        <Repository
                            key={repo.id}
                            name={repo.name}
                            id={repo.id}
                            created={repo.created_at}
                            url={repo.html_url}
                        />
                        )
                    }
                </tbody>
            </table>
            <div>
                <button>Start</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>End</button>
            </div>
        </div>
    );
};

export default Repositories;
