import { instance, protectedInstance } from "./instance";

const propertyServices = {
    getAllProperties: async () => {
        return instance.get('/get/all/properties')
    },
    addProperties: async ({ data }) => {
        return protectedInstance.post('/add/properties', data)
    },
    updateProperty: async ({ id, data }) => {
        return protectedInstance.put(`/update/property/${id}`, data)
    },
    deleteProperty: async (id) => {
        return protectedInstance.delete(`/delete/property/${id}`)
    }
}
export default propertyServices;