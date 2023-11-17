import { Router } from 'express';

const router = Router();

router.get("/",async(req,res)=>{    
    res.status(200).render("home")
})

router.get("/realTimeProducts",async(req,res)=>{
    res.status(200).render("realTimeProducts")
})

export default router