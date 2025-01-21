import { createRouter, createWebHistory } from "vue-router";
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
        path: "/hakkimda",
        // component : HomeCmp
        component : () => import("@/views/About")
        
    },
    {
        name:"DetailPage",
        path: "/detay/:userID",
        // component : HomeCmp
        component : () => import("@/views/Details")
        
    }
]
const router = createRouter({
    routes : routes,
    // routes,
    history : createWebHistory()
});

export default router;