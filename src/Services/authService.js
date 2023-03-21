import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3030/api'
})

async function login (loginData) {
  try {
    const { data } = await API.post('/auth/login', loginData)
    return data
  } catch (error) {
    return { error: error.message }
  }
}

export default {
  login
}