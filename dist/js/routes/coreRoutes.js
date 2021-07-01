"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var coreRoutes_1 = require("../controlers/coreRoutes");
var router = express_1.Router();
router.route('/')
    .get(coreRoutes_1.homePage);
exports.default = router;
//# sourceMappingURL=coreRoutes.js.map