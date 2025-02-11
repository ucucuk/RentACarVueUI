<template>
    <div class="jumbotron mt-2 form-area ">
        <appHeader />
        <table class="table table-hover table-striped form-area border">
            <thead>
                <tr>
                    <th>{{ baslik }}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                        <button class="btn btn-primary btn-sm" @click="$router.push({ name: 'NewCar' })">+ Add Car
                        </button>
                    </th>
                </tr>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Plate</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(c, index) in cars" :key="c.id"
                    :class="{ 'table-warning': c === editPlate || c === deletePlate }">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>
                        <span>{{ c.model?.brand?.name }}</span>
                    </td>
                    <td>
                        <span>{{ c.model?.name }}</span>
                    </td>
                    <td>
                        <input v-if="c === editPlate" v-model="editPlate.plate">
                        <span v-else>{{ c.plate }}</span>
                    </td>
                    <div v-if="c === editPlate">
                        <td>
                            <button class="btn btn-sm btn-success" @click="editPlate = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger"
                                @click="editcarfunc(editPlate)">Save</button>
                        </td>
                    </div>
                    <div v-else-if="c === deletePlate">
                        <td>
                            <button class="btn btn-sm btn-success" @click="deletePlate = null">Cancel</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="deletecarfunc(c)">Yes Delete</button>
                        </td>
                    </div>
                    <div v-else>
                        <td>
                            <button class="btn btn-sm btn-info" @click="editPlate = c">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="deletePlate = c">Delete</button>
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
        const cars = ref([]);
        const baslik = ref("Cars");
        const editPlate = ref(null);
        const deletePlate = ref(null);
        return {
            cars,
            baslik,
            editPlate,
            deletePlate,
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
            fetch("https://localhost:44335/api/Cars")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.cars = data;
                });
        },
        deletecarfunc(car) {
            fetch("https://localhost:44335/api/Cars/" + car.id, {
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
            this.deletePlate = null;
        },
        editcarfunc(editPlate) {
            fetch("https://localhost:44335/api/Cars", {
                method: 'PUT',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editPlate)
            })
                .then(data => {
                    console.log('Success:', data);
                    this.listele();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.editPlate = null;
        },
    },
};
</script>
