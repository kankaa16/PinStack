import axios from 'axios'
const apireq=axios.create({
    
      baseURL: import.meta.env.VITE_API_URL,
}) 
console.log("API BASE URL IS:", import.meta.env.VITE_API_URL);

export default apireq;