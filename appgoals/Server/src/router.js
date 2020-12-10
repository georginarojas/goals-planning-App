const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserControlller = require('./controller/userControlller');


// router.post('/login/', UserControlller.login);

router.get('/user', UserControlller.index);
router.get('/user/search', UserControlller.query);
router.get('/user/:id', UserControlller.show);
router.post('/user', UserControlller.store);

 router.get('/signin', (req, res, next) =>{
     res.render('signin');
 });

router.post('/signin', passport.authenticate('local-signin'), 
//{
    //successRedirect:'/user',
    //failureRedirect: '/signin',
    //failureFlash: true
    //failureFlash: 'Invalid username or password.' 
//}
function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
//    res.redirect('/user' + req.user.username);
    res.send(req.user);
}
//)
);



router.put('/user/:id', UserControlller.update);
router.delete('/user/:id', UserControlller.destroy);


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}


module.exports = router;