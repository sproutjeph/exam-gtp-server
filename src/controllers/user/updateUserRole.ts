//update user role by admin only

import { CatchAsyncError } from "@/middleware/catchAsyncErrors";
import { updateUserRoleService } from "@/services/user.services";
import { BadRequestError } from "@/utils/ErrorHandler";
import { Request, Response } from "express";

export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  }
);
