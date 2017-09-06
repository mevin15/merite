"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function tresLongTexte() {
    var r = "";
    for (var i = 0; i < 1000; i++) {
        r = r + i.toString() + ' a ';
    }
    return r;
}
var styleCorps = {
    backgroundColor: "rgb(25, 25, 25)",
    width: "100vw",
    height: "100vh"
};
var styleColonneAdmin = {
    background: "rgb(170, 170, 170)",
    height: "calc(100vh)",
    width: "24vw",
};
var styleColonneAction = {
    background: "rgb(170, 170, 170)",
    height: "calc(100vh)",
    width: "75vw",
};
var positionColonneAction = {
    position: "fixed",
    top: 0,
    right: 0
};
var Corps = (function (_super) {
    __extends(Corps, _super);
    function Corps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Corps.prototype.render = function () {
        /*const r = <div style={styleCorps}>
            <Scrollbars style={styleColonneAdmin}>
                {tresLongTexte()}
            </Scrollbars>
            <Scrollbars style={styleColonneAction}>
                <div style={positionColonneAction}> {tresLongTexte()} </div>
            </Scrollbars>
        </div>;
        return r;*/
        /*return <div className={this.props.className}>{ tresLongTexte() }</div>; */
        /*return <Scrollbars style={{ backgroundColor: "rgb(255, 0, 0)", width: "25vw", height: "100vh" }}
        >
            {tresLongTexte()}
        </Scrollbars>;*/
        return null;
    };
    return Corps;
}(React.Component));
exports.Corps = Corps;
//# sourceMappingURL=Corps.js.map