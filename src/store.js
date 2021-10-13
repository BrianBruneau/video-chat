import Vue from 'vue';
import Vuex from 'vuex';
import { STATUS_OPTIONS } from './utils/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: undefined, // Currrent room
    username: undefined, // Username
    status: STATUS_OPTIONS.available, // User status
    rooms: [], // Available rooms in the whole chat
  },
  mutations: {
    // Mutation per action (joinRoom, changeRoom, setRooms, leaveChat, chnangStatus)
  },
  actions: {
    // Here we define all the actions that will get triggered when:
    // joinRoom, changeRoom, setRooms, leaveChat, changeStatus
  },
  modules: {
  },
});
