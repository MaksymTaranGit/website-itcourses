const BASE_URL = 'http://localhost:3004';

class HttpService {
    async get(endpoint, params = {}){
        try{
            const response = await axios.get(`${BASE_URL}${endpoint}`, {params});
            const total = response.headers['x-total-count'];
            return {
                items: response.data,
                total: total ? parseInt(total) : response.data.length
            };
        } catch(error){
            console.error(`GET error for ${endpoint}: `, error);
            throw error;
        }
    }

    async post(endpoint, data){
        try{
            const response = await axios.post(`${BASE_URL}${endpoint}`, data);
            return response.data;
        } catch(error){
            console.error(`POST error for ${endpoint}: `, error);
            throw error;
        }
    }
}

export const http = new HttpService();