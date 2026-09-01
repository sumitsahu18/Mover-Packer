import express from 'express';

const router = express.Router();

//to link controller
import * as TxnController from '../controller/txn.controller.js';

router.post('/save',TxnController.save);


export default router;