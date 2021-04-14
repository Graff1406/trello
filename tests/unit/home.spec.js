import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Home from '@/views/Home.vue'
import Vuex from 'vuex'
import {
  GET_DESKS,
  CREATE_DESK
} from '@/store/modules/actionNames'
import { SET_DESKS } from '@/store/modules/mutationNames'

const localVue = createLocalVue()
localVue.use(Vuex)

describe.skip('Home.vue', () => {
  let wrapper, store, actions
  beforeEach(() => {
    actions = {
      [CREATE_DESK]: jest.fn().mockResolvedValue({ id: 1 }),
      [GET_DESKS]: jest.fn().mockResolvedValue({ id: 1, title: 'test' })
    }
    store = new Vuex.Store({
      modules: {
        home: {
          state: {
            desks: []
          },
          mutations: {
            [SET_DESKS] (state, desks) {
              state.desks = desks
            }
          },
          actions
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
  it('should be call action', async () => {
    await wrapper.find('#btn-add-desk').trigger('click')
    expect(actions.CREATE_DESK).toHaveBeenCalled()
  })
})
