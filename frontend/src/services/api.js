import axios from "axios";

const API = axios.create({
    baseURL: "https://aifsd-ese-2.onrender.com/api"
});

export default API;