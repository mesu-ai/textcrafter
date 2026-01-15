# Changelog

## [2.0.0] - 2026-01-15

### Added
- **Dark Mode & Light Mode Support**:
  - Added automatic theme detection based on system preferences (`prefers-color-scheme`).
  - Full CSS variable support for seamless theme switching between light and dark modes.
  - Improved color consistency across all editor components in both themes.

- **Image Resize Option**:
  - Added drag-to-resize functionality for images within the editor.
  - Images can now be resized while maintaining aspect ratio.
  - Enhanced visual feedback with selection indicators when image is active.

- **Customize Toolbar with Variable Colors**:
  - Introduced CSS custom properties for toolbar styling: `--textcrafter-button-bg`, `--textcrafter-button-bg-hover`, `--textcrafter-button-secondary-bg`, `--textcrafter-dropdown-bg`, `--textcrafter-border`.
  - Users can now customize toolbar appearance by overriding CSS variables in their own stylesheets.
  - Full theming support for buttons, dropdowns, and interactive elements.

### Changed
- **Link Anchoring**:
  - Improved anchor tag creation and link management for better reliability.
  - Enhanced selection behavior when inserting or editing links.

- **Image Upload Optimized**:
  - Streamlined image upload process with improved performance.
  - Better error handling for failed uploads.
  - Support for both base64 and URL-based image storage.

- **TypeScript Configuration**:
  - Updated `tsconfig.json` target from ES6 to ES2017 to support modern JavaScript features.

- **CSS Variable Structure**:
  - Refactored `index.css` to consolidate CSS variables and reduce redundancy.
  - Improved media query organization for better maintainability.

- **Utility File Naming**:
  - Renamed `caretPlace.ts` to `caret.ts` for consistency.
  - Fixed typo: `warpSelection.ts` → `wrapSelection.ts`.

- **Performance Improvements**: Overall optimization of editor and toolbar interactions.

### Fixed
- **Image Upload Option**:
  - Fixed image upload dialog not properly handling file selection.
  - Resolved issues with image deletion callback integration.

- **Active Format Issues**:
  - Fixed toolbar buttons not correctly reflecting active formatting state.
  - Improved button state detection for bold, italic, underline, and other formatting options.

- **Design Issues**:
  - Fixed image remaining selected after clicking outside the editor area.
  - Improved click handler for proper image deselection behavior.
  - Resolved CSS alignment issues in toolbar and editor components.
  - Enhanced visual consistency between light and dark modes.

---

## [1.0.0-stable-2] - 2025-05-19

### Added
- **Insert Image from Device**:  
  - Users can now upload and insert images directly from their device into the editor.

- **Link & Anchor Insertion**:  
  - Support added for inserting hyperlinks and anchor tags with improved UI and selection behavior.

### Changed
- **Image Insertion via URL**:  
  - Optimized the insertion of images from external links (e.g., `src` URLs) for better performance and reliability.

- **Color Picker Behavior**:  
  - Improved user experience for both text color (`foreColor`) and background highlight (`hiliteColor`) selection tools.

- **Table Management**:  
  - Enhanced the add/remove row and column functionality to be more stable and consistent across browsers.

- **List Handling**:  
  - Fixed issues with ordered and unordered list insertion logic to ensure predictable structure.

### Fixed
- **Toolbar Layout & Design**:  
  - Resolved multiple UI inconsistencies and alignment issues in the toolbar for a cleaner user interface.

- **Editor Selection Stability**:  
  - Fixed bugs related to text selection retention and behavior after interactions with toolbar components.

- **General Improvements**:  
  - Overall optimization of toolbar interactions and styling for smoother editing workflow.


## [1.0.0] - 2025-2-25

### Added
- **Image Management**: 
  - User can decide how to serve the image to editor, he can save direct `base64` or `image-url`.
  - External functionality added for server related work. No security risk.

- **Custom Toolbar & Editor**:
  - User can customize the toolbar and editor as per requirement.

### Changed
- **Added Latest and Oldest React Compatibility**:
  - Package can work with latest and oldest react.
  
### Fixed
- **Cursor Behavior in Symbol Insertion**:
  - Resolve some minor bugs and make it stable now.

---

## [1.0.0-beta.6] - 2024-12-12

### Added
- **Keyboard Accessibility**: 
  - Added `role="button"` and `tabIndex={0}` to interactive elements for better screen reader support and keyboard navigation.
  - Enhanced focus management with `Enter` and `Space` key activation for interactive toolbar components.

### Changed
- **HTML Table Creation**:
  - Updated table generation to use inline styles instead of CSS classes for improved portability when sharing HTML content.
  - Enhanced `addRow` and `addColumn` functionality to dynamically apply inline styles, ensuring consistent table design for all rows and columns.
  - Header cells (`<th>`) in the first row now include inline styles directly for better visibility when exported.
  
### Fixed
- **Cursor Behavior in Symbol Insertion**:
  - Resolved an issue where symbols were not inserted at the current cursor position.

---

## [1.0.0-beta.4] - 2024-12-11

### Added
- **Performance Optimization**: Improved toolbar selection responsiveness and editor performance during real-time usage.

### Changed
- **Toolbar Selection**: Updated toolbar button selection logic and resolved conflicts with form submission on click.

---

## [1.0.0-beta.2] - 2024-11-12

### Added
- **Table Functionality**: Introduced the ability to create tables with customizable rows and columns.
  - The first row is designated as the table header with a background color of `#f1f1f1`.
  - Tables are responsive; for viewports narrower than 768px, horizontal scrolling is enabled to ensure content accessibility.

### Changed
- **Table Styling**: Updated table generation to include inline styles for better consistency across different platforms.
  - Tables now have a width of 100%, collapsed borders, and a margin of 10px 0.
  - Table cells feature padding of 8px, centered text alignment, a border of 1px solid `#ddd`, and a minimum width of 80px.

---

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
