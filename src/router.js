import { createRouter, createWebHashHistory,  } from "vue-router";
import HomeCmp from "@/views/Home"
const routes = [
    {
        name:"HomePage",
        path: "/",
        component : HomeCmp
        // component : () => import("@/views/Home")
        
    },
    {
        name:"RegisterPage",
        path: "/register",
        component : () => import("@/views/Register")
        
    },
    {
        name:"LoginPage",
        path: "/login",
        component : () => import("@/views/Login")
        
    },
    {
        name:"AboutPage",
        path: "/about",
        // component : HomeCmp
        component : () => import("@/views/About")
        
    },
    {
        name:"BrandsPage",
        path: "/brands",
        // component : HomeCmp
        component : () => import("@/views/Brands")
        
    },
    {
        name:"ModelsPage",
        path: "/models",
        // component : HomeCmp
        component : () => import("@/views/Models")
        
    },
    {
        name:"CarsPage",
        path: "/cars",
        // component : HomeCmp
        component : () => import("@/views/Cars")
        
    },
    {
        name:"NewModel",
        path: "/newmodel",
        // component : HomeCmp
        component : () => import("@/views/NewModel")
        
    },
    {
        name:"NewCar",
        path: "/newcar",
        // component : HomeCmp
        component : () => import("@/views/NewCar")
        
    }
]
const router = createRouter({
    routes : routes,
    // routes,
    history : createWebHashHistory()
});

export default router;