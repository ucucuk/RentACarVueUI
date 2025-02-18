import { createRouter, createWebHashHistory, } from "vue-router";
import HomeCmp from "@/views/Home"
import store from "./store";
const routes = [
    {
        name: "HomePage",
        path: "/",
        component: HomeCmp
        // component : () => import("@/views/Home")

    },
    {
        name: "RegisterPage",
        path: "/register",
        component: () => import("@/views/Register")

    },
    {
        name: "LoginPage",
        path: "/login",
        component: () => import("@/views/Login")

    },
    {
        name: "AboutPage",
        path: "/about",
        component: () => import("@/views/About")

    },
    {
        name: "AdminPage",
        path: "/admin",
        component: () => import("@/views/Admin")

    },
    {
        name: "BrandsPage",
        path: "/brands",
        component: () => import("@/views/Brands")

    },
    {
        name: "ModelsPage",
        path: "/models",
        component: () => import("@/views/Models")

    },
    {
        name: "CarsPage",
        path: "/cars",
        component: () => import("@/views/Cars")

    },
    {
        name: "NewBrand",
        path: "/newbrand",
        component: () => import("@/views/NewBrand")

    },
    {
        name: "NewModel",
        path: "/newmodel",
        component: () => import("@/views/NewModel")

    },
    {
        name: "NewCar",
        path: "/newcar",
        component: () => import("@/views/NewCar")

    },
]
const router = createRouter({
    routes: routes,
    // routes,
    history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
    const authRequiredRoutes = ["HomePage"];
    const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
    const _isAuthenticated = store.getters._isAuthenticated;
    // console.log(to, from);
    if (authNotRequiredRoutes.indexOf(to.name) > -1) {
        if (_isAuthenticated) {
            console.log("1111111111"+to.name);

            next(false);
        }
        console.log("2222222222222222"+to.name);
    }
    if (authRequiredRoutes.indexOf(to.name) > -1) {
        if (_isAuthenticated) {
            next();
            console.log("3333333333"+to.name);

        }
        else {
            next({ name: "LoginPage" });
            console.log("4444444444444"+to.name);

        }
    }
    else {
        next();
        console.log("55555555555555"+to.name);

    }
})
export default router;