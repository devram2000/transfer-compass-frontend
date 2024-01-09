import { getCookie } from "./cookie";

const API_URL = process.env.REACT_APP_API_URL;

const getHeaders = () => {
    const accessToken = getCookie("appToken");
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
    };
}

export const fetchSchoolsList = async (queryString, page, limit) => {
    const defaultHeaders = getHeaders();

    try {
        const response = await fetch(`${API_URL}/universities/search?query=${queryString}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: defaultHeaders
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        return data;
    } catch (ex) {
        return [];
    }
}

export const fetchSchoolInfo = async (schoolId) => {
    const defaultHeaders = getHeaders();

    try {
        const response = await fetch(`${API_URL}/universities/details/${schoolId}`, {
            method: 'GET',
            headers: defaultHeaders
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        return data;
    } catch (ex) {
        return null;
    }
}