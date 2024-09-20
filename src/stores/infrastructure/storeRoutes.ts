import { Router } from "express";
import { storeController } from "./storeDI";

const router = Router();

router.post("/stores", storeController.createStore.bind(storeController));
router.get("/stores", storeController.getAllStores.bind(storeController));
router.get(
  "/stores/:uuid",
  storeController.getStoreByUuid.bind(storeController)
);
router.get(
  "/stores/name/:name",
  storeController.getStoreByName.bind(storeController)
);
router.put("/stores/:uuid", storeController.updateStore.bind(storeController));
router.patch("/stores/:uuid", storeController.patchStore.bind(storeController));
router.delete(
  "/stores/:uuid",
  storeController.deleteStore.bind(storeController)
);

export default router;
