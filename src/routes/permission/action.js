/**
 * Created by likaihua on 2017-5-22 14:25.
 */
const express = require('express');
const router = express.Router();
const actionCtrl = require('../../controllers').permission.action;

router.post('/addGroup', actionCtrl.addGroup)
router.post('/deleteGroup/:groupId', actionCtrl.deleteGroup)
router.post('/updateGroup/:groupId', actionCtrl.updateGroup)
router.get('/getGroups', actionCtrl.getGroups)
router.post('/addAction', actionCtrl.addAction)
router.post('/deleteAction/:actionId', actionCtrl.deleteAction)
router.post('/updateAction/:actionId', actionCtrl.updateAction)


module.exports = router;
