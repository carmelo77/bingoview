<template>
  <v-container>
    <div class="titles-match">
      <h3>{{ tableTitle }}</h3>
      <v-btn color="primary" @click.prevent="goToCreate"
        >Crear nuevo cartón</v-btn
      >
    </div>
    <br />
    <v-text-field v-model="search" label="Buscar" />
    <easy-data-table
      :headers="headers"
      :items="filteredTables"
      theme-color="#f48225"
    >
      <template #item-options="item">
        <v-icon class="mx-1" color="red" @click="deleteItem(item)"
          >mdi-delete</v-icon
        >
        <v-icon class="mx-1" color="success" @click="goToDetail(item)"
          >mdi-eye</v-icon
        >
        <v-icon color="info" @click="editItem(item)">mdi-pencil</v-icon>
      </template>
    </easy-data-table>
  </v-container>
</template>
    
  <script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import api from "@/api/api";
import EasyDataTable from "vue3-easy-data-table";
import type { Header, Item } from "vue3-easy-data-table";
import { useAuth } from "@/composables";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default defineComponent({
  name: "MatchView",
  components: {
    EasyDataTable,
  },
  setup() {
    const { getToken } = useAuth();

    const tableTitle = ref("Lista de cartones de juego");
    const search = ref("");
    const tables = ref<Item[]>([]);

    const router = useRouter();

    const headers: Header[] = [
      {
        text: "Nro. de cartón",
        value: "number_table",
        sortable: true,
      },
      { text: "Opciones", sortable: false, value: "options" },
    ];

    const index = async () => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get("bingo-cards/data", { headers });
        tables.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    const deleteItem = async (item: any) => {
      let headers = { Authorization: getToken.value };

      const result = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "¿Deseas eliminar este cartón?",
        showCancelButton: true,
      });

      if (!result.isConfirmed) return false;

      try {
        await api.delete(`bingo-cards/${item.id}`, { headers });
        Swal.fire({
          icon: "success",
          title: "Éxito!",
          text: "Cartón de bingo eliminado correctamente.",
        });
        index();
      } catch (err) {
        console.log(err);
      }
    };

    const filteredTables = computed(() => {
      return tables.value.filter((item) => {
        return item?.number_table?.toString().includes(search.value);
      });
    });

    const editItem = (item: any) => {
      router.push({ name:"CreateBingoTables", params: { id: item.id } });
    };

    const goToDetail = (item: any) => {
      router.push({ name: "ShowBingoTables", params: { id: item.id } });
    };

    const goToCreate = () => {
      router.push({ name: "CreateBingoTables" });
    };

    onMounted(() => {
      index();
    });

    return {
      tableTitle,
      deleteItem,
      index,
      search,
      tables,
      headers,
      filteredTables,
      goToCreate,
      goToDetail,
      editItem
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