<template>
    <div class="form-area card border  p-2">
        <div class="mb-3">
            <label for="brandName" class="form-label">Marka</label>
            <input type="text" v-model="userData.brandName" class="form-control" id="brandName"
                placeholder="Lütfen Marka Giriniz.">
        </div>
        <div class="mb-3">
            <label for="model" class="form-label">Model</label>
            <input type="text" v-model="userData.name" class="form-control" id="model"
                placeholder="Lütfen Model Giriniz.">
        </div>
        <div class="d-flex justify-content-end align-items-center">
            <button class="btn btn-sm btn-secondary me-2" @click="$router.push({ name: 'ModelsPage' })">İptal</button>
            <button class="btn btn-sm btn-primary" @click="yenimodelfunc()">Kaydet</button>
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
                name: null
            }
        }
    },
    methods: {
        onSave() {
            console.log(this.userData);
        },
        yenimodelfunc() {
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