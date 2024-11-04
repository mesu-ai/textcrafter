import React,{ FC } from "react";

interface AlignLeftIconProps {
    className?: string;
    width?: number;
    height?: number;
}

const AlignLeftIcon: FC<AlignLeftIconProps> = ({ className, width = 24, height = 24 }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
        </svg>
    );
};

export default AlignLeftIcon;