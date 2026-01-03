import { Request, Response } from "express";
import { publishEvent } from "../services/rabbitmq.service.js";
import { createUserEvent } from "../models/user.model.js";

const registerUser = async (req: Request, res: Response) => {
  try {
    const event = createUserEvent(req.body);
    await publishEvent(event);

    res.status(201).json({
      message: "User registered event published",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to publish user event",
    });
  }
};

export default registerUser;