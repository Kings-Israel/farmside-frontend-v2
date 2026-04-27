import axios from "axios";

export const http = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? 'http://admin.farmside.test/api' : 'https://farmside.kingsisrael.com/api'
})