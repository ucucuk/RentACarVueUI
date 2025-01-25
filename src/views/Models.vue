<template>
    <!-- <h1>{{ $route.params.userID }}</h1>
    <h1>{{ $route.query.userid }}</h1>
    <h1>{{ $route.query.user }}</h1>
    <h1>{{ $route.query.type }}</h1>
    <p>Açıklamalar burada yer alacaktır.</p> -->
    <div class="jumbotron mt-2 form-area ">
        <table class="table table-hover table-striped form-area border">
            <thead>
                <tr>
                    <th>{{ baslik }}</th>
                    <th></th>
                    <th></th>
                    <th>
                        <button class="btn btn-primary btn-sm" @click="$router.push({ name: 'NewModel' })">+ Add Model
                        </button>
                    </th>
                </tr>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(m, index) in models" :key="m.id"
                    :class="{ 'table-warning': m === duzenlenenModel || m === silinenModel }">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>
                        <span>{{ m.brand?.name }}</span>
                    </td>
                    <td>
                        <input v-if="m === duzenlenenModel" v-model="duzenlenenModel.name">
                        <span v-else>{{ m.name }}</span>
                    </td>
                    <div v-if="m === duzenlenenModel">
                        <td>
                            <button class="btn btn-sm btn-success" @click="duzenlenenModel = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger"
                                @click="duzenlemodelfunc(duzenlenenModel)">Save</button>
                        </td>
                    </div>
                    <div v-else-if="m === silinenModel">
                        <td>
                            <button class="btn btn-sm btn-success" @click="silinenModel = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="modelsilfunc(m)">Yes Delete</button>
                        </td>
                    </div>
                    <div v-else>
                        <td>
                            <button class="btn btn-sm btn-info" @click="duzenlenenModel = m">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="silinenModel = m">Delete</button>
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
        const models = ref([]);
        const baslik = ref("Models");
        const gorunsun = ref(true);
        const olussun = ref(true);
        const yeniModel = ref("");
        const duzenlenenModel = ref(null);
        const silinenModel = ref(null);
        // const duzenleModel= ref({ id: "", name: "", });
        return {
            models,
            baslik,
            gorunsun,
            olussun,
            yeniModel,
            duzenlenenModel,
            silinenModel,
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
            fetch("https://localhost:44335/api/Models")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.models = data;
                });
        },
        modelsilfunc(model) {
            fetch("https://localhost:44335/api/Models/" + model.id, {
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
            this.silinenModel = null;
        },
        duzenlemodelfunc(duzenlenenModel) {
            fetch("https://localhost:44335/api/Models", {
                method: 'PUT',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(duzenlenenModel)
            })
                .then(data => {
                    console.log('Success:', data);
                    this.listele();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.duzenlenenModel = null;
        },
    },
};
</script>
