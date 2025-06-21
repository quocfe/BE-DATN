import { Router } from 'express'
import userController from '../../controllers/userController'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'
import uploadCloud from '../../middleware/uploader'

const router = Router()

router.get('/profile', Middleware.verifyToken, tryCatch(userController.getProfile))
router.get('/profile/:friend_id', Middleware.verifyToken, tryCatch(userController.getProfileByUserId))

router.post(
  '/profile/update',
  Middleware.verifyToken,
  uploadCloud.fields([{ name: 'profile_picture' }, { name: 'cover_photo' }]),
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

router.get('/friend/search/:name', Middleware.verifyToken, tryCatch(userController.searchFriends))
router.get('/list', Middleware.verifyToken, tryCatch(userController.fetchAllUsers))
router.post('/change_password', Middleware.verifyToken, tryCatch(userController.changePassword))

router.get('/friends_of_friends/:friend_id', Middleware.verifyToken, tryCatch(userController.fetchAllFriendsOfFriends))

router.get('/search/histories', Middleware.verifyToken, tryCatch(userController.fetchAllSearchHistory))

router.post('/search/history/add', Middleware.verifyToken, tryCatch(userController.addNewSearchHistory))

router.delete('/search/history/delete/:target_id', Middleware.verifyToken, tryCatch(userController.deleteSearchHistory))

router.delete('/search/history/clear', Middleware.verifyToken, tryCatch(userController.clearSearchHistory))

router.get('/list/media_resource', Middleware.verifyToken, tryCatch(userController.getAllMediaResource))

router.get(
  '/list/user_media_resource/:user_id',
  Middleware.verifyToken,
  tryCatch(userController.getAllUserMediaResource)
)

export default router
