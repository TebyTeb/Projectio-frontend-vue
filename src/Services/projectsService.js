import axios from 'axios'
import {useAuthStore} from '../stores/authStore'

const store = useAuthStore()

const API = axios.create({
  baseURL: 'http://localhost:3030/api/projects'
})

async function getProjects () {
  try {
    const { data } = await API.get('', {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function createProject (project) {
  try {
    const { data } = await API.post('', project, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return {error: error.message}
  }
}

export default {
  getProjects,
  createProject
}