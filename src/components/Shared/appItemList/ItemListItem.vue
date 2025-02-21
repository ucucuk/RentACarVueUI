<template>
    <div class="bg-white flex flex-col rounded-md shadow-sm">
        <div class="text-info-emphasis flex justify-between">
            <div id="info" v-if="_getItemListType === 'Brands'">
                <div class="info-frame">
                    <h1 class="car-title"> {{ item?.name || "" }}</h1>
                    <button v-if="hasRole('admin')" class=" btn btn-outline-info" @click="goToModelsPage(item?.name)">
                        Modelleri Gör/Düzenle
                    </button>
                    <button class=" btn btn-outline-info" @click="goToModels(item?.name)">
                        Modelleri Görüntüle
                    </button>
                </div>
            </div>
            <div id="info" v-if="_getItemListType === 'Models'">
                <div class="info-frame">
                    <h1 class="car-title"> {{ item?.brand?.name || "" }}</h1>
                    <h1 class="car-title"> {{ item?.name || "" }}</h1>
                    <button v-if="hasRole('admin')" class=" btn btn-outline-info" @click="goToCarsPage(item?.name)">
                        Arabaları Gör/Düzenle
                    </button>
                    <button class=" btn btn-outline-info" @click="goToCars(item?.name)">
                        Arabaları Görüntüle
                    </button>
                </div>
            </div>
            <div id="info" v-if="_getItemListType === 'Cars'">
                <div class="info-frame">
                    <h1 class="car-title">{{ item?.model?.brand?.name || "" }}</h1>
                    <h1 class="car-title">{{ item?.model?.name || "" }}</h1>
                    <p class="car-plate">Plaka: {{ item?.plate || "" }}</p>
                    <p class="car-plate">Model Yılı:{{ item?.modelYear || "" }}</p>
                </div>
            </div>
        </div>

        <!-- <div class="bg-red-200 p-1 text-red-900 text-center text-sm">Vue.js</div>  -->
    </div>

</template>

<script>
import router from '@/router';
import store from '@/store';
import { computed, ref } from 'vue';
import { mapGetters } from 'vuex';

export default {
    setup() {
        const ItemList = ref([]);
        // Store'dan kullanıcı rollerini almak
        const userRoles = computed(() => store.getters._getCurrentUserRoles);

        // Dinamik olarak verilen birden fazla rolün olup olmadığını kontrol eden fonksiyon
        const hasRole = (role) => {
            if (!userRoles.value) return false;

            const roles = role.split(',').map((r) => r.trim());  // Virgülle ayrılmış rolleri ayırıyoruz
            return roles.some((r) => userRoles.value.includes(r));
        };

        const goToModels = (BrandName) => {
            const api = "https://localhost:44335/api/Models/GetModelsByBrand?brand=" + BrandName;
            store.commit("setApi", api)
            fetch(api, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    store.commit("setItemList", data)
                    store.commit("setItemListType", "Models")
                });
        };

        const goToCars = (ModelName) => {
            const api = "https://localhost:44335/api/Cars/GetCarsByModel?model=" + ModelName;
            store.commit("setApi", api)
            fetch(api, { credentials: 'include' })
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
            userRoles,
            goToModelsPage,
            goToCarsPage,
            goToModels,
            goToCars,
            hasRole
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
#info {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #25cad6;
}

.info-frame {
    background-color: #fff;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 99%;
}

.car-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.car-plate {
    font-size: 18px;
    color: #666;
}
</style>
