import { FC } from 'react';
import '../styles/editor.css';
interface EditorProps {
    value: string;
    onChange: (content: string) => void;
}
declare const Editor: FC<EditorProps>;
export default Editor;
