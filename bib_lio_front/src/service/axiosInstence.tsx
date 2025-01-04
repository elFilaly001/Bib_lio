import axios from "axios";



const axiosInstance = axios.create({
    baseURL: "https://6h6acg3091.execute-api.eu-central-1.amazonaws.com/dev/books",
});




export default axiosInstance