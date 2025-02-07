<template>
    <div>
        <div class="p-2 grid grid-cols-8 gap-4">
            <ItemListItem v-for="item in ItemList" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<script>
import ItemListItem from './ItemListItem.vue';
export default {
    components: {
        ItemListItem
    },
    props: {
        ItemList: {
            type: Array,
            required: true,
            default: () => []
        }
    }
};
</script>
