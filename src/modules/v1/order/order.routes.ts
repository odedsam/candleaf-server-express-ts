import { Router, Request, Response } from 'express';
import orderModel from './order.model';
import mongoose from 'mongoose';

const router = Router();

router.get('/:id', async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await orderModel.findById(id)
      .populate('user', 'name email avatar')
      .lean();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error: any) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
