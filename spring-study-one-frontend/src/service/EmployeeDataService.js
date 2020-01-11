import API from '../utils/API'; 
import axios from 'axios';

class EmployeeDataService {
    
    async getAllEmployees() {
        return await API.get("/employees"); 
    }

    async deleteEmployeeById(employeeResource) {
        return await API.delete(employeeResource)
    }

    async getJSONSchemaDefinition(resource) {
        const options = {
            headers: {'Accept': 'application/schema+json'}
          };
        return axios.get(resource, options);
    }

    async getEmployeeById(id) {
        return await API.get(`/employees/${id}`)
    }

    async addEmployeeByResource(employee) {
        return API.post("/employees", employee);
    }

    async updateEmployeeByResource(id, employee) {
        return await API.put(`/employees/${id}`, employee)
    }
}

export default new EmployeeDataService() 