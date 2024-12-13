import { authorizeUser } from "../controller/AuthController.js";

export const AuthRoute = {
    Route: "/",
    Controller: authorizeUser
}