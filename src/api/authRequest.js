import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const sendVerication = (data) => {
    return API.post(`/api/auth/verification`, data, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN"}})
};

export const signUp = (formData) => API.post(`/api/auth/signup`, formData, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN"}})

export const login = (formData) => API.post(`/api/auth/login`, formData, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN"}})

export const withGoogle = (formData) => API.post(`/api/auth/googleAuth`, formData, {headers: {verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN"}})