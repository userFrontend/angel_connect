import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getReq = (method) =>
  API.get(`/api/${method}`, {
    headers: { verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN" },
  });
  export const getPage = (method, filters = {}, page = 1) => {
    const params = new URLSearchParams();
    
    // Filtrlarni generatsiya qilish
    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        // Agar qiymat massiv bo'lsa, har bir qiymatni qo'shish
        filters[key].forEach((val) => params.append(key, val));
      } else if (filters[key] !== undefined && filters[key] !== null) {
        // Oddiy qiymatlarni qo'shish
        params.append(key, filters[key]);
      }
    }
    
    // Sahifa parametrini qo'shish
    params.append("page", page);
  
    // API so'rovi
    return API.get(`/api/${method}/filter?${params.toString()}`, { 
      headers: { verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN" },
    });
  };
  
export const getOneReq = (id, method) =>
  API.get(`/api/${method}/${id}`, {
    headers: { verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN" },
  });
export const getSimilar = (method, name) =>
  API.get(`/api/${method}s/similar?name=${name}`, {
    headers: { verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN" },
  });
export const getLocation = (name) =>
  API.get(`/api/cars/location?name=${name}`, {
    headers: { verificationtoken: "ulamYPMnafsAsJJXdSfqjZhasg23faSICreybtXN" },
  });
