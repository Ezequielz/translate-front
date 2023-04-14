import axios from 'axios'

const ApiTranslate = axios.create({
  // baseURL: 'http://localhost:4000/api'
  baseURL: 'https://translate-zmpv.onrender.com/api'
})

export default ApiTranslate
