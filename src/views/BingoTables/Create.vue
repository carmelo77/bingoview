<template>
    <div class="table-bingo-container">
        <h3 class="my-5">Crear nuevo cartón</h3>
        <div class="table-bingo">
            <div class="box">
                <v-text-field v-model="form.b1" label="B1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.i1" label="I1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.n1" label="N1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.g1" label="G1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.o1" label="O1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.b2" label="B2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.i2" label="I2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.n2" label="N2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.g2" label="G2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.o2" label="O2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.b3" label="B3"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.i3" label="I3"></v-text-field>
            </div>
            <div class="box mt-7 font-weight-bold">
                <v-text-field v-model="number_table" label="Nro de tabla"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.g3" label="G3"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.o3" label="O3"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.b4" label="B4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.i4" label="I4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.n4" label="N4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.g4" label="G4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.o4" label="O4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.b5" label="B5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.i5" label="I5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.n5" label="N5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.g5" label="G5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field v-model="form.o5" label="O5"></v-text-field>
            </div>
        </div>
        <v-btn color="black" class="my-8" @click="submitForm">
            Guardar
        </v-btn>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import Swal from "sweetalert2";
    import api from "@/api/api";
    import { useAuth } from "@/composables";
    import { useRouter } from "vue-router";

    export default defineComponent({
        setup() {
            const form = ref<any>({
                b1: "",
                b2: "",
                b3: "",
                b4: "",
                b5: "",
                i1: "",
                i2: "",
                i3: "",
                i4: "",
                i5: "",
                n1: "",
                n2: "",
                n4: "",
                n5: "",
                g1: "",
                g2: "",
                g3: "",
                g4: "",
                g5: "",
                o1: "",
                o2: "",
                o3: "",
                o4: "",
                o5: "",
            });

            const number_table = ref<number>(0);
            const isCreateForm = ref(true);

            const { getToken } = useAuth();
            const router = useRouter();

            const submitForm = async () => {
                let headers = { Authorization: getToken.value };

                if(isCreateForm.value) {
                    await saveBingoTable(headers);
                } else {
                    await updateBingoTable(headers, +router.currentRoute.value.params.id);
                }
            };

            const saveBingoTable = async (headers:Record<string,string>) => {
                if(!validateForm()) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Todos los campos del cartón son obligatorios.',
                    });

                    return false;
                }

                if(number_table.value < 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Debes especificar el nro de cartón.',
                    });

                    return false;
                }

                const values = [
                    parseInt(form.value.b1),
                    parseInt(form.value.i1),
                    parseInt(form.value.n1),
                    parseInt(form.value.g1),
                    parseInt(form.value.o1),

                    parseInt(form.value.b2),
                    parseInt(form.value.i2),
                    parseInt(form.value.n2),
                    parseInt(form.value.g2),
                    parseInt(form.value.o2),

                    parseInt(form.value.b3),
                    parseInt(form.value.i3),
                    parseInt(form.value.g3),
                    parseInt(form.value.o3),

                    parseInt(form.value.b4),
                    parseInt(form.value.i4),
                    parseInt(form.value.n4),
                    parseInt(form.value.g4),
                    parseInt(form.value.o4),

                    parseInt(form.value.b5),
                    parseInt(form.value.i5),
                    parseInt(form.value.n5),
                    parseInt(form.value.g5),
                    parseInt(form.value.o5),
                ];

                const data = {
                    number_table: number_table.value,
                    values
                }

                try {
                    const response = await api.post(`bingo-cards`, data, {
                        headers,
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Cartón de bingo guardado correctamente.',
                    });
                    router.push({ name: 'BingoTables' });
                    
                } catch (err:any) {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.message,
                    });
                    
                }
            }

            const updateBingoTable = async (headers:Record<string,string>, id: number) => {
                if(!validateForm()) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Todos los campos del cartón son obligatorios.',
                    });

                    return false;
                }

                if(number_table.value < 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Debes especificar el nro de cartón.',
                    });

                    return false;
                }

                const values = [
                    parseInt(form.value.b1),
                    parseInt(form.value.i1),
                    parseInt(form.value.n1),
                    parseInt(form.value.g1),
                    parseInt(form.value.o1),

                    parseInt(form.value.b2),
                    parseInt(form.value.i2),
                    parseInt(form.value.n2),
                    parseInt(form.value.g2),
                    parseInt(form.value.o2),

                    parseInt(form.value.b3),
                    parseInt(form.value.i3),
                    parseInt(form.value.g3),
                    parseInt(form.value.o3),

                    parseInt(form.value.b4),
                    parseInt(form.value.i4),
                    parseInt(form.value.n4),
                    parseInt(form.value.g4),
                    parseInt(form.value.o4),

                    parseInt(form.value.b5),
                    parseInt(form.value.i5),
                    parseInt(form.value.n5),
                    parseInt(form.value.g5),
                    parseInt(form.value.o5),
                ];

                const data = {
                    number_table: number_table.value,
                    values
                }

                try {
                    const response = await api.put(`bingo-cards/update/${id}`, data, {
                        headers,
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Cartón de bingo actualizado correctamente.',
                    });
                    router.push({ name: 'BingoTables' });
                    
                } catch (err:any) {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: err.response.data.message,
                    });
                    
                }
            }

            const getBingoTableByID = async (id: number) => {

                let headers = { Authorization: getToken.value };

                try {
                    const response = await api.get(`bingo-cards/one?id=${id}`, {
                        headers,
                    });

                    const { values } = response.data;

                    number_table.value = response.data.number_table;

                    form.value.b1 = values[0];
                    form.value.i1 = values[1];
                    form.value.n1 = values[2];
                    form.value.g1 = values[3];
                    form.value.o1 = values[4];

                    form.value.b2 = values[5];
                    form.value.i2 = values[6];
                    form.value.n2 = values[7];
                    form.value.g2 = values[8];
                    form.value.o2 = values[9];

                    form.value.b3 = values[10];
                    form.value.i3 = values[11];
                    form.value.g3 = values[12];
                    form.value.o3 = values[13];

                    form.value.b4 = values[14];
                    form.value.i4 = values[15];
                    form.value.n4 = values[16];
                    form.value.g4 = values[17];
                    form.value.o4 = values[18];

                    form.value.b5 = values[19];
                    form.value.i5 = values[20];
                    form.value.n5 = values[21];
                    form.value.g5 = values[22];
                    form.value.o5 = values[23];
                    
                } catch (err:any) {
                    console.log(err);
                }
            }

            const validateForm = () => {
                return Object.values(form.value).every(val => val != "" && val != "0");
            }

            onMounted(() => {

                if(router.currentRoute.value.params.id) {
                    isCreateForm.value = false;
                    getBingoTableByID(+router.currentRoute.value.params.id);
                }
            });

            return {
                form,
                number_table,
                submitForm
            }
        }
    });
</script>
<style scoped>
    .table-bingo-container {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .table-bingo {
        border: 1px solid #cdc1c1;
        width: 80%;
        height: 80%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-items: center;
        padding: 3em 3em;
        border-radius: 12px;
        box-shadow: 2px 2px 3px 2px #cdc1c1;
        gap: 2em;
    }
</style>