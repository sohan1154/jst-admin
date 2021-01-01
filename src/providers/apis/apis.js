import axios from 'axios';
import * as GlobalProvider from '../globals/globals';

// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'http://3.135.18.102:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function updateHeaders() {
    let token = GlobalProvider.getToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
}

function readError(error) {
    console.log('error:::', error)

    let message;
    let errorMsg = error;

    if (typeof errorMsg === 'undefined') {
        message = "Something went wrong, Please try again.";
    }
    else if (typeof errorMsg === 'object') {

        if (typeof errorMsg.message !== 'undefined') {
            message = errorMsg.message;
        }
        else if (typeof errorMsg.error !== 'undefined') {
            message = errorMsg.error;
        }
        else {
            message = "Something went wrong, please try again.";
        }
    }
    else {
        message = errorMsg;
    }

    return message;
}

function readResponse(response) {
    console.log('response::::', response.data);
    return response.data;
}

// Login 
export const login = (params) => {
    return axios.post(`/login`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Settings 
export const updateAccount = (params) => {
    updateHeaders();
    return axios.post(`/settings/update-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getAccountDetail = (id) => {
    updateHeaders();
    return axios.get(`/settings/detail-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePassword = (params) => {
    updateHeaders();
    return axios.post(`/settings/change-password`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Users 
export const getUsers = (role) => {
    updateHeaders();
    return axios.get(`/users/list/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getArchiveUsers = (role) => {
    updateHeaders();
    return axios.get(`/users/archive/${role}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const createUserAccount = (params) => {
    updateHeaders();
    return axios.post(`/users/create-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const updateUserAccount = (params) => {
    updateHeaders();
    return axios.post(`/users/update-account`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getUserAccountDetail = (id) => {
    updateHeaders();
    return axios.get(`/users/detail-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deleteUserAccount = (id) => {
    updateHeaders();
    return axios.put(`/users/delete-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const restoreUserAccount = (id) => {
    updateHeaders();
    return axios.put(`/users/restore-account/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeUserAccountStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/users/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changeUserPassword = (params) => {
    updateHeaders();
    return axios.post(`/users/change-password`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Pages 
export const getPages = () => {
    updateHeaders();
    return axios.get(`/pages/list`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getArchivePages = () => {
    updateHeaders();
    return axios.get(`/pages/archive`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const createPage = (params) => {
    updateHeaders();
    return axios.post(`/pages/create`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const updatePage = (params) => {
    updateHeaders();
    return axios.post(`/pages/update`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getPageDetail = (id) => {
    updateHeaders();
    return axios.get(`/pages/detail/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deletePage = (id) => {
    updateHeaders();
    return axios.put(`/pages/delete/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const restorePage = (id) => {
    updateHeaders();
    return axios.put(`/pages/restore/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePageStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/pages/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Contact-Us
export const getContactUs = () => {
    updateHeaders();
    return axios.get(`/contact-us/list`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getContactUsDetail = (id) => {
    updateHeaders();
    return axios.get(`/contact-us/detail/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

// Plans 
export const getPlans = (role) => {
    updateHeaders();
    return axios.get(`/plans/list`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getArchivePlans = (role) => {
    updateHeaders();
    return axios.get(`/plans/archive`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const createPlan = (params) => {
    updateHeaders();
    return axios.post(`/plans/create-plan`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const updatePlan = (params) => {
    updateHeaders();
    return axios.post(`/plans/update-plan`, params).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const getPlanDetail = (id) => {
    updateHeaders();
    return axios.get(`/plans/detail-plan/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const deletePlan = (id) => {
    updateHeaders();
    return axios.put(`/plans/delete-plan/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const restorePlan = (id) => {
    updateHeaders();
    return axios.put(`/plans/restore-plan/${id}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

export const changePlanStatus = (id, status) => {
    updateHeaders();
    return axios.put(`/plans/change-status/${id}/${status}`).then(response => readResponse(response)).catch(error => { throw readError(error); });
}

