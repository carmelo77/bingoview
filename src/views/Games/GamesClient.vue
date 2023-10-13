<template>
    <v-container>
      <h3>Juegos de bingo en proceso</h3>
      <br />
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
          <table class="number-table" cellpadding="2" cellspacing="2" border="1">
            <tr>
              <td 
                v-for="num in numbersBingoWithMatch" 
                :key="num.value"
                :style="num.value >= 1 && num.value <= 15 && num.found ? 'background-color: #D32F2F;' 
                  : num.value >= 16 && num.value <= 30 && num.found ? 'background-color: #EF9A9A;' 
                  : num.value >= 31 && num.value <= 45 && num.found ? 'background-color: #80CBC4;' 
                  : num.value >= 46 && num.value <= 60 && num.found ? 'background-color: #9575CD;' 
                  : num.value >= 60 && num.value <= 75 && num.found ? 'background-color: #FFEE58;' : '#D32F2F' "
                >
                {{ num.value }}
              </td>
            </tr>
          </table>
          <div class="mt-8 info--bingo">
            <div class="text-red">{{ numberByMatch.length }} de 75</div>
            <!-- <div class="bingo-letters">
              <span>B</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
              <span>O</span>
            </div>
           -->
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
      <!-- <v-list class="overflow-y-auto" style="max-height: 550px">
        <v-list-item-group>
          <v-list-item>
            <v-list-item-subtitle>Números anteriores</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-for="item in numberByMatch" :key="item.id">
            <v-list-item-title :class=" item?.new ? 'text-green' : '' ">Número {{ item.number }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
    </v-container>
  </template>
    
    <script lang="ts">
  import { ref, defineComponent, onMounted, computed, watchEffect } from "vue";
  import { useAuth } from "@/composables";
  import Swal from 'sweetalert2';
  import io from "socket.io-client";
  import { useRouter } from "vue-router";
  import api from "@/api/api";
  import { baseURL } from "@/api/baseURL";
  
  interface NumbersMatch {
    id: number
    number: number;
    new?: boolean
    created_at: string
  }
  
  export default defineComponent({
    setup() {
      const numberByMatch = ref<NumbersMatch[]>([]);
  
      const { getToken } = useAuth();
      const router = useRouter();
      const socket = io(baseURL, {transports: ['websocket']});

      const typeCardWinner = ref<number | null>(null);

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

      const numbersBingoWithMatch = ref<any>([]);
  
      const getNumbersByMatch = async () => {
        let headers = { Authorization: getToken.value };
  
        try {
          const response = await api.get(`bingo-number/availables`, { headers });
          numberByMatch.value = response.data.sort((a: NumbersMatch, b: NumbersMatch) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } catch (err) {
          console.log(err);
        }
      };
  
      // const handleMatchSelection = async ( id: number ) => {
      //   await getNumbersByMatch();
      // }

    //   const numbersBingoWithMatch = computed(() => {
    //   const numbers = [...allNumbersBingo];

    //   for (let i = 0; i < numberByMatch.value.length; i++) {
    //     const num = numberByMatch.value[i].number;
    //     const index = numbers.findIndex(n => n.value === num);
    //     if (index !== -1) {
    //       numbers[index] = {
    //         ...numbers[index],
    //         found: true
    //       };
    //     }
    //   }

    //   return numbers;
    // });

    watchEffect(() => {
      // Recalcular numbersBingoWithMatch cada vez que numberByMatch cambia
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

      numbersBingoWithMatch.value = numbers;
    });
  
      onMounted(() => {

        getNumbersByMatch();

        socket.on("NewBingoNumberByMatch", ({ number, typeCard }) => {
            if(numberByMatch.value.length == 0) {
                // const find = matches.value.find((item: any) => item.id == matchId);

                Swal.fire({
                    icon: 'success',
                    title: '¡Ha comenzando una nueva partida!',
                    text: `Un nuevo juego de bingo ha comenzado, ¡preparate!.`,
                });
            }

            typeCardWinner.value = typeCard;

            // if (selectedMatch.value == matchId) {
                const lastNumber = numberByMatch.value[0]; // Obtiene el último número de la lista
                const newId = lastNumber ? lastNumber.id + 1 : 1; // Suma 1 al campo id del último elemento o establece 1 como nuevo id si la lista está vacía

                numberByMatch.value.unshift({ id: newId, number, new: true, created_at: new Date().toISOString() });
                const findIndex = numbersBingoWithMatch.value.findIndex((item: any) => item.value == number);
                if(findIndex != -1) {
                  numbersBingoWithMatch.value[findIndex].found = true;
                }
            // }
        });

        socket.on("deleteWrongNumber", ({ number }) => {
          const oldNumbers = numberByMatch.value.filter( item => item.number !== number );
            numberByMatch.value = oldNumbers;

            const findIndex = numbersBingoWithMatch.value.findIndex((item: any) => item.value == number);
            if(findIndex != -1) {
              numbersBingoWithMatch.value[findIndex].found = false;
            }
        });

        socket.on("resetAll", () => {
          Swal.fire({
            icon: 'info',
            title: 'Notificación!',
            text: 'Se reseteado la partida actual.',
          });
          router.push("/");
        });

        socket.on("BingoNumberWin", ({ number }) => {
            // const find = matches.value.find((item: any) => item.id == matchId);

            Swal.fire({
                imageUrl: require('@/assets/' + typeCardWinner.value + '.jpg'),
                imageWidth: 400,
                imageHeight: 200,
                title: '¡La partida ha culminado!',
                text: `¡El juego acaba de terminar! verifica si estás entre los ganadores.`,
            });
        });
      });
  
      return {
        getNumbersByMatch,
        numberByMatch,
        numbersBingoWithMatch,
        typeCardWinner
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
    background: #FFF;
    color: #333;
  }


 .number-table tr:nth-child(15n + 1) {
   page-break-before: always;
 }

 .number-table tr td:nth-child(15n + 1) {
   page-break-inside: avoid;
 }

 /* .cell-color {
   background: #D32F2F;
   color: #FFF;
 } */

 @media print {
   .number-table {
     page-break-after: always;
   }
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
    /* padding: 20px; */
    padding: 31px;
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

 .info--bingo {
    display: flex;
    justify-content: space-between;
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