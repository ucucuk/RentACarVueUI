<template>
    <appHeader />
    <div class="flex flex-row">
        <SideBar />
        <appBookmarkList/>
        

    </div>



</template>
<script>
import SideBar from '@/components/Home/SideBar.vue';
export default {
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
}
</script>

<!-- <h1>Home</h1> -->
<!-- <input type="text" @keydown.enter="goToDetails"> -->