const cases = require('./cases.json')
const caseMaterials = require('./case-materials.json')
const caseMaterialsGenerateDocuments = require('./case-materials-generate-documents.json')
const disclosureStatuses = require('./disclosure-statuses.json')
const disclosureNonSensitiveRows = require('./disclosure-non-sensitive-rows.json')
const disclosureSensitiveRows = require('./disclosure-sensitive-rows.json')
const disclosureNoLongerRelevantRows = require('./disclosure-no-longer-relevant-rows.json')
const countsData = require('./case-indictments.json')
const chargeLibrary = require('./charge-library.json')

module.exports = {
    caseSort: 'Name',
    taskSort: 'Due date',
    caseMaterials,
    caseMaterialsGenerateDocuments,
    disclosureStatuses,
    disclosureNonSensitiveRows,
    disclosureSensitiveRows,
    disclosureNoLongerRelevantRows,
    countsData,
    chargeLibrary,

    // Legacy data used in some "Case materials" pages
    cases,
    current_version: "1.0",

    // ✅ NEW: rows generated when CPS marks Evidence as "unused non-sensitive"
    disclosureAssessedUnusedRows: []
}

