import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Home from '@/views/Home.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe.skip('Home.vue', () => {
  let wrapper, store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        home: {
          state: {
            desks: []
          },
          mutations: {
            SET_DESKS (state, desks) {
              state.desks = desks
            }
          },
          actions: {
            GET_DESKS ({ commit }) {
              commit('SET_DESKS', [{
                id: 1,
                title: 'test'
              }])
            }
          }
        }
      }
    })
    wrapper = mount(Home, {
      stubs: {
        Column: true
      },
      store,
      localVue,
      vuetify: new Vuetify()
    })
    store.dispatch('home/GET_DESKS')
  })
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('Has btn', () => {
    expect(wrapper.text()).toMatch('Add another list')
  })
  it('Set new desks', () => {
    expect(wrapper.vm.desks.length).toBeTruthy()
  })
})