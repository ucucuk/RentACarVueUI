<template>
    <appHeader />
    <div class="flex flex-row">
        <SideBar />
        <appItemList :ItemList ="ItemList" />


    </div>



</template>
<script>
import SideBar from '@/components/Home/SideBar.vue';
import { ref } from "vue";
import store from "./../store";

export default {
    setup(){
        const ItemList = ref([]);
        return {
            ItemList,
        };
    },
    components: {
        SideBar
    },
    methods: {
        goToDetails(e) {
            alert(e.target.value);
            // this.$router.push(`/detay/${e.target.value}`);
            this.$router.push({
                name: "DetailPage",
                params: {
                    userID: e.target.value
                },
                query: {
                    type: "DetailAuth",
                    user: "ulas"
                }
            })
        }
    }
    ,
    created(){
        store.dispatch('startSessionCheck');
        
        fetch("https://localhost:44335/api/Brands", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Cookie'leri göndermek için
            })
                .then((response) => {
                    if (response.status === 401) {
                        console.error('Unauthorized. Check cookies and authentication!');
                        return;
                    }
                    return response.json();
                })
                .then((data) => {
                    this.ItemList = data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                
    }
};
</script>

<!-- <h1>Home</h1> -->
<!-- <input type="text" @keydown.enter="goToDetails"> -->