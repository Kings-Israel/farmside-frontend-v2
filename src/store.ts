import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state: {
        booking: null,
        message: null
    },
    mutations: {
        BOOKING_SENT(state: { booking: boolean }){
            state.booking = true
        },
        BOOKING_FAILED(state: { booking: boolean }){
            state.booking = false
        },
        MESSAGE_SENT(state: { message: boolean }){
            state.message = true
        },
        MESSAGE_FAILED(state: { message: boolean }){
            state.message = false
        }
    },
    actions: {
        async sendMessage({commit}: any, message: any){
            let response = await axios.post('/message', message)
            if(response.data.message == 'success'){
                commit('MESSAGE_SENT')
            } else {
                commit('MESSAGE_FAILED')
            }
        },
        async sendBooking({commit}: any, booking: any) {
            console.log('Booking')
            let response = await axios.post('/booking', booking)
            if(response.data.message == 'success'){
                commit('BOOKING_SENT')
            } else {
                commit('BOOKING_FAILED')
            }
        },
    },
    getters: {
        booking: (state: { booking: any }) => state.booking,
        message: (state: { message: any }) => state.message,
    }
})

export default store