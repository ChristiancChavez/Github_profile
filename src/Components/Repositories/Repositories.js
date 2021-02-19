import React, { useContext } from 'react';
//Components
import Repository from '.././Repository';
//Context
import { GithubContext } from '../../context/gitHubContext';
//Styles 
import './repositories.scss';


const Repositories = () => {

    const { repos, numRepos } = useContext(GithubContext);
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    const tabsNumberRepos = range(1, numRepos, 1);
    

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
            <div className="repositories-tabs">
                <button className="repositories-tabs__tab" >Start</button>
                {tabsNumberRepos.map(tabNumberRepos => 
                    <button className="repositories-tabs__tab">{tabNumberRepos}</button>   
                )}
                <button className="repositories-tabs__tab">End</button>
            </div>
        </div>
    );
};

export default Repositories;
