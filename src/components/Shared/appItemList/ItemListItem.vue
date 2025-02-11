<template>
    <div class="bg-white flex flex-col gap-x-3 rounded-md shadow-sm">
        <div class="p-3">
            <a href="#" class=" badge text-bg-info p-3 ">
                <span> {{ _getItemListType == "Brands" || _getItemListType == "Models" ? item?.name || "" : "" }}
                    <br v-if="_getItemListType == 'Models'" />
                    {{ _getItemListType == "Models" ? item?.brand?.name || "" : "" }}
                </span>
                <span> {{ _getItemListType == "Cars" ? item?.model?.name || "" : "" }}
                    <br>
                    {{ _getItemListType == "Cars" ? item?.model?.brand?.name || "" : "" }}
                </span>
            </a>
            <div class="">
                <button v-if="_getItemListType == 'Brands'" class=" btn btn-outline-info"
                    @click="goToModelsPage(item?.name)">
                    Modelleri Görüntüle/Düzenle
                </button>
                <button v-if="_getItemListType == 'Brands'" class=" btn btn-outline-info"
                    @click="goToModels(item?.name)">
                    Modelleri Görüntüle
                </button>
            </div>
            <!-- <div class="text-xs text-gray-400 mt-2 flex justify-between">
                <a href="#" class="hover:text-black"> Gökhan Kandemir </a>
                <span>14 Mart</span>
            </div>  -->
        </div>
        <!-- <div class="bg-red-200 p-1 text-red-900 text-center text-sm">Vue.js</div>  -->
    </div>
</template>

<script>
import store from '@/store';
import { ref } from 'vue';
import { mapGetters } from 'vuex';

export default {
    setup() {
        const ItemList = ref([]);

        const goToModels = (BrandName) => {
            const api = "https://localhost:44335/api/Models/GetModelsByBrand?brand=" + BrandName;
            store.commit("setApi",api)
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    store.commit("setItemList",data)
                    store.commit("setItemListType","Models")
                });

        };
        return {
            ItemList,
            goToModels
        };
    },
    props: {
        item: {
            type: Object,
            required: true,
            default: () => { }
        }
    },
    computed: {
        ...mapGetters(["_getItemListType"])
    },
    methods: {
        goToModelsPage(BrandName) {
            this.$router.push({ name: 'ModelsPage', query: { BrandName: BrandName } });
        }
    }
}

</script>
<style>
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