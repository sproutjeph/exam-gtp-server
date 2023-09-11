import { Request, Response } from "express";
import User from "../../model/user/user";

export async function saveUserToDB(req: Request, res: Response) {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      return;
    }
    const userExists = await User.findOne({ userId });
    if (userExists) {
      return;
    }
    const newUser = new User({ userId, email });
    await newUser.save();
    res.status(201).json({ message: "created", data: newUser });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to store data", error: error });
  }
}

export async function increamentApiUsage(userId: string) {
  try {
    if (!userId) {
      return;
    }

    const user = await User.findOne({ userId });
    if (user) {
      user.apiUseageCount += 1;
      await user.save();
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export async function getApiUseageCount(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    if (!userId) {
      return;
    }

    const user = await User.findOne({ userId });
    if (user) {
      const apiUseageCount = user.apiUseageCount;
      res.status(200).json({ message: "found", data: apiUseageCount });
    }
  } catch (error) {
    console.error("Can not find user:", error);
  }
}
