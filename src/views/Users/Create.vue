<template>
  <v-container>
    <h3>Crear nuevo usuario</h3>
    <v-form @submit.prevent="submitForm" class="mt-10">
      <v-row>
        <v-col cols="6">
          <v-label for="name">Nombre</v-label>
          <v-text-field type="text" v-model="form.name"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-label for="lastname">Apellido</v-label>
          <v-text-field type="text" v-model="form.lastname"></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-label for="email">Email</v-label>
          <v-text-field type="email" v-model="form.email"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-label for="phone">Teléfono</v-label>
          <v-text-field type="text" v-model="form.phone"></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-label for="document">Documento</v-label>
          <v-text-field type="text" v-model="form.document"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-label for="password">Password</v-label>
          <v-text-field type="password" v-model="form.password"></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-label for="phone">Desde cartón Número: </v-label>
          <v-text-field type="text" v-model="form.from"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-label for="phone">Hasta cartón Número: </v-label>
          <v-text-field type="text" v-model="form.to"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-select
            v-model="form.role_id"
            :items="roles"
            label="Seleccione un rol"
            item-value="id"
            item-title="name"
          >
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="success">Enviar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
    
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Swal from "sweetalert2";
import api from "@/api/api";
import { useAuth } from "@/composables";
import { useRouter } from "vue-router";

interface IRole {
  id: number;
  name: string;
}

interface IFormMatch {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  document: string;
  password: string;
  from?: number | null;
  to?: number | null;
  role_id: number | null;
}

export default defineComponent({
  setup() {
    const formIsValid = ref(false);
    const roles = ref<IRole[]>([]);
    const isCreateForm = ref(true);

    const form = ref<IFormMatch>({
      name: "",
      lastname: "",
      email: "",
      phone: "",
      document: "",
      password: "",
      from: null,
      to: null,
      role_id: null,
    });

    const { getToken } = useAuth();
    const router = useRouter();

    const getRoles = async () => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get(`users/roles`, {
          headers,
        });
        roles.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    const getUserId = async (id: number) => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get(`users/one?id=${id}`, {
          headers,
        });
        
        form.value.name = response.data.name;
        form.value.lastname = response.data.lastname;
        form.value.email = response.data.email;
        form.value.phone = response.data.phone;
        form.value.document = response.data.document;
        form.value.role_id = response.data.role.id;
        form.value.from = response.data.from;
        form.value.to = response.data.to;
      } catch (err) {
        console.log(err);
      }
    };

    const submitForm = async () => {
      // onValidate(form.value);

      let headers = { Authorization: getToken.value };

      if(form.value.from && form.value.to) {
        if(Number(form.value.from) > Number(form.value.to)) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "El campo desde no puede ser mayor.",
          });
          return;
        }
      }

      if (isCreateForm.value) {
        await createUser(headers);
      } else {
        await updateUser(headers, +router.currentRoute.value.params.id);
      }
    };

    const createUser = async (headers: Record<string, string>) => {
      try {
        const response = await api.post(`users`, form.value, {
          headers,
        });

        Swal.fire({
          icon: "success",
          title: "Éxito!",
          text: "Usuario guardado correctamente.",
        });
        router.push({ name: "Users" });
      } catch (err) {
        console.log(err);
      }
    };

    const updateUser = async (headers: Record<string, string>, id: number) => {
      try {
        const response = await api.put(`users/update/${id}`, form.value, {
          headers,
        });

        Swal.fire({
          icon: "success",
          title: "Éxito!",
          text: "Usuario modificado correctamente.",
        });
        router.push({ name: "Users" });
      } catch (err) {
        console.log(err);
      }
    };

    //   const onValidate = (form: IFormMatch) => {
    //       if(form.name == "") {
    //           Swal.fire({
    //               icon: 'error',
    //               title: 'Error!',
    //               text: 'No has especificado ningún nombre de partida.',
    //           });
    //           return false;
    //       }

    //       if(form.date_match == "") {
    //           Swal.fire({
    //               icon: 'error',
    //               title: 'Error!',
    //               text: 'no has especificado ninguna fecha de partida.',
    //           });
    //           return false;
    //       }

    //       if(!form.type_card_winner_id) {
    //           Swal.fire({
    //               icon: 'error',
    //               title: 'Error!',
    //               text: 'No has especificado la forma de ganar para esta partida.',
    //           });
    //           return false;
    //       }

    //       return true;
    //   }

    onMounted(() => {
      getRoles();

      if (router.currentRoute.value.params.id) {
        isCreateForm.value = false;
        getUserId(+router.currentRoute.value.params.id);
      }
    });

    return {
      formIsValid,
      submitForm,
      form,
      roles,
    };
  },
});
</script>