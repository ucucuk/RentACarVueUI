<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input v-model="userData.FirstName" type="text" placeholder="Ad" class="input mb-3" />
    <input v-model="userData.LastName" type="text" placeholder="Soyad" class="input mb-3" />
    <input v-model="userData.NationalIdentity" type="text" placeholder="TC Kimlik No" class="input mb-3" />
    <input v-model="userData.DateOfBirthYear" type="number" placeholder="Doğum Yılı" min="1900" max="2099"
      class="input mb-3" />
    <input v-model="userData.UserName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.Password" type="password" placeholder="Şifre" class="input mb-3" />
    <button class="default-button" @click="newUserFunc()" >Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link :to="{ name: 'LoginPage' }" class="text-red-900 hover:text-black">
        Giriş yap!>
      </router-link>
    </span>
  </div>
</template>
<script>

export default {
  data() {
    return {
      userData: {
        FirstName: null,
        LastName: null,
        NationalIdentity: null,
        DateOfBirthYear: null,
        UserName: null,
        Password: null,
      }
    }
  },
  methods: {
    onSave() {
      console.log(this.userData);
    },
        newUserFunc() {
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