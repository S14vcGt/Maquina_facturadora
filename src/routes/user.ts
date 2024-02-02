import { Router, Request, Response } from "express";
//* rutas principales, que vienen del loggin
const userRouter = Router();

userRouter.get('/',(_req:Request, res:Response)=>{
    res.send('pagina de usuario completa')
})//?sera que uso el all y hago todo ahi directamente?

userRouter.post('/newUser:cedula',(_req:Request, res:Response)=>{
    res.send('nuevo usuario')
})

userRouter.post('/newFatura:TodasLasVariables',(_req:Request, res:Response)=>{
    res.send('nueva factura')
})

export default userRouter