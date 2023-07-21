<template>
    <v-container>
      <div class="titles-match">
        <h3>{{ tableTitle }}</h3>
        <v-btn color="primary" @click.prevent="goToCreate">Crear nuevo usuario</v-btn>
      </div>
      <br />
      <v-text-field v-model="search" label="Buscar" />
      <easy-data-table
        :headers="headers"
        :items="filteredUsers"
        theme-color="#f48225"
      >

        <template #item-role_id="item">
            <v-chip :color="item.role.id == 1 || item.role.id == 3 ? 'red' : 'green'">
                {{ item.role.id == 1 ? "Cliente" : item.role.id == 3 ? "Empleado" : "Administrador" }}
            </v-chip>
        </template>
        
        <template #item-options="item">
          <v-icon color="info" v-if="item.closed ? false : true" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </easy-data-table>
  
    </v-container>
  </template>
    
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue";
  import api from "@/api/api";
  import EasyDataTable from 'vue3-easy-data-table';
  import type { Header, Item } from "vue3-easy-data-table";
  import { useAuth } from "@/composables";
  import { useRouter } from "vue-router";
  import Swal from "sweetalert2";
  
  export default defineComponent({
    name: "UserView",
    components: {
      EasyDataTable
    },
    setup() {
      const { getToken } = useAuth();
  
      const tableTitle = ref("Lista de usuarios");
      const search = ref("");
      const users = ref<Item[]>([]);
  
      const router = useRouter();
  
      const headers: Header[] = [
        { 
          text: "Nombre", 
          value: "name", 
          sortable: true
        },
        { 
          text: "Apellido", 
          value: "lastname", 
          sortable: false
        },
        { 
          text: "Email", 
          value: "email", 
          sortable: true
        },
        { 
          text: "Teléfono", 
          value: "phone", 
        },
        { 
          text: "N de documento", 
          value: "document", 
        },
        {
          text: "Rol",
          value: "role_id",
          sortable: true,
        },
        { text: "Opciones", sortable: false, value: 'options'},
      ];
  
      const index = async () => {
        let headers = { Authorization: getToken.value };
  
        try {
          const response = await api.get("users/data", { headers });
          users.value = response.data;
        } catch (err) {
          console.log(err);
        }
      };
  
      const editItem = (item: any) => {
        router.push({ name:"CreateUsers", params: { id: item.id } });
      };
  
      const deleteItem = async (item: any) => {
        let headers = { Authorization: getToken.value };
  
        try {
          await api.delete(`users/${item.id}`, { headers });
          Swal.fire({
              icon: 'success',
              title: 'Éxito!',
              text: 'Usuario eliminado correctamente.',
          });
          index();
        } catch (err) {
          console.log(err);
        }
      };
  
      const filteredUsers = computed(() => {
        return users.value.filter((item) => {
          return item.name.toLowerCase().includes(search.value.toLowerCase());
        });
      });
  
      const goToCreate = () => {
        router.push({ name:"CreateUsers"});
      }
  
      onMounted(() => {
        index();
      });
  
      return {
        tableTitle,
        editItem,
        deleteItem,
        index,
        search,
        users,
        headers,
        filteredUsers,
        goToCreate,
      };
    },
  });
  </script>
    
  <style scoped>
  .titles-match {
    display: flex;
    justify-content: space-between;
  }
  </style>