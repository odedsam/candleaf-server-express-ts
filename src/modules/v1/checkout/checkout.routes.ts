import { RequestHandler, Router } from 'express';
import { checkoutController } from './checkout.controller';

const router = Router();

router.post('/',checkoutController as RequestHandler);

export default router;
