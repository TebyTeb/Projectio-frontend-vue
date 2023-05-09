import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const store = useAuthStore()

const API = axios.create({
  baseURL: 'http://localhost:3030/api/lists'
})

async function getProjectLists(params) {
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

export default {
  getProjectLists
}