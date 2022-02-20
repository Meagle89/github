import axios from 'axios';

const { REACT_APP_GITHUB_URL, REACT_APP_GITHUB_TOKEN } = process.env;

const github = axios.create({
  baseURL: REACT_APP_GITHUB_URL,
  headers: { Authorization: `${REACT_APP_GITHUB_TOKEN}` },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
