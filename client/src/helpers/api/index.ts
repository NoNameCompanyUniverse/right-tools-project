import axios from "axios";

class Api {
    BASE_URL: string = `${process.env.fetchURL}`;
    USERS_URL: string = `users/`;
    PROJECTS_URL: string = `projects/`;

    api = axios.create({
        baseURL: this.BASE_URL,
    })

    getMe(token: string) {
        return this.api.get(`${this.USERS_URL}me/`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }


    getUsersAll(token: string) {
        return this.api.get(this.USERS_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }


    getUsers({token, limit = 5} : {token: string, limit?: number}) {
        return this.api.get(`${this.USERS_URL}?limit=${limit}`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data;
        })
    }

    getUser(token: string, id: number) {
        return this.api.get(`${this.USERS_URL}${id}/`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    putUser(token: string, id: number, data: any) {
        return this.api.put(`${this.USERS_URL}${id}/`, data, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    postUser(token: string, data: any) {
        return this.api.post(this.USERS_URL, data, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    deleteUser(token: string, id: number) {
        return this.api.delete(`${this.USERS_URL}${id}/`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    getProjects(token: string) {
        return this.api.get(this.PROJECTS_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    postProject(token: string, data: any) {
        return this.api.post(this.PROJECTS_URL, data, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    getProject(token: string, id: number) {
        return this.api.get(`${this.PROJECTS_URL + id}/`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    putProject(token: string, id: number, data: any) {
        return this.api.put(`${this.PROJECTS_URL + id}/`, data, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }

    deleteProject(token: string, id: number) {
        return this.api.delete(`${this.PROJECTS_URL + id}/`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }
}

const API = new Api();

export default API;