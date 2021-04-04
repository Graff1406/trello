import axios from 'axios'
const dir = 'https://trello-f87ab-default-rtdb.firebaseio.com/trello'

const state = {
  desks: []
}

const mutations = {
  SET_DESKS (state, desks) {
    state.desks = desks
  }
}

const actions = {
  async GET_DESKS ({ commit }) {
    try {
      const { data } = await axios.get(dir + '.json')
      let desks = []
      if (data) {
        // parsing FIREBASE data return
        desks = Object.keys(data).map(key => {
          return { ...data[key], id: key }
        })
      }
      commit('SET_DESKS', desks)
    } catch (err) {
      console.log(err)
    }
  },
  async CREATE_DESK ({ commit, dispatch }, desk) {
    const data = await axios.post(`${dir}.json`, desk)
    await dispatch('GET_DESKS')
  },
  async UPDATE_DESK ({ commit, dispatch }, desk) {
    const data = await axios.put(`${dir}/${desk.id}.json`, desk)
    await dispatch('GET_DESKS')
  },
  async DELETE_DESK ({ commit, dispatch }, id) {
    const data = await axios.delete(`${dir}/${id}.json`)
    await dispatch('GET_DESKS')
  }
}

export default {
  state,
  mutations,
  actions
}
