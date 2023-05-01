import axios from 'axios'

const API = axios.create({
  baseURL: 'https://projectio-api.onrender.com/api'
})

async function login (loginData) {
  try {
    const { data } = await API.post('/auth/login', loginData)
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function signup (signupData) {
  try {
    const { data } = await API.post('/auth/signup', signupData)
    return data
  } catch (error) {
    return {error: error.message }
  }
}

async function getProfile (token) {
  try {
    const data = await API.get('/profile', {
      headers: {
        token
      }
    })
    return data
  } catch (error) {
    return {error: error.message}
  }
}

export default {
  login,
  signup,
  getProfile
}