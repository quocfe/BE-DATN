import { Router } from 'express'
import userController from '../../controllers/userController'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import uploadCloud from '../../middleware/uploader'

const router = Router()

router.get('/profile', Middleware.verifyToken, tryCatch(userController.getProfile))

<<<<<<< HEAD
router.post(
  '/profile/update',
  uploadCloud.single('file'),
=======
router.get('/profile/:friend_id', Middleware.verifyToken, tryCatch(userController.getProfileByUserId))

router.post(
  '/profile/update',
  uploadCloud.fields([{ name: 'profile_picture' }, { name: 'cover_photo' }]),
>>>>>>> 84b5a9fdec491bc704d8ea65fe6caf13b5436e3a
  Middleware.verifyToken,
  tryCatch(userController.updateProfile)
)

router.post('/sender_friend_request/:friend_id', Middleware.verifyToken, tryCatch(userController.sendFriendRequest))

router.get('/list/sent_friend_request', Middleware.verifyToken, tryCatch(userController.fetchAllSentFriendRequest))

router.get(
  '/list/received_friend_request',
  Middleware.verifyToken,
  tryCatch(userController.fetchAllReceivedFriendRequest)
)

router.post(
  '/friend/accept_friend_request/:friend_id',
  Middleware.verifyToken,
  tryCatch(userController.acceptFriendRequest)
)

router.post(
  '/friend/cancel_friend_request/:friend_id',
  Middleware.verifyToken,
  tryCatch(userController.cancelFriendRequest)
)

router.post('/friend/blocked_user/:friend_id', Middleware.verifyToken, tryCatch(userController.blockedUser))

router.post('/friend/unblocked_user/:friend_id', Middleware.verifyToken, tryCatch(userController.unblockedUser))

router.get('/friend/list/block', Middleware.verifyToken, tryCatch(userController.fetchAllListBlockUser))

router.get('/friends', Middleware.verifyToken, tryCatch(userController.fetchFriendOfUser))

router.get('/friend/search/:name', Middleware.verifyToken, tryCatch(userController.searchFriends))
<<<<<<< HEAD
=======

router.get('/list', Middleware.verifyToken, tryCatch(userController.fetchAllUsers))

router.post('/change_password', Middleware.verifyToken, tryCatch(userController.changePassword))

router.get('/friends_of_friends/:friend_id', Middleware.verifyToken, tryCatch(userController.fetchAllFriendsOfFriends))
>>>>>>> 84b5a9fdec491bc704d8ea65fe6caf13b5436e3a

export default router
