import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";

const router = express.Router();

//
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });
    const results = hotels.map((hotel) => {
      const bookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      const hotelWithUserBookings = {
        ...hotel.toObject(),
        bookings,
      };
      return hotelWithUserBookings;
    });
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

