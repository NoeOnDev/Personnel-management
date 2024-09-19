import { PostgresStoreRepository } from "./PostgresStoreRepository";
import { StoreService } from "../application/StoreService";
import { StoreController } from "./StoreController";
import { pool } from "../../config/dbConnection";

const storeRepository = new PostgresStoreRepository(pool);
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

export { storeController };
