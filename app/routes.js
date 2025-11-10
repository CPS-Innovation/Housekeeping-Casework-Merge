const express = require('express')
const router = new express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates

// route middleware that will happen on every request
router.use('/', (req, res, next) => {
     res.locals.currentURL = req.originalUrl; //current screen
     res.locals.prevURL = req.get('Referrer'); // previous screen
     console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
     next();
});

router.get('/version-1/1-0/A-index/find-a-case', function (req, res) {
    res.redirect('/version-1/1-0/find-a-case')
})

router.get('/version-1/1-0/A-index/case-search', function (req, res) {
    const data = req.session.data
    const caseUrnSearch = data.caseUrnSearch

    console.log(caseUrnSearch)
    res.render('version-1/1-0/A-index', {
        caseUrnSearch
    })
})

///////////////////////////////////////// New router functionality /////////////////////////////////////////

// User Research and design versions
router.use('/version-0', require('./views/version-0/_routes'))

module.exports = router