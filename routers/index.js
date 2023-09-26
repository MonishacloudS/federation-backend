const router = require('express').Router();
const leaderShipRouter = require('../controllers/LeaderShipController');
const JoinusRouter = require('../controllers/JoinUsController')


// LeaderShip Application routers

router.post('/new-application', leaderShipRouter.leaderApplication);
router.get('/get-all-applications',leaderShipRouter.getAllApplications);
router.post('/new-leader', leaderShipRouter.newLeader );
router.get('/leaders', leaderShipRouter.getAllLeaders);
router.get('/filter-leaders', leaderShipRouter.filterLeaders );
router.post('/suspend-leader', leaderShipRouter.suspendLeader);
router.post('/remove-leader', leaderShipRouter.removeLeaders);


//members
router.post('/new-member',JoinusRouter.joinUsMember);

router.put('/member-approval/:id',JoinusRouter.updateApproval);

router.get('/get-all-new-members',JoinusRouter.getAllNewMember);

router.get('/get-all-existing-member',JoinusRouter.getAllExistingMember);

router.put('/suspend-user/:id',JoinusRouter.suspendUser);




module.exports = router;