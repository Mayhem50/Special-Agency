import { Router } from "express";
import { getAllTranslations, getTranslationElement } from "../../../../models/translation.js";
import { failResponse, successResponse } from "../../../../utils/express-response.js";

const router = Router();

router.get("/translation", function (req, res) {
  console.log("Get translation");
  getAllTranslations()
    .then((translations) => successResponse(req, res, translations))
    .catch(() => failResponse(req, res, 500));
});

router.get("/translation/:lang/:element", function (req, res) {
  console.log("Get element translation");
  getTranslationElement(req.params.element, req.params.lang)
    .then((translation) => successResponse(req, res, translation))
    .catch(() => failResponse(req, res, 500));
});

export default router;
