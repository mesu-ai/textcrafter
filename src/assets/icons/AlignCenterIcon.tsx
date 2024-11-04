import React,{ FC } from "react";

interface AlignCenterIconProps {
    className?: string;
    width?: number;
    height?: number;
}

const AlignCenterIcon: FC<AlignCenterIconProps> = ({ className, width = 24, height = 24 }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z" />
        </svg>
    );
};

export default AlignCenterIcon;