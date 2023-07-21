import type { ActionTree } from 'vuex';
import type { UserState } from './state';
import type { StateInterface } from '../index';
import { app } from '@/main';

import decode from 'jwt-decode';
import { useRouter } from 'vue-router';


const actions: ActionTree<UserState, StateInterface> = {
    // someAction( /*{ commit }, payload  */ ) {
    //     // a line to prevent linter errors
    // },

    token({ commit }, token) {
        commit("SET_TOKEN", token);
        commit("SET_USER", decode(token));
        localStorage.setItem("token", token);
    },

    autologin({ commit }) {
        const token = localStorage.getItem("token");
        const router = useRouter();
		
		if(token) {
			const resultdecode: any = decode(token);
			const currentTime = Math.floor(Date.now() / 1000);

			if (resultdecode.exp < currentTime) {
				commit("SET_TOKEN", null);
				commit("SET_USER", null);
				localStorage.removeItem("token");

				// window.location.href = '/login';
                router.push({name: "Login"});
			}

  			commit("SET_TOKEN", token);
  			commit("SET_USER", decode(token));
		} else {
            commit("SET_TOKEN", null);
			commit("SET_USER", null);
			localStorage.removeItem("token");
            router.push({name: "Login"});
        }

        
    },

    logout({ commit }) {
        app.config.globalProperties.$router.push({ name: "Login" });

        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        localStorage.removeItem("token");
    }
}



export default actions;