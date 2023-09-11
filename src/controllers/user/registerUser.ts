import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { ACTIVATION_SECRET } from "../../config/server.config";
import { BadRequestError } from "../../utils/ErrorHandler";
import UserModel from "../../model/user/user";
import sendEmail from "../../utils/sendMail";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import path from "path";
import ejs from "ejs";

interface IRegBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = CatchAsyncError(async function (
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      throw new BadRequestError("Email already Exist");
    }
    const user: IRegBody = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };
    console.log(activationCode);

    await ejs.renderFile(
      path.join(__dirname, "../../mails/activation-mail.ejs"),
      data
    );

    try {
      await sendEmail({
        email: user.email,
        subject: "Account Activation",
        template: "activation-mail.ejs",
        data,
      });
      res.status(201).json({
        success: true,
        message: `Please Check Your email: ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (error: any) {
      throw new BadRequestError(`${error.message}`);
    }
  } catch (error: any) {
    throw new BadRequestError(`${error.message}`);
  }
});

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(Math.random() * 10000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    ACTIVATION_SECRET as Secret,
    {
      expiresIn: "10m",
    }
  );
  return { token, activationCode };
};

// export async function increamentApiUsage(userId: string) {
//   try {
//     if (!userId) {
//       return;
//     }

//     const user = await User.findOne({ userId });
//     if (user) {
//       user.apiUseageCount += 1;
//       await user.save();
//     }
//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// }

// export async function getApiUseageCount(req: Request, res: Response) {
//   try {
//     const { userId } = req.body;
//     if (!userId) {
//       return;
//     }

//     const user = await User.findOne({ userId });
//     if (user) {
//       const apiUseageCount = user.apiUseageCount;
//       res.status(200).json({ message: "found", data: apiUseageCount });
//     }
//   } catch (error) {
//     console.error("Can not find user:", error);
//   }
// }
