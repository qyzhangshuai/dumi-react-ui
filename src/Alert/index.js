import React from 'react';
const prefixCls = 'happy-alert';
const kinds = {
    info: '#5352ED',
    positive: '#2ED573',
    negative: '#FF4757',
    warning: '#FFA502',
};
const Alert = ({ children, kind = 'info', ...rest }) => (React.createElement("div", Object.assign({ className: prefixCls, style: {
        background: kinds[kind],
    } }, rest), children));
export default Alert;
//# sourceMappingURL=index.js.map