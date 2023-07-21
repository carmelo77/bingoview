import type { Module } from 'vuex';
import type { StateInterface } from '../index';

import state, { type ExampleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';


const placesModule: Module<ExampleStateInterface, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}


export default placesModule;