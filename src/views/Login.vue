<script setup>   
import { inject, reactive } from 'vue';
import router from '@/router/index';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

const data = reactive({
    username: '',
    password: '',
    snackbar: false,
    pesanLogin: ''
})

const myAxios = inject('myAxios')

const login = () => {
    console.log('login clicked', data);
    data.snackbar = true

    myAxios.post('/auth/login', {
      username: data.username,
      password: data.password
    }).then((res)=> {
      if (res.status == 200){
        data.pesanLogin = "Anda berhasil! yeay!"
        
        auth.authenticated()

        router.push('about')
        //router.push('transfer')
      }
      data.snackbar = true
      // console.log(res)
      // data.snackbar = true
    }, (err) => {
      data.pesanLogin = "Usernamenya salah nih, ulang lagi yuk!"
      data.snackbar = true
    })
}


</script>
<template>
    <v-card class="pa-5">
    <div class="container">
        <div>
            <label>Username</label>
            <v-text-field type="text" v-model="data.username"/>
        </div>
    <div>
        <label>Password</label>
        <v-text-field type="password" v-model="data.password"/>
    </div>
    <div>
        <v-btn @click="login">   
        Login
        </v-btn>
    </div>
    <v-snackbar
      v-model="data.snackbar"
    >
      {{data.pesanLogin}}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="data.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

</div>
</v-card>
</template>