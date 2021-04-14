import axios from 'axios'
import { GET_DESKS, CREATE_DESK, UPDATE_DESK, DELETE_DESK } from './actionNames'
import { SET_DESKS } from './mutationNames'

axios.defaults.baseURL = 'https://trello-f87ab-default-rtdb.firebaseio.com/trello'

axios.interceptors.response.use(response => {
  if (response.config.method === 'get') {
    response.data = Object.keys(response.data)
      .map(key => ({ ...response.data[key], id: key }))
  }
  return response
}, error => Promise.reject(error))

const state = {
  desks: []
}

const mutations = {
  [SET_DESKS] (state, desks) {
    state.desks = desks
  }
}

const actions = {
  async [GET_DESKS] ({ commit }) {
    const { data } = await query()
    commit('SET_DESKS', data)
  },
  async [CREATE_DESK] ({ dispatch }, desk) {
    await query('post', desk)
    await dispatch('GET_DESKS')
  },
  async [UPDATE_DESK] ({ dispatch }, desk) {
    await query('put', desk, `/${desk.id}`)
    await dispatch('GET_DESKS')
  },
  async [DELETE_DESK] ({ dispatch }, id) {
    await query('delete', undefined, `/${id}`)
    await dispatch('GET_DESKS')
  }
}

async function query (method = 'get', data, endpoint = '') {
  try {
    return await axios[method](`${endpoint}.json`, data)
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  state,
  mutations,
  actions
}
