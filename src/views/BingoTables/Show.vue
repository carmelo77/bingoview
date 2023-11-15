<template>
    <div class="table-bingo-container">
        <h3 class="my-5">Detalle de cartón {{ number_table }}</h3>
        <div class="table-bingo">
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.b1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.i1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.n1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.g1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.o1"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.b2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.i2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.n2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.g2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.o2"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.b3"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.i3"></v-text-field>
            </div>
            <div class="box mt-7 font-weight-bold">
                <v-text-field class="text-field-serie" :readonly="true" v-model="number_table" label="Nro de serie"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.g3"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.o3"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.b4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.i4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.n4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.g4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.o4"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.b5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.i5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.n5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.g5"></v-text-field>
            </div>
            <div class="box">
                <v-text-field class="text-field" :readonly="true" v-model="form.o5"></v-text-field>
            </div>
        </div>
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

            const { getToken } = useAuth();
            const router = useRouter();

            const getBingoTableByID = async (id: number) => {

                // const values = [
                //     parseInt(form.value.b1),
                //     parseInt(form.value.i1),
                //     parseInt(form.value.n1),
                //     parseInt(form.value.g1),
                //     parseInt(form.value.o1),

                //     parseInt(form.value.b2),
                //     parseInt(form.value.i2),
                //     parseInt(form.value.n2),
                //     parseInt(form.value.g2),
                //     parseInt(form.value.o2),

                //     parseInt(form.value.b3),
                //     parseInt(form.value.i3),
                //     parseInt(form.value.g3),
                //     parseInt(form.value.o3),

                //     parseInt(form.value.b4),
                //     parseInt(form.value.i4),
                //     parseInt(form.value.n4),
                //     parseInt(form.value.g4),
                //     parseInt(form.value.o4),

                //     parseInt(form.value.b5),
                //     parseInt(form.value.i5),
                //     parseInt(form.value.n5),
                //     parseInt(form.value.g5),
                //     parseInt(form.value.o5),
                // ];

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

            onMounted(() => {
                getBingoTableByID(+router.currentRoute.value.params.id);
            });

            return {
                form,
                number_table,
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
        padding: 2em 2em;
        border-radius: 12px;
        box-shadow: 2px 2px 3px 2px #cdc1c1;
        gap: 1em;
        background: url('../../assets/background2.jpg');
        background-size: cover;
        object-fit: cover;
        background-repeat: no-repeat;
    }

    .box .v-text-field {
      font-weight: bold;
      color: #FFF;
      font-size: 25px;
    }

    .text-field >>> .v-input__control input {
        font-size: 24px; /* Ajusta el tamaño de fuente según tus necesidades */ 
        background-color: #FFF;
        color: #333;
        text-align: center;
    }
    .text-field-serie >>> .v-input__control input {
        font-size: 24px; /* Ajusta el tamaño de fuente según tus necesidades */ 
        width: 10em;
        background-color: #FFF;
        color: #333;
        text-align: center;
    }
</style>