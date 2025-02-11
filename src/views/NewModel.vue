<template>
    <div class="jumbotron mt-2 form-area ">
        <appHeader />
        <div class="form-area card border p-2">
            <div class="mb-3">
                <label for="brandName" class="form-label">Brand</label>
                <input type="text" v-model="userData.brandName" class="form-control" id="brandName"
                    placeholder="Please enter a brand..">
            </div>
            <div class="mb-3">
                <label for="model" class="form-label">Model</label>
                <input type="text" v-model="userData.name" class="form-control" id="model"
                    placeholder="Please enter a model..">
            </div>
            <div class="d-flex justify-content-end align-items-center">
                <button class="btn btn-sm btn-secondary me-2"
                    @click="$router.push({ name: 'ModelsPage' })">Cancel</button>
                <button class="btn btn-sm btn-primary" @click="newmodelfunc()">Save</button>
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
                brandName: null,
                name: null
            }
        }
    },
    methods: {
        onSave() {
            console.log(this.userData);
        },
        newmodelfunc() {
            fetch("https://localhost:44335/api/Models", {
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
                    this.$router.push({ name: 'ModelsPage' });
                    this.userData = null;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    }

}
</script>