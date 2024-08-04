import { Router } from 'express';
import { tryCatch } from '../../utils/response';
import fanpageController from '../../controllers/fanpageController';
import Middleware from '../../middleware';

const router = Router();

router.post(
  '/create',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(fanpageController.createFanpage)
);

router.put(
  '/update/:fanpageId',
  Middleware.handleValidatorError,
  tryCatch(fanpageController.updateFanpage)
);

router.delete(
  '/delete/:fanpageId',
  Middleware.handleValidatorError,
  tryCatch(fanpageController.deleteFanpage)
);

router.get(
  '/detail/:fanpageId',
  Middleware.handleValidatorError,
  tryCatch(fanpageController.getFanpageDetail)
);

router.get(
  '/user/:userId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(fanpageController.getFanpagesByUserId)
);

router.get(
  '/list', 
  Middleware.handleValidatorError,
  tryCatch(fanpageController.getAllFanpages)
);

router.post(
  '/invite',
  Middleware.handleValidatorError,
  tryCatch(fanpageController.inviteMember)
);

router.post(
  '/leave/:fanpageId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(fanpageController.leaveFanpage)
);

router.post(
  '/follow/:fanpageId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(fanpageController.followFanpage)
);

router.post(
  '/unfollow/:fanpageId',
  Middleware.handleValidatorError,
  Middleware.verifyToken,
  tryCatch(fanpageController.unfollowFanpage)
);

router.get(
  '/members-all',
  Middleware.handleValidatorError,
  tryCatch(fanpageController.getAllFanpageMembers)
);

router.get(
  '/members/:fanpageId',
  Middleware.handleValidatorError,
  tryCatch(fanpageController.getFanpageMembers)
);




export default router;
