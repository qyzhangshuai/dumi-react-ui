/**
 * @description:
 * @author: zs
 * @Date: 2020-11-29 22:20:44
 * @LastEditTime: 2020-11-29 22:21:59
 * @LastEditors: zs
 */
import React from 'react';
const prefixCls = 'happy-alert';
const kinds = {
    info: '#5352ED',
    positive: '#2ED573',
    negative: '#FF4757',
    warning: '#FFA502',
};
const CC = ({ children, kind = 'info', ...rest }) => (React.createElement("div", Object.assign({ className: prefixCls, style: {
        background: kinds[kind],
    } }, rest), children));
export default CC;
//# sourceMappingURL=index.js.map