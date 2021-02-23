//Dependencies
import axios from 'axios';

const urlRepo = 'https://api.github.com/users';
const reposPerPage = 10;

export const requestFirstPageRepos = async ( user ) => {
    try {
        return await axios.get(`${urlRepo}/${user}/repos?page=1&per_page=${reposPerPage}`);
    }
    catch (error) {
        console.log(error);
    }
};

export const requestPageRepos = async ( tabNumberReposString, user ) => {
    try {
        return await axios.get(`${urlRepo}/${user}/repos?page=${tabNumberReposString}&per_page=${reposPerPage}`);
    } catch (error) {
        console.log(error);
    }
};

export const requestProfile = async ( user) => {
    try {
    return await axios.get(`https://api.github.com/users/${user}`);
    } catch (error) {
        console.log(error);
    }
};