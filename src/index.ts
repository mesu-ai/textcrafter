// import './styles/editor.css';
// export {default as Editor} from './components/Editor';
// export {default as Toolbar} from './components/Toolbar';

// Import Styles
import './styles/editor.css';

// Import Components
import Editor, { EditorProps } from './components/Editor';
import Toolbar, { ToolbarProps } from './components/Toolbar';

// Named Exports
export { Editor, Toolbar };
export type { EditorProps, ToolbarProps };

// Default Export
export default {
  Editor,
  Toolbar,
};


