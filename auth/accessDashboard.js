const User = require('../models/User');



module.exports = function (req, res, next) {
    console.log('req.isAuthenticated()', req.isAuthenticated());

    if (req.user && req.user.role == userRole.ADMIN) {
        console.log('admin entered');
        return next();
    }

    if (req.user && req.user.role == userRole.MANAGER) {
        console.log('manager entered');
        return next();
    }

    // return res.send('Forbidden');
    return res.redirect('/site/login');

}