import axios from 'axios';

const axiosInstance = axios.create({
     baseURL:'http://localhost:5000/api/medicines',
     withCredentials:true
})

//Fetch Medicines
export const getMedicines = async () => {
    try {
        const response = await axiosInstance.get('/getMedicines');
        return response.data;
    } catch (error) {
        console.log("Error while fetching medicines:",error);
        throw error;
    }
}

//Search Medicine
export const searchMedicine = async (searchKey) => {
    try {
        const response = await axiosInstance.get(`/search?query=${searchKey}`);
        return response.data;
    } catch (error) {
        console.log("Error while searching the medicine:", error);
        throw error;
    }
}