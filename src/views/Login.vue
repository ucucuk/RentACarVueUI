<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Login</h3>
    <input v-model="userData.UserName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.UserName" type="password" placeholder="Şifre" class="input mb-3" />
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

export default {
  data() {
    return {
      userData: {
        UserName: null,
        Password: null,
      }
    }
  },
  methods: {
    onSave() {
      console.log(this.userData);
    },
        LoginFunc() {
            fetch("https://localhost:44335/api/Users/CreateMongoIdentityUser", {
                method: 'POST',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.userData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.$router.push({name:'HomePage'})
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
  }
};
</script>