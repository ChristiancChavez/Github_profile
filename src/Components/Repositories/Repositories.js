import React, { useContext } from 'react';
//Components
import Repository from '.././Repository';
//Context
import { GithubContext } from '../../context/gitHubContext';
//Styles 
import './repositories.scss';
//Dependencies
import axios from 'axios';


const Repositories = () => {

    const { repos, numRepos, user, reposPerPage, setRepos } = useContext(GithubContext);
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    const tabsNumberRepos = range(1, numRepos, 1);

    const handlePageRepos = async (tabNumberRepos) => {
        const tabNumberReposString = tabNumberRepos.toString();
        try {
            const fetchPageRepo =  await axios.get(`https://api.github.com/users/${user}/repos?page=${tabNumberReposString}&per_page=${reposPerPage}`);
            setRepos(fetchPageRepo.data);
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <div className="repositories">
            <h3>Currently Repositories</h3>
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
                <button className="repositories-tabs__tab" onClick={() => handlePageRepos(tabsNumberRepos[0])}>Start</button>
                {tabsNumberRepos.map(tabNumberRepos => 
                    <button className="repositories-tabs__tab" onClick={() => handlePageRepos(tabNumberRepos)} key={tabNumberRepos}>{tabNumberRepos}</button>   
                )}
                <button className="repositories-tabs__tab" onClick={() => handlePageRepos((tabsNumberRepos.length) -1)}>End</button>
            </div>
        </div>
    );
};

export default Repositories;
