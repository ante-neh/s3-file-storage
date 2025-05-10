import { Response } from "express"
export const respondWithJSON = (res: Response, status:number, payload:any)=>{
    const body = JSON.stringify(payload)
    return res.status(status).json(body)

}
