import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:44384/api/'
});

export default instance;