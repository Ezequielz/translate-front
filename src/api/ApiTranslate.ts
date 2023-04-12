import axios from "axios"

const ApiTranslate = axios.create({
    baseURL: 'http://localhost:4000/api'
})

export default ApiTranslate;