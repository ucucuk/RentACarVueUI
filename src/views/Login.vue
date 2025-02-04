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
import { useRouter } from 'vue-router';  // useRouter'ı import ediyoruz

export default {
  setup() {
    const router = useRouter(); // useRouter ile router'a erişiyoruz

    // userData’yı reactive ile tanımlıyoruz
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
        body: JSON.stringify(userData), // Reactive data'yı kullanıyoruz
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
            console.log("Store'da güncellenen userName:", data?.userName); // Store'a eklenen veriyi kontrol et
            store.commit('setAuthenticated', true);
            store.commit("setUser", data?.userName);  // Vuex store’a veri ekliyoruz
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