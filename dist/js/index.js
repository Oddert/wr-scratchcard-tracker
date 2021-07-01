"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var env = dotenv.config();
var PORT = process.env.PORT || 5000;
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use(express_1.json());
app.use(cookie_parser_1.default());
app.use(express_1.urlencoded({ extended: true }));
app.use(cors_1.default());
if (process.env.MODE === "development") {
    app.use(morgan_1.default('dev'));
}
var timestamp = Date.now().toLocaleString();
var confirmStart = function () { return console.log(timestamp + ": Server initialised on PORT " + PORT + "..."); };
var server = app.listen(PORT, confirmStart);
//# sourceMappingURL=index.js.map