import axios from "axios";

class Api {
    BASE_URL: string = `${process.env.fetchURL}`;
    USERS_URL: string = `users/`;
    PROJECTS_URL: string = `projects/`;
    SUBDIVISIONS_URL: string = 'subdivisions/';
    DOCUMENTS_URL: string = 'documents/';
    MINDMAP_URL: string = 'mind-maps/';
    KANBAN_URL: string = 'kanban-boards/';


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
    getProfileInfo(token: string) {
        return this.api.get(`${this.USERS_URL}me/profile/info/`, {
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
    getUsers({token, limit = 5}: { token: string, limit?: number }) {
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
    patchUserPhoto(token: string, id: number, photo: any) {
        let formData = new FormData();
        formData.append('photo', photo);
        this.api.patch(`${this.USERS_URL}${id}/photo/`, formData, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        });
    }
    patchUserBanner(token: string, id: number, banner: any) {
        let formData = new FormData();
        formData.append('photo', banner);
        this.api.patch(`${this.USERS_URL}${id}/banner/`, formData, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        });
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
    getProjectsAll(token: string) {
        return this.api.get(this.PROJECTS_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }
    getProjects({token, limit = 5}: { token: string, limit?: number }) {
        return this.api.get(`${this.PROJECTS_URL}?limit=${limit}`, {
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
    postParticipants(token: string, data: any, id: number) {
        return this.api.post(`${this.PROJECTS_URL}${id}/participants/`, data, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }
    deleteParticipants(token: string, id: number, data: any) {
        return this.api.delete(`${this.PROJECTS_URL}${id}/participants/`, {
            headers: {Authorization: `Bearer ${token}`},
            data: data,
        }).then(res => {
            return res.data
        })
    }
    patchProjectPicture(token: string, id: number, picture: any) {
        let formData = new FormData();
        formData.append('picture', picture);
        this.api.patch(`${this.PROJECTS_URL}${id}/picture/`, formData, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        });
    }
    getProject(token: string, id: number) {
        return this.api.get(`${this.PROJECTS_URL + id}/`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }
    getProjectParticipants(token: string, id: number) {
        return this.api.get(`${this.PROJECTS_URL + id}/participants/`, {
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
    getProfileProject(token: string, limit: number) {
        return this.api.get(`${this.USERS_URL}me/profile/projects/?limit=${limit}/`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    getProfileProjectAll(token: string) {
        return this.api.get(`${this.USERS_URL}me/profile/projects/`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    getSubdivisions(token: string) {
        return this.api.get(this.SUBDIVISIONS_URL, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            return res.data
        })
    }
    getDocuments(token: string, id: number) {
        return this.api.get(`${this.PROJECTS_URL + id}/${this.DOCUMENTS_URL}`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    deleteDocument(token: string, id: number) {
        return this.api.delete(`${this.DOCUMENTS_URL + id}`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    postDocument(token: string, id: number, data:any) {
        let formData = new FormData();
        formData.append('file', data);

        return this.api.post(`${this.PROJECTS_URL + id}/${this.DOCUMENTS_URL}`, formData,{
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    getMindMaps(token:string, id: number) {
        return this.api.get(`${this.PROJECTS_URL + id}/${this.MINDMAP_URL}`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    postMindMap(token:string, id: number, data:any) {
        return this.api.post(`${this.PROJECTS_URL + id}/${this.MINDMAP_URL}`, data,{
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    deleteMindMap(token:string, id: number){
        return this.api.delete(this.MINDMAP_URL + id + '/', {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    getKanbans(token:string, id: number) {
        return this.api.get(`${this.PROJECTS_URL + id}/${this.KANBAN_URL}`, {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    postKanBan(token:string, id: number, data:any) {
        return this.api.post(`${this.PROJECTS_URL + id}/${this.KANBAN_URL}`, data,{
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    deleteKanBan(token:string, id: number){
        return this.api.delete(this.KANBAN_URL + id + '/', {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }
    getBackgrounds(token: string) {
        return this.api.get('backgrounds/', {
            headers: {Authorization: `Bearer ${token}`,}
        }).then(res => {
            return res.data;
        })
    }

}

const API = new Api();

export default API;