import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const store = useAuthStore()

const API = axios.create({
  baseURL: 'https://projectio-api.onrender.com/api/projects/'
})

async function getProjects() {
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

async function getProjectById(id) {
  try {
    const { data } = await API.get(id, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function createProject(project) {
  try {
    const { data } = await API.post('', project, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function editProject(id, newData) {
  try {
    const { data } = await API.put(id, newData, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function deleteProject(id) {
  try {
    const { data } = await API.delete(id, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

export default {
  getProjects,
  getProjectById,
  createProject,
  editProject,
  deleteProject
}
