import express from 'express'

const router = express.Router();

import * as CategoryController from '../controller/user.cat.js'

router.post('/save',CategoryController.save)
router.get('/fetch',CategoryController.fetch)
router.delete('/delete',CategoryController.deleteUserCategory)
router.patch('/update',CategoryController.update)


export default router;