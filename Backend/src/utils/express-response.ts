import { Response, Request } from "express";

export function successResponse(req: Request, res: Response, payload?: any){
  return res.json({    
    data: payload,
    method: req.method,
    success: true,
    route: req.baseUrl + req.path
  });
}

export function failResponse(req: Request, res: Response, statusCode: number, message?: string){
  return res.status(statusCode).json({    
    method: req.method,
    success: false,
    route: req.baseUrl + req.path,
    message
  });
}