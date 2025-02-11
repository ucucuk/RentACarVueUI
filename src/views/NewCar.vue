<template>
    <div class="jumbotron mt-2 form-area ">
        <appHeader />
        <div class="form-area card border p-2">
            <div class="mb-3">
                <label for="model" class="form-label">Model</label>
                <input type="text" v-model="userData.modelName" class="form-control" id="model"
                    placeholder="Please enter a model..">
            </div>
            <div class="mb-3">
                <label for="plate" class="form-label">Plate</label>
                <input type="text" v-model="userData.plate" class="form-control" id="plate"
                    placeholder="Please enter a plate..">
            </div>
            <div class="mb-3">
                <label for="modelYear" class="form-label">Model Year</label>
                <input type="text" v-model="userData.modelYear" class="form-control" id="modelYear"
                    placeholder="Please enter a model year..">
            </div>
            <div class="d-flex justify-content-end align-items-center">
                <button class="btn btn-sm btn-secondary me-2"
                    @click="$router.push({ name: 'CarsPage' })">Cancel</button>
                <button class="btn btn-sm btn-primary" @click="newCarfunc()">Save</button>
                <!-- <button class="btn btn-sm btn-primary"  @click="$router.go(-1)">Geri Git</button> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {
            userData: {
                modelName: null,
                plate: null,
                modelYear: null,
            }
        }
    },
    methods: {
        onSave() {
            console.log(this.userData);
        },
        newCarfunc() {
            fetch("https://localhost:44335/api/Cars", {
                method: 'POST',
                headers: {
                    //'Authorization': 'Bearer ' + this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.userData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.$router.push({ name: 'CarsPage' });
                    this.userData = null;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    }

}
</script>