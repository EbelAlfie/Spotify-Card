import { authorizeUser } from "../api/controller/AuthController.js";

export const AuthRoute = {
    Route: "/",
    Controller: authorizeUser
}