import axios from 'axios'
import {BASEURL} from "@/BASEURL/URL";

export const axiosInstance = axios.create({
    baseURL: BASEURL
    // baseURL: 'http://102.219.178.17:4000'
});


// axiosInstance.defaults.withCredentials = true;