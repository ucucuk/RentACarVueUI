<template>
  <div class="p-3">
    <RouterLink v-if= isLogin class="nav-link" active-class="active" to="/">
      Homepage
    </RouterLink>
    <RouterLink v-if= !isLogin class="nav-link" active-class="active" to="/register">
      Register
    </RouterLink>
    <RouterLink v-if= !isLogin class="nav-link" active-class="active" to="/login">
      Login
    </RouterLink>
    <RouterLink class="nav-link" active-class="active" to="/about">
      About
    </RouterLink>
    <RouterLink v-if="hasRole('admin')" class="nav-link" active-class="active" to="/admin">
      Admin
    </RouterLink>
    <RouterLink v-if="hasRole('admin')" class="nav-link" active-class="active" to="/brands">
      Brands
    </RouterLink>
    <RouterLink v-if="hasRole('admin')" class="nav-link" active-class="active" to="/models">
      Models
    </RouterLink>
    <RouterLink v-if="hasRole('admin')" class="nav-link" active-class="active" to="/cars">
      Cars
    </RouterLink>
    <RouterLink v-if="hasRole('normal')" class="nav-link" active-class="active" to="/account">
      Account
    </RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { computed } from 'vue';
import store from './store';

export default {
  setup() {
    // Store'dan kullanıcı rollerini almak
    const userRoles = computed(() => store.getters._getCurrentUserRoles);
    const isLogin = computed(() => store.getters._isAuthenticated);

    // Dinamik olarak verilen birden fazla rolün olup olmadığını kontrol eden fonksiyon
    const hasRole = (role) => {
      if (!userRoles.value) return false;

      const roles = role.split(',').map((r) => r.trim());  // Virgülle ayrılmış rolleri ayırıyoruz
      return roles.some((r) => userRoles.value.includes(r));
    };

    return {
      hasRole,
      isLogin,
      userRoles
    };
  }
};
</script>

<style>
.centered-container {
  display: flex;
  justify-content: center; /* Yatayda ortalar */
  align-items: center; /* Dikeyde ortalar */
  height: 100vh; /* Ekranın tamamını kaplasın */
  width: 100%; /* Yüzde 100 genişlik */
}


.nav-link {
  padding: 5px 10px;
  text-decoration: none;
  border: 1px solid hsl(189, 70%, 56%);
  color: rgb(0, 0, 0);
  margin-right: 5px;
  margin-top: 5px !important;
  display: inline-block;
}

.active {
  background-color: rgb(200, 247, 255);
  color: rgb(0, 0, 0);
}
</style>