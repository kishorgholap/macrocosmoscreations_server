const express=require ('express');
const userLogin = require('../Controller/loginController');
const getEmployee = require('../Controller/getEmployeeController');
const authToken = require('../Middleware/auth');
const createSchedule = require('../Controller/scheduleController');
const router=express.Router();


router.post('/login',userLogin);
router.get('/getemployee',authToken,getEmployee);
router.post('/schedule',createSchedule)

module.exports=  router;