import { Express, Request, Response } from "express";
import {createUserHandler, } from './controller/user.controller'
import {createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler} from './controller/session.controller'
import validateResource from './middleware/validateResource'
import { createUserSchema } from "./schema/user.schema";
import {  createSessionSchema  } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

export default function(app:Express){
    app.get('/healthcheck',(req:Request, res:Response)=> res.sendStatus(200));

    //Register User
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    //Login
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler)

    //Get the user's sessions
    app.get("/api/sessions", requireUser, getUserSessionsHandler)
    
    //Logout
    app.delete("/api/sessions", requireUser, deleteSessionHandler)

}