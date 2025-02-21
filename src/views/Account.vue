<template>
    <!-- <h1>{{ $route.params.userID }}</h1>
    <h1>{{ $route.query.userid }}</h1>
    <h1>{{ $route.query.user }}</h1>
    <h1>{{ $route.query.type }}</h1>
    <p>Açıklamalar burada yer alacaktır.</p> -->
    <div class="jumbotron mt-2 form-area ">
        <appHeader />
        <table class="table table-hover table-striped form-area border">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Roles</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td scope="row">{{ 1 }}</td>
                    <td><span>{{ getCurrentUser?.userName }}</span></td>

                    <td><span>{{ getCurrentUser?.firstName }}</span></td>

                    <td><span>{{ getCurrentUser?.lastName }}</span></td>
                    <td>
                        <span >{{ getCurrentUser?.roles }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="blue" @click="goBack">Back</button>
</template>

<script>
import store from "@/store";
import { computed, ref } from "vue";

export default {
    setup() {
        const user = ref(null);
        const baslik = ref("Users");
        const yeniUser = ref("");
        const duzenlenenUser = ref(null);
        const silinenUser = ref(null);
        const api = ref("");
        const getCurrentUser = computed(() => store.getters._getCurrentUser);
        return {
            user,
            baslik,
            yeniUser,
            duzenlenenUser,
            silinenUser,
            api,
            getCurrentUser
        };
    },
    created() {
    },
    methods: {
        goBack() {
            // alert();
            this.$router.push("/");
        },
       
    },
};
</script>
