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

    const goToDetail = (event: KeyboardEvent | null) => {

      const { value } = event?.target as HTMLInputElement;
      
      if(!value || Number(value) == 0) {
        return;
      }

      router.push({ name:"DetailBingoCardEmployee", params: { id: value }});
    }

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