import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const store = useAuthStore()

const API = axios.create({
  baseURL: 'http://localhost:3030/api/tasks'
})

async function getTasks(params) {
  try {
    const { data } = await API.get('', {
      headers: {
        token: store.getToken
      },
      params
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function createTask(taskData) {
  try {
    const { data } = await API.post('', taskData, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function editTask(id, newData) {
  try {
    const { data } = await API.put(`/${id}`, newData, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function deleteTask(id) {
  try {
    const { data } = await API.delete(`/${id}`, {
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
  getTasks,
  createTask,
  editTask,
  deleteTask
}
