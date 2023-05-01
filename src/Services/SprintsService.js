import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const store = useAuthStore()

const API = axios.create({
  baseURL: 'http://localhost:3030/api/sprints'
})

async function getProjectSprints(id) {
  try {
    const { data } = await API.get('', {
      headers: {
        token: store.getToken
      },
      params: {
        project: id
      }
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

async function createSprint(sprint) {
  try {
    const { data } = await API.post('', sprint, {
      headers: {
        token: store.getToken
      }
    })
    return data
  } catch (error) {
    return { error: error }
  }
}

async function editSprint(id, newData) {
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

export default {
  getProjectSprints,
  createSprint,
  editSprint
}
