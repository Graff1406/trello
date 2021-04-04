import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Column from '@/components/column/Column'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home.vue', () => {
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
            DELETE_DESK ({ commit }) {
              commit('SET_DESKS', [])
            },
            UPDATE_DESK ({ commit }) {
              commit('SET_DESKS', [{
                id: 1,
                title: 'test-2'
              }])
            }
          }
        }
      }
    })
    wrapper = mount(Column, {
      stubs: {
        ColumnTask: true
      },
      store,
      localVue,
      vuetify: new Vuetify()
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('Has btn', () => {
    expect(wrapper.text()).toMatch('Add another card')
  })
})
