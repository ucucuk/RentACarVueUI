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
        name:"NewModel",
        path: "/newmodel",
        // component : HomeCmp
        component : () => import("@/views/NewModel")
        
    }
]
const router = createRouter({
    routes : routes,
    // routes,
    history : createWebHashHistory()
});

export default router;