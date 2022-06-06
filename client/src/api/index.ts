import axios from "axios";

class Api {
    BASE_URL: string = `${process.env.fetchURL}`;

    api = axios.create({
        baseURL: this.BASE_URL,
    })

    getMe(token: string) {
        return this.api.get(`${this.BASE_URL}users/me/`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
}

const API = new Api();

export default API;