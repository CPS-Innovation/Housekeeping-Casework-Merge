# Legacy version-1 includes — do not use for new versions

This folder is retained for legacy route compatibility only.

It is used by the legacy templates under:

- app/views/version-1/

Those templates support the preserved legacy v1 routes, including:

- /version-1/A-index
- /version-1/A-index?version=1.0
- /version-1/A-index?version=1.1
- /version-1/A-index?version=1.2
- /version-1/A-index?version=1.3

New isolated v1 snapshots use their own local includes under:

- app/views/versions/v1/v1-0/includes/
- app/views/versions/v1/v1-1/includes/
- app/views/versions/v1/v1-2/includes/
- app/views/versions/v1/v1-3/includes/

Do not use this folder as the basis for new versions.

Only edit files in this folder when fixing a confirmed issue in the legacy /version-1/ route journey.

Do not delete this folder until the legacy /version-1/ routes have been explicitly removed.
