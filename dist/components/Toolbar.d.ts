import { FC } from 'react';
import '../styles/editor.css';
interface ToolbarProps {
    onCommand: (command: string, value?: string) => void;
}
declare const Toolbar: FC<ToolbarProps>;
export default Toolbar;
