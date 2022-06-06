import axios from "axios";

class Api {
    BASE_URL: string = `${process.env.fetchURL}`;

    api = axios.create({
        baseURL: this.BASE_URL,
    })

    getMe() {

    }
}

const API = new Api();

export default API;