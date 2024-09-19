import { Router } from "express";
import { storeController } from "./storeDI";

const router = Router();

router.post("/stores", (req, res) => storeController.createStore(req, res));
router.get("/stores/:uuid", (req, res) =>
  storeController.getStoreByUuid(req, res)
);
router.get("/stores/name/:name", (req, res) =>
  storeController.getStoreByName(req, res)
);
router.put("/stores/:uuid", (req, res) =>
  storeController.updateStore(req, res)
);
router.patch("/stores/:uuid", (req, res) =>
  storeController.patchStore(req, res)
);
router.delete("/stores/:uuid", (req, res) =>
  storeController.deleteStore(req, res)
);

export default router;
