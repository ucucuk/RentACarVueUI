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
                    <th>{{ baslik }}</th>
                    <th></th>
                    <th></th>
                    <th>
                        <button class="btn btn-primary btn-sm" @click="$router.push({ name: 'RegisterPage' })">+ Add
                            User
                        </button>
                    </th>
                </tr>
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
                <tr v-for="(u, index) in users" :key="u.id"
                    :class="{ 'table-warning': u === duzenlenenUser || u === silinenUser }">
                    <td scope="row">{{ index + 1 }}</td>
                    <td><span>{{ u.userName }}</span></td>

                    <td><span>{{ u.firstName }}</span></td>

                    <td><span>{{ u.lastName }}</span></td>
                    <td>
                        <input v-if="u === duzenlenenUser" v-model="duzenlenenUser.roles">
                        <span v-else>{{ u.roles }}</span>
                    </td>
                    <div v-if="u === duzenlenenUser">
                        <td>
                            <button class="btn btn-sm btn-success" @click="duzenlenenUser = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="duzenleUserfunc(duzenlenenUser)">Save</button>
                        </td>
                    </div>
                    <div v-else-if="u === silinenUser">
                        <td>
                            <button class="btn btn-sm btn-success" @click="silinenUser = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="usersilfunc(u)">Yes Delete</button>
                        </td>
                    </div>
                    <div v-else>
                        <td>
                            <button class="btn btn-sm btn-info" @click="duzenlenenUser = u">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="silinenUser = u">Delete</button>
                        </td>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="blue" @click="goBack">Back</button>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const users = ref([]);
        const baslik = ref("Users");
        const yeniUser = ref("");
        const duzenlenenUser = ref(null);
        const silinenUser = ref(null);
        const api = ref("");
        // const duzenleModel= ref({ id: "", name: "", });
        return {
            users,
            baslik,
            yeniUser,
            duzenlenenUser,
            silinenUser,
            api
            // duzenleModel,
        };
    },
    created() {
        // console.log(this.$route);
        this.listele();
    },
    methods: {
        goBack() {
            // alert();
            this.$router.push("/");
        },
        listele() {
            this.api = "https://localhost:44335/api/Users";
            console.log(this.api);
            fetch(this.api)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.users = data;
                });
        },
        usersilfunc(user) {
            console.log(user.id);
            fetch("https://localhost:44335/api/Users/" + user.id, {
                method: 'DELETE',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then(data => {
                    console.log('Success:', data);
                    // if (data.status == 200) {
                    //     this.models = this.models.filter(m => m.id != model.id);
                    // }
                    this.listele();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.silinenUser = null;
        },
        duzenleUserfunc(duzenlenenUser) {
            const request = { userName : duzenlenenUser.userName , roles : duzenlenenUser.roles};
            fetch("https://localhost:44335/api/Users/UpdateRoles", {
                method: 'POST',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(request)
            })
                .then(data => {
                    console.log('Success:', data);
                    console.log('request:', request);
                    this.listele();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.duzenlenenUser = null;
        },
    },
};
</script>
