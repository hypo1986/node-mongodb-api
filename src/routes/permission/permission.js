/**
 * Created by likaihua on 2017-5-23 11:20.
 */
const express = require('express');
const router = express.Router();
const permissionCtrl = require('../../controllers').permission.permission;

router.get('/getRolePermission', permissionCtrl.getRolePermission);
router.get('/getUserPermission', permissionCtrl.getUserPermission);
router.post('/assignPermission', permissionCtrl.assignPermission);

module.exports = router;
