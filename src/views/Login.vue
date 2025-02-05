<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Login</h3>
    <input v-model="userData.UserName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.Password" type="password" placeholder="Şifre" class="input mb-3" />
    <button @click="LoginFunc()" class="default-button">Giriş yap</button>
    <span class="text-center mt-3 text-sm">
      Üye değilim,
      <router-link :to="{ name: 'RegisterPage' }" class="text-red-900 hover:text-black">
        Üye olmak istiyorum!>
      </router-link>
    </span>
  </div>
</template>

<script>
import { reactive } from 'vue';
import store from "./../store";
import { useRouter } from 'vue-router';  

export default {
  setup() {
    const router = useRouter(); // useRouter ile router'a erişiyoruz

    // userData’yı reactive ile tanımlıyoruz anlık değişebilsinler diye
    const userData = reactive({
      UserName: null,
      Password: null
    });

    // Login işlemi
    const LoginFunc = () => {
      fetch("https://localhost:44335/api/Users/LoginMongoIdentityUser", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData), 
        credentials: 'include'
      })
        .then((response) => {
          if (response.status === 401 || response.status === 400) {
            console.error('Unauthorized. Check cookies and authentication!');
            alert("Kullanıcı adı veya şifre yanlış.");
            return;
          }
          return response.json();
        })
        .then((data) => {
          console.log('Login:', data, data?.userName);
          if (data?.userName != null) {
            console.log("Store'da güncellenen userName:", data?.userName); 
            store.commit('setAuthenticated', true);
            store.commit("setUser", data?.userName); 
            store.dispatch('startSessionCheck');
            router.push({ name: 'HomePage' });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
     
    };

    return {
      userData,
      LoginFunc
    };
  }
};
</script>