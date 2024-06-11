<script setup>   
import { inject, reactive } from 'vue';
import router from '@/router/index';
import { useTrxStore } from '@/stores/transaction';
import { VNumberInput } from 'vuetify/labs/VNumberInput';

const transaction = useTrxStore()

const dataTrx = reactive({
    AccountID: '',
    BankID: '',
    Amount: 0,
    //TransactionDate: '',
    snackbar: false,
    pesanTrx: ''
})

const myAxios = inject('myAxios')

const TF = () => {
    console.log('transfer clicked', dataTrx);
    dataTrx.snackbar = true

    myAxios.post('/transaction/transferbank', {
      AccountID: dataTrx.AccountID,
      BankID: dataTrx.BankID,
      Amount: dataTrx.Amount,
     // transactionDate: dataTrx.TransactionDate
     // transferTime: data.transferTime
    }).then((res)=> {
      if (res.status == 200){
        dataTrx.pesanTrx = "Transfer Berhasil!"
        
        transaction.authenticatedTrx()
        router.push('about')

      }
      dataTrx.snackbar = true
    }, 
    (err) => {
      dataTrx.pesanTrx = "Transfer Gagal"
      dataTrx.snackbar = true
    })
}


</script>
<template>
    <v-card class="pa-5">
    <div class="container">
        <div>
            <label>Bank ID</label>
            <v-text-field type="text" v-model="dataTrx.BankID"/>
        </div>
        <div>
            <label>ID Account</label>
            <v-text-field type="text" v-model="dataTrx.AccountID"/>
        </div>
    <div>
        <label>Amount</label>
        <v-number-input v-model="dataTrx.Amount"/>
    </div>
    <!-- <div>
        <label>Waktu Transfer</label>
        <v-text-field type="password" v-model="data.transferTime"/>
    </div> -->
    <div>
        <v-btn @click="TF">   
        Kirim transfer
        </v-btn>
    </div>
    <v-snackbar
      v-model="dataTrx.snackbar"
    >
      {{dataTrx.pesanTrx}}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="dataTrx.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

</div>
</v-card>
</template>