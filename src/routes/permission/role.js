/**
 * Created by likaihua on 2017-5-16 9:54.
 */
const express = require('express');
const router = express.Router();
const roleCtrl = require('../../controllers').permission.role;

router.post('/create', roleCtrl.addRole);
router.post('/delete/:id', roleCtrl.deleteRole);
router.post('/update/:id', roleCtrl.updateRole);
router.get('/list', roleCtrl.getRoleList);
router.get('/getUsers', roleCtrl.getUsers);
router.post('/assignRole', roleCtrl.assignRole);

module.exports = router;
