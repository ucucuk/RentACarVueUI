<template>
  <div class ="container" >
    <div class="mb-2">
  <RouterLink class="nav-link" active-class="active" to="/">
    Anasayfa
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/hakkimda">
    Hakkımda
  </RouterLink>
  <RouterLink  class="nav-link" active-class="active" to="/detay">
    Detay
  </RouterLink>
 <RouterView></RouterView>
</div>
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