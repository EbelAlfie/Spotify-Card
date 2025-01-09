import { getLicense } from "../api/controller/LicenseController.js";

export const License = {
    Route: "/license",
    Controller: getLicense
}