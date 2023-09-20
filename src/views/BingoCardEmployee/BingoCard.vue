<template>
  <v-container>
    <div class="titles-match">
      <h3>{{ tableTitle }}</h3>
    </div>
    <br />
    <v-text-field
      label="Buscar tabla de bingo"
      @keyup.enter="goToDetail"
    >

    </v-text-field>
    <!-- <v-autocomplete
      label="Buscar tabla de bingo"
      :items="tables"
      item-value="id"
      item-title="number_table"
      @update:model-value="goToDetail"
    ></v-autocomplete> -->
  </v-container>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import api from "@/api/api";
import EasyDataTable from 'vue3-easy-data-table';
import { useAuth } from "@/composables";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

export default defineComponent({
  name: "MatchViewEmployee",
  components: {
    EasyDataTable
  },
  setup() {
    const { getToken } = useAuth();

    const tableTitle = ref("Buscar por nro de tabla");
    const tables = ref<any[]>([]);

    const router = useRouter();

    const index = async () => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get("bingo-cards/data", { headers });
        tables.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    const goToDetail = async (event: KeyboardEvent | null) => {

      const { value } = event?.target as HTMLInputElement;

      if(!value || Number(value) == 0) {
        return;
      }

      const res = await validTable(Number(value));
      if(!res?.data.success)
      {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No puedes ver el detalle de una tabla la cual no está en tu rango.',
        });
        return;
      }

      router.push({ name:"DetailBingoCardEmployee", params: { id: value }});
    }

    const validTable = async ( value: number ) => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get(`bingo-cards/search-number-table-valid?number_card=${value}`, { headers });
        return response;
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
      tables,
      goToDetail
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