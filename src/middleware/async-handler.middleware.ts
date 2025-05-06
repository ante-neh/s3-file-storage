import { Response, Request, NextFunction } from 'express' 

const asyncAwaitHandler = (fn:any)=>(req: Request, res: Response, next: NextFunction)=>{
    return Promise.resolve(fn(req, res)).catch(next)
} 

export default asyncAwaitHandler;