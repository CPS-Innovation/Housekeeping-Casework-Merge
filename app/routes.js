const express = require('express')
const router = new express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates

// route middleware that will happen on every request
router.use('/', (req, res, next) => {
     res.locals.currentURL = req.originalUrl; //current screen
     res.locals.prevURL = req.get('Referrer'); // previous screen
     console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
     
     // Redirect old plugin-assets paths to extension-assets (fix for Home Office kit fonts)
     if (req.url.startsWith('/plugin-assets/')) {
         return res.redirect(req.url.replace('/plugin-assets/', '/extension-assets/'));
     }

     next();
});


// Set the version number from the URL chosen from the index page
router.get('/version-1/A-index', (req, res) => {

    // Assign version based on the link clicked from the index page
    const setVersion = req.query.version;

    if (setVersion) {
        req.session.data = req.session.data || {}
        req.session.data.version = setVersion
    }
    else {
        console.log("Version not set in URL");
    }

    // Use session as fallback so it survives redirects/new requests
    const version = req.query.version || req.session.data.version

    res.render('version-1/A-index', { version: version });
    console.log(`Selected version is ${version}`);
});


router.get('/version-1/A-index/find-a-case', function (req, res) {
    res.redirect('/version-1/find-a-case')
})

router.get('/version-1/A-index/case-search', function (req, res) {
    const data = req.session.data
    const caseUrnSearch = data.caseUrnSearch
    const version = data.version || '1.0'

    console.log(caseUrnSearch)
    res.render('version-1/A-index', {
        caseUrnSearch,
        version
    })
})

///////////////////////////////////////// New router functionality /////////////////////////////////////////

// User Research and design versions
router.use('/version-0', require('./views/version-0/_routes'))

module.exports = router