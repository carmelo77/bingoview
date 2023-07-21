<template>
  <v-main class="d-flex justify-center">
    <v-col class="background-2" >
        <div class="text-white text-center">
            <h2 class="welcome-text">
                INGRESO A SISTEMA - BINGOS POC-COL
            </h2>
        </div>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="6">
      <v-card class="border black">
        <v-toolbar dark color="black">
          <v-toolbar-title> Acceso al sistema </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            autofocus
            type="email"
            v-model="form.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="form.password"
            label="Password"
            required
          ></v-text-field>
          <v-col class="text-error" v-if="error">{{ error }}</v-col>
        </v-card-text>
        <v-card-actions class="px-3 pb-3">
          <v-col>
            <v-btn
              @click.prevent="signin()"
              elevation="4"
              color="indigo-darken-3"
              variant="flat"
              class="px-4"
            >
              Ingresar
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-main>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import api from "@/api/api";
import { useAuth } from "@/composables";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginView",
  setup() {
    const { setToken, getUser } = useAuth();
    const router = useRouter();

    onMounted(() => {
      if (getUser.value) {
        router.push({ name: "Home" });
      }
    });

    const error = ref(null);
    const form = ref({
      email: "",
      password: "",
    });

    const signin = () => {
      api
        .post("users/login", form.value)
        .then((response: any) => {
          setToken(response.data.token);
          router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err.response);
          error.value = err.response.data.message;
        });
    };

    return {
      form,
      error,
      signin,
    };
  },
});
</script>

<style scoped>
.background-2 {
  background-image: url("../../assets/background2.jpg");
  width: 100%;
  height: 80vh;
  background-size: cover;
  border-radius: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-container {
    display: flex;
    color: #FFF;
    align-items: center;
    border: 2px solid;
    text-align: center;
}

.welcome-text {
    text-align: center;
}
.text-error {
  color: #ff0000;
}
</style>