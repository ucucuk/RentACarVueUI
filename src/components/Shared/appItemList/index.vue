<template>
    <div>
        <div class="p-2 grid grid-cols-8 gap-4">
            <ItemListItem v-for="item in _getItemList" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ItemListItem from './ItemListItem.vue';
export default {
    components: {
        ItemListItem,
    },
    computed: {
        ...mapGetters(["_getItemList"]),
    },
};
</script>
