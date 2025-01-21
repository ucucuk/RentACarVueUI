<template>
    <h1>{{ $route.params.userID }}</h1>
    <h1>{{ $route.query.userid }}</h1>
    <h1>{{ $route.query.user }}</h1>
    <h1>{{ $route.query.type }}</h1>
    <h1>{{ $route.brands }}</h1>
    <p>Açıklamalar burada yer alacaktır.</p>
    <input type="text" v-model="yeniMarka" placeholder="Marka Adı">
    <button class="blue" @click="yenimarkafunc"> Ekle </button>
    <div class="jumbotron mt-5">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>{{ baslik }}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(b, index) in brands" :key="index" :class="{ 'table-warning': b === duzenlenenMarka || b === silinenMarka}">
                    <td class="w-50">
                        <input v-if="b === duzenlenenMarka" v-model="duzenlenenMarka.name">
                        <span v-else>{{ b.name }}</span>
                    </td>
                    <td>
                        <div v-if="b === duzenlenenMarka">
                            <span>Emin misiniz? </span>
                            <button class="blue" @click="duzenlenenMarka = null">İptal</button>
                            <button class="red" @click="duzenlemarkafunc(duzenlenenMarka)">Değişiklikleri Kaydet</button>
                        </div>
                        <div v-else-if="b === silinenMarka">
                            <button class="blue" @click="silinenMarka = null">İptal</button>
                            <button class="red" @click="markasilfunc(b)">Evet sil</button>
                        </div>
                        <div v-else>
                            <button class="green"  @click="duzenlenenMarka = b">Düzenle</button>
                            <button class="red" @click="silinenMarka = b">Sil</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="blue" @click="goBack">Geri Dön</button>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const brands = ref([]);
        const baslik = ref("Markalar");
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
            fetch("https://localhost:44335/api/Brands")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.brands = data;
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
				body: JSON.stringify(marka)
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
				}
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
				body: JSON.stringify(duzenlenenMarka)
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
