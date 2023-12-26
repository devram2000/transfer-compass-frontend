import { getCookie } from "./cookie";
import mockData from "./data.json";
import SingleData from "./school.json";

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

    console.log(">>>");
    return mockData;

    // try {
    //     const response = await fetch(`/api/universities/search?query=${queryString}&page=${page}&limit=${limit}`, {
    //         method: 'GET',
    //         headers: defaultHeaders
    //     });
    //     const data = await response.json();
    //     if (!response.ok) {
    //         throw new Error(data.error);
    //     }
    //     return data;
    // } catch (ex) {
    //     return [];
    // }
}

export const fetchSchoolInfo = async (schoolId) => {
    const defaultHeaders = getHeaders();

    return SingleData;
    // try {
    //     const response = await fetch(`/api/universities/details/${schoolId}`, {
    //         method: 'GET',
    //         headers: defaultHeaders
    //     });
    //     const data = await response.json();
    //     if (!response.ok) {
    //         throw new Error(data.error);
    //     }
    //     return data;
    // } catch (ex) {
    //     return null;
    // }
}