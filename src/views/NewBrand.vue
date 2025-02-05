<template>
    <div class="form-area card border p-2">
        <div class="mb-3">
            <label for="brandName" class="form-label">Brand</label>
            <input type="text" v-model="userData.brandName" class="form-control" id="brandName"
                placeholder="Please enter a brand..">
        </div>
        <div class="d-flex justify-content-end align-items-center">
            <button class="btn btn-sm btn-secondary me-2" @click="$router.push({ name: 'BrandsPage' })">Cancel</button>
            <button class="btn btn-sm btn-primary" @click="newBrandfunc()">Save</button>
            <!-- <button class="btn btn-sm btn-primary"  @click="$router.go(-1)">Geri Git</button> -->
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {
            userData: {
                brandName: null,
            }
        }
    },
    methods: {
        onSave() {
            console.log(this.userData);
        },
        newBrandfunc() {
            const marka = { name: this.userData.brandName };
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
                    this.brandName = null;
                    this.$router.push({ name: 'BrandsPage' });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    }

}
</script>