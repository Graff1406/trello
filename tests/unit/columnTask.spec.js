import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import ColumnTask from '@/components/column/ColumnTask'

describe('Home.vue', () => {
  let wrapper
  const deal = { id: 1, title: 'task' }
  beforeEach(() => {
    wrapper = mount(ColumnTask, {
      vuetify: new Vuetify(),
      propsData: {
        deal
      },
      data () {
        return {
          dialog: true
        }
      }
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('would be default deals', () => {
    expect(wrapper.vm.deal).toEqual(deal)
  })
  it('would be render title', () => {
    expect(wrapper.vm.deal.title).toEqual(deal.title)
  })
  it('would be show dialog', () => {
    expect(wrapper.vm.dialog).toBeTruthy()
  })
  it('would be render dialog title', () => {
    expect(wrapper.html()).toMatch('Edit task')
  })
  it('would be render dialog title', async () => {
    await wrapper.find('#btn-close').trigger('click')
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})
