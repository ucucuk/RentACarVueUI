<template>
  
  <div class ="p-3" >
    <!-- <div class="col-111"> -->
  <RouterLink class="nav-link" active-class="active" to="/">
    Homepage
  </RouterLink>
  <RouterLink class="nav-link" active-class="active" to="/register">
    Register
  </RouterLink>
  <RouterLink class="nav-link" active-class="active" to="/login">
    Login
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/about">
    About
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/admin">
    Admin
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/brands">
    Brands
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/models">
    Models
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/cars">
    Cars
  </RouterLink>
 <RouterView></RouterView>
  <!-- </div> -->
</div>
</template>

<style>
.nav-link{
  padding : 5px 10px;
  text-decoration:none;
  border: 1px solid hsl(189, 70%, 56%);
  color: rgb(0, 0, 0);
  margin-right: 5px;
  margin-top: 5px !important;
  display: inline-block;
}
.active{
  background-color: rgb(200, 247, 255);
  color: rgb(0, 0, 0);
}
</style>