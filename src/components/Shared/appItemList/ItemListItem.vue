<template>
    <div class="bg-white flex flex-col rounded-md shadow-sm">
        <div class="text-info-emphasis flex justify-between">
            <div v-if="_getItemListType === 'Brands'">
                <span>
                    {{ item?.name || "" }}
                </span>
                <div class="justify-between">
                    <button class=" btn btn-outline-info" @click="goToModelsPage(item?.name)">
                        Modelleri Gör/Düzenle
                    </button>
                    <button class=" btn btn-outline-info" @click="goToModels(item?.name)">
                        Modelleri Görüntüle
                    </button>
                </div>
            </div>
            <div v-if="_getItemListType === 'Models'">
                <span>
                    {{ item?.brand?.name || "" }}
                    <br />
                    {{ item?.name || "" }}
                </span>
                <div class="justify-between">
                    <button class=" btn btn-outline-info" @click="goToCarsPage(item?.name)">
                        Arabaları Gör/Düzenle
                    </button>
                    <button class=" btn btn-outline-info" @click="goToCars(item?.name)">
                        Arabaları Görüntüle
                    </button>
                </div>
            </div>
            <div v-if="_getItemListType === 'Cars'">
                <span>
                    {{ item?.model?.brand?.name || "" }}
                    <br>
                    {{ item?.model?.name || "" }}
                    <br>
                    {{ item?.modelYear || "" }}
                    <br>
                    {{ item?.plate || "" }}
                </span>
            </div>
        </div>

        <!-- <div class="bg-red-200 p-1 text-red-900 text-center text-sm">Vue.js</div>  -->
    </div>

</template>

<script>
import router from '@/router';
import store from '@/store';
import { ref } from 'vue';
import { mapGetters } from 'vuex';

export default {
    setup() {
        const ItemList = ref([]);

        const goToModels = (BrandName) => {
            const api = "https://localhost:44335/api/Models/GetModelsByBrand?brand=" + BrandName;
            store.commit("setApi", api)
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    store.commit("setItemList", data)
                    store.commit("setItemListType", "Models")
                });
        };
        const goToCars = (ModelName) => {
            const api = "https://localhost:44335/api/Cars/GetCarsByModel?model=" + ModelName;
            store.commit("setApi", api)
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    store.commit("setItemList", data)
                    store.commit("setItemListType", "Cars")
                });
        };
        const goToModelsPage = (BrandName) => {
            router.push({ name: 'ModelsPage', query: { BrandName: BrandName } });
        };
        const goToCarsPage = (ModelName) => {
            router.push({ name: 'CarsPage', query: { ModelName: ModelName } });
        };
        return {
            ItemList,
            goToModelsPage,
            goToCarsPage,
            goToModels,
            goToCars
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