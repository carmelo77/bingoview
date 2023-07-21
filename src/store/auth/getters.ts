import type { GetterTree } from 'vuex';
import type { UserState } from './state';
import type { StateInterface } from '../index';


const getters: GetterTree<UserState, StateInterface> = {
    getToken( state  ) {
        return state.token;
    },

    getUser(  state  ) {
        return state.user;
    }
}



export default getters;