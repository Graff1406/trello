import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import DragAndDrop from '@/components/column/DragAndDrop'

describe('Home.vue', () => {
  let wrapper
  const deals = [{ id: 1 }]
  beforeEach(() => {
    wrapper = mount(DragAndDrop, {
      vuetify: new Vuetify(),
      propsData: {
        deals
      }
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('would be default deals', () => {
    expect(wrapper.vm.deals).toEqual(deals)
  })
  it('would be data list equal default deals', () => {
    expect(wrapper.vm.list).toEqual(deals)
  })
})
