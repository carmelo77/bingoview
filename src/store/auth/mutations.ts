import type { MutationTree } from 'vuex';
import type { UserState } from './state';


const mutation: MutationTree<UserState> = {
    // someMutation( /* state: ExampleStateInterface */) {
    //     // a line to prevent linter errors
    // }

    SET_TOKEN(state: UserState, token) {
        state.token = token;
    },

    SET_USER(state: UserState, user) {
        state.user = user;
    }
}


export default mutation;