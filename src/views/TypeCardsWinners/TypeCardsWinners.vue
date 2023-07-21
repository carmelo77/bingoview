<template>
    <v-container>
      <div class="titles-match">
        <h3>{{ tableTitle }}</h3>
        <!-- <v-btn color="primary" @click.prevent="goToCreate">Crear nuevo tipo de car</v-btn> -->
      </div>
      <br />
      <easy-data-table
        :headers="headers"
        :items="items"
        theme-color="#f48225"
      >
      </easy-data-table>
  
    </v-container>
  </template>
    
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue";
  import api from "@/api/api";
  import EasyDataTable from 'vue3-easy-data-table';
  import type { Header, Item } from "vue3-easy-data-table";
  import { useAuth } from "@/composables";
  
  export default defineComponent({
    name: "TypeCardsWinnersView",
    components: {
      EasyDataTable
    },
    setup() {
      const { getToken } = useAuth();
  
      const tableTitle = ref("Lista de tipos de cartones ganadores");
      const items = ref<Item[]>([]);
  
      const headers: Header[] = [
        { 
          text: "Nombre", 
          value: "name", 
          sortable: true
        },
      ];
  
      const index = async () => {
        let headers = { Authorization: getToken.value };
  
        try {
          const response = await api.get("type-card-winner/data", { headers });
          items.value = response.data;
        } catch (err) {
          console.log(err);
        }
      };

  
      onMounted(() => {
        index();
      });
  
      return {
        tableTitle,
        index,
        items,
        headers
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