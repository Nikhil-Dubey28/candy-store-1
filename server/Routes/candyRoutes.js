const express = require('express');

const router = express.Router()

const candyController = require('../controller/candyController')


// post  route
router.post('/candy',candyController.createCandy)

//get route 
router.get('/candy',candyController.getCandy)

//get by id : 
router.get('/candy/:id', candyController.getCandyById);


// delete route 
router.delete('/candy/:id',candyController.deleteCandy)

//edit route 
router.put('/candy/:id',candyController.editCandy)
// buy route
router.put('/candy/:id/buy',candyController.buyCandy)



module.exports = router;
