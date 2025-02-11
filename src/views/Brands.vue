<template>
    <!-- <h1>{{ $route.params.userID }}</h1>
    <h1>{{ $route.query.userid }}</h1>
    <h1>{{ $route.query.user }}</h1>
    <h1>{{ $route.query.type }}</h1>
    <p>Açıklamalar burada yer alacaktır.</p> -->
    <div class="jumbotron mt-2 form-area">
        <appHeader />
        <table class="table table-hover table-striped form-area border">
            <thead>
                <tr>
                    <th>{{ baslik }}</th>
                    <th>
                    <td>
                        <input type="text" v-model="yeniMarka" placeholder="Brand Name">
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="yenimarkafunc">+ Add Brand</button>
                    </td>
                    </th>
                    <th></th>
                </tr>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(b, index) in brands" :key="b.id"
                    :class="{ 'table-warning': b === duzenlenenMarka || b === silinenMarka }">
                    <td scope="row">{{ index + 1 }}</td>
                    <td class="w-50">
                        <input v-if="b === duzenlenenMarka" v-model="duzenlenenMarka.name">
                        <span v-else>{{ b.name }}</span>
                    </td>
                    <div v-if="b === duzenlenenMarka">
                        <td>
                            <button class="btn btn-sm btn-success" @click="duzenlenenMarka = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger"
                                @click="duzenlemarkafunc(duzenlenenMarka)">Save</button>
                        </td>
                    </div>
                    <div v-else-if="b === silinenMarka">
                        <td>
                            <button class="btn btn-sm btn-success" @click="silinenMarka = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="markasilfunc(b)">Yes Delete</button>
                        </td>
                    </div>
                    <div v-else>
                        <td>
                            <button class="btn btn-sm btn-info" @click="duzenlenenMarka = b">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="silinenMarka = b">Delete</button>
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
        const brands = ref([]);
        const baslik = ref("Brands");
        const gorunsun = ref(true);
        const olussun = ref(true);
        const yeniMarka = ref("");
        const duzenlenenMarka = ref(null);
        const silinenMarka = ref(null);
        return {
            brands,
            baslik,
            gorunsun,
            olussun,
            yeniMarka,
            duzenlenenMarka,
            silinenMarka,
        };
    },
    created() {
        console.log(this.$route);
        this.listele();
    },
    methods: {
        goBack() {
            // alert();
            this.$router.push("/");
        },
        listele() {
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
                    console.log("brands ", data);
                    this.brands = data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                
        },
        yenimarkafunc() {
            const marka = { name: this.yeniMarka };
            fetch("https://localhost:44335/api/Brands", {
                method: 'POST',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(marka),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.listele();
                    this.yeniMarka = "";
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        markasilfunc(brand) {
            fetch("https://localhost:44335/api/Brands/" + brand.id, {
                method: 'DELETE',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                credentials: 'include'
            })
                .then(data => {
                    console.log('Success:', data);
                    this.listele();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        duzenlemarkafunc(duzenlenenMarka) {
            fetch("https://localhost:44335/api/Brands", {
                method: 'PUT',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(duzenlenenMarka),
                credentials: 'include'
            })
                .then(data => {
                    console.log('Success:', data);
                    this.listele();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.duzenlenenMarka = null;
        },
    },
};
</script>
