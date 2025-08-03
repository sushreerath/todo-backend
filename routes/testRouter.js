const express=require('express');
const {createTodoController} = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');


//router object
const router=express.Router();


//routes
// router.get('/',testingController)

router.post('/create',authMiddleware,createTodoController);

//export
module.exports=router;