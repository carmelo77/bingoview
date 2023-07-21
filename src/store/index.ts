import { createStore } from 'vuex';

// My custom modules
import authModule from './auth';
import type { UserState } from './auth/state';



export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  auth: UserState
}

export default createStore<StateInterface>({
  modules: {
    auth: authModule
  }
});