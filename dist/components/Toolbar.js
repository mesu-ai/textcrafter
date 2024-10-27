import React from 'react';
const Toolbar = () => {
    return (React.createElement("div", { className: "toolbar" },
        React.createElement("button", { type: "button" }, "Bold"),
        React.createElement("button", { type: "button" }, "Italic")));
};
export default Toolbar;
