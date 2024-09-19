import { Request, Response } from "express";
import { StoreService } from "../application/StoreService";

type AppError = {
  message: string;
};

export class StoreController {
  constructor(private storeService: StoreService) {}

  private isAppError(error: unknown): error is AppError {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as AppError).message === "string"
    );
  }

  public async createStore(req: Request, res: Response): Promise<void> {
    try {
      const { name, address, phone, userId } = req.body;
      const store = await this.storeService.createStore(
        name,
        address,
        phone,
        userId
      );
      res.status(201).json(store);
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getStoreByUuid(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      const store = await this.storeService.getStoreByUuid(uuid);
      if (store) {
        res.status(200).json(store);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async getStoreByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      const store = await this.storeService.getStoreByName(name);
      if (store) {
        res.status(200).json(store);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async updateStore(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.storeService.updateStore(uuid, req.body);
      const updatedStore = await this.storeService.getStoreByUuid(uuid);
      if (updatedStore) {
        res.status(200).json(updatedStore);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async patchStore(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.storeService.patchStore(uuid, req.body);
      const updatedStore = await this.storeService.getStoreByUuid(uuid);
      if (updatedStore) {
        res.status(200).json(updatedStore);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  public async deleteStore(req: Request, res: Response): Promise<void> {
    try {
      const { uuid } = req.params;
      await this.storeService.deleteStore(uuid);
      res.status(200).json({ message: "Store deleted successfully" });
    } catch (error) {
      if (this.isAppError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }
}
