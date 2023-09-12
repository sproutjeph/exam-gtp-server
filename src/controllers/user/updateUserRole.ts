//update user role by admin only

import { Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { BadRequestError } from "../../utils/ErrorHandler";
import { updateUserRoleService } from "../../services/user.services";

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
