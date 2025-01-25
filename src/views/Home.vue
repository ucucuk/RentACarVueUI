<template>
    <h1>Home</h1>
    <!-- <input type="text" @keydown.enter="goToDetails"> -->
</template>
<script>
export default{
    methods:{
        goToDetails(e){
            alert(e.target.value);
            // this.$router.push(`/detay/${e.target.value}`);
            this.$router.push({
                name:"DetailPage",
                params: {
                    userID: e.target.value
                },
                query:{
                type:"DetailAuth",
                user:"ulas"
                }
            })
        }
    }
}
</script>