# Changelog

## [1.0.0-beta.2] - 2024-11-12

### Added
- **Table Functionality**: Introduced the ability to create tables with customizable rows and columns.
  - The first row is designated as the table header with a background color of `#f1f1f1`.
  - Tables are responsive; for viewports narrower than 768px, horizontal scrolling is enabled to ensure content accessibility.

### Changed
- **Table Styling**: Updated table generation to include inline styles for better consistency across different platforms.
  - Tables now have a width of 100%, collapsed borders, and a margin of 10px 0.
  - Table cells feature padding of 8px, centered text alignment, a border of 1px solid `#ddd`, and a minimum width of 80px.

## [1.0.0-beta.1] - 2024-11-11

### Added
- New icons for text alignment and formatting in the toolbar.
- Drag and drop image upload functionality.
- Support for inserting and removing links.
- Customizable toolbar with new styling options.

### Changed
- Improved performance of the editor with large documents.
- Updated dependencies to the latest versions.
- Enhanced the user interface for better accessibility.

### Fixed
- Resolved an issue where the editor would not retain formatting after a page refresh.
- Fixed a bug causing the toolbar to disappear in certain scenarios.
- Corrected typos and formatting issues in the documentation.
