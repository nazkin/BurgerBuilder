import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://burgabuilda.firebaseio.com/"
});

export default axiosInstance;