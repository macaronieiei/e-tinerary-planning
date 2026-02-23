import { Router } from "express";
import { fetchNakhonPathomPlaces } from "./placesController";

const router = Router();

router.get("/fetch-nakhonpathom", fetchNakhonPathomPlaces);

export default router;