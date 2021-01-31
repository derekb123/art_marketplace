const express = require('express');
const router = express.Router();
import {getAllUsers} from '../controllers/users-controller';

router.get('/', getAllUsers);

module.exports = router;