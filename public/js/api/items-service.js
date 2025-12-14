import { http } from './http.js';

class ItemsService{
    async getAll(filters = {}){
        return await http.get('/courses', filters);
    }

    async getById(id){
        const result = await http.get(`/courses/${id}`);
        return result.items;
    }

    async createEnrollment(data){
        return await http.post('/enrollments', data);
    }
}

export const itemsService = new ItemsService();