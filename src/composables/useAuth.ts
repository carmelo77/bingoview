import { computed } from "vue";
import { useStore } from "vuex"
import type { StateInterface } from "@/store";



export const useAuth = () => {

    const store = useStore<StateInterface>();

    return {
        //getters: 
        getToken: computed ( () => store.getters['auth/getToken'] ),
        getUser: computed ( () => store.getters['auth/getUser'] ),

        //actions
        logout: () => store.dispatch('auth/logout'),
        autologin: () => store.dispatch('auth/autologin'),
        setToken: ( token: string ) => store.dispatch('auth/token', token),
    }

}