import './styles/editor.css';
import Editor, { EditorProps } from './components/Editor';
import Toolbar, { ToolbarProps } from './components/Toolbar';

// Named exports
export { Editor, Toolbar };
export type { EditorProps, ToolbarProps };

// Default export should be a single component if needed
export default Editor;
