<template>
  <v-app>
    <SideBar 
      :drawer="drawer"
      :loggedIn="loggedIn"
      :isAdmin="isAdmin"
      :isNormal="isNormal"
      :getUser="getUser"
      :isEmployee="isEmployee"
    />
    <AppBar 
      :nameApp="nameApp"
      @toggle-drawer="drawer = !drawer"
      :logoutSession="logoutSession"
      :loggedIn="loggedIn"
      :isAdmin="isAdmin"
      :isNormal="isNormal"
    />
    <v-main app>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app color="grey-darken-3" dark>
      <strong class="footer-info">
        <span>
          &copy; {{ nameApp }}
        </span>
        <span>
          Nit: {{ nitApp }}
        </span>
        <span>
          Contacto: {{ whatsAppContact }}
        </span>
      </strong>
    </v-footer>
  </v-app>
</template>

<script lang="ts">

import { defineComponent, computed, ref } from 'vue';

//Components
import SideBar from './layouts/SideBar/SideBar.vue';
import AppBar from './layouts/AppBar/AppBar.vue';
import { useAuth } from './composables';

export default defineComponent({
  name: 'App',
  components: { SideBar, AppBar },
  setup() {

    const { logout, autologin, getUser } = useAuth();

    const nameApp = "BINGOS POC-COL LITOGRAFIA";
    const nitApp = "1061734032-9";
    const whatsAppContact = "3245101905-3215234185"

    const initFunction = async () => {
      await autologin();
    }

    initFunction();

    const loggedIn = computed( () => getUser.value );
    const isAdmin = computed( () => getUser.value && getUser.value.role == 2 );
    const isNormal = computed( () => getUser.value && getUser.value.role == 1 );
    const isEmployee = computed( () => getUser.value && getUser.value.role == 3 );

    const logoutSession = () => {
      logout();
    }
    
    return {
      drawer: ref(true),
      logoutSession,
      nameApp,
      nitApp,
      whatsAppContact,
      loggedIn,
      isAdmin,
      isNormal,
      isEmployee,
      getUser,
    }
  }
});

</script>

<style scoped>
  .logo {
    width: 7rem;
    border-radius: 12px;
  }

  .footer-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
</style>