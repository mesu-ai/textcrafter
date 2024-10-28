import React from 'react';
interface ToolbarProps {
    onCommand: (command: string, value?: string) => void;
}
declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
