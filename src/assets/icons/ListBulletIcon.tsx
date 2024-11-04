import React,{ FC } from "react";

interface ListBulletIconProps {
    className?: string;
    width?: number;
    height?: number;
}

const ListBulletIcon: FC<ListBulletIconProps> = ({ className, width = 24, height = 24 }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
        </svg>
    );
};

export default ListBulletIcon;
