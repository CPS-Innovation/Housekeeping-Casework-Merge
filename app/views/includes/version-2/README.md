# Legacy version-2 includes — do not use for new versions

This folder is retained for legacy route compatibility only.

It is used by the legacy templates under:

- app/views/version-2/

Those templates support the preserved legacy v2 route:

- /version-2/A-index

New isolated v2 snapshots use their own local includes under:

- app/views/versions/v2/v2-0/includes/
- app/views/versions/v2/v2-1/includes/
- app/views/versions/v2/v2-2/includes/

Do not use this folder as the basis for new versions.

Only edit files in this folder when fixing a confirmed issue in the legacy /version-2/ route journey.

Do not delete this folder until the legacy /version-2/ route has been explicitly removed.
