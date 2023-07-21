<template>
  <div class="home">
    <h3>Carga de tablas de bingo mediante XLSX</h3>
    <input type="file" accept=".xlsx" @change="handleFileChange" />
    <hr />
    <v-btn
      class="mt-4"
      color="primary"
      @click="handleFileUpload"
      :disabled="loading"
    >
      {{ loading ? "Cargando" : "Subir archivo" }}
    </v-btn>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import api from "@/api/api";
import { useAuth } from "@/composables";
import Swal from "sweetalert2";

export default {
  name: "FileComponent",
  setup() {
    const file = ref(null);
    const loading = ref(false);

    const { getToken } = useAuth();

    const handleFileChange = (event) => {
      file.value = event.target.files[0];
    };

    const handleFileUpload = async () => {
  if (file.value) {
    loading.value = true;
    let headers = {
      Authorization: getToken.value,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("file", file.value, file.value.name);

    try {
      await api.post("bingo-cards/upload", formData, { headers });
      loading.value = false;
      Swal.fire({
          icon: "success",
          title: "Éxito!",
          text: "Tablas cargadas éxitosamente.",
        });
    } catch (err) {
      console.error(err);
      loading.value = false;
    }
  }
};

    return {
      file,
      handleFileChange,
      handleFileUpload,
      loading
    };
  },
};
</script>
  