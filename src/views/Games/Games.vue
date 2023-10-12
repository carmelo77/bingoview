<template>
  <v-container>
    <h3>Juegos de bingo</h3>
    <v-row class="my-2">
      <v-col cols="6">
        <v-text-field v-model="bingoNumber" label="Nuevo número" @keyup.enter="storeNumberByMatch"></v-text-field>
      </v-col>
      <v-col cols="6">
          <v-select
            v-model="typeCardWinner"
            :items="typesCard"
            label="Seleccione un tipo de cartón ganador"
            item-value="id"
            item-title="name"
            @update:modelValue="changeDefault($event)"
            :disabled="numberByMatch.length > 0 ? true : false"
          >
          </v-select>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <!-- <div class="bingo-letters-vertical">
          <span>B</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span>O</span>
        </div> -->
        <img src="../../assets/vertical.png" alt="vertical-bingo" width="70">
      </v-col>
      <v-col cols="9">
        <table class="number-table" cellpadding="4" cellspacing="4" border="1">
          <tr>
            <td 
              v-for="num in numbersBingoWithMatch" 
              :key="num.value"
              :style="num.value >= 1 && num.value <= 15 && num.found ? 'background-color: #D32F2F;' 
              : num.value >= 16 && num.value <= 30 && num.found ? 'background-color: #EF9A9A;' 
              : num.value >= 31 && num.value <= 45 && num.found ? 'background-color: #80CBC4;' 
              : num.value >= 46 && num.value <= 60 && num.found ? 'background-color: #9575CD;' 
              : num.value >= 60 && num.value <= 75 && num.found ? 'background-color: #FFEE58;' : '#D32F2F' "
              @click="deleteLastNumber(num)"
            >
              {{ num.value }}
            </td>
          </tr>
        </table>
        <div class="mt-8 info--bingo">
          <div class="text-red">{{ numberByMatch.length }} de 75</div>
          <div>
            <v-btn color="error" @click="resetMatch()">reset</v-btn>
          </div>
          <!-- <div class="bingo-letters">
            <span>B</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>O</span>
          </div> -->
          <img src="../../assets/horizontal.png" alt="horizontal-bingo" width="300">
          <div class="circle-last-number" v-if="numberByMatch.length">
            {{ numberByMatch[0].number  }}
          </div>
        </div>
      </v-col>
      <v-col cols="1">
        <img 
          class="img-bingo"
          :src="require('@/assets/' + typeCardWinner + '.jpg')"
          v-if="typeCardWinner"
          :alt="`bingo-${typeCardWinner}`"
        >
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script lang="ts">
import { ref, defineComponent, onMounted, computed } from "vue";
import { useAuth } from "@/composables";
import Swal from 'sweetalert2';
import io from "socket.io-client";
import { useRouter } from "vue-router";
import api from "@/api/api";
import { baseURL } from "@/api/baseURL";

interface MatchesSelect {
  value: string;
  text: string;
}

interface NumbersMatch {
  id: number
  number: number;
  created_at: string
}

export default defineComponent({
  setup() {
    const matches = ref<MatchesSelect[]>([]);
    const validMatch = ref<number | null>(null);
    const numberByMatch = ref<NumbersMatch[]>([]);
    const bingoNumber = ref<number>(0);
    const isMatchNew = ref<boolean>(false);
    const typeCardWinner = ref<number | null>(null);
    const typesCard = ref(<any[]>[]);

    const { getToken } = useAuth();
    const router = useRouter();
    const allNumbersBingo = [
      { value: 1, found: false },
      { value: 2, found: false },
      { value: 3, found: false },
      { value: 4, found: false },
      { value: 5, found: false },
      { value: 6, found: false },
      { value: 7, found: false },
      { value: 8, found: false },
      { value: 9, found: false },
      { value: 10, found: false },
      { value: 11, found: false },
      { value: 12, found: false },
      { value: 13, found: false },
      { value: 14, found: false },
      { value: 15, found: false },
      { value: 16, found: false },
      { value: 17, found: false },
      { value: 18, found: false },
      { value: 19, found: false },
      { value: 20, found: false },
      { value: 21, found: false },
      { value: 22, found: false },
      { value: 23, found: false },
      { value: 24, found: false },
      { value: 25, found: false },
      { value: 26, found: false },
      { value: 27, found: false },
      { value: 28, found: false },
      { value: 29, found: false },
      { value: 30, found: false },
      { value: 31, found: false },
      { value: 32, found: false },
      { value: 33, found: false },
      { value: 34, found: false },
      { value: 35, found: false },
      { value: 36, found: false },
      { value: 37, found: false },
      { value: 38, found: false },
      { value: 39, found: false },
      { value: 40, found: false },
      { value: 41, found: false },
      { value: 42, found: false },
      { value: 43, found: false },
      { value: 44, found: false },
      { value: 45, found: false },
      { value: 46, found: false },
      { value: 47, found: false },
      { value: 48, found: false },
      { value: 49, found: false },
      { value: 50, found: false },
      { value: 51, found: false },
      { value: 52, found: false },
      { value: 53, found: false },
      { value: 54, found: false },
      { value: 55, found: false },
      { value: 56, found: false },
      { value: 57, found: false },
      { value: 58, found: false },
      { value: 59, found: false },
      { value: 60, found: false },
      { value: 61, found: false },
      { value: 62, found: false },
      { value: 63, found: false },
      { value: 64, found: false },
      { value: 65, found: false },
      { value: 66, found: false },
      { value: 67, found: false },
      { value: 68, found: false },
      { value: 69, found: false },
      { value: 70, found: false },
      { value: 71, found: false },
      { value: 72, found: false },
      { value: 73, found: false },
      { value: 74, found: false },
      { value: 75, found: false }
    ];

    const resetMatch = async () => {

      const result = await Swal.fire({
        icon: "warning",
        title: "¿Estás seguro?",
        text: "¿Deseas resetear esta partida?",
        showCancelButton: true,
      });

      if (!result.isConfirmed) return false;

      const socket = io(baseURL, {transports: ['websocket']});
      let headers = { Authorization: getToken.value };

      try {
        await api.get(`bingo-number/reset-match`, { headers });
        Swal.fire({
          icon: 'success',
          title: 'Bien!',
          text: 'Has reseteado correctamente esta partida.',
        });
        socket.emit('resetAll');
        router.push("/");
      } catch (err) {
        console.log(err);
        matches.value = [];
      }
    };

    const deleteLastNumber = async (num: any) => {

      if(!num.found) {
        return false;
      }

      const socket = io(baseURL, {transports: ['websocket']});
      let headers = { Authorization: getToken.value };

      try {
        await api.get(`bingo-number/delete-number/${num.value}`, { headers });
        socket.emit('deleteWrongNumber', num.value);
        getNumbersByMatch();
      } catch (err) {
        console.log(err);
      }
    };

    const getNumbersByMatch = async (  ) => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get(`bingo-number/availables`, { headers });
        numberByMatch.value = response.data.sort((a: NumbersMatch, b: NumbersMatch) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      } catch (err) {
        console.log(err);
      }
    };

    const storeNumberByMatch = async ( id: number ) => {
      let headers = { Authorization: getToken.value };
      const socket = io(baseURL, {transports: ['websocket']});

      if(bingoNumber.value == 0 || bingoNumber.value > 75) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'El número no entra en el rango válido.',
        });
        return;
      }

      const data = {
        bingo_number: bingoNumber.value,
      }

      try {
        // Emitir el evento al servidor de socket
        if(!numberByMatch.value.some(item => item.number == bingoNumber.value)) {
          numberByMatch.value.unshift({ 
            id: numberByMatch.value.length ? numberByMatch.value[0].id + 1 : 1, 
            number: Number(bingoNumber.value),
            created_at: new Date().toISOString() 
          });
        }
        const response = await api.post(`bingo-number`, data,{ headers });
        
        socket.emit("NewBingoNumberByMatch", { number: bingoNumber.value, typeCard: typeCardWinner.value });
        bingoNumber.value = 0;

        if(response.data.success) {
          Swal.fire({
            imageUrl: require('@/assets/' + typeCardWinner.value + '.jpg'),
            imageWidth: 400,
            imageHeight: 200,
            title: 'Bingo!',
            text: response.data.message,
          });

          socket.emit("BingoNumberWin", { number: bingoNumber.value });
        }

        // getNumbersByMatch();

      } catch (err: any) {
        console.log(err);

        if(err.response.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.response.data.message,
          });
          return;
        }
      }
    };

    const numbersBingoWithMatch = computed(() => {
      const numbers = [...allNumbersBingo];

      for (let i = 0; i < numberByMatch.value.length; i++) {
        const num = numberByMatch.value[i].number;
        const index = numbers.findIndex(n => n.value === num);
        if (index !== -1) {
          numbers[index] = {
            ...numbers[index],
            found: true
          };
        }
      }

      return numbers;
    });

    const getTypesCardWinner = async () => {
      let headers = { Authorization: getToken.value };

      try {
        const response = await api.get("type-card-winner/data", { headers });
        typeCardWinner.value = response.data.find( (item: any) => item.default )?.id;
        typesCard.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    const changeDefault = async (item: number) => {
      let headers = { Authorization: getToken.value };

      try {
        await api.get(
          `type-card-winner/activate?id=${item}`,
          { headers }
        );
      } catch (err: any) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      }
    };

    onMounted(() => {
      getNumbersByMatch();
      getTypesCardWinner();
    });

    return {
      matches: matches,
      validMatch,
      getNumbersByMatch,
      numberByMatch,
      bingoNumber,
      storeNumberByMatch,
      allNumbersBingo,
      numbersBingoWithMatch,
      isMatchNew,
      resetMatch,
      typeCardWinner,
      typesCard,
      changeDefault,
      deleteLastNumber
    };
  },
});
</script>

<style lang="css" scoped>
  .number-table {
    border-collapse: collapse;
    width: 100%;
    border-color: #D32F2F;
  }

  .number-table td {
    width: calc(100% / 15);
    text-align: center;
    display: inline-flex;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 19px;
  }

  .number-table tr:nth-child(15n + 1) {
    page-break-before: always;
  }

  .number-table tr td:nth-child(15n + 1) {
    page-break-inside: avoid;
  }

  .cell-color {
    /* background: #D32F2F; */
    color: #FFF;
  }

  @media print {
    .number-table {
      page-break-after: always;
    }
  }

  .info--bingo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .bingo-letters {
    display: flex;
  }

  .bingo-letters span {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 900;
    color: #333;
    padding: 20px;
  }

  .bingo-letters span:nth-child(1) {
    border: 4px solid #D32F2F;
    transform: rotate(-10deg);
  }

  .bingo-letters span:nth-child(2) {
    border: 4px solid #EF9A9A;
    transform: rotate(-20deg);
  }

  .bingo-letters span:nth-child(3) {
    border: 4px solid #80CBC4;
    transform: rotate(35deg);
  }


  .bingo-letters span:nth-child(4) {
    border: 4px solid #9575CD;
    transform: rotate(23deg);
  }


  .bingo-letters span:nth-child(5) {
    border: 4px solid #FFEE58;
    transform: rotate(20deg);
  }

  .bingo-letters-vertical {
    display: flex;
    flex-direction: column;
  }

  .bingo-letters-vertical span {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 900;
    color: #333;
    /* padding: 20px; */
    padding: 31px;
  }

  .bingo-letters-vertical span:nth-child(1) {
    border: 4px solid #D32F2F;
    transform: rotate(-10deg);
  }

  .bingo-letters-vertical span:nth-child(2) {
    border: 4px solid #EF9A9A;
    transform: rotate(-20deg);
  }

  .bingo-letters-vertical span:nth-child(3) {
    border: 4px solid #80CBC4;
    transform: rotate(35deg);
  }


  .bingo-letters-vertical span:nth-child(4) {
    border: 4px solid #9575CD;
    transform: rotate(23deg);
  }


  .bingo-letters-vertical span:nth-child(5) {
    border: 4px solid #FFEE58;
    transform: rotate(20deg);
  }

  .circle-last-number {
    border: 6px solid #D32F2F;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 24px;
    color: #D32F2F;
    background: #FFF;
    box-shadow: 2px 3px 3px #333;
  }

  .img-bingo {
    margin-top: 8em;
    width: 170px;
  }
</style>