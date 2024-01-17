import {Request, Response} from 'express'



export class BaseController {
    constructor() { }
    
    
    base = (req: Request, res: Response) => {
        const body = req.body
        res.json(body);
    } 
}