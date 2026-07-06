const express = require('express')
const router = new express.Router()

// Add your routes here - above the module.exports line

// GET SPRINT NAME - useful for relative templates

// route middleware that will happen on every request
router.use('/', (req, res, next) => {
    // Redirect old plugin-assets paths to extension-assets (fix for Home Office kit fonts)
    if (req.url.startsWith('/plugin-assets/')) {
        return res.redirect(req.url.replace('/plugin-assets/', '/extension-assets/'));
    }

    // Only log if it's not a static asset request
    const isAsset = req.url.startsWith('/public/') || 
                    req.url.startsWith('/node_modules/') || 
                    req.url.startsWith('/extension-assets/') ||
                    req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|woff|woff2|svg)$/);

    if (!isAsset) {
        res.locals.currentURL = req.originalUrl; //current screen
        res.locals.prevURL = req.get('Referrer'); // previous screen
        console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL);
    }

    next();
});


// Set the version number from the URL chosen from the index page
router.get('/version-1/A-index', (req, res) => {

    // Assign version based on the link clicked from the index page
    const setVersion = req.query.version;

    if (setVersion) {
        req.session.data = req.session.data || {}
        
        // If version is changing, reset discard banners and flags
        if (req.session.data.version && req.session.data.version !== setVersion) {
            req.session.data['discarding_material_COMPLETED'] = 'false'
            req.session.data['material_selected'] = []
            req.session.data['activeTab'] = 'materials'
            req.session.data['discard_origin'] = ''
        }
        
        req.session.data.version = setVersion
    }
    else {
        console.log("Version not set in URL");
    }

    // Use session as fallback so it survives redirects/new requests
    const version = req.query.version || (req.session.data && req.session.data.version) || '1.2';

    res.render('version-1/A-index', { version: version });

    // Clear flags after rendering so they don't persist on page reload
    if (req.session.data) {
        req.session.data['discarding_material_COMPLETED'] = 'false';
        req.session.data['update_exhibit_COMPLETED'] = 'false';
        req.session.data['update_statement_COMPLETED'] = 'false';
    }

    console.log(`Selected version is ${version}`);
});


router.get('/version-1/A-index/find-a-case', function (req, res) {
    res.redirect('/version-1/find-a-case')
})

router.get('/version-1/A-index/case-search', function (req, res) {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    const version = data.version || '1.2'

    console.log(caseUrnSearch)
    res.render('version-1/A-index', {
        caseUrnSearch,
        version
    })

    // Clear flags after rendering so they don't persist on page reload
    if (data) {
        data['discarding_material_COMPLETED'] = 'false';
        data['update_exhibit_COMPLETED'] = 'false';
        data['update_statement_COMPLETED'] = 'false';
    }
})

///////////////////////////////////////// New router functionality /////////////////////////////////////////

router.post('/version-1/B-discard_material', function (req, res) {
    const data = req.session.data;
    const version = req.query.version || data.version || '1.2'; 
    // The data is already in req.session.data due to Prototype Kit auto-storage
    // but we can explicitly ensure it if needed. 
    // Here we just want to RENDER the discard reason page, not redirect to index yet.
    res.render('version-1/B-discard_material', { version: version });
});

router.post('/version-1/A-index', function (req, res) {
    const data = req.session.data;
    const version = req.query.version || data.version || '1.2'; // Use query version as priority
    
    // Set completion flag
    if (data['update_exhibit_COMPLETED'] === 'true') {
        data['discarding_material_COMPLETED'] = 'false';
    } else if (data['update_statement_COMPLETED'] === 'true') {
        data['discarding_material_COMPLETED'] = 'false';
    } else {
        data['discarding_material_COMPLETED'] = 'true';
    }
    
    // Set a variable to indicate which tab to show on A-index
    if (data['discard_origin'] === 'communications' || data['discard_origin'] === 'comms') {
        data['activeTab'] = 'comms';
    } else {
        data['activeTab'] = 'materials';
    }
    
    // Redirect back to A-index with the version in the URL to ensure it's maintained
    res.redirect(`/version-1/A-index?version=${version}`);
});

router.get('/version-1/cancel-discard', function (req, res) {
    const data = req.session.data;
    const version = req.query.version || (data && data.version) || '1.2';

    if (data) {
        data['discarding_material_COMPLETED'] = 'false';
        data['material_selected'] = [];
        data['discard_origin'] = '';
    }

    res.redirect(`/version-1/A-index?version=${version}`);
});

router.get('/version-2/A-index/case-search', function (req, res) {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('version-2/A-index.njk', { caseUrnSearch })
})

router.get('/version-2/A-index', (req, res) => {
    // Default to '1.2' to preserve existing v2 behaviour.
    // Pass ?version=2.1 to enable the accordion variant on the Manage Materials tab.
    const version = req.query.version || '1.2';
    res.render('version-2/A-index.njk', { version });
});

// Explicit versioned routes for v2.0, v2.1 and v2.2
// These render the same template as /version-2/A-index but pass an explicit version value.

router.get('/version-2-0/A-index', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v2/v2-0/A-index.njk', { version: '2.0', caseUrnSearch });
});

router.get('/version-2-0/A-index/case-search', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v2/v2-0/A-index.njk', { version: '2.0', caseUrnSearch });
});

router.get('/version-2-1/A-index', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v2/v2-1/A-index.njk', { version: '2.1', caseUrnSearch });
});

router.get('/version-2-1/A-index/case-search', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v2/v2-1/A-index.njk', { version: '2.1', caseUrnSearch });
});

router.get('/version-2-2/A-index', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v2/v2-2/A-index.njk', { version: '2.2', caseUrnSearch });
});

router.get('/version-2-2/A-index/case-search', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v2/v2-2/A-index.njk', { version: '2.2', caseUrnSearch });
});

router.get('/version-2-2/C-reclassify', (req, res) => {
    res.render('versions/v2/v2-2/C-reclassify.njk', { version: '2.2' });
});

// Explicit isolated route for v1.2
router.get('/version-1-2/A-index', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v1/v1-2/A-index', { version: '1.2', caseUrnSearch });
});

router.get('/version-1-2/A-index/case-search', (req, res) => {
    const data = req.session.data || {}
    const caseUrnSearch = data.caseUrnSearch
    res.render('versions/v1/v1-2/A-index', { version: '1.2', caseUrnSearch });
});

router.get('/version-1-2/find-a-case', (req, res) => {
    res.render('versions/v1/v1-2/find-a-case', { version: '1.2' });
});

router.get('/version-1-2/A-index/find-a-case', (req, res) => {
    res.redirect('/version-1-2/find-a-case');
});

router.post('/version-1-2/B-discard_material', (req, res) => {
    res.render('versions/v1/v1-2/B-discard_material', { version: '1.2' });
});

router.post('/version-1-2/A-index', (req, res) => {
    const data = req.session.data;

    if (data['update_exhibit_COMPLETED'] === 'true') {
        data['discarding_material_COMPLETED'] = 'false';
    } else if (data['update_statement_COMPLETED'] === 'true') {
        data['discarding_material_COMPLETED'] = 'false';
    } else {
        data['discarding_material_COMPLETED'] = 'true';
    }

    if (data['discard_origin'] === 'communications' || data['discard_origin'] === 'comms') {
        data['activeTab'] = 'comms';
    } else {
        data['activeTab'] = 'materials';
    }

    res.redirect('/version-1-2/A-index');
});

router.get('/version-1-2/cancel-discard', (req, res) => {
    const data = req.session.data;

    if (data) {
        data['discarding_material_COMPLETED'] = 'false';
        data['material_selected'] = [];
        data['discard_origin'] = '';
    }

    res.redirect('/version-1-2/A-index');
});

router.get('/version-1-2/C-reclassify', (req, res) => {
    res.render('versions/v1/v1-2/C-reclassify', { version: '1.2' });
});

router.get('/version-1-2/update-statement', (req, res) => {
    res.render('versions/v1/v1-2/update-statement', { version: '1.2' });
});

router.get('/version-1-2/update-exhibit', (req, res) => {
    res.render('versions/v1/v1-2/update-exhibit', { version: '1.2' });
});

router.get('/version-1-2/check-update-answers', (req, res) => {
    res.render('versions/v1/v1-2/check-update-answers', { version: '1.2' });
});

// User Research and design versions
router.use('/version-0', require('./views/version-0/_routes'))

module.exports = router
