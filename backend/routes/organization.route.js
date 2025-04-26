import * as organizationController from "../controllers/organization.controller.js";
import { Router } from "express";

const router = Router();

router.get("/:id", organizationController.getOrganizationNameById);

export default router;
