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

    }
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
        if (_isAuthenticated) next(false);

    }
    if (authRequiredRoutes.indexOf(to.name) > -1) {
        if (_isAuthenticated) next();
        else next({ name: "LoginPage" });
    }
    else {
        next();
    }
})
export default router;