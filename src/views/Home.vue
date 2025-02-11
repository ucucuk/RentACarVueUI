<template>
    <appHeader />
    <div class="flex flex-row">
        <SideBar @UpdateItemList="UpdateItemList" />
        <appItemList  />
    </div>
</template>
<script>
import SideBar from '@/components/Home/SideBar.vue';
import { ref } from "vue";
import store from "./../store";
import { mapGetters } from 'vuex';
export default {
    setup() {
        const ItemList = ref(store.getters._getItemList);
        const ItemListType =  ref(store.getters._getItemListType);
        return {
            ItemList,
            ItemListType,
        };
    },
    computed: {
        ...mapGetters(["_getItemList"]),
        ...mapGetters(["_getItemListType"])
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
        },
        UpdateItemList() {
            const api = store.getters._getApi;
            fetch(api, {
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
                    store.commit("setItemList", data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    },
    created() {
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
                store.commit("setItemList", data);
                store.commit("setItemListType", "Brands");
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
};
</script>

<!-- <h1>Home</h1> -->
<!-- <input type="text" @keydown.enter="goToDetails"> -->