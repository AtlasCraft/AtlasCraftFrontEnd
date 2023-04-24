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
  // baseURL: 'https://urchin-app-zt4cv.ondigitalocean.app/api',
  baseURL: 'https://jaszheng.me/api',
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

// Map Editing info
export const createMapEditingInfo = (payload) =>
  api.post('/mapeditinginfo', payload);
export const deleteMapEditingInfo = (payload) =>
  api.delete('/mapeditinginfo', payload);
export const getMapEditingInfoById = (id) => api.get(`/mapeditinginfo/${id}`);
export const updateMapEditingInfoById = (id, payload) =>
  api.post(`/mapeditinginfo/${id}`, payload);

// Map Cards
export const getAllMapCards = ()=>api.get(`/mapcard`);
export const updateCardLikes = (id)=>api.post(`/mapcard/${id}/likes`);
export const updateCardDislikes = (id)=>api.post(`/mapcard/${id}/dislikes`);

// Auth
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload);
export const logoutUser = () => api.get(`/logout/`);
export const getSecurityQuestions = () => api.get('/sq/:username');
export const forgotPassword = (payload) => api.post('/forgotPassword', payload);
export const changePassword = (payload) => api.post('/changePassword', payload);
export const comment = (payload) => api.post('/comment', payload);

const apis = {
  //map editing info
  createMapEditingInfo,
  deleteMapEditingInfo,
  getMapEditingInfoById,
  updateMapEditingInfoById,
  //map cards
  getAllMapCards,
  updateCardDislikes,
  updateCardLikes,
  //auth
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  getSecurityQuestions,
  forgotPassword,
  changePassword,
  comment
};

export default apis;
