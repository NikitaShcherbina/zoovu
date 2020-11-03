import Vue from 'vue'
import Vuex from 'vuex'
import Game from "@/views/Game";
import Home from "@/views/Home";
import vuex from "@/store/index";
import vuetify from 'vuetify'
import router from "@/router";

Vue.use(vuetify)
Vue.use(router)

Vue.use(Vuex)

const store = new Vuex.Store(vuex)

import { mount } from '@vue/test-utils'

test('Home', () => {
    const wrapper = mount(Home, {
        store,
        router
    })
})

test('Object List', () => {
    const wrapper = mount(Game, {
        store,
        router
    })
    const topObj = wrapper.vm.topObjects
    wrapper.setData({ topObjects: [ ...topObj, {id: 5}] })
    expect(wrapper.html())
    expect(wrapper.vm.topObjects).toEqual([ ...topObj, {id: 5}])
})

describe('lifecycle methods', () => {
    test('mounted assigns interval', () => {
        const wrapper = mount(Game, {
            store,
            router
        })
        expect(wrapper.vm.timer.start).not.toBe(undefined)
    })

    test('counter works', () => {
        jest.useFakeTimers()
        const wrapper = mount(Game, {
            store,
            router
        })
        expect(wrapper.vm.timer.count).toBe(0)
        wrapper.vm.startTimer()
        jest.advanceTimersByTime(1000)
        expect(wrapper.vm.timer.count).toBe(1)
    })

    test('store is loaded ', () => {
        const wrapper = mount(Home, {
            store,
            router
        })
        store.state.name = 'Alex'

        expect(wrapper.vm.$store.state.name).toEqual('Alex')
    })
})


