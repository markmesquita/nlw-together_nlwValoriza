import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authtoken = request.headers.authorization;

  if (!authtoken) {
    return response.status(401).end();
  }

  const [,token] = authtoken.split(" ");

  try {
    const { sub } = verify(token, "7164db1ef8013d54b966da2407603977") as IPayload;
    
    request.user_id = sub;

    return next();
    
  } catch (error) {
    console.log(error.message)
    return response.status(401).end();
  }
}