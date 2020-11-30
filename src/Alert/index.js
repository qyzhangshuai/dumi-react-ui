"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prefixCls = 'happy-alert';
const kinds = {
    info: '#5352ED',
    positive: '#2ED573',
    negative: '#FF4757',
    warning: '#FFA502',
};
const Alert = ({ children, kind = 'info', ...rest }) => (react_1.default.createElement("div", Object.assign({ className: prefixCls, style: {
        background: kinds[kind],
    } }, rest), children));
exports.default = Alert;
