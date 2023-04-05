/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'https://urchin-app-zt4cv.ondigitalocean.app/api',
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createTop5List = (payload) => api.post(`/top5list/`, payload);
export const getAllTop5Lists = (params) =>
  api.get(`/top5lists/`, { params: params });
export const getAllTop5ListsUser = (params) =>
  api.get(`/top5listsUser/`, { params: params });
export const getTop5ListPairs = () => api.get(`/top5listpairs/`);
export const updateTop5ListById = (id, payload) =>
  api.put(`/top5list/${id}`, payload);
export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`);
export const getTop5ListById = (id) => api.get(`/top5list/${id}`);

// Comments
export const createComment = (id, payload) =>
  api.post(`/top5list/${id}/comments`, payload);
export const incView = (id) => api.post(`/top5list/${id}/views`);
export const updateRating = (id, payload) =>
  api.post(`/top5list/${id}/rating`, payload);

// Community List
export const publishList = (id, payload) =>
  api.post(`/top5list/${id}/community`, payload);
export const getCommunityList = (params) =>
  api.get('/community', { params: params });
export const createCommentCommunity = (id, payload) =>
  api.post(`/community/${id}/comments`, payload);
export const incViewCommunity = (id) => api.post(`/community/${id}/views`);
export const updateRatingCommunity = (id, payload) =>
  api.post(`/community/${id}/rating`, payload);

// Auth
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload);
export const logoutUser = () => api.get(`/logout/`);

const apis = {
  createTop5List,
  getAllTop5Lists,
  getTop5ListPairs,
  updateTop5ListById,
  deleteTop5ListById,
  getTop5ListById,
  getAllTop5ListsUser,
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  createComment,
  incView,
  updateRating,
  publishList,
  getCommunityList,
  createCommentCommunity,
  incViewCommunity,
  updateRatingCommunity,
};

export default apis;
