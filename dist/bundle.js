/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/context/context.ts":
/*!************************************!*\
  !*** ./src/api/context/context.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = __webpack_require__(/*! constants/headers */ "./src/constants/headers.ts");
const AuthHelper_1 = __webpack_require__(/*! utils/AuthHelper */ "./src/utils/AuthHelper.ts");
const logger_1 = __webpack_require__(/*! logger */ "./src/logger/index.ts");
exports.composeContext = (contexts) => (session, currentContext, moduleSessionInfo) => contexts.reduce((acc, ctx) => (Object.assign(Object.assign({}, acc), ctx(session, currentContext, moduleSessionInfo))), {});
exports.attachCurrentUserId = (session) => {
    const authToken = session.req.headers[headers_1.default.AUTH_TOKEN];
    if (!authToken || typeof authToken !== 'string') {
        return {};
    }
    try {
        const payload = AuthHelper_1.AuthHelper.decodeJWTToken(authToken);
        if (!payload) {
            throw Error();
        }
        return { currentUserId: payload.userId };
    }
    catch (e) {
        logger_1.default.warn('Invalid JWT token');
    }
    return {};
};
exports.attachSession = (session) => ({
    req: session.req,
    res: session.res,
});


/***/ }),

/***/ "./src/api/context/index.ts":
/*!**********************************!*\
  !*** ./src/api/context/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./context */ "./src/api/context/context.ts"));


/***/ }),

/***/ "./src/api/guards/authentication.ts":
/*!******************************************!*\
  !*** ./src/api/guards/authentication.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const errors_1 = __webpack_require__(/*! constants/errors */ "./src/constants/errors.ts");
exports.authenticate = (next) => (root, args, context, info) => {
    if (!context.currentUserId) {
        throw new apollo_server_1.AuthenticationError(errors_1.default.AUTHENTICATION_ERROR);
    }
    return next(root, args, context, info);
};


/***/ }),

/***/ "./src/api/guards/authorization.ts":
/*!*****************************************!*\
  !*** ./src/api/guards/authorization.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
// Args.aquascapeId should be available
exports.authorizeAquascapeUpdate = (next) => async (root, args, context, info) => {
    if (!args.aquascapeId) {
        throw new apollo_server_1.UserInputError('No aquascape id specified');
    }
    const aquascapeRepository = context.injector.get(tokens_1.tokens.AQUASCAPE_REPOSITORY);
    const aquascape = await aquascapeRepository.getAquascapeById(args.aquascapeId);
    if (aquascape && aquascape.userId === context.currentUserId) {
        return next(root, args, context, info);
    }
    else {
        throw new apollo_server_1.AuthenticationError('Unauthorized to update the aquascape');
    }
};


/***/ }),

/***/ "./src/api/guards/index.ts":
/*!*********************************!*\
  !*** ./src/api/guards/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./validation */ "./src/api/guards/validation.ts"));
__export(__webpack_require__(/*! ./authentication */ "./src/api/guards/authentication.ts"));
__export(__webpack_require__(/*! ./authorization */ "./src/api/guards/authorization.ts"));


/***/ }),

/***/ "./src/api/guards/validation.ts":
/*!**************************************!*\
  !*** ./src/api/guards/validation.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
exports.validate = (validationSchema) => (next) => {
    return (root, args, context, info) => {
        if (!validationSchema.isValidSync(args)) {
            throw new apollo_server_1.UserInputError('Invalid data provided');
        }
        return next(root, args, context, info);
    };
};


/***/ }),

/***/ "./src/api/modules/Additive/AdditiveProvider.ts":
/*!******************************************************!*\
  !*** ./src/api/modules/Additive/AdditiveProvider.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let AdditiveProvider = class AdditiveProvider {
    constructor(AdditiveRepository) {
        this.AdditiveRepository = AdditiveRepository;
    }
    getAdditives() {
        return this.AdditiveRepository.getAdditives();
    }
};
AdditiveProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.ADDITIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AdditiveProvider);
exports.AdditiveProvider = AdditiveProvider;


/***/ }),

/***/ "./src/api/modules/Additive/index.ts":
/*!*******************************************!*\
  !*** ./src/api/modules/Additive/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const AdditiveProvider_1 = __webpack_require__(/*! api/modules/Additive/AdditiveProvider */ "./src/api/modules/Additive/AdditiveProvider.ts");
const Additive_1 = __webpack_require__(/*! db/repositories/Additive */ "./src/db/repositories/Additive.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Additive/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Additive/resolvers.ts");
exports.AdditiveModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.ADDITIVE_PROVIDER, useClass: AdditiveProvider_1.AdditiveProvider },
        { provide: tokens_1.tokens.ADDITIVE_REPOSITORY, useClass: Additive_1.AdditiveRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers
});


/***/ }),

/***/ "./src/api/modules/Additive/resolvers.ts":
/*!***********************************************!*\
  !*** ./src/api/modules/Additive/resolvers.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
exports.resolvers = {
    Query: {
        async additives(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.ADDITIVE_PROVIDER);
            return await provider.getAdditives();
        },
    },
};


/***/ }),

/***/ "./src/api/modules/Additive/schema.graphql":
/*!*************************************************!*\
  !*** ./src/api/modules/Additive/schema.graphql ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Additive implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  additives: [Additive!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n"

/***/ }),

/***/ "./src/api/modules/App/index.ts":
/*!**************************************!*\
  !*** ./src/api/modules/App/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const Aquascape_1 = __webpack_require__(/*! api/modules/Aquascape */ "./src/api/modules/Aquascape/index.ts");
const Follow_1 = __webpack_require__(/*! api/modules/Follow */ "./src/api/modules/Follow/index.ts");
const User_1 = __webpack_require__(/*! api/modules/User */ "./src/api/modules/User/index.ts");
const Auth_1 = __webpack_require__(/*! api/modules/Auth */ "./src/api/modules/Auth/index.ts");
const Light_1 = __webpack_require__(/*! api/modules/Light */ "./src/api/modules/Light/index.ts");
const Comment_1 = __webpack_require__(/*! api/modules/Comment */ "./src/api/modules/Comment/index.ts");
const Like_1 = __webpack_require__(/*! api/modules/Like */ "./src/api/modules/Like/index.ts");
const Plant_1 = __webpack_require__(/*! api/modules/Plant */ "./src/api/modules/Plant/index.ts");
const Visitor_1 = __webpack_require__(/*! api/modules/Visitor */ "./src/api/modules/Visitor/index.ts");
const Hardscape_1 = __webpack_require__(/*! api/modules/Hardscape */ "./src/api/modules/Hardscape/index.ts");
const Livestock_1 = __webpack_require__(/*! api/modules/Livestock */ "./src/api/modules/Livestock/index.ts");
const Substrate_1 = __webpack_require__(/*! api/modules/Substrate */ "./src/api/modules/Substrate/index.ts");
const Additive_1 = __webpack_require__(/*! api/modules/Additive */ "./src/api/modules/Additive/index.ts");
const Filter_1 = __webpack_require__(/*! api/modules/Filter */ "./src/api/modules/Filter/index.ts");
const Brand_1 = __webpack_require__(/*! api/modules/Brand */ "./src/api/modules/Brand/index.ts");
const Equipment_1 = __webpack_require__(/*! api/modules/Equipment */ "./src/api/modules/Equipment/index.ts");
const AquascapeImage_1 = __webpack_require__(/*! api/modules/AquascapeImage */ "./src/api/modules/AquascapeImage/index.ts");
exports.AppModule = new core_1.GraphQLModule({
    imports: [
        Comment_1.CommentModule,
        Follow_1.FollowModule,
        Light_1.LightModule,
        Aquascape_1.AquascapeModule,
        Like_1.LikeModule,
        Plant_1.PlantModule,
        Hardscape_1.HardscapeModule,
        User_1.UserModule,
        Auth_1.AuthModule,
        Visitor_1.VisitorModule,
        Livestock_1.LivestockModule,
        Substrate_1.SubstrateModule,
        Additive_1.AdditiveModule,
        Filter_1.FilterModule,
        Brand_1.BrandModule,
        Equipment_1.EquipmentModule,
        AquascapeImage_1.AquascapeImageModule,
    ],
});


/***/ }),

/***/ "./src/api/modules/Aquascape/AquascapeProvider.ts":
/*!********************************************************!*\
  !*** ./src/api/modules/Aquascape/AquascapeProvider.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const cloudinary_1 = __webpack_require__(/*! services/cloudinary */ "./src/services/cloudinary/index.ts");
const logger_1 = __webpack_require__(/*! logger */ "./src/logger/index.ts");
let AquascapeProvider = class AquascapeProvider {
    constructor(aquascapeRepository) {
        this.aquascapeRepository = aquascapeRepository;
    }
    getAquascapes(pagination, userId, random, include) {
        return this.aquascapeRepository.getAquascapes(pagination, userId, random, include);
    }
    getFeaturedAquascape(include) {
        return this.aquascapeRepository.getFeaturedAquascape(include);
    }
    getTrendingAquascapes(pagination, include) {
        return this.aquascapeRepository.getTrendingAquascapes(pagination, include);
    }
    getAquascapeById(id, include) {
        return this.aquascapeRepository.getAquascapeById(id, include);
    }
    createAquascape(userId) {
        return this.aquascapeRepository.create({ userId });
    }
    getAquascapeImages(aquascapeId) {
        return this.aquascapeRepository.getAquascapeImages(aquascapeId);
    }
    updateAquascapeTitle(aquascapeId, title) {
        return this.aquascapeRepository.updateAquascapeTitle(aquascapeId, title);
    }
    async updateAquascapeMainImage(aquascapeId, file) {
        var _a;
        const aquascape = await this.aquascapeRepository.getAquascapeById(aquascapeId);
        const { createReadStream } = await file;
        // Upload new image
        const result = await cloudinary_1.uploadStreamFile(createReadStream, cloudinary_1.imageUploadOptions.aquascapeMainImage);
        // Remove old image
        if ((_a = aquascape) === null || _a === void 0 ? void 0 : _a.mainImagePublicId) {
            cloudinary_1.deleteFile(aquascape.mainImagePublicId).catch(error => logger_1.default.error(error));
        }
        // Update main image in db
        await this.aquascapeRepository.updateAquascapeMainImage(aquascapeId, result.public_id, result.secure_url);
        return result;
    }
};
AquascapeProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.AQUASCAPE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AquascapeProvider);
exports.AquascapeProvider = AquascapeProvider;


/***/ }),

/***/ "./src/api/modules/Aquascape/index.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Aquascape/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const Aquascape_1 = __webpack_require__(/*! db/repositories/Aquascape */ "./src/db/repositories/Aquascape.ts");
const Like_1 = __webpack_require__(/*! db/repositories/Like */ "./src/db/repositories/Like.ts");
const Tag_1 = __webpack_require__(/*! db/repositories/Tag */ "./src/db/repositories/Tag.ts");
const User_1 = __webpack_require__(/*! db/repositories/User */ "./src/db/repositories/User.ts");
const UsersProvider_1 = __webpack_require__(/*! api/modules/User/UsersProvider */ "./src/api/modules/User/UsersProvider.ts");
const LikeProvider_1 = __webpack_require__(/*! api/modules/Like/LikeProvider */ "./src/api/modules/Like/LikeProvider.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const AquascapeProvider_1 = __webpack_require__(/*! ./AquascapeProvider */ "./src/api/modules/Aquascape/AquascapeProvider.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Aquascape/resolvers.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Aquascape/schema.graphql");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const User_2 = __webpack_require__(/*! api/modules/User */ "./src/api/modules/User/index.ts");
const Filter_1 = __webpack_require__(/*! api/modules/Filter */ "./src/api/modules/Filter/index.ts");
const Light_1 = __webpack_require__(/*! api/modules/Light */ "./src/api/modules/Light/index.ts");
const Plant_1 = __webpack_require__(/*! api/modules/Plant */ "./src/api/modules/Plant/index.ts");
const Hardscape_1 = __webpack_require__(/*! api/modules/Hardscape */ "./src/api/modules/Hardscape/index.ts");
const Livestock_1 = __webpack_require__(/*! api/modules/Livestock */ "./src/api/modules/Livestock/index.ts");
const Substrate_1 = __webpack_require__(/*! api/modules/Substrate */ "./src/api/modules/Substrate/index.ts");
const Additive_1 = __webpack_require__(/*! api/modules/Additive */ "./src/api/modules/Additive/index.ts");
const Like_2 = __webpack_require__(/*! api/modules/Like */ "./src/api/modules/Like/index.ts");
const AquascapeImage_1 = __webpack_require__(/*! api/modules/AquascapeImage */ "./src/api/modules/AquascapeImage/index.ts");
exports.AquascapeModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.AQUASCAPE_PROVIDER, useClass: AquascapeProvider_1.AquascapeProvider },
        { provide: tokens_1.tokens.AQUASCAPE_REPOSITORY, useClass: Aquascape_1.AquascapeRepository },
        { provide: tokens_1.tokens.USER_PROVIDER, useClass: UsersProvider_1.UsersProvider },
        { provide: tokens_1.tokens.USER_REPOSITORY, useClass: User_1.UserRepository },
        { provide: tokens_1.tokens.LIKE_PROVIDER, useClass: LikeProvider_1.LikeProvider },
        { provide: tokens_1.tokens.LIKE_REPOSITORY, useClass: Like_1.LikeRepository },
        { provide: tokens_1.tokens.TAG_REPOSITORY, useClass: Tag_1.TagRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
    imports: [
        User_2.UserModule,
        Filter_1.FilterModule,
        Light_1.LightModule,
        Plant_1.PlantModule,
        Hardscape_1.HardscapeModule,
        Livestock_1.LivestockModule,
        Substrate_1.SubstrateModule,
        Additive_1.AdditiveModule,
        Filter_1.FilterModule,
        Like_2.LikeModule,
        AquascapeImage_1.AquascapeImageModule
    ]
});


/***/ }),

/***/ "./src/api/modules/Aquascape/resolvers.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Aquascape/resolvers.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const Tag_1 = __webpack_require__(/*! db/models/Tag */ "./src/db/models/Tag.ts");
const Plant_1 = __webpack_require__(/*! db/models/Plant */ "./src/db/models/Plant.ts");
const Hardscape_1 = __webpack_require__(/*! db/models/Hardscape */ "./src/db/models/Hardscape.ts");
const Livestock_1 = __webpack_require__(/*! db/models/Livestock */ "./src/db/models/Livestock.ts");
const Filter_1 = __webpack_require__(/*! db/models/Filter */ "./src/db/models/Filter.ts");
const Light_1 = __webpack_require__(/*! db/models/Light */ "./src/db/models/Light.ts");
const CO2_1 = __webpack_require__(/*! db/models/CO2 */ "./src/db/models/CO2.ts");
const Substrate_1 = __webpack_require__(/*! db/models/Substrate */ "./src/db/models/Substrate.ts");
const Additive_1 = __webpack_require__(/*! db/models/Additive */ "./src/db/models/Additive.ts");
const Tank_1 = __webpack_require__(/*! db/models/Tank */ "./src/db/models/Tank.ts");
const AquascapeImage_1 = __webpack_require__(/*! db/models/AquascapeImage */ "./src/db/models/AquascapeImage.ts");
const GraphQLHelper_1 = __webpack_require__(/*! utils/GraphQLHelper */ "./src/utils/GraphQLHelper.ts");
const modelMapping = {
    tags: Tag_1.Tag,
    plants: Plant_1.Plant,
    hardscape: Hardscape_1.Hardscape,
    livestock: Livestock_1.Livestock,
    filters: Filter_1.Filter,
    lights: Light_1.Light,
    co2: CO2_1.CO2,
    substrates: Substrate_1.Substrate,
    additives: Additive_1.Additive,
    tank: Tank_1.Tank,
    images: AquascapeImage_1.AquascapeImage,
};
const getAquascapeJoinFields = (info) => GraphQLHelper_1.GraphQLHelper.getIncludeableFields(info, modelMapping);
exports.resolvers = {
    Query: {
        async aquascapes(root, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            return await provider.getAquascapes(args.pagination, args.userId, args.random, getAquascapeJoinFields(info));
        },
        async trendingAquascapes(root, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            return await provider.getTrendingAquascapes(args.pagination, getAquascapeJoinFields(info));
        },
        async featuredAquascape(root, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            return await provider.getFeaturedAquascape(getAquascapeJoinFields(info));
        },
        async aquascape(root, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            return await provider.getAquascapeById(args.id, getAquascapeJoinFields(info));
        },
    },
    Aquascape: {
        async user(aquascape, args, context) {
            const provider = context.injector.get(tokens_1.tokens.USER_PROVIDER);
            return await provider.findUserById(aquascape.userId);
        },
    },
    User: {
        async aquascapes(user, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            return await provider.getAquascapes(args.pagination, user.id, args.random, getAquascapeJoinFields(info));
        },
    },
    Mutation: {
        async createAquascape(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            return await provider.createAquascape(context.currentUserId);
        },
        async updateAquascapeTitle(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            const maxTitleLength = 40;
            const title = args.title.slice(0, maxTitleLength);
            await provider.updateAquascapeTitle(args.aquascapeId, title);
            return title;
        },
        async updateAquascapeMainImage(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_PROVIDER);
            const result = await provider.updateAquascapeMainImage(args.aquascapeId, args.file);
            return {
                mainImagePublicId: result.public_id,
                mainImageUrl: result.secure_url
            };
        }
    },
};
exports.resolversComposition = {
    'Mutation.createAquascape': [guards_1.authenticate],
    'Mutation.updateAquascapeTitle': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
    'Mutation.updateAquascapeMainImage': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
};


/***/ }),

/***/ "./src/api/modules/Aquascape/schema.graphql":
/*!**************************************************!*\
  !*** ./src/api/modules/Aquascape/schema.graphql ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type CO2 {\n  id: Int!\n  type: String\n  bps: Int\n}\n\ntype Tag {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n}\n\ntype Tank {\n  id: Int!\n  volume: Float\n  width: Float\n  height: Float\n  depth: Float\n  glassThickness: Float\n}\n\ntype User {\n  aquascapes(pagination: Pagination!, random: Boolean): AquascapesResult!\n}\n\ntype Aquascape {\n  id: Int!\n  createdAt: String!\n  updatedAt: String!\n  title: String\n  featured: Boolean!\n  trending: Boolean!\n  description: String\n  userId: Int!\n  user: User\n  co2: CO2\n  tank: Tank\n  mainImageUrl: String\n  mainImagePublicId: String\n  images: [AquascapeImage!]!\n  tags: [Tag!]!\n  plants: [Plant!]!\n  hardscape: [Hardscape!]!\n  livestock: [Livestock!]!\n  filters: [Filter!]!\n  lights: [Light!]!\n  substrates: [Substrate!]!\n  additives: [Additive!]!\n}\n\ninput Pagination {\n  limit: Int\n  cursor: String\n  offset: Int\n}\n\ninput AquascapesFilter {\n  trending: Boolean\n}\n\ntype AquascapesResult {\n  rows: [Aquascape!]!\n  count: Int!\n}\n\ntype Query {\n  aquascapes(pagination: Pagination!, userId: Int, random: Boolean): AquascapesResult!\n  trendingAquascapes(pagination: Pagination!): [Aquascape!]!\n  featuredAquascape: Aquascape\n  aquascape(id: Int!): Aquascape\n}\n\nscalar Upload\n\ntype MainImageUploadResult {\n  mainImagePublicId: String!\n  mainImageUrl: String!\n}\n\ntype Mutation {\n  createAquascape: Aquascape!\n  updateAquascapeTitle(aquascapeId: Int!, title: String!): String\n  updateAquascapeMainImage(aquascapeId: Int!, file: Upload!): MainImageUploadResult!\n}\n\ntype User {\n  id: Int!\n  slug: String!\n  name: String!\n  about: String\n  profileImage: String\n  profileImagePublicId: String\n  coverImage: String\n  coverImagePublicId: String\n  country: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AuthPayload {\n  token: String!\n  user: User!\n}\n\ntype ImageUploadResult {\n  imageUrl: String!\n  imagePublicId: String!\n}\n\nenum ImageVariant {\n  PROFILE\n  COVER\n}\n\ninput UserDetails {\n  name: String\n  about: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n}\n\nscalar Upload\n\ntype Query {\n  me: User\n  user(id: Int!): User\n  userBySlug(slug: String!): User\n  users: [User]!\n}\n\ntype Mutation {\n  uploadUserImage(file: Upload!, imageVariant: ImageVariant!): ImageUploadResult!\n  updateUserDetails(details: UserDetails!): [User]\n  confirmEmail(token: String!): AuthPayload\n}\n\ntype Filter implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  filters: [Filter!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Light implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  width: Float\n  height: Float\n  depth: Float\n  power: Float\n  lumenMin: Int\n  lumenMax: Int\n  kelvinMin: Int\n  kelvinMax: Int\n  dimmable: Boolean\n  description: String\n  image: String\n}\n\ntype Query {\n  lights: [Light!]!\n}\n\ntype Mutation {\n  addLight(brand: String!, model: String!, aquascapeId: Int!): Light!\n  removeLight(lightId: Int!, aquascapeId: Int!): Light\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Plant {\n  id: Int!\n  name: String!\n  description: String\n  image: String\n  origin: String\n  minHeight: Int\n  maxHeight: Int\n  position: String\n  luminosity: String\n  growthSpeed: String\n  difficulty: String\n}\n\ntype Query {\n  plants: [Plant!]!\n}\n\ntype Mutation {\n  addPlant(plantId: Int, name: String, aquascapeId: Int!): Plant!\n  removePlant(plantId: Int!, aquascapeId: Int!): Plant\n}\n\ntype Hardscape {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  hardscape: [Hardscape!]!\n}\n\ntype Mutation {\n  addHardscape(hardscapeId: Int, name: String, aquascapeId: Int!): Hardscape!\n  removeHardscape(hardscapeId: Int!, aquascapeId: Int!): Hardscape\n}\n\ntype Livestock {\n  id: Int!\n  name: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  livestock: [Livestock!]!\n}\n\ntype Mutation {\n  addLivestock(livestockId: Int, name: String, aquascapeId: Int!): Livestock!\n  removeLivestock(livestockId: Int!, aquascapeId: Int!): Livestock\n}\n\ntype Substrate implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  substrates: [Substrate!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Additive implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  additives: [Additive!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Filter implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  filters: [Filter!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Like {\n  id: Int!\n  userId: Int!\n  aquascapeImageId: Int\n  aquascapeId: Int\n  commentId: Int\n}\n\ntype Aquascape {\n  likesCount: Int!\n  isLikedByMe: Boolean!\n}\n\nenum LikeEntityType {\n  AQUASCAPE\n  IMAGE\n  COMMENT\n}\n\ntype Mutation {\n  like(entity: LikeEntityType!, entityId: Int!): Like\n  dislike(entity: LikeEntityType!, entityId: Int!): Like\n}\n\ntype AquascapeImage {\n  id: Int!\n  title: String\n  description: String\n  url: String!\n  publicId: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\nscalar Upload\n\ntype Mutation {\n  addAquascapeImage(aquascapeId: Int!, file: Upload!): AquascapeImage!\n  deleteAquascapeImage(aquascapeId: Int!, imageId: Int!): Int\n}\n\ntype Brand {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n  logo: String\n  address: String\n}\n\ntype Filter {\n  brand: Brand\n}\n\ntype Substrate {\n  brand: Brand\n}\n\ntype Additive {\n  brand: Brand\n}\n\ntype Light {\n  brand: Brand\n}\n\ninterface Equipment {\n  brand: Brand\n}\n\ntype Query {\n  brands: [Brand!]!\n}\n"

/***/ }),

/***/ "./src/api/modules/AquascapeImage/AquascapeImageProvider.ts":
/*!******************************************************************!*\
  !*** ./src/api/modules/AquascapeImage/AquascapeImageProvider.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const cloudinary_1 = __webpack_require__(/*! services/cloudinary */ "./src/services/cloudinary/index.ts");
const AquascapeImage_1 = __webpack_require__(/*! db/repositories/AquascapeImage */ "./src/db/repositories/AquascapeImage.ts");
const logger_1 = __webpack_require__(/*! logger */ "./src/logger/index.ts");
let AquascapeImageProvider = class AquascapeImageProvider {
    constructor(aquascapeImageRepository) {
        this.aquascapeImageRepository = aquascapeImageRepository;
    }
    async addAquascapeImage(aquascapeId, file) {
        const { createReadStream } = await file;
        const result = await cloudinary_1.uploadStreamFile(createReadStream, cloudinary_1.imageUploadOptions.aquascapeImage);
        return await this.aquascapeImageRepository.addImage(aquascapeId, result.public_id, result.secure_url);
    }
    async deleteAquascapeImage(aquascapeId, imageId) {
        const image = await this.aquascapeImageRepository.findOne({
            where: { aquascapeId, id: imageId },
        });
        // Image not found
        if (!image) {
            return 0;
        }
        // Remove image from cloudinary
        cloudinary_1.deleteFile(image.publicId).catch(error => logger_1.default.error(error));
        // Remove image from db
        return this.aquascapeImageRepository.removeImage(aquascapeId, imageId);
    }
};
AquascapeImageProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.AQUASCAPE_IMAGE_REPOSITORY)),
    __metadata("design:paramtypes", [AquascapeImage_1.AquascapeImageRepository])
], AquascapeImageProvider);
exports.AquascapeImageProvider = AquascapeImageProvider;


/***/ }),

/***/ "./src/api/modules/AquascapeImage/index.ts":
/*!*************************************************!*\
  !*** ./src/api/modules/AquascapeImage/index.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const AquascapeImage_1 = __webpack_require__(/*! db/repositories/AquascapeImage */ "./src/db/repositories/AquascapeImage.ts");
const Aquascape_1 = __webpack_require__(/*! db/repositories/Aquascape */ "./src/db/repositories/Aquascape.ts");
const AquascapeImageProvider_1 = __webpack_require__(/*! ./AquascapeImageProvider */ "./src/api/modules/AquascapeImage/AquascapeImageProvider.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/AquascapeImage/resolvers.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/AquascapeImage/schema.graphql");
exports.AquascapeImageModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.AQUASCAPE_REPOSITORY, useClass: Aquascape_1.AquascapeRepository },
        { provide: tokens_1.tokens.AQUASCAPE_IMAGE_PROVIDER, useClass: AquascapeImageProvider_1.AquascapeImageProvider },
        { provide: tokens_1.tokens.AQUASCAPE_IMAGE_REPOSITORY, useClass: AquascapeImage_1.AquascapeImageRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
});


/***/ }),

/***/ "./src/api/modules/AquascapeImage/resolvers.ts":
/*!*****************************************************!*\
  !*** ./src/api/modules/AquascapeImage/resolvers.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
exports.resolvers = {
    Mutation: {
        async addAquascapeImage(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_IMAGE_PROVIDER);
            return await provider.addAquascapeImage(args.aquascapeId, args.file);
        },
        async deleteAquascapeImage(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.AQUASCAPE_IMAGE_PROVIDER);
            return await provider.deleteAquascapeImage(args.aquascapeId, args.imageId);
        },
    },
};
exports.resolversComposition = {
    'Mutation.addAquascapeImage': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
    'Mutation.deleteAquascapeImage': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
};


/***/ }),

/***/ "./src/api/modules/AquascapeImage/schema.graphql":
/*!*******************************************************!*\
  !*** ./src/api/modules/AquascapeImage/schema.graphql ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type AquascapeImage {\n  id: Int!\n  title: String\n  description: String\n  url: String!\n  publicId: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\nscalar Upload\n\ntype Mutation {\n  addAquascapeImage(aquascapeId: Int!, file: Upload!): AquascapeImage!\n  deleteAquascapeImage(aquascapeId: Int!, imageId: Int!): Int\n}\n"

/***/ }),

/***/ "./src/api/modules/Auth/index.ts":
/*!***************************************!*\
  !*** ./src/api/modules/Auth/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const AuthProvider_1 = __webpack_require__(/*! api/modules/Auth/providers/AuthProvider */ "./src/api/modules/Auth/providers/AuthProvider.ts");
const resolvers_1 = __webpack_require__(/*! api/modules/Auth/resolvers */ "./src/api/modules/Auth/resolvers.ts");
const User_1 = __webpack_require__(/*! db/repositories/User */ "./src/db/repositories/User.ts");
const SocialLogin_1 = __webpack_require__(/*! db/repositories/SocialLogin */ "./src/db/repositories/SocialLogin.ts");
const typeDefs = __webpack_require__(/*! api/modules/Auth/schema.graphql */ "./src/api/modules/Auth/schema.graphql");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const User_2 = __webpack_require__(/*! api/modules/User */ "./src/api/modules/User/index.ts");
exports.AuthModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.AUTH_PROVIDER, useClass: AuthProvider_1.AuthProvider },
        { provide: tokens_1.tokens.USER_REPOSITORY, useClass: User_1.UserRepository },
        {
            provide: tokens_1.tokens.SOCIAL_LOGIN_REPOSITORY,
            useClass: SocialLogin_1.SocialLoginRepository,
        },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachSession]),
    imports: [User_2.UserModule]
});


/***/ }),

/***/ "./src/api/modules/Auth/passport/index.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Auth/passport/index.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
const passport = __webpack_require__(/*! passport */ "passport");
const FacebookTokenStrategy = __webpack_require__(/*! passport-facebook-token */ "passport-facebook-token");
const GoogleTokenStrategy = __webpack_require__(/*! passport-google-token */ "passport-google-token");
const environment_1 = __webpack_require__(/*! config/environment */ "./src/config/environment.ts");
exports.authenticateFacebook = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('facebook-token', { session: false }, (err, data, info) => {
        if (err) {
            reject(err);
        }
        resolve({ data, info });
    })(req, res);
});
exports.authenticateGoogle = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('google-token', (err, data) => {
        if (err) {
            reject(err);
        }
        resolve({ data });
    })(req, res);
});
exports.initPassport = () => {
    const FacebookTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
        accessToken,
        refreshToken,
        profile,
    });
    const GoogleTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
        accessToken,
        refreshToken,
        profile,
    });
    passport.use(new FacebookTokenStrategy({
        clientID: environment_1.default.FACEBOOK_CLIENT_ID,
        clientSecret: environment_1.default.FACEBOOK_SECRET,
    }, FacebookTokenStrategyCallback));
    passport.use(new GoogleTokenStrategy.Strategy({
        clientID: environment_1.default.GOOGLE_CLIENT_ID,
        clientSecret: environment_1.default.GOOGLE_SECRET,
    }, GoogleTokenStrategyCallback));
};


/***/ }),

/***/ "./src/api/modules/Auth/providers/AuthProvider.ts":
/*!********************************************************!*\
  !*** ./src/api/modules/Auth/providers/AuthProvider.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const slugify_1 = __webpack_require__(/*! slugify */ "slugify");
const passport_1 = __webpack_require__(/*! api/modules/Auth/passport */ "./src/api/modules/Auth/passport/index.ts");
const AuthHelper_1 = __webpack_require__(/*! utils/AuthHelper */ "./src/utils/AuthHelper.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const socialProviders_1 = __webpack_require__(/*! constants/socialProviders */ "./src/constants/socialProviders.ts");
const mail_1 = __webpack_require__(/*! services/mail/mail */ "./src/services/mail/mail.ts");
const errors_1 = __webpack_require__(/*! constants/errors */ "./src/constants/errors.ts");
let AuthProvider = class AuthProvider {
    constructor(userRepository, socialLoginRepository, emailConfirmationRepository) {
        this.userRepository = userRepository;
        this.socialLoginRepository = socialLoginRepository;
        this.emailConfirmationRepository = emailConfirmationRepository;
    }
    async userProfileSlugExists(slug) {
        return Boolean(await this.userRepository.findUserBySlug(slug));
    }
    async emailExists(email) {
        return Boolean(await this.userRepository.findUserByEmail(email));
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            raw: true,
        });
        if (!user) {
            throw new apollo_server_1.AuthenticationError(errors_1.default.INVALID_CREDENTIALS);
        }
        if (!AuthHelper_1.AuthHelper.checkPassword(password, user.password)) {
            throw new apollo_server_1.AuthenticationError(errors_1.default.INVALID_CREDENTIALS);
        }
        return { token: AuthHelper_1.AuthHelper.createAuthToken(user.id), user };
    }
    async register(email, password, name) {
        if (await this.emailExists(email)) {
            const zombieUser = await this.userRepository.findUserByEmail(email);
            const expired = await this.emailConfirmationRepository.confirmationExpired(email);
            // Zombie user is a registered user who didn't confirm his email address and confirmation expired
            if (zombieUser && !zombieUser.emailConfirmed && expired) {
                // Such user and confirmation should be destroyed
                await Promise.all([
                    zombieUser.destroy(),
                    this.emailConfirmationRepository.destroy({ where: { email } }),
                ]);
            }
            else {
                throw new apollo_server_1.UserInputError(errors_1.default.EMAIL_ALREADY_EXISTS);
            }
        }
        const user = await this.userRepository.create({
            name,
            email,
            slug: await this.generateUniqueSlug(),
            password: AuthHelper_1.AuthHelper.cryptPassword(password),
        });
        const confirmation = await this.emailConfirmationRepository.createConfirmationKey(email);
        const token = AuthHelper_1.AuthHelper.createEmailConfirmationToken(email, confirmation.code);
        await mail_1.sendConfirmationMail(email, token);
        return user;
    }
    async facebookRegister(token, req, res) {
        req.body = Object.assign(Object.assign({}, req.body), { access_token: token });
        const { data } = await passport_1.authenticateFacebook(req, res);
        if (data && data.profile) {
            return this.handleSocialLogin({
                email: data.profile.emails[0].value,
                name: data.profile.displayName,
                profileImage: data.profile.photos[0].value,
                provider: socialProviders_1.default.FACEBOOK,
                socialProfileId: data.profile.id,
            });
        }
    }
    async googleRegister(token, req, res) {
        req.body = Object.assign(Object.assign({}, req.body), { access_token: token });
        const { data } = await passport_1.authenticateGoogle(req, res);
        if (data && data.profile) {
            return this.handleSocialLogin({
                email: data.profile.emails[0].value,
                name: data.profile.displayName,
                profileImage: data.profile._json.picture,
                provider: socialProviders_1.default.GOOGLE,
                socialProfileId: data.profile.id,
            });
        }
    }
    async generateUniqueSlug(base = 'user') {
        let uniqueSlug;
        return new Promise(async (resolve) => {
            while (!uniqueSlug) {
                const randomNumber = Math.floor(Math.random() * 100000 + 1);
                const possibleSlug = `${base}${randomNumber}`;
                const slugExists = await this.userProfileSlugExists(possibleSlug);
                if (!slugExists) {
                    uniqueSlug = possibleSlug;
                    resolve(uniqueSlug);
                }
            }
        });
    }
    slugifyProfileUrl(slug) {
        return slugify_1.default(slug, { replacement: '_', lower: true });
    }
    async handleSocialLogin(data) {
        let user;
        let slug = this.slugifyProfileUrl(data.name);
        const slugExists = await this.userProfileSlugExists(slug);
        if (slugExists) {
            slug = await this.generateUniqueSlug(slug);
        }
        const userToCreate = {
            slug,
            name: data.name,
            email: data.email,
            profileImage: data.profileImage,
            emailConfirmed: true,
        };
        const social = await this.socialLoginRepository.findSocialLogin(data.socialProfileId);
        if (social) {
            user = await this.userRepository.findUserById(social.userId);
            if (!user) {
                user = await this.userRepository.create(userToCreate);
            }
            return { user, token: AuthHelper_1.AuthHelper.createAuthToken(user.id) };
        }
        else {
            user = await this.userRepository.findUserByEmail(data.email);
            if (!user) {
                user = await this.userRepository.create(userToCreate);
            }
            await this.socialLoginRepository.create({
                userId: user.id,
                socialId: data.socialProfileId,
                provider: data.provider,
            });
            return { user, token: AuthHelper_1.AuthHelper.createAuthToken(user.id) };
        }
    }
};
AuthProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.USER_REPOSITORY)),
    __param(1, di_1.Inject(tokens_1.tokens.SOCIAL_LOGIN_REPOSITORY)),
    __param(2, di_1.Inject(tokens_1.tokens.EMAIL_CONFIRMATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthProvider);
exports.AuthProvider = AuthProvider;


/***/ }),

/***/ "./src/api/modules/Auth/resolvers.ts":
/*!*******************************************!*\
  !*** ./src/api/modules/Auth/resolvers.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const validation_1 = __webpack_require__(/*! api/modules/Auth/validation */ "./src/api/modules/Auth/validation.ts");
exports.resolvers = {
    Query: {
        async userProfileSlugExists(root, args, { injector }) {
            const provider = injector.get(tokens_1.tokens.AUTH_PROVIDER);
            return await provider.userProfileSlugExists(args.slug);
        },
    },
    Mutation: {
        async login(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.AUTH_PROVIDER);
            return await provider.login(args.email, args.password);
        },
        async register(root, args, { injector }) {
            const provider = injector.get(tokens_1.tokens.AUTH_PROVIDER);
            return await provider.register(args.email, args.password, args.name);
        },
        async fbRegister(root, args, { injector, req, res }) {
            const provider = injector.get(tokens_1.tokens.AUTH_PROVIDER);
            return await provider.facebookRegister(args.token, req, res);
        },
        async googleRegister(root, args, { injector, req, res }) {
            const provider = injector.get(tokens_1.tokens.AUTH_PROVIDER);
            return await provider.googleRegister(args.token, req, res);
        },
    },
};
exports.resolversComposition = {
    'Mutation.login': [guards_1.validate(validation_1.loginValidationSchema)],
    'Mutation.register': [guards_1.validate(validation_1.registerValidationSchema)],
};


/***/ }),

/***/ "./src/api/modules/Auth/schema.graphql":
/*!*********************************************!*\
  !*** ./src/api/modules/Auth/schema.graphql ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Query {\n  userProfileSlugExists(slug: String!): Boolean\n}\n\ntype Mutation {\n  login(email: String!, password: String!): AuthPayload\n  register(email: String!, password: String!, name: String!): User\n  fbRegister(token: String!): AuthPayload\n  googleRegister(token: String!): AuthPayload\n}\n\ntype User {\n  id: Int!\n  slug: String!\n  name: String!\n  about: String\n  profileImage: String\n  profileImagePublicId: String\n  coverImage: String\n  coverImagePublicId: String\n  country: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AuthPayload {\n  token: String!\n  user: User!\n}\n\ntype ImageUploadResult {\n  imageUrl: String!\n  imagePublicId: String!\n}\n\nenum ImageVariant {\n  PROFILE\n  COVER\n}\n\ninput UserDetails {\n  name: String\n  about: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n}\n\nscalar Upload\n\ntype Query {\n  me: User\n  user(id: Int!): User\n  userBySlug(slug: String!): User\n  users: [User]!\n}\n\ntype Mutation {\n  uploadUserImage(file: Upload!, imageVariant: ImageVariant!): ImageUploadResult!\n  updateUserDetails(details: UserDetails!): [User]\n  confirmEmail(token: String!): AuthPayload\n}\n"

/***/ }),

/***/ "./src/api/modules/Auth/validation.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Auth/validation.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const yup = __webpack_require__(/*! yup */ "yup");
const PASSWORD_MIN_LENGTH = 6;
const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .email(),
    password: yup.string().required(),
});
exports.loginValidationSchema = loginValidationSchema;
const registerValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required()
        .email(),
    password: yup
        .string()
        .required()
        .min(PASSWORD_MIN_LENGTH),
});
exports.registerValidationSchema = registerValidationSchema;


/***/ }),

/***/ "./src/api/modules/Brand/BrandProvider.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Brand/BrandProvider.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let BrandProvider = class BrandProvider {
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    getBrands() {
        return this.brandRepository.getBrands();
    }
    findBrandById(id) {
        return this.brandRepository.findBrandById(id);
    }
};
BrandProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.BRAND_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], BrandProvider);
exports.BrandProvider = BrandProvider;


/***/ }),

/***/ "./src/api/modules/Brand/index.ts":
/*!****************************************!*\
  !*** ./src/api/modules/Brand/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Brand/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Brand/resolvers.ts");
const BrandProvider_1 = __webpack_require__(/*! api/modules/Brand/BrandProvider */ "./src/api/modules/Brand/BrandProvider.ts");
const Brand_1 = __webpack_require__(/*! db/repositories/Brand */ "./src/db/repositories/Brand.ts");
const Filter_1 = __webpack_require__(/*! ../Filter */ "./src/api/modules/Filter/index.ts");
const Light_1 = __webpack_require__(/*! ../Light */ "./src/api/modules/Light/index.ts");
const Substrate_1 = __webpack_require__(/*! ../Substrate */ "./src/api/modules/Substrate/index.ts");
const Additive_1 = __webpack_require__(/*! ../Additive */ "./src/api/modules/Additive/index.ts");
exports.BrandModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.BRAND_PROVIDER, useClass: BrandProvider_1.BrandProvider },
        { provide: tokens_1.tokens.BRAND_REPOSITORY, useClass: Brand_1.BrandRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    imports: [Filter_1.FilterModule, Light_1.LightModule, Substrate_1.SubstrateModule, Additive_1.AdditiveModule],
});


/***/ }),

/***/ "./src/api/modules/Brand/resolvers.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Brand/resolvers.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const resolveBrand = (root, args, context) => {
    if (!root.brandId) {
        return null;
    }
    const provider = context.injector.get(tokens_1.tokens.BRAND_PROVIDER);
    return provider.findBrandById(root.brandId);
};
exports.resolvers = {
    Query: {
        async brands(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.BRAND_PROVIDER);
            return await provider.getBrands();
        },
    },
    Filter: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context);
        },
    },
    Light: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context);
        },
    },
    Substrate: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context);
        },
    },
    Additive: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context);
        },
    },
    Equipment: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context);
        },
    },
};


/***/ }),

/***/ "./src/api/modules/Brand/schema.graphql":
/*!**********************************************!*\
  !*** ./src/api/modules/Brand/schema.graphql ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Brand {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n  logo: String\n  address: String\n}\n\ntype Filter {\n  brand: Brand\n}\n\ntype Substrate {\n  brand: Brand\n}\n\ntype Additive {\n  brand: Brand\n}\n\ntype Light {\n  brand: Brand\n}\n\ninterface Equipment {\n  brand: Brand\n}\n\ntype Query {\n  brands: [Brand!]!\n}\n"

/***/ }),

/***/ "./src/api/modules/Comment/CommentProvider.ts":
/*!****************************************************!*\
  !*** ./src/api/modules/Comment/CommentProvider.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let CommentProvider = class CommentProvider {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    getComments(entityType, entityId, include) {
        return this.commentRepository.getComments(entityType, entityId, include);
    }
    addComment(data) {
        return this.commentRepository.addComment(data);
    }
    removeComment(id, userId) {
        return this.commentRepository.removeComment(id, userId);
    }
};
CommentProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.COMMENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CommentProvider);
exports.CommentProvider = CommentProvider;


/***/ }),

/***/ "./src/api/modules/Comment/index.ts":
/*!******************************************!*\
  !*** ./src/api/modules/Comment/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const Comment_1 = __webpack_require__(/*! db/repositories/Comment */ "./src/db/repositories/Comment.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const CommentProvider_1 = __webpack_require__(/*! ./CommentProvider */ "./src/api/modules/Comment/CommentProvider.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Comment/resolvers.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Comment/schema.graphql");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const User_1 = __webpack_require__(/*! api/modules/User */ "./src/api/modules/User/index.ts");
const Aquascape_1 = __webpack_require__(/*! api/modules/Aquascape */ "./src/api/modules/Aquascape/index.ts");
const Like_1 = __webpack_require__(/*! api/modules/Like */ "./src/api/modules/Like/index.ts");
exports.CommentModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.COMMENT_PROVIDER, useClass: CommentProvider_1.CommentProvider },
        { provide: tokens_1.tokens.COMMENT_REPOSITORY, useClass: Comment_1.CommentRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId, context_1.attachSession]),
    imports: [
        User_1.UserModule,
        Aquascape_1.AquascapeModule,
        Like_1.LikeModule
    ]
});


/***/ }),

/***/ "./src/api/modules/Comment/resolvers.ts":
/*!**********************************************!*\
  !*** ./src/api/modules/Comment/resolvers.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GraphQLHelper_1 = __webpack_require__(/*! utils/GraphQLHelper */ "./src/utils/GraphQLHelper.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const Comment_1 = __webpack_require__(/*! db/repositories/Comment */ "./src/db/repositories/Comment.ts");
const Like_1 = __webpack_require__(/*! db/models/Like */ "./src/db/models/Like.ts");
const modelMapping = {
    user: User_1.User,
    likes: Like_1.Like,
};
exports.resolvers = {
    Query: {
        async comments(root, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.COMMENT_PROVIDER);
            const fields = GraphQLHelper_1.GraphQLHelper.getIncludeableFields(info, modelMapping);
            return await provider.getComments(args.entity, args.entityId, fields);
        },
    },
    Aquascape: {
        async comments(aquascape, args, context, info) {
            const provider = context.injector.get(tokens_1.tokens.COMMENT_PROVIDER);
            const fields = GraphQLHelper_1.GraphQLHelper.getIncludeableFields(info, modelMapping);
            return await provider.getComments(Comment_1.CommentEntityType.AQUASCAPE, aquascape.id, fields);
        },
    },
    Mutation: {
        async addComment(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.COMMENT_PROVIDER);
            return await provider.addComment({
                entityType: args.entity,
                entityId: args.entityId,
                userId: context.currentUserId,
                content: args.content,
                parentCommentId: args.parentCommentId,
            });
        },
        async removeComment(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.COMMENT_PROVIDER);
            return await provider.removeComment(args.id, context.currentUserId);
        },
    },
};
exports.resolversComposition = {
    'Mutation.addComment': [guards_1.authenticate],
    'Mutation.removeComment': [guards_1.authenticate],
};


/***/ }),

/***/ "./src/api/modules/Comment/schema.graphql":
/*!************************************************!*\
  !*** ./src/api/modules/Comment/schema.graphql ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Comment {\n  id: Int!\n  createdAt: String!\n  content: String!\n  parentCommentId: Int\n  likes: [Like!]!\n  user: User!\n  aquascapeImageId: Int\n  aquascapeId: Int\n  commentId: Int\n}\n\ntype Aquascape {\n  comments: [Comment!]!\n}\n\nenum CommentEntityType {\n  AQUASCAPE\n  IMAGE\n}\n\ntype Query {\n  comments(entity: CommentEntityType!, entityId: Int!, pagination: Pagination!): [Comment!]!\n}\n\ntype Mutation {\n  addComment(entity: CommentEntityType!, entityId: Int!, content: String!, parentCommentId: Int): Comment\n  removeComment(id: Int!): Comment\n}\n\ntype User {\n  id: Int!\n  slug: String!\n  name: String!\n  about: String\n  profileImage: String\n  profileImagePublicId: String\n  coverImage: String\n  coverImagePublicId: String\n  country: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AuthPayload {\n  token: String!\n  user: User!\n}\n\ntype ImageUploadResult {\n  imageUrl: String!\n  imagePublicId: String!\n}\n\nenum ImageVariant {\n  PROFILE\n  COVER\n}\n\ninput UserDetails {\n  name: String\n  about: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n}\n\nscalar Upload\n\ntype Query {\n  me: User\n  user(id: Int!): User\n  userBySlug(slug: String!): User\n  users: [User]!\n}\n\ntype Mutation {\n  uploadUserImage(file: Upload!, imageVariant: ImageVariant!): ImageUploadResult!\n  updateUserDetails(details: UserDetails!): [User]\n  confirmEmail(token: String!): AuthPayload\n}\n\ntype Like {\n  id: Int!\n  userId: Int!\n  aquascapeImageId: Int\n  aquascapeId: Int\n  commentId: Int\n}\n\ntype Aquascape {\n  likesCount: Int!\n  isLikedByMe: Boolean!\n}\n\nenum LikeEntityType {\n  AQUASCAPE\n  IMAGE\n  COMMENT\n}\n\ntype Mutation {\n  like(entity: LikeEntityType!, entityId: Int!): Like\n  dislike(entity: LikeEntityType!, entityId: Int!): Like\n}\n\ntype CO2 {\n  id: Int!\n  type: String\n  bps: Int\n}\n\ntype Tag {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n}\n\ntype Tank {\n  id: Int!\n  volume: Float\n  width: Float\n  height: Float\n  depth: Float\n  glassThickness: Float\n}\n\ntype User {\n  aquascapes(pagination: Pagination!, random: Boolean): AquascapesResult!\n}\n\ntype Aquascape {\n  id: Int!\n  createdAt: String!\n  updatedAt: String!\n  title: String\n  featured: Boolean!\n  trending: Boolean!\n  description: String\n  userId: Int!\n  user: User\n  co2: CO2\n  tank: Tank\n  mainImageUrl: String\n  mainImagePublicId: String\n  images: [AquascapeImage!]!\n  tags: [Tag!]!\n  plants: [Plant!]!\n  hardscape: [Hardscape!]!\n  livestock: [Livestock!]!\n  filters: [Filter!]!\n  lights: [Light!]!\n  substrates: [Substrate!]!\n  additives: [Additive!]!\n}\n\ninput Pagination {\n  limit: Int\n  cursor: String\n  offset: Int\n}\n\ninput AquascapesFilter {\n  trending: Boolean\n}\n\ntype AquascapesResult {\n  rows: [Aquascape!]!\n  count: Int!\n}\n\ntype Query {\n  aquascapes(pagination: Pagination!, userId: Int, random: Boolean): AquascapesResult!\n  trendingAquascapes(pagination: Pagination!): [Aquascape!]!\n  featuredAquascape: Aquascape\n  aquascape(id: Int!): Aquascape\n}\n\nscalar Upload\n\ntype MainImageUploadResult {\n  mainImagePublicId: String!\n  mainImageUrl: String!\n}\n\ntype Mutation {\n  createAquascape: Aquascape!\n  updateAquascapeTitle(aquascapeId: Int!, title: String!): String\n  updateAquascapeMainImage(aquascapeId: Int!, file: Upload!): MainImageUploadResult!\n}\n\ntype User {\n  id: Int!\n  slug: String!\n  name: String!\n  about: String\n  profileImage: String\n  profileImagePublicId: String\n  coverImage: String\n  coverImagePublicId: String\n  country: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AuthPayload {\n  token: String!\n  user: User!\n}\n\ntype ImageUploadResult {\n  imageUrl: String!\n  imagePublicId: String!\n}\n\nenum ImageVariant {\n  PROFILE\n  COVER\n}\n\ninput UserDetails {\n  name: String\n  about: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n}\n\nscalar Upload\n\ntype Query {\n  me: User\n  user(id: Int!): User\n  userBySlug(slug: String!): User\n  users: [User]!\n}\n\ntype Mutation {\n  uploadUserImage(file: Upload!, imageVariant: ImageVariant!): ImageUploadResult!\n  updateUserDetails(details: UserDetails!): [User]\n  confirmEmail(token: String!): AuthPayload\n}\n\ntype Filter implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  filters: [Filter!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Light implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  width: Float\n  height: Float\n  depth: Float\n  power: Float\n  lumenMin: Int\n  lumenMax: Int\n  kelvinMin: Int\n  kelvinMax: Int\n  dimmable: Boolean\n  description: String\n  image: String\n}\n\ntype Query {\n  lights: [Light!]!\n}\n\ntype Mutation {\n  addLight(brand: String!, model: String!, aquascapeId: Int!): Light!\n  removeLight(lightId: Int!, aquascapeId: Int!): Light\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Plant {\n  id: Int!\n  name: String!\n  description: String\n  image: String\n  origin: String\n  minHeight: Int\n  maxHeight: Int\n  position: String\n  luminosity: String\n  growthSpeed: String\n  difficulty: String\n}\n\ntype Query {\n  plants: [Plant!]!\n}\n\ntype Mutation {\n  addPlant(plantId: Int, name: String, aquascapeId: Int!): Plant!\n  removePlant(plantId: Int!, aquascapeId: Int!): Plant\n}\n\ntype Hardscape {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  hardscape: [Hardscape!]!\n}\n\ntype Mutation {\n  addHardscape(hardscapeId: Int, name: String, aquascapeId: Int!): Hardscape!\n  removeHardscape(hardscapeId: Int!, aquascapeId: Int!): Hardscape\n}\n\ntype Livestock {\n  id: Int!\n  name: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  livestock: [Livestock!]!\n}\n\ntype Mutation {\n  addLivestock(livestockId: Int, name: String, aquascapeId: Int!): Livestock!\n  removeLivestock(livestockId: Int!, aquascapeId: Int!): Livestock\n}\n\ntype Substrate implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  substrates: [Substrate!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Additive implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  additives: [Additive!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Filter implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  filters: [Filter!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n\ntype Like {\n  id: Int!\n  userId: Int!\n  aquascapeImageId: Int\n  aquascapeId: Int\n  commentId: Int\n}\n\ntype Aquascape {\n  likesCount: Int!\n  isLikedByMe: Boolean!\n}\n\nenum LikeEntityType {\n  AQUASCAPE\n  IMAGE\n  COMMENT\n}\n\ntype Mutation {\n  like(entity: LikeEntityType!, entityId: Int!): Like\n  dislike(entity: LikeEntityType!, entityId: Int!): Like\n}\n\ntype AquascapeImage {\n  id: Int!\n  title: String\n  description: String\n  url: String!\n  publicId: String!\n  createdAt: String!\n  updatedAt: String!\n}\n\nscalar Upload\n\ntype Mutation {\n  addAquascapeImage(aquascapeId: Int!, file: Upload!): AquascapeImage!\n  deleteAquascapeImage(aquascapeId: Int!, imageId: Int!): Int\n}\n\ntype Brand {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n  logo: String\n  address: String\n}\n\ntype Filter {\n  brand: Brand\n}\n\ntype Substrate {\n  brand: Brand\n}\n\ntype Additive {\n  brand: Brand\n}\n\ntype Light {\n  brand: Brand\n}\n\ninterface Equipment {\n  brand: Brand\n}\n\ntype Query {\n  brands: [Brand!]!\n}\n"

/***/ }),

/***/ "./src/api/modules/Equipment/EquipmentProvider.ts":
/*!********************************************************!*\
  !*** ./src/api/modules/Equipment/EquipmentProvider.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
let EquipmentProvider = class EquipmentProvider {
    setEquipmentRepository(repository) {
        this.equipmentRepository = repository;
    }
    setEquipmentAquascapeRepository(repository) {
        this.equipmentAquascapeRepository = repository;
    }
    addEquipment(model) {
        return this.equipmentRepository.addEquipment(model);
    }
    addEquipmentForAquascape(equipmentId, aquascapeId) {
        return this.equipmentAquascapeRepository.addEquipmentForAquascape(equipmentId, aquascapeId);
    }
    removeEquipment(id) {
        return this.equipmentRepository.removeEquipment(id);
    }
    removeEquipmentFromAquascape(equipmentId, aquascapeId) {
        return this.equipmentAquascapeRepository.removeEquipmentFromAquascape(equipmentId, aquascapeId);
    }
    findEquipmentById(id) {
        return this.equipmentRepository.findById(id);
    }
};
EquipmentProvider = __decorate([
    di_1.Injectable()
], EquipmentProvider);
exports.EquipmentProvider = EquipmentProvider;


/***/ }),

/***/ "./src/api/modules/Equipment/index.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Equipment/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Equipment/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Equipment/resolvers.ts");
const Aquascape_1 = __webpack_require__(/*! db/repositories/Aquascape */ "./src/db/repositories/Aquascape.ts");
const Filter_1 = __webpack_require__(/*! db/repositories/Filter */ "./src/db/repositories/Filter.ts");
const Light_1 = __webpack_require__(/*! db/repositories/Light */ "./src/db/repositories/Light.ts");
const Substrate_1 = __webpack_require__(/*! db/repositories/Substrate */ "./src/db/repositories/Substrate.ts");
const Additive_1 = __webpack_require__(/*! db/repositories/Additive */ "./src/db/repositories/Additive.ts");
const AquascapeFilter_1 = __webpack_require__(/*! db/repositories/AquascapeFilter */ "./src/db/repositories/AquascapeFilter.ts");
const AquascapeLight_1 = __webpack_require__(/*! db/repositories/AquascapeLight */ "./src/db/repositories/AquascapeLight.ts");
const AquascapeSubstrate_1 = __webpack_require__(/*! db/repositories/AquascapeSubstrate */ "./src/db/repositories/AquascapeSubstrate.ts");
const AquascapeAdditive_1 = __webpack_require__(/*! db/repositories/AquascapeAdditive */ "./src/db/repositories/AquascapeAdditive.ts");
const EquipmentProvider_1 = __webpack_require__(/*! ./EquipmentProvider */ "./src/api/modules/Equipment/EquipmentProvider.ts");
exports.EquipmentModule = new core_1.GraphQLModule({
    providers: [
        {
            provide: tokens_1.tokens.AQUASCAPE_REPOSITORY,
            useClass: Aquascape_1.AquascapeRepository,
        },
        { provide: tokens_1.tokens.EQUIPMENT_PROVIDER, useClass: EquipmentProvider_1.EquipmentProvider },
        { provide: tokens_1.tokens.FILTER_REPOSITORY, useClass: Filter_1.FilterRepository },
        { provide: tokens_1.tokens.LIGHT_REPOSITORY, useClass: Light_1.LightRepository },
        { provide: tokens_1.tokens.SUBSTRATE_REPOSITORY, useClass: Substrate_1.SubstrateRepository },
        { provide: tokens_1.tokens.ADDITIVE_REPOSITORY, useClass: Additive_1.AdditiveRepository },
        { provide: tokens_1.tokens.AQUASCAPE_FILTER_REPOSITORY, useClass: AquascapeFilter_1.AquascapeFilterRepository },
        { provide: tokens_1.tokens.AQUASCAPE_LIGHT_REPOSITORY, useClass: AquascapeLight_1.AquascapeLightRepository },
        { provide: tokens_1.tokens.AQUASCAPE_SUBSTRATE_REPOSITORY, useClass: AquascapeSubstrate_1.AquascapeSubstrateRepository },
        { provide: tokens_1.tokens.AQUASCAPE_ADDITIVES_REPOSITORY, useClass: AquascapeAdditive_1.AquascapeAdditiveRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
});


/***/ }),

/***/ "./src/api/modules/Equipment/resolvers.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Equipment/resolvers.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const models_1 = __webpack_require__(/*! db/models */ "./src/db/models/index.ts");
var EquipmentType;
(function (EquipmentType) {
    EquipmentType["FILTER"] = "FILTER";
    EquipmentType["SUBSTRATE"] = "SUBSTRATE";
    EquipmentType["LIGHT"] = "LIGHT";
    EquipmentType["ADDITIVES"] = "ADDITIVES";
})(EquipmentType || (EquipmentType = {}));
const equipmentRepoMapping = {
    [EquipmentType.FILTER]: tokens_1.tokens.FILTER_REPOSITORY,
    [EquipmentType.LIGHT]: tokens_1.tokens.LIGHT_REPOSITORY,
    [EquipmentType.SUBSTRATE]: tokens_1.tokens.SUBSTRATE_REPOSITORY,
    [EquipmentType.ADDITIVES]: tokens_1.tokens.ADDITIVE_REPOSITORY,
};
const equipmentAquascapeRepoMapping = {
    [EquipmentType.FILTER]: tokens_1.tokens.AQUASCAPE_FILTER_REPOSITORY,
    [EquipmentType.LIGHT]: tokens_1.tokens.AQUASCAPE_LIGHT_REPOSITORY,
    [EquipmentType.SUBSTRATE]: tokens_1.tokens.AQUASCAPE_SUBSTRATE_REPOSITORY,
    [EquipmentType.ADDITIVES]: tokens_1.tokens.AQUASCAPE_ADDITIVES_REPOSITORY,
};
const getEquipmentProvider = (root, args, context) => {
    const equipmentRepository = context.injector.get(equipmentRepoMapping[args.equipment.equipmentType]);
    const equipmentAquascapeRepository = context.injector.get(equipmentAquascapeRepoMapping[args.equipment.equipmentType]);
    if (!equipmentRepository || !equipmentAquascapeRepository) {
        throw new apollo_server_1.UserInputError('Invalid equipment type provided.');
    }
    const provider = context.injector.get(tokens_1.tokens.EQUIPMENT_PROVIDER);
    provider.setEquipmentRepository(equipmentRepository);
    provider.setEquipmentAquascapeRepository(equipmentAquascapeRepository);
    return provider;
};
exports.resolvers = {
    Equipment: {
        __resolveType(equipment, context, info) {
            if (equipment instanceof models_1.Filter) {
                return 'Filter';
            }
            if (equipment instanceof models_1.Light) {
                return 'Light';
            }
            if (equipment instanceof models_1.Substrate) {
                return 'Substrate';
            }
            if (equipment instanceof models_1.Additive) {
                return 'Additive';
            }
        },
    },
    Mutation: {
        async addEquipment(root, args, context) {
            let equipment = null;
            const provider = getEquipmentProvider(root, args, context);
            if (args.equipment.equipmentId) {
                equipment = await provider.findEquipmentById(args.equipment.equipmentId);
            }
            else if (args.equipment.name) {
                equipment = await provider.addEquipment(args.equipment.name);
            }
            if (!equipment) {
                throw new apollo_server_1.UserInputError('equipment id or equipment name is not provided');
            }
            await provider.addEquipmentForAquascape(equipment.id, args.aquascapeId);
            return equipment;
        },
        async removeEquipment(root, args, context) {
            if (!args.equipment.equipmentId) {
                throw new apollo_server_1.UserInputError('equipment id or equipment name is not provided');
            }
            const provider = getEquipmentProvider(root, args, context);
            const equipment = await provider.findEquipmentById(args.equipment.equipmentId);
            if (!equipment) {
                throw new apollo_server_1.UserInputError('Equipment not found');
            }
            await provider.removeEquipmentFromAquascape(equipment.id, args.aquascapeId);
            if (!equipment.predefined) {
                await provider.removeEquipment(equipment.id);
            }
            return equipment;
        },
    },
};
exports.resolversComposition = {
    'Mutation.addEquipment': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
    'Mutation.removeEquipment': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
};


/***/ }),

/***/ "./src/api/modules/Equipment/schema.graphql":
/*!**************************************************!*\
  !*** ./src/api/modules/Equipment/schema.graphql ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "interface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n"

/***/ }),

/***/ "./src/api/modules/Filter/FilterProvider.ts":
/*!**************************************************!*\
  !*** ./src/api/modules/Filter/FilterProvider.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let FilterProvider = class FilterProvider {
    constructor(filterRepository) {
        this.filterRepository = filterRepository;
    }
    getFilters() {
        return this.filterRepository.getFilters();
    }
};
FilterProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.FILTER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], FilterProvider);
exports.FilterProvider = FilterProvider;


/***/ }),

/***/ "./src/api/modules/Filter/index.ts":
/*!*****************************************!*\
  !*** ./src/api/modules/Filter/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Filter/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Filter/resolvers.ts");
const FilterProvider_1 = __webpack_require__(/*! api/modules/Filter/FilterProvider */ "./src/api/modules/Filter/FilterProvider.ts");
const Filter_1 = __webpack_require__(/*! db/repositories/Filter */ "./src/db/repositories/Filter.ts");
exports.FilterModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.FILTER_PROVIDER, useClass: FilterProvider_1.FilterProvider },
        { provide: tokens_1.tokens.FILTER_REPOSITORY, useClass: Filter_1.FilterRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
});


/***/ }),

/***/ "./src/api/modules/Filter/resolvers.ts":
/*!*********************************************!*\
  !*** ./src/api/modules/Filter/resolvers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
exports.resolvers = {
    Query: {
        async filters(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.FILTER_PROVIDER);
            return await provider.getFilters();
        },
    },
};


/***/ }),

/***/ "./src/api/modules/Filter/schema.graphql":
/*!***********************************************!*\
  !*** ./src/api/modules/Filter/schema.graphql ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Filter implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  filters: [Filter!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n"

/***/ }),

/***/ "./src/api/modules/Follow/FollowProvider.ts":
/*!**************************************************!*\
  !*** ./src/api/modules/Follow/FollowProvider.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
let FollowProvider = class FollowProvider {
    constructor(followRepository, userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }
    async followUser(followedId, followerId) {
        const [follower, followed] = await this.findUsers(followerId, followedId);
        if (!follower || !followed) {
            throw new apollo_server_1.UserInputError('User does not exist');
        }
        await this.followRepository.followUser(followedId, followerId);
        return followed;
    }
    async unfollowUser(followedId, followerId) {
        const [follower, followed] = await this.findUsers(followerId, followedId);
        if (!follower || !followed) {
            throw new apollo_server_1.UserInputError('User does not exist');
        }
        await this.followRepository.unfollowUser(followedId, followerId);
        return followed;
    }
    getFollows(userId) {
        return this.followRepository.getFollows(userId);
    }
    isFollowedBy(followerId, followedId) {
        return this.followRepository.isFollowedBy(followerId, followedId);
    }
    async findUsers(followerId, followedId) {
        return await Promise.all([
            this.userRepository.findOne({ where: { id: followerId } }),
            this.userRepository.findOne({ where: { id: followedId } }),
        ]);
    }
};
FollowProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.FOLLOW_REPOSITORY)),
    __param(1, di_1.Inject(tokens_1.tokens.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], FollowProvider);
exports.FollowProvider = FollowProvider;


/***/ }),

/***/ "./src/api/modules/Follow/index.ts":
/*!*****************************************!*\
  !*** ./src/api/modules/Follow/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const Follow_1 = __webpack_require__(/*! db/repositories/Follow */ "./src/db/repositories/Follow.ts");
const User_1 = __webpack_require__(/*! db/repositories/User */ "./src/db/repositories/User.ts");
const FollowProvider_1 = __webpack_require__(/*! api/modules/Follow/FollowProvider */ "./src/api/modules/Follow/FollowProvider.ts");
const resolvers_1 = __webpack_require__(/*! api/modules/Follow/resolvers */ "./src/api/modules/Follow/resolvers.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! api/modules/Follow/schema.graphql */ "./src/api/modules/Follow/schema.graphql");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
exports.FollowModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.FOLLOW_PROVIDER, useClass: FollowProvider_1.FollowProvider },
        { provide: tokens_1.tokens.FOLLOW_REPOSITORY, useClass: Follow_1.FollowRepository },
        { provide: tokens_1.tokens.USER_REPOSITORY, useClass: User_1.UserRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
});


/***/ }),

/***/ "./src/api/modules/Follow/resolvers.ts":
/*!*********************************************!*\
  !*** ./src/api/modules/Follow/resolvers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
exports.resolvers = {
    User: {
        async isFollowedByMe(user, args, context) {
            if (!context.currentUserId || context.currentUserId === user.id) {
                return false;
            }
            const provider = context.injector.get(tokens_1.tokens.FOLLOW_PROVIDER);
            return await provider.isFollowedBy(context.currentUserId, user.id);
        },
        async followersCount(user, args, context) {
            const provider = context.injector.get(tokens_1.tokens.FOLLOW_PROVIDER);
            const { followers } = await provider.getFollows(user.id);
            return followers.length;
        },
        async followingCount(user, args, context) {
            const provider = context.injector.get(tokens_1.tokens.FOLLOW_PROVIDER);
            const { following } = await provider.getFollows(user.id);
            return following.length;
        },
    },
    Mutation: {
        async followUser(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.FOLLOW_PROVIDER);
            return await provider.followUser(args.userId, context.currentUserId);
        },
        async unfollowUser(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.FOLLOW_PROVIDER);
            return await provider.unfollowUser(args.userId, context.currentUserId);
        },
    },
};
exports.resolversComposition = {
    'Mutation.followUser': [guards_1.authenticate],
    'Mutation.unfollowUser': [guards_1.authenticate],
};


/***/ }),

/***/ "./src/api/modules/Follow/schema.graphql":
/*!***********************************************!*\
  !*** ./src/api/modules/Follow/schema.graphql ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Follow {\n  id: Int!\n  followedUserId: Int!\n  followerUserId: Int!\n  followed: User!\n  follower: User!\n  updatedAt: String!\n  createdAt: String!\n}\n\ntype Follows {\n  following: [Follow]\n  followers: [Follow]\n}\n\ntype User {\n  followersCount: Int!\n  followingCount: Int!\n  isFollowedByMe: Boolean!\n}\n\ntype Mutation {\n  followUser(userId: Int!): User\n  unfollowUser(userId: Int!): User\n}\n"

/***/ }),

/***/ "./src/api/modules/Hardscape/HardscapeProvider.ts":
/*!********************************************************!*\
  !*** ./src/api/modules/Hardscape/HardscapeProvider.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let HardscapeProvider = class HardscapeProvider {
    constructor(hardscapeRepository, aquascapeHardscapeRepository) {
        this.hardscapeRepository = hardscapeRepository;
        this.aquascapeHardscapeRepository = aquascapeHardscapeRepository;
    }
    getHardscape() {
        return this.hardscapeRepository.getHardscape();
    }
    addHardscape(name) {
        return this.hardscapeRepository.create({ name });
    }
    addHardscapeForAquascape(hardscapeId, aquascapeId) {
        return this.aquascapeHardscapeRepository.addHardscapeForAquascape(hardscapeId, aquascapeId);
    }
    removeHardscape(id) {
        return this.hardscapeRepository.destroy({ where: { id } });
    }
    removeHardscapeForAquascape(hardscapeId, aquascapeId) {
        return this.aquascapeHardscapeRepository.destroy({ where: { hardscapeId, aquascapeId } });
    }
    findHardscapeById(id) {
        return this.hardscapeRepository.findHardscapeById(id);
    }
};
HardscapeProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.HARDSCAPE_REPOSITORY)),
    __param(1, di_1.Inject(tokens_1.tokens.AQUASCAPE_HARDSCAPE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], HardscapeProvider);
exports.HardscapeProvider = HardscapeProvider;


/***/ }),

/***/ "./src/api/modules/Hardscape/index.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Hardscape/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Hardscape/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Hardscape/resolvers.ts");
const HardscapeProvider_1 = __webpack_require__(/*! api/modules/Hardscape/HardscapeProvider */ "./src/api/modules/Hardscape/HardscapeProvider.ts");
const Hardscape_1 = __webpack_require__(/*! db/repositories/Hardscape */ "./src/db/repositories/Hardscape.ts");
const AquascapeHardscape_1 = __webpack_require__(/*! db/repositories/AquascapeHardscape */ "./src/db/repositories/AquascapeHardscape.ts");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const Aquascape_1 = __webpack_require__(/*! db/repositories/Aquascape */ "./src/db/repositories/Aquascape.ts");
exports.HardscapeModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.AQUASCAPE_REPOSITORY, useClass: Aquascape_1.AquascapeRepository },
        { provide: tokens_1.tokens.HARDSCAPE_PROVIDER, useClass: HardscapeProvider_1.HardscapeProvider },
        { provide: tokens_1.tokens.HARDSCAPE_REPOSITORY, useClass: Hardscape_1.HardscapeRepository },
        { provide: tokens_1.tokens.AQUASCAPE_HARDSCAPE_REPOSITORY, useClass: AquascapeHardscape_1.AquascapeHardscapeRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
});


/***/ }),

/***/ "./src/api/modules/Hardscape/resolvers.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Hardscape/resolvers.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
exports.resolvers = {
    Query: {
        async hardscape(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.HARDSCAPE_PROVIDER);
            return await provider.getHardscape();
        },
    },
    Mutation: {
        async addHardscape(root, args, context) {
            let hardscape = null;
            const provider = context.injector.get(tokens_1.tokens.HARDSCAPE_PROVIDER);
            if (args.hardscapeId) {
                hardscape = await provider.findHardscapeById(args.hardscapeId);
            }
            else if (args.name) {
                hardscape = await provider.addHardscape(args.name);
            }
            if (!hardscape) {
                throw new apollo_server_1.UserInputError('You need to provide a hardscape ID or a hardscape name that will be created');
            }
            await provider.addHardscapeForAquascape(hardscape.id, args.aquascapeId);
            return hardscape;
        },
        async removeHardscape(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.HARDSCAPE_PROVIDER);
            const hardscape = await provider.findHardscapeById(args.hardscapeId);
            if (!hardscape) {
                throw new apollo_server_1.UserInputError('Hardscape not found');
            }
            await provider.removeHardscapeForAquascape(hardscape.id, args.aquascapeId);
            if (!hardscape.predefined) {
                await provider.removeHardscape(hardscape.id);
            }
            return hardscape;
        }
    }
};
exports.resolversComposition = {
    'Mutation.addHardscape': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
    'Mutation.removeHardscape': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
};


/***/ }),

/***/ "./src/api/modules/Hardscape/schema.graphql":
/*!**************************************************!*\
  !*** ./src/api/modules/Hardscape/schema.graphql ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Hardscape {\n  id: Int!\n  predefined: Boolean!\n  name: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  hardscape: [Hardscape!]!\n}\n\ntype Mutation {\n  addHardscape(hardscapeId: Int, name: String, aquascapeId: Int!): Hardscape!\n  removeHardscape(hardscapeId: Int!, aquascapeId: Int!): Hardscape\n}\n"

/***/ }),

/***/ "./src/api/modules/Light/LightProvider.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Light/LightProvider.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let LightProvider = class LightProvider {
    constructor(lightRepository) {
        this.lightRepository = lightRepository;
    }
    async getLights() {
        return await this.lightRepository.findAll();
    }
};
LightProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.LIGHT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], LightProvider);
exports.LightProvider = LightProvider;


/***/ }),

/***/ "./src/api/modules/Light/index.ts":
/*!****************************************!*\
  !*** ./src/api/modules/Light/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const Light_1 = __webpack_require__(/*! db/repositories/Light */ "./src/db/repositories/Light.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Light/schema.graphql");
const LightProvider_1 = __webpack_require__(/*! ./LightProvider */ "./src/api/modules/Light/LightProvider.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Light/resolvers.ts");
exports.LightModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.LIGHT_PROVIDER, useClass: LightProvider_1.LightProvider },
        { provide: tokens_1.tokens.LIGHT_REPOSITORY, useClass: Light_1.LightRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
});


/***/ }),

/***/ "./src/api/modules/Light/resolvers.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Light/resolvers.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
exports.resolvers = {
    Query: {
        async lights(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.LIGHT_PROVIDER);
            return await provider.getLights();
        },
    },
};


/***/ }),

/***/ "./src/api/modules/Light/schema.graphql":
/*!**********************************************!*\
  !*** ./src/api/modules/Light/schema.graphql ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Light implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  width: Float\n  height: Float\n  depth: Float\n  power: Float\n  lumenMin: Int\n  lumenMax: Int\n  kelvinMin: Int\n  kelvinMax: Int\n  dimmable: Boolean\n  description: String\n  image: String\n}\n\ntype Query {\n  lights: [Light!]!\n}\n\ntype Mutation {\n  addLight(brand: String!, model: String!, aquascapeId: Int!): Light!\n  removeLight(lightId: Int!, aquascapeId: Int!): Light\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n"

/***/ }),

/***/ "./src/api/modules/Like/LikeProvider.ts":
/*!**********************************************!*\
  !*** ./src/api/modules/Like/LikeProvider.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let LikeProvider = class LikeProvider {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    like(entity, entityId, userId) {
        return this.likeRepository.like(entity, entityId, userId);
    }
    dislike(entity, entityId, userId) {
        return this.likeRepository.dislike(entity, entityId, userId);
    }
    countLikes(entity, entityId) {
        return this.likeRepository.countLikes(entity, entityId);
    }
    isLikedBy(userId, entity, entityId) {
        return this.likeRepository.isLikedBy(userId, entity, entityId);
    }
};
LikeProvider = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __param(0, di_1.Inject(tokens_1.tokens.LIKE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], LikeProvider);
exports.LikeProvider = LikeProvider;


/***/ }),

/***/ "./src/api/modules/Like/index.ts":
/*!***************************************!*\
  !*** ./src/api/modules/Like/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Like/resolvers.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Like/schema.graphql");
const LikeProvider_1 = __webpack_require__(/*! api/modules/Like/LikeProvider */ "./src/api/modules/Like/LikeProvider.ts");
const Like_1 = __webpack_require__(/*! db/repositories/Like */ "./src/db/repositories/Like.ts");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
exports.LikeModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.LIKE_PROVIDER, useClass: LikeProvider_1.LikeProvider },
        { provide: tokens_1.tokens.LIKE_REPOSITORY, useClass: Like_1.LikeRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId])
});


/***/ }),

/***/ "./src/api/modules/Like/resolvers.ts":
/*!*******************************************!*\
  !*** ./src/api/modules/Like/resolvers.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const Like_1 = __webpack_require__(/*! db/repositories/Like */ "./src/db/repositories/Like.ts");
exports.resolvers = {
    Aquascape: {
        async likesCount(aquascape, args, context) {
            const provider = context.injector.get(tokens_1.tokens.LIKE_PROVIDER);
            return await provider.countLikes(Like_1.LikeEntityType.AQUASCAPE, aquascape.id);
        },
        async isLikedByMe(aquascape, args, context) {
            if (!context.currentUserId) {
                return false;
            }
            const provider = context.injector.get(tokens_1.tokens.LIKE_PROVIDER);
            return await provider.isLikedBy(context.currentUserId, Like_1.LikeEntityType.AQUASCAPE, aquascape.id);
        },
    },
    Mutation: {
        async like(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.LIKE_PROVIDER);
            return await provider.like(args.entity, args.entityId, context.currentUserId);
        },
        async dislike(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.LIKE_PROVIDER);
            return await provider.dislike(args.entity, args.entityId, context.currentUserId);
        },
    },
};
exports.resolversComposition = {
    'Mutation.like': [guards_1.authenticate],
};


/***/ }),

/***/ "./src/api/modules/Like/schema.graphql":
/*!*********************************************!*\
  !*** ./src/api/modules/Like/schema.graphql ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Like {\n  id: Int!\n  userId: Int!\n  aquascapeImageId: Int\n  aquascapeId: Int\n  commentId: Int\n}\n\ntype Aquascape {\n  likesCount: Int!\n  isLikedByMe: Boolean!\n}\n\nenum LikeEntityType {\n  AQUASCAPE\n  IMAGE\n  COMMENT\n}\n\ntype Mutation {\n  like(entity: LikeEntityType!, entityId: Int!): Like\n  dislike(entity: LikeEntityType!, entityId: Int!): Like\n}\n"

/***/ }),

/***/ "./src/api/modules/Livestock/LivestockProvider.ts":
/*!********************************************************!*\
  !*** ./src/api/modules/Livestock/LivestockProvider.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let LivestockProvider = class LivestockProvider {
    constructor(livestockRepository, aquascapeLivestockRepository) {
        this.livestockRepository = livestockRepository;
        this.aquascapeLivestockRepository = aquascapeLivestockRepository;
    }
    getLivestock() {
        return this.livestockRepository.getLivestock();
    }
    addLivestock(name) {
        return this.livestockRepository.create({ name });
    }
    addLivestockForAquascape(livestockId, aquascapeId) {
        return this.aquascapeLivestockRepository.addLivestockForAquascape(livestockId, aquascapeId);
    }
    removeLivestock(id) {
        return this.livestockRepository.destroy({ where: { id } });
    }
    removeLivestockForAquascape(livestockId, aquascapeId) {
        return this.aquascapeLivestockRepository.destroy({ where: { livestockId, aquascapeId } });
    }
    findLivestockById(id) {
        return this.livestockRepository.findLivestockById(id);
    }
};
LivestockProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.LIVESTOCK_REPOSITORY)),
    __param(1, di_1.Inject(tokens_1.tokens.AQUASCAPE_LIVESTOCK_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], LivestockProvider);
exports.LivestockProvider = LivestockProvider;


/***/ }),

/***/ "./src/api/modules/Livestock/index.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Livestock/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Livestock/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Livestock/resolvers.ts");
const LivestockProvider_1 = __webpack_require__(/*! api/modules/Livestock/LivestockProvider */ "./src/api/modules/Livestock/LivestockProvider.ts");
const Livestock_1 = __webpack_require__(/*! db/repositories/Livestock */ "./src/db/repositories/Livestock.ts");
const AquascapeLivestock_1 = __webpack_require__(/*! db/repositories/AquascapeLivestock */ "./src/db/repositories/AquascapeLivestock.ts");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const Aquascape_1 = __webpack_require__(/*! db/repositories/Aquascape */ "./src/db/repositories/Aquascape.ts");
exports.LivestockModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.AQUASCAPE_REPOSITORY, useClass: Aquascape_1.AquascapeRepository },
        { provide: tokens_1.tokens.LIVESTOCK_PROVIDER, useClass: LivestockProvider_1.LivestockProvider },
        { provide: tokens_1.tokens.LIVESTOCK_REPOSITORY, useClass: Livestock_1.LivestockRepository },
        { provide: tokens_1.tokens.AQUASCAPE_LIVESTOCK_REPOSITORY, useClass: AquascapeLivestock_1.AquascapeLivestockRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
});


/***/ }),

/***/ "./src/api/modules/Livestock/resolvers.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Livestock/resolvers.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
exports.resolvers = {
    Query: {
        async livestock(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.LIVESTOCK_PROVIDER);
            return await provider.getLivestock();
        },
    },
    Mutation: {
        async addLivestock(root, args, context) {
            let livestock = null;
            const provider = context.injector.get(tokens_1.tokens.LIVESTOCK_PROVIDER);
            if (args.livestockId) {
                livestock = await provider.findLivestockById(args.livestockId);
            }
            else if (args.name) {
                livestock = await provider.addLivestock(args.name);
            }
            if (!livestock) {
                throw new apollo_server_1.UserInputError('You need to provide a livestock ID or a livestock name that will be created');
            }
            await provider.addLivestockForAquascape(livestock.id, args.aquascapeId);
            return livestock;
        },
        async removeLivestock(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.LIVESTOCK_PROVIDER);
            const livestock = await provider.findLivestockById(args.livestockId);
            if (!livestock) {
                throw new apollo_server_1.UserInputError('Livestock not found');
            }
            await provider.removeLivestockForAquascape(livestock.id, args.aquascapeId);
            if (!livestock.predefined) {
                await provider.removeLivestock(livestock.id);
            }
            return livestock;
        }
    }
};
exports.resolversComposition = {
    'Mutation.addLivestock': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
    'Mutation.removeLivestock': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
};


/***/ }),

/***/ "./src/api/modules/Livestock/schema.graphql":
/*!**************************************************!*\
  !*** ./src/api/modules/Livestock/schema.graphql ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Livestock {\n  id: Int!\n  name: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  livestock: [Livestock!]!\n}\n\ntype Mutation {\n  addLivestock(livestockId: Int, name: String, aquascapeId: Int!): Livestock!\n  removeLivestock(livestockId: Int!, aquascapeId: Int!): Livestock\n}\n"

/***/ }),

/***/ "./src/api/modules/Plant/PlantProvider.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Plant/PlantProvider.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let PlantProvider = class PlantProvider {
    constructor(plantRepository, aquacapePlantRepository) {
        this.plantRepository = plantRepository;
        this.aquacapePlantRepository = aquacapePlantRepository;
    }
    getPlants() {
        return this.plantRepository.getPlants();
    }
    addPlant(name) {
        return this.plantRepository.create({ name });
    }
    addPlantForAquascape(plantId, aquascapeId) {
        return this.aquacapePlantRepository.addPlantForAquascape(plantId, aquascapeId);
    }
    removePlant(id) {
        return this.plantRepository.destroy({ where: { id } });
    }
    removePlantForAquascape(plantId, aquascapeId) {
        return this.aquacapePlantRepository.destroy({ where: { plantId, aquascapeId } });
    }
    findPlantById(id) {
        return this.plantRepository.findPlantById(id);
    }
};
PlantProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.PLANT_REPOSITORY)),
    __param(1, di_1.Inject(tokens_1.tokens.AQUASCAPE_PLANT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], PlantProvider);
exports.PlantProvider = PlantProvider;


/***/ }),

/***/ "./src/api/modules/Plant/index.ts":
/*!****************************************!*\
  !*** ./src/api/modules/Plant/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Plant/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Plant/resolvers.ts");
const PlantProvider_1 = __webpack_require__(/*! api/modules/Plant/PlantProvider */ "./src/api/modules/Plant/PlantProvider.ts");
const Plant_1 = __webpack_require__(/*! db/repositories/Plant */ "./src/db/repositories/Plant.ts");
const AquascapePlant_1 = __webpack_require__(/*! db/repositories/AquascapePlant */ "./src/db/repositories/AquascapePlant.ts");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const Aquascape_1 = __webpack_require__(/*! db/repositories/Aquascape */ "./src/db/repositories/Aquascape.ts");
exports.PlantModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.AQUASCAPE_REPOSITORY, useClass: Aquascape_1.AquascapeRepository },
        { provide: tokens_1.tokens.PLANT_PROVIDER, useClass: PlantProvider_1.PlantProvider },
        { provide: tokens_1.tokens.PLANT_REPOSITORY, useClass: Plant_1.PlantRepository },
        { provide: tokens_1.tokens.AQUASCAPE_PLANT_REPOSITORY, useClass: AquascapePlant_1.AquascapePlantRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
});


/***/ }),

/***/ "./src/api/modules/Plant/resolvers.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Plant/resolvers.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
exports.resolvers = {
    Query: {
        async plants(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.PLANT_PROVIDER);
            return await provider.getPlants();
        },
    },
    Mutation: {
        async addPlant(root, args, context) {
            let plant = null;
            const provider = context.injector.get(tokens_1.tokens.PLANT_PROVIDER);
            if (args.plantId) {
                plant = await provider.findPlantById(args.plantId);
            }
            else if (args.name) {
                plant = await provider.addPlant(args.name);
            }
            if (!plant) {
                throw new apollo_server_1.UserInputError('You need to provide a plant ID or a plant name that will be created');
            }
            await provider.addPlantForAquascape(plant.id, args.aquascapeId);
            return plant;
        },
        async removePlant(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.PLANT_PROVIDER);
            const plant = await provider.findPlantById(args.plantId);
            if (!plant) {
                throw new apollo_server_1.UserInputError('Plant not found');
            }
            await provider.removePlantForAquascape(plant.id, args.aquascapeId);
            if (!plant.predefined) {
                await provider.removePlant(plant.id);
            }
            return plant;
        }
    }
};
exports.resolversComposition = {
    'Mutation.addPlant': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
    'Mutation.removePlant': [guards_1.authenticate, guards_1.authorizeAquascapeUpdate],
};


/***/ }),

/***/ "./src/api/modules/Plant/schema.graphql":
/*!**********************************************!*\
  !*** ./src/api/modules/Plant/schema.graphql ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Plant {\n  id: Int!\n  name: String!\n  description: String\n  image: String\n  origin: String\n  minHeight: Int\n  maxHeight: Int\n  position: String\n  luminosity: String\n  growthSpeed: String\n  difficulty: String\n}\n\ntype Query {\n  plants: [Plant!]!\n}\n\ntype Mutation {\n  addPlant(plantId: Int, name: String, aquascapeId: Int!): Plant!\n  removePlant(plantId: Int!, aquascapeId: Int!): Plant\n}\n"

/***/ }),

/***/ "./src/api/modules/Substrate/SubstrateProvider.ts":
/*!********************************************************!*\
  !*** ./src/api/modules/Substrate/SubstrateProvider.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let SubstrateProvider = class SubstrateProvider {
    constructor(substrateRepository) {
        this.substrateRepository = substrateRepository;
    }
    getSubstrates() {
        return this.substrateRepository.getSubstrates();
    }
};
SubstrateProvider = __decorate([
    di_1.Injectable(),
    __param(0, di_1.Inject(tokens_1.tokens.SUBSTRATE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], SubstrateProvider);
exports.SubstrateProvider = SubstrateProvider;


/***/ }),

/***/ "./src/api/modules/Substrate/index.ts":
/*!********************************************!*\
  !*** ./src/api/modules/Substrate/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Substrate/schema.graphql");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Substrate/resolvers.ts");
const SubstrateProvider_1 = __webpack_require__(/*! api/modules/Substrate/SubstrateProvider */ "./src/api/modules/Substrate/SubstrateProvider.ts");
const Substrate_1 = __webpack_require__(/*! db/repositories/Substrate */ "./src/db/repositories/Substrate.ts");
exports.SubstrateModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.SUBSTRATE_PROVIDER, useClass: SubstrateProvider_1.SubstrateProvider },
        { provide: tokens_1.tokens.SUBSTRATE_REPOSITORY, useClass: Substrate_1.SubstrateRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers
});


/***/ }),

/***/ "./src/api/modules/Substrate/resolvers.ts":
/*!************************************************!*\
  !*** ./src/api/modules/Substrate/resolvers.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
exports.resolvers = {
    Query: {
        async substrates(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.SUBSTRATE_PROVIDER);
            return await provider.getSubstrates();
        },
    },
};


/***/ }),

/***/ "./src/api/modules/Substrate/schema.graphql":
/*!**************************************************!*\
  !*** ./src/api/modules/Substrate/schema.graphql ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Substrate implements Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\ntype Query {\n  substrates: [Substrate!]!\n}\n\ninterface Equipment {\n  id: Int!\n  predefined: Boolean!\n  model: String!\n  description: String\n  image: String\n}\n\nenum EquipmentType {\n  FILTER\n  SUBSTRATE\n  LIGHT\n  ADDITIVES\n}\n\ninput EquipmentArgs {\n  equipmentType: EquipmentType!\n  equipmentId: Int\n  name: String\n}\n\ntype Mutation {\n  addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!\n  removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment\n}\n"

/***/ }),

/***/ "./src/api/modules/User/UsersProvider.ts":
/*!***********************************************!*\
  !*** ./src/api/modules/User/UsersProvider.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const cloudinary_1 = __webpack_require__(/*! services/cloudinary */ "./src/services/cloudinary/index.ts");
const logger_1 = __webpack_require__(/*! logger */ "./src/logger/index.ts");
const AuthHelper_1 = __webpack_require__(/*! utils/AuthHelper */ "./src/utils/AuthHelper.ts");
let UsersProvider = class UsersProvider {
    constructor(userRepository, emailConfirmationRepository) {
        this.userRepository = userRepository;
        this.emailConfirmationRepository = emailConfirmationRepository;
    }
    findUserById(id) {
        return this.userRepository.findUserById(id);
    }
    findUserBySlug(slug) {
        return this.userRepository.findUserBySlug(slug);
    }
    findUserByEmail(email) {
        return this.userRepository.findUserByEmail(email);
    }
    getAllUsers() {
        return this.userRepository.findAll();
    }
    updateUserDetails(userId, userDetails) {
        return this.userRepository.updateUserDetails(userId, userDetails);
    }
    async confirmEmail(token) {
        const payload = AuthHelper_1.AuthHelper.decodeJWTToken(token);
        if (!payload) {
            return [false, undefined];
        }
        const confirmed = await this.emailConfirmationRepository.confirmEmail(payload.email, payload.code);
        if (!confirmed) {
            return [false, undefined];
        }
        await this.userRepository.update({ emailConfirmed: true }, { where: { email: payload.email } });
        return [confirmed, payload.email];
    }
    async uploadProfileImage(userId, file) {
        var _a;
        const { createReadStream } = await file;
        const user = await this.userRepository.findUserById(userId);
        const result = await cloudinary_1.uploadStreamFile(createReadStream, cloudinary_1.imageUploadOptions.userProfileImage);
        if ((_a = user) === null || _a === void 0 ? void 0 : _a.profileImagePublicId) {
            cloudinary_1.deleteFile(user.profileImagePublicId).catch(error => logger_1.default.error(error));
        }
        await this.userRepository.updateProfileImage(userId, result.public_id, result.secure_url);
        return { imageUrl: result.secure_url, imagePublicId: result.public_id };
    }
    async uploadCoverImage(userId, file) {
        var _a;
        const { createReadStream } = await file;
        const user = await this.userRepository.findUserById(userId);
        const result = await cloudinary_1.uploadStreamFile(createReadStream, cloudinary_1.imageUploadOptions.userCoverImage);
        if ((_a = user) === null || _a === void 0 ? void 0 : _a.coverImagePublicId) {
            cloudinary_1.deleteFile(user.coverImagePublicId).catch(error => logger_1.default.error(error));
        }
        await this.userRepository.updateCoverImage(userId, result.public_id, result.secure_url);
        return { imageUrl: result.secure_url, imagePublicId: result.public_id };
    }
};
UsersProvider = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __param(0, di_1.Inject(tokens_1.tokens.USER_REPOSITORY)),
    __param(1, di_1.Inject(tokens_1.tokens.EMAIL_CONFIRMATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], UsersProvider);
exports.UsersProvider = UsersProvider;


/***/ }),

/***/ "./src/api/modules/User/index.ts":
/*!***************************************!*\
  !*** ./src/api/modules/User/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const UsersProvider_1 = __webpack_require__(/*! api/modules/User/UsersProvider */ "./src/api/modules/User/UsersProvider.ts");
const resolvers_1 = __webpack_require__(/*! api/modules/User/resolvers */ "./src/api/modules/User/resolvers.ts");
const User_1 = __webpack_require__(/*! db/repositories/User */ "./src/db/repositories/User.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/User/schema.graphql");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
const EmailConfirmation_1 = __webpack_require__(/*! db/repositories/EmailConfirmation */ "./src/db/repositories/EmailConfirmation.ts");
exports.UserModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.USER_PROVIDER, useClass: UsersProvider_1.UsersProvider },
        { provide: tokens_1.tokens.USER_REPOSITORY, useClass: User_1.UserRepository },
        { provide: tokens_1.tokens.EMAIL_CONFIRMATION_REPOSITORY, useClass: EmailConfirmation_1.EmailConfirmationRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachCurrentUserId]),
});


/***/ }),

/***/ "./src/api/modules/User/resolvers.ts":
/*!*******************************************!*\
  !*** ./src/api/modules/User/resolvers.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = __webpack_require__(/*! api/guards */ "./src/api/guards/index.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const types_1 = __webpack_require__(/*! interfaces/graphql/types */ "./src/interfaces/graphql/types.ts");
const AuthHelper_1 = __webpack_require__(/*! utils/AuthHelper */ "./src/utils/AuthHelper.ts");
exports.resolvers = {
    Query: {
        async me(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.USER_PROVIDER);
            return await provider.findUserById(context.currentUserId);
        },
        async user(root, args, { injector }) {
            const provider = injector.get(tokens_1.tokens.USER_PROVIDER);
            return await provider.findUserById(args.id);
        },
        async userBySlug(root, args, { injector }) {
            const provider = injector.get(tokens_1.tokens.USER_PROVIDER);
            return await provider.findUserBySlug(args.slug);
        },
        async users(root, args, { injector }) {
            const provider = injector.get(tokens_1.tokens.USER_PROVIDER);
            return await provider.getAllUsers();
        },
    },
    Mutation: {
        async uploadUserImage(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.USER_PROVIDER);
            if (args.imageVariant === types_1.ImageVariant.Profile) {
                return await provider.uploadProfileImage(context.currentUserId, args.file);
            }
            else if (args.imageVariant === types_1.ImageVariant.Cover) {
                return await provider.uploadCoverImage(context.currentUserId, args.file);
            }
            else {
                throw new apollo_server_1.UserInputError('Wrong image variant provided');
            }
        },
        async updateUserDetails(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.USER_PROVIDER);
            const [, users] = await provider.updateUserDetails(context.currentUserId, args.details);
            return users;
        },
        async confirmEmail(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.USER_PROVIDER);
            const [confirmed, email] = await provider.confirmEmail(args.token);
            if (confirmed && email) {
                const user = await provider.findUserByEmail(email);
                if (user) {
                    return { token: AuthHelper_1.AuthHelper.createAuthToken(user.id), user };
                }
            }
        },
    },
};
exports.resolversComposition = {
    'Query.me': [guards_1.authenticate],
    'Mutation.uploadUserImage': [guards_1.authenticate],
    'Mutation.updateUserDetails': [guards_1.authenticate],
};


/***/ }),

/***/ "./src/api/modules/User/schema.graphql":
/*!*********************************************!*\
  !*** ./src/api/modules/User/schema.graphql ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type User {\n  id: Int!\n  slug: String!\n  name: String!\n  about: String\n  profileImage: String\n  profileImagePublicId: String\n  coverImage: String\n  coverImagePublicId: String\n  country: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AuthPayload {\n  token: String!\n  user: User!\n}\n\ntype ImageUploadResult {\n  imageUrl: String!\n  imagePublicId: String!\n}\n\nenum ImageVariant {\n  PROFILE\n  COVER\n}\n\ninput UserDetails {\n  name: String\n  about: String\n  facebookUrl: String\n  youtubeUrl: String\n  instagramUrl: String\n  twitterUrl: String\n}\n\nscalar Upload\n\ntype Query {\n  me: User\n  user(id: Int!): User\n  userBySlug(slug: String!): User\n  users: [User]!\n}\n\ntype Mutation {\n  uploadUserImage(file: Upload!, imageVariant: ImageVariant!): ImageUploadResult!\n  updateUserDetails(details: UserDetails!): [User]\n  confirmEmail(token: String!): AuthPayload\n}\n"

/***/ }),

/***/ "./src/api/modules/Visitor/VisitorProvider.ts":
/*!****************************************************!*\
  !*** ./src/api/modules/Visitor/VisitorProvider.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
let VisitorProvider = class VisitorProvider {
    constructor(visitorRepository) {
        this.visitorRepository = visitorRepository;
    }
    visitAquascape(aquascapeId, visitorId) {
        return this.visitorRepository.addVisitor(aquascapeId, visitorId);
    }
    countViews(aquascapeId) {
        return this.visitorRepository.countViews(aquascapeId);
    }
};
VisitorProvider = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __param(0, di_1.Inject(tokens_1.tokens.VISITOR_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], VisitorProvider);
exports.VisitorProvider = VisitorProvider;


/***/ }),

/***/ "./src/api/modules/Visitor/index.ts":
/*!******************************************!*\
  !*** ./src/api/modules/Visitor/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @graphql-modules/core */ "@graphql-modules/core");
const Visitor_1 = __webpack_require__(/*! db/repositories/Visitor */ "./src/db/repositories/Visitor.ts");
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/api/modules/Visitor/resolvers.ts");
const VisitorProvider_1 = __webpack_require__(/*! ./VisitorProvider */ "./src/api/modules/Visitor/VisitorProvider.ts");
const typeDefs = __webpack_require__(/*! ./schema.graphql */ "./src/api/modules/Visitor/schema.graphql");
const context_1 = __webpack_require__(/*! api/context */ "./src/api/context/index.ts");
exports.VisitorModule = new core_1.GraphQLModule({
    providers: [
        { provide: tokens_1.tokens.VISITOR_PROVIDER, useClass: VisitorProvider_1.VisitorProvider },
        { provide: tokens_1.tokens.VISITOR_REPOSITORY, useClass: Visitor_1.VisitorRepository },
    ],
    typeDefs,
    resolvers: resolvers_1.resolvers,
    resolversComposition: resolvers_1.resolversComposition,
    context: context_1.composeContext([context_1.attachSession])
});


/***/ }),

/***/ "./src/api/modules/Visitor/resolvers.ts":
/*!**********************************************!*\
  !*** ./src/api/modules/Visitor/resolvers.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __webpack_require__(/*! di/tokens */ "./src/di/tokens.ts");
const headers_1 = __webpack_require__(/*! constants/headers */ "./src/constants/headers.ts");
exports.resolvers = {
    Aquascape: {
        async viewsCount(aquascape, args, context) {
            const provider = context.injector.get(tokens_1.tokens.VISITOR_PROVIDER);
            return await provider.countViews(aquascape.id);
        }
    },
    Mutation: {
        async visitAquascape(root, args, context) {
            const provider = context.injector.get(tokens_1.tokens.VISITOR_PROVIDER);
            let visitorId = context.req.headers[headers_1.default.VISITOR_TOKEN];
            // Cookie can be string 'undefined' or an array
            if (visitorId === 'undefined' || Array.isArray(visitorId)) {
                visitorId = undefined;
            }
            const [visitor, created] = await provider.visitAquascape(args.aquascapeId, visitorId);
            return { visitor, created };
        },
    },
};
exports.resolversComposition = {};


/***/ }),

/***/ "./src/api/modules/Visitor/schema.graphql":
/*!************************************************!*\
  !*** ./src/api/modules/Visitor/schema.graphql ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "type Visitor {\n  id: Int!\n  visitorId: String!\n  aquascapeId: Int!\n}\n\ntype VisitAquascapeResult {\n  visitor: Visitor!\n  created: Boolean\n}\n\ntype Aquascape {\n  viewsCount: Int!\n}\n\ntype Mutation {\n  visitAquascape(aquascapeId: Int!): VisitAquascapeResult!\n}\n"

/***/ }),

/***/ "./src/config/environment.ts":
/*!***********************************!*\
  !*** ./src/config/environment.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
const logger_1 = __webpack_require__(/*! logger */ "./src/logger/index.ts");
dotenv.config();
const environment = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SECURITY_TOKEN_SECRET: process.env.SECURITY_TOKEN_SECRET,
    SECURITY_TOKEN_STATIC: process.env.SECURITY_TOKEN_STATIC,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    HOST: process.env.HOST,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
};
const checkVariables = (variables) => {
    for (const x in variables) {
        if (!variables[x]) {
            logger_1.default.warn(`Environment variable ${x} is missing!`);
        }
    }
};
checkVariables(environment);
exports.default = environment;


/***/ }),

/***/ "./src/constants/errors.ts":
/*!*********************************!*\
  !*** ./src/constants/errors.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    BAD_REQUEST: 'BAD_REQUEST',
};


/***/ }),

/***/ "./src/constants/headers.ts":
/*!**********************************!*\
  !*** ./src/constants/headers.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    AUTH_TOKEN: 'auth_token',
    VISITOR_TOKEN: 'visitor_id',
};


/***/ }),

/***/ "./src/constants/socialProviders.ts":
/*!******************************************!*\
  !*** ./src/constants/socialProviders.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    FACEBOOK: 'Facebook',
    GOOGLE: 'Google',
};


/***/ }),

/***/ "./src/db/Database.ts":
/*!****************************!*\
  !*** ./src/db/Database.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor(adapter) {
        this.adapter = adapter;
    }
    connect(params) {
        this.adapter.connect(params);
    }
    testConnection() {
        return this.adapter.testConnection();
    }
    sync(options) {
        return this.adapter.sync(options);
    }
}
exports.Database = Database;


/***/ }),

/***/ "./src/db/adapters/SequelizeAdapter.ts":
/*!*********************************************!*\
  !*** ./src/db/adapters/SequelizeAdapter.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const models_1 = __webpack_require__(/*! db/models */ "./src/db/models/index.ts");
const Brand_1 = __webpack_require__(/*! db/models/Brand */ "./src/db/models/Brand.ts");
class SequelizeAdapter {
    connect(params) {
        this.instance = new sequelize_typescript_1.Sequelize({
            host: params.host,
            port: params.port,
            database: params.database,
            username: params.username,
            password: params.password,
            dialect: 'postgres',
            // Logging: false,
            models: [
                models_1.Additive,
                models_1.Aquascape,
                models_1.AquascapeImage,
                models_1.AquascapeTag,
                models_1.CO2,
                models_1.Comment,
                models_1.Filter,
                Brand_1.Brand,
                models_1.Follow,
                models_1.Hardscape,
                models_1.Light,
                models_1.Like,
                models_1.Livestock,
                models_1.Plant,
                models_1.SocialLogin,
                models_1.Substrate,
                models_1.Tag,
                models_1.Tank,
                models_1.User,
                models_1.Visitor,
                models_1.AquascapeAdditive,
                models_1.AquascapeFilter,
                models_1.AquascapeHardscape,
                models_1.AquascapeLight,
                models_1.AquascapeLivestock,
                models_1.AquascapePlant,
                models_1.AquascapeSubstrate,
                models_1.EmailConfirmation,
            ],
        });
    }
    testConnection() {
        return this.instance.authenticate();
    }
    sync(options) {
        return this.instance.sync(options);
    }
}
exports.SequelizeAdapter = SequelizeAdapter;


/***/ }),

/***/ "./src/db/models/Additive.ts":
/*!***********************************!*\
  !*** ./src/db/models/Additive.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Brand_1 = __webpack_require__(/*! ./Brand */ "./src/db/models/Brand.ts");
let Additive = class Additive extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Additive.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Brand_1.Brand),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Additive.prototype, "brandId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Brand_1.Brand),
    __metadata("design:type", Brand_1.Brand)
], Additive.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Additive.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Additive.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Additive.prototype, "image", void 0);
Additive = __decorate([
    sequelize_typescript_1.Table
], Additive);
exports.Additive = Additive;


/***/ }),

/***/ "./src/db/models/Aquascape.ts":
/*!************************************!*\
  !*** ./src/db/models/Aquascape.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
const AquascapeLight_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeLight */ "./src/db/models/manyToMany/AquascapeLight.ts");
const AquascapeImage_1 = __webpack_require__(/*! db/models/AquascapeImage */ "./src/db/models/AquascapeImage.ts");
const AquascapeHardscape_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeHardscape */ "./src/db/models/manyToMany/AquascapeHardscape.ts");
const AquascapePlant_1 = __webpack_require__(/*! db/models/manyToMany/AquascapePlant */ "./src/db/models/manyToMany/AquascapePlant.ts");
const AquascapeSubstrate_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeSubstrate */ "./src/db/models/manyToMany/AquascapeSubstrate.ts");
const AquascapeAdditive_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeAdditive */ "./src/db/models/manyToMany/AquascapeAdditive.ts");
const AquascapeFilter_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeFilter */ "./src/db/models/manyToMany/AquascapeFilter.ts");
const AquascapeLivestock_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeLivestock */ "./src/db/models/manyToMany/AquascapeLivestock.ts");
const AquascapeTag_1 = __webpack_require__(/*! db/models/AquascapeTag */ "./src/db/models/AquascapeTag.ts");
const Plant_1 = __webpack_require__(/*! db/models/Plant */ "./src/db/models/Plant.ts");
const Light_1 = __webpack_require__(/*! db/models/Light */ "./src/db/models/Light.ts");
const Substrate_1 = __webpack_require__(/*! db/models/Substrate */ "./src/db/models/Substrate.ts");
const Additive_1 = __webpack_require__(/*! db/models/Additive */ "./src/db/models/Additive.ts");
const Comment_1 = __webpack_require__(/*! db/models/Comment */ "./src/db/models/Comment.ts");
const Tag_1 = __webpack_require__(/*! db/models/Tag */ "./src/db/models/Tag.ts");
const Hardscape_1 = __webpack_require__(/*! db/models/Hardscape */ "./src/db/models/Hardscape.ts");
const Visitor_1 = __webpack_require__(/*! db/models/Visitor */ "./src/db/models/Visitor.ts");
const Like_1 = __webpack_require__(/*! db/models/Like */ "./src/db/models/Like.ts");
const CO2_1 = __webpack_require__(/*! db/models/CO2 */ "./src/db/models/CO2.ts");
const Filter_1 = __webpack_require__(/*! db/models/Filter */ "./src/db/models/Filter.ts");
const Livestock_1 = __webpack_require__(/*! db/models/Livestock */ "./src/db/models/Livestock.ts");
const Tank_1 = __webpack_require__(/*! db/models/Tank */ "./src/db/models/Tank.ts");
let Aquascape = class Aquascape extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Aquascape.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Aquascape.prototype, "featured", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Aquascape.prototype, "trending", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Aquascape.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Aquascape.prototype, "mainImagePublicId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Aquascape.prototype, "mainImageUrl", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Aquascape.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User),
    __metadata("design:type", User_1.User)
], Aquascape.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => CO2_1.CO2),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Aquascape.prototype, "co2Id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => CO2_1.CO2),
    __metadata("design:type", CO2_1.CO2)
], Aquascape.prototype, "co2", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Tank_1.Tank),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Aquascape.prototype, "tankId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Tank_1.Tank),
    __metadata("design:type", Tank_1.Tank)
], Aquascape.prototype, "tank", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => AquascapeImage_1.AquascapeImage),
    __metadata("design:type", Array)
], Aquascape.prototype, "images", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Visitor_1.Visitor),
    __metadata("design:type", Array)
], Aquascape.prototype, "visitors", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Comment_1.Comment),
    __metadata("design:type", Array)
], Aquascape.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Like_1.Like),
    __metadata("design:type", Array)
], Aquascape.prototype, "likes", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Filter_1.Filter, () => AquascapeFilter_1.AquascapeFilter),
    __metadata("design:type", Array)
], Aquascape.prototype, "filters", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Light_1.Light, () => AquascapeLight_1.AquascapeLight),
    __metadata("design:type", Array)
], Aquascape.prototype, "lights", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Substrate_1.Substrate, () => AquascapeSubstrate_1.AquascapeSubstrate),
    __metadata("design:type", Array)
], Aquascape.prototype, "substrates", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Additive_1.Additive, () => AquascapeAdditive_1.AquascapeAdditive),
    __metadata("design:type", Array)
], Aquascape.prototype, "additives", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Hardscape_1.Hardscape, () => AquascapeHardscape_1.AquascapeHardscape),
    __metadata("design:type", Array)
], Aquascape.prototype, "hardscape", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Tag_1.Tag, () => AquascapeTag_1.AquascapeTag),
    __metadata("design:type", Array)
], Aquascape.prototype, "tags", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Plant_1.Plant, () => AquascapePlant_1.AquascapePlant),
    __metadata("design:type", Array)
], Aquascape.prototype, "plants", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Livestock_1.Livestock, () => AquascapeLivestock_1.AquascapeLivestock),
    __metadata("design:type", Array)
], Aquascape.prototype, "livestock", void 0);
Aquascape = __decorate([
    sequelize_typescript_1.Table({ paranoid: true })
], Aquascape);
exports.Aquascape = Aquascape;


/***/ }),

/***/ "./src/db/models/AquascapeImage.ts":
/*!*****************************************!*\
  !*** ./src/db/models/AquascapeImage.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Comment_1 = __webpack_require__(/*! db/models/Comment */ "./src/db/models/Comment.ts");
const Like_1 = __webpack_require__(/*! db/models/Like */ "./src/db/models/Like.ts");
let AquascapeImage = class AquascapeImage extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AquascapeImage.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AquascapeImage.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AquascapeImage.prototype, "url", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], AquascapeImage.prototype, "publicId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeImage.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Comment_1.Comment),
    __metadata("design:type", Array)
], AquascapeImage.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Like_1.Like),
    __metadata("design:type", Array)
], AquascapeImage.prototype, "likes", void 0);
AquascapeImage = __decorate([
    sequelize_typescript_1.Table
], AquascapeImage);
exports.AquascapeImage = AquascapeImage;


/***/ }),

/***/ "./src/db/models/AquascapeTag.ts":
/*!***************************************!*\
  !*** ./src/db/models/AquascapeTag.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Tag_1 = __webpack_require__(/*! db/models/Tag */ "./src/db/models/Tag.ts");
let AquascapeTag = class AquascapeTag extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeTag.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Tag_1.Tag),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeTag.prototype, "tagId", void 0);
AquascapeTag = __decorate([
    sequelize_typescript_1.Table
], AquascapeTag);
exports.AquascapeTag = AquascapeTag;


/***/ }),

/***/ "./src/db/models/Brand.ts":
/*!********************************!*\
  !*** ./src/db/models/Brand.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Brand = class Brand extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Brand.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Brand.prototype, "logo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Brand.prototype, "website", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Brand.prototype, "address", void 0);
Brand = __decorate([
    sequelize_typescript_1.Table
], Brand);
exports.Brand = Brand;


/***/ }),

/***/ "./src/db/models/CO2.ts":
/*!******************************!*\
  !*** ./src/db/models/CO2.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let CO2 = class CO2 extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], CO2.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CO2.prototype, "bps", void 0);
CO2 = __decorate([
    sequelize_typescript_1.Table
], CO2);
exports.CO2 = CO2;


/***/ }),

/***/ "./src/db/models/Comment.ts":
/*!**********************************!*\
  !*** ./src/db/models/Comment.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const AquascapeImage_1 = __webpack_require__(/*! db/models/AquascapeImage */ "./src/db/models/AquascapeImage.ts");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
const Like_1 = __webpack_require__(/*! db/models/Like */ "./src/db/models/Like.ts");
let Comment = Comment_1 = class Comment extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Comment_1),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comment.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User),
    __metadata("design:type", User_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Like_1.Like, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Comment.prototype, "likes", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comment.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => AquascapeImage_1.AquascapeImage),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comment.prototype, "aquascapeImageId", void 0);
Comment = Comment_1 = __decorate([
    sequelize_typescript_1.Table({ paranoid: true })
], Comment);
exports.Comment = Comment;


/***/ }),

/***/ "./src/db/models/EmailConfirmation.ts":
/*!********************************************!*\
  !*** ./src/db/models/EmailConfirmation.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let EmailConfirmation = class EmailConfirmation extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], EmailConfirmation.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], EmailConfirmation.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], EmailConfirmation.prototype, "expiresAt", void 0);
EmailConfirmation = __decorate([
    sequelize_typescript_1.Table
], EmailConfirmation);
exports.EmailConfirmation = EmailConfirmation;


/***/ }),

/***/ "./src/db/models/Filter.ts":
/*!*********************************!*\
  !*** ./src/db/models/Filter.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Brand_1 = __webpack_require__(/*! ./Brand */ "./src/db/models/Brand.ts");
let Filter = class Filter extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Filter.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Brand_1.Brand),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Filter.prototype, "brandId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Brand_1.Brand),
    __metadata("design:type", Brand_1.Brand)
], Filter.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Filter.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Filter.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Filter.prototype, "image", void 0);
Filter = __decorate([
    sequelize_typescript_1.Table
], Filter);
exports.Filter = Filter;


/***/ }),

/***/ "./src/db/models/Follow.ts":
/*!*********************************!*\
  !*** ./src/db/models/Follow.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
let Follow = class Follow extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Follow.prototype, "followedUserId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User, 'followedUserId'),
    __metadata("design:type", User_1.User)
], Follow.prototype, "followed", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Follow.prototype, "followerUserId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User, 'followerUserId'),
    __metadata("design:type", User_1.User)
], Follow.prototype, "follower", void 0);
Follow = __decorate([
    sequelize_typescript_1.DefaultScope({
        include: [
            {
                as: 'followed',
                model: () => User_1.User,
            },
            {
                as: 'follower',
                model: () => User_1.User,
            },
        ],
    }),
    sequelize_typescript_1.Table
], Follow);
exports.Follow = Follow;


/***/ }),

/***/ "./src/db/models/Hardscape.ts":
/*!************************************!*\
  !*** ./src/db/models/Hardscape.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Hardscape = class Hardscape extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Hardscape.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Hardscape.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Hardscape.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Hardscape.prototype, "image", void 0);
Hardscape = __decorate([
    sequelize_typescript_1.Table
], Hardscape);
exports.Hardscape = Hardscape;


/***/ }),

/***/ "./src/db/models/Light.ts":
/*!********************************!*\
  !*** ./src/db/models/Light.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Brand_1 = __webpack_require__(/*! ./Brand */ "./src/db/models/Brand.ts");
let Light = class Light extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Light.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Brand_1.Brand),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "brandId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Brand_1.Brand),
    __metadata("design:type", Brand_1.Brand)
], Light.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Light.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "width", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "height", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "depth", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "power", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "lumenMin", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "lumenMax", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "kelvinMin", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Light.prototype, "kelvinMax", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Light.prototype, "dimmable", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Light.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Light.prototype, "image", void 0);
Light = __decorate([
    sequelize_typescript_1.Table
], Light);
exports.Light = Light;


/***/ }),

/***/ "./src/db/models/Like.ts":
/*!*******************************!*\
  !*** ./src/db/models/Like.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const AquascapeImage_1 = __webpack_require__(/*! db/models/AquascapeImage */ "./src/db/models/AquascapeImage.ts");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
const Comment_1 = __webpack_require__(/*! db/models/Comment */ "./src/db/models/Comment.ts");
let Like = class Like extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Like.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.User),
    __metadata("design:type", User_1.User)
], Like.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => AquascapeImage_1.AquascapeImage),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Like.prototype, "aquascapeImageId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Like.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Comment_1.Comment),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Like.prototype, "commentId", void 0);
Like = __decorate([
    sequelize_typescript_1.Table
], Like);
exports.Like = Like;


/***/ }),

/***/ "./src/db/models/Livestock.ts":
/*!************************************!*\
  !*** ./src/db/models/Livestock.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Livestock = class Livestock extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Livestock.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Livestock.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Livestock.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Livestock.prototype, "image", void 0);
Livestock = __decorate([
    sequelize_typescript_1.Table
], Livestock);
exports.Livestock = Livestock;


/***/ }),

/***/ "./src/db/models/Plant.ts":
/*!********************************!*\
  !*** ./src/db/models/Plant.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Plant = class Plant extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Plant.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "origin", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Plant.prototype, "minHeight", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Plant.prototype, "maxHeight", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "luminosity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "growthSpeed", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "difficulty", void 0);
Plant = __decorate([
    sequelize_typescript_1.Table
], Plant);
exports.Plant = Plant;


/***/ }),

/***/ "./src/db/models/SocialLogin.ts":
/*!**************************************!*\
  !*** ./src/db/models/SocialLogin.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const socialProviders_1 = __webpack_require__(/*! constants/socialProviders */ "./src/constants/socialProviders.ts");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let SocialLogin = class SocialLogin extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SocialLogin.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SocialLogin.prototype, "socialId", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ENUM(socialProviders_1.default.FACEBOOK, socialProviders_1.default.GOOGLE)),
    __metadata("design:type", String)
], SocialLogin.prototype, "provider", void 0);
SocialLogin = __decorate([
    sequelize_typescript_1.Table({ paranoid: true })
], SocialLogin);
exports.SocialLogin = SocialLogin;


/***/ }),

/***/ "./src/db/models/Substrate.ts":
/*!************************************!*\
  !*** ./src/db/models/Substrate.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Brand_1 = __webpack_require__(/*! ./Brand */ "./src/db/models/Brand.ts");
let Substrate = class Substrate extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Substrate.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Brand_1.Brand),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Substrate.prototype, "brandId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Brand_1.Brand),
    __metadata("design:type", Brand_1.Brand)
], Substrate.prototype, "brand", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Substrate.prototype, "model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Substrate.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Substrate.prototype, "image", void 0);
Substrate = __decorate([
    sequelize_typescript_1.Table
], Substrate);
exports.Substrate = Substrate;


/***/ }),

/***/ "./src/db/models/Tag.ts":
/*!******************************!*\
  !*** ./src/db/models/Tag.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Tag = class Tag extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Tag.prototype, "predefined", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
Tag = __decorate([
    sequelize_typescript_1.Table
], Tag);
exports.Tag = Tag;


/***/ }),

/***/ "./src/db/models/Tank.ts":
/*!*******************************!*\
  !*** ./src/db/models/Tank.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Tank = class Tank extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tank.prototype, "volume", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tank.prototype, "width", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tank.prototype, "height", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tank.prototype, "depth", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tank.prototype, "glassThickness", void 0);
Tank = __decorate([
    sequelize_typescript_1.Table
], Tank);
exports.Tank = Tank;


/***/ }),

/***/ "./src/db/models/User.ts":
/*!*******************************!*\
  !*** ./src/db/models/User.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const SocialLogin_1 = __webpack_require__(/*! db/models/SocialLogin */ "./src/db/models/SocialLogin.ts");
const Follow_1 = __webpack_require__(/*! db/models/Follow */ "./src/db/models/Follow.ts");
const Like_1 = __webpack_require__(/*! db/models/Like */ "./src/db/models/Like.ts");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "emailConfirmed", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING(500) }),
    __metadata("design:type", String)
], User.prototype, "about", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "profileImage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "profileImagePublicId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "coverImage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "coverImagePublicId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], User.prototype, "facebookUrl", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], User.prototype, "youtubeUrl", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], User.prototype, "instagramUrl", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], User.prototype, "twitterUrl", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => SocialLogin_1.SocialLogin),
    __metadata("design:type", Array)
], User.prototype, "social", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Aquascape_1.Aquascape),
    __metadata("design:type", Array)
], User.prototype, "aquascapes", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Like_1.Like),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Follow_1.Follow, 'followerUserId'),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Follow_1.Follow, 'followedUserId'),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
User = __decorate([
    sequelize_typescript_1.Table({ paranoid: true })
], User);
exports.User = User;


/***/ }),

/***/ "./src/db/models/Visitor.ts":
/*!**********************************!*\
  !*** ./src/db/models/Visitor.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
let Visitor = class Visitor extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Visitor.prototype, "visitorId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Visitor.prototype, "aquascapeId", void 0);
Visitor = __decorate([
    sequelize_typescript_1.Table
], Visitor);
exports.Visitor = Visitor;


/***/ }),

/***/ "./src/db/models/index.ts":
/*!********************************!*\
  !*** ./src/db/models/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Additive_1 = __webpack_require__(/*! ./Additive */ "./src/db/models/Additive.ts");
exports.Additive = Additive_1.Additive;
var Aquascape_1 = __webpack_require__(/*! ./Aquascape */ "./src/db/models/Aquascape.ts");
exports.Aquascape = Aquascape_1.Aquascape;
var AquascapeImage_1 = __webpack_require__(/*! ./AquascapeImage */ "./src/db/models/AquascapeImage.ts");
exports.AquascapeImage = AquascapeImage_1.AquascapeImage;
var AquascapeTag_1 = __webpack_require__(/*! ./AquascapeTag */ "./src/db/models/AquascapeTag.ts");
exports.AquascapeTag = AquascapeTag_1.AquascapeTag;
var CO2_1 = __webpack_require__(/*! ./CO2 */ "./src/db/models/CO2.ts");
exports.CO2 = CO2_1.CO2;
var Comment_1 = __webpack_require__(/*! ./Comment */ "./src/db/models/Comment.ts");
exports.Comment = Comment_1.Comment;
var Filter_1 = __webpack_require__(/*! ./Filter */ "./src/db/models/Filter.ts");
exports.Filter = Filter_1.Filter;
var Follow_1 = __webpack_require__(/*! ./Follow */ "./src/db/models/Follow.ts");
exports.Follow = Follow_1.Follow;
var Hardscape_1 = __webpack_require__(/*! ./Hardscape */ "./src/db/models/Hardscape.ts");
exports.Hardscape = Hardscape_1.Hardscape;
var Light_1 = __webpack_require__(/*! ./Light */ "./src/db/models/Light.ts");
exports.Light = Light_1.Light;
var Like_1 = __webpack_require__(/*! ./Like */ "./src/db/models/Like.ts");
exports.Like = Like_1.Like;
var Livestock_1 = __webpack_require__(/*! ./Livestock */ "./src/db/models/Livestock.ts");
exports.Livestock = Livestock_1.Livestock;
var Plant_1 = __webpack_require__(/*! ./Plant */ "./src/db/models/Plant.ts");
exports.Plant = Plant_1.Plant;
var SocialLogin_1 = __webpack_require__(/*! ./SocialLogin */ "./src/db/models/SocialLogin.ts");
exports.SocialLogin = SocialLogin_1.SocialLogin;
var Substrate_1 = __webpack_require__(/*! ./Substrate */ "./src/db/models/Substrate.ts");
exports.Substrate = Substrate_1.Substrate;
var Tag_1 = __webpack_require__(/*! ./Tag */ "./src/db/models/Tag.ts");
exports.Tag = Tag_1.Tag;
var Tank_1 = __webpack_require__(/*! ./Tank */ "./src/db/models/Tank.ts");
exports.Tank = Tank_1.Tank;
var User_1 = __webpack_require__(/*! ./User */ "./src/db/models/User.ts");
exports.User = User_1.User;
var Visitor_1 = __webpack_require__(/*! ./Visitor */ "./src/db/models/Visitor.ts");
exports.Visitor = Visitor_1.Visitor;
var EmailConfirmation_1 = __webpack_require__(/*! ./EmailConfirmation */ "./src/db/models/EmailConfirmation.ts");
exports.EmailConfirmation = EmailConfirmation_1.EmailConfirmation;
__export(__webpack_require__(/*! ./manyToMany */ "./src/db/models/manyToMany/index.ts"));


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapeAdditive.ts":
/*!*******************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapeAdditive.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Additive_1 = __webpack_require__(/*! db/models/Additive */ "./src/db/models/Additive.ts");
let AquascapeAdditive = class AquascapeAdditive extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeAdditive.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Additive_1.Additive),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeAdditive.prototype, "additiveId", void 0);
AquascapeAdditive = __decorate([
    sequelize_typescript_1.Table
], AquascapeAdditive);
exports.AquascapeAdditive = AquascapeAdditive;


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapeFilter.ts":
/*!*****************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapeFilter.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Filter_1 = __webpack_require__(/*! db/models/Filter */ "./src/db/models/Filter.ts");
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
let AquascapeFilter = class AquascapeFilter extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeFilter.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Filter_1.Filter),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeFilter.prototype, "filterId", void 0);
AquascapeFilter = __decorate([
    sequelize_typescript_1.Table
], AquascapeFilter);
exports.AquascapeFilter = AquascapeFilter;


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapeHardscape.ts":
/*!********************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapeHardscape.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Hardscape_1 = __webpack_require__(/*! db/models/Hardscape */ "./src/db/models/Hardscape.ts");
let AquascapeHardscape = class AquascapeHardscape extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeHardscape.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Hardscape_1.Hardscape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeHardscape.prototype, "hardscapeId", void 0);
AquascapeHardscape = __decorate([
    sequelize_typescript_1.Table
], AquascapeHardscape);
exports.AquascapeHardscape = AquascapeHardscape;


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapeLight.ts":
/*!****************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapeLight.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Light_1 = __webpack_require__(/*! db/models/Light */ "./src/db/models/Light.ts");
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
let AquascapeLight = class AquascapeLight extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeLight.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Light_1.Light),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeLight.prototype, "lightId", void 0);
AquascapeLight = __decorate([
    sequelize_typescript_1.Table
], AquascapeLight);
exports.AquascapeLight = AquascapeLight;


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapeLivestock.ts":
/*!********************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapeLivestock.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Livestock_1 = __webpack_require__(/*! db/models/Livestock */ "./src/db/models/Livestock.ts");
let AquascapeLivestock = class AquascapeLivestock extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeLivestock.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Livestock_1.Livestock),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeLivestock.prototype, "livestockId", void 0);
AquascapeLivestock = __decorate([
    sequelize_typescript_1.Table
], AquascapeLivestock);
exports.AquascapeLivestock = AquascapeLivestock;


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapePlant.ts":
/*!****************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapePlant.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Plant_1 = __webpack_require__(/*! db/models/Plant */ "./src/db/models/Plant.ts");
let AquascapePlant = class AquascapePlant extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapePlant.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Plant_1.Plant),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapePlant.prototype, "plantId", void 0);
AquascapePlant = __decorate([
    sequelize_typescript_1.Table
], AquascapePlant);
exports.AquascapePlant = AquascapePlant;


/***/ }),

/***/ "./src/db/models/manyToMany/AquascapeSubstrate.ts":
/*!********************************************************!*\
  !*** ./src/db/models/manyToMany/AquascapeSubstrate.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Substrate_1 = __webpack_require__(/*! db/models/Substrate */ "./src/db/models/Substrate.ts");
let AquascapeSubstrate = class AquascapeSubstrate extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Aquascape_1.Aquascape),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeSubstrate.prototype, "aquascapeId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Substrate_1.Substrate),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AquascapeSubstrate.prototype, "substrateId", void 0);
AquascapeSubstrate = __decorate([
    sequelize_typescript_1.Table
], AquascapeSubstrate);
exports.AquascapeSubstrate = AquascapeSubstrate;


/***/ }),

/***/ "./src/db/models/manyToMany/index.ts":
/*!*******************************************!*\
  !*** ./src/db/models/manyToMany/index.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AquascapeAdditive_1 = __webpack_require__(/*! ./AquascapeAdditive */ "./src/db/models/manyToMany/AquascapeAdditive.ts");
exports.AquascapeAdditive = AquascapeAdditive_1.AquascapeAdditive;
var AquascapeFilter_1 = __webpack_require__(/*! ./AquascapeFilter */ "./src/db/models/manyToMany/AquascapeFilter.ts");
exports.AquascapeFilter = AquascapeFilter_1.AquascapeFilter;
var AquascapeHardscape_1 = __webpack_require__(/*! ./AquascapeHardscape */ "./src/db/models/manyToMany/AquascapeHardscape.ts");
exports.AquascapeHardscape = AquascapeHardscape_1.AquascapeHardscape;
var AquascapeLight_1 = __webpack_require__(/*! ./AquascapeLight */ "./src/db/models/manyToMany/AquascapeLight.ts");
exports.AquascapeLight = AquascapeLight_1.AquascapeLight;
var AquascapeLivestock_1 = __webpack_require__(/*! ./AquascapeLivestock */ "./src/db/models/manyToMany/AquascapeLivestock.ts");
exports.AquascapeLivestock = AquascapeLivestock_1.AquascapeLivestock;
var AquascapePlant_1 = __webpack_require__(/*! ./AquascapePlant */ "./src/db/models/manyToMany/AquascapePlant.ts");
exports.AquascapePlant = AquascapePlant_1.AquascapePlant;
var AquascapeSubstrate_1 = __webpack_require__(/*! ./AquascapeSubstrate */ "./src/db/models/manyToMany/AquascapeSubstrate.ts");
exports.AquascapeSubstrate = AquascapeSubstrate_1.AquascapeSubstrate;


/***/ }),

/***/ "./src/db/repositories/Additive.ts":
/*!*****************************************!*\
  !*** ./src/db/repositories/Additive.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Additive_1 = __webpack_require__(/*! db/models/Additive */ "./src/db/models/Additive.ts");
let AdditiveRepository = class AdditiveRepository extends Base_1.BaseRepository {
    constructor() {
        super(Additive_1.Additive);
    }
    getAdditives() {
        return this.findAll({ where: { predefined: true } });
    }
    findById(id) {
        return this.findOne({ where: { id } });
    }
    addEquipment(model) {
        return this.create({ model });
    }
    removeEquipment(id) {
        return this.destroy({ where: { id } });
    }
};
AdditiveRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AdditiveRepository);
exports.AdditiveRepository = AdditiveRepository;


/***/ }),

/***/ "./src/db/repositories/Aquascape.ts":
/*!******************************************!*\
  !*** ./src/db/repositories/Aquascape.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const sequelize_2 = __webpack_require__(/*! sequelize */ "sequelize");
const Aquascape_1 = __webpack_require__(/*! db/models/Aquascape */ "./src/db/models/Aquascape.ts");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeImage_1 = __webpack_require__(/*! db/models/AquascapeImage */ "./src/db/models/AquascapeImage.ts");
let AquascapeRepository = class AquascapeRepository extends Base_1.BaseRepository {
    constructor() {
        super(Aquascape_1.Aquascape);
    }
    async getAquascapes(pagination, userId, random, include) {
        const where = {};
        const randomOrder = sequelize_1.literal('random()');
        const offset = pagination.offset || 0;
        const defaultOrder = [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
        ];
        if (userId) {
            where.userId = userId;
        }
        const count = await this.count({ where });
        if (pagination.cursor) {
            where.createdAt = {
                [sequelize_2.Op.lt]: new Date(Number(pagination.cursor)),
            };
        }
        const rows = await this.findAll({
            where,
            include,
            order: random ? randomOrder : defaultOrder,
            limit: pagination.limit,
            offset,
        });
        return { rows, count };
    }
    getTrendingAquascapes(pagination, include) {
        const where = { trending: true };
        if (pagination.cursor) {
            where.createdAt = {
                [sequelize_2.Op.lt]: new Date(Number(pagination.cursor)),
            };
        }
        return this.findAll({
            where,
            include,
            order: [['createdAt', 'DESC']],
            limit: pagination.limit,
        });
    }
    getFeaturedAquascape(include) {
        return this.findOne({ where: { featured: true }, include });
    }
    getAquascapeById(id, include) {
        return this.findOne({ where: { id }, include });
    }
    getAquascapeImages(aquascapeId) {
        return AquascapeImage_1.AquascapeImage.findAll({ where: { aquascapeId } });
    }
    updateAquascapeTitle(id, title) {
        return this.update({ title }, { where: { id }, returning: true });
    }
    updateAquascapeMainImage(id, mainImagePublicId, mainImageUrl) {
        return this.update({
            mainImagePublicId,
            mainImageUrl,
        }, {
            where: {
                id,
            },
        });
    }
};
AquascapeRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeRepository);
exports.AquascapeRepository = AquascapeRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeAdditive.ts":
/*!**************************************************!*\
  !*** ./src/db/repositories/AquascapeAdditive.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeAdditive_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeAdditive */ "./src/db/models/manyToMany/AquascapeAdditive.ts");
let AquascapeAdditiveRepository = class AquascapeAdditiveRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeAdditive_1.AquascapeAdditive);
    }
    addAdditiveForAquascape(additiveId, aquascapeId) {
        return this.create({ additiveId, aquascapeId });
    }
    addEquipmentForAquascape(additiveId, aquascapeId) {
        return this.create({ additiveId, aquascapeId });
    }
    removeEquipmentFromAquascape(additiveId, aquascapeId) {
        return this.destroy({ where: { additiveId, aquascapeId } });
    }
};
AquascapeAdditiveRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeAdditiveRepository);
exports.AquascapeAdditiveRepository = AquascapeAdditiveRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeFilter.ts":
/*!************************************************!*\
  !*** ./src/db/repositories/AquascapeFilter.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeFilter_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeFilter */ "./src/db/models/manyToMany/AquascapeFilter.ts");
let AquascapeFilterRepository = class AquascapeFilterRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeFilter_1.AquascapeFilter);
    }
    addFilterForAquascape(filterId, aquascapeId) {
        return this.create({ filterId, aquascapeId });
    }
    addEquipmentForAquascape(filterId, aquascapeId) {
        return this.create({ filterId, aquascapeId });
    }
    removeEquipmentFromAquascape(filterId, aquascapeId) {
        return this.destroy({ where: { filterId, aquascapeId } });
    }
};
AquascapeFilterRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeFilterRepository);
exports.AquascapeFilterRepository = AquascapeFilterRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeHardscape.ts":
/*!***************************************************!*\
  !*** ./src/db/repositories/AquascapeHardscape.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeHardscape_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeHardscape */ "./src/db/models/manyToMany/AquascapeHardscape.ts");
let AquascapeHardscapeRepository = class AquascapeHardscapeRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeHardscape_1.AquascapeHardscape);
    }
    addHardscapeForAquascape(hardscapeId, aquascapeId) {
        return this.create({ hardscapeId, aquascapeId });
    }
};
AquascapeHardscapeRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeHardscapeRepository);
exports.AquascapeHardscapeRepository = AquascapeHardscapeRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeImage.ts":
/*!***********************************************!*\
  !*** ./src/db/repositories/AquascapeImage.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeImage_1 = __webpack_require__(/*! db/models/AquascapeImage */ "./src/db/models/AquascapeImage.ts");
let AquascapeImageRepository = class AquascapeImageRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeImage_1.AquascapeImage);
    }
    addImage(aquascapeId, publicId, url) {
        return this.create({ aquascapeId, publicId, url });
    }
    removeImage(aquascapeId, imageId) {
        return this.destroy({ where: { aquascapeId, id: imageId } });
    }
};
AquascapeImageRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeImageRepository);
exports.AquascapeImageRepository = AquascapeImageRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeLight.ts":
/*!***********************************************!*\
  !*** ./src/db/repositories/AquascapeLight.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeLight_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeLight */ "./src/db/models/manyToMany/AquascapeLight.ts");
let AquascapeLightRepository = class AquascapeLightRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeLight_1.AquascapeLight);
    }
    addLightForAquascape(lightId, aquascapeId) {
        return this.create({ lightId, aquascapeId });
    }
    addEquipmentForAquascape(lightId, aquascapeId) {
        return this.create({ lightId, aquascapeId });
    }
    removeEquipmentFromAquascape(lightId, aquascapeId) {
        return this.destroy({ where: { lightId, aquascapeId } });
    }
};
AquascapeLightRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeLightRepository);
exports.AquascapeLightRepository = AquascapeLightRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeLivestock.ts":
/*!***************************************************!*\
  !*** ./src/db/repositories/AquascapeLivestock.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeLivestock_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeLivestock */ "./src/db/models/manyToMany/AquascapeLivestock.ts");
let AquascapeLivestockRepository = class AquascapeLivestockRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeLivestock_1.AquascapeLivestock);
    }
    addLivestockForAquascape(livestockId, aquascapeId) {
        return this.create({ livestockId, aquascapeId });
    }
};
AquascapeLivestockRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeLivestockRepository);
exports.AquascapeLivestockRepository = AquascapeLivestockRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapePlant.ts":
/*!***********************************************!*\
  !*** ./src/db/repositories/AquascapePlant.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapePlant_1 = __webpack_require__(/*! db/models/manyToMany/AquascapePlant */ "./src/db/models/manyToMany/AquascapePlant.ts");
let AquascapePlantRepository = class AquascapePlantRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapePlant_1.AquascapePlant);
    }
    addPlantForAquascape(plantId, aquascapeId) {
        return this.create({ plantId, aquascapeId });
    }
};
AquascapePlantRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapePlantRepository);
exports.AquascapePlantRepository = AquascapePlantRepository;


/***/ }),

/***/ "./src/db/repositories/AquascapeSubstrate.ts":
/*!***************************************************!*\
  !*** ./src/db/repositories/AquascapeSubstrate.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const AquascapeSubstrate_1 = __webpack_require__(/*! db/models/manyToMany/AquascapeSubstrate */ "./src/db/models/manyToMany/AquascapeSubstrate.ts");
let AquascapeSubstrateRepository = class AquascapeSubstrateRepository extends Base_1.BaseRepository {
    constructor() {
        super(AquascapeSubstrate_1.AquascapeSubstrate);
    }
    addSubstrateForAquascape(substrateId, aquascapeId) {
        return this.create({ substrateId, aquascapeId });
    }
    addEquipmentForAquascape(substrateId, aquascapeId) {
        return this.create({ substrateId, aquascapeId });
    }
    removeEquipmentFromAquascape(substrateId, aquascapeId) {
        return this.destroy({ where: { substrateId, aquascapeId } });
    }
};
AquascapeSubstrateRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], AquascapeSubstrateRepository);
exports.AquascapeSubstrateRepository = AquascapeSubstrateRepository;


/***/ }),

/***/ "./src/db/repositories/Base.ts":
/*!*************************************!*\
  !*** ./src/db/repositories/Base.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(relation) {
        this.relation = relation;
    }
    create(values, options) {
        return this.relation.create(values, options);
    }
    findOne(options) {
        return this.relation.findOne(options);
    }
    findAll(options) {
        return this.relation.findAll(options);
    }
    findAndCountAll(options) {
        return this.relation.findAndCountAll(options);
    }
    update(values, options) {
        return this.relation.update(values, options);
    }
    destroy(options) {
        return this.relation.destroy(options);
    }
    bulkCreate(records, options) {
        return this.relation.bulkCreate(records, options);
    }
    findOrCreate(options) {
        return this.relation.findOrCreate(options);
    }
    count(options) {
        return this.relation.count(options);
    }
}
exports.BaseRepository = BaseRepository;


/***/ }),

/***/ "./src/db/repositories/Brand.ts":
/*!**************************************!*\
  !*** ./src/db/repositories/Brand.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const DataLoader = __webpack_require__(/*! dataloader */ "dataloader");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Brand_1 = __webpack_require__(/*! db/models/Brand */ "./src/db/models/Brand.ts");
const GraphQLHelper_1 = __webpack_require__(/*! utils/GraphQLHelper */ "./src/utils/GraphQLHelper.ts");
let BrandRepository = class BrandRepository extends Base_1.BaseRepository {
    constructor() {
        super(Brand_1.Brand);
        this.batchLoadBrands = async (ids) => {
            const brands = await this.findAll({ where: { id: ids } });
            return GraphQLHelper_1.GraphQLHelper.ensureOrder({
                docs: brands,
                keys: ids,
                prop: 'id',
            });
        };
        this.brandLoader = new DataLoader(this.batchLoadBrands);
    }
    getBrands() {
        return this.findAll({ where: { predefined: true } });
    }
    findBrandById(id) {
        return this.brandLoader.load(id);
    }
};
BrandRepository = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __metadata("design:paramtypes", [])
], BrandRepository);
exports.BrandRepository = BrandRepository;


/***/ }),

/***/ "./src/db/repositories/Comment.ts":
/*!****************************************!*\
  !*** ./src/db/repositories/Comment.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Comment_1 = __webpack_require__(/*! db/models/Comment */ "./src/db/models/Comment.ts");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
var CommentEntityType;
(function (CommentEntityType) {
    CommentEntityType["AQUASCAPE"] = "AQUASCAPE";
    CommentEntityType["IMAGE"] = "IMAGE";
})(CommentEntityType = exports.CommentEntityType || (exports.CommentEntityType = {}));
const entityToFieldMapper = {
    [CommentEntityType.AQUASCAPE]: 'aquascapeId',
    [CommentEntityType.IMAGE]: 'aquascapeImageId',
};
let CommentRepository = class CommentRepository extends Base_1.BaseRepository {
    constructor() {
        super(Comment_1.Comment);
    }
    getComments(entityType, entityId, include) {
        const entity = entityToFieldMapper[entityType];
        return this.findAll({
            where: { [entity]: entityId },
            include,
            order: [['createdAt', 'DESC']],
        });
    }
    addComment(data) {
        const entity = entityToFieldMapper[data.entityType];
        return this.create({
            userId: data.userId,
            [entity]: data.entityId,
            content: data.content,
            parentCommentId: data.parentCommentId,
        });
    }
    async removeComment(id, userId) {
        const comment = await this.findOne({ where: { id, userId } });
        if (!comment) {
            throw new apollo_server_1.UserInputError('Comment not found.');
        }
        await Promise.all([comment.destroy(), this.destroy({ where: { parentCommentId: comment.id } })]);
        return comment;
    }
};
CommentRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], CommentRepository);
exports.CommentRepository = CommentRepository;


/***/ }),

/***/ "./src/db/repositories/EmailConfirmation.ts":
/*!**************************************************!*\
  !*** ./src/db/repositories/EmailConfirmation.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const moment = __webpack_require__(/*! moment */ "moment");
const uuid = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const EmailConfirmation_1 = __webpack_require__(/*! db/models/EmailConfirmation */ "./src/db/models/EmailConfirmation.ts");
let EmailConfirmationRepository = class EmailConfirmationRepository extends Base_1.BaseRepository {
    constructor() {
        super(EmailConfirmation_1.EmailConfirmation);
    }
    createConfirmationKey(email) {
        return this.create({
            email,
            code: uuid(),
            expiresAt: moment().add(3, 'hours'),
        });
    }
    async confirmEmail(email, code) {
        const isValidCode = await this.isValidCode(email, code);
        if (!isValidCode) {
            return false;
        }
        await this.destroy({ where: { email, code } });
        return true;
    }
    async confirmationExpired(email) {
        const confirmation = await this.findOne({ where: { email } });
        return Boolean(confirmation && moment(confirmation.expiresAt).isBefore(moment()));
    }
    async isValidCode(email, code) {
        const confirmation = await this.findOne({ where: { email, code } });
        return Boolean(confirmation && moment(confirmation.expiresAt).isAfter(moment()));
    }
};
EmailConfirmationRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], EmailConfirmationRepository);
exports.EmailConfirmationRepository = EmailConfirmationRepository;


/***/ }),

/***/ "./src/db/repositories/Filter.ts":
/*!***************************************!*\
  !*** ./src/db/repositories/Filter.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Filter_1 = __webpack_require__(/*! db/models/Filter */ "./src/db/models/Filter.ts");
let FilterRepository = class FilterRepository extends Base_1.BaseRepository {
    constructor() {
        super(Filter_1.Filter);
    }
    getFilters() {
        return this.findAll({ where: { predefined: true } });
    }
    findById(id) {
        return this.findOne({ where: { id } });
    }
    addEquipment(model) {
        return this.create({ model });
    }
    removeEquipment(id) {
        return this.destroy({ where: { id } });
    }
};
FilterRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], FilterRepository);
exports.FilterRepository = FilterRepository;


/***/ }),

/***/ "./src/db/repositories/Follow.ts":
/*!***************************************!*\
  !*** ./src/db/repositories/Follow.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Follow_1 = __webpack_require__(/*! db/models/Follow */ "./src/db/models/Follow.ts");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
let FollowRepository = class FollowRepository extends Base_1.BaseRepository {
    constructor() {
        super(Follow_1.Follow);
    }
    followUser(followedId, followerId) {
        return this.create({ followerUserId: followerId, followedUserId: followedId });
    }
    unfollowUser(followedId, followerId) {
        return this.destroy({ where: { followerUserId: followerId, followedUserId: followedId } });
    }
    async isFollowedBy(followerId, followedId) {
        const follow = await this.findOne({
            where: {
                followerUserId: followerId,
                followedUserId: followedId,
            },
        });
        return Boolean(follow);
    }
    async getFollows(userId) {
        const [followers, following] = await Promise.all([
            this.findAll({ where: { followedUserId: userId } }),
            this.findAll({ where: { followerUserId: userId } }),
        ]);
        return {
            followers,
            following,
        };
    }
};
FollowRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], FollowRepository);
exports.FollowRepository = FollowRepository;


/***/ }),

/***/ "./src/db/repositories/Hardscape.ts":
/*!******************************************!*\
  !*** ./src/db/repositories/Hardscape.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Hardscape_1 = __webpack_require__(/*! db/models/Hardscape */ "./src/db/models/Hardscape.ts");
let HardscapeRepository = class HardscapeRepository extends Base_1.BaseRepository {
    constructor() {
        super(Hardscape_1.Hardscape);
    }
    getHardscape() {
        return this.findAll({ where: { predefined: true } });
    }
    findHardscapeById(id) {
        return this.findOne({ where: { id } });
    }
};
HardscapeRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], HardscapeRepository);
exports.HardscapeRepository = HardscapeRepository;


/***/ }),

/***/ "./src/db/repositories/Light.ts":
/*!**************************************!*\
  !*** ./src/db/repositories/Light.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Light_1 = __webpack_require__(/*! db/models/Light */ "./src/db/models/Light.ts");
let LightRepository = class LightRepository extends Base_1.BaseRepository {
    constructor() {
        super(Light_1.Light);
    }
    findById(id) {
        return this.findOne({ where: { id } });
    }
    addEquipment(model) {
        return this.create({ model });
    }
    removeEquipment(id) {
        return this.destroy({ where: { id } });
    }
};
LightRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], LightRepository);
exports.LightRepository = LightRepository;


/***/ }),

/***/ "./src/db/repositories/Like.ts":
/*!*************************************!*\
  !*** ./src/db/repositories/Like.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const DataLoader = __webpack_require__(/*! dataloader */ "dataloader");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Like_1 = __webpack_require__(/*! db/models/Like */ "./src/db/models/Like.ts");
var LikeEntityType;
(function (LikeEntityType) {
    LikeEntityType["AQUASCAPE"] = "AQUASCAPE";
    LikeEntityType["IMAGE"] = "IMAGE";
    LikeEntityType["COMMENT"] = "COMMENT";
})(LikeEntityType = exports.LikeEntityType || (exports.LikeEntityType = {}));
const entityToFieldMapper = {
    [LikeEntityType.AQUASCAPE]: 'aquascapeId',
    [LikeEntityType.IMAGE]: 'aquascapeImageId',
    [LikeEntityType.COMMENT]: 'commentId',
};
let LikeRepository = class LikeRepository extends Base_1.BaseRepository {
    constructor() {
        super(Like_1.Like);
        this.batchCountAquascapeLikes = async (ids) => {
            const likes = await this.findAll({
                where: { [entityToFieldMapper[LikeEntityType.AQUASCAPE]]: ids },
            });
            return ids.map(id => likes.filter(like => like.aquascapeId === id).length);
        };
        this.aquascapeLikesLoader = new DataLoader(this.batchCountAquascapeLikes);
    }
    async like(entity, entityId, userId) {
        const field = entityToFieldMapper[entity];
        const like = await this.findOne({ where: { userId, [field]: entityId } });
        if (like) {
            return Promise.resolve(like);
        }
        return this.create({ userId, [field]: entityId });
    }
    async dislike(entity, entityId, userId) {
        const field = entityToFieldMapper[entity];
        const like = await this.findOne({ where: { userId, [field]: entityId } });
        if (!like) {
            throw new apollo_server_1.UserInputError('Like not found');
        }
        await this.destroy({ where: { userId, [field]: entityId } });
        return like;
    }
    async isLikedBy(userId, entity, entityId) {
        const field = entityToFieldMapper[entity];
        const like = await this.findOne({
            where: {
                [field]: entityId,
                userId,
            },
        });
        return Boolean(like);
    }
    countLikes(entity, entityId) {
        const field = entityToFieldMapper[entity];
        switch (field) {
            case entityToFieldMapper[LikeEntityType.AQUASCAPE]:
                return this.aquascapeLikesLoader.load(entityId);
            default:
                return 0;
        }
    }
};
LikeRepository = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __metadata("design:paramtypes", [])
], LikeRepository);
exports.LikeRepository = LikeRepository;


/***/ }),

/***/ "./src/db/repositories/Livestock.ts":
/*!******************************************!*\
  !*** ./src/db/repositories/Livestock.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Livestock_1 = __webpack_require__(/*! db/models/Livestock */ "./src/db/models/Livestock.ts");
let LivestockRepository = class LivestockRepository extends Base_1.BaseRepository {
    constructor() {
        super(Livestock_1.Livestock);
    }
    getLivestock() {
        return this.findAll({ where: { predefined: true } });
    }
    findLivestockById(id) {
        return this.findOne({ where: { id } });
    }
};
LivestockRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], LivestockRepository);
exports.LivestockRepository = LivestockRepository;


/***/ }),

/***/ "./src/db/repositories/Plant.ts":
/*!**************************************!*\
  !*** ./src/db/repositories/Plant.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Plant_1 = __webpack_require__(/*! db/models/Plant */ "./src/db/models/Plant.ts");
let PlantRepository = class PlantRepository extends Base_1.BaseRepository {
    constructor() {
        super(Plant_1.Plant);
    }
    getPlants() {
        return this.findAll({ where: { predefined: true } });
    }
    findPlantById(id) {
        return this.findOne({ where: { id } });
    }
};
PlantRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], PlantRepository);
exports.PlantRepository = PlantRepository;


/***/ }),

/***/ "./src/db/repositories/SocialLogin.ts":
/*!********************************************!*\
  !*** ./src/db/repositories/SocialLogin.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const SocialLogin_1 = __webpack_require__(/*! db/models/SocialLogin */ "./src/db/models/SocialLogin.ts");
const socialProviders_1 = __webpack_require__(/*! constants/socialProviders */ "./src/constants/socialProviders.ts");
let SocialLoginRepository = class SocialLoginRepository extends Base_1.BaseRepository {
    constructor() {
        super(SocialLogin_1.SocialLogin);
    }
    async findSocialLogin(socialId) {
        return await this.findOne({
            where: { socialId },
        });
    }
    async addFacebookLogin(userId, socialId) {
        return await this.create({
            userId,
            socialId,
            provider: socialProviders_1.default.FACEBOOK,
        });
    }
};
SocialLoginRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], SocialLoginRepository);
exports.SocialLoginRepository = SocialLoginRepository;


/***/ }),

/***/ "./src/db/repositories/Substrate.ts":
/*!******************************************!*\
  !*** ./src/db/repositories/Substrate.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Substrate_1 = __webpack_require__(/*! db/models/Substrate */ "./src/db/models/Substrate.ts");
let SubstrateRepository = class SubstrateRepository extends Base_1.BaseRepository {
    constructor() {
        super(Substrate_1.Substrate);
    }
    getSubstrates() {
        return this.findAll({ where: { predefined: true } });
    }
    findById(id) {
        return this.findOne({ where: { id } });
    }
    addEquipment(model) {
        return this.create({ model });
    }
    removeEquipment(id) {
        return this.destroy({ where: { id } });
    }
};
SubstrateRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], SubstrateRepository);
exports.SubstrateRepository = SubstrateRepository;


/***/ }),

/***/ "./src/db/repositories/Tag.ts":
/*!************************************!*\
  !*** ./src/db/repositories/Tag.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Tag_1 = __webpack_require__(/*! db/models/Tag */ "./src/db/models/Tag.ts");
let TagRepository = class TagRepository extends Base_1.BaseRepository {
    constructor() {
        super(Tag_1.Tag);
    }
};
TagRepository = __decorate([
    di_1.Injectable(),
    __metadata("design:paramtypes", [])
], TagRepository);
exports.TagRepository = TagRepository;


/***/ }),

/***/ "./src/db/repositories/User.ts":
/*!*************************************!*\
  !*** ./src/db/repositories/User.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataLoader = __webpack_require__(/*! dataloader */ "dataloader");
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const User_1 = __webpack_require__(/*! db/models/User */ "./src/db/models/User.ts");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const GraphQLHelper_1 = __webpack_require__(/*! utils/GraphQLHelper */ "./src/utils/GraphQLHelper.ts");
let UserRepository = class UserRepository extends Base_1.BaseRepository {
    constructor() {
        super(User_1.User);
        this.batchGetUserById = async (ids) => {
            const users = await this.findAll({ where: { id: ids } });
            return GraphQLHelper_1.GraphQLHelper.ensureOrder({
                docs: users,
                keys: ids,
                prop: 'id',
            });
        };
        this.dataLoader = new DataLoader(this.batchGetUserById);
    }
    async findUserById(id) {
        return this.dataLoader.load(id);
    }
    findUserByEmail(email) {
        return this.findOne({ where: { email } });
    }
    findUserBySlug(slug) {
        return this.findOne({ where: { slug } });
    }
    updateProfileImage(userId, publicId, url) {
        return this.update({
            profileImage: url,
            profileImagePublicId: publicId,
        }, { where: { id: userId } });
    }
    updateCoverImage(userId, publicId, url) {
        return this.update({
            coverImage: url,
            coverImagePublicId: publicId,
        }, { where: { id: userId } });
    }
    updateUserDetails(userId, userDetails) {
        return this.update(userDetails, { where: { id: userId }, returning: true });
    }
};
UserRepository = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),

/***/ "./src/db/repositories/Visitor.ts":
/*!****************************************!*\
  !*** ./src/db/repositories/Visitor.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = __webpack_require__(/*! @graphql-modules/di */ "@graphql-modules/di");
const uuid = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
const DataLoader = __webpack_require__(/*! dataloader */ "dataloader");
const Base_1 = __webpack_require__(/*! db/repositories/Base */ "./src/db/repositories/Base.ts");
const Visitor_1 = __webpack_require__(/*! db/models/Visitor */ "./src/db/models/Visitor.ts");
let VisitorRepository = class VisitorRepository extends Base_1.BaseRepository {
    constructor() {
        super(Visitor_1.Visitor);
        this.batchCountAquascapeVisits = async (ids) => {
            const views = await this.findAll({ where: { aquascapeId: ids } });
            return ids.map(id => views.filter(view => view.aquascapeId === id).length);
        };
        this.aquascapeVisitLoader = new DataLoader(this.batchCountAquascapeVisits);
    }
    addVisitor(aquascapeId, visitorId) {
        return this.findOrCreate({
            where: { visitorId: visitorId || uuid(), aquascapeId },
        });
    }
    countViews(aquascapeId) {
        return this.aquascapeVisitLoader.load(aquascapeId);
    }
};
VisitorRepository = __decorate([
    di_1.Injectable({ scope: di_1.ProviderScope.Session }),
    __metadata("design:paramtypes", [])
], VisitorRepository);
exports.VisitorRepository = VisitorRepository;


/***/ }),

/***/ "./src/di/tokens.ts":
/*!**************************!*\
  !*** ./src/di/tokens.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = {
    EQUIPMENT_PROVIDER: 'EQUIPMENT_PROVIDER',
    USER_PROVIDER: 'USERS_PROVIDER',
    FOLLOW_PROVIDER: 'FOLLOW_PROVIDER',
    AUTH_PROVIDER: 'AUTH_PROVIDER',
    AQUASCAPE_PROVIDER: 'AQUASCAPE_PROVIDER',
    LIGHT_PROVIDER: 'LIGHT_PROVIDER',
    LIKE_PROVIDER: 'LIKE_PROVIDER',
    VISITOR_PROVIDER: 'VISITOR_PROVIDER',
    TAG_PROVIDER: 'TAG_PROVIDER',
    AQUASCAPE_IMAGE_PROVIDER: 'AQUASCAPE_IMAGE_PROVIDER',
    COMMENT_PROVIDER: 'COMMENT_PROVIDER',
    PLANT_PROVIDER: 'PLANT_PROVIDER',
    HARDSCAPE_PROVIDER: 'HARDSCAPE_PROVIDER',
    LIVESTOCK_PROVIDER: 'LIVESTOCK_PROVIDER',
    SUBSTRATE_PROVIDER: 'SUBSTRATE_PROVIDER',
    ADDITIVE_PROVIDER: 'ADDITIVE_PROVIDER',
    FILTER_PROVIDER: 'FILTER_PROVIDER',
    BRAND_PROVIDER: 'BRAND_PROVIDER',
    FILTER_REPOSITORY: 'FILTER_REPOSITORY',
    BRAND_REPOSITORY: 'BRAND_REPOSITORY',
    ADDITIVE_REPOSITORY: 'ADDITIVE_REPOSITORY',
    SUBSTRATE_REPOSITORY: 'SUBSTRATE_REPOSITORY',
    USER_REPOSITORY: 'USER_REPOSITORY',
    LIVESTOCK_REPOSITORY: 'LIVESTOCK_REPOSITORY',
    HARDSCAPE_REPOSITORY: 'HARDSCAPE_REPOSITORY',
    PLANT_REPOSITORY: 'PLANT_REPOSITORY',
    LIKE_REPOSITORY: 'LIKE_REPOSITORY',
    SOCIAL_LOGIN_REPOSITORY: 'SOCIAL_LOGIN_REPOSITORY',
    COMMENT_REPOSITORY: 'COMMENT_REPOSITORY',
    FOLLOW_REPOSITORY: 'FOLLOW_REPOSITORY',
    AQUASCAPE_REPOSITORY: 'AQUASCAPE_REPOSITORY',
    VISITOR_REPOSITORY: 'VISITOR_REPOSITORY',
    LIGHT_REPOSITORY: 'LIGHT_REPOSITORY',
    TAG_REPOSITORY: 'TAG_REPOSITORY',
    EMAIL_CONFIRMATION_REPOSITORY: 'EMAIL_CONFIRMATION_REPOSITORY',
    AQUASCAPE_IMAGE_REPOSITORY: 'AQUASCAPE_IMAGE_REPOSITORY',
    AQUASCAPE_PLANT_REPOSITORY: 'AQUASCAPE_PLANT_REPOSITORY',
    AQUASCAPE_LIVESTOCK_REPOSITORY: 'AQUASCAPE_LIVESTOCK_REPOSITORY',
    AQUASCAPE_HARDSCAPE_REPOSITORY: 'AQUASCAPE_HARDSCAPE_REPOSITORY',
    AQUASCAPE_FILTER_REPOSITORY: 'AQUASCAPE_HARDSCAPE_REPOSITORY',
    AQUASCAPE_LIGHT_REPOSITORY: 'AQUASCAPE_LIGHT_REPOSITORY',
    AQUASCAPE_SUBSTRATE_REPOSITORY: 'AQUASCAPE_SUBSTRATE_REPOSITORY',
    AQUASCAPE_ADDITIVES_REPOSITORY: 'AQUASCAPE_ADDITIVES_REPOSITORY',
};


/***/ }),

/***/ "./src/interfaces/graphql/types.ts":
/*!*****************************************!*\
  !*** ./src/interfaces/graphql/types.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommentEntityType;
(function (CommentEntityType) {
    CommentEntityType["Aquascape"] = "AQUASCAPE";
    CommentEntityType["Image"] = "IMAGE";
})(CommentEntityType = exports.CommentEntityType || (exports.CommentEntityType = {}));
var EquipmentType;
(function (EquipmentType) {
    EquipmentType["Filter"] = "FILTER";
    EquipmentType["Substrate"] = "SUBSTRATE";
    EquipmentType["Light"] = "LIGHT";
    EquipmentType["Additives"] = "ADDITIVES";
})(EquipmentType = exports.EquipmentType || (exports.EquipmentType = {}));
var ImageVariant;
(function (ImageVariant) {
    ImageVariant["Profile"] = "PROFILE";
    ImageVariant["Cover"] = "COVER";
})(ImageVariant = exports.ImageVariant || (exports.ImageVariant = {}));
var LikeEntityType;
(function (LikeEntityType) {
    LikeEntityType["Aquascape"] = "AQUASCAPE";
    LikeEntityType["Image"] = "IMAGE";
    LikeEntityType["Comment"] = "COMMENT";
})(LikeEntityType = exports.LikeEntityType || (exports.LikeEntityType = {}));


/***/ }),

/***/ "./src/logger/index.ts":
/*!*****************************!*\
  !*** ./src/logger/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const winston = __webpack_require__(/*! winston */ "winston");
exports.default = winston.createLogger({
    transports: [new winston.transports.Console()],
});


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const server_1 = __webpack_require__(/*! server */ "./src/server.ts");
const App_1 = __webpack_require__(/*! api/modules/App */ "./src/api/modules/App/index.ts");
server_1.startup(App_1.AppModule);


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
const SequelizeAdapter_1 = __webpack_require__(/*! db/adapters/SequelizeAdapter */ "./src/db/adapters/SequelizeAdapter.ts");
const Database_1 = __webpack_require__(/*! db/Database */ "./src/db/Database.ts");
const passport_1 = __webpack_require__(/*! api/modules/Auth/passport */ "./src/api/modules/Auth/passport/index.ts");
exports.connectToDatabase = (onConnect) => {
    const adapter = new SequelizeAdapter_1.SequelizeAdapter();
    const database = new Database_1.Database(adapter);
    database.connect({
        host: process.env.DB_HOST || '',
        username: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || '',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    });
    database
        .testConnection()
        .then(() => console.log(`🚀 Connected to ${process.env.DB_NAME} database`))
        .then(() => onConnect && onConnect(database))
        .catch(() => console.log('⚠️ Failed to connect to the database!'));
};
exports.startup = (AppModule) => {
    const port = process.env.PORT || 8080;
    exports.connectToDatabase();
    passport_1.initPassport();
    const server = new apollo_server_1.ApolloServer({
        schema: AppModule.schema,
        context: AppModule.context,
        introspection: true,
        playground: true,
    });
    server.listen(port).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};


/***/ }),

/***/ "./src/services/cloudinary/cloudinary.ts":
/*!***********************************************!*\
  !*** ./src/services/cloudinary/cloudinary.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
const environment_1 = __webpack_require__(/*! config/environment */ "./src/config/environment.ts");
const cloudinary = __webpack_require__(/*! cloudinary */ "cloudinary");
exports.imageUploadOptions = {
    userProfileImage: {
        folder: 'profile_images',
        format: 'jpg',
        transformation: {
            width: 142,
            height: 142,
            crop: 'fill',
            q: 'auto:good',
        },
    },
    userCoverImage: {
        folder: 'cover_images',
        format: 'jpg',
        transformation: {
            width: 1470,
            height: 270,
            crop: 'lfill',
            quality: 'auto:good',
        },
    },
    aquascapeImage: {
        folder: 'aquascape_images',
        format: 'jpg',
        transformation: {
            width: 1024,
            height: 768,
            crop: 'lfill',
            quality: 'auto:good',
        },
    },
    aquascapeMainImage: {
        folder: 'aquascape_main_images',
        format: 'jpg',
        transformation: {
            width: 1440,
            height: 900,
            crop: 'lfill',
            quality: 'auto:best',
        },
    },
};
cloudinary.v2.config({
    api_key: environment_1.default.CLOUDINARY_API_KEY,
    api_secret: environment_1.default.CLOUDINARY_API_SECRET,
    cloud_name: environment_1.default.CLOUDINARY_CLOUD_NAME,
});
exports.deleteFile = (id) => new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(id, (error, result) => error ? reject(error) : resolve(result));
});
exports.getFile = (id) => new Promise((resolve, reject) => {
    cloudinary.v2.api.resource(id, (result) => result.error ? reject(result.error) : resolve(result));
});
exports.uploadStreamFile = (fileStream, options) => new Promise((resolve, reject) => {
    const readStream = fileStream();
    // @ts-ignore
    const uploadStream = cloudinary.v2.uploader.upload_stream(options, (error, result) => error ? reject(error) : resolve(result));
    readStream.on('open', () => readStream.pipe(uploadStream));
});


/***/ }),

/***/ "./src/services/cloudinary/index.ts":
/*!******************************************!*\
  !*** ./src/services/cloudinary/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./cloudinary */ "./src/services/cloudinary/cloudinary.ts"));


/***/ }),

/***/ "./src/services/mail/mail.ts":
/*!***********************************!*\
  !*** ./src/services/mail/mail.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const mailer = __webpack_require__(/*! @sendgrid/mail */ "@sendgrid/mail");
const environment_1 = __webpack_require__(/*! config/environment */ "./src/config/environment.ts");
mailer.setApiKey(environment_1.default.SENDGRID_API_KEY);
exports.sendMail = (mail) => mailer.send(mail);
exports.sendConfirmationMail = (receiver, token) => {
    const confirmationLink = `${environment_1.default.HOST}/register/validate/${token}`;
    return exports.sendMail({
        from: environment_1.default.EMAIL_SENDER,
        to: receiver,
        subject: 'Scapestory - confirmation link',
        text: `Welcome to Scapestory! Click on this link ${confirmationLink} or copy it into your address bar if you can't click it.`,
        html: `
        <div>
            <h1>Welcome to Scapestory!</h1>
            <p>Click on the link below to confirm your email and continue using Scapestory!<p/>
            <a href=${confirmationLink}>${confirmationLink}</a>
        </div>
        `,
    });
};


/***/ }),

/***/ "./src/utils/AuthHelper.ts":
/*!*********************************!*\
  !*** ./src/utils/AuthHelper.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const moment = __webpack_require__(/*! moment */ "moment");
const bcrypt_1 = __webpack_require__(/*! bcrypt */ "bcrypt");
const jwt_simple_1 = __webpack_require__(/*! jwt-simple */ "jwt-simple");
const environment_1 = __webpack_require__(/*! config/environment */ "./src/config/environment.ts");
class AuthHelper {
    static checkPassword(password, encryptedPassword) {
        return bcrypt_1.compareSync(password, encryptedPassword);
    }
    static cryptPassword(rawPassword, rounds = 10) {
        return bcrypt_1.hashSync(rawPassword, rounds);
    }
    static createJWTToken(payload) {
        const load = Object.assign(Object.assign({}, payload), { iat: moment().unix() });
        return jwt_simple_1.encode(load, environment_1.default.SECURITY_TOKEN_SECRET);
    }
    static createAuthToken(userId) {
        return AuthHelper.createJWTToken({ userId });
    }
    static createEmailConfirmationToken(email, code) {
        return AuthHelper.createJWTToken({ email, code });
    }
    static decodeJWTToken(token) {
        return jwt_simple_1.decode(token, environment_1.default.SECURITY_TOKEN_SECRET);
    }
}
exports.AuthHelper = AuthHelper;


/***/ }),

/***/ "./src/utils/GraphQLHelper.ts":
/*!************************************!*\
  !*** ./src/utils/GraphQLHelper.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const graphqlFields = __webpack_require__(/*! graphql-fields */ "graphql-fields");
const flattenObjectKeys = (obj) => Object.keys(obj).reduce((acc, key) => {
    acc = [...acc, ...flattenObjectKeys(obj[key])];
    return [...acc, key];
}, []);
class GraphQLHelper {
    static getIncludeableFields(info, modelMapping) {
        // @ts-ignore
        const fields = flattenObjectKeys(graphqlFields(info));
        const include = [];
        for (const key in modelMapping) {
            if (fields.includes(key)) {
                include.push({ model: modelMapping[key] });
            }
        }
        return include;
    }
}
exports.GraphQLHelper = GraphQLHelper;
GraphQLHelper.ensureOrder = (options) => {
    const { docs, keys, prop, } = options;
    const docsMap = new Map();
    docs.forEach(doc => docsMap.set(doc[prop], doc));
    return keys.map(key => docsMap.get(key));
};


/***/ }),

/***/ "@graphql-modules/core":
/*!****************************************!*\
  !*** external "@graphql-modules/core" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@graphql-modules/core");

/***/ }),

/***/ "@graphql-modules/di":
/*!**************************************!*\
  !*** external "@graphql-modules/di" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@graphql-modules/di");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@sendgrid/mail");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cloudinary");

/***/ }),

/***/ "dataloader":
/*!*****************************!*\
  !*** external "dataloader" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dataloader");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "graphql-fields":
/*!*********************************!*\
  !*** external "graphql-fields" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-fields");

/***/ }),

/***/ "jwt-simple":
/*!*****************************!*\
  !*** external "jwt-simple" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jwt-simple");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-facebook-token":
/*!******************************************!*\
  !*** external "passport-facebook-token" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-facebook-token");

/***/ }),

/***/ "passport-google-token":
/*!****************************************!*\
  !*** external "passport-google-token" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-google-token");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "sequelize-typescript":
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize-typescript");

/***/ }),

/***/ "slugify":
/*!**************************!*\
  !*** external "slugify" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),

/***/ "yup":
/*!**********************!*\
  !*** external "yup" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jb250ZXh0L2NvbnRleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jb250ZXh0L2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvZ3VhcmRzL2F1dGhlbnRpY2F0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvZ3VhcmRzL2F1dGhvcml6YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9ndWFyZHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9ndWFyZHMvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQWRkaXRpdmUvQWRkaXRpdmVQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQWRkaXRpdmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0FkZGl0aXZlL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQWRkaXRpdmUvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQXF1YXNjYXBlL0FxdWFzY2FwZVByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9BcXVhc2NhcGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0FxdWFzY2FwZS9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0FxdWFzY2FwZS9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQXF1YXNjYXBlSW1hZ2UvQXF1YXNjYXBlSW1hZ2VQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQXF1YXNjYXBlSW1hZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0FxdWFzY2FwZUltYWdlL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQXF1YXNjYXBlSW1hZ2Uvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0F1dGgvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0F1dGgvcGFzc3BvcnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0F1dGgvcHJvdmlkZXJzL0F1dGhQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQXV0aC9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0F1dGgvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0F1dGgvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQnJhbmQvQnJhbmRQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQnJhbmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0JyYW5kL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQnJhbmQvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0NvbW1lbnQvQ29tbWVudFByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9Db21tZW50L2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9Db21tZW50L3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvQ29tbWVudC9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvRXF1aXBtZW50L0VxdWlwbWVudFByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9FcXVpcG1lbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0VxdWlwbWVudC9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0VxdWlwbWVudC9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvRmlsdGVyL0ZpbHRlclByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9GaWx0ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0ZpbHRlci9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0ZpbHRlci9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvRm9sbG93L0ZvbGxvd1Byb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9Gb2xsb3cvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0ZvbGxvdy9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0ZvbGxvdy9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvSGFyZHNjYXBlL0hhcmRzY2FwZVByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9IYXJkc2NhcGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0hhcmRzY2FwZS9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0hhcmRzY2FwZS9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvTGlnaHQvTGlnaHRQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvTGlnaHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0xpZ2h0L3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvTGlnaHQvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0xpa2UvTGlrZVByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9MaWtlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9MaWtlL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvTGlrZS9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvTGl2ZXN0b2NrL0xpdmVzdG9ja1Byb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9MaXZlc3RvY2svaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0xpdmVzdG9jay9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL0xpdmVzdG9jay9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvUGxhbnQvUGxhbnRQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvUGxhbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL1BsYW50L3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvUGxhbnQvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL1N1YnN0cmF0ZS9TdWJzdHJhdGVQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvU3Vic3RyYXRlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9TdWJzdHJhdGUvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9TdWJzdHJhdGUvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL1VzZXIvVXNlcnNQcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvVXNlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvVXNlci9yZXNvbHZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL1VzZXIvc2NoZW1hLmdyYXBocWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9tb2R1bGVzL1Zpc2l0b3IvVmlzaXRvclByb3ZpZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9WaXNpdG9yL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcGkvbW9kdWxlcy9WaXNpdG9yL3Jlc29sdmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL21vZHVsZXMvVmlzaXRvci9zY2hlbWEuZ3JhcGhxbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnL2Vudmlyb25tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvZXJyb3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvaGVhZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL3NvY2lhbFByb3ZpZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvRGF0YWJhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL2FkYXB0ZXJzL1NlcXVlbGl6ZUFkYXB0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9BZGRpdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL0FxdWFzY2FwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL0FxdWFzY2FwZUltYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvQXF1YXNjYXBlVGFnLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvQnJhbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9DTzIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9Db21tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvRW1haWxDb25maXJtYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9GaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9Gb2xsb3cudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9IYXJkc2NhcGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9MaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL0xpa2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9MaXZlc3RvY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9QbGFudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL1NvY2lhbExvZ2luLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvU3Vic3RyYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvVGFnLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvVGFuay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9WaXNpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZUFkZGl0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVGaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZUhhcmRzY2FwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL21hbnlUb01hbnkvQXF1YXNjYXBlTGlnaHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZUxpdmVzdG9jay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL21hbnlUb01hbnkvQXF1YXNjYXBlUGxhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZVN1YnN0cmF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvbW9kZWxzL21hbnlUb01hbnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL3JlcG9zaXRvcmllcy9BZGRpdGl2ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZUFkZGl0aXZlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlRmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlSGFyZHNjYXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL3JlcG9zaXRvcmllcy9BcXVhc2NhcGVMaWdodC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZUxpdmVzdG9jay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZVBsYW50LnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlU3Vic3RyYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvQmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL0JyYW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvQ29tbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL0VtYWlsQ29uZmlybWF0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvRmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvRm9sbG93LnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvSGFyZHNjYXBlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvTGlnaHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL3JlcG9zaXRvcmllcy9MaWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvTGl2ZXN0b2NrLnRzIiwid2VicGFjazovLy8uL3NyYy9kYi9yZXBvc2l0b3JpZXMvUGxhbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL3JlcG9zaXRvcmllcy9Tb2NpYWxMb2dpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL1N1YnN0cmF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL1RhZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvcmVwb3NpdG9yaWVzL1VzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL3JlcG9zaXRvcmllcy9WaXNpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9kaS90b2tlbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyZmFjZXMvZ3JhcGhxbC90eXBlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2Nsb3VkaW5hcnkvY2xvdWRpbmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvY2xvdWRpbmFyeS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbWFpbC9tYWlsLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9BdXRoSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9HcmFwaFFMSGVscGVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBncmFwaHFsLW1vZHVsZXMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBncmFwaHFsLW1vZHVsZXMvZGlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAc2VuZGdyaWQvbWFpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwb2xsby1zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbG91ZGluYXJ5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGF0YWxvYWRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvdGVudlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdyYXBocWwtZmllbGRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiand0LXNpbXBsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGFzc3BvcnQtZmFjZWJvb2stdG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1nb29nbGUtdG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWZsZWN0LW1ldGFkYXRhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzbHVnaWZ5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXVpZC92NFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ5dXBcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvRUEsNkZBQXVDO0FBQ3ZDLDhGQUE2RDtBQUU3RCw0RUFBMkI7QUFRZCxzQkFBYyxHQUFHLENBQzFCLFFBQW9CLEVBQ29DLEVBQUUsQ0FBQyxDQUMzRCxPQUEwQixFQUMxQixjQUE2QixFQUM3QixpQkFBb0MsRUFDdEMsRUFBRSxDQUNBLFFBQVEsQ0FBQyxNQUFNLENBQ1gsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxpQ0FDUCxHQUFHLEdBQ0gsR0FBRyxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUMsRUFDcEQsRUFDRixFQUFFLENBQ0w7QUFFUSwyQkFBbUIsR0FBRyxDQUMvQixPQUF5QixFQUNPLEVBQUU7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LG1DOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLDJDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCJpbXBvcnQge01vZHVsZUNvbnRleHQsIEJ1aWxkQ29udGV4dEZuLCBNb2R1bGVTZXNzaW9uSW5mb30gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnYXBvbGxvLXNlcnZlcidcclxuXHJcbmltcG9ydCBoZWFkZXJzIGZyb20gJ2NvbnN0YW50cy9oZWFkZXJzJ1xyXG5pbXBvcnQge0F1dGhIZWxwZXIsIEF1dGhUb2tlblBheWxvYWR9IGZyb20gJ3V0aWxzL0F1dGhIZWxwZXInXHJcbmltcG9ydCB7U2Vzc2lvbkludGVyZmFjZX0gZnJvbSAnaW50ZXJmYWNlcydcclxuaW1wb3J0IGxvZ2dlciBmcm9tICdsb2dnZXInXHJcblxyXG5leHBvcnQgdHlwZSBBdXRoZW50aWNhdGlvbkNvbnRleHQgPSB7XHJcbiAgICBjdXJyZW50VXNlcklkOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU2Vzc2lvbkNvbnRleHQgPSBTZXNzaW9uSW50ZXJmYWNlXHJcblxyXG5leHBvcnQgY29uc3QgY29tcG9zZUNvbnRleHQgPSAoXHJcbiAgICBjb250ZXh0czogRnVuY3Rpb25bXVxyXG4pOiBCdWlsZENvbnRleHRGbjxDb25maWcsIE1vZHVsZVNlc3Npb25JbmZvLCBNb2R1bGVDb250ZXh0PiA9PiAoXHJcbiAgICBzZXNzaW9uOiBNb2R1bGVTZXNzaW9uSW5mbyxcclxuICAgIGN1cnJlbnRDb250ZXh0OiBNb2R1bGVDb250ZXh0LFxyXG4gICAgbW9kdWxlU2Vzc2lvbkluZm86IE1vZHVsZVNlc3Npb25JbmZvXHJcbikgPT5cclxuICAgIGNvbnRleHRzLnJlZHVjZShcclxuICAgICAgICAoYWNjLCBjdHgpID0+ICh7XHJcbiAgICAgICAgICAgIC4uLmFjYyxcclxuICAgICAgICAgICAgLi4uY3R4KHNlc3Npb24sIGN1cnJlbnRDb250ZXh0LCBtb2R1bGVTZXNzaW9uSW5mbyksXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAge31cclxuICAgIClcclxuXHJcbmV4cG9ydCBjb25zdCBhdHRhY2hDdXJyZW50VXNlcklkID0gKFxyXG4gICAgc2Vzc2lvbjogU2Vzc2lvbkludGVyZmFjZVxyXG4pOiB7Y3VycmVudFVzZXJJZDogbnVtYmVyfSB8IG9iamVjdCA9PiB7XHJcbiAgICBjb25zdCBhdXRoVG9rZW4gPSBzZXNzaW9uLnJlcS5oZWFkZXJzW2hlYWRlcnMuQVVUSF9UT0tFTl1cclxuICAgIGlmICghYXV0aFRva2VuIHx8IHR5cGVvZiBhdXRoVG9rZW4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIHt9XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gQXV0aEhlbHBlci5kZWNvZGVKV1RUb2tlbjxBdXRoVG9rZW5QYXlsb2FkPihhdXRoVG9rZW4pXHJcblxyXG4gICAgICAgIGlmICghcGF5bG9hZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge2N1cnJlbnRVc2VySWQ6IHBheWxvYWQudXNlcklkfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxvZ2dlci53YXJuKCdJbnZhbGlkIEpXVCB0b2tlbicpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhdHRhY2hTZXNzaW9uID0gKHNlc3Npb246IFNlc3Npb25JbnRlcmZhY2UpOiBTZXNzaW9uQ29udGV4dCA9PiAoe1xyXG4gICAgcmVxOiBzZXNzaW9uLnJlcSxcclxuICAgIHJlczogc2Vzc2lvbi5yZXMsXHJcbn0pXHJcbiIsImV4cG9ydCAqIGZyb20gJy4vY29udGV4dCciLCJpbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuaW1wb3J0IHtBdXRoZW50aWNhdGlvbkVycm9yfSBmcm9tICdhcG9sbG8tc2VydmVyJ1xyXG5pbXBvcnQgZXJyb3JzIGZyb20gJ2NvbnN0YW50cy9lcnJvcnMnXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aGVudGljYXRlID0gKG5leHQ6IChyb290LCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiB2b2lkKSA9PiAoXHJcbiAgICByb290LFxyXG4gICAgYXJncyxcclxuICAgIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQsXHJcbiAgICBpbmZvXHJcbikgPT4ge1xyXG4gICAgaWYgKCFjb250ZXh0LmN1cnJlbnRVc2VySWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQXV0aGVudGljYXRpb25FcnJvcihlcnJvcnMuQVVUSEVOVElDQVRJT05fRVJST1IpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQocm9vdCwgYXJncywgY29udGV4dCwgaW5mbylcclxufVxyXG4iLCJpbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuaW1wb3J0IHtBdXRoZW50aWNhdGlvbkVycm9yLCBVc2VySW5wdXRFcnJvcn0gZnJvbSAnYXBvbGxvLXNlcnZlcidcclxuXHJcbmltcG9ydCB7QXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuXHJcbi8vIEFyZ3MuYXF1YXNjYXBlSWQgc2hvdWxkIGJlIGF2YWlsYWJsZVxyXG5leHBvcnQgY29uc3QgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlID0gKG5leHQ6IChyb290LCBhcmdzLCBjb250ZXh0LCBpbmZvKSA9PiB2b2lkKSA9PlxyXG4gICAgYXN5bmMgKHJvb3QsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQsIGluZm8pID0+IHtcclxuICAgICAgICBpZiAoIWFyZ3MuYXF1YXNjYXBlSWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFVzZXJJbnB1dEVycm9yKCdObyBhcXVhc2NhcGUgaWQgc3BlY2lmaWVkJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFxdWFzY2FwZVJlcG9zaXRvcnk6IEFxdWFzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuQVFVQVNDQVBFX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgY29uc3QgYXF1YXNjYXBlID0gYXdhaXQgYXF1YXNjYXBlUmVwb3NpdG9yeS5nZXRBcXVhc2NhcGVCeUlkKGFyZ3MuYXF1YXNjYXBlSWQpXHJcblxyXG4gICAgICAgIGlmIChhcXVhc2NhcGUgJiYgYXF1YXNjYXBlLnVzZXJJZCA9PT0gY29udGV4dC5jdXJyZW50VXNlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0KHJvb3QsIGFyZ3MsIGNvbnRleHQsIGluZm8pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhlbnRpY2F0aW9uRXJyb3IoJ1VuYXV0aG9yaXplZCB0byB1cGRhdGUgdGhlIGFxdWFzY2FwZScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuIiwiZXhwb3J0ICogZnJvbSAnLi92YWxpZGF0aW9uJ1xyXG5leHBvcnQgKiBmcm9tICcuL2F1dGhlbnRpY2F0aW9uJ1xyXG5leHBvcnQgKiBmcm9tICcuL2F1dGhvcml6YXRpb24nXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5pbXBvcnQge1VzZXJJbnB1dEVycm9yfSBmcm9tICdhcG9sbG8tc2VydmVyJ1xyXG5pbXBvcnQge1NjaGVtYX0gZnJvbSAneXVwJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlID0gPFQ+KHZhbGlkYXRpb25TY2hlbWE6IFNjaGVtYTxUPikgPT4gKFxyXG4gICAgbmV4dDogKHJvb3QsIGFyZ3MsIGNvbnRleHQsIGluZm8pID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgICByZXR1cm4gKHJvb3QsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQsIGluZm8pID0+IHtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb25TY2hlbWEuaXNWYWxpZFN5bmMoYXJncykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFVzZXJJbnB1dEVycm9yKCdJbnZhbGlkIGRhdGEgcHJvdmlkZWQnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5leHQocm9vdCwgYXJncywgY29udGV4dCwgaW5mbylcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtBZGRpdGl2ZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9BZGRpdGl2ZSdcclxuaW1wb3J0IHtBZGRpdGl2ZX0gZnJvbSAnZGIvbW9kZWxzL0FkZGl0aXZlJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBZGRpdGl2ZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGdldEFkZGl0aXZlczogKCkgPT4gQmx1ZWJpcmQ8QWRkaXRpdmVbXT5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQWRkaXRpdmVQcm92aWRlciBpbXBsZW1lbnRzIEFkZGl0aXZlUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuQURESVRJVkVfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIEFkZGl0aXZlUmVwb3NpdG9yeTogQWRkaXRpdmVSZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICApIHt9XHJcblxyXG4gICAgZ2V0QWRkaXRpdmVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkFkZGl0aXZlUmVwb3NpdG9yeS5nZXRBZGRpdGl2ZXMoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7R3JhcGhRTE1vZHVsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuXHJcbmltcG9ydCB7QWRkaXRpdmVQcm92aWRlcn0gZnJvbSAnYXBpL21vZHVsZXMvQWRkaXRpdmUvQWRkaXRpdmVQcm92aWRlcidcclxuaW1wb3J0IHtBZGRpdGl2ZVJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9BZGRpdGl2ZSdcclxuXHJcbmltcG9ydCAqIGFzIHR5cGVEZWZzIGZyb20gJy4vc2NoZW1hLmdyYXBocWwnXHJcbmltcG9ydCB7cmVzb2x2ZXJzfSBmcm9tICcuL3Jlc29sdmVycydcclxuXHJcbmV4cG9ydCBjb25zdCBBZGRpdGl2ZU1vZHVsZSA9IG5ldyBHcmFwaFFMTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQURESVRJVkVfUFJPVklERVIsIHVzZUNsYXNzOiBBZGRpdGl2ZVByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkFERElUSVZFX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBBZGRpdGl2ZVJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzXHJcbn0pXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtBZGRpdGl2ZVByb3ZpZGVySW50ZXJmYWNlfSBmcm9tICcuL0FkZGl0aXZlUHJvdmlkZXInXHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhc3luYyBhZGRpdGl2ZXMocm9vdCwgYXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQWRkaXRpdmVQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5BRERJVElWRV9QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmdldEFkZGl0aXZlcygpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcInR5cGUgQWRkaXRpdmUgaW1wbGVtZW50cyBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGFkZGl0aXZlczogW0FkZGl0aXZlIV0hXFxufVxcblxcbmludGVyZmFjZSBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG5lbnVtIEVxdWlwbWVudFR5cGUge1xcbiAgRklMVEVSXFxuICBTVUJTVFJBVEVcXG4gIExJR0hUXFxuICBBRERJVElWRVNcXG59XFxuXFxuaW5wdXQgRXF1aXBtZW50QXJncyB7XFxuICBlcXVpcG1lbnRUeXBlOiBFcXVpcG1lbnRUeXBlIVxcbiAgZXF1aXBtZW50SWQ6IEludFxcbiAgbmFtZTogU3RyaW5nXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgYWRkRXF1aXBtZW50KGVxdWlwbWVudDogRXF1aXBtZW50QXJncyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogRXF1aXBtZW50IVxcbiAgcmVtb3ZlRXF1aXBtZW50KGVxdWlwbWVudDogRXF1aXBtZW50QXJncyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogRXF1aXBtZW50XFxufVxcblwiIiwiaW1wb3J0IHtHcmFwaFFMTW9kdWxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge0FxdWFzY2FwZU1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvQXF1YXNjYXBlJ1xyXG5pbXBvcnQge0ZvbGxvd01vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvRm9sbG93J1xyXG5pbXBvcnQge1VzZXJNb2R1bGV9IGZyb20gJ2FwaS9tb2R1bGVzL1VzZXInXHJcbmltcG9ydCB7QXV0aE1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvQXV0aCdcclxuaW1wb3J0IHtMaWdodE1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvTGlnaHQnXHJcbmltcG9ydCB7Q29tbWVudE1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvQ29tbWVudCdcclxuaW1wb3J0IHtMaWtlTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9MaWtlJ1xyXG5pbXBvcnQge1BsYW50TW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9QbGFudCdcclxuaW1wb3J0IHtWaXNpdG9yTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9WaXNpdG9yJ1xyXG5pbXBvcnQge0hhcmRzY2FwZU1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvSGFyZHNjYXBlJ1xyXG5pbXBvcnQge0xpdmVzdG9ja01vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvTGl2ZXN0b2NrJ1xyXG5pbXBvcnQge1N1YnN0cmF0ZU1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvU3Vic3RyYXRlJ1xyXG5pbXBvcnQge0FkZGl0aXZlTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9BZGRpdGl2ZSdcclxuaW1wb3J0IHtGaWx0ZXJNb2R1bGV9IGZyb20gJ2FwaS9tb2R1bGVzL0ZpbHRlcidcclxuaW1wb3J0IHtCcmFuZE1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvQnJhbmQnXHJcbmltcG9ydCB7RXF1aXBtZW50TW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9FcXVpcG1lbnQnXHJcbmltcG9ydCB7QXF1YXNjYXBlSW1hZ2VNb2R1bGV9IGZyb20gJ2FwaS9tb2R1bGVzL0FxdWFzY2FwZUltYWdlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcE1vZHVsZSA9IG5ldyBHcmFwaFFMTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tZW50TW9kdWxlLFxyXG4gICAgICAgIEZvbGxvd01vZHVsZSxcclxuICAgICAgICBMaWdodE1vZHVsZSxcclxuICAgICAgICBBcXVhc2NhcGVNb2R1bGUsXHJcbiAgICAgICAgTGlrZU1vZHVsZSxcclxuICAgICAgICBQbGFudE1vZHVsZSxcclxuICAgICAgICBIYXJkc2NhcGVNb2R1bGUsXHJcbiAgICAgICAgVXNlck1vZHVsZSxcclxuICAgICAgICBBdXRoTW9kdWxlLFxyXG4gICAgICAgIFZpc2l0b3JNb2R1bGUsXHJcbiAgICAgICAgTGl2ZXN0b2NrTW9kdWxlLFxyXG4gICAgICAgIFN1YnN0cmF0ZU1vZHVsZSxcclxuICAgICAgICBBZGRpdGl2ZU1vZHVsZSxcclxuICAgICAgICBGaWx0ZXJNb2R1bGUsXHJcbiAgICAgICAgQnJhbmRNb2R1bGUsXHJcbiAgICAgICAgRXF1aXBtZW50TW9kdWxlLFxyXG4gICAgICAgIEFxdWFzY2FwZUltYWdlTW9kdWxlLFxyXG4gICAgXSxcclxufSlcclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCB7SW5jbHVkZWFibGV9IGZyb20gJ3NlcXVlbGl6ZS90eXBlcydcclxuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0ZpbGVVcGxvYWR9IGZyb20gJ2dyYXBocWwtdXBsb2FkJ1xyXG5cclxuaW1wb3J0IHtBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtBcXVhc2NhcGVJbWFnZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZUltYWdlJ1xyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0IHtQYWdpbmF0aW9ufSBmcm9tICdhcGkvZ2VuZXJhdGVkL3R5cGVzJ1xyXG5pbXBvcnQge1xyXG4gICAgdXBsb2FkU3RyZWFtRmlsZSxcclxuICAgIENsb3VkaW5hcnlVcGxvYWRSZXN1bHQsXHJcbiAgICBkZWxldGVGaWxlLFxyXG4gICAgaW1hZ2VVcGxvYWRPcHRpb25zLFxyXG59IGZyb20gJ3NlcnZpY2VzL2Nsb3VkaW5hcnknXHJcbmltcG9ydCBsb2dnZXIgZnJvbSAnbG9nZ2VyJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBcXVhc2NhcGVQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBnZXRBcXVhc2NhcGVzOiAoXHJcbiAgICAgICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbixcclxuICAgICAgICB1c2VySWQ/OiBudW1iZXIgfCBudWxsLFxyXG4gICAgICAgIHJhbmRvbT86IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdXHJcbiAgICApID0+IFByb21pc2U8e3Jvd3M6IEFxdWFzY2FwZVtdOyBjb3VudDogbnVtYmVyfT5cclxuXHJcbiAgICBnZXRGZWF0dXJlZEFxdWFzY2FwZTogKGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdKSA9PiBCbHVlYmlyZDxBcXVhc2NhcGUgfCBudWxsPlxyXG5cclxuICAgIGdldFRyZW5kaW5nQXF1YXNjYXBlczogKFxyXG4gICAgICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb24sXHJcbiAgICAgICAgaW5jbHVkZT86IEluY2x1ZGVhYmxlW11cclxuICAgICkgPT4gQmx1ZWJpcmQ8QXF1YXNjYXBlW10+XHJcblxyXG4gICAgZ2V0QXF1YXNjYXBlQnlJZDogKGlkOiBudW1iZXIsIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdKSA9PiBCbHVlYmlyZDxBcXVhc2NhcGUgfCBudWxsPlxyXG5cclxuICAgIGNyZWF0ZUFxdWFzY2FwZTogKHVzZXJJZDogbnVtYmVyKSA9PiBQcm9taXNlPEFxdWFzY2FwZT5cclxuXHJcbiAgICBnZXRBcXVhc2NhcGVJbWFnZXM6IChhcXVhc2NhcGVJZDogbnVtYmVyKSA9PiBCbHVlYmlyZDxBcXVhc2NhcGVJbWFnZVtdPlxyXG5cclxuICAgIHVwZGF0ZUFxdWFzY2FwZVRpdGxlOiAoYXF1YXNjYXBlSWQ6IG51bWJlciwgdGl0bGU6IHN0cmluZykgPT4gQmx1ZWJpcmQ8W251bWJlciwgQXF1YXNjYXBlW11dPlxyXG5cclxuICAgIHVwZGF0ZUFxdWFzY2FwZU1haW5JbWFnZTogKFxyXG4gICAgICAgIGFxdWFzY2FwZUlkOiBudW1iZXIsXHJcbiAgICAgICAgZmlsZTogUHJvbWlzZTxGaWxlVXBsb2FkPlxyXG4gICAgKSA9PiBQcm9taXNlPENsb3VkaW5hcnlVcGxvYWRSZXN1bHQ+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZVByb3ZpZGVyIGltcGxlbWVudHMgQXF1YXNjYXBlUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuQVFVQVNDQVBFX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBhcXVhc2NhcGVSZXBvc2l0b3J5OiBBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICApIHt9XHJcblxyXG4gICAgZ2V0QXF1YXNjYXBlcyhcclxuICAgICAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uLFxyXG4gICAgICAgIHVzZXJJZD86IG51bWJlcixcclxuICAgICAgICByYW5kb20/OiBib29sZWFuLFxyXG4gICAgICAgIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdXHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcXVhc2NhcGVSZXBvc2l0b3J5LmdldEFxdWFzY2FwZXMocGFnaW5hdGlvbiwgdXNlcklkLCByYW5kb20sIGluY2x1ZGUpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmVhdHVyZWRBcXVhc2NhcGUoaW5jbHVkZT86IEluY2x1ZGVhYmxlW10pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcXVhc2NhcGVSZXBvc2l0b3J5LmdldEZlYXR1cmVkQXF1YXNjYXBlKGluY2x1ZGUpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJlbmRpbmdBcXVhc2NhcGVzKHBhZ2luYXRpb246IFBhZ2luYXRpb24sIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXF1YXNjYXBlUmVwb3NpdG9yeS5nZXRUcmVuZGluZ0FxdWFzY2FwZXMocGFnaW5hdGlvbiwgaW5jbHVkZSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcXVhc2NhcGVCeUlkKGlkOiBudW1iZXIsIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXF1YXNjYXBlUmVwb3NpdG9yeS5nZXRBcXVhc2NhcGVCeUlkKGlkLCBpbmNsdWRlKVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUFxdWFzY2FwZSh1c2VySWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFxdWFzY2FwZVJlcG9zaXRvcnkuY3JlYXRlKHt1c2VySWR9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFxdWFzY2FwZUltYWdlcyhhcXVhc2NhcGVJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXF1YXNjYXBlUmVwb3NpdG9yeS5nZXRBcXVhc2NhcGVJbWFnZXMoYXF1YXNjYXBlSWQpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQXF1YXNjYXBlVGl0bGUoYXF1YXNjYXBlSWQ6IG51bWJlciwgdGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFxdWFzY2FwZVJlcG9zaXRvcnkudXBkYXRlQXF1YXNjYXBlVGl0bGUoYXF1YXNjYXBlSWQsIHRpdGxlKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwZGF0ZUFxdWFzY2FwZU1haW5JbWFnZShhcXVhc2NhcGVJZDogbnVtYmVyLCBmaWxlOiBQcm9taXNlPEZpbGVVcGxvYWQ+KSB7XHJcbiAgICAgICAgY29uc3QgYXF1YXNjYXBlID0gYXdhaXQgdGhpcy5hcXVhc2NhcGVSZXBvc2l0b3J5LmdldEFxdWFzY2FwZUJ5SWQoYXF1YXNjYXBlSWQpXHJcbiAgICAgICAgY29uc3Qge2NyZWF0ZVJlYWRTdHJlYW19ID0gYXdhaXQgZmlsZVxyXG5cclxuICAgICAgICAvLyBVcGxvYWQgbmV3IGltYWdlXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBsb2FkU3RyZWFtRmlsZShcclxuICAgICAgICAgICAgY3JlYXRlUmVhZFN0cmVhbSxcclxuICAgICAgICAgICAgaW1hZ2VVcGxvYWRPcHRpb25zLmFxdWFzY2FwZU1haW5JbWFnZVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG9sZCBpbWFnZVxyXG4gICAgICAgIGlmIChhcXVhc2NhcGU/Lm1haW5JbWFnZVB1YmxpY0lkKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZUZpbGUoYXF1YXNjYXBlLm1haW5JbWFnZVB1YmxpY0lkKS5jYXRjaChlcnJvciA9PiBsb2dnZXIuZXJyb3IoZXJyb3IpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIG1haW4gaW1hZ2UgaW4gZGJcclxuICAgICAgICBhd2FpdCB0aGlzLmFxdWFzY2FwZVJlcG9zaXRvcnkudXBkYXRlQXF1YXNjYXBlTWFpbkltYWdlKFxyXG4gICAgICAgICAgICBhcXVhc2NhcGVJZCxcclxuICAgICAgICAgICAgcmVzdWx0LnB1YmxpY19pZCxcclxuICAgICAgICAgICAgcmVzdWx0LnNlY3VyZV91cmxcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7QXF1YXNjYXBlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtMaWtlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0xpa2UnXHJcbmltcG9ydCB7VGFnUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL1RhZydcclxuaW1wb3J0IHtVc2VyUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL1VzZXInXHJcblxyXG5pbXBvcnQge1VzZXJzUHJvdmlkZXJ9IGZyb20gJ2FwaS9tb2R1bGVzL1VzZXIvVXNlcnNQcm92aWRlcidcclxuaW1wb3J0IHtMaWtlUHJvdmlkZXJ9IGZyb20gJ2FwaS9tb2R1bGVzL0xpa2UvTGlrZVByb3ZpZGVyJ1xyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0IHtBcXVhc2NhcGVQcm92aWRlcn0gZnJvbSAnLi9BcXVhc2NhcGVQcm92aWRlcidcclxuaW1wb3J0IHtyZXNvbHZlcnMsIHJlc29sdmVyc0NvbXBvc2l0aW9ufSBmcm9tICcuL3Jlc29sdmVycydcclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnLi9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHthdHRhY2hDdXJyZW50VXNlcklkLCBjb21wb3NlQ29udGV4dH0gZnJvbSAnYXBpL2NvbnRleHQnXHJcbmltcG9ydCB7VXNlck1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvVXNlcidcclxuaW1wb3J0IHtGaWx0ZXJNb2R1bGV9IGZyb20gJ2FwaS9tb2R1bGVzL0ZpbHRlcidcclxuaW1wb3J0IHtMaWdodE1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvTGlnaHQnXHJcbmltcG9ydCB7UGxhbnRNb2R1bGV9IGZyb20gJ2FwaS9tb2R1bGVzL1BsYW50J1xyXG5pbXBvcnQge0hhcmRzY2FwZU1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvSGFyZHNjYXBlJ1xyXG5pbXBvcnQge0xpdmVzdG9ja01vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvTGl2ZXN0b2NrJ1xyXG5pbXBvcnQge1N1YnN0cmF0ZU1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvU3Vic3RyYXRlJ1xyXG5pbXBvcnQge0FkZGl0aXZlTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9BZGRpdGl2ZSdcclxuaW1wb3J0IHtMaWtlTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9MaWtlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUltYWdlTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9BcXVhc2NhcGVJbWFnZSdcclxuXHJcbmV4cG9ydCBjb25zdCBBcXVhc2NhcGVNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkFRVUFTQ0FQRV9QUk9WSURFUiwgdXNlQ2xhc3M6IEFxdWFzY2FwZVByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkFRVUFTQ0FQRV9SRVBPU0lUT1JZLCB1c2VDbGFzczogQXF1YXNjYXBlUmVwb3NpdG9yeX0sXHJcblxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuVVNFUl9QUk9WSURFUiwgdXNlQ2xhc3M6IFVzZXJzUHJvdmlkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuVVNFUl9SRVBPU0lUT1JZLCB1c2VDbGFzczogVXNlclJlcG9zaXRvcnl9LFxyXG5cclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkxJS0VfUFJPVklERVIsIHVzZUNsYXNzOiBMaWtlUHJvdmlkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuTElLRV9SRVBPU0lUT1JZLCB1c2VDbGFzczogTGlrZVJlcG9zaXRvcnl9LFxyXG5cclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlRBR19SRVBPU0lUT1JZLCB1c2VDbGFzczogVGFnUmVwb3NpdG9yeX0sXHJcbiAgICBdLFxyXG4gICAgdHlwZURlZnMsXHJcbiAgICByZXNvbHZlcnMsXHJcbiAgICByZXNvbHZlcnNDb21wb3NpdGlvbixcclxuICAgIGNvbnRleHQ6IGNvbXBvc2VDb250ZXh0KFthdHRhY2hDdXJyZW50VXNlcklkXSksXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgVXNlck1vZHVsZSxcclxuICAgICAgICBGaWx0ZXJNb2R1bGUsXHJcbiAgICAgICAgTGlnaHRNb2R1bGUsXHJcbiAgICAgICAgUGxhbnRNb2R1bGUsXHJcbiAgICAgICAgSGFyZHNjYXBlTW9kdWxlLFxyXG4gICAgICAgIExpdmVzdG9ja01vZHVsZSxcclxuICAgICAgICBTdWJzdHJhdGVNb2R1bGUsXHJcbiAgICAgICAgQWRkaXRpdmVNb2R1bGUsXHJcbiAgICAgICAgRmlsdGVyTW9kdWxlLFxyXG4gICAgICAgIExpa2VNb2R1bGUsXHJcbiAgICAgICAgQXF1YXNjYXBlSW1hZ2VNb2R1bGVcclxuICAgIF1cclxufSlcclxuIiwiaW1wb3J0IHtHcmFwaFFMUmVzb2x2ZUluZm99IGZyb20gJ2dyYXBocWwnXHJcblxyXG5pbXBvcnQge2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlfSBmcm9tICdhcGkvZ3VhcmRzJ1xyXG5pbXBvcnQge1VzZXJzUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJ2FwaS9tb2R1bGVzL1VzZXIvVXNlcnNQcm92aWRlcidcclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuXHJcbmltcG9ydCB7VGFnfSBmcm9tICdkYi9tb2RlbHMvVGFnJ1xyXG5pbXBvcnQge1BsYW50fSBmcm9tICdkYi9tb2RlbHMvUGxhbnQnXHJcbmltcG9ydCB7SGFyZHNjYXBlfSBmcm9tICdkYi9tb2RlbHMvSGFyZHNjYXBlJ1xyXG5pbXBvcnQge0xpdmVzdG9ja30gZnJvbSAnZGIvbW9kZWxzL0xpdmVzdG9jaydcclxuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gJ2RiL21vZGVscy9GaWx0ZXInXHJcbmltcG9ydCB7TGlnaHR9IGZyb20gJ2RiL21vZGVscy9MaWdodCdcclxuaW1wb3J0IHtDTzJ9IGZyb20gJ2RiL21vZGVscy9DTzInXHJcbmltcG9ydCB7U3Vic3RyYXRlfSBmcm9tICdkYi9tb2RlbHMvU3Vic3RyYXRlJ1xyXG5pbXBvcnQge0FkZGl0aXZlfSBmcm9tICdkYi9tb2RlbHMvQWRkaXRpdmUnXHJcbmltcG9ydCB7VGFua30gZnJvbSAnZGIvbW9kZWxzL1RhbmsnXHJcbmltcG9ydCB7QXF1YXNjYXBlSW1hZ2V9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGVJbWFnZSdcclxuXHJcbmltcG9ydCB7QXF1YXNjYXBlUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJy4vQXF1YXNjYXBlUHJvdmlkZXInXHJcbmltcG9ydCB7R3JhcGhRTEhlbHBlcn0gZnJvbSAndXRpbHMvR3JhcGhRTEhlbHBlcidcclxuaW1wb3J0IHtcclxuICAgIFF1ZXJ5QXF1YXNjYXBlc0FyZ3MsXHJcbiAgICBRdWVyeVRyZW5kaW5nQXF1YXNjYXBlc0FyZ3MsXHJcbiAgICBRdWVyeUFxdWFzY2FwZUFyZ3MsXHJcbiAgICBNdXRhdGlvblVwZGF0ZUFxdWFzY2FwZVRpdGxlQXJncyxcclxufSBmcm9tICdhcGkvZ2VuZXJhdGVkL3R5cGVzJ1xyXG5pbXBvcnQge0ZpbGVVcGxvYWR9IGZyb20gJ2dyYXBocWwtdXBsb2FkJ1xyXG5cclxuY29uc3QgbW9kZWxNYXBwaW5nID0ge1xyXG4gICAgdGFnczogVGFnLFxyXG4gICAgcGxhbnRzOiBQbGFudCxcclxuICAgIGhhcmRzY2FwZTogSGFyZHNjYXBlLFxyXG4gICAgbGl2ZXN0b2NrOiBMaXZlc3RvY2ssXHJcbiAgICBmaWx0ZXJzOiBGaWx0ZXIsXHJcbiAgICBsaWdodHM6IExpZ2h0LFxyXG4gICAgY28yOiBDTzIsXHJcbiAgICBzdWJzdHJhdGVzOiBTdWJzdHJhdGUsXHJcbiAgICBhZGRpdGl2ZXM6IEFkZGl0aXZlLFxyXG4gICAgdGFuazogVGFuayxcclxuICAgIGltYWdlczogQXF1YXNjYXBlSW1hZ2UsXHJcbn1cclxuXHJcbmNvbnN0IGdldEFxdWFzY2FwZUpvaW5GaWVsZHMgPSAoaW5mbzogR3JhcGhRTFJlc29sdmVJbmZvKSA9PlxyXG4gICAgR3JhcGhRTEhlbHBlci5nZXRJbmNsdWRlYWJsZUZpZWxkcyhpbmZvLCBtb2RlbE1hcHBpbmcpXHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhc3luYyBhcXVhc2NhcGVzKHJvb3QsIGFyZ3M6IFF1ZXJ5QXF1YXNjYXBlc0FyZ3MsIGNvbnRleHQsIGluZm8pIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEFxdWFzY2FwZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkFRVUFTQ0FQRV9QUk9WSURFUilcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5nZXRBcXVhc2NhcGVzKFxyXG4gICAgICAgICAgICAgICAgYXJncy5wYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgYXJncy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICBhcmdzLnJhbmRvbSxcclxuICAgICAgICAgICAgICAgIGdldEFxdWFzY2FwZUpvaW5GaWVsZHMoaW5mbylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgdHJlbmRpbmdBcXVhc2NhcGVzKHJvb3QsIGFyZ3M6IFF1ZXJ5VHJlbmRpbmdBcXVhc2NhcGVzQXJncywgY29udGV4dCwgaW5mbykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQXF1YXNjYXBlUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuQVFVQVNDQVBFX1BST1ZJREVSKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmdldFRyZW5kaW5nQXF1YXNjYXBlcyhhcmdzLnBhZ2luYXRpb24sIGdldEFxdWFzY2FwZUpvaW5GaWVsZHMoaW5mbykpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBmZWF0dXJlZEFxdWFzY2FwZShyb290LCBhcmdzLCBjb250ZXh0LCBpbmZvKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBBcXVhc2NhcGVQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5BUVVBU0NBUEVfUFJPVklERVIpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZ2V0RmVhdHVyZWRBcXVhc2NhcGUoZ2V0QXF1YXNjYXBlSm9pbkZpZWxkcyhpbmZvKSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGFxdWFzY2FwZShyb290LCBhcmdzOiBRdWVyeUFxdWFzY2FwZUFyZ3MsIGNvbnRleHQsIGluZm8pIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEFxdWFzY2FwZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkFRVUFTQ0FQRV9QUk9WSURFUilcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5nZXRBcXVhc2NhcGVCeUlkKGFyZ3MuaWQsIGdldEFxdWFzY2FwZUpvaW5GaWVsZHMoaW5mbykpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBBcXVhc2NhcGU6IHtcclxuICAgICAgICBhc3luYyB1c2VyKGFxdWFzY2FwZSwgYXJncywgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogVXNlcnNQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5VU0VSX1BST1ZJREVSKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmZpbmRVc2VyQnlJZChhcXVhc2NhcGUudXNlcklkKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgVXNlcjoge1xyXG4gICAgICAgIGFzeW5jIGFxdWFzY2FwZXModXNlciwgYXJncywgY29udGV4dCwgaW5mbykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQXF1YXNjYXBlUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuQVFVQVNDQVBFX1BST1ZJREVSKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmdldEFxdWFzY2FwZXMoXHJcbiAgICAgICAgICAgICAgICBhcmdzLnBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgYXJncy5yYW5kb20sXHJcbiAgICAgICAgICAgICAgICBnZXRBcXVhc2NhcGVKb2luRmllbGRzKGluZm8pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIE11dGF0aW9uOiB7XHJcbiAgICAgICAgYXN5bmMgY3JlYXRlQXF1YXNjYXBlKHJvb3QsIGFyZ3MsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEFxdWFzY2FwZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkFRVUFTQ0FQRV9QUk9WSURFUilcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5jcmVhdGVBcXVhc2NhcGUoY29udGV4dC5jdXJyZW50VXNlcklkKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFzeW5jIHVwZGF0ZUFxdWFzY2FwZVRpdGxlKHJvb3QsIGFyZ3M6IE11dGF0aW9uVXBkYXRlQXF1YXNjYXBlVGl0bGVBcmdzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBBcXVhc2NhcGVQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5BUVVBU0NBUEVfUFJPVklERVIpXHJcbiAgICAgICAgICAgIGNvbnN0IG1heFRpdGxlTGVuZ3RoID0gNDBcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBhcmdzLnRpdGxlLnNsaWNlKDAsIG1heFRpdGxlTGVuZ3RoKVxyXG5cclxuICAgICAgICAgICAgYXdhaXQgcHJvdmlkZXIudXBkYXRlQXF1YXNjYXBlVGl0bGUoYXJncy5hcXVhc2NhcGVJZCwgdGl0bGUpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGl0bGVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhc3luYyB1cGRhdGVBcXVhc2NhcGVNYWluSW1hZ2Uocm9vdCwgYXJnczogeyBhcXVhc2NhcGVJZDogbnVtYmVyLCBmaWxlOiBQcm9taXNlPEZpbGVVcGxvYWQ+fSwgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQXF1YXNjYXBlUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuQVFVQVNDQVBFX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcm92aWRlci51cGRhdGVBcXVhc2NhcGVNYWluSW1hZ2UoYXJncy5hcXVhc2NhcGVJZCwgYXJncy5maWxlKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1haW5JbWFnZVB1YmxpY0lkOiByZXN1bHQucHVibGljX2lkLFxyXG4gICAgICAgICAgICAgICAgbWFpbkltYWdlVXJsOiByZXN1bHQuc2VjdXJlX3VybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVyc0NvbXBvc2l0aW9uID0ge1xyXG4gICAgJ011dGF0aW9uLmNyZWF0ZUFxdWFzY2FwZSc6IFthdXRoZW50aWNhdGVdLFxyXG4gICAgJ011dGF0aW9uLnVwZGF0ZUFxdWFzY2FwZVRpdGxlJzogW2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlXSxcclxuICAgICdNdXRhdGlvbi51cGRhdGVBcXVhc2NhcGVNYWluSW1hZ2UnOiBbYXV0aGVudGljYXRlLCBhdXRob3JpemVBcXVhc2NhcGVVcGRhdGVdLFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIENPMiB7XFxuICBpZDogSW50IVxcbiAgdHlwZTogU3RyaW5nXFxuICBicHM6IEludFxcbn1cXG5cXG50eXBlIFRhZyB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG5hbWU6IFN0cmluZyFcXG59XFxuXFxudHlwZSBUYW5rIHtcXG4gIGlkOiBJbnQhXFxuICB2b2x1bWU6IEZsb2F0XFxuICB3aWR0aDogRmxvYXRcXG4gIGhlaWdodDogRmxvYXRcXG4gIGRlcHRoOiBGbG9hdFxcbiAgZ2xhc3NUaGlja25lc3M6IEZsb2F0XFxufVxcblxcbnR5cGUgVXNlciB7XFxuICBhcXVhc2NhcGVzKHBhZ2luYXRpb246IFBhZ2luYXRpb24hLCByYW5kb206IEJvb2xlYW4pOiBBcXVhc2NhcGVzUmVzdWx0IVxcbn1cXG5cXG50eXBlIEFxdWFzY2FwZSB7XFxuICBpZDogSW50IVxcbiAgY3JlYXRlZEF0OiBTdHJpbmchXFxuICB1cGRhdGVkQXQ6IFN0cmluZyFcXG4gIHRpdGxlOiBTdHJpbmdcXG4gIGZlYXR1cmVkOiBCb29sZWFuIVxcbiAgdHJlbmRpbmc6IEJvb2xlYW4hXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICB1c2VySWQ6IEludCFcXG4gIHVzZXI6IFVzZXJcXG4gIGNvMjogQ08yXFxuICB0YW5rOiBUYW5rXFxuICBtYWluSW1hZ2VVcmw6IFN0cmluZ1xcbiAgbWFpbkltYWdlUHVibGljSWQ6IFN0cmluZ1xcbiAgaW1hZ2VzOiBbQXF1YXNjYXBlSW1hZ2UhXSFcXG4gIHRhZ3M6IFtUYWchXSFcXG4gIHBsYW50czogW1BsYW50IV0hXFxuICBoYXJkc2NhcGU6IFtIYXJkc2NhcGUhXSFcXG4gIGxpdmVzdG9jazogW0xpdmVzdG9jayFdIVxcbiAgZmlsdGVyczogW0ZpbHRlciFdIVxcbiAgbGlnaHRzOiBbTGlnaHQhXSFcXG4gIHN1YnN0cmF0ZXM6IFtTdWJzdHJhdGUhXSFcXG4gIGFkZGl0aXZlczogW0FkZGl0aXZlIV0hXFxufVxcblxcbmlucHV0IFBhZ2luYXRpb24ge1xcbiAgbGltaXQ6IEludFxcbiAgY3Vyc29yOiBTdHJpbmdcXG4gIG9mZnNldDogSW50XFxufVxcblxcbmlucHV0IEFxdWFzY2FwZXNGaWx0ZXIge1xcbiAgdHJlbmRpbmc6IEJvb2xlYW5cXG59XFxuXFxudHlwZSBBcXVhc2NhcGVzUmVzdWx0IHtcXG4gIHJvd3M6IFtBcXVhc2NhcGUhXSFcXG4gIGNvdW50OiBJbnQhXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgYXF1YXNjYXBlcyhwYWdpbmF0aW9uOiBQYWdpbmF0aW9uISwgdXNlcklkOiBJbnQsIHJhbmRvbTogQm9vbGVhbik6IEFxdWFzY2FwZXNSZXN1bHQhXFxuICB0cmVuZGluZ0FxdWFzY2FwZXMocGFnaW5hdGlvbjogUGFnaW5hdGlvbiEpOiBbQXF1YXNjYXBlIV0hXFxuICBmZWF0dXJlZEFxdWFzY2FwZTogQXF1YXNjYXBlXFxuICBhcXVhc2NhcGUoaWQ6IEludCEpOiBBcXVhc2NhcGVcXG59XFxuXFxuc2NhbGFyIFVwbG9hZFxcblxcbnR5cGUgTWFpbkltYWdlVXBsb2FkUmVzdWx0IHtcXG4gIG1haW5JbWFnZVB1YmxpY0lkOiBTdHJpbmchXFxuICBtYWluSW1hZ2VVcmw6IFN0cmluZyFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBjcmVhdGVBcXVhc2NhcGU6IEFxdWFzY2FwZSFcXG4gIHVwZGF0ZUFxdWFzY2FwZVRpdGxlKGFxdWFzY2FwZUlkOiBJbnQhLCB0aXRsZTogU3RyaW5nISk6IFN0cmluZ1xcbiAgdXBkYXRlQXF1YXNjYXBlTWFpbkltYWdlKGFxdWFzY2FwZUlkOiBJbnQhLCBmaWxlOiBVcGxvYWQhKTogTWFpbkltYWdlVXBsb2FkUmVzdWx0IVxcbn1cXG5cXG50eXBlIFVzZXIge1xcbiAgaWQ6IEludCFcXG4gIHNsdWc6IFN0cmluZyFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGFib3V0OiBTdHJpbmdcXG4gIHByb2ZpbGVJbWFnZTogU3RyaW5nXFxuICBwcm9maWxlSW1hZ2VQdWJsaWNJZDogU3RyaW5nXFxuICBjb3ZlckltYWdlOiBTdHJpbmdcXG4gIGNvdmVySW1hZ2VQdWJsaWNJZDogU3RyaW5nXFxuICBjb3VudHJ5OiBTdHJpbmdcXG4gIGZhY2Vib29rVXJsOiBTdHJpbmdcXG4gIHlvdXR1YmVVcmw6IFN0cmluZ1xcbiAgaW5zdGFncmFtVXJsOiBTdHJpbmdcXG4gIHR3aXR0ZXJVcmw6IFN0cmluZ1xcbiAgY3JlYXRlZEF0OiBTdHJpbmchXFxuICB1cGRhdGVkQXQ6IFN0cmluZyFcXG59XFxuXFxudHlwZSBBdXRoUGF5bG9hZCB7XFxuICB0b2tlbjogU3RyaW5nIVxcbiAgdXNlcjogVXNlciFcXG59XFxuXFxudHlwZSBJbWFnZVVwbG9hZFJlc3VsdCB7XFxuICBpbWFnZVVybDogU3RyaW5nIVxcbiAgaW1hZ2VQdWJsaWNJZDogU3RyaW5nIVxcbn1cXG5cXG5lbnVtIEltYWdlVmFyaWFudCB7XFxuICBQUk9GSUxFXFxuICBDT1ZFUlxcbn1cXG5cXG5pbnB1dCBVc2VyRGV0YWlscyB7XFxuICBuYW1lOiBTdHJpbmdcXG4gIGFib3V0OiBTdHJpbmdcXG4gIGZhY2Vib29rVXJsOiBTdHJpbmdcXG4gIHlvdXR1YmVVcmw6IFN0cmluZ1xcbiAgaW5zdGFncmFtVXJsOiBTdHJpbmdcXG4gIHR3aXR0ZXJVcmw6IFN0cmluZ1xcbn1cXG5cXG5zY2FsYXIgVXBsb2FkXFxuXFxudHlwZSBRdWVyeSB7XFxuICBtZTogVXNlclxcbiAgdXNlcihpZDogSW50ISk6IFVzZXJcXG4gIHVzZXJCeVNsdWcoc2x1ZzogU3RyaW5nISk6IFVzZXJcXG4gIHVzZXJzOiBbVXNlcl0hXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgdXBsb2FkVXNlckltYWdlKGZpbGU6IFVwbG9hZCEsIGltYWdlVmFyaWFudDogSW1hZ2VWYXJpYW50ISk6IEltYWdlVXBsb2FkUmVzdWx0IVxcbiAgdXBkYXRlVXNlckRldGFpbHMoZGV0YWlsczogVXNlckRldGFpbHMhKTogW1VzZXJdXFxuICBjb25maXJtRW1haWwodG9rZW46IFN0cmluZyEpOiBBdXRoUGF5bG9hZFxcbn1cXG5cXG50eXBlIEZpbHRlciBpbXBsZW1lbnRzIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgZmlsdGVyczogW0ZpbHRlciFdIVxcbn1cXG5cXG5pbnRlcmZhY2UgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxuZW51bSBFcXVpcG1lbnRUeXBlIHtcXG4gIEZJTFRFUlxcbiAgU1VCU1RSQVRFXFxuICBMSUdIVFxcbiAgQURESVRJVkVTXFxufVxcblxcbmlucHV0IEVxdWlwbWVudEFyZ3Mge1xcbiAgZXF1aXBtZW50VHlwZTogRXF1aXBtZW50VHlwZSFcXG4gIGVxdWlwbWVudElkOiBJbnRcXG4gIG5hbWU6IFN0cmluZ1xcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudCFcXG4gIHJlbW92ZUVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudFxcbn1cXG5cXG50eXBlIExpZ2h0IGltcGxlbWVudHMgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIHdpZHRoOiBGbG9hdFxcbiAgaGVpZ2h0OiBGbG9hdFxcbiAgZGVwdGg6IEZsb2F0XFxuICBwb3dlcjogRmxvYXRcXG4gIGx1bWVuTWluOiBJbnRcXG4gIGx1bWVuTWF4OiBJbnRcXG4gIGtlbHZpbk1pbjogSW50XFxuICBrZWx2aW5NYXg6IEludFxcbiAgZGltbWFibGU6IEJvb2xlYW5cXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBsaWdodHM6IFtMaWdodCFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZExpZ2h0KGJyYW5kOiBTdHJpbmchLCBtb2RlbDogU3RyaW5nISwgYXF1YXNjYXBlSWQ6IEludCEpOiBMaWdodCFcXG4gIHJlbW92ZUxpZ2h0KGxpZ2h0SWQ6IEludCEsIGFxdWFzY2FwZUlkOiBJbnQhKTogTGlnaHRcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBQbGFudCB7XFxuICBpZDogSW50IVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbiAgb3JpZ2luOiBTdHJpbmdcXG4gIG1pbkhlaWdodDogSW50XFxuICBtYXhIZWlnaHQ6IEludFxcbiAgcG9zaXRpb246IFN0cmluZ1xcbiAgbHVtaW5vc2l0eTogU3RyaW5nXFxuICBncm93dGhTcGVlZDogU3RyaW5nXFxuICBkaWZmaWN1bHR5OiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBwbGFudHM6IFtQbGFudCFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZFBsYW50KHBsYW50SWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IFBsYW50IVxcbiAgcmVtb3ZlUGxhbnQocGxhbnRJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBQbGFudFxcbn1cXG5cXG50eXBlIEhhcmRzY2FwZSB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBoYXJkc2NhcGU6IFtIYXJkc2NhcGUhXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRIYXJkc2NhcGUoaGFyZHNjYXBlSWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IEhhcmRzY2FwZSFcXG4gIHJlbW92ZUhhcmRzY2FwZShoYXJkc2NhcGVJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBIYXJkc2NhcGVcXG59XFxuXFxudHlwZSBMaXZlc3RvY2sge1xcbiAgaWQ6IEludCFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBsaXZlc3RvY2s6IFtMaXZlc3RvY2shXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRMaXZlc3RvY2sobGl2ZXN0b2NrSWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IExpdmVzdG9jayFcXG4gIHJlbW92ZUxpdmVzdG9jayhsaXZlc3RvY2tJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBMaXZlc3RvY2tcXG59XFxuXFxudHlwZSBTdWJzdHJhdGUgaW1wbGVtZW50cyBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIHN1YnN0cmF0ZXM6IFtTdWJzdHJhdGUhXSFcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBBZGRpdGl2ZSBpbXBsZW1lbnRzIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgYWRkaXRpdmVzOiBbQWRkaXRpdmUhXSFcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBGaWx0ZXIgaW1wbGVtZW50cyBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGZpbHRlcnM6IFtGaWx0ZXIhXSFcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBMaWtlIHtcXG4gIGlkOiBJbnQhXFxuICB1c2VySWQ6IEludCFcXG4gIGFxdWFzY2FwZUltYWdlSWQ6IEludFxcbiAgYXF1YXNjYXBlSWQ6IEludFxcbiAgY29tbWVudElkOiBJbnRcXG59XFxuXFxudHlwZSBBcXVhc2NhcGUge1xcbiAgbGlrZXNDb3VudDogSW50IVxcbiAgaXNMaWtlZEJ5TWU6IEJvb2xlYW4hXFxufVxcblxcbmVudW0gTGlrZUVudGl0eVR5cGUge1xcbiAgQVFVQVNDQVBFXFxuICBJTUFHRVxcbiAgQ09NTUVOVFxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGxpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSEsIGVudGl0eUlkOiBJbnQhKTogTGlrZVxcbiAgZGlzbGlrZShlbnRpdHk6IExpa2VFbnRpdHlUeXBlISwgZW50aXR5SWQ6IEludCEpOiBMaWtlXFxufVxcblxcbnR5cGUgQXF1YXNjYXBlSW1hZ2Uge1xcbiAgaWQ6IEludCFcXG4gIHRpdGxlOiBTdHJpbmdcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIHVybDogU3RyaW5nIVxcbiAgcHVibGljSWQ6IFN0cmluZyFcXG4gIGNyZWF0ZWRBdDogU3RyaW5nIVxcbiAgdXBkYXRlZEF0OiBTdHJpbmchXFxufVxcblxcbnNjYWxhciBVcGxvYWRcXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEFxdWFzY2FwZUltYWdlKGFxdWFzY2FwZUlkOiBJbnQhLCBmaWxlOiBVcGxvYWQhKTogQXF1YXNjYXBlSW1hZ2UhXFxuICBkZWxldGVBcXVhc2NhcGVJbWFnZShhcXVhc2NhcGVJZDogSW50ISwgaW1hZ2VJZDogSW50ISk6IEludFxcbn1cXG5cXG50eXBlIEJyYW5kIHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgbG9nbzogU3RyaW5nXFxuICBhZGRyZXNzOiBTdHJpbmdcXG59XFxuXFxudHlwZSBGaWx0ZXIge1xcbiAgYnJhbmQ6IEJyYW5kXFxufVxcblxcbnR5cGUgU3Vic3RyYXRlIHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIEFkZGl0aXZlIHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIExpZ2h0IHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG5pbnRlcmZhY2UgRXF1aXBtZW50IHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGJyYW5kczogW0JyYW5kIV0hXFxufVxcblwiIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCB7RmlsZVVwbG9hZH0gZnJvbSAnZ3JhcGhxbC11cGxvYWQnXHJcblxyXG5pbXBvcnQge0FxdWFzY2FwZUltYWdlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlSW1hZ2UnXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7dXBsb2FkU3RyZWFtRmlsZSwgZGVsZXRlRmlsZSwgaW1hZ2VVcGxvYWRPcHRpb25zfSBmcm9tICdzZXJ2aWNlcy9jbG91ZGluYXJ5J1xyXG5pbXBvcnQge0FxdWFzY2FwZUltYWdlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZUltYWdlJ1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gJ2xvZ2dlcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXF1YXNjYXBlSW1hZ2VQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBhZGRBcXVhc2NhcGVJbWFnZTogKGFxdWFzY2FwZUlkOiBudW1iZXIsIGZpbGU6IFByb21pc2U8RmlsZVVwbG9hZD4pID0+IFByb21pc2U8QXF1YXNjYXBlSW1hZ2U+XHJcbiAgICBkZWxldGVBcXVhc2NhcGVJbWFnZTogKGFxdWFzY2FwZUlkOiBudW1iZXIsIGltYWdlSWQ6IG51bWJlcikgPT4gUHJvbWlzZTxudW1iZXI+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZUltYWdlUHJvdmlkZXIgaW1wbGVtZW50cyBBcXVhc2NhcGVJbWFnZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkFRVUFTQ0FQRV9JTUFHRV9SRVBPU0lUT1JZKVxyXG4gICAgICAgIHByaXZhdGUgYXF1YXNjYXBlSW1hZ2VSZXBvc2l0b3J5OiBBcXVhc2NhcGVJbWFnZVJlcG9zaXRvcnlcclxuICAgICkge31cclxuXHJcbiAgICBhc3luYyBhZGRBcXVhc2NhcGVJbWFnZShhcXVhc2NhcGVJZDogbnVtYmVyLCBmaWxlOiBQcm9taXNlPEZpbGVVcGxvYWQ+KSB7XHJcbiAgICAgICAgY29uc3Qge2NyZWF0ZVJlYWRTdHJlYW19ID0gYXdhaXQgZmlsZVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwbG9hZFN0cmVhbUZpbGUoY3JlYXRlUmVhZFN0cmVhbSwgaW1hZ2VVcGxvYWRPcHRpb25zLmFxdWFzY2FwZUltYWdlKVxyXG5cclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hcXVhc2NhcGVJbWFnZVJlcG9zaXRvcnkuYWRkSW1hZ2UoXHJcbiAgICAgICAgICAgIGFxdWFzY2FwZUlkLFxyXG4gICAgICAgICAgICByZXN1bHQucHVibGljX2lkLFxyXG4gICAgICAgICAgICByZXN1bHQuc2VjdXJlX3VybFxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZWxldGVBcXVhc2NhcGVJbWFnZShhcXVhc2NhcGVJZDogbnVtYmVyLCBpbWFnZUlkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGF3YWl0IHRoaXMuYXF1YXNjYXBlSW1hZ2VSZXBvc2l0b3J5LmZpbmRPbmUoe1xyXG4gICAgICAgICAgICB3aGVyZToge2FxdWFzY2FwZUlkLCBpZDogaW1hZ2VJZH0sXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gSW1hZ2Ugbm90IGZvdW5kXHJcbiAgICAgICAgaWYgKCFpbWFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGltYWdlIGZyb20gY2xvdWRpbmFyeVxyXG4gICAgICAgIGRlbGV0ZUZpbGUoaW1hZ2UucHVibGljSWQpLmNhdGNoKGVycm9yID0+IGxvZ2dlci5lcnJvcihlcnJvcikpXHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBpbWFnZSBmcm9tIGRiXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXF1YXNjYXBlSW1hZ2VSZXBvc2l0b3J5LnJlbW92ZUltYWdlKGFxdWFzY2FwZUlkLCBpbWFnZUlkKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7R3JhcGhRTE1vZHVsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHthdHRhY2hDdXJyZW50VXNlcklkLCBjb21wb3NlQ29udGV4dH0gZnJvbSAnYXBpL2NvbnRleHQnXHJcbmltcG9ydCB7QXF1YXNjYXBlSW1hZ2VSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlSW1hZ2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZSdcclxuXHJcbmltcG9ydCB7QXF1YXNjYXBlSW1hZ2VQcm92aWRlcn0gZnJvbSAnLi9BcXVhc2NhcGVJbWFnZVByb3ZpZGVyJ1xyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgKiBhcyB0eXBlRGVmcyBmcm9tICcuL3NjaGVtYS5ncmFwaHFsJ1xyXG5cclxuZXhwb3J0IGNvbnN0IEFxdWFzY2FwZUltYWdlTW9kdWxlID0gbmV3IEdyYXBoUUxNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BUVVBU0NBUEVfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEFxdWFzY2FwZVJlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQVFVQVNDQVBFX0lNQUdFX1BST1ZJREVSLCB1c2VDbGFzczogQXF1YXNjYXBlSW1hZ2VQcm92aWRlcn0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BUVVBU0NBUEVfSU1BR0VfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEFxdWFzY2FwZUltYWdlUmVwb3NpdG9yeX0sXHJcbiAgICBdLFxyXG4gICAgdHlwZURlZnMsXHJcbiAgICByZXNvbHZlcnMsXHJcbiAgICByZXNvbHZlcnNDb21wb3NpdGlvbixcclxuICAgIGNvbnRleHQ6IGNvbXBvc2VDb250ZXh0KFthdHRhY2hDdXJyZW50VXNlcklkXSksXHJcbn0pXHJcbiIsImltcG9ydCB7YXV0aGVudGljYXRlLCBhdXRob3JpemVBcXVhc2NhcGVVcGRhdGV9IGZyb20gJ2FwaS9ndWFyZHMnXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcblxyXG5pbXBvcnQge0FxdWFzY2FwZUltYWdlUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJy4vQXF1YXNjYXBlSW1hZ2VQcm92aWRlcidcclxuaW1wb3J0IHtGaWxlVXBsb2FkfSBmcm9tICdncmFwaHFsLXVwbG9hZCdcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBNdXRhdGlvbjoge1xyXG4gICAgICAgIGFzeW5jIGFkZEFxdWFzY2FwZUltYWdlKFxyXG4gICAgICAgICAgICByb290LFxyXG4gICAgICAgICAgICBhcmdzOiB7YXF1YXNjYXBlSWQ6IG51bWJlciwgZmlsZTogUHJvbWlzZTxGaWxlVXBsb2FkPn0sXHJcbiAgICAgICAgICAgIGNvbnRleHRcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEFxdWFzY2FwZUltYWdlUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldChcclxuICAgICAgICAgICAgICAgIHRva2Vucy5BUVVBU0NBUEVfSU1BR0VfUFJPVklERVJcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuYWRkQXF1YXNjYXBlSW1hZ2UoYXJncy5hcXVhc2NhcGVJZCwgYXJncy5maWxlKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFzeW5jIGRlbGV0ZUFxdWFzY2FwZUltYWdlKHJvb3QsIGFyZ3M6IHthcXVhc2NhcGVJZDogbnVtYmVyLCBpbWFnZUlkOiBudW1iZXJ9LCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBBcXVhc2NhcGVJbWFnZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQoXHJcbiAgICAgICAgICAgICAgICB0b2tlbnMuQVFVQVNDQVBFX0lNQUdFX1BST1ZJREVSXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmRlbGV0ZUFxdWFzY2FwZUltYWdlKGFyZ3MuYXF1YXNjYXBlSWQsIGFyZ3MuaW1hZ2VJZClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVyc0NvbXBvc2l0aW9uID0ge1xyXG4gICAgJ011dGF0aW9uLmFkZEFxdWFzY2FwZUltYWdlJzogW2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlXSxcclxuICAgICdNdXRhdGlvbi5kZWxldGVBcXVhc2NhcGVJbWFnZSc6IFthdXRoZW50aWNhdGUsIGF1dGhvcml6ZUFxdWFzY2FwZVVwZGF0ZV0sXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcInR5cGUgQXF1YXNjYXBlSW1hZ2Uge1xcbiAgaWQ6IEludCFcXG4gIHRpdGxlOiBTdHJpbmdcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIHVybDogU3RyaW5nIVxcbiAgcHVibGljSWQ6IFN0cmluZyFcXG4gIGNyZWF0ZWRBdDogU3RyaW5nIVxcbiAgdXBkYXRlZEF0OiBTdHJpbmchXFxufVxcblxcbnNjYWxhciBVcGxvYWRcXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEFxdWFzY2FwZUltYWdlKGFxdWFzY2FwZUlkOiBJbnQhLCBmaWxlOiBVcGxvYWQhKTogQXF1YXNjYXBlSW1hZ2UhXFxuICBkZWxldGVBcXVhc2NhcGVJbWFnZShhcXVhc2NhcGVJZDogSW50ISwgaW1hZ2VJZDogSW50ISk6IEludFxcbn1cXG5cIiIsImltcG9ydCB7R3JhcGhRTE1vZHVsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5pbXBvcnQge0F1dGhQcm92aWRlcn0gZnJvbSAnYXBpL21vZHVsZXMvQXV0aC9wcm92aWRlcnMvQXV0aFByb3ZpZGVyJ1xyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJ2FwaS9tb2R1bGVzL0F1dGgvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQge1VzZXJSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVXNlcidcclxuaW1wb3J0IHtTb2NpYWxMb2dpblJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9Tb2NpYWxMb2dpbidcclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnYXBpL21vZHVsZXMvQXV0aC9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHthdHRhY2hTZXNzaW9uLCBjb21wb3NlQ29udGV4dH0gZnJvbSAnYXBpL2NvbnRleHQnXHJcbmltcG9ydCB7VXNlck1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvVXNlcidcclxuXHJcbmV4cG9ydCBjb25zdCBBdXRoTW9kdWxlID0gbmV3IEdyYXBoUUxNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BVVRIX1BST1ZJREVSLCB1c2VDbGFzczogQXV0aFByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlVTRVJfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IFVzZXJSZXBvc2l0b3J5fSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IHRva2Vucy5TT0NJQUxfTE9HSU5fUkVQT1NJVE9SWSxcclxuICAgICAgICAgICAgdXNlQ2xhc3M6IFNvY2lhbExvZ2luUmVwb3NpdG9yeSxcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG4gICAgcmVzb2x2ZXJzQ29tcG9zaXRpb24sXHJcbiAgICBjb250ZXh0OiBjb21wb3NlQ29udGV4dChbYXR0YWNoU2Vzc2lvbl0pLFxyXG4gICAgaW1wb3J0czogW1VzZXJNb2R1bGVdXHJcbn0pXHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xyXG5pbXBvcnQgKiBhcyBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCdcclxuaW1wb3J0ICogYXMgRmFjZWJvb2tUb2tlblN0cmF0ZWd5IGZyb20gJ3Bhc3Nwb3J0LWZhY2Vib29rLXRva2VuJ1xyXG5pbXBvcnQgKiBhcyBHb29nbGVUb2tlblN0cmF0ZWd5IGZyb20gJ3Bhc3Nwb3J0LWdvb2dsZS10b2tlbidcclxuaW1wb3J0IHtQcm9maWxlLCBWZXJpZnlGdW5jdGlvbn0gZnJvbSAncGFzc3BvcnQtZmFjZWJvb2stdG9rZW4nXHJcbmltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICdjb25maWcvZW52aXJvbm1lbnQnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZhY2Vib29rQXV0aERhdGEge1xyXG4gICAgYWNjZXNzVG9rZW46IHN0cmluZ1xyXG4gICAgcmVmcmVzaFRva2VuOiBzdHJpbmdcclxuICAgIHByb2ZpbGU/OiBQcm9maWxlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR29vZ2xlUHJvZmlsZSB7XHJcbiAgICBwcm92aWRlcjogc3RyaW5nXHJcbiAgICBpZDogc3RyaW5nXHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nXHJcbiAgICBuYW1lOiB7XHJcbiAgICAgICAgZmFtaWx5TmFtZTogc3RyaW5nXHJcbiAgICAgICAgZ2l2ZW5OYW1lOiBzdHJpbmdcclxuICAgIH1cclxuICAgIGVtYWlsczoge3ZhbHVlOiBzdHJpbmd9W11cclxuICAgIF9qc29uOiB7XHJcbiAgICAgICAgaWQ6IHN0cmluZ1xyXG4gICAgICAgIGVtYWlsOiBzdHJpbmdcclxuICAgICAgICBuYW1lOiBzdHJpbmdcclxuICAgICAgICBnaXZlbl9uYW1lOiBzdHJpbmdcclxuICAgICAgICBmYW1pbHlfbmFtZTogc3RyaW5nXHJcbiAgICAgICAgcGljdHVyZTogc3RyaW5nXHJcbiAgICAgICAgbG9jYWxlOiBzdHJpbmdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHb29nbGVBdXRoRGF0YSB7XHJcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nXHJcbiAgICByZWZyZXNoVG9rZW4/OiBzdHJpbmdcclxuICAgIHByb2ZpbGU6IEdvb2dsZVByb2ZpbGVcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGYWNlYm9va0luZm8ge1xyXG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoZW50aWNhdGVGYWNlYm9vayA9IChcclxuICAgIHJlcTogUmVxdWVzdCxcclxuICAgIHJlczogUmVzcG9uc2VcclxuKTogUHJvbWlzZTx7ZGF0YT86IEZhY2Vib29rQXV0aERhdGEsIGluZm8/OiBGYWNlYm9va0luZm99PiA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXHJcbiAgICAgICAgJ2ZhY2Vib29rLXRva2VuJyxcclxuICAgICAgICB7c2Vzc2lvbjogZmFsc2V9LFxyXG4gICAgICAgIChlcnIsIGRhdGE/OiBGYWNlYm9va0F1dGhEYXRhLCBpbmZvPzogRmFjZWJvb2tJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoe2RhdGEsIGluZm99KVxyXG4gICAgICAgIH1cclxuICAgICkocmVxLCByZXMpXHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aGVudGljYXRlR29vZ2xlID0gKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZVxyXG4pOiBQcm9taXNlPHtkYXRhOiBHb29nbGVBdXRoRGF0YX0+ID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnZ29vZ2xlLXRva2VuJywgKGVyciwgZGF0YTogR29vZ2xlQXV0aERhdGEpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNvbHZlKHtkYXRhfSlcclxuICAgIH0pKHJlcSwgcmVzKVxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRQYXNzcG9ydCA9ICgpID0+IHtcclxuICAgIGNvbnN0IEZhY2Vib29rVG9rZW5TdHJhdGVneUNhbGxiYWNrOiBWZXJpZnlGdW5jdGlvbiA9IChcclxuICAgICAgICBhY2Nlc3NUb2tlbixcclxuICAgICAgICByZWZyZXNoVG9rZW4sXHJcbiAgICAgICAgcHJvZmlsZSxcclxuICAgICAgICBkb25lXHJcbiAgICApID0+XHJcbiAgICAgICAgZG9uZShudWxsLCB7XHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuLFxyXG4gICAgICAgICAgICByZWZyZXNoVG9rZW4sXHJcbiAgICAgICAgICAgIHByb2ZpbGUsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICBjb25zdCBHb29nbGVUb2tlblN0cmF0ZWd5Q2FsbGJhY2sgPSAoXHJcbiAgICAgICAgYWNjZXNzVG9rZW46IHN0cmluZyxcclxuICAgICAgICByZWZyZXNoVG9rZW46IHN0cmluZyxcclxuICAgICAgICBwcm9maWxlLFxyXG4gICAgICAgIGRvbmVcclxuICAgICkgPT5cclxuICAgICAgICBkb25lKG51bGwsIHtcclxuICAgICAgICAgICAgYWNjZXNzVG9rZW4sXHJcbiAgICAgICAgICAgIHJlZnJlc2hUb2tlbixcclxuICAgICAgICAgICAgcHJvZmlsZSxcclxuICAgICAgICB9KVxyXG5cclxuICAgIHBhc3Nwb3J0LnVzZShcclxuICAgICAgICBuZXcgRmFjZWJvb2tUb2tlblN0cmF0ZWd5KFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRJRDogZW52aXJvbm1lbnQuRkFDRUJPT0tfQ0xJRU5UX0lELFxyXG4gICAgICAgICAgICAgICAgY2xpZW50U2VjcmV0OiBlbnZpcm9ubWVudC5GQUNFQk9PS19TRUNSRVQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIEZhY2Vib29rVG9rZW5TdHJhdGVneUNhbGxiYWNrXHJcbiAgICAgICAgKVxyXG4gICAgKVxyXG5cclxuICAgIHBhc3Nwb3J0LnVzZShcclxuICAgICAgICBuZXcgR29vZ2xlVG9rZW5TdHJhdGVneS5TdHJhdGVneShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xpZW50SUQ6IGVudmlyb25tZW50LkdPT0dMRV9DTElFTlRfSUQsXHJcbiAgICAgICAgICAgICAgICBjbGllbnRTZWNyZXQ6IGVudmlyb25tZW50LkdPT0dMRV9TRUNSRVQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIEdvb2dsZVRva2VuU3RyYXRlZ3lDYWxsYmFja1xyXG4gICAgICAgIClcclxuICAgIClcclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCB7QXV0aGVudGljYXRpb25FcnJvciwgVXNlcklucHV0RXJyb3J9IGZyb20gJ2Fwb2xsby1zZXJ2ZXInXHJcbmltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCBzbHVnaWZ5IGZyb20gJ3NsdWdpZnknXHJcblxyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ2RiL21vZGVscy9Vc2VyJ1xyXG5pbXBvcnQge1VzZXJSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVXNlcidcclxuaW1wb3J0IHthdXRoZW50aWNhdGVGYWNlYm9vaywgYXV0aGVudGljYXRlR29vZ2xlfSBmcm9tICdhcGkvbW9kdWxlcy9BdXRoL3Bhc3Nwb3J0J1xyXG5pbXBvcnQge0F1dGhIZWxwZXJ9IGZyb20gJ3V0aWxzL0F1dGhIZWxwZXInXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7U29jaWFsTG9naW5SZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvU29jaWFsTG9naW4nXHJcbmltcG9ydCBzb2NpYWxQcm92aWRlcnMgZnJvbSAnY29uc3RhbnRzL3NvY2lhbFByb3ZpZGVycydcclxuaW1wb3J0IHtFbWFpbENvbmZpcm1hdGlvblJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9FbWFpbENvbmZpcm1hdGlvbidcclxuaW1wb3J0IHtzZW5kQ29uZmlybWF0aW9uTWFpbH0gZnJvbSAnc2VydmljZXMvbWFpbC9tYWlsJ1xyXG5pbXBvcnQgZXJyb3JzIGZyb20gJ2NvbnN0YW50cy9lcnJvcnMnXHJcblxyXG5leHBvcnQgdHlwZSBBdXRoUGF5bG9hZCA9IHtcclxuICAgIHRva2VuOiBzdHJpbmdcclxuICAgIHVzZXI6IFVzZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBdXRoUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgbG9naW46IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBQcm9taXNlPEF1dGhQYXlsb2FkPlxyXG4gICAgcmVnaXN0ZXI6IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IFByb21pc2U8VXNlcj5cclxuICAgIGZhY2Vib29rUmVnaXN0ZXI6IChcclxuICAgICAgICB0b2tlbjogc3RyaW5nLFxyXG4gICAgICAgIHJlcTogUmVxdWVzdCxcclxuICAgICAgICByZXM6IFJlc3BvbnNlXHJcbiAgICApID0+IFByb21pc2U8QXV0aFBheWxvYWQgfCB1bmRlZmluZWQ+XHJcbiAgICBnb29nbGVSZWdpc3RlcjogKHRva2VuOiBzdHJpbmcsIHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4gUHJvbWlzZTxBdXRoUGF5bG9hZCB8IHVuZGVmaW5lZD5cclxuICAgIHVzZXJQcm9maWxlU2x1Z0V4aXN0czogKHNsdWc6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxyXG59XHJcblxyXG5pbnRlcmZhY2UgU29jaWFsTG9naW5EYXRhIHtcclxuICAgIHNvY2lhbFByb2ZpbGVJZDogc3RyaW5nXHJcbiAgICBlbWFpbDogc3RyaW5nXHJcbiAgICBuYW1lOiBzdHJpbmdcclxuICAgIHByb2ZpbGVJbWFnZTogc3RyaW5nXHJcbiAgICBwcm92aWRlcjogc3RyaW5nXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhQcm92aWRlciBpbXBsZW1lbnRzIEF1dGhQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBASW5qZWN0KHRva2Vucy5VU0VSX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyUmVwb3NpdG9yeTogVXNlclJlcG9zaXRvcnlJbnRlcmZhY2UsXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuU09DSUFMX0xPR0lOX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxMb2dpblJlcG9zaXRvcnk6IFNvY2lhbExvZ2luUmVwb3NpdG9yeUludGVyZmFjZSxcclxuICAgICAgICBASW5qZWN0KHRva2Vucy5FTUFJTF9DT05GSVJNQVRJT05fUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGVtYWlsQ29uZmlybWF0aW9uUmVwb3NpdG9yeTogRW1haWxDb25maXJtYXRpb25SZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICApIHt9XHJcblxyXG4gICAgYXN5bmMgdXNlclByb2ZpbGVTbHVnRXhpc3RzKHNsdWc6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBCb29sZWFuKGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnkuZmluZFVzZXJCeVNsdWcoc2x1ZykpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZW1haWxFeGlzdHMoZW1haWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBCb29sZWFuKGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnkuZmluZFVzZXJCeUVtYWlsKGVtYWlsKSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBsb2dpbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnkuZmluZE9uZSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7ZW1haWx9LFxyXG4gICAgICAgICAgICByYXc6IHRydWUsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKGVycm9ycy5JTlZBTElEX0NSRURFTlRJQUxTKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFBdXRoSGVscGVyLmNoZWNrUGFzc3dvcmQocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoZW50aWNhdGlvbkVycm9yKGVycm9ycy5JTlZBTElEX0NSRURFTlRJQUxTKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHt0b2tlbjogQXV0aEhlbHBlci5jcmVhdGVBdXRoVG9rZW4odXNlci5pZCksIHVzZXJ9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVnaXN0ZXIoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuZW1haWxFeGlzdHMoZW1haWwpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHpvbWJpZVVzZXIgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LmZpbmRVc2VyQnlFbWFpbChlbWFpbClcclxuICAgICAgICAgICAgY29uc3QgZXhwaXJlZCA9IGF3YWl0IHRoaXMuZW1haWxDb25maXJtYXRpb25SZXBvc2l0b3J5LmNvbmZpcm1hdGlvbkV4cGlyZWQoZW1haWwpXHJcblxyXG4gICAgICAgICAgICAvLyBab21iaWUgdXNlciBpcyBhIHJlZ2lzdGVyZWQgdXNlciB3aG8gZGlkbid0IGNvbmZpcm0gaGlzIGVtYWlsIGFkZHJlc3MgYW5kIGNvbmZpcm1hdGlvbiBleHBpcmVkXHJcbiAgICAgICAgICAgIGlmICh6b21iaWVVc2VyICYmICF6b21iaWVVc2VyLmVtYWlsQ29uZmlybWVkICYmIGV4cGlyZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFN1Y2ggdXNlciBhbmQgY29uZmlybWF0aW9uIHNob3VsZCBiZSBkZXN0cm95ZWRcclxuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICB6b21iaWVVc2VyLmRlc3Ryb3koKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtYWlsQ29uZmlybWF0aW9uUmVwb3NpdG9yeS5kZXN0cm95KHt3aGVyZToge2VtYWlsfX0pLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcihlcnJvcnMuRU1BSUxfQUxSRUFEWV9FWElTVFMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGVtYWlsLFxyXG4gICAgICAgICAgICBzbHVnOiBhd2FpdCB0aGlzLmdlbmVyYXRlVW5pcXVlU2x1ZygpLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogQXV0aEhlbHBlci5jcnlwdFBhc3N3b3JkKHBhc3N3b3JkKSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBjb25maXJtYXRpb24gPSBhd2FpdCB0aGlzLmVtYWlsQ29uZmlybWF0aW9uUmVwb3NpdG9yeS5jcmVhdGVDb25maXJtYXRpb25LZXkoZW1haWwpXHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBBdXRoSGVscGVyLmNyZWF0ZUVtYWlsQ29uZmlybWF0aW9uVG9rZW4oZW1haWwsIGNvbmZpcm1hdGlvbi5jb2RlKVxyXG4gICAgICAgIGF3YWl0IHNlbmRDb25maXJtYXRpb25NYWlsKGVtYWlsLCB0b2tlbilcclxuXHJcbiAgICAgICAgcmV0dXJuIHVzZXJcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmYWNlYm9va1JlZ2lzdGVyKHRva2VuOiBzdHJpbmcsIHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIHJlcS5ib2R5ID0gey4uLnJlcS5ib2R5LCBhY2Nlc3NfdG9rZW46IHRva2VufVxyXG5cclxuICAgICAgICBjb25zdCB7ZGF0YX0gPSBhd2FpdCBhdXRoZW50aWNhdGVGYWNlYm9vayhyZXEsIHJlcylcclxuXHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5wcm9maWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVNvY2lhbExvZ2luKHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBkYXRhLnByb2ZpbGUuZW1haWxzWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogZGF0YS5wcm9maWxlLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZUltYWdlOiBkYXRhLnByb2ZpbGUucGhvdG9zWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHNvY2lhbFByb3ZpZGVycy5GQUNFQk9PSyxcclxuICAgICAgICAgICAgICAgIHNvY2lhbFByb2ZpbGVJZDogZGF0YS5wcm9maWxlLmlkLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnb29nbGVSZWdpc3Rlcih0b2tlbjogc3RyaW5nLCByZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgICAgICByZXEuYm9keSA9IHsuLi5yZXEuYm9keSwgYWNjZXNzX3Rva2VuOiB0b2tlbn1cclxuXHJcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gYXdhaXQgYXV0aGVudGljYXRlR29vZ2xlKHJlcSwgcmVzKVxyXG5cclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByb2ZpbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlU29jaWFsTG9naW4oe1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IGRhdGEucHJvZmlsZS5lbWFpbHNbMF0udmFsdWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLnByb2ZpbGUuZGlzcGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlSW1hZ2U6IGRhdGEucHJvZmlsZS5fanNvbi5waWN0dXJlLFxyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHNvY2lhbFByb3ZpZGVycy5HT09HTEUsXHJcbiAgICAgICAgICAgICAgICBzb2NpYWxQcm9maWxlSWQ6IGRhdGEucHJvZmlsZS5pZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZVVuaXF1ZVNsdWcoYmFzZTogc3RyaW5nID0gJ3VzZXInKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgdW5pcXVlU2x1Zzogc3RyaW5nXHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgd2hpbGUgKCF1bmlxdWVTbHVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAgKyAxKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zc2libGVTbHVnID0gYCR7YmFzZX0ke3JhbmRvbU51bWJlcn1gXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbHVnRXhpc3RzID0gYXdhaXQgdGhpcy51c2VyUHJvZmlsZVNsdWdFeGlzdHMocG9zc2libGVTbHVnKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2x1Z0V4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZVNsdWcgPSBwb3NzaWJsZVNsdWdcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVuaXF1ZVNsdWcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2x1Z2lmeVByb2ZpbGVVcmwoc2x1Zzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHNsdWdpZnkoc2x1Zywge3JlcGxhY2VtZW50OiAnXycsIGxvd2VyOiB0cnVlfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGhhbmRsZVNvY2lhbExvZ2luKGRhdGE6IFNvY2lhbExvZ2luRGF0YSkge1xyXG4gICAgICAgIGxldCB1c2VyOiBVc2VyIHwgbnVsbFxyXG4gICAgICAgIGxldCBzbHVnID0gdGhpcy5zbHVnaWZ5UHJvZmlsZVVybChkYXRhLm5hbWUpXHJcblxyXG4gICAgICAgIGNvbnN0IHNsdWdFeGlzdHMgPSBhd2FpdCB0aGlzLnVzZXJQcm9maWxlU2x1Z0V4aXN0cyhzbHVnKVxyXG5cclxuICAgICAgICBpZiAoc2x1Z0V4aXN0cykge1xyXG4gICAgICAgICAgICBzbHVnID0gYXdhaXQgdGhpcy5nZW5lcmF0ZVVuaXF1ZVNsdWcoc2x1ZylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJUb0NyZWF0ZSA9IHtcclxuICAgICAgICAgICAgc2x1ZyxcclxuICAgICAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxyXG4gICAgICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCxcclxuICAgICAgICAgICAgcHJvZmlsZUltYWdlOiBkYXRhLnByb2ZpbGVJbWFnZSxcclxuICAgICAgICAgICAgZW1haWxDb25maXJtZWQ6IHRydWUsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzb2NpYWwgPSBhd2FpdCB0aGlzLnNvY2lhbExvZ2luUmVwb3NpdG9yeS5maW5kU29jaWFsTG9naW4oZGF0YS5zb2NpYWxQcm9maWxlSWQpXHJcblxyXG4gICAgICAgIGlmIChzb2NpYWwpIHtcclxuICAgICAgICAgICAgdXNlciA9IGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnkuZmluZFVzZXJCeUlkKHNvY2lhbC51c2VySWQpXHJcblxyXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LmNyZWF0ZSh1c2VyVG9DcmVhdGUpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7dXNlciwgdG9rZW46IEF1dGhIZWxwZXIuY3JlYXRlQXV0aFRva2VuKHVzZXIuaWQpfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LmZpbmRVc2VyQnlFbWFpbChkYXRhLmVtYWlsKVxyXG5cclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyID0gYXdhaXQgdGhpcy51c2VyUmVwb3NpdG9yeS5jcmVhdGUodXNlclRvQ3JlYXRlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNvY2lhbExvZ2luUmVwb3NpdG9yeS5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgc29jaWFsSWQ6IGRhdGEuc29jaWFsUHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IGRhdGEucHJvdmlkZXIsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge3VzZXIsIHRva2VuOiBBdXRoSGVscGVyLmNyZWF0ZUF1dGhUb2tlbih1c2VyLmlkKX1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcbmltcG9ydCB7U2Vzc2lvbkNvbnRleHR9IGZyb20gJ2FwaS9jb250ZXh0J1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHt2YWxpZGF0ZX0gZnJvbSAnYXBpL2d1YXJkcydcclxuaW1wb3J0IHtBdXRoUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJ2FwaS9tb2R1bGVzL0F1dGgvcHJvdmlkZXJzL0F1dGhQcm92aWRlcidcclxuaW1wb3J0IHtsb2dpblZhbGlkYXRpb25TY2hlbWEsIHJlZ2lzdGVyVmFsaWRhdGlvblNjaGVtYX0gZnJvbSAnYXBpL21vZHVsZXMvQXV0aC92YWxpZGF0aW9uJ1xyXG5pbXBvcnQge1xyXG4gICAgTXV0YXRpb25SZWdpc3RlckFyZ3MsXHJcbiAgICBNdXRhdGlvbkxvZ2luQXJncyxcclxuICAgIE11dGF0aW9uRmJSZWdpc3RlckFyZ3MsXHJcbiAgICBNdXRhdGlvbkdvb2dsZVJlZ2lzdGVyQXJncyxcclxuICAgIFF1ZXJ5VXNlclByb2ZpbGVTbHVnRXhpc3RzQXJncyxcclxufSBmcm9tICdhcGkvZ2VuZXJhdGVkL3R5cGVzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgYXN5bmMgdXNlclByb2ZpbGVTbHVnRXhpc3RzKFxyXG4gICAgICAgICAgICByb290LFxyXG4gICAgICAgICAgICBhcmdzOiBRdWVyeVVzZXJQcm9maWxlU2x1Z0V4aXN0c0FyZ3MsXHJcbiAgICAgICAgICAgIHtpbmplY3Rvcn06IE1vZHVsZUNvbnRleHRcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEF1dGhQcm92aWRlckludGVyZmFjZSA9IGluamVjdG9yLmdldCh0b2tlbnMuQVVUSF9QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLnVzZXJQcm9maWxlU2x1Z0V4aXN0cyhhcmdzLnNsdWcpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBNdXRhdGlvbjoge1xyXG4gICAgICAgIGFzeW5jIGxvZ2luKHJvb3QsIGFyZ3M6IE11dGF0aW9uTG9naW5BcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBBdXRoUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuQVVUSF9QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmxvZ2luKGFyZ3MuZW1haWwsIGFyZ3MucGFzc3dvcmQpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyByZWdpc3Rlcihyb290LCBhcmdzOiBNdXRhdGlvblJlZ2lzdGVyQXJncywge2luamVjdG9yfTogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQXV0aFByb3ZpZGVySW50ZXJmYWNlID0gaW5qZWN0b3IuZ2V0KHRva2Vucy5BVVRIX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIucmVnaXN0ZXIoYXJncy5lbWFpbCwgYXJncy5wYXNzd29yZCwgYXJncy5uYW1lKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgZmJSZWdpc3RlcihcclxuICAgICAgICAgICAgcm9vdCxcclxuICAgICAgICAgICAgYXJnczogTXV0YXRpb25GYlJlZ2lzdGVyQXJncyxcclxuICAgICAgICAgICAge2luamVjdG9yLCByZXEsIHJlc306IE1vZHVsZUNvbnRleHQgJiBTZXNzaW9uQ29udGV4dFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQXV0aFByb3ZpZGVySW50ZXJmYWNlID0gaW5qZWN0b3IuZ2V0KHRva2Vucy5BVVRIX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZmFjZWJvb2tSZWdpc3RlcihhcmdzLnRva2VuLCByZXEsIHJlcylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGdvb2dsZVJlZ2lzdGVyKFxyXG4gICAgICAgICAgICByb290LFxyXG4gICAgICAgICAgICBhcmdzOiBNdXRhdGlvbkdvb2dsZVJlZ2lzdGVyQXJncyxcclxuICAgICAgICAgICAge2luamVjdG9yLCByZXEsIHJlc306IE1vZHVsZUNvbnRleHQgJiBTZXNzaW9uQ29udGV4dFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQXV0aFByb3ZpZGVySW50ZXJmYWNlID0gaW5qZWN0b3IuZ2V0KHRva2Vucy5BVVRIX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZ29vZ2xlUmVnaXN0ZXIoYXJncy50b2tlbiwgcmVxLCByZXMpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnNDb21wb3NpdGlvbiA9IHtcclxuICAgICdNdXRhdGlvbi5sb2dpbic6IFt2YWxpZGF0ZShsb2dpblZhbGlkYXRpb25TY2hlbWEpXSxcclxuICAgICdNdXRhdGlvbi5yZWdpc3Rlcic6IFt2YWxpZGF0ZShyZWdpc3RlclZhbGlkYXRpb25TY2hlbWEpXSxcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidHlwZSBRdWVyeSB7XFxuICB1c2VyUHJvZmlsZVNsdWdFeGlzdHMoc2x1ZzogU3RyaW5nISk6IEJvb2xlYW5cXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBsb2dpbihlbWFpbDogU3RyaW5nISwgcGFzc3dvcmQ6IFN0cmluZyEpOiBBdXRoUGF5bG9hZFxcbiAgcmVnaXN0ZXIoZW1haWw6IFN0cmluZyEsIHBhc3N3b3JkOiBTdHJpbmchLCBuYW1lOiBTdHJpbmchKTogVXNlclxcbiAgZmJSZWdpc3Rlcih0b2tlbjogU3RyaW5nISk6IEF1dGhQYXlsb2FkXFxuICBnb29nbGVSZWdpc3Rlcih0b2tlbjogU3RyaW5nISk6IEF1dGhQYXlsb2FkXFxufVxcblxcbnR5cGUgVXNlciB7XFxuICBpZDogSW50IVxcbiAgc2x1ZzogU3RyaW5nIVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgYWJvdXQ6IFN0cmluZ1xcbiAgcHJvZmlsZUltYWdlOiBTdHJpbmdcXG4gIHByb2ZpbGVJbWFnZVB1YmxpY0lkOiBTdHJpbmdcXG4gIGNvdmVySW1hZ2U6IFN0cmluZ1xcbiAgY292ZXJJbWFnZVB1YmxpY0lkOiBTdHJpbmdcXG4gIGNvdW50cnk6IFN0cmluZ1xcbiAgZmFjZWJvb2tVcmw6IFN0cmluZ1xcbiAgeW91dHViZVVybDogU3RyaW5nXFxuICBpbnN0YWdyYW1Vcmw6IFN0cmluZ1xcbiAgdHdpdHRlclVybDogU3RyaW5nXFxuICBjcmVhdGVkQXQ6IFN0cmluZyFcXG4gIHVwZGF0ZWRBdDogU3RyaW5nIVxcbn1cXG5cXG50eXBlIEF1dGhQYXlsb2FkIHtcXG4gIHRva2VuOiBTdHJpbmchXFxuICB1c2VyOiBVc2VyIVxcbn1cXG5cXG50eXBlIEltYWdlVXBsb2FkUmVzdWx0IHtcXG4gIGltYWdlVXJsOiBTdHJpbmchXFxuICBpbWFnZVB1YmxpY0lkOiBTdHJpbmchXFxufVxcblxcbmVudW0gSW1hZ2VWYXJpYW50IHtcXG4gIFBST0ZJTEVcXG4gIENPVkVSXFxufVxcblxcbmlucHV0IFVzZXJEZXRhaWxzIHtcXG4gIG5hbWU6IFN0cmluZ1xcbiAgYWJvdXQ6IFN0cmluZ1xcbiAgZmFjZWJvb2tVcmw6IFN0cmluZ1xcbiAgeW91dHViZVVybDogU3RyaW5nXFxuICBpbnN0YWdyYW1Vcmw6IFN0cmluZ1xcbiAgdHdpdHRlclVybDogU3RyaW5nXFxufVxcblxcbnNjYWxhciBVcGxvYWRcXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIG1lOiBVc2VyXFxuICB1c2VyKGlkOiBJbnQhKTogVXNlclxcbiAgdXNlckJ5U2x1ZyhzbHVnOiBTdHJpbmchKTogVXNlclxcbiAgdXNlcnM6IFtVc2VyXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICB1cGxvYWRVc2VySW1hZ2UoZmlsZTogVXBsb2FkISwgaW1hZ2VWYXJpYW50OiBJbWFnZVZhcmlhbnQhKTogSW1hZ2VVcGxvYWRSZXN1bHQhXFxuICB1cGRhdGVVc2VyRGV0YWlscyhkZXRhaWxzOiBVc2VyRGV0YWlscyEpOiBbVXNlcl1cXG4gIGNvbmZpcm1FbWFpbCh0b2tlbjogU3RyaW5nISk6IEF1dGhQYXlsb2FkXFxufVxcblwiIiwiaW1wb3J0ICogYXMgeXVwIGZyb20gJ3l1cCdcclxuXHJcbmNvbnN0IFBBU1NXT1JEX01JTl9MRU5HVEggPSA2XHJcblxyXG5jb25zdCBsb2dpblZhbGlkYXRpb25TY2hlbWEgPSB5dXAub2JqZWN0KCkuc2hhcGUoe1xyXG4gICAgZW1haWw6IHl1cFxyXG4gICAgICAgIC5zdHJpbmcoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpXHJcbiAgICAgICAgLmVtYWlsKCksXHJcbiAgICBwYXNzd29yZDogeXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbn0pXHJcblxyXG5jb25zdCByZWdpc3RlclZhbGlkYXRpb25TY2hlbWEgPSB5dXAub2JqZWN0KCkuc2hhcGUoe1xyXG4gICAgZW1haWw6IHl1cFxyXG4gICAgICAgIC5zdHJpbmcoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpXHJcbiAgICAgICAgLmVtYWlsKCksXHJcbiAgICBwYXNzd29yZDogeXVwXHJcbiAgICAgICAgLnN0cmluZygpXHJcbiAgICAgICAgLnJlcXVpcmVkKClcclxuICAgICAgICAubWluKFBBU1NXT1JEX01JTl9MRU5HVEgpLFxyXG59KVxyXG5cclxuZXhwb3J0IHtsb2dpblZhbGlkYXRpb25TY2hlbWEsIHJlZ2lzdGVyVmFsaWRhdGlvblNjaGVtYX1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7QnJhbmRSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQnJhbmQnXHJcbmltcG9ydCB7QnJhbmR9IGZyb20gJ2RiL21vZGVscy9CcmFuZCdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQnJhbmRQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBnZXRCcmFuZHM6ICgpID0+IEJsdWViaXJkPEJyYW5kW10+XHJcbiAgICBmaW5kQnJhbmRCeUlkOiAoaWQ6IG51bWJlcikgPT4gUHJvbWlzZTxCcmFuZCB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJyYW5kUHJvdmlkZXIgaW1wbGVtZW50cyBCcmFuZFByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkJSQU5EX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBicmFuZFJlcG9zaXRvcnk6IEJyYW5kUmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGdldEJyYW5kcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5icmFuZFJlcG9zaXRvcnkuZ2V0QnJhbmRzKClcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQnJhbmRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5icmFuZFJlcG9zaXRvcnkuZmluZEJyYW5kQnlJZChpZClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcblxyXG5pbXBvcnQgKiBhcyB0eXBlRGVmcyBmcm9tICcuL3NjaGVtYS5ncmFwaHFsJ1xyXG5pbXBvcnQge3Jlc29sdmVyc30gZnJvbSAnLi9yZXNvbHZlcnMnXHJcbmltcG9ydCB7QnJhbmRQcm92aWRlcn0gZnJvbSAnYXBpL21vZHVsZXMvQnJhbmQvQnJhbmRQcm92aWRlcidcclxuaW1wb3J0IHtCcmFuZFJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CcmFuZCdcclxuaW1wb3J0IHtGaWx0ZXJNb2R1bGV9IGZyb20gJy4uL0ZpbHRlcidcclxuaW1wb3J0IHtMaWdodE1vZHVsZX0gZnJvbSAnLi4vTGlnaHQnXHJcbmltcG9ydCB7U3Vic3RyYXRlTW9kdWxlfSBmcm9tICcuLi9TdWJzdHJhdGUnXHJcbmltcG9ydCB7QWRkaXRpdmVNb2R1bGV9IGZyb20gJy4uL0FkZGl0aXZlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IEJyYW5kTW9kdWxlID0gbmV3IEdyYXBoUUxNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5CUkFORF9QUk9WSURFUiwgdXNlQ2xhc3M6IEJyYW5kUHJvdmlkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQlJBTkRfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEJyYW5kUmVwb3NpdG9yeX0sXHJcbiAgICBdLFxyXG4gICAgdHlwZURlZnMsXHJcbiAgICByZXNvbHZlcnMsXHJcbiAgICBpbXBvcnRzOiBbRmlsdGVyTW9kdWxlLCBMaWdodE1vZHVsZSwgU3Vic3RyYXRlTW9kdWxlLCBBZGRpdGl2ZU1vZHVsZV0sXHJcbn0pXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtCcmFuZFByb3ZpZGVySW50ZXJmYWNlfSBmcm9tICcuL0JyYW5kUHJvdmlkZXInXHJcblxyXG5jb25zdCByZXNvbHZlQnJhbmQgPSAocm9vdCwgYXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkgPT4ge1xyXG4gICAgaWYgKCFyb290LmJyYW5kSWQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyOiBCcmFuZFByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkJSQU5EX1BST1ZJREVSKVxyXG4gICAgcmV0dXJuIHByb3ZpZGVyLmZpbmRCcmFuZEJ5SWQocm9vdC5icmFuZElkKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhc3luYyBicmFuZHMocm9vdCwgYXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQnJhbmRQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5CUkFORF9QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmdldEJyYW5kcygpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBGaWx0ZXI6IHtcclxuICAgICAgICBhc3luYyBicmFuZChyb290LCBhcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXNvbHZlQnJhbmQocm9vdCwgYXJncywgY29udGV4dClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIExpZ2h0OiB7XHJcbiAgICAgICAgYXN5bmMgYnJhbmQocm9vdCwgYXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzb2x2ZUJyYW5kKHJvb3QsIGFyZ3MsIGNvbnRleHQpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBTdWJzdHJhdGU6IHtcclxuICAgICAgICBhc3luYyBicmFuZChyb290LCBhcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXNvbHZlQnJhbmQocm9vdCwgYXJncywgY29udGV4dClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIEFkZGl0aXZlOiB7XHJcbiAgICAgICAgYXN5bmMgYnJhbmQocm9vdCwgYXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzb2x2ZUJyYW5kKHJvb3QsIGFyZ3MsIGNvbnRleHQpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBFcXVpcG1lbnQ6IHtcclxuICAgICAgICBhc3luYyBicmFuZChyb290LCBhcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXNvbHZlQnJhbmQocm9vdCwgYXJncywgY29udGV4dClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidHlwZSBCcmFuZCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGxvZ286IFN0cmluZ1xcbiAgYWRkcmVzczogU3RyaW5nXFxufVxcblxcbnR5cGUgRmlsdGVyIHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIFN1YnN0cmF0ZSB7XFxuICBicmFuZDogQnJhbmRcXG59XFxuXFxudHlwZSBBZGRpdGl2ZSB7XFxuICBicmFuZDogQnJhbmRcXG59XFxuXFxudHlwZSBMaWdodCB7XFxuICBicmFuZDogQnJhbmRcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBicmFuZDogQnJhbmRcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBicmFuZHM6IFtCcmFuZCFdIVxcbn1cXG5cIiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQge0luY2x1ZGVhYmxlfSBmcm9tICdzZXF1ZWxpemUvdHlwZXMnXHJcbmltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5cclxuaW1wb3J0IHtDb21tZW50fSBmcm9tICdkYi9tb2RlbHMvQ29tbWVudCdcclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtcclxuICAgIENvbW1lbnRSZXBvc2l0b3J5SW50ZXJmYWNlLFxyXG4gICAgQWRkQ29tbWVudEFyZ3MsXHJcbiAgICBDb21tZW50RW50aXR5VHlwZSxcclxufSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQ29tbWVudCdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWVudFByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGdldENvbW1lbnRzKFxyXG4gICAgICAgIGVudGl0eVR5cGU6IENvbW1lbnRFbnRpdHlUeXBlLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgaW5jbHVkZT86IEluY2x1ZGVhYmxlW11cclxuICAgICk6IEJsdWViaXJkPENvbW1lbnRbXT5cclxuXHJcbiAgICBhZGRDb21tZW50KGRhdGE6IEFkZENvbW1lbnRBcmdzKTogQmx1ZWJpcmQ8Q29tbWVudD5cclxuXHJcbiAgICByZW1vdmVDb21tZW50KGlkOiBudW1iZXIsIHVzZXJJZDogbnVtYmVyKTogQmx1ZWJpcmQ8Q29tbWVudD5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29tbWVudFByb3ZpZGVyIGltcGxlbWVudHMgQ29tbWVudFByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkNPTU1FTlRfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGNvbW1lbnRSZXBvc2l0b3J5OiBDb21tZW50UmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGdldENvbW1lbnRzKFxyXG4gICAgICAgIGVudGl0eVR5cGU6IENvbW1lbnRFbnRpdHlUeXBlLFxyXG4gICAgICAgIGVudGl0eUlkOiBudW1iZXIsXHJcbiAgICAgICAgaW5jbHVkZT86IEluY2x1ZGVhYmxlW11cclxuICAgICkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5LmdldENvbW1lbnRzKGVudGl0eVR5cGUsIGVudGl0eUlkLCBpbmNsdWRlKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbW1lbnQoZGF0YTogQWRkQ29tbWVudEFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21tZW50UmVwb3NpdG9yeS5hZGRDb21tZW50KGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQ29tbWVudChpZDogbnVtYmVyLCB1c2VySWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5LnJlbW92ZUNvbW1lbnQoaWQsIHVzZXJJZClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7Q29tbWVudFJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9Db21tZW50J1xyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0IHtDb21tZW50UHJvdmlkZXJ9IGZyb20gJy4vQ29tbWVudFByb3ZpZGVyJ1xyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgKiBhcyB0eXBlRGVmcyBmcm9tICcuL3NjaGVtYS5ncmFwaHFsJ1xyXG5pbXBvcnQge2NvbXBvc2VDb250ZXh0LCBhdHRhY2hTZXNzaW9uLCBhdHRhY2hDdXJyZW50VXNlcklkfSBmcm9tICdhcGkvY29udGV4dCdcclxuaW1wb3J0IHtVc2VyTW9kdWxlfSBmcm9tICdhcGkvbW9kdWxlcy9Vc2VyJ1xyXG5pbXBvcnQge0FxdWFzY2FwZU1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvQXF1YXNjYXBlJ1xyXG5pbXBvcnQge0xpa2VNb2R1bGV9IGZyb20gJ2FwaS9tb2R1bGVzL0xpa2UnXHJcblxyXG5leHBvcnQgY29uc3QgQ29tbWVudE1vZHVsZSA9IG5ldyBHcmFwaFFMTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQ09NTUVOVF9QUk9WSURFUiwgdXNlQ2xhc3M6IENvbW1lbnRQcm92aWRlcn0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5DT01NRU5UX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBDb21tZW50UmVwb3NpdG9yeX0sXHJcbiAgICBdLFxyXG4gICAgdHlwZURlZnMsXHJcbiAgICByZXNvbHZlcnMsXHJcbiAgICByZXNvbHZlcnNDb21wb3NpdGlvbixcclxuICAgIGNvbnRleHQ6IGNvbXBvc2VDb250ZXh0KFthdHRhY2hDdXJyZW50VXNlcklkLCBhdHRhY2hTZXNzaW9uXSksXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgVXNlck1vZHVsZSxcclxuICAgICAgICBBcXVhc2NhcGVNb2R1bGUsXHJcbiAgICAgICAgTGlrZU1vZHVsZVxyXG4gICAgXVxyXG59KVxyXG4iLCJpbXBvcnQge0dyYXBoUUxSZXNvbHZlSW5mb30gZnJvbSAnZ3JhcGhxbCdcclxuaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge0NvbW1lbnRQcm92aWRlckludGVyZmFjZX0gZnJvbSAnYXBpL21vZHVsZXMvQ29tbWVudC9Db21tZW50UHJvdmlkZXInXHJcbmltcG9ydCB7R3JhcGhRTEhlbHBlcn0gZnJvbSAndXRpbHMvR3JhcGhRTEhlbHBlcidcclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtVc2VyfSBmcm9tICdkYi9tb2RlbHMvVXNlcidcclxuaW1wb3J0IHthdXRoZW50aWNhdGV9IGZyb20gJ2FwaS9ndWFyZHMnXHJcbmltcG9ydCB7Q29tbWVudEVudGl0eVR5cGV9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9Db21tZW50J1xyXG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uQ29udGV4dH0gZnJvbSAnYXBpL2NvbnRleHQnXHJcbmltcG9ydCB7TGlrZX0gZnJvbSAnZGIvbW9kZWxzL0xpa2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlJ1xyXG5cclxuZXhwb3J0IHR5cGUgQ29tbWVudHNBcmdzID0ge1xyXG4gICAgZW50aXR5SWQ6IG51bWJlclxyXG4gICAgZW50aXR5OiBDb21tZW50RW50aXR5VHlwZVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvbkFkZENvbW1lbnRBcmdzID0ge1xyXG4gICAgZW50aXR5SWQ6IG51bWJlclxyXG4gICAgZW50aXR5OiBDb21tZW50RW50aXR5VHlwZVxyXG4gICAgY29udGVudDogc3RyaW5nXHJcbiAgICBwYXJlbnRDb21tZW50SWQ/OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25SZW1vdmVDb21tZW50QXJncyA9IHtcclxuICAgIGlkOiBudW1iZXJcclxufVxyXG5cclxuY29uc3QgbW9kZWxNYXBwaW5nID0ge1xyXG4gICAgdXNlcjogVXNlcixcclxuICAgIGxpa2VzOiBMaWtlLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhc3luYyBjb21tZW50cyhcclxuICAgICAgICAgICAgcm9vdCxcclxuICAgICAgICAgICAgYXJnczogQ29tbWVudHNBcmdzLFxyXG4gICAgICAgICAgICBjb250ZXh0OiBNb2R1bGVDb250ZXh0LFxyXG4gICAgICAgICAgICBpbmZvOiBHcmFwaFFMUmVzb2x2ZUluZm9cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IENvbW1lbnRQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5DT01NRU5UX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBjb25zdCBmaWVsZHMgPSBHcmFwaFFMSGVscGVyLmdldEluY2x1ZGVhYmxlRmllbGRzKGluZm8sbW9kZWxNYXBwaW5nKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZ2V0Q29tbWVudHMoXHJcbiAgICAgICAgICAgICAgICBhcmdzLmVudGl0eSxcclxuICAgICAgICAgICAgICAgIGFyZ3MuZW50aXR5SWQsXHJcbiAgICAgICAgICAgICAgICBmaWVsZHNcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgQXF1YXNjYXBlOiB7XHJcbiAgICAgICAgYXN5bmMgY29tbWVudHMoXHJcbiAgICAgICAgICAgIGFxdWFzY2FwZTogQXF1YXNjYXBlLFxyXG4gICAgICAgICAgICBhcmdzOiBDb21tZW50c0FyZ3MsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQsXHJcbiAgICAgICAgICAgIGluZm86IEdyYXBoUUxSZXNvbHZlSW5mb1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQ29tbWVudFByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkNPTU1FTlRfUFJPVklERVIpXHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IEdyYXBoUUxIZWxwZXIuZ2V0SW5jbHVkZWFibGVGaWVsZHMoaW5mbyxtb2RlbE1hcHBpbmcpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5nZXRDb21tZW50cyhcclxuICAgICAgICAgICAgICAgIENvbW1lbnRFbnRpdHlUeXBlLkFRVUFTQ0FQRSxcclxuICAgICAgICAgICAgICAgIGFxdWFzY2FwZS5pZCxcclxuICAgICAgICAgICAgICAgIGZpZWxkc1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBNdXRhdGlvbjoge1xyXG4gICAgICAgIGFzeW5jIGFkZENvbW1lbnQocm9vdCwgYXJnczogTXV0YXRpb25BZGRDb21tZW50QXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogQ29tbWVudFByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQoXHJcbiAgICAgICAgICAgICAgICB0b2tlbnMuQ09NTUVOVF9QUk9WSURFUlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5hZGRDb21tZW50KHtcclxuICAgICAgICAgICAgICAgIGVudGl0eVR5cGU6IGFyZ3MuZW50aXR5LFxyXG4gICAgICAgICAgICAgICAgZW50aXR5SWQ6IGFyZ3MuZW50aXR5SWQsXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGNvbnRleHQuY3VycmVudFVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGFyZ3MuY29udGVudCxcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbW1lbnRJZDogYXJncy5wYXJlbnRDb21tZW50SWQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyByZW1vdmVDb21tZW50KHJvb3QsIGFyZ3M6IE11dGF0aW9uUmVtb3ZlQ29tbWVudEFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQgJiBBdXRoZW50aWNhdGlvbkNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IENvbW1lbnRQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5DT01NRU5UX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIucmVtb3ZlQ29tbWVudChhcmdzLmlkLCBjb250ZXh0LmN1cnJlbnRVc2VySWQpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnNDb21wb3NpdGlvbiA9IHtcclxuICAgICdNdXRhdGlvbi5hZGRDb21tZW50JzogW2F1dGhlbnRpY2F0ZV0sXHJcbiAgICAnTXV0YXRpb24ucmVtb3ZlQ29tbWVudCc6IFthdXRoZW50aWNhdGVdLFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIENvbW1lbnQge1xcbiAgaWQ6IEludCFcXG4gIGNyZWF0ZWRBdDogU3RyaW5nIVxcbiAgY29udGVudDogU3RyaW5nIVxcbiAgcGFyZW50Q29tbWVudElkOiBJbnRcXG4gIGxpa2VzOiBbTGlrZSFdIVxcbiAgdXNlcjogVXNlciFcXG4gIGFxdWFzY2FwZUltYWdlSWQ6IEludFxcbiAgYXF1YXNjYXBlSWQ6IEludFxcbiAgY29tbWVudElkOiBJbnRcXG59XFxuXFxudHlwZSBBcXVhc2NhcGUge1xcbiAgY29tbWVudHM6IFtDb21tZW50IV0hXFxufVxcblxcbmVudW0gQ29tbWVudEVudGl0eVR5cGUge1xcbiAgQVFVQVNDQVBFXFxuICBJTUFHRVxcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGNvbW1lbnRzKGVudGl0eTogQ29tbWVudEVudGl0eVR5cGUhLCBlbnRpdHlJZDogSW50ISwgcGFnaW5hdGlvbjogUGFnaW5hdGlvbiEpOiBbQ29tbWVudCFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZENvbW1lbnQoZW50aXR5OiBDb21tZW50RW50aXR5VHlwZSEsIGVudGl0eUlkOiBJbnQhLCBjb250ZW50OiBTdHJpbmchLCBwYXJlbnRDb21tZW50SWQ6IEludCk6IENvbW1lbnRcXG4gIHJlbW92ZUNvbW1lbnQoaWQ6IEludCEpOiBDb21tZW50XFxufVxcblxcbnR5cGUgVXNlciB7XFxuICBpZDogSW50IVxcbiAgc2x1ZzogU3RyaW5nIVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgYWJvdXQ6IFN0cmluZ1xcbiAgcHJvZmlsZUltYWdlOiBTdHJpbmdcXG4gIHByb2ZpbGVJbWFnZVB1YmxpY0lkOiBTdHJpbmdcXG4gIGNvdmVySW1hZ2U6IFN0cmluZ1xcbiAgY292ZXJJbWFnZVB1YmxpY0lkOiBTdHJpbmdcXG4gIGNvdW50cnk6IFN0cmluZ1xcbiAgZmFjZWJvb2tVcmw6IFN0cmluZ1xcbiAgeW91dHViZVVybDogU3RyaW5nXFxuICBpbnN0YWdyYW1Vcmw6IFN0cmluZ1xcbiAgdHdpdHRlclVybDogU3RyaW5nXFxuICBjcmVhdGVkQXQ6IFN0cmluZyFcXG4gIHVwZGF0ZWRBdDogU3RyaW5nIVxcbn1cXG5cXG50eXBlIEF1dGhQYXlsb2FkIHtcXG4gIHRva2VuOiBTdHJpbmchXFxuICB1c2VyOiBVc2VyIVxcbn1cXG5cXG50eXBlIEltYWdlVXBsb2FkUmVzdWx0IHtcXG4gIGltYWdlVXJsOiBTdHJpbmchXFxuICBpbWFnZVB1YmxpY0lkOiBTdHJpbmchXFxufVxcblxcbmVudW0gSW1hZ2VWYXJpYW50IHtcXG4gIFBST0ZJTEVcXG4gIENPVkVSXFxufVxcblxcbmlucHV0IFVzZXJEZXRhaWxzIHtcXG4gIG5hbWU6IFN0cmluZ1xcbiAgYWJvdXQ6IFN0cmluZ1xcbiAgZmFjZWJvb2tVcmw6IFN0cmluZ1xcbiAgeW91dHViZVVybDogU3RyaW5nXFxuICBpbnN0YWdyYW1Vcmw6IFN0cmluZ1xcbiAgdHdpdHRlclVybDogU3RyaW5nXFxufVxcblxcbnNjYWxhciBVcGxvYWRcXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIG1lOiBVc2VyXFxuICB1c2VyKGlkOiBJbnQhKTogVXNlclxcbiAgdXNlckJ5U2x1ZyhzbHVnOiBTdHJpbmchKTogVXNlclxcbiAgdXNlcnM6IFtVc2VyXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICB1cGxvYWRVc2VySW1hZ2UoZmlsZTogVXBsb2FkISwgaW1hZ2VWYXJpYW50OiBJbWFnZVZhcmlhbnQhKTogSW1hZ2VVcGxvYWRSZXN1bHQhXFxuICB1cGRhdGVVc2VyRGV0YWlscyhkZXRhaWxzOiBVc2VyRGV0YWlscyEpOiBbVXNlcl1cXG4gIGNvbmZpcm1FbWFpbCh0b2tlbjogU3RyaW5nISk6IEF1dGhQYXlsb2FkXFxufVxcblxcbnR5cGUgTGlrZSB7XFxuICBpZDogSW50IVxcbiAgdXNlcklkOiBJbnQhXFxuICBhcXVhc2NhcGVJbWFnZUlkOiBJbnRcXG4gIGFxdWFzY2FwZUlkOiBJbnRcXG4gIGNvbW1lbnRJZDogSW50XFxufVxcblxcbnR5cGUgQXF1YXNjYXBlIHtcXG4gIGxpa2VzQ291bnQ6IEludCFcXG4gIGlzTGlrZWRCeU1lOiBCb29sZWFuIVxcbn1cXG5cXG5lbnVtIExpa2VFbnRpdHlUeXBlIHtcXG4gIEFRVUFTQ0FQRVxcbiAgSU1BR0VcXG4gIENPTU1FTlRcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBsaWtlKGVudGl0eTogTGlrZUVudGl0eVR5cGUhLCBlbnRpdHlJZDogSW50ISk6IExpa2VcXG4gIGRpc2xpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSEsIGVudGl0eUlkOiBJbnQhKTogTGlrZVxcbn1cXG5cXG50eXBlIENPMiB7XFxuICBpZDogSW50IVxcbiAgdHlwZTogU3RyaW5nXFxuICBicHM6IEludFxcbn1cXG5cXG50eXBlIFRhZyB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG5hbWU6IFN0cmluZyFcXG59XFxuXFxudHlwZSBUYW5rIHtcXG4gIGlkOiBJbnQhXFxuICB2b2x1bWU6IEZsb2F0XFxuICB3aWR0aDogRmxvYXRcXG4gIGhlaWdodDogRmxvYXRcXG4gIGRlcHRoOiBGbG9hdFxcbiAgZ2xhc3NUaGlja25lc3M6IEZsb2F0XFxufVxcblxcbnR5cGUgVXNlciB7XFxuICBhcXVhc2NhcGVzKHBhZ2luYXRpb246IFBhZ2luYXRpb24hLCByYW5kb206IEJvb2xlYW4pOiBBcXVhc2NhcGVzUmVzdWx0IVxcbn1cXG5cXG50eXBlIEFxdWFzY2FwZSB7XFxuICBpZDogSW50IVxcbiAgY3JlYXRlZEF0OiBTdHJpbmchXFxuICB1cGRhdGVkQXQ6IFN0cmluZyFcXG4gIHRpdGxlOiBTdHJpbmdcXG4gIGZlYXR1cmVkOiBCb29sZWFuIVxcbiAgdHJlbmRpbmc6IEJvb2xlYW4hXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICB1c2VySWQ6IEludCFcXG4gIHVzZXI6IFVzZXJcXG4gIGNvMjogQ08yXFxuICB0YW5rOiBUYW5rXFxuICBtYWluSW1hZ2VVcmw6IFN0cmluZ1xcbiAgbWFpbkltYWdlUHVibGljSWQ6IFN0cmluZ1xcbiAgaW1hZ2VzOiBbQXF1YXNjYXBlSW1hZ2UhXSFcXG4gIHRhZ3M6IFtUYWchXSFcXG4gIHBsYW50czogW1BsYW50IV0hXFxuICBoYXJkc2NhcGU6IFtIYXJkc2NhcGUhXSFcXG4gIGxpdmVzdG9jazogW0xpdmVzdG9jayFdIVxcbiAgZmlsdGVyczogW0ZpbHRlciFdIVxcbiAgbGlnaHRzOiBbTGlnaHQhXSFcXG4gIHN1YnN0cmF0ZXM6IFtTdWJzdHJhdGUhXSFcXG4gIGFkZGl0aXZlczogW0FkZGl0aXZlIV0hXFxufVxcblxcbmlucHV0IFBhZ2luYXRpb24ge1xcbiAgbGltaXQ6IEludFxcbiAgY3Vyc29yOiBTdHJpbmdcXG4gIG9mZnNldDogSW50XFxufVxcblxcbmlucHV0IEFxdWFzY2FwZXNGaWx0ZXIge1xcbiAgdHJlbmRpbmc6IEJvb2xlYW5cXG59XFxuXFxudHlwZSBBcXVhc2NhcGVzUmVzdWx0IHtcXG4gIHJvd3M6IFtBcXVhc2NhcGUhXSFcXG4gIGNvdW50OiBJbnQhXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgYXF1YXNjYXBlcyhwYWdpbmF0aW9uOiBQYWdpbmF0aW9uISwgdXNlcklkOiBJbnQsIHJhbmRvbTogQm9vbGVhbik6IEFxdWFzY2FwZXNSZXN1bHQhXFxuICB0cmVuZGluZ0FxdWFzY2FwZXMocGFnaW5hdGlvbjogUGFnaW5hdGlvbiEpOiBbQXF1YXNjYXBlIV0hXFxuICBmZWF0dXJlZEFxdWFzY2FwZTogQXF1YXNjYXBlXFxuICBhcXVhc2NhcGUoaWQ6IEludCEpOiBBcXVhc2NhcGVcXG59XFxuXFxuc2NhbGFyIFVwbG9hZFxcblxcbnR5cGUgTWFpbkltYWdlVXBsb2FkUmVzdWx0IHtcXG4gIG1haW5JbWFnZVB1YmxpY0lkOiBTdHJpbmchXFxuICBtYWluSW1hZ2VVcmw6IFN0cmluZyFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBjcmVhdGVBcXVhc2NhcGU6IEFxdWFzY2FwZSFcXG4gIHVwZGF0ZUFxdWFzY2FwZVRpdGxlKGFxdWFzY2FwZUlkOiBJbnQhLCB0aXRsZTogU3RyaW5nISk6IFN0cmluZ1xcbiAgdXBkYXRlQXF1YXNjYXBlTWFpbkltYWdlKGFxdWFzY2FwZUlkOiBJbnQhLCBmaWxlOiBVcGxvYWQhKTogTWFpbkltYWdlVXBsb2FkUmVzdWx0IVxcbn1cXG5cXG50eXBlIFVzZXIge1xcbiAgaWQ6IEludCFcXG4gIHNsdWc6IFN0cmluZyFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGFib3V0OiBTdHJpbmdcXG4gIHByb2ZpbGVJbWFnZTogU3RyaW5nXFxuICBwcm9maWxlSW1hZ2VQdWJsaWNJZDogU3RyaW5nXFxuICBjb3ZlckltYWdlOiBTdHJpbmdcXG4gIGNvdmVySW1hZ2VQdWJsaWNJZDogU3RyaW5nXFxuICBjb3VudHJ5OiBTdHJpbmdcXG4gIGZhY2Vib29rVXJsOiBTdHJpbmdcXG4gIHlvdXR1YmVVcmw6IFN0cmluZ1xcbiAgaW5zdGFncmFtVXJsOiBTdHJpbmdcXG4gIHR3aXR0ZXJVcmw6IFN0cmluZ1xcbiAgY3JlYXRlZEF0OiBTdHJpbmchXFxuICB1cGRhdGVkQXQ6IFN0cmluZyFcXG59XFxuXFxudHlwZSBBdXRoUGF5bG9hZCB7XFxuICB0b2tlbjogU3RyaW5nIVxcbiAgdXNlcjogVXNlciFcXG59XFxuXFxudHlwZSBJbWFnZVVwbG9hZFJlc3VsdCB7XFxuICBpbWFnZVVybDogU3RyaW5nIVxcbiAgaW1hZ2VQdWJsaWNJZDogU3RyaW5nIVxcbn1cXG5cXG5lbnVtIEltYWdlVmFyaWFudCB7XFxuICBQUk9GSUxFXFxuICBDT1ZFUlxcbn1cXG5cXG5pbnB1dCBVc2VyRGV0YWlscyB7XFxuICBuYW1lOiBTdHJpbmdcXG4gIGFib3V0OiBTdHJpbmdcXG4gIGZhY2Vib29rVXJsOiBTdHJpbmdcXG4gIHlvdXR1YmVVcmw6IFN0cmluZ1xcbiAgaW5zdGFncmFtVXJsOiBTdHJpbmdcXG4gIHR3aXR0ZXJVcmw6IFN0cmluZ1xcbn1cXG5cXG5zY2FsYXIgVXBsb2FkXFxuXFxudHlwZSBRdWVyeSB7XFxuICBtZTogVXNlclxcbiAgdXNlcihpZDogSW50ISk6IFVzZXJcXG4gIHVzZXJCeVNsdWcoc2x1ZzogU3RyaW5nISk6IFVzZXJcXG4gIHVzZXJzOiBbVXNlcl0hXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgdXBsb2FkVXNlckltYWdlKGZpbGU6IFVwbG9hZCEsIGltYWdlVmFyaWFudDogSW1hZ2VWYXJpYW50ISk6IEltYWdlVXBsb2FkUmVzdWx0IVxcbiAgdXBkYXRlVXNlckRldGFpbHMoZGV0YWlsczogVXNlckRldGFpbHMhKTogW1VzZXJdXFxuICBjb25maXJtRW1haWwodG9rZW46IFN0cmluZyEpOiBBdXRoUGF5bG9hZFxcbn1cXG5cXG50eXBlIEZpbHRlciBpbXBsZW1lbnRzIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgZmlsdGVyczogW0ZpbHRlciFdIVxcbn1cXG5cXG5pbnRlcmZhY2UgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxuZW51bSBFcXVpcG1lbnRUeXBlIHtcXG4gIEZJTFRFUlxcbiAgU1VCU1RSQVRFXFxuICBMSUdIVFxcbiAgQURESVRJVkVTXFxufVxcblxcbmlucHV0IEVxdWlwbWVudEFyZ3Mge1xcbiAgZXF1aXBtZW50VHlwZTogRXF1aXBtZW50VHlwZSFcXG4gIGVxdWlwbWVudElkOiBJbnRcXG4gIG5hbWU6IFN0cmluZ1xcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudCFcXG4gIHJlbW92ZUVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudFxcbn1cXG5cXG50eXBlIExpZ2h0IGltcGxlbWVudHMgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIHdpZHRoOiBGbG9hdFxcbiAgaGVpZ2h0OiBGbG9hdFxcbiAgZGVwdGg6IEZsb2F0XFxuICBwb3dlcjogRmxvYXRcXG4gIGx1bWVuTWluOiBJbnRcXG4gIGx1bWVuTWF4OiBJbnRcXG4gIGtlbHZpbk1pbjogSW50XFxuICBrZWx2aW5NYXg6IEludFxcbiAgZGltbWFibGU6IEJvb2xlYW5cXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBsaWdodHM6IFtMaWdodCFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZExpZ2h0KGJyYW5kOiBTdHJpbmchLCBtb2RlbDogU3RyaW5nISwgYXF1YXNjYXBlSWQ6IEludCEpOiBMaWdodCFcXG4gIHJlbW92ZUxpZ2h0KGxpZ2h0SWQ6IEludCEsIGFxdWFzY2FwZUlkOiBJbnQhKTogTGlnaHRcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBQbGFudCB7XFxuICBpZDogSW50IVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbiAgb3JpZ2luOiBTdHJpbmdcXG4gIG1pbkhlaWdodDogSW50XFxuICBtYXhIZWlnaHQ6IEludFxcbiAgcG9zaXRpb246IFN0cmluZ1xcbiAgbHVtaW5vc2l0eTogU3RyaW5nXFxuICBncm93dGhTcGVlZDogU3RyaW5nXFxuICBkaWZmaWN1bHR5OiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBwbGFudHM6IFtQbGFudCFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZFBsYW50KHBsYW50SWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IFBsYW50IVxcbiAgcmVtb3ZlUGxhbnQocGxhbnRJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBQbGFudFxcbn1cXG5cXG50eXBlIEhhcmRzY2FwZSB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBoYXJkc2NhcGU6IFtIYXJkc2NhcGUhXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRIYXJkc2NhcGUoaGFyZHNjYXBlSWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IEhhcmRzY2FwZSFcXG4gIHJlbW92ZUhhcmRzY2FwZShoYXJkc2NhcGVJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBIYXJkc2NhcGVcXG59XFxuXFxudHlwZSBMaXZlc3RvY2sge1xcbiAgaWQ6IEludCFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBsaXZlc3RvY2s6IFtMaXZlc3RvY2shXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRMaXZlc3RvY2sobGl2ZXN0b2NrSWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IExpdmVzdG9jayFcXG4gIHJlbW92ZUxpdmVzdG9jayhsaXZlc3RvY2tJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBMaXZlc3RvY2tcXG59XFxuXFxudHlwZSBTdWJzdHJhdGUgaW1wbGVtZW50cyBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIHN1YnN0cmF0ZXM6IFtTdWJzdHJhdGUhXSFcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBBZGRpdGl2ZSBpbXBsZW1lbnRzIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgYWRkaXRpdmVzOiBbQWRkaXRpdmUhXSFcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBGaWx0ZXIgaW1wbGVtZW50cyBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGZpbHRlcnM6IFtGaWx0ZXIhXSFcXG59XFxuXFxuaW50ZXJmYWNlIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbmVudW0gRXF1aXBtZW50VHlwZSB7XFxuICBGSUxURVJcXG4gIFNVQlNUUkFURVxcbiAgTElHSFRcXG4gIEFERElUSVZFU1xcbn1cXG5cXG5pbnB1dCBFcXVpcG1lbnRBcmdzIHtcXG4gIGVxdWlwbWVudFR5cGU6IEVxdWlwbWVudFR5cGUhXFxuICBlcXVpcG1lbnRJZDogSW50XFxuICBuYW1lOiBTdHJpbmdcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnQhXFxuICByZW1vdmVFcXVpcG1lbnQoZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzISwgYXF1YXNjYXBlSWQ6IEludCEpOiBFcXVpcG1lbnRcXG59XFxuXFxudHlwZSBMaWtlIHtcXG4gIGlkOiBJbnQhXFxuICB1c2VySWQ6IEludCFcXG4gIGFxdWFzY2FwZUltYWdlSWQ6IEludFxcbiAgYXF1YXNjYXBlSWQ6IEludFxcbiAgY29tbWVudElkOiBJbnRcXG59XFxuXFxudHlwZSBBcXVhc2NhcGUge1xcbiAgbGlrZXNDb3VudDogSW50IVxcbiAgaXNMaWtlZEJ5TWU6IEJvb2xlYW4hXFxufVxcblxcbmVudW0gTGlrZUVudGl0eVR5cGUge1xcbiAgQVFVQVNDQVBFXFxuICBJTUFHRVxcbiAgQ09NTUVOVFxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGxpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSEsIGVudGl0eUlkOiBJbnQhKTogTGlrZVxcbiAgZGlzbGlrZShlbnRpdHk6IExpa2VFbnRpdHlUeXBlISwgZW50aXR5SWQ6IEludCEpOiBMaWtlXFxufVxcblxcbnR5cGUgQXF1YXNjYXBlSW1hZ2Uge1xcbiAgaWQ6IEludCFcXG4gIHRpdGxlOiBTdHJpbmdcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIHVybDogU3RyaW5nIVxcbiAgcHVibGljSWQ6IFN0cmluZyFcXG4gIGNyZWF0ZWRBdDogU3RyaW5nIVxcbiAgdXBkYXRlZEF0OiBTdHJpbmchXFxufVxcblxcbnNjYWxhciBVcGxvYWRcXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEFxdWFzY2FwZUltYWdlKGFxdWFzY2FwZUlkOiBJbnQhLCBmaWxlOiBVcGxvYWQhKTogQXF1YXNjYXBlSW1hZ2UhXFxuICBkZWxldGVBcXVhc2NhcGVJbWFnZShhcXVhc2NhcGVJZDogSW50ISwgaW1hZ2VJZDogSW50ISk6IEludFxcbn1cXG5cXG50eXBlIEJyYW5kIHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgbG9nbzogU3RyaW5nXFxuICBhZGRyZXNzOiBTdHJpbmdcXG59XFxuXFxudHlwZSBGaWx0ZXIge1xcbiAgYnJhbmQ6IEJyYW5kXFxufVxcblxcbnR5cGUgU3Vic3RyYXRlIHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIEFkZGl0aXZlIHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIExpZ2h0IHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG5pbnRlcmZhY2UgRXF1aXBtZW50IHtcXG4gIGJyYW5kOiBCcmFuZFxcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGJyYW5kczogW0JyYW5kIV0hXFxufVxcblwiIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7XHJcbiAgICBFcXVpcG1lbnRSZXBvc2l0b3J5SW50ZXJmYWNlLFxyXG4gICAgRXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZSxcclxufSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQmFzZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXF1aXBtZW50UHJvdmlkZXJJbnRlcmZhY2U8VD4ge1xyXG4gICAgYWRkRXF1aXBtZW50KG1vZGVsOiBzdHJpbmcpOiBCbHVlYmlyZDxUPlxyXG4gICAgYWRkRXF1aXBtZW50Rm9yQXF1YXNjYXBlKGVxdWlwbWVudElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBCbHVlYmlyZDxUPlxyXG4gICAgcmVtb3ZlRXF1aXBtZW50KGlkOiBudW1iZXIpOiBCbHVlYmlyZDxudW1iZXI+XHJcbiAgICByZW1vdmVFcXVpcG1lbnRGcm9tQXF1YXNjYXBlKGVxdWlwbWVudElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBCbHVlYmlyZDxudW1iZXI+XHJcbiAgICBmaW5kRXF1aXBtZW50QnlJZChpZDogbnVtYmVyKTogQmx1ZWJpcmQ8VCB8IG51bGw+XHJcbiAgICBzZXRFcXVpcG1lbnRSZXBvc2l0b3J5KHJlcG9zaXRvcnk6IEVxdWlwbWVudFJlcG9zaXRvcnlJbnRlcmZhY2U8VD4pOiB2b2lkXHJcbiAgICBzZXRFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5KHJlcG9zaXRvcnk6IEVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2U8VD4pOiB2b2lkXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEVxdWlwbWVudFByb3ZpZGVyPFQ+IGltcGxlbWVudHMgRXF1aXBtZW50UHJvdmlkZXJJbnRlcmZhY2U8VD4ge1xyXG4gICAgZXF1aXBtZW50UmVwb3NpdG9yeTogRXF1aXBtZW50UmVwb3NpdG9yeUludGVyZmFjZTxUPlxyXG4gICAgZXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeTogRXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZTxUPlxyXG5cclxuICAgIHNldEVxdWlwbWVudFJlcG9zaXRvcnkocmVwb3NpdG9yeTogRXF1aXBtZW50UmVwb3NpdG9yeUludGVyZmFjZTxUPikge1xyXG4gICAgICAgIHRoaXMuZXF1aXBtZW50UmVwb3NpdG9yeSA9IHJlcG9zaXRvcnlcclxuICAgIH1cclxuXHJcbiAgICBzZXRFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5KHJlcG9zaXRvcnk6IEVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2U8VD4pIHtcclxuICAgICAgICB0aGlzLmVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnkgPSByZXBvc2l0b3J5XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXF1aXBtZW50KG1vZGVsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcXVpcG1lbnRSZXBvc2l0b3J5LmFkZEVxdWlwbWVudChtb2RlbClcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcXVpcG1lbnRGb3JBcXVhc2NhcGUoZXF1aXBtZW50SWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnkuYWRkRXF1aXBtZW50Rm9yQXF1YXNjYXBlKGVxdWlwbWVudElkLCBhcXVhc2NhcGVJZClcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFcXVpcG1lbnQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWlwbWVudFJlcG9zaXRvcnkucmVtb3ZlRXF1aXBtZW50KGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUVxdWlwbWVudEZyb21BcXVhc2NhcGUoZXF1aXBtZW50SWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnkucmVtb3ZlRXF1aXBtZW50RnJvbUFxdWFzY2FwZShcclxuICAgICAgICAgICAgZXF1aXBtZW50SWQsXHJcbiAgICAgICAgICAgIGFxdWFzY2FwZUlkXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRFcXVpcG1lbnRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcXVpcG1lbnRSZXBvc2l0b3J5LmZpbmRCeUlkKGlkKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7R3JhcGhRTE1vZHVsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnLi9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHtyZXNvbHZlcnN9IGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQge0FxdWFzY2FwZVJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9BcXVhc2NhcGUnXHJcbmltcG9ydCB7RmlsdGVyUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0ZpbHRlcidcclxuaW1wb3J0IHtMaWdodFJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9MaWdodCdcclxuaW1wb3J0IHtTdWJzdHJhdGVSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvU3Vic3RyYXRlJ1xyXG5pbXBvcnQge0FkZGl0aXZlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FkZGl0aXZlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUZpbHRlclJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9BcXVhc2NhcGVGaWx0ZXInXHJcbmltcG9ydCB7QXF1YXNjYXBlTGlnaHRSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlTGlnaHQnXHJcbmltcG9ydCB7QXF1YXNjYXBlU3Vic3RyYXRlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZVN1YnN0cmF0ZSdcclxuaW1wb3J0IHtBcXVhc2NhcGVBZGRpdGl2ZVJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9BcXVhc2NhcGVBZGRpdGl2ZSdcclxuaW1wb3J0IHtFcXVpcG1lbnRQcm92aWRlcn0gZnJvbSAnLi9FcXVpcG1lbnRQcm92aWRlcidcclxuXHJcbmV4cG9ydCBjb25zdCBFcXVpcG1lbnRNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IHRva2Vucy5BUVVBU0NBUEVfUkVQT1NJVE9SWSxcclxuICAgICAgICAgICAgdXNlQ2xhc3M6IEFxdWFzY2FwZVJlcG9zaXRvcnksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkVRVUlQTUVOVF9QUk9WSURFUiwgdXNlQ2xhc3M6IEVxdWlwbWVudFByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkZJTFRFUl9SRVBPU0lUT1JZLCB1c2VDbGFzczogRmlsdGVyUmVwb3NpdG9yeX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5MSUdIVF9SRVBPU0lUT1JZLCB1c2VDbGFzczogTGlnaHRSZXBvc2l0b3J5fSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlNVQlNUUkFURV9SRVBPU0lUT1JZLCB1c2VDbGFzczogU3Vic3RyYXRlUmVwb3NpdG9yeX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BRERJVElWRV9SRVBPU0lUT1JZLCB1c2VDbGFzczogQWRkaXRpdmVSZXBvc2l0b3J5fSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkFRVUFTQ0FQRV9GSUxURVJfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEFxdWFzY2FwZUZpbHRlclJlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQVFVQVNDQVBFX0xJR0hUX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBBcXVhc2NhcGVMaWdodFJlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQVFVQVNDQVBFX1NVQlNUUkFURV9SRVBPU0lUT1JZLCB1c2VDbGFzczogQXF1YXNjYXBlU3Vic3RyYXRlUmVwb3NpdG9yeX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BUVVBU0NBUEVfQURESVRJVkVTX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBBcXVhc2NhcGVBZGRpdGl2ZVJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG59KVxyXG4iLCJpbXBvcnQge1VzZXJJbnB1dEVycm9yfSBmcm9tICdhcG9sbG8tc2VydmVyJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHthdXRoZW50aWNhdGUsIGF1dGhvcml6ZUFxdWFzY2FwZVVwZGF0ZX0gZnJvbSAnYXBpL2d1YXJkcydcclxuaW1wb3J0IHtGaWx0ZXIsIExpZ2h0LCBTdWJzdHJhdGUsIEFkZGl0aXZlfSBmcm9tICdkYi9tb2RlbHMnXHJcbmltcG9ydCB7RXF1aXBtZW50UHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJy4vRXF1aXBtZW50UHJvdmlkZXInXHJcbmltcG9ydCB7TXV0YXRpb25BZGRFcXVpcG1lbnRBcmdzLCBNdXRhdGlvblJlbW92ZUVxdWlwbWVudEFyZ3N9IGZyb20gJ2ludGVyZmFjZXMvZ3JhcGhxbC90eXBlcydcclxuXHJcbmVudW0gRXF1aXBtZW50VHlwZSB7XHJcbiAgICBGSUxURVIgPSAnRklMVEVSJyxcclxuICAgIFNVQlNUUkFURSA9ICdTVUJTVFJBVEUnLFxyXG4gICAgTElHSFQgPSAnTElHSFQnLFxyXG4gICAgQURESVRJVkVTID0gJ0FERElUSVZFUycsXHJcbn1cclxuXHJcbnR5cGUgRXF1aXBtZW50TW9kZWwgPSBGaWx0ZXIgfCBMaWdodCB8IFN1YnN0cmF0ZSB8IEFkZGl0aXZlXHJcblxyXG5jb25zdCBlcXVpcG1lbnRSZXBvTWFwcGluZyA9IHtcclxuICAgIFtFcXVpcG1lbnRUeXBlLkZJTFRFUl06IHRva2Vucy5GSUxURVJfUkVQT1NJVE9SWSxcclxuICAgIFtFcXVpcG1lbnRUeXBlLkxJR0hUXTogdG9rZW5zLkxJR0hUX1JFUE9TSVRPUlksXHJcbiAgICBbRXF1aXBtZW50VHlwZS5TVUJTVFJBVEVdOiB0b2tlbnMuU1VCU1RSQVRFX1JFUE9TSVRPUlksXHJcbiAgICBbRXF1aXBtZW50VHlwZS5BRERJVElWRVNdOiB0b2tlbnMuQURESVRJVkVfUkVQT1NJVE9SWSxcclxufVxyXG5cclxuY29uc3QgZXF1aXBtZW50QXF1YXNjYXBlUmVwb01hcHBpbmcgPSB7XHJcbiAgICBbRXF1aXBtZW50VHlwZS5GSUxURVJdOiB0b2tlbnMuQVFVQVNDQVBFX0ZJTFRFUl9SRVBPU0lUT1JZLFxyXG4gICAgW0VxdWlwbWVudFR5cGUuTElHSFRdOiB0b2tlbnMuQVFVQVNDQVBFX0xJR0hUX1JFUE9TSVRPUlksXHJcbiAgICBbRXF1aXBtZW50VHlwZS5TVUJTVFJBVEVdOiB0b2tlbnMuQVFVQVNDQVBFX1NVQlNUUkFURV9SRVBPU0lUT1JZLFxyXG4gICAgW0VxdWlwbWVudFR5cGUuQURESVRJVkVTXTogdG9rZW5zLkFRVUFTQ0FQRV9BRERJVElWRVNfUkVQT1NJVE9SWSxcclxufVxyXG5cclxuY29uc3QgZ2V0RXF1aXBtZW50UHJvdmlkZXIgPSAoXHJcbiAgICByb290LFxyXG4gICAgYXJnczogTXV0YXRpb25BZGRFcXVpcG1lbnRBcmdzIHwgTXV0YXRpb25SZW1vdmVFcXVpcG1lbnRBcmdzLFxyXG4gICAgY29udGV4dFxyXG4pID0+IHtcclxuICAgIGNvbnN0IGVxdWlwbWVudFJlcG9zaXRvcnkgPSBjb250ZXh0LmluamVjdG9yLmdldChcclxuICAgICAgICBlcXVpcG1lbnRSZXBvTWFwcGluZ1thcmdzLmVxdWlwbWVudC5lcXVpcG1lbnRUeXBlXVxyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IGVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnkgPSBjb250ZXh0LmluamVjdG9yLmdldChcclxuICAgICAgICBlcXVpcG1lbnRBcXVhc2NhcGVSZXBvTWFwcGluZ1thcmdzLmVxdWlwbWVudC5lcXVpcG1lbnRUeXBlXVxyXG4gICAgKVxyXG5cclxuICAgIGlmICghZXF1aXBtZW50UmVwb3NpdG9yeSB8fCAhZXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeSkge1xyXG4gICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignSW52YWxpZCBlcXVpcG1lbnQgdHlwZSBwcm92aWRlZC4nKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyOiBFcXVpcG1lbnRQcm92aWRlckludGVyZmFjZTxFcXVpcG1lbnRNb2RlbD4gPSBjb250ZXh0LmluamVjdG9yLmdldChcclxuICAgICAgICB0b2tlbnMuRVFVSVBNRU5UX1BST1ZJREVSXHJcbiAgICApXHJcblxyXG4gICAgcHJvdmlkZXIuc2V0RXF1aXBtZW50UmVwb3NpdG9yeShlcXVpcG1lbnRSZXBvc2l0b3J5KVxyXG4gICAgcHJvdmlkZXIuc2V0RXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeShlcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5KVxyXG5cclxuICAgIHJldHVybiBwcm92aWRlclxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgRXF1aXBtZW50OiB7XHJcbiAgICAgICAgX19yZXNvbHZlVHlwZShlcXVpcG1lbnQsIGNvbnRleHQsIGluZm8pIHtcclxuICAgICAgICAgICAgaWYgKGVxdWlwbWVudCBpbnN0YW5jZW9mIEZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdGaWx0ZXInXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcXVpcG1lbnQgaW5zdGFuY2VvZiBMaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdMaWdodCdcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVxdWlwbWVudCBpbnN0YW5jZW9mIFN1YnN0cmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdTdWJzdHJhdGUnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcXVpcG1lbnQgaW5zdGFuY2VvZiBBZGRpdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdBZGRpdGl2ZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb246IHtcclxuICAgICAgICBhc3luYyBhZGRFcXVpcG1lbnQocm9vdCwgYXJnczogTXV0YXRpb25BZGRFcXVpcG1lbnRBcmdzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBlcXVpcG1lbnQ6IEVxdWlwbWVudE1vZGVsIHwgbnVsbCA9IG51bGxcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBnZXRFcXVpcG1lbnRQcm92aWRlcihyb290LCBhcmdzLCBjb250ZXh0KVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3MuZXF1aXBtZW50LmVxdWlwbWVudElkKSB7XHJcbiAgICAgICAgICAgICAgICBlcXVpcG1lbnQgPSBhd2FpdCBwcm92aWRlci5maW5kRXF1aXBtZW50QnlJZChhcmdzLmVxdWlwbWVudC5lcXVpcG1lbnRJZClcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmdzLmVxdWlwbWVudC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBlcXVpcG1lbnQgPSBhd2FpdCBwcm92aWRlci5hZGRFcXVpcG1lbnQoYXJncy5lcXVpcG1lbnQubmFtZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFlcXVpcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignZXF1aXBtZW50IGlkIG9yIGVxdWlwbWVudCBuYW1lIGlzIG5vdCBwcm92aWRlZCcpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVyLmFkZEVxdWlwbWVudEZvckFxdWFzY2FwZShlcXVpcG1lbnQuaWQsIGFyZ3MuYXF1YXNjYXBlSWQpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZXF1aXBtZW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyByZW1vdmVFcXVpcG1lbnQocm9vdCwgYXJnczogTXV0YXRpb25SZW1vdmVFcXVpcG1lbnRBcmdzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmICghYXJncy5lcXVpcG1lbnQuZXF1aXBtZW50SWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignZXF1aXBtZW50IGlkIG9yIGVxdWlwbWVudCBuYW1lIGlzIG5vdCBwcm92aWRlZCcpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gZ2V0RXF1aXBtZW50UHJvdmlkZXIocm9vdCwgYXJncywgY29udGV4dClcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVxdWlwbWVudCA9IGF3YWl0IHByb3ZpZGVyLmZpbmRFcXVpcG1lbnRCeUlkKGFyZ3MuZXF1aXBtZW50LmVxdWlwbWVudElkKVxyXG5cclxuICAgICAgICAgICAgaWYgKCFlcXVpcG1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignRXF1aXBtZW50IG5vdCBmb3VuZCcpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVyLnJlbW92ZUVxdWlwbWVudEZyb21BcXVhc2NhcGUoZXF1aXBtZW50LmlkLCBhcmdzLmFxdWFzY2FwZUlkKVxyXG5cclxuICAgICAgICAgICAgaWYgKCFlcXVpcG1lbnQucHJlZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZXIucmVtb3ZlRXF1aXBtZW50KGVxdWlwbWVudC5pZClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGVxdWlwbWVudFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzQ29tcG9zaXRpb24gPSB7XHJcbiAgICAnTXV0YXRpb24uYWRkRXF1aXBtZW50JzogW2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlXSxcclxuICAgICdNdXRhdGlvbi5yZW1vdmVFcXVpcG1lbnQnOiBbYXV0aGVudGljYXRlLCBhdXRob3JpemVBcXVhc2NhcGVVcGRhdGVdLFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJpbnRlcmZhY2UgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxuZW51bSBFcXVpcG1lbnRUeXBlIHtcXG4gIEZJTFRFUlxcbiAgU1VCU1RSQVRFXFxuICBMSUdIVFxcbiAgQURESVRJVkVTXFxufVxcblxcbmlucHV0IEVxdWlwbWVudEFyZ3Mge1xcbiAgZXF1aXBtZW50VHlwZTogRXF1aXBtZW50VHlwZSFcXG4gIGVxdWlwbWVudElkOiBJbnRcXG4gIG5hbWU6IFN0cmluZ1xcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudCFcXG4gIHJlbW92ZUVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudFxcbn1cXG5cIiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5pbXBvcnQge0ZpbHRlclJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9GaWx0ZXInXHJcbmltcG9ydCB7RmlsdGVyfSBmcm9tICdkYi9tb2RlbHMvRmlsdGVyJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBnZXRGaWx0ZXJzOiAoKSA9PiBCbHVlYmlyZDxGaWx0ZXJbXT5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyUHJvdmlkZXIgaW1wbGVtZW50cyBGaWx0ZXJQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBASW5qZWN0KHRva2Vucy5GSUxURVJfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGZpbHRlclJlcG9zaXRvcnk6IEZpbHRlclJlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgICkge31cclxuXHJcbiAgICBnZXRGaWx0ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlclJlcG9zaXRvcnkuZ2V0RmlsdGVycygpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtHcmFwaFFMTW9kdWxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnLi9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHtyZXNvbHZlcnN9IGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQge0ZpbHRlclByb3ZpZGVyfSBmcm9tICdhcGkvbW9kdWxlcy9GaWx0ZXIvRmlsdGVyUHJvdmlkZXInXHJcbmltcG9ydCB7RmlsdGVyUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0ZpbHRlcidcclxuXHJcbmV4cG9ydCBjb25zdCBGaWx0ZXJNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkZJTFRFUl9QUk9WSURFUiwgdXNlQ2xhc3M6IEZpbHRlclByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkZJTFRFUl9SRVBPU0lUT1JZLCB1c2VDbGFzczogRmlsdGVyUmVwb3NpdG9yeX0sXHJcbiAgICBdLFxyXG4gICAgdHlwZURlZnMsXHJcbiAgICByZXNvbHZlcnMsXHJcbn0pXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtGaWx0ZXJQcm92aWRlckludGVyZmFjZX0gZnJvbSAnLi9GaWx0ZXJQcm92aWRlcidcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBRdWVyeToge1xyXG4gICAgICAgIGFzeW5jIGZpbHRlcnMocm9vdCwgYXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogRmlsdGVyUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuRklMVEVSX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZ2V0RmlsdGVycygpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcInR5cGUgRmlsdGVyIGltcGxlbWVudHMgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBmaWx0ZXJzOiBbRmlsdGVyIV0hXFxufVxcblxcbmludGVyZmFjZSBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG5lbnVtIEVxdWlwbWVudFR5cGUge1xcbiAgRklMVEVSXFxuICBTVUJTVFJBVEVcXG4gIExJR0hUXFxuICBBRERJVElWRVNcXG59XFxuXFxuaW5wdXQgRXF1aXBtZW50QXJncyB7XFxuICBlcXVpcG1lbnRUeXBlOiBFcXVpcG1lbnRUeXBlIVxcbiAgZXF1aXBtZW50SWQ6IEludFxcbiAgbmFtZTogU3RyaW5nXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgYWRkRXF1aXBtZW50KGVxdWlwbWVudDogRXF1aXBtZW50QXJncyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogRXF1aXBtZW50IVxcbiAgcmVtb3ZlRXF1aXBtZW50KGVxdWlwbWVudDogRXF1aXBtZW50QXJncyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogRXF1aXBtZW50XFxufVxcblwiIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0ZvbGxvd30gZnJvbSAnZGIvbW9kZWxzL0ZvbGxvdydcclxuaW1wb3J0IHtGb2xsb3dSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvRm9sbG93J1xyXG5pbXBvcnQge1VzZXJSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVXNlcidcclxuaW1wb3J0IHtVc2VyfSBmcm9tICdkYi9tb2RlbHMvVXNlcidcclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtVc2VySW5wdXRFcnJvcn0gZnJvbSAnYXBvbGxvLXNlcnZlcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRm9sbG93UHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgZm9sbG93VXNlcjogKGZvbGxvd2VkSWQ6IG51bWJlciwgZm9sbG93ZXJJZDogbnVtYmVyKSA9PiBQcm9taXNlPFVzZXI+XHJcbiAgICB1bmZvbGxvd1VzZXI6IChmb2xsb3dlZElkOiBudW1iZXIsIGZvbGxvd2VySWQ6IG51bWJlcikgPT4gUHJvbWlzZTxVc2VyPlxyXG4gICAgaXNGb2xsb3dlZEJ5OiAoZm9sbG93ZXJJZDogbnVtYmVyLCBmb2xsb3dlZElkOiBudW1iZXIpID0+IFByb21pc2U8Ym9vbGVhbj5cclxuICAgIGdldEZvbGxvd3M6IChcclxuICAgICAgICB1c2VySWQ6IG51bWJlclxyXG4gICAgKSA9PiBQcm9taXNlPHtmb2xsb3dlcnM6IEZvbGxvd1tdLCBmb2xsb3dpbmc6IEZvbGxvd1tdfT5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9sbG93UHJvdmlkZXIgaW1wbGVtZW50cyBGb2xsb3dQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBASW5qZWN0KHRva2Vucy5GT0xMT1dfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGZvbGxvd1JlcG9zaXRvcnk6IEZvbGxvd1JlcG9zaXRvcnlJbnRlcmZhY2UsXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuVVNFUl9SRVBPU0lUT1JZKVxyXG4gICAgICAgIHByaXZhdGUgdXNlclJlcG9zaXRvcnk6IFVzZXJSZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICApIHt9XHJcblxyXG4gICAgYXN5bmMgZm9sbG93VXNlcihmb2xsb3dlZElkOiBudW1iZXIsIGZvbGxvd2VySWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IFtmb2xsb3dlciwgZm9sbG93ZWRdID0gYXdhaXQgdGhpcy5maW5kVXNlcnMoXHJcbiAgICAgICAgICAgIGZvbGxvd2VySWQsXHJcbiAgICAgICAgICAgIGZvbGxvd2VkSWRcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGlmICghZm9sbG93ZXIgfHwgIWZvbGxvd2VkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignVXNlciBkb2VzIG5vdCBleGlzdCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmZvbGxvd1JlcG9zaXRvcnkuZm9sbG93VXNlcihmb2xsb3dlZElkLCBmb2xsb3dlcklkKVxyXG5cclxuICAgICAgICByZXR1cm4gZm9sbG93ZWRcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1bmZvbGxvd1VzZXIoZm9sbG93ZWRJZDogbnVtYmVyLCBmb2xsb3dlcklkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBbZm9sbG93ZXIsIGZvbGxvd2VkXSA9IGF3YWl0IHRoaXMuZmluZFVzZXJzKFxyXG4gICAgICAgICAgICBmb2xsb3dlcklkLFxyXG4gICAgICAgICAgICBmb2xsb3dlZElkXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICBpZiAoIWZvbGxvd2VyIHx8ICFmb2xsb3dlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVXNlcklucHV0RXJyb3IoJ1VzZXIgZG9lcyBub3QgZXhpc3QnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5mb2xsb3dSZXBvc2l0b3J5LnVuZm9sbG93VXNlcihmb2xsb3dlZElkLCBmb2xsb3dlcklkKVxyXG5cclxuICAgICAgICByZXR1cm4gZm9sbG93ZWRcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb2xsb3dzKHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9sbG93UmVwb3NpdG9yeS5nZXRGb2xsb3dzKHVzZXJJZClcclxuICAgIH1cclxuXHJcbiAgICBpc0ZvbGxvd2VkQnkoZm9sbG93ZXJJZDogbnVtYmVyLCBmb2xsb3dlZElkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb2xsb3dSZXBvc2l0b3J5LmlzRm9sbG93ZWRCeShmb2xsb3dlcklkLCBmb2xsb3dlZElkKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZmluZFVzZXJzKGZvbGxvd2VySWQ6IG51bWJlciwgZm9sbG93ZWRJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy51c2VyUmVwb3NpdG9yeS5maW5kT25lKHt3aGVyZToge2lkOiBmb2xsb3dlcklkfX0pLFxyXG4gICAgICAgICAgICB0aGlzLnVzZXJSZXBvc2l0b3J5LmZpbmRPbmUoe3doZXJlOiB7aWQ6IGZvbGxvd2VkSWR9fSksXHJcbiAgICAgICAgXSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuaW1wb3J0IHtGb2xsb3dSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvRm9sbG93J1xyXG5pbXBvcnQge1VzZXJSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVXNlcidcclxuaW1wb3J0IHtGb2xsb3dQcm92aWRlcn0gZnJvbSAnYXBpL21vZHVsZXMvRm9sbG93L0ZvbGxvd1Byb3ZpZGVyJ1xyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJ2FwaS9tb2R1bGVzL0ZvbGxvdy9yZXNvbHZlcnMnXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCAqIGFzIHR5cGVEZWZzIGZyb20gJ2FwaS9tb2R1bGVzL0ZvbGxvdy9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHthdHRhY2hDdXJyZW50VXNlcklkLCBjb21wb3NlQ29udGV4dH0gZnJvbSAnYXBpL2NvbnRleHQnXHJcblxyXG5leHBvcnQgY29uc3QgRm9sbG93TW9kdWxlID0gbmV3IEdyYXBoUUxNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5GT0xMT1dfUFJPVklERVIsIHVzZUNsYXNzOiBGb2xsb3dQcm92aWRlcn0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5GT0xMT1dfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEZvbGxvd1JlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuVVNFUl9SRVBPU0lUT1JZLCB1c2VDbGFzczogVXNlclJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG4gICAgcmVzb2x2ZXJzQ29tcG9zaXRpb24sXHJcbiAgICBjb250ZXh0OiBjb21wb3NlQ29udGV4dChbYXR0YWNoQ3VycmVudFVzZXJJZF0pLFxyXG59KVxyXG4iLCJpbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7Rm9sbG93UHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJ2FwaS9tb2R1bGVzL0ZvbGxvdy9Gb2xsb3dQcm92aWRlcidcclxuaW1wb3J0IHthdXRoZW50aWNhdGV9IGZyb20gJ2FwaS9ndWFyZHMnXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7VXNlcn0gZnJvbSAnZGIvbW9kZWxzL1VzZXInXHJcbmltcG9ydCB7QXV0aGVudGljYXRpb25Db250ZXh0fSBmcm9tICdhcGkvY29udGV4dCdcclxuaW1wb3J0IHtNdXRhdGlvbkZvbGxvd1VzZXJBcmdzLCBNdXRhdGlvblVuZm9sbG93VXNlckFyZ3N9IGZyb20gJ2FwaS9nZW5lcmF0ZWQvdHlwZXMnXHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgVXNlcjoge1xyXG4gICAgICAgIGFzeW5jIGlzRm9sbG93ZWRCeU1lKHVzZXI6IFVzZXIsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQgJiBBdXRoZW50aWNhdGlvbkNvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKCFjb250ZXh0LmN1cnJlbnRVc2VySWQgfHwgY29udGV4dC5jdXJyZW50VXNlcklkID09PSB1c2VyLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEZvbGxvd1Byb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkZPTExPV19QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmlzRm9sbG93ZWRCeShjb250ZXh0LmN1cnJlbnRVc2VySWQsIHVzZXIuaWQpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBmb2xsb3dlcnNDb3VudCh1c2VyOiBVc2VyLCBhcmdzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBGb2xsb3dQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5GT0xMT1dfUFJPVklERVIpXHJcbiAgICAgICAgICAgIGNvbnN0IHtmb2xsb3dlcnN9ID0gYXdhaXQgcHJvdmlkZXIuZ2V0Rm9sbG93cyh1c2VyLmlkKVxyXG4gICAgICAgICAgICByZXR1cm4gZm9sbG93ZXJzLmxlbmd0aFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgZm9sbG93aW5nQ291bnQodXNlcjogVXNlciwgYXJncywgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogRm9sbG93UHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuRk9MTE9XX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBjb25zdCB7Zm9sbG93aW5nfSA9IGF3YWl0IHByb3ZpZGVyLmdldEZvbGxvd3ModXNlci5pZClcclxuICAgICAgICAgICAgcmV0dXJuIGZvbGxvd2luZy5sZW5ndGhcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIE11dGF0aW9uOiB7XHJcbiAgICAgICAgYXN5bmMgZm9sbG93VXNlcihcclxuICAgICAgICAgICAgcm9vdCxcclxuICAgICAgICAgICAgYXJnczogTXV0YXRpb25Gb2xsb3dVc2VyQXJncyxcclxuICAgICAgICAgICAgY29udGV4dDogTW9kdWxlQ29udGV4dCAmIEF1dGhlbnRpY2F0aW9uQ29udGV4dFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogRm9sbG93UHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuRk9MTE9XX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZm9sbG93VXNlcihhcmdzLnVzZXJJZCwgY29udGV4dC5jdXJyZW50VXNlcklkKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgdW5mb2xsb3dVc2VyKFxyXG4gICAgICAgICAgICByb290LFxyXG4gICAgICAgICAgICBhcmdzOiBNdXRhdGlvblVuZm9sbG93VXNlckFyZ3MsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQgJiBBdXRoZW50aWNhdGlvbkNvbnRleHRcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEZvbGxvd1Byb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkZPTExPV19QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLnVuZm9sbG93VXNlcihhcmdzLnVzZXJJZCwgY29udGV4dC5jdXJyZW50VXNlcklkKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzQ29tcG9zaXRpb24gPSB7XHJcbiAgICAnTXV0YXRpb24uZm9sbG93VXNlcic6IFthdXRoZW50aWNhdGVdLFxyXG4gICAgJ011dGF0aW9uLnVuZm9sbG93VXNlcic6IFthdXRoZW50aWNhdGVdLFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIEZvbGxvdyB7XFxuICBpZDogSW50IVxcbiAgZm9sbG93ZWRVc2VySWQ6IEludCFcXG4gIGZvbGxvd2VyVXNlcklkOiBJbnQhXFxuICBmb2xsb3dlZDogVXNlciFcXG4gIGZvbGxvd2VyOiBVc2VyIVxcbiAgdXBkYXRlZEF0OiBTdHJpbmchXFxuICBjcmVhdGVkQXQ6IFN0cmluZyFcXG59XFxuXFxudHlwZSBGb2xsb3dzIHtcXG4gIGZvbGxvd2luZzogW0ZvbGxvd11cXG4gIGZvbGxvd2VyczogW0ZvbGxvd11cXG59XFxuXFxudHlwZSBVc2VyIHtcXG4gIGZvbGxvd2Vyc0NvdW50OiBJbnQhXFxuICBmb2xsb3dpbmdDb3VudDogSW50IVxcbiAgaXNGb2xsb3dlZEJ5TWU6IEJvb2xlYW4hXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgZm9sbG93VXNlcih1c2VySWQ6IEludCEpOiBVc2VyXFxuICB1bmZvbGxvd1VzZXIodXNlcklkOiBJbnQhKTogVXNlclxcbn1cXG5cIiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5pbXBvcnQge0hhcmRzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9IYXJkc2NhcGUnXHJcbmltcG9ydCB7SGFyZHNjYXBlfSBmcm9tICdkYi9tb2RlbHMvSGFyZHNjYXBlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUhhcmRzY2FwZX0gZnJvbSAnZGIvbW9kZWxzJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUhhcmRzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9BcXVhc2NhcGVIYXJkc2NhcGUnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhhcmRzY2FwZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGdldEhhcmRzY2FwZTogKCkgPT4gQmx1ZWJpcmQ8SGFyZHNjYXBlW10+XHJcbiAgICBhZGRIYXJkc2NhcGUobmFtZTogc3RyaW5nKTogQmx1ZWJpcmQ8SGFyZHNjYXBlPlxyXG4gICAgYWRkSGFyZHNjYXBlRm9yQXF1YXNjYXBlKGhhcmRzY2FwZUlkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBCbHVlYmlyZDxBcXVhc2NhcGVIYXJkc2NhcGU+XHJcbiAgICByZW1vdmVIYXJkc2NhcGUoaWQ6IG51bWJlcik6IEJsdWViaXJkPG51bWJlcj5cclxuICAgIHJlbW92ZUhhcmRzY2FwZUZvckFxdWFzY2FwZShoYXJkc2NhcGVJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKTogQmx1ZWJpcmQ8bnVtYmVyPlxyXG4gICAgZmluZEhhcmRzY2FwZUJ5SWQoaWQ6IG51bWJlcik6IEJsdWViaXJkPEhhcmRzY2FwZSB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhcmRzY2FwZVByb3ZpZGVyIGltcGxlbWVudHMgSGFyZHNjYXBlUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuSEFSRFNDQVBFX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBoYXJkc2NhcGVSZXBvc2l0b3J5OiBIYXJkc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlLFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkFRVUFTQ0FQRV9IQVJEU0NBUEVfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGFxdWFzY2FwZUhhcmRzY2FwZVJlcG9zaXRvcnk6IEFxdWFzY2FwZUhhcmRzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgICkge31cclxuXHJcbiAgICBnZXRIYXJkc2NhcGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFyZHNjYXBlUmVwb3NpdG9yeS5nZXRIYXJkc2NhcGUoKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEhhcmRzY2FwZShuYW1lOiBzdHJpbmcpOiBCbHVlYmlyZDxIYXJkc2NhcGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXJkc2NhcGVSZXBvc2l0b3J5LmNyZWF0ZSh7bmFtZX0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkSGFyZHNjYXBlRm9yQXF1YXNjYXBlKGhhcmRzY2FwZUlkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBCbHVlYmlyZDxBcXVhc2NhcGVIYXJkc2NhcGU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcXVhc2NhcGVIYXJkc2NhcGVSZXBvc2l0b3J5LmFkZEhhcmRzY2FwZUZvckFxdWFzY2FwZShoYXJkc2NhcGVJZCwgYXF1YXNjYXBlSWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSGFyZHNjYXBlKGlkOiBudW1iZXIpOiBCbHVlYmlyZDxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oYXJkc2NhcGVSZXBvc2l0b3J5LmRlc3Ryb3koe3doZXJlOiB7aWR9fSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVIYXJkc2NhcGVGb3JBcXVhc2NhcGUoaGFyZHNjYXBlSWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcik6IEJsdWViaXJkPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFxdWFzY2FwZUhhcmRzY2FwZVJlcG9zaXRvcnkuZGVzdHJveSh7d2hlcmU6IHtoYXJkc2NhcGVJZCwgYXF1YXNjYXBlSWR9fSlcclxuICAgIH1cclxuXHJcbiAgICBmaW5kSGFyZHNjYXBlQnlJZChpZDogbnVtYmVyKTogQmx1ZWJpcmQ8SGFyZHNjYXBlIHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhcmRzY2FwZVJlcG9zaXRvcnkuZmluZEhhcmRzY2FwZUJ5SWQoaWQpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtHcmFwaFFMTW9kdWxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnLi9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHtyZXNvbHZlcnMsIHJlc29sdmVyc0NvbXBvc2l0aW9ufSBmcm9tICcuL3Jlc29sdmVycydcclxuaW1wb3J0IHtIYXJkc2NhcGVQcm92aWRlcn0gZnJvbSAnYXBpL21vZHVsZXMvSGFyZHNjYXBlL0hhcmRzY2FwZVByb3ZpZGVyJ1xyXG5pbXBvcnQge0hhcmRzY2FwZVJlcG9zaXRvcnl9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9IYXJkc2NhcGUnXHJcbmltcG9ydCB7QXF1YXNjYXBlSGFyZHNjYXBlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZUhhcmRzY2FwZSdcclxuaW1wb3J0IHthdHRhY2hDdXJyZW50VXNlcklkLCBjb21wb3NlQ29udGV4dH0gZnJvbSAnYXBpL2NvbnRleHQnXHJcbmltcG9ydCB7QXF1YXNjYXBlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZSdcclxuXHJcbmV4cG9ydCBjb25zdCBIYXJkc2NhcGVNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkFRVUFTQ0FQRV9SRVBPU0lUT1JZLCB1c2VDbGFzczogQXF1YXNjYXBlUmVwb3NpdG9yeX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5IQVJEU0NBUEVfUFJPVklERVIsIHVzZUNsYXNzOiBIYXJkc2NhcGVQcm92aWRlcn0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5IQVJEU0NBUEVfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEhhcmRzY2FwZVJlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQVFVQVNDQVBFX0hBUkRTQ0FQRV9SRVBPU0lUT1JZLCB1c2VDbGFzczogQXF1YXNjYXBlSGFyZHNjYXBlUmVwb3NpdG9yeX0sXHJcbiAgICBdLFxyXG4gICAgdHlwZURlZnMsXHJcbiAgICByZXNvbHZlcnMsXHJcbiAgICByZXNvbHZlcnNDb21wb3NpdGlvbixcclxuICAgIGNvbnRleHQ6IGNvbXBvc2VDb250ZXh0KFthdHRhY2hDdXJyZW50VXNlcklkXSksXHJcbn0pXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5pbXBvcnQge1VzZXJJbnB1dEVycm9yfSBmcm9tICdhcG9sbG8tc2VydmVyJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtIYXJkc2NhcGVQcm92aWRlckludGVyZmFjZX0gZnJvbSAnLi9IYXJkc2NhcGVQcm92aWRlcidcclxuaW1wb3J0IHthdXRoZW50aWNhdGUsIGF1dGhvcml6ZUFxdWFzY2FwZVVwZGF0ZX0gZnJvbSAnYXBpL2d1YXJkcydcclxuaW1wb3J0IHtIYXJkc2NhcGV9IGZyb20gJ2RiL21vZGVscydcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBRdWVyeToge1xyXG4gICAgICAgIGFzeW5jIGhhcmRzY2FwZShyb290LCBhcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBIYXJkc2NhcGVQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5IQVJEU0NBUEVfUFJPVklERVIpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5nZXRIYXJkc2NhcGUoKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb246IHtcclxuICAgICAgICBhc3luYyBhZGRIYXJkc2NhcGUocm9vdCwgYXJncywgY29udGV4dCkge1xyXG4gICAgICAgICAgICBsZXQgaGFyZHNjYXBlOiBIYXJkc2NhcGUgfCBudWxsID0gbnVsbFxyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogSGFyZHNjYXBlUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuSEFSRFNDQVBFX1BST1ZJREVSKVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3MuaGFyZHNjYXBlSWQpIHtcclxuICAgICAgICAgICAgICAgIGhhcmRzY2FwZSA9IGF3YWl0IHByb3ZpZGVyLmZpbmRIYXJkc2NhcGVCeUlkKGFyZ3MuaGFyZHNjYXBlSWQpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJncy5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBoYXJkc2NhcGUgPSBhd2FpdCBwcm92aWRlci5hZGRIYXJkc2NhcGUoYXJncy5uYW1lKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhhcmRzY2FwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVzZXJJbnB1dEVycm9yKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgaGFyZHNjYXBlIElEIG9yIGEgaGFyZHNjYXBlIG5hbWUgdGhhdCB3aWxsIGJlIGNyZWF0ZWQnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhd2FpdCBwcm92aWRlci5hZGRIYXJkc2NhcGVGb3JBcXVhc2NhcGUoaGFyZHNjYXBlLmlkLCBhcmdzLmFxdWFzY2FwZUlkKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhhcmRzY2FwZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgcmVtb3ZlSGFyZHNjYXBlKHJvb3QsIGFyZ3MsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IEhhcmRzY2FwZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkhBUkRTQ0FQRV9QUk9WSURFUilcclxuICAgICAgICAgICAgY29uc3QgaGFyZHNjYXBlID0gYXdhaXQgcHJvdmlkZXIuZmluZEhhcmRzY2FwZUJ5SWQoYXJncy5oYXJkc2NhcGVJZClcclxuXHJcbiAgICAgICAgICAgIGlmICghaGFyZHNjYXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVXNlcklucHV0RXJyb3IoJ0hhcmRzY2FwZSBub3QgZm91bmQnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhd2FpdCBwcm92aWRlci5yZW1vdmVIYXJkc2NhcGVGb3JBcXVhc2NhcGUoaGFyZHNjYXBlLmlkLCBhcmdzLmFxdWFzY2FwZUlkKVxyXG5cclxuICAgICAgICAgICAgaWYgKCFoYXJkc2NhcGUucHJlZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgcHJvdmlkZXIucmVtb3ZlSGFyZHNjYXBlKGhhcmRzY2FwZS5pZClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhhcmRzY2FwZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVyc0NvbXBvc2l0aW9uID0ge1xyXG4gICAgJ011dGF0aW9uLmFkZEhhcmRzY2FwZSc6IFthdXRoZW50aWNhdGUsIGF1dGhvcml6ZUFxdWFzY2FwZVVwZGF0ZV0sXHJcbiAgICAnTXV0YXRpb24ucmVtb3ZlSGFyZHNjYXBlJzogW2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlXSxcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidHlwZSBIYXJkc2NhcGUge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBuYW1lOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgaGFyZHNjYXBlOiBbSGFyZHNjYXBlIV0hXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgYWRkSGFyZHNjYXBlKGhhcmRzY2FwZUlkOiBJbnQsIG5hbWU6IFN0cmluZywgYXF1YXNjYXBlSWQ6IEludCEpOiBIYXJkc2NhcGUhXFxuICByZW1vdmVIYXJkc2NhcGUoaGFyZHNjYXBlSWQ6IEludCEsIGFxdWFzY2FwZUlkOiBJbnQhKTogSGFyZHNjYXBlXFxufVxcblwiIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5pbXBvcnQge0xpZ2h0UmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0xpZ2h0J1xyXG5pbXBvcnQge0xpZ2h0fSBmcm9tICdkYi9tb2RlbHMvTGlnaHQnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpZ2h0UHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgZ2V0TGlnaHRzOiAoKSA9PiBQcm9taXNlPExpZ2h0W10+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExpZ2h0UHJvdmlkZXIgaW1wbGVtZW50cyBMaWdodFByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkxJR0hUX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBsaWdodFJlcG9zaXRvcnk6IExpZ2h0UmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGFzeW5jIGdldExpZ2h0cygpIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5saWdodFJlcG9zaXRvcnkuZmluZEFsbCgpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtHcmFwaFFMTW9kdWxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge0xpZ2h0UmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0xpZ2h0J1xyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnLi9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHtMaWdodFByb3ZpZGVyfSBmcm9tICcuL0xpZ2h0UHJvdmlkZXInXHJcbmltcG9ydCB7cmVzb2x2ZXJzfSBmcm9tICcuL3Jlc29sdmVycydcclxuXHJcbmV4cG9ydCBjb25zdCBMaWdodE1vZHVsZSA9IG5ldyBHcmFwaFFMTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuTElHSFRfUFJPVklERVIsIHVzZUNsYXNzOiBMaWdodFByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkxJR0hUX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBMaWdodFJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG59KVxyXG4iLCJpbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcblxyXG5pbXBvcnQge0xpZ2h0UHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJy4vTGlnaHRQcm92aWRlcidcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XHJcbiAgICBRdWVyeToge1xyXG4gICAgICAgIGFzeW5jIGxpZ2h0cyhyb290LCBhcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBMaWdodFByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkxJR0hUX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZ2V0TGlnaHRzKClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidHlwZSBMaWdodCBpbXBsZW1lbnRzIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICB3aWR0aDogRmxvYXRcXG4gIGhlaWdodDogRmxvYXRcXG4gIGRlcHRoOiBGbG9hdFxcbiAgcG93ZXI6IEZsb2F0XFxuICBsdW1lbk1pbjogSW50XFxuICBsdW1lbk1heDogSW50XFxuICBrZWx2aW5NaW46IEludFxcbiAga2VsdmluTWF4OiBJbnRcXG4gIGRpbW1hYmxlOiBCb29sZWFuXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgbGlnaHRzOiBbTGlnaHQhXSFcXG59XFxuXFxudHlwZSBNdXRhdGlvbiB7XFxuICBhZGRMaWdodChicmFuZDogU3RyaW5nISwgbW9kZWw6IFN0cmluZyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogTGlnaHQhXFxuICByZW1vdmVMaWdodChsaWdodElkOiBJbnQhLCBhcXVhc2NhcGVJZDogSW50ISk6IExpZ2h0XFxufVxcblxcbmludGVyZmFjZSBFcXVpcG1lbnQge1xcbiAgaWQ6IEludCFcXG4gIHByZWRlZmluZWQ6IEJvb2xlYW4hXFxuICBtb2RlbDogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG5lbnVtIEVxdWlwbWVudFR5cGUge1xcbiAgRklMVEVSXFxuICBTVUJTVFJBVEVcXG4gIExJR0hUXFxuICBBRERJVElWRVNcXG59XFxuXFxuaW5wdXQgRXF1aXBtZW50QXJncyB7XFxuICBlcXVpcG1lbnRUeXBlOiBFcXVpcG1lbnRUeXBlIVxcbiAgZXF1aXBtZW50SWQ6IEludFxcbiAgbmFtZTogU3RyaW5nXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgYWRkRXF1aXBtZW50KGVxdWlwbWVudDogRXF1aXBtZW50QXJncyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogRXF1aXBtZW50IVxcbiAgcmVtb3ZlRXF1aXBtZW50KGVxdWlwbWVudDogRXF1aXBtZW50QXJncyEsIGFxdWFzY2FwZUlkOiBJbnQhKTogRXF1aXBtZW50XFxufVxcblwiIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIFByb3ZpZGVyU2NvcGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7TGlrZVJlcG9zaXRvcnlJbnRlcmZhY2UsIExpa2VFbnRpdHlUeXBlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvTGlrZSdcclxuaW1wb3J0IHtMaWtlfSBmcm9tICdkYi9tb2RlbHMvTGlrZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGlrZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGxpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIpOiBCbHVlYmlyZDxMaWtlPlxyXG4gICAgZGlzbGlrZShlbnRpdHk6IExpa2VFbnRpdHlUeXBlLCBlbnRpdHlJZDogbnVtYmVyLCB1c2VySWQ6IG51bWJlcik6IEJsdWViaXJkPExpa2U+XHJcbiAgICBjb3VudExpa2VzKGVudGl0eTogTGlrZUVudGl0eVR5cGUsIGVudGl0eUlkOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj5cclxuICAgIGlzTGlrZWRCeSh1c2VySWQ6IG51bWJlciwgZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj5cclxufVxyXG5cclxuQEluamVjdGFibGUoe3Njb3BlOiBQcm92aWRlclNjb3BlLlNlc3Npb259KVxyXG5leHBvcnQgY2xhc3MgTGlrZVByb3ZpZGVyIGltcGxlbWVudHMgTGlrZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkxJS0VfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGxpa2VSZXBvc2l0b3J5OiBMaWtlUmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGxpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saWtlUmVwb3NpdG9yeS5saWtlKGVudGl0eSwgZW50aXR5SWQsIHVzZXJJZClcclxuICAgIH1cclxuXHJcbiAgICBkaXNsaWtlKGVudGl0eTogTGlrZUVudGl0eVR5cGUsIGVudGl0eUlkOiBudW1iZXIsIHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlrZVJlcG9zaXRvcnkuZGlzbGlrZShlbnRpdHksIGVudGl0eUlkLCB1c2VySWQpXHJcbiAgICB9XHJcblxyXG4gICAgY291bnRMaWtlcyhlbnRpdHk6IExpa2VFbnRpdHlUeXBlLCBlbnRpdHlJZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpa2VSZXBvc2l0b3J5LmNvdW50TGlrZXMoZW50aXR5LCBlbnRpdHlJZClcclxuICAgIH1cclxuXHJcbiAgICBpc0xpa2VkQnkodXNlcklkOiBudW1iZXIsIGVudGl0eTogTGlrZUVudGl0eVR5cGUsIGVudGl0eUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saWtlUmVwb3NpdG9yeS5pc0xpa2VkQnkodXNlcklkLCBlbnRpdHksIGVudGl0eUlkKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7R3JhcGhRTE1vZHVsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuXHJcbmltcG9ydCB7cmVzb2x2ZXJzLCByZXNvbHZlcnNDb21wb3NpdGlvbn0gZnJvbSAnLi9yZXNvbHZlcnMnXHJcbmltcG9ydCAqIGFzIHR5cGVEZWZzIGZyb20gJy4vc2NoZW1hLmdyYXBocWwnXHJcbmltcG9ydCB7TGlrZVByb3ZpZGVyfSBmcm9tICdhcGkvbW9kdWxlcy9MaWtlL0xpa2VQcm92aWRlcidcclxuaW1wb3J0IHtMaWtlUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0xpa2UnXHJcbmltcG9ydCB7YXR0YWNoQ3VycmVudFVzZXJJZCwgY29tcG9zZUNvbnRleHR9IGZyb20gJ2FwaS9jb250ZXh0J1xyXG5cclxuZXhwb3J0IGNvbnN0IExpa2VNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkxJS0VfUFJPVklERVIsIHVzZUNsYXNzOiBMaWtlUHJvdmlkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuTElLRV9SRVBPU0lUT1JZLCB1c2VDbGFzczogTGlrZVJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG4gICAgcmVzb2x2ZXJzQ29tcG9zaXRpb24sXHJcbiAgICBjb250ZXh0OiBjb21wb3NlQ29udGV4dChbYXR0YWNoQ3VycmVudFVzZXJJZF0pXHJcbn0pXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHthdXRoZW50aWNhdGV9IGZyb20gJ2FwaS9ndWFyZHMnXHJcbmltcG9ydCB7TGlrZVByb3ZpZGVySW50ZXJmYWNlfSBmcm9tICdhcGkvbW9kdWxlcy9MaWtlL0xpa2VQcm92aWRlcidcclxuaW1wb3J0IHtMaWtlRW50aXR5VHlwZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0xpa2UnXHJcbmltcG9ydCB7QXV0aGVudGljYXRpb25Db250ZXh0fSBmcm9tICdhcGkvY29udGV4dCdcclxuaW1wb3J0IHtBcXVhc2NhcGV9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGUnXHJcblxyXG5leHBvcnQgdHlwZSBMaWtlQXJncyA9IHtcclxuICAgIGVudGl0eUlkOiBudW1iZXJcclxuICAgIGVudGl0eTogTGlrZUVudGl0eVR5cGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIEFxdWFzY2FwZToge1xyXG4gICAgICAgIGFzeW5jIGxpa2VzQ291bnQoYXF1YXNjYXBlOiBBcXVhc2NhcGUsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IExpa2VQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5MSUtFX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuY291bnRMaWtlcyhcclxuICAgICAgICAgICAgICAgIExpa2VFbnRpdHlUeXBlLkFRVUFTQ0FQRSxcclxuICAgICAgICAgICAgICAgIGFxdWFzY2FwZS5pZFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBpc0xpa2VkQnlNZShcclxuICAgICAgICAgICAgYXF1YXNjYXBlOiBBcXVhc2NhcGUsXHJcbiAgICAgICAgICAgIGFyZ3MsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQgJiBBdXRoZW50aWNhdGlvbkNvbnRleHRcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgaWYgKCFjb250ZXh0LmN1cnJlbnRVc2VySWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogTGlrZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkxJS0VfUFJPVklERVIpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5pc0xpa2VkQnkoXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmN1cnJlbnRVc2VySWQsXHJcbiAgICAgICAgICAgICAgICBMaWtlRW50aXR5VHlwZS5BUVVBU0NBUEUsXHJcbiAgICAgICAgICAgICAgICBhcXVhc2NhcGUuaWRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb246IHtcclxuICAgICAgICBhc3luYyBsaWtlKHJvb3QsIGFyZ3M6IExpa2VBcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0ICYgQXV0aGVudGljYXRpb25Db250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBMaWtlUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuTElLRV9QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmxpa2UoXHJcbiAgICAgICAgICAgICAgICBhcmdzLmVudGl0eSxcclxuICAgICAgICAgICAgICAgIGFyZ3MuZW50aXR5SWQsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmN1cnJlbnRVc2VySWRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgZGlzbGlrZShyb290LCBhcmdzOiBMaWtlQXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCAmIEF1dGhlbnRpY2F0aW9uQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogTGlrZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkxJS0VfUFJPVklERVIpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5kaXNsaWtlKFxyXG4gICAgICAgICAgICAgICAgYXJncy5lbnRpdHksXHJcbiAgICAgICAgICAgICAgICBhcmdzLmVudGl0eUlkLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VXNlcklkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVyc0NvbXBvc2l0aW9uID0ge1xyXG4gICAgJ011dGF0aW9uLmxpa2UnOiBbYXV0aGVudGljYXRlXSxcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidHlwZSBMaWtlIHtcXG4gIGlkOiBJbnQhXFxuICB1c2VySWQ6IEludCFcXG4gIGFxdWFzY2FwZUltYWdlSWQ6IEludFxcbiAgYXF1YXNjYXBlSWQ6IEludFxcbiAgY29tbWVudElkOiBJbnRcXG59XFxuXFxudHlwZSBBcXVhc2NhcGUge1xcbiAgbGlrZXNDb3VudDogSW50IVxcbiAgaXNMaWtlZEJ5TWU6IEJvb2xlYW4hXFxufVxcblxcbmVudW0gTGlrZUVudGl0eVR5cGUge1xcbiAgQVFVQVNDQVBFXFxuICBJTUFHRVxcbiAgQ09NTUVOVFxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGxpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSEsIGVudGl0eUlkOiBJbnQhKTogTGlrZVxcbiAgZGlzbGlrZShlbnRpdHk6IExpa2VFbnRpdHlUeXBlISwgZW50aXR5SWQ6IEludCEpOiBMaWtlXFxufVxcblwiIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtMaXZlc3RvY2tSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvTGl2ZXN0b2NrJ1xyXG5pbXBvcnQge0xpdmVzdG9ja30gZnJvbSAnZGIvbW9kZWxzL0xpdmVzdG9jaydcclxuaW1wb3J0IHtBcXVhc2NhcGVMaXZlc3RvY2t9IGZyb20gJ2RiL21vZGVscydcclxuaW1wb3J0IHtBcXVhc2NhcGVMaXZlc3RvY2tSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlTGl2ZXN0b2NrJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaXZlc3RvY2tQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBnZXRMaXZlc3RvY2soKTogQmx1ZWJpcmQ8TGl2ZXN0b2NrW10+XHJcbiAgICBhZGRMaXZlc3RvY2sobmFtZTogc3RyaW5nKTogQmx1ZWJpcmQ8TGl2ZXN0b2NrPlxyXG4gICAgYWRkTGl2ZXN0b2NrRm9yQXF1YXNjYXBlKGxpdmVzdG9ja0lkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBCbHVlYmlyZDxBcXVhc2NhcGVMaXZlc3RvY2s+XHJcbiAgICByZW1vdmVMaXZlc3RvY2soaWQ6IG51bWJlcik6IEJsdWViaXJkPG51bWJlcj5cclxuICAgIHJlbW92ZUxpdmVzdG9ja0ZvckFxdWFzY2FwZShsaXZlc3RvY2tJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKTogQmx1ZWJpcmQ8bnVtYmVyPlxyXG4gICAgZmluZExpdmVzdG9ja0J5SWQoaWQ6IG51bWJlcik6IEJsdWViaXJkPExpdmVzdG9jayB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExpdmVzdG9ja1Byb3ZpZGVyIGltcGxlbWVudHMgTGl2ZXN0b2NrUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuTElWRVNUT0NLX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBsaXZlc3RvY2tSZXBvc2l0b3J5OiBMaXZlc3RvY2tSZXBvc2l0b3J5SW50ZXJmYWNlLFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkFRVUFTQ0FQRV9MSVZFU1RPQ0tfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIGFxdWFzY2FwZUxpdmVzdG9ja1JlcG9zaXRvcnk6IEFxdWFzY2FwZUxpdmVzdG9ja1JlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgICkge31cclxuXHJcbiAgICBnZXRMaXZlc3RvY2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGl2ZXN0b2NrUmVwb3NpdG9yeS5nZXRMaXZlc3RvY2soKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZExpdmVzdG9jayhuYW1lOiBzdHJpbmcpOiBCbHVlYmlyZDxMaXZlc3RvY2s+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXZlc3RvY2tSZXBvc2l0b3J5LmNyZWF0ZSh7bmFtZX0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkTGl2ZXN0b2NrRm9yQXF1YXNjYXBlKGxpdmVzdG9ja0lkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBCbHVlYmlyZDxBcXVhc2NhcGVMaXZlc3RvY2s+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcXVhc2NhcGVMaXZlc3RvY2tSZXBvc2l0b3J5LmFkZExpdmVzdG9ja0ZvckFxdWFzY2FwZShsaXZlc3RvY2tJZCwgYXF1YXNjYXBlSWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTGl2ZXN0b2NrKGlkOiBudW1iZXIpOiBCbHVlYmlyZDxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXZlc3RvY2tSZXBvc2l0b3J5LmRlc3Ryb3koe3doZXJlOiB7aWR9fSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVMaXZlc3RvY2tGb3JBcXVhc2NhcGUobGl2ZXN0b2NrSWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcik6IEJsdWViaXJkPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFxdWFzY2FwZUxpdmVzdG9ja1JlcG9zaXRvcnkuZGVzdHJveSh7d2hlcmU6IHtsaXZlc3RvY2tJZCwgYXF1YXNjYXBlSWR9fSlcclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGl2ZXN0b2NrQnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGl2ZXN0b2NrUmVwb3NpdG9yeS5maW5kTGl2ZXN0b2NrQnlJZChpZClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcblxyXG5pbXBvcnQgKiBhcyB0eXBlRGVmcyBmcm9tICcuL3NjaGVtYS5ncmFwaHFsJ1xyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQge0xpdmVzdG9ja1Byb3ZpZGVyfSBmcm9tICdhcGkvbW9kdWxlcy9MaXZlc3RvY2svTGl2ZXN0b2NrUHJvdmlkZXInXHJcbmltcG9ydCB7TGl2ZXN0b2NrUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0xpdmVzdG9jaydcclxuaW1wb3J0IHtBcXVhc2NhcGVMaXZlc3RvY2tSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlTGl2ZXN0b2NrJ1xyXG5pbXBvcnQge2NvbXBvc2VDb250ZXh0LCBhdHRhY2hDdXJyZW50VXNlcklkfSBmcm9tICdhcGkvY29udGV4dCdcclxuaW1wb3J0IHtBcXVhc2NhcGVSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IExpdmVzdG9ja01vZHVsZSA9IG5ldyBHcmFwaFFMTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQVFVQVNDQVBFX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBBcXVhc2NhcGVSZXBvc2l0b3J5fSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkxJVkVTVE9DS19QUk9WSURFUiwgdXNlQ2xhc3M6IExpdmVzdG9ja1Byb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkxJVkVTVE9DS19SRVBPU0lUT1JZLCB1c2VDbGFzczogTGl2ZXN0b2NrUmVwb3NpdG9yeX0sXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BUVVBU0NBUEVfTElWRVNUT0NLX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBBcXVhc2NhcGVMaXZlc3RvY2tSZXBvc2l0b3J5fSxcclxuICAgIF0sXHJcbiAgICB0eXBlRGVmcyxcclxuICAgIHJlc29sdmVycyxcclxuICAgIHJlc29sdmVyc0NvbXBvc2l0aW9uLFxyXG4gICAgY29udGV4dDogY29tcG9zZUNvbnRleHQoW2F0dGFjaEN1cnJlbnRVc2VySWRdKSxcclxufSlcclxuIiwiaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcbmltcG9ydCB7VXNlcklucHV0RXJyb3J9IGZyb20gJ2Fwb2xsby1zZXJ2ZXInXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5pbXBvcnQge0xpdmVzdG9ja1Byb3ZpZGVySW50ZXJmYWNlfSBmcm9tICcuL0xpdmVzdG9ja1Byb3ZpZGVyJ1xyXG5pbXBvcnQge2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlfSBmcm9tICdhcGkvZ3VhcmRzJ1xyXG5pbXBvcnQge0xpdmVzdG9ja30gZnJvbSAnZGIvbW9kZWxzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgYXN5bmMgbGl2ZXN0b2NrKHJvb3QsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IExpdmVzdG9ja1Byb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLkxJVkVTVE9DS19QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmdldExpdmVzdG9jaygpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBNdXRhdGlvbjoge1xyXG4gICAgICAgIGFzeW5jIGFkZExpdmVzdG9jayhyb290LCBhcmdzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBsaXZlc3RvY2s6IExpdmVzdG9jayB8IG51bGwgPSBudWxsXHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBMaXZlc3RvY2tQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5MSVZFU1RPQ0tfUFJPVklERVIpXHJcblxyXG4gICAgICAgICAgICBpZiAoYXJncy5saXZlc3RvY2tJZCkge1xyXG4gICAgICAgICAgICAgICAgbGl2ZXN0b2NrID0gYXdhaXQgcHJvdmlkZXIuZmluZExpdmVzdG9ja0J5SWQoYXJncy5saXZlc3RvY2tJZClcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmdzLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxpdmVzdG9jayA9IGF3YWl0IHByb3ZpZGVyLmFkZExpdmVzdG9jayhhcmdzLm5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghbGl2ZXN0b2NrKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVXNlcklucHV0RXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBsaXZlc3RvY2sgSUQgb3IgYSBsaXZlc3RvY2sgbmFtZSB0aGF0IHdpbGwgYmUgY3JlYXRlZCcpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVyLmFkZExpdmVzdG9ja0ZvckFxdWFzY2FwZShsaXZlc3RvY2suaWQsIGFyZ3MuYXF1YXNjYXBlSWQpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbGl2ZXN0b2NrXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyByZW1vdmVMaXZlc3RvY2socm9vdCwgYXJncywgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogTGl2ZXN0b2NrUHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuTElWRVNUT0NLX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBjb25zdCBsaXZlc3RvY2sgPSBhd2FpdCBwcm92aWRlci5maW5kTGl2ZXN0b2NrQnlJZChhcmdzLmxpdmVzdG9ja0lkKVxyXG5cclxuICAgICAgICAgICAgaWYgKCFsaXZlc3RvY2spIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignTGl2ZXN0b2NrIG5vdCBmb3VuZCcpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVyLnJlbW92ZUxpdmVzdG9ja0ZvckFxdWFzY2FwZShsaXZlc3RvY2suaWQsIGFyZ3MuYXF1YXNjYXBlSWQpXHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpdmVzdG9jay5wcmVkZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBwcm92aWRlci5yZW1vdmVMaXZlc3RvY2sobGl2ZXN0b2NrLmlkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbGl2ZXN0b2NrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzQ29tcG9zaXRpb24gPSB7XHJcbiAgICAnTXV0YXRpb24uYWRkTGl2ZXN0b2NrJzogW2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlXSxcclxuICAgICdNdXRhdGlvbi5yZW1vdmVMaXZlc3RvY2snOiBbYXV0aGVudGljYXRlLCBhdXRob3JpemVBcXVhc2NhcGVVcGRhdGVdLFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIExpdmVzdG9jayB7XFxuICBpZDogSW50IVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbn1cXG5cXG50eXBlIFF1ZXJ5IHtcXG4gIGxpdmVzdG9jazogW0xpdmVzdG9jayFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZExpdmVzdG9jayhsaXZlc3RvY2tJZDogSW50LCBuYW1lOiBTdHJpbmcsIGFxdWFzY2FwZUlkOiBJbnQhKTogTGl2ZXN0b2NrIVxcbiAgcmVtb3ZlTGl2ZXN0b2NrKGxpdmVzdG9ja0lkOiBJbnQhLCBhcXVhc2NhcGVJZDogSW50ISk6IExpdmVzdG9ja1xcbn1cXG5cIiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7UGxhbnRSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvUGxhbnQnXHJcbmltcG9ydCB7UGxhbnR9IGZyb20gJ2RiL21vZGVscy9QbGFudCdcclxuaW1wb3J0IHtBcXVhc2NhcGVQbGFudH0gZnJvbSAnZGIvbW9kZWxzL21hbnlUb01hbnkvQXF1YXNjYXBlUGxhbnQnXHJcbmltcG9ydCB7QXF1YXNjYXBlUGxhbnRSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlUGxhbnQnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBsYW50UHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgZ2V0UGxhbnRzKCk6IEJsdWViaXJkPFBsYW50W10+XHJcbiAgICBhZGRQbGFudChuYW1lOiBzdHJpbmcpOiBCbHVlYmlyZDxQbGFudD5cclxuICAgIGFkZFBsYW50Rm9yQXF1YXNjYXBlKHBsYW50SWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcik6IEJsdWViaXJkPEFxdWFzY2FwZVBsYW50PlxyXG4gICAgcmVtb3ZlUGxhbnQoaWQ6IG51bWJlcik6IEJsdWViaXJkPG51bWJlcj5cclxuICAgIHJlbW92ZVBsYW50Rm9yQXF1YXNjYXBlKHBsYW50SWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcik6IEJsdWViaXJkPG51bWJlcj5cclxuICAgIGZpbmRQbGFudEJ5SWQoaWQ6IG51bWJlcik6IEJsdWViaXJkPFBsYW50IHwgbnVsbD5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGxhbnRQcm92aWRlciBpbXBsZW1lbnRzIFBsYW50UHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuUExBTlRfUkVQT1NJVE9SWSlcclxuICAgICAgICBwcml2YXRlIHBsYW50UmVwb3NpdG9yeTogUGxhbnRSZXBvc2l0b3J5SW50ZXJmYWNlLFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLkFRVUFTQ0FQRV9QTEFOVF9SRVBPU0lUT1JZKVxyXG4gICAgICAgIHByaXZhdGUgYXF1YWNhcGVQbGFudFJlcG9zaXRvcnk6IEFxdWFzY2FwZVBsYW50UmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGdldFBsYW50cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGFudFJlcG9zaXRvcnkuZ2V0UGxhbnRzKClcclxuICAgIH1cclxuXHJcbiAgICBhZGRQbGFudChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGFudFJlcG9zaXRvcnkuY3JlYXRlKHtuYW1lfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRQbGFudEZvckFxdWFzY2FwZShwbGFudElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcXVhY2FwZVBsYW50UmVwb3NpdG9yeS5hZGRQbGFudEZvckFxdWFzY2FwZShwbGFudElkLCBhcXVhc2NhcGVJZClcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQbGFudChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhbnRSZXBvc2l0b3J5LmRlc3Ryb3koe3doZXJlOiB7aWR9fSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQbGFudEZvckFxdWFzY2FwZShwbGFudElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcXVhY2FwZVBsYW50UmVwb3NpdG9yeS5kZXN0cm95KHt3aGVyZToge3BsYW50SWQsIGFxdWFzY2FwZUlkfX0pXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFBsYW50QnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhbnRSZXBvc2l0b3J5LmZpbmRQbGFudEJ5SWQoaWQpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtHcmFwaFFMTW9kdWxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5cclxuaW1wb3J0ICogYXMgdHlwZURlZnMgZnJvbSAnLi9zY2hlbWEuZ3JhcGhxbCdcclxuaW1wb3J0IHtyZXNvbHZlcnMsIHJlc29sdmVyc0NvbXBvc2l0aW9ufSBmcm9tICcuL3Jlc29sdmVycydcclxuaW1wb3J0IHtQbGFudFByb3ZpZGVyfSBmcm9tICdhcGkvbW9kdWxlcy9QbGFudC9QbGFudFByb3ZpZGVyJ1xyXG5pbXBvcnQge1BsYW50UmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL1BsYW50J1xyXG5pbXBvcnQge0FxdWFzY2FwZVBsYW50UmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0FxdWFzY2FwZVBsYW50J1xyXG5pbXBvcnQge2F0dGFjaEN1cnJlbnRVc2VySWQsIGNvbXBvc2VDb250ZXh0fSBmcm9tICdhcGkvY29udGV4dCdcclxuaW1wb3J0IHtBcXVhc2NhcGVSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQXF1YXNjYXBlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFBsYW50TW9kdWxlID0gbmV3IEdyYXBoUUxNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge3Byb3ZpZGU6IHRva2Vucy5BUVVBU0NBUEVfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IEFxdWFzY2FwZVJlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuUExBTlRfUFJPVklERVIsIHVzZUNsYXNzOiBQbGFudFByb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlBMQU5UX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBQbGFudFJlcG9zaXRvcnl9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuQVFVQVNDQVBFX1BMQU5UX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBBcXVhc2NhcGVQbGFudFJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG4gICAgcmVzb2x2ZXJzQ29tcG9zaXRpb24sXHJcbiAgICBjb250ZXh0OiBjb21wb3NlQ29udGV4dChbYXR0YWNoQ3VycmVudFVzZXJJZF0pLFxyXG59KVxyXG4iLCJpbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7UGxhbnRQcm92aWRlckludGVyZmFjZX0gZnJvbSAnLi9QbGFudFByb3ZpZGVyJ1xyXG5pbXBvcnQge2F1dGhlbnRpY2F0ZSwgYXV0aG9yaXplQXF1YXNjYXBlVXBkYXRlfSBmcm9tICdhcGkvZ3VhcmRzJ1xyXG5pbXBvcnQge011dGF0aW9uQWRkUGxhbnRBcmdzLCBNdXRhdGlvblJlbW92ZVBsYW50QXJnc30gZnJvbSAnYXBpL2dlbmVyYXRlZC90eXBlcydcclxuaW1wb3J0IHtVc2VySW5wdXRFcnJvcn0gZnJvbSAnYXBvbGxvLXNlcnZlcidcclxuaW1wb3J0IHtQbGFudH0gZnJvbSAnZGIvbW9kZWxzL1BsYW50J1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIFF1ZXJ5OiB7XHJcbiAgICAgICAgYXN5bmMgcGxhbnRzKHJvb3QsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IFBsYW50UHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuUExBTlRfUFJPVklERVIpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5nZXRQbGFudHMoKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb246IHtcclxuICAgICAgICBhc3luYyBhZGRQbGFudChyb290LCBhcmdzOiBNdXRhdGlvbkFkZFBsYW50QXJncywgY29udGV4dCkge1xyXG4gICAgICAgICAgICBsZXQgcGxhbnQ6IFBsYW50IHwgbnVsbCA9IG51bGxcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IFBsYW50UHJvdmlkZXJJbnRlcmZhY2UgPSBjb250ZXh0LmluamVjdG9yLmdldCh0b2tlbnMuUExBTlRfUFJPVklERVIpXHJcblxyXG4gICAgICAgICAgICBpZiAoYXJncy5wbGFudElkKSB7XHJcbiAgICAgICAgICAgICAgICBwbGFudCA9IGF3YWl0IHByb3ZpZGVyLmZpbmRQbGFudEJ5SWQoYXJncy5wbGFudElkKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcGxhbnQgPSBhd2FpdCBwcm92aWRlci5hZGRQbGFudChhcmdzLm5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghcGxhbnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignWW91IG5lZWQgdG8gcHJvdmlkZSBhIHBsYW50IElEIG9yIGEgcGxhbnQgbmFtZSB0aGF0IHdpbGwgYmUgY3JlYXRlZCcpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVyLmFkZFBsYW50Rm9yQXF1YXNjYXBlKHBsYW50LmlkLCBhcmdzLmFxdWFzY2FwZUlkKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyByZW1vdmVQbGFudChyb290LCBhcmdzOiBNdXRhdGlvblJlbW92ZVBsYW50QXJncywgY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogUGxhbnRQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5QTEFOVF9QUk9WSURFUilcclxuICAgICAgICAgICAgY29uc3QgcGxhbnQgPSBhd2FpdCBwcm92aWRlci5maW5kUGxhbnRCeUlkKGFyZ3MucGxhbnRJZClcclxuXHJcbiAgICAgICAgICAgIGlmICghcGxhbnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignUGxhbnQgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXdhaXQgcHJvdmlkZXIucmVtb3ZlUGxhbnRGb3JBcXVhc2NhcGUocGxhbnQuaWQsIGFyZ3MuYXF1YXNjYXBlSWQpXHJcblxyXG4gICAgICAgICAgICBpZiAoIXBsYW50LnByZWRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHByb3ZpZGVyLnJlbW92ZVBsYW50KHBsYW50LmlkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxhbnRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnNDb21wb3NpdGlvbiA9IHtcclxuICAgICdNdXRhdGlvbi5hZGRQbGFudCc6IFthdXRoZW50aWNhdGUsIGF1dGhvcml6ZUFxdWFzY2FwZVVwZGF0ZV0sXHJcbiAgICAnTXV0YXRpb24ucmVtb3ZlUGxhbnQnOiBbYXV0aGVudGljYXRlLCBhdXRob3JpemVBcXVhc2NhcGVVcGRhdGVdLFxyXG59XHJcblxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwidHlwZSBQbGFudCB7XFxuICBpZDogSW50IVxcbiAgbmFtZTogU3RyaW5nIVxcbiAgZGVzY3JpcHRpb246IFN0cmluZ1xcbiAgaW1hZ2U6IFN0cmluZ1xcbiAgb3JpZ2luOiBTdHJpbmdcXG4gIG1pbkhlaWdodDogSW50XFxuICBtYXhIZWlnaHQ6IEludFxcbiAgcG9zaXRpb246IFN0cmluZ1xcbiAgbHVtaW5vc2l0eTogU3RyaW5nXFxuICBncm93dGhTcGVlZDogU3RyaW5nXFxuICBkaWZmaWN1bHR5OiBTdHJpbmdcXG59XFxuXFxudHlwZSBRdWVyeSB7XFxuICBwbGFudHM6IFtQbGFudCFdIVxcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZFBsYW50KHBsYW50SWQ6IEludCwgbmFtZTogU3RyaW5nLCBhcXVhc2NhcGVJZDogSW50ISk6IFBsYW50IVxcbiAgcmVtb3ZlUGxhbnQocGxhbnRJZDogSW50ISwgYXF1YXNjYXBlSWQ6IEludCEpOiBQbGFudFxcbn1cXG5cIiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7U3Vic3RyYXRlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL1N1YnN0cmF0ZSdcclxuaW1wb3J0IHtTdWJzdHJhdGV9IGZyb20gJ2RiL21vZGVscy9TdWJzdHJhdGUnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN1YnN0cmF0ZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGdldFN1YnN0cmF0ZXM6ICgpID0+IEJsdWViaXJkPFN1YnN0cmF0ZVtdPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdWJzdHJhdGVQcm92aWRlciBpbXBsZW1lbnRzIFN1YnN0cmF0ZVByb3ZpZGVySW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QodG9rZW5zLlNVQlNUUkFURV9SRVBPU0lUT1JZKVxyXG4gICAgICAgIHByaXZhdGUgc3Vic3RyYXRlUmVwb3NpdG9yeTogU3Vic3RyYXRlUmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGdldFN1YnN0cmF0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic3RyYXRlUmVwb3NpdG9yeS5nZXRTdWJzdHJhdGVzKClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcblxyXG5pbXBvcnQgKiBhcyB0eXBlRGVmcyBmcm9tICcuL3NjaGVtYS5ncmFwaHFsJ1xyXG5pbXBvcnQge3Jlc29sdmVyc30gZnJvbSAnLi9yZXNvbHZlcnMnXHJcbmltcG9ydCB7U3Vic3RyYXRlUHJvdmlkZXJ9IGZyb20gJ2FwaS9tb2R1bGVzL1N1YnN0cmF0ZS9TdWJzdHJhdGVQcm92aWRlcidcclxuaW1wb3J0IHtTdWJzdHJhdGVSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvU3Vic3RyYXRlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFN1YnN0cmF0ZU1vZHVsZSA9IG5ldyBHcmFwaFFMTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuU1VCU1RSQVRFX1BST1ZJREVSLCB1c2VDbGFzczogU3Vic3RyYXRlUHJvdmlkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuU1VCU1RSQVRFX1JFUE9TSVRPUlksIHVzZUNsYXNzOiBTdWJzdHJhdGVSZXBvc2l0b3J5fSxcclxuICAgIF0sXHJcbiAgICB0eXBlRGVmcyxcclxuICAgIHJlc29sdmVyc1xyXG59KVxyXG4iLCJpbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7U3Vic3RyYXRlUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJy4vU3Vic3RyYXRlUHJvdmlkZXInXHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhc3luYyBzdWJzdHJhdGVzKHJvb3QsIGFyZ3MsIGNvbnRleHQ6IE1vZHVsZUNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IFN1YnN0cmF0ZVByb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLlNVQlNUUkFURV9QUk9WSURFUilcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLmdldFN1YnN0cmF0ZXMoKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIFN1YnN0cmF0ZSBpbXBsZW1lbnRzIEVxdWlwbWVudCB7XFxuICBpZDogSW50IVxcbiAgcHJlZGVmaW5lZDogQm9vbGVhbiFcXG4gIG1vZGVsOiBTdHJpbmchXFxuICBkZXNjcmlwdGlvbjogU3RyaW5nXFxuICBpbWFnZTogU3RyaW5nXFxufVxcblxcbnR5cGUgUXVlcnkge1xcbiAgc3Vic3RyYXRlczogW1N1YnN0cmF0ZSFdIVxcbn1cXG5cXG5pbnRlcmZhY2UgRXF1aXBtZW50IHtcXG4gIGlkOiBJbnQhXFxuICBwcmVkZWZpbmVkOiBCb29sZWFuIVxcbiAgbW9kZWw6IFN0cmluZyFcXG4gIGRlc2NyaXB0aW9uOiBTdHJpbmdcXG4gIGltYWdlOiBTdHJpbmdcXG59XFxuXFxuZW51bSBFcXVpcG1lbnRUeXBlIHtcXG4gIEZJTFRFUlxcbiAgU1VCU1RSQVRFXFxuICBMSUdIVFxcbiAgQURESVRJVkVTXFxufVxcblxcbmlucHV0IEVxdWlwbWVudEFyZ3Mge1xcbiAgZXF1aXBtZW50VHlwZTogRXF1aXBtZW50VHlwZSFcXG4gIGVxdWlwbWVudElkOiBJbnRcXG4gIG5hbWU6IFN0cmluZ1xcbn1cXG5cXG50eXBlIE11dGF0aW9uIHtcXG4gIGFkZEVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudCFcXG4gIHJlbW92ZUVxdWlwbWVudChlcXVpcG1lbnQ6IEVxdWlwbWVudEFyZ3MhLCBhcXVhc2NhcGVJZDogSW50ISk6IEVxdWlwbWVudFxcbn1cXG5cIiIsImltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuaW1wb3J0IHtGaWxlVXBsb2FkfSBmcm9tICdncmFwaHFsLXVwbG9hZCdcclxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIFByb3ZpZGVyU2NvcGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge3Rva2Vuc30gZnJvbSAnZGkvdG9rZW5zJ1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ2RiL21vZGVscy9Vc2VyJ1xyXG5pbXBvcnQge1VzZXJSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVXNlcidcclxuaW1wb3J0IHt1cGxvYWRTdHJlYW1GaWxlLCBkZWxldGVGaWxlLCBpbWFnZVVwbG9hZE9wdGlvbnN9IGZyb20gJ3NlcnZpY2VzL2Nsb3VkaW5hcnknXHJcbmltcG9ydCB7VXNlckRldGFpbHMsIEltYWdlVXBsb2FkUmVzdWx0fSBmcm9tICdpbnRlcmZhY2VzL2dyYXBocWwvdHlwZXMnXHJcbmltcG9ydCBsb2dnZXIgZnJvbSAnbG9nZ2VyJ1xyXG5pbXBvcnQge0VtYWlsQ29uZmlybWF0aW9uUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0VtYWlsQ29uZmlybWF0aW9uJ1xyXG5pbXBvcnQge0F1dGhIZWxwZXIsIEVtYWlsQ29uZmlybWF0aW9uUGF5bG9hZH0gZnJvbSAndXRpbHMvQXV0aEhlbHBlcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlcnNQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBnZXRBbGxVc2VyczogKCkgPT4gQmx1ZWJpcmQ8VXNlcltdPlxyXG4gICAgdXBsb2FkUHJvZmlsZUltYWdlOiAodXNlcklkOiBudW1iZXIsIGZpbGU6IFByb21pc2U8RmlsZVVwbG9hZD4pID0+IFByb21pc2U8SW1hZ2VVcGxvYWRSZXN1bHQ+XHJcbiAgICB1cGxvYWRDb3ZlckltYWdlOiAodXNlcklkOiBudW1iZXIsIGZpbGU6IFByb21pc2U8RmlsZVVwbG9hZD4pID0+IFByb21pc2U8SW1hZ2VVcGxvYWRSZXN1bHQ+XHJcbiAgICBmaW5kVXNlckJ5SWQ6IChpZDogbnVtYmVyKSA9PiBQcm9taXNlPFVzZXIgfCBudWxsPlxyXG4gICAgdXBkYXRlVXNlckRldGFpbHM6ICh1c2VySWQ6IG51bWJlciwgdXNlckRldGFpbHM6IFVzZXJEZXRhaWxzKSA9PiBQcm9taXNlPFtudW1iZXIsIFVzZXJbXV0+XHJcbiAgICBmaW5kVXNlckJ5U2x1ZzogKHNsdWc6IHN0cmluZykgPT4gUHJvbWlzZTxVc2VyIHwgbnVsbD5cclxuICAgIGNvbmZpcm1FbWFpbDogKHRva2VuOiBzdHJpbmcpID0+IFByb21pc2U8W2Jvb2xlYW4sIHN0cmluZz9dPlxyXG4gICAgZmluZFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFVzZXIgfCBudWxsPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7c2NvcGU6IFByb3ZpZGVyU2NvcGUuU2Vzc2lvbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2Vyc1Byb3ZpZGVyIGltcGxlbWVudHMgVXNlcnNQcm92aWRlckludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBASW5qZWN0KHRva2Vucy5VU0VSX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyUmVwb3NpdG9yeTogVXNlclJlcG9zaXRvcnlJbnRlcmZhY2UsXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuRU1BSUxfQ09ORklSTUFUSU9OX1JFUE9TSVRPUlkpXHJcbiAgICAgICAgcHJpdmF0ZSBlbWFpbENvbmZpcm1hdGlvblJlcG9zaXRvcnk6IEVtYWlsQ29uZmlybWF0aW9uUmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIGZpbmRVc2VyQnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclJlcG9zaXRvcnkuZmluZFVzZXJCeUlkKGlkKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRVc2VyQnlTbHVnKHNsdWc6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJSZXBvc2l0b3J5LmZpbmRVc2VyQnlTbHVnKHNsdWcpXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyUmVwb3NpdG9yeS5maW5kVXNlckJ5RW1haWwoZW1haWwpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsVXNlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclJlcG9zaXRvcnkuZmluZEFsbCgpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVXNlckRldGFpbHModXNlcklkOiBudW1iZXIsIHVzZXJEZXRhaWxzOiBVc2VyRGV0YWlscykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJSZXBvc2l0b3J5LnVwZGF0ZVVzZXJEZXRhaWxzKHVzZXJJZCwgdXNlckRldGFpbHMpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29uZmlybUVtYWlsKHRva2VuOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gQXV0aEhlbHBlci5kZWNvZGVKV1RUb2tlbjxFbWFpbENvbmZpcm1hdGlvblBheWxvYWQ+KHRva2VuKVxyXG5cclxuICAgICAgICBpZiAoIXBheWxvYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtmYWxzZSwgdW5kZWZpbmVkXSBhcyBbYm9vbGVhbiwgdW5kZWZpbmVkXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlybWVkID0gYXdhaXQgdGhpcy5lbWFpbENvbmZpcm1hdGlvblJlcG9zaXRvcnkuY29uZmlybUVtYWlsKFxyXG4gICAgICAgICAgICBwYXlsb2FkLmVtYWlsLFxyXG4gICAgICAgICAgICBwYXlsb2FkLmNvZGVcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGlmICghY29uZmlybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbZmFsc2UsIHVuZGVmaW5lZF0gYXMgW2Jvb2xlYW4sIHVuZGVmaW5lZF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnkudXBkYXRlKHtlbWFpbENvbmZpcm1lZDogdHJ1ZX0sIHt3aGVyZToge2VtYWlsOiBwYXlsb2FkLmVtYWlsfX0pXHJcblxyXG4gICAgICAgIHJldHVybiBbY29uZmlybWVkLCBwYXlsb2FkLmVtYWlsXSBhcyBbYm9vbGVhbiwgc3RyaW5nXVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwbG9hZFByb2ZpbGVJbWFnZSh1c2VySWQ6IG51bWJlciwgZmlsZTogUHJvbWlzZTxGaWxlVXBsb2FkPikge1xyXG4gICAgICAgIGNvbnN0IHtjcmVhdGVSZWFkU3RyZWFtfSA9IGF3YWl0IGZpbGVcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyUmVwb3NpdG9yeS5maW5kVXNlckJ5SWQodXNlcklkKVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwbG9hZFN0cmVhbUZpbGUoY3JlYXRlUmVhZFN0cmVhbSwgaW1hZ2VVcGxvYWRPcHRpb25zLnVzZXJQcm9maWxlSW1hZ2UpXHJcblxyXG4gICAgICAgIGlmICh1c2VyPy5wcm9maWxlSW1hZ2VQdWJsaWNJZCkge1xyXG4gICAgICAgICAgICBkZWxldGVGaWxlKHVzZXIucHJvZmlsZUltYWdlUHVibGljSWQpLmNhdGNoKGVycm9yID0+IGxvZ2dlci5lcnJvcihlcnJvcikpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LnVwZGF0ZVByb2ZpbGVJbWFnZSh1c2VySWQsIHJlc3VsdC5wdWJsaWNfaWQsIHJlc3VsdC5zZWN1cmVfdXJsKVxyXG5cclxuICAgICAgICByZXR1cm4ge2ltYWdlVXJsOiByZXN1bHQuc2VjdXJlX3VybCwgaW1hZ2VQdWJsaWNJZDogcmVzdWx0LnB1YmxpY19pZH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cGxvYWRDb3ZlckltYWdlKHVzZXJJZDogbnVtYmVyLCBmaWxlOiBQcm9taXNlPEZpbGVVcGxvYWQ+KSB7XHJcbiAgICAgICAgY29uc3Qge2NyZWF0ZVJlYWRTdHJlYW19ID0gYXdhaXQgZmlsZVxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5LmZpbmRVc2VyQnlJZCh1c2VySWQpXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBsb2FkU3RyZWFtRmlsZShjcmVhdGVSZWFkU3RyZWFtLCBpbWFnZVVwbG9hZE9wdGlvbnMudXNlckNvdmVySW1hZ2UpXHJcblxyXG4gICAgICAgIGlmICh1c2VyPy5jb3ZlckltYWdlUHVibGljSWQpIHtcclxuICAgICAgICAgICAgZGVsZXRlRmlsZSh1c2VyLmNvdmVySW1hZ2VQdWJsaWNJZCkuY2F0Y2goZXJyb3IgPT4gbG9nZ2VyLmVycm9yKGVycm9yKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnkudXBkYXRlQ292ZXJJbWFnZSh1c2VySWQsIHJlc3VsdC5wdWJsaWNfaWQsIHJlc3VsdC5zZWN1cmVfdXJsKVxyXG5cclxuICAgICAgICByZXR1cm4ge2ltYWdlVXJsOiByZXN1bHQuc2VjdXJlX3VybCwgaW1hZ2VQdWJsaWNJZDogcmVzdWx0LnB1YmxpY19pZH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0dyYXBoUUxNb2R1bGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuXHJcbmltcG9ydCB7VXNlcnNQcm92aWRlcn0gZnJvbSAnYXBpL21vZHVsZXMvVXNlci9Vc2Vyc1Byb3ZpZGVyJ1xyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJ2FwaS9tb2R1bGVzL1VzZXIvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQge1VzZXJSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVXNlcidcclxuXHJcbmltcG9ydCAqIGFzIHR5cGVEZWZzIGZyb20gJy4vc2NoZW1hLmdyYXBocWwnXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7Y29tcG9zZUNvbnRleHQsIGF0dGFjaEN1cnJlbnRVc2VySWR9IGZyb20gJ2FwaS9jb250ZXh0J1xyXG5pbXBvcnQge0VtYWlsQ29uZmlybWF0aW9uUmVwb3NpdG9yeX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0VtYWlsQ29uZmlybWF0aW9uJ1xyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlVTRVJfUFJPVklERVIsIHVzZUNsYXNzOiBVc2Vyc1Byb3ZpZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlVTRVJfUkVQT1NJVE9SWSwgdXNlQ2xhc3M6IFVzZXJSZXBvc2l0b3J5fSxcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLkVNQUlMX0NPTkZJUk1BVElPTl9SRVBPU0lUT1JZLCB1c2VDbGFzczogRW1haWxDb25maXJtYXRpb25SZXBvc2l0b3J5fSxcclxuICAgIF0sXHJcbiAgICB0eXBlRGVmcyxcclxuICAgIHJlc29sdmVycyxcclxuICAgIHJlc29sdmVyc0NvbXBvc2l0aW9uLFxyXG4gICAgY29udGV4dDogY29tcG9zZUNvbnRleHQoW2F0dGFjaEN1cnJlbnRVc2VySWRdKSxcclxufSlcclxuIiwiaW1wb3J0IHtNb2R1bGVDb250ZXh0fSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge1VzZXJzUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJ2FwaS9tb2R1bGVzL1VzZXIvVXNlcnNQcm92aWRlcidcclxuaW1wb3J0IHtBdXRoZW50aWNhdGlvbkNvbnRleHR9IGZyb20gJ2FwaS9jb250ZXh0J1xyXG5pbXBvcnQge2F1dGhlbnRpY2F0ZX0gZnJvbSAnYXBpL2d1YXJkcydcclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtRdWVyeVVzZXJBcmdzLCBRdWVyeVVzZXJCeVNsdWdBcmdzfSBmcm9tICdhcGkvZ2VuZXJhdGVkL3R5cGVzJ1xyXG5pbXBvcnQge1VzZXJJbnB1dEVycm9yfSBmcm9tICdhcG9sbG8tc2VydmVyJ1xyXG5pbXBvcnQge1xyXG4gICAgTXV0YXRpb25VcGxvYWRVc2VySW1hZ2VBcmdzLFxyXG4gICAgSW1hZ2VWYXJpYW50LFxyXG4gICAgTXV0YXRpb25VcGRhdGVVc2VyRGV0YWlsc0FyZ3MsXHJcbiAgICBNdXRhdGlvbkNvbmZpcm1FbWFpbEFyZ3MsXHJcbn0gZnJvbSAnaW50ZXJmYWNlcy9ncmFwaHFsL3R5cGVzJ1xyXG5pbXBvcnQge0F1dGhIZWxwZXJ9IGZyb20gJ3V0aWxzL0F1dGhIZWxwZXInXHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gICAgUXVlcnk6IHtcclxuICAgICAgICBhc3luYyBtZShyb290LCBhcmdzLCBjb250ZXh0OiBNb2R1bGVDb250ZXh0ICYgQXV0aGVudGljYXRpb25Db250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBVc2Vyc1Byb3ZpZGVySW50ZXJmYWNlID0gY29udGV4dC5pbmplY3Rvci5nZXQodG9rZW5zLlVTRVJfUFJPVklERVIpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5maW5kVXNlckJ5SWQoY29udGV4dC5jdXJyZW50VXNlcklkKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgdXNlcihyb290LCBhcmdzOiBRdWVyeVVzZXJBcmdzLCB7aW5qZWN0b3J9OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBVc2Vyc1Byb3ZpZGVySW50ZXJmYWNlID0gaW5qZWN0b3IuZ2V0KHRva2Vucy5VU0VSX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZmluZFVzZXJCeUlkKGFyZ3MuaWQpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyB1c2VyQnlTbHVnKHJvb3QsIGFyZ3M6IFF1ZXJ5VXNlckJ5U2x1Z0FyZ3MsIHtpbmplY3Rvcn06IE1vZHVsZUNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IFVzZXJzUHJvdmlkZXJJbnRlcmZhY2UgPSBpbmplY3Rvci5nZXQodG9rZW5zLlVTRVJfUFJPVklERVIpXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm92aWRlci5maW5kVXNlckJ5U2x1ZyhhcmdzLnNsdWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyB1c2Vycyhyb290LCBhcmdzLCB7aW5qZWN0b3J9OiBNb2R1bGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyOiBVc2Vyc1Byb3ZpZGVySW50ZXJmYWNlID0gaW5qZWN0b3IuZ2V0KHRva2Vucy5VU0VSX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuZ2V0QWxsVXNlcnMoKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTXV0YXRpb246IHtcclxuICAgICAgICBhc3luYyB1cGxvYWRVc2VySW1hZ2UoXHJcbiAgICAgICAgICAgIHJvb3QsXHJcbiAgICAgICAgICAgIGFyZ3M6IE11dGF0aW9uVXBsb2FkVXNlckltYWdlQXJncyxcclxuICAgICAgICAgICAgY29udGV4dDogTW9kdWxlQ29udGV4dCAmIEF1dGhlbnRpY2F0aW9uQ29udGV4dFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogVXNlcnNQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5VU0VSX1BST1ZJREVSKVxyXG5cclxuICAgICAgICAgICAgaWYgKGFyZ3MuaW1hZ2VWYXJpYW50ID09PSBJbWFnZVZhcmlhbnQuUHJvZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb3ZpZGVyLnVwbG9hZFByb2ZpbGVJbWFnZShjb250ZXh0LmN1cnJlbnRVc2VySWQsIGFyZ3MuZmlsZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmdzLmltYWdlVmFyaWFudCA9PT0gSW1hZ2VWYXJpYW50LkNvdmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIudXBsb2FkQ292ZXJJbWFnZShjb250ZXh0LmN1cnJlbnRVc2VySWQsIGFyZ3MuZmlsZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignV3JvbmcgaW1hZ2UgdmFyaWFudCBwcm92aWRlZCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIHVwZGF0ZVVzZXJEZXRhaWxzKFxyXG4gICAgICAgICAgICByb290LFxyXG4gICAgICAgICAgICBhcmdzOiBNdXRhdGlvblVwZGF0ZVVzZXJEZXRhaWxzQXJncyxcclxuICAgICAgICAgICAgY29udGV4dDogTW9kdWxlQ29udGV4dCAmIEF1dGhlbnRpY2F0aW9uQ29udGV4dFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogVXNlcnNQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5VU0VSX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBjb25zdCBbLCB1c2Vyc10gPSBhd2FpdCBwcm92aWRlci51cGRhdGVVc2VyRGV0YWlscyhjb250ZXh0LmN1cnJlbnRVc2VySWQsIGFyZ3MuZGV0YWlscylcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1c2Vyc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgY29uZmlybUVtYWlsKHJvb3QsIGFyZ3M6IE11dGF0aW9uQ29uZmlybUVtYWlsQXJncywgY29udGV4dDogTW9kdWxlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlcjogVXNlcnNQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5VU0VSX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBjb25zdCBbY29uZmlybWVkLCBlbWFpbF0gPSBhd2FpdCBwcm92aWRlci5jb25maXJtRW1haWwoYXJncy50b2tlbilcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maXJtZWQgJiYgZW1haWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcm92aWRlci5maW5kVXNlckJ5RW1haWwoZW1haWwpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3Rva2VuOiBBdXRoSGVscGVyLmNyZWF0ZUF1dGhUb2tlbih1c2VyLmlkKSwgdXNlcn1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzQ29tcG9zaXRpb24gPSB7XHJcbiAgICAnUXVlcnkubWUnOiBbYXV0aGVudGljYXRlXSxcclxuICAgICdNdXRhdGlvbi51cGxvYWRVc2VySW1hZ2UnOiBbYXV0aGVudGljYXRlXSxcclxuICAgICdNdXRhdGlvbi51cGRhdGVVc2VyRGV0YWlscyc6IFthdXRoZW50aWNhdGVdLFxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIFVzZXIge1xcbiAgaWQ6IEludCFcXG4gIHNsdWc6IFN0cmluZyFcXG4gIG5hbWU6IFN0cmluZyFcXG4gIGFib3V0OiBTdHJpbmdcXG4gIHByb2ZpbGVJbWFnZTogU3RyaW5nXFxuICBwcm9maWxlSW1hZ2VQdWJsaWNJZDogU3RyaW5nXFxuICBjb3ZlckltYWdlOiBTdHJpbmdcXG4gIGNvdmVySW1hZ2VQdWJsaWNJZDogU3RyaW5nXFxuICBjb3VudHJ5OiBTdHJpbmdcXG4gIGZhY2Vib29rVXJsOiBTdHJpbmdcXG4gIHlvdXR1YmVVcmw6IFN0cmluZ1xcbiAgaW5zdGFncmFtVXJsOiBTdHJpbmdcXG4gIHR3aXR0ZXJVcmw6IFN0cmluZ1xcbiAgY3JlYXRlZEF0OiBTdHJpbmchXFxuICB1cGRhdGVkQXQ6IFN0cmluZyFcXG59XFxuXFxudHlwZSBBdXRoUGF5bG9hZCB7XFxuICB0b2tlbjogU3RyaW5nIVxcbiAgdXNlcjogVXNlciFcXG59XFxuXFxudHlwZSBJbWFnZVVwbG9hZFJlc3VsdCB7XFxuICBpbWFnZVVybDogU3RyaW5nIVxcbiAgaW1hZ2VQdWJsaWNJZDogU3RyaW5nIVxcbn1cXG5cXG5lbnVtIEltYWdlVmFyaWFudCB7XFxuICBQUk9GSUxFXFxuICBDT1ZFUlxcbn1cXG5cXG5pbnB1dCBVc2VyRGV0YWlscyB7XFxuICBuYW1lOiBTdHJpbmdcXG4gIGFib3V0OiBTdHJpbmdcXG4gIGZhY2Vib29rVXJsOiBTdHJpbmdcXG4gIHlvdXR1YmVVcmw6IFN0cmluZ1xcbiAgaW5zdGFncmFtVXJsOiBTdHJpbmdcXG4gIHR3aXR0ZXJVcmw6IFN0cmluZ1xcbn1cXG5cXG5zY2FsYXIgVXBsb2FkXFxuXFxudHlwZSBRdWVyeSB7XFxuICBtZTogVXNlclxcbiAgdXNlcihpZDogSW50ISk6IFVzZXJcXG4gIHVzZXJCeVNsdWcoc2x1ZzogU3RyaW5nISk6IFVzZXJcXG4gIHVzZXJzOiBbVXNlcl0hXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgdXBsb2FkVXNlckltYWdlKGZpbGU6IFVwbG9hZCEsIGltYWdlVmFyaWFudDogSW1hZ2VWYXJpYW50ISk6IEltYWdlVXBsb2FkUmVzdWx0IVxcbiAgdXBkYXRlVXNlckRldGFpbHMoZGV0YWlsczogVXNlckRldGFpbHMhKTogW1VzZXJdXFxuICBjb25maXJtRW1haWwodG9rZW46IFN0cmluZyEpOiBBdXRoUGF5bG9hZFxcbn1cXG5cIiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBQcm92aWRlclNjb3BlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcbmltcG9ydCB7VmlzaXRvcn0gZnJvbSAnZGIvbW9kZWxzL1Zpc2l0b3InXHJcbmltcG9ydCB7VmlzaXRvclJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9WaXNpdG9yJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWaXNpdG9yUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgdmlzaXRBcXVhc2NhcGUoXHJcbiAgICAgICAgYXF1YXNjYXBlSWQ6IG51bWJlcixcclxuICAgICAgICB2aXNpdG9ySWQ/OiBzdHJpbmdcclxuICAgICk6IEJsdWViaXJkPFtWaXNpdG9yLCBib29sZWFuXT5cclxuICAgIGNvdW50Vmlld3MoYXF1YXNjYXBlSWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7c2NvcGU6IFByb3ZpZGVyU2NvcGUuU2Vzc2lvbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXNpdG9yUHJvdmlkZXIgaW1wbGVtZW50cyBWaXNpdG9yUHJvdmlkZXJJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdCh0b2tlbnMuVklTSVRPUl9SRVBPU0lUT1JZKVxyXG4gICAgICAgIHByaXZhdGUgdmlzaXRvclJlcG9zaXRvcnk6IFZpc2l0b3JSZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICApIHt9XHJcblxyXG4gICAgdmlzaXRBcXVhc2NhcGUoYXF1YXNjYXBlSWQ6IG51bWJlciwgdmlzaXRvcklkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRvclJlcG9zaXRvcnkuYWRkVmlzaXRvcihhcXVhc2NhcGVJZCwgdmlzaXRvcklkKVxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50Vmlld3MoYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0b3JSZXBvc2l0b3J5LmNvdW50Vmlld3MoYXF1YXNjYXBlSWQpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtHcmFwaFFMTW9kdWxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2NvcmUnXHJcblxyXG5pbXBvcnQge1Zpc2l0b3JSZXBvc2l0b3J5fSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvVmlzaXRvcidcclxuXHJcbmltcG9ydCB7dG9rZW5zfSBmcm9tICdkaS90b2tlbnMnXHJcblxyXG5pbXBvcnQge3Jlc29sdmVycywgcmVzb2x2ZXJzQ29tcG9zaXRpb259IGZyb20gJy4vcmVzb2x2ZXJzJ1xyXG5pbXBvcnQge1Zpc2l0b3JQcm92aWRlcn0gZnJvbSAnLi9WaXNpdG9yUHJvdmlkZXInXHJcbmltcG9ydCAqIGFzIHR5cGVEZWZzIGZyb20gJy4vc2NoZW1hLmdyYXBocWwnXHJcbmltcG9ydCB7YXR0YWNoU2Vzc2lvbiwgY29tcG9zZUNvbnRleHR9IGZyb20gJ2FwaS9jb250ZXh0J1xyXG5cclxuZXhwb3J0IGNvbnN0IFZpc2l0b3JNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7cHJvdmlkZTogdG9rZW5zLlZJU0lUT1JfUFJPVklERVIsIHVzZUNsYXNzOiBWaXNpdG9yUHJvdmlkZXJ9LFxyXG4gICAgICAgIHtwcm92aWRlOiB0b2tlbnMuVklTSVRPUl9SRVBPU0lUT1JZLCB1c2VDbGFzczogVmlzaXRvclJlcG9zaXRvcnl9LFxyXG4gICAgXSxcclxuICAgIHR5cGVEZWZzLFxyXG4gICAgcmVzb2x2ZXJzLFxyXG4gICAgcmVzb2x2ZXJzQ29tcG9zaXRpb24sXHJcbiAgICBjb250ZXh0OiBjb21wb3NlQ29udGV4dChbYXR0YWNoU2Vzc2lvbl0pXHJcbn0pXHJcbiIsImltcG9ydCB7TW9kdWxlQ29udGV4dH0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9jb3JlJ1xyXG5cclxuaW1wb3J0IHt0b2tlbnN9IGZyb20gJ2RpL3Rva2VucydcclxuaW1wb3J0IHtWaXNpdG9yUHJvdmlkZXJJbnRlcmZhY2V9IGZyb20gJ2FwaS9tb2R1bGVzL1Zpc2l0b3IvVmlzaXRvclByb3ZpZGVyJ1xyXG5pbXBvcnQge1Nlc3Npb25Db250ZXh0fSBmcm9tICdhcGkvY29udGV4dCdcclxuaW1wb3J0IGhlYWRlcnMgZnJvbSAnY29uc3RhbnRzL2hlYWRlcnMnXHJcbmltcG9ydCB7QXF1YXNjYXBlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcclxuICAgIEFxdWFzY2FwZToge1xyXG4gICAgICAgIGFzeW5jIHZpZXdzQ291bnQoYXF1YXNjYXBlOiBBcXVhc2NhcGUsIGFyZ3MsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IFZpc2l0b3JQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5WSVNJVE9SX1BST1ZJREVSKVxyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHJvdmlkZXIuY291bnRWaWV3cyhhcXVhc2NhcGUuaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIE11dGF0aW9uOiB7XHJcbiAgICAgICAgYXN5bmMgdmlzaXRBcXVhc2NhcGUocm9vdCwgYXJnczoge2FxdWFzY2FwZUlkOiBudW1iZXJ9LCBjb250ZXh0OiBNb2R1bGVDb250ZXh0ICYgU2Vzc2lvbkNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvdmlkZXI6IFZpc2l0b3JQcm92aWRlckludGVyZmFjZSA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0KHRva2Vucy5WSVNJVE9SX1BST1ZJREVSKVxyXG4gICAgICAgICAgICBsZXQgdmlzaXRvcklkID0gY29udGV4dC5yZXEuaGVhZGVyc1toZWFkZXJzLlZJU0lUT1JfVE9LRU5dXHJcblxyXG4gICAgICAgICAgICAvLyBDb29raWUgY2FuIGJlIHN0cmluZyAndW5kZWZpbmVkJyBvciBhbiBhcnJheVxyXG4gICAgICAgICAgICBpZiAodmlzaXRvcklkID09PSAndW5kZWZpbmVkJyB8fCBBcnJheS5pc0FycmF5KHZpc2l0b3JJZCkpIHtcclxuICAgICAgICAgICAgICAgIHZpc2l0b3JJZCA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbdmlzaXRvciwgY3JlYXRlZF0gPSBhd2FpdCBwcm92aWRlci52aXNpdEFxdWFzY2FwZShhcmdzLmFxdWFzY2FwZUlkLCB2aXNpdG9ySWQpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge3Zpc2l0b3IsIGNyZWF0ZWR9XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlcnNDb21wb3NpdGlvbiA9IHt9XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJ0eXBlIFZpc2l0b3Ige1xcbiAgaWQ6IEludCFcXG4gIHZpc2l0b3JJZDogU3RyaW5nIVxcbiAgYXF1YXNjYXBlSWQ6IEludCFcXG59XFxuXFxudHlwZSBWaXNpdEFxdWFzY2FwZVJlc3VsdCB7XFxuICB2aXNpdG9yOiBWaXNpdG9yIVxcbiAgY3JlYXRlZDogQm9vbGVhblxcbn1cXG5cXG50eXBlIEFxdWFzY2FwZSB7XFxuICB2aWV3c0NvdW50OiBJbnQhXFxufVxcblxcbnR5cGUgTXV0YXRpb24ge1xcbiAgdmlzaXRBcXVhc2NhcGUoYXF1YXNjYXBlSWQ6IEludCEpOiBWaXNpdEFxdWFzY2FwZVJlc3VsdCFcXG59XFxuXCIiLCJpbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52J1xyXG5pbXBvcnQgbG9nZ2VyIGZyb20gJ2xvZ2dlcidcclxuXHJcbmRvdGVudi5jb25maWcoKVxyXG5cclxuaW50ZXJmYWNlIEVudmlyb25tZW50VmFyaWFibGVzIHtcclxuICAgIERCX0hPU1Q6IHN0cmluZ1xyXG4gICAgREJfVVNFUjogc3RyaW5nXHJcbiAgICBEQl9QQVNTOiBzdHJpbmdcclxuICAgIERCX05BTUU6IHN0cmluZ1xyXG4gICAgRU5WSVJPTk1FTlQ6IHN0cmluZ1xyXG4gICAgU0VDVVJJVFlfVE9LRU5fU0VDUkVUOiBzdHJpbmdcclxuICAgIFNFQ1VSSVRZX1RPS0VOX1NUQVRJQzogc3RyaW5nXHJcbiAgICBGQUNFQk9PS19DTElFTlRfSUQ6IHN0cmluZ1xyXG4gICAgRkFDRUJPT0tfU0VDUkVUOiBzdHJpbmdcclxuICAgIEdPT0dMRV9TRUNSRVQ6IHN0cmluZ1xyXG4gICAgR09PR0xFX0NMSUVOVF9JRDogc3RyaW5nXHJcbiAgICBDTE9VRElOQVJZX0NMT1VEX05BTUU6IHN0cmluZ1xyXG4gICAgQ0xPVURJTkFSWV9BUElfS0VZOiBzdHJpbmdcclxuICAgIENMT1VESU5BUllfQVBJX1NFQ1JFVDogc3RyaW5nXHJcbiAgICBFTUFJTF9TRU5ERVI6IHN0cmluZ1xyXG4gICAgSE9TVDogc3RyaW5nXHJcbiAgICBTRU5ER1JJRF9BUElfS0VZOiBzdHJpbmdcclxufVxyXG5cclxuY29uc3QgZW52aXJvbm1lbnQgPSB7XHJcbiAgICBEQl9IT1NUOiBwcm9jZXNzLmVudi5EQl9IT1NULFxyXG4gICAgREJfVVNFUjogcHJvY2Vzcy5lbnYuREJfVVNFUixcclxuICAgIERCX1BBU1M6IHByb2Nlc3MuZW52LkRCX1BBU1MsXHJcbiAgICBEQl9OQU1FOiBwcm9jZXNzLmVudi5EQl9OQU1FLFxyXG4gICAgRU5WSVJPTk1FTlQ6IHByb2Nlc3MuZW52LkVOVklST05NRU5ULFxyXG4gICAgU0VDVVJJVFlfVE9LRU5fU0VDUkVUOiBwcm9jZXNzLmVudi5TRUNVUklUWV9UT0tFTl9TRUNSRVQsXHJcbiAgICBTRUNVUklUWV9UT0tFTl9TVEFUSUM6IHByb2Nlc3MuZW52LlNFQ1VSSVRZX1RPS0VOX1NUQVRJQyxcclxuICAgIEZBQ0VCT09LX0NMSUVOVF9JRDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQ0xJRU5UX0lELFxyXG4gICAgRkFDRUJPT0tfU0VDUkVUOiBwcm9jZXNzLmVudi5GQUNFQk9PS19TRUNSRVQsXHJcbiAgICBHT09HTEVfU0VDUkVUOiBwcm9jZXNzLmVudi5HT09HTEVfU0VDUkVULFxyXG4gICAgR09PR0xFX0NMSUVOVF9JRDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICAgIENMT1VESU5BUllfQ0xPVURfTkFNRTogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9DTE9VRF9OQU1FLFxyXG4gICAgQ0xPVURJTkFSWV9BUElfS0VZOiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0FQSV9LRVksXHJcbiAgICBDTE9VRElOQVJZX0FQSV9TRUNSRVQ6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQVBJX1NFQ1JFVCxcclxuICAgIEVNQUlMX1NFTkRFUjogcHJvY2Vzcy5lbnYuRU1BSUxfU0VOREVSLFxyXG4gICAgSE9TVDogcHJvY2Vzcy5lbnYuSE9TVCxcclxuICAgIFNFTkRHUklEX0FQSV9LRVk6IHByb2Nlc3MuZW52LlNFTkRHUklEX0FQSV9LRVksXHJcbn0gYXMgRW52aXJvbm1lbnRWYXJpYWJsZXNcclxuXHJcbmNvbnN0IGNoZWNrVmFyaWFibGVzID0gKHZhcmlhYmxlczogRW52aXJvbm1lbnRWYXJpYWJsZXMpID0+IHtcclxuICAgIGZvciAoY29uc3QgeCBpbiB2YXJpYWJsZXMpIHtcclxuICAgICAgICBpZiAoIXZhcmlhYmxlc1t4XSkge1xyXG4gICAgICAgICAgICBsb2dnZXIud2FybihgRW52aXJvbm1lbnQgdmFyaWFibGUgJHt4fSBpcyBtaXNzaW5nIWApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jaGVja1ZhcmlhYmxlcyhlbnZpcm9ubWVudClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVudmlyb25tZW50XHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIElOVkFMSURfQ1JFREVOVElBTFM6ICdJTlZBTElEX0NSRURFTlRJQUxTJyxcclxuICAgIEFVVEhFTlRJQ0FUSU9OX0VSUk9SOiAnQVVUSEVOVElDQVRJT05fRVJST1InLFxyXG4gICAgRU1BSUxfQUxSRUFEWV9FWElTVFM6ICdFTUFJTF9BTFJFQURZX0VYSVNUUycsXHJcbiAgICBCQURfUkVRVUVTVDogJ0JBRF9SRVFVRVNUJyxcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBBVVRIX1RPS0VOOiAnYXV0aF90b2tlbicsXHJcbiAgICBWSVNJVE9SX1RPS0VOOiAndmlzaXRvcl9pZCcsXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgRkFDRUJPT0s6ICdGYWNlYm9vaycsXHJcbiAgICBHT09HTEU6ICdHb29nbGUnLFxyXG59XHJcbiIsImltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0RhdGFiYXNlQWRhcHRlcn0gZnJvbSAnZGIvYWRhcHRlcnMvU2VxdWVsaXplQWRhcHRlcidcclxuaW1wb3J0IHtTeW5jT3B0aW9uc30gZnJvbSAnc2VxdWVsaXplL3R5cGVzJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhYmFzZUNvbm5lY3Rpb25QYXJhbXMge1xyXG4gICAgZGF0YWJhc2U6IHN0cmluZ1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZ1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZ1xyXG4gICAgaG9zdDogc3RyaW5nXHJcbiAgICBwb3J0PzogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YWJhc2VJbnRlcmZhY2Uge1xyXG4gICAgY29ubmVjdDogKHBhcmFtczogRGF0YWJhc2VDb25uZWN0aW9uUGFyYW1zKSA9PiB2b2lkXHJcblxyXG4gICAgdGVzdENvbm5lY3Rpb246ICgpID0+IEJsdWViaXJkPHZvaWQ+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhYmFzZSBpbXBsZW1lbnRzIERhdGFiYXNlSW50ZXJmYWNlIHtcclxuICAgIHByaXZhdGUgYWRhcHRlcjogRGF0YWJhc2VBZGFwdGVyXHJcblxyXG4gICAgY29uc3RydWN0b3IoYWRhcHRlcjogRGF0YWJhc2VBZGFwdGVyKSB7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlclxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3QocGFyYW1zOiBEYXRhYmFzZUNvbm5lY3Rpb25QYXJhbXMpIHtcclxuICAgICAgICB0aGlzLmFkYXB0ZXIuY29ubmVjdChwYXJhbXMpXHJcbiAgICB9XHJcblxyXG4gICAgdGVzdENvbm5lY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlci50ZXN0Q29ubmVjdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgc3luYyhvcHRpb25zOiBTeW5jT3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuc3luYyhvcHRpb25zKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuaW1wb3J0IHtTZXF1ZWxpemV9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0RhdGFiYXNlQ29ubmVjdGlvblBhcmFtc30gZnJvbSAnZGIvRGF0YWJhc2UnXHJcbmltcG9ydCB7U3luY09wdGlvbnN9IGZyb20gJ3NlcXVlbGl6ZS90eXBlcydcclxuaW1wb3J0IHtcclxuICAgIEFkZGl0aXZlLFxyXG4gICAgQXF1YXNjYXBlLFxyXG4gICAgQXF1YXNjYXBlSW1hZ2UsXHJcbiAgICBWaXNpdG9yLFxyXG4gICAgQ29tbWVudCxcclxuICAgIEFxdWFzY2FwZVRhZyxcclxuICAgIENPMixcclxuICAgIEZpbHRlcixcclxuICAgIEZvbGxvdyxcclxuICAgIEhhcmRzY2FwZSxcclxuICAgIExpZ2h0LFxyXG4gICAgTGlrZSxcclxuICAgIExpdmVzdG9jayxcclxuICAgIFBsYW50LFxyXG4gICAgU29jaWFsTG9naW4sXHJcbiAgICBTdWJzdHJhdGUsXHJcbiAgICBUYWcsXHJcbiAgICBUYW5rLFxyXG4gICAgVXNlcixcclxuICAgIEFxdWFzY2FwZUFkZGl0aXZlLFxyXG4gICAgQXF1YXNjYXBlRmlsdGVyLFxyXG4gICAgQXF1YXNjYXBlSGFyZHNjYXBlLFxyXG4gICAgQXF1YXNjYXBlTGlnaHQsXHJcbiAgICBBcXVhc2NhcGVMaXZlc3RvY2ssXHJcbiAgICBBcXVhc2NhcGVQbGFudCxcclxuICAgIEFxdWFzY2FwZVN1YnN0cmF0ZSxcclxuICAgIEVtYWlsQ29uZmlybWF0aW9uLFxyXG59IGZyb20gJ2RiL21vZGVscydcclxuaW1wb3J0IHtCcmFuZH0gZnJvbSAnZGIvbW9kZWxzL0JyYW5kJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhYmFzZUFkYXB0ZXIge1xyXG4gICAgY29ubmVjdDogKHBhcmFtczogRGF0YWJhc2VDb25uZWN0aW9uUGFyYW1zKSA9PiB2b2lkXHJcblxyXG4gICAgdGVzdENvbm5lY3Rpb246ICgpID0+IEJsdWViaXJkPHZvaWQ+XHJcblxyXG4gICAgc3luYzogKG9wdGlvbnM6IFN5bmNPcHRpb25zKSA9PiBCbHVlYmlyZDxTZXF1ZWxpemU+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXF1ZWxpemVBZGFwdGVyIGltcGxlbWVudHMgRGF0YWJhc2VBZGFwdGVyIHtcclxuICAgIGluc3RhbmNlOiBTZXF1ZWxpemVcclxuXHJcbiAgICBjb25uZWN0KHBhcmFtczogRGF0YWJhc2VDb25uZWN0aW9uUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBTZXF1ZWxpemUoe1xyXG4gICAgICAgICAgICBob3N0OiBwYXJhbXMuaG9zdCxcclxuICAgICAgICAgICAgcG9ydDogcGFyYW1zLnBvcnQsXHJcbiAgICAgICAgICAgIGRhdGFiYXNlOiBwYXJhbXMuZGF0YWJhc2UsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiBwYXJhbXMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXJhbXMucGFzc3dvcmQsXHJcbiAgICAgICAgICAgIGRpYWxlY3Q6ICdwb3N0Z3JlcycsXHJcbiAgICAgICAgICAgIC8vIExvZ2dpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBtb2RlbHM6IFtcclxuICAgICAgICAgICAgICAgIEFkZGl0aXZlLFxyXG4gICAgICAgICAgICAgICAgQXF1YXNjYXBlLFxyXG4gICAgICAgICAgICAgICAgQXF1YXNjYXBlSW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBBcXVhc2NhcGVUYWcsXHJcbiAgICAgICAgICAgICAgICBDTzIsXHJcbiAgICAgICAgICAgICAgICBDb21tZW50LFxyXG4gICAgICAgICAgICAgICAgRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgQnJhbmQsXHJcbiAgICAgICAgICAgICAgICBGb2xsb3csXHJcbiAgICAgICAgICAgICAgICBIYXJkc2NhcGUsXHJcbiAgICAgICAgICAgICAgICBMaWdodCxcclxuICAgICAgICAgICAgICAgIExpa2UsXHJcbiAgICAgICAgICAgICAgICBMaXZlc3RvY2ssXHJcbiAgICAgICAgICAgICAgICBQbGFudCxcclxuICAgICAgICAgICAgICAgIFNvY2lhbExvZ2luLFxyXG4gICAgICAgICAgICAgICAgU3Vic3RyYXRlLFxyXG4gICAgICAgICAgICAgICAgVGFnLFxyXG4gICAgICAgICAgICAgICAgVGFuayxcclxuICAgICAgICAgICAgICAgIFVzZXIsXHJcbiAgICAgICAgICAgICAgICBWaXNpdG9yLFxyXG4gICAgICAgICAgICAgICAgQXF1YXNjYXBlQWRkaXRpdmUsXHJcbiAgICAgICAgICAgICAgICBBcXVhc2NhcGVGaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBBcXVhc2NhcGVIYXJkc2NhcGUsXHJcbiAgICAgICAgICAgICAgICBBcXVhc2NhcGVMaWdodCxcclxuICAgICAgICAgICAgICAgIEFxdWFzY2FwZUxpdmVzdG9jayxcclxuICAgICAgICAgICAgICAgIEFxdWFzY2FwZVBsYW50LFxyXG4gICAgICAgICAgICAgICAgQXF1YXNjYXBlU3Vic3RyYXRlLFxyXG4gICAgICAgICAgICAgICAgRW1haWxDb25maXJtYXRpb24sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0ZXN0Q29ubmVjdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS5hdXRoZW50aWNhdGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHN5bmMob3B0aW9uczogU3luY09wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS5zeW5jKG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtUYWJsZSwgQ29sdW1uLCBNb2RlbCwgRGVmYXVsdCwgRm9yZWlnbktleSwgQmVsb25nc1RvfSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtCcmFuZH0gZnJvbSAnLi9CcmFuZCdcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQWRkaXRpdmUgZXh0ZW5kcyBNb2RlbDxBZGRpdGl2ZT4ge1xyXG4gICAgQERlZmF1bHQoZmFsc2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwcmVkZWZpbmVkOiBib29sZWFuXHJcblxyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQnJhbmQpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBicmFuZElkOiBudW1iZXJcclxuXHJcbiAgICBAQmVsb25nc1RvKCgpID0+IEJyYW5kKVxyXG4gICAgYnJhbmQ6IEJyYW5kXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbW9kZWw6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBpbWFnZTogc3RyaW5nXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICAgIFRhYmxlLFxyXG4gICAgQ29sdW1uLFxyXG4gICAgTW9kZWwsXHJcbiAgICBGb3JlaWduS2V5LFxyXG4gICAgQmVsb25nc1RvLFxyXG4gICAgSGFzTWFueSxcclxuICAgIEJlbG9uZ3NUb01hbnksXHJcbiAgICBEZWZhdWx0LFxyXG59IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ2RiL21vZGVscy9Vc2VyJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUxpZ2h0fSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVMaWdodCdcclxuaW1wb3J0IHtBcXVhc2NhcGVJbWFnZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZUltYWdlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUhhcmRzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL21hbnlUb01hbnkvQXF1YXNjYXBlSGFyZHNjYXBlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZVBsYW50fSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVQbGFudCdcclxuaW1wb3J0IHtBcXVhc2NhcGVTdWJzdHJhdGV9IGZyb20gJ2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZVN1YnN0cmF0ZSdcclxuaW1wb3J0IHtBcXVhc2NhcGVBZGRpdGl2ZX0gZnJvbSAnZGIvbW9kZWxzL21hbnlUb01hbnkvQXF1YXNjYXBlQWRkaXRpdmUnXHJcbmltcG9ydCB7QXF1YXNjYXBlRmlsdGVyfSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVGaWx0ZXInXHJcbmltcG9ydCB7QXF1YXNjYXBlTGl2ZXN0b2NrfSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVMaXZlc3RvY2snXHJcbmltcG9ydCB7QXF1YXNjYXBlVGFnfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlVGFnJ1xyXG5pbXBvcnQge1BsYW50fSBmcm9tICdkYi9tb2RlbHMvUGxhbnQnXHJcbmltcG9ydCB7TGlnaHR9IGZyb20gJ2RiL21vZGVscy9MaWdodCdcclxuaW1wb3J0IHtTdWJzdHJhdGV9IGZyb20gJ2RiL21vZGVscy9TdWJzdHJhdGUnXHJcbmltcG9ydCB7QWRkaXRpdmV9IGZyb20gJ2RiL21vZGVscy9BZGRpdGl2ZSdcclxuaW1wb3J0IHtDb21tZW50fSBmcm9tICdkYi9tb2RlbHMvQ29tbWVudCdcclxuaW1wb3J0IHtUYWd9IGZyb20gJ2RiL21vZGVscy9UYWcnXHJcbmltcG9ydCB7SGFyZHNjYXBlfSBmcm9tICdkYi9tb2RlbHMvSGFyZHNjYXBlJ1xyXG5pbXBvcnQge1Zpc2l0b3J9IGZyb20gJ2RiL21vZGVscy9WaXNpdG9yJ1xyXG5pbXBvcnQge0xpa2V9IGZyb20gJ2RiL21vZGVscy9MaWtlJ1xyXG5pbXBvcnQge0NPMn0gZnJvbSAnZGIvbW9kZWxzL0NPMidcclxuaW1wb3J0IHtGaWx0ZXJ9IGZyb20gJ2RiL21vZGVscy9GaWx0ZXInXHJcbmltcG9ydCB7TGl2ZXN0b2NrfSBmcm9tICdkYi9tb2RlbHMvTGl2ZXN0b2NrJ1xyXG5pbXBvcnQge1Rhbmt9IGZyb20gJ2RiL21vZGVscy9UYW5rJ1xyXG5cclxuQFRhYmxlKHtwYXJhbm9pZDogdHJ1ZX0pXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGUgZXh0ZW5kcyBNb2RlbDxBcXVhc2NhcGU+IHtcclxuICAgIEBDb2x1bW5cclxuICAgIHRpdGxlOiBzdHJpbmdcclxuXHJcbiAgICBARGVmYXVsdChmYWxzZSlcclxuICAgIEBDb2x1bW5cclxuICAgIGZlYXR1cmVkOiBib29sZWFuXHJcblxyXG4gICAgQERlZmF1bHQoZmFsc2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICB0cmVuZGluZzogYm9vbGVhblxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBtYWluSW1hZ2VQdWJsaWNJZDogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbWFpbkltYWdlVXJsOiBzdHJpbmdcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG4gICAgQENvbHVtblxyXG4gICAgdXNlcklkOiBudW1iZXJcclxuXHJcbiAgICBAQmVsb25nc1RvKCgpID0+IFVzZXIpXHJcbiAgICB1c2VyOiBVc2VyXHJcblxyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQ08yKVxyXG4gICAgQENvbHVtblxyXG4gICAgY28ySWQ6IG51bWJlclxyXG5cclxuICAgIEBCZWxvbmdzVG8oKCkgPT4gQ08yKVxyXG4gICAgY28yOiBDTzJcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBUYW5rKVxyXG4gICAgQENvbHVtblxyXG4gICAgdGFua0lkOiBudW1iZXJcclxuXHJcbiAgICBAQmVsb25nc1RvKCgpID0+IFRhbmspXHJcbiAgICB0YW5rOiBUYW5rXHJcblxyXG4gICAgQEhhc01hbnkoKCkgPT4gQXF1YXNjYXBlSW1hZ2UpXHJcbiAgICBpbWFnZXM6IEFxdWFzY2FwZUltYWdlW11cclxuXHJcbiAgICBASGFzTWFueSgoKSA9PiBWaXNpdG9yKVxyXG4gICAgdmlzaXRvcnM6IFZpc2l0b3JbXVxyXG5cclxuICAgIEBIYXNNYW55KCgpID0+IENvbW1lbnQpXHJcbiAgICBjb21tZW50czogQ29tbWVudFtdXHJcblxyXG4gICAgQEhhc01hbnkoKCkgPT4gTGlrZSlcclxuICAgIGxpa2VzOiBMaWtlW11cclxuXHJcbiAgICBAQmVsb25nc1RvTWFueShcclxuICAgICAgICAoKSA9PiBGaWx0ZXIsXHJcbiAgICAgICAgKCkgPT4gQXF1YXNjYXBlRmlsdGVyXHJcbiAgICApXHJcbiAgICBmaWx0ZXJzOiBGaWx0ZXJbXVxyXG5cclxuICAgIEBCZWxvbmdzVG9NYW55KFxyXG4gICAgICAgICgpID0+IExpZ2h0LFxyXG4gICAgICAgICgpID0+IEFxdWFzY2FwZUxpZ2h0XHJcbiAgICApXHJcbiAgICBsaWdodHM6IExpZ2h0W11cclxuXHJcbiAgICBAQmVsb25nc1RvTWFueShcclxuICAgICAgICAoKSA9PiBTdWJzdHJhdGUsXHJcbiAgICAgICAgKCkgPT4gQXF1YXNjYXBlU3Vic3RyYXRlXHJcbiAgICApXHJcbiAgICBzdWJzdHJhdGVzOiBTdWJzdHJhdGVbXVxyXG5cclxuICAgIEBCZWxvbmdzVG9NYW55KFxyXG4gICAgICAgICgpID0+IEFkZGl0aXZlLFxyXG4gICAgICAgICgpID0+IEFxdWFzY2FwZUFkZGl0aXZlXHJcbiAgICApXHJcbiAgICBhZGRpdGl2ZXM6IEFkZGl0aXZlW11cclxuXHJcbiAgICBAQmVsb25nc1RvTWFueShcclxuICAgICAgICAoKSA9PiBIYXJkc2NhcGUsXHJcbiAgICAgICAgKCkgPT4gQXF1YXNjYXBlSGFyZHNjYXBlXHJcbiAgICApXHJcbiAgICBoYXJkc2NhcGU6IEhhcmRzY2FwZVtdXHJcblxyXG4gICAgQEJlbG9uZ3NUb01hbnkoXHJcbiAgICAgICAgKCkgPT4gVGFnLFxyXG4gICAgICAgICgpID0+IEFxdWFzY2FwZVRhZ1xyXG4gICAgKVxyXG4gICAgdGFnczogVGFnW11cclxuXHJcbiAgICBAQmVsb25nc1RvTWFueShcclxuICAgICAgICAoKSA9PiBQbGFudCxcclxuICAgICAgICAoKSA9PiBBcXVhc2NhcGVQbGFudFxyXG4gICAgKVxyXG4gICAgcGxhbnRzOiBQbGFudFtdXHJcblxyXG4gICAgQEJlbG9uZ3NUb01hbnkoXHJcbiAgICAgICAgKCkgPT4gTGl2ZXN0b2NrLFxyXG4gICAgICAgICgpID0+IEFxdWFzY2FwZUxpdmVzdG9ja1xyXG4gICAgKVxyXG4gICAgbGl2ZXN0b2NrOiBMaXZlc3RvY2tbXVxyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIEZvcmVpZ25LZXksIEhhc01hbnl9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtDb21tZW50fSBmcm9tICdkYi9tb2RlbHMvQ29tbWVudCdcclxuaW1wb3J0IHtMaWtlfSBmcm9tICdkYi9tb2RlbHMvTGlrZSdcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQXF1YXNjYXBlSW1hZ2UgZXh0ZW5kcyBNb2RlbDxBcXVhc2NhcGVJbWFnZT4ge1xyXG4gICAgQENvbHVtblxyXG4gICAgdGl0bGU6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICB1cmw6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIHB1YmxpY0lkOiBzdHJpbmdcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBBcXVhc2NhcGUpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBhcXVhc2NhcGVJZDogbnVtYmVyXHJcblxyXG4gICAgQEhhc01hbnkoKCkgPT4gQ29tbWVudClcclxuICAgIGNvbW1lbnRzOiBDb21tZW50W11cclxuXHJcbiAgICBASGFzTWFueSgoKSA9PiBMaWtlKVxyXG4gICAgbGlrZXM6IExpa2VbXVxyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIEZvcmVpZ25LZXl9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtUYWd9IGZyb20gJ2RiL21vZGVscy9UYWcnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZVRhZyBleHRlbmRzIE1vZGVsPEFxdWFzY2FwZVRhZz4ge1xyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQXF1YXNjYXBlKVxyXG4gICAgQENvbHVtblxyXG4gICAgYXF1YXNjYXBlSWQ6IG51bWJlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IFRhZylcclxuICAgIEBDb2x1bW5cclxuICAgIHRhZ0lkOiBudW1iZXJcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBEZWZhdWx0fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQnJhbmQgZXh0ZW5kcyBNb2RlbDxCcmFuZD4ge1xyXG4gICAgQERlZmF1bHQoZmFsc2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwcmVkZWZpbmVkOiBib29sZWFuXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbmFtZTogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbG9nbzogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgd2Vic2l0ZTogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgYWRkcmVzczogc3RyaW5nXHJcbn1cclxuIiwiaW1wb3J0IHtUYWJsZSwgQ29sdW1uLCBNb2RlbH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIENPMiBleHRlbmRzIE1vZGVsPENPMj4ge1xyXG4gICAgQENvbHVtblxyXG4gICAgdHlwZTogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgYnBzOiBudW1iZXJcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5LCBCZWxvbmdzVG8sIEhhc01hbnksIERhdGFUeXBlfSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtBcXVhc2NhcGVJbWFnZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZUltYWdlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtVc2VyfSBmcm9tICdkYi9tb2RlbHMvVXNlcidcclxuaW1wb3J0IHtMaWtlfSBmcm9tICdkYi9tb2RlbHMvTGlrZSdcclxuXHJcbkBUYWJsZSh7cGFyYW5vaWQ6IHRydWV9KVxyXG5leHBvcnQgY2xhc3MgQ29tbWVudCBleHRlbmRzIE1vZGVsPENvbW1lbnQ+IHtcclxuICAgIEBDb2x1bW4oRGF0YVR5cGUuVEVYVClcclxuICAgIGNvbnRlbnQ6IHN0cmluZ1xyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IENvbW1lbnQpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwYXJlbnRDb21tZW50SWQ6IG51bWJlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcbiAgICBAQ29sdW1uXHJcbiAgICB1c2VySWQ6IG51bWJlclxyXG5cclxuICAgIEBCZWxvbmdzVG8oKCkgPT4gVXNlcilcclxuICAgIHVzZXI6IFVzZXJcclxuXHJcbiAgICBASGFzTWFueSgoKSA9PiBMaWtlLCB7XHJcbiAgICAgICAgb25VcGRhdGU6ICdDQVNDQURFJyxcclxuICAgICAgICBvbkRlbGV0ZTogJ0NBU0NBREUnLFxyXG4gICAgfSlcclxuICAgIGxpa2VzOiBMaWtlW11cclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBBcXVhc2NhcGUpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBhcXVhc2NhcGVJZDogbnVtYmVyXHJcblxyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQXF1YXNjYXBlSW1hZ2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBhcXVhc2NhcGVJbWFnZUlkOiBudW1iZXJcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsfSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgRW1haWxDb25maXJtYXRpb24gZXh0ZW5kcyBNb2RlbDxFbWFpbENvbmZpcm1hdGlvbj4ge1xyXG4gICAgQENvbHVtblxyXG4gICAgZW1haWw6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGNvZGU6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGV4cGlyZXNBdDogRGF0ZVxyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIERlZmF1bHQsIEJlbG9uZ3NUbywgRm9yZWlnbktleX0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcbmltcG9ydCB7QnJhbmR9IGZyb20gJy4vQnJhbmQnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEZpbHRlciBleHRlbmRzIE1vZGVsPEZpbHRlcj4ge1xyXG4gICAgQERlZmF1bHQoZmFsc2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwcmVkZWZpbmVkOiBib29sZWFuXHJcblxyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQnJhbmQpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBicmFuZElkOiBudW1iZXJcclxuXHJcbiAgICBAQmVsb25nc1RvKCgpID0+IEJyYW5kKVxyXG4gICAgYnJhbmQ6IEJyYW5kXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbW9kZWw6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBpbWFnZTogc3RyaW5nXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICAgIFRhYmxlLFxyXG4gICAgQ29sdW1uLFxyXG4gICAgTW9kZWwsXHJcbiAgICBGb3JlaWduS2V5LFxyXG4gICAgQmVsb25nc1RvLFxyXG4gICAgRGVmYXVsdFNjb3BlLFxyXG59IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ2RiL21vZGVscy9Vc2VyJ1xyXG5cclxuQERlZmF1bHRTY29wZSh7XHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhczogJ2ZvbGxvd2VkJyxcclxuICAgICAgICAgICAgbW9kZWw6ICgpID0+IFVzZXIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFzOiAnZm9sbG93ZXInLFxyXG4gICAgICAgICAgICBtb2RlbDogKCkgPT4gVXNlcixcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxufSlcclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBGb2xsb3cgZXh0ZW5kcyBNb2RlbDxGb2xsb3c+IHtcclxuICAgIEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBmb2xsb3dlZFVzZXJJZDogbnVtYmVyXHJcblxyXG4gICAgQEJlbG9uZ3NUbygoKSA9PiBVc2VyLCAnZm9sbG93ZWRVc2VySWQnKVxyXG4gICAgZm9sbG93ZWQ6IFVzZXJcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBVc2VyKVxyXG4gICAgQENvbHVtblxyXG4gICAgZm9sbG93ZXJVc2VySWQ6IG51bWJlclxyXG5cclxuICAgIEBCZWxvbmdzVG8oKCkgPT4gVXNlciwgJ2ZvbGxvd2VyVXNlcklkJylcclxuICAgIGZvbGxvd2VyOiBVc2VyXHJcbn1cclxuIiwiaW1wb3J0IHtUYWJsZSwgQ29sdW1uLCBNb2RlbCwgRGVmYXVsdH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEhhcmRzY2FwZSBleHRlbmRzIE1vZGVsPEhhcmRzY2FwZT4ge1xyXG4gICAgQERlZmF1bHQoZmFsc2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwcmVkZWZpbmVkOiBib29sZWFuXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbmFtZTogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGltYWdlOiBzdHJpbmdcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBEZWZhdWx0LCBGb3JlaWduS2V5LCBCZWxvbmdzVG99IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0JyYW5kfSBmcm9tICcuL0JyYW5kJ1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBMaWdodCBleHRlbmRzIE1vZGVsPExpZ2h0PiB7XHJcbiAgICBARGVmYXVsdChmYWxzZSlcclxuICAgIEBDb2x1bW5cclxuICAgIHByZWRlZmluZWQ6IGJvb2xlYW5cclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBCcmFuZClcclxuICAgIEBDb2x1bW5cclxuICAgIGJyYW5kSWQ6IG51bWJlclxyXG5cclxuICAgIEBCZWxvbmdzVG8oKCkgPT4gQnJhbmQpXHJcbiAgICBicmFuZDogQnJhbmRcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBtb2RlbDogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgd2lkdGg6IG51bWJlciAvLyBNaWxpbWV0ZXIgKHN5bWJvbDogbW0pXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgaGVpZ2h0OiBudW1iZXIgLy8gTWlsaW1ldGVyIChzeW1ib2w6IG1tKVxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlcHRoOiBudW1iZXIgLy8gTWlsaW1ldGVyIChzeW1ib2w6IG1tKVxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIHBvd2VyOiBudW1iZXIgLy8gV2F0dCAoc3ltYm9sOiBXKVxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGx1bWVuTWluOiBudW1iZXIgLy8gU3ltYm9sOiBsbVxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGx1bWVuTWF4OiBudW1iZXIgLy8gU3ltYm9sOiBsbVxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGtlbHZpbk1pbjogbnVtYmVyIC8vIFN5bWJvbDogS1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGtlbHZpbk1heDogbnVtYmVyIC8vIFN5bWJvbDogS1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRpbW1hYmxlOiBib29sZWFuXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGltYWdlOiBzdHJpbmdcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5LCBCZWxvbmdzVG99IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0FxdWFzY2FwZUltYWdlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlSW1hZ2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlJ1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ2RiL21vZGVscy9Vc2VyJ1xyXG5pbXBvcnQge0NvbW1lbnR9IGZyb20gJ2RiL21vZGVscy9Db21tZW50J1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBMaWtlIGV4dGVuZHMgTW9kZWw8TGlrZT4ge1xyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gVXNlcilcclxuICAgIEBDb2x1bW5cclxuICAgIHVzZXJJZDogbnVtYmVyXHJcblxyXG4gICAgQEJlbG9uZ3NUbygoKSA9PiBVc2VyKVxyXG4gICAgdXNlcjogVXNlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEFxdWFzY2FwZUltYWdlKVxyXG4gICAgQENvbHVtblxyXG4gICAgYXF1YXNjYXBlSW1hZ2VJZDogbnVtYmVyXHJcblxyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQXF1YXNjYXBlKVxyXG4gICAgQENvbHVtblxyXG4gICAgYXF1YXNjYXBlSWQ6IG51bWJlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IENvbW1lbnQpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBjb21tZW50SWQ6IG51bWJlclxyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIERlZmF1bHR9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBMaXZlc3RvY2sgZXh0ZW5kcyBNb2RlbDxMaXZlc3RvY2s+IHtcclxuICAgIEBEZWZhdWx0KGZhbHNlKVxyXG4gICAgQENvbHVtblxyXG4gICAgcHJlZGVmaW5lZDogYm9vbGVhblxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIG5hbWU6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBpbWFnZTogc3RyaW5nXHJcbn1cclxuIiwiaW1wb3J0IHtUYWJsZSwgQ29sdW1uLCBNb2RlbCwgRGVmYXVsdH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFBsYW50IGV4dGVuZHMgTW9kZWw8UGxhbnQ+IHtcclxuICAgIEBEZWZhdWx0KGZhbHNlKVxyXG4gICAgQENvbHVtblxyXG4gICAgcHJlZGVmaW5lZDogYm9vbGVhblxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIG5hbWU6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBpbWFnZTogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgb3JpZ2luOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBtaW5IZWlnaHQ6IG51bWJlciAvLyBEZWZhdWx0IGluIGNlbnRpbWV0cmVzXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgbWF4SGVpZ2h0OiBudW1iZXIgLy8gRGVmYXVsdCBpbiBjZW50aW1ldHJlc1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIHBvc2l0aW9uOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBsdW1pbm9zaXR5OiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBncm93dGhTcGVlZDogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgZGlmZmljdWx0eTogc3RyaW5nXHJcbn1cclxuIiwiaW1wb3J0IHNvY2lhbFByb3ZpZGVycyBmcm9tICdjb25zdGFudHMvc29jaWFsUHJvdmlkZXJzJ1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJ2RiL21vZGVscy9Vc2VyJ1xyXG5pbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5LCBEYXRhVHlwZX0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcblxyXG5AVGFibGUoe3BhcmFub2lkOiB0cnVlfSlcclxuZXhwb3J0IGNsYXNzIFNvY2lhbExvZ2luIGV4dGVuZHMgTW9kZWw8U29jaWFsTG9naW4+IHtcclxuICAgIEBGb3JlaWduS2V5KCgpID0+IFVzZXIpXHJcbiAgICBAQ29sdW1uXHJcbiAgICB1c2VySWQ6IG51bWJlclxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIHNvY2lhbElkOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uKERhdGFUeXBlLkVOVU0oc29jaWFsUHJvdmlkZXJzLkZBQ0VCT09LLCBzb2NpYWxQcm92aWRlcnMuR09PR0xFKSlcclxuICAgIHByb3ZpZGVyOiBzdHJpbmdcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBEZWZhdWx0LCBGb3JlaWduS2V5LCBCZWxvbmdzVG99IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0JyYW5kfSBmcm9tICcuL0JyYW5kJ1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBTdWJzdHJhdGUgZXh0ZW5kcyBNb2RlbDxTdWJzdHJhdGU+IHtcclxuICAgIEBEZWZhdWx0KGZhbHNlKVxyXG4gICAgQENvbHVtblxyXG4gICAgcHJlZGVmaW5lZDogYm9vbGVhblxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEJyYW5kKVxyXG4gICAgQENvbHVtblxyXG4gICAgYnJhbmRJZDogbnVtYmVyXHJcblxyXG4gICAgQEJlbG9uZ3NUbygoKSA9PiBCcmFuZClcclxuICAgIGJyYW5kOiBCcmFuZFxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIG1vZGVsOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgaW1hZ2U6IHN0cmluZ1xyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIERlZmF1bHR9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBUYWcgZXh0ZW5kcyBNb2RlbDxUYWc+IHtcclxuICAgIEBEZWZhdWx0KGZhbHNlKVxyXG4gICAgQENvbHVtblxyXG4gICAgcHJlZGVmaW5lZDogYm9vbGVhblxyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIG5hbWU6IHN0cmluZ1xyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWx9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBUYW5rIGV4dGVuZHMgTW9kZWw8VGFuaz4ge1xyXG4gICAgQENvbHVtblxyXG4gICAgdm9sdW1lOiBudW1iZXIgLy8gTGl0cmVzXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgd2lkdGg6IG51bWJlciAvLyBNaWxpbWV0cmVzXHJcblxyXG4gICAgQENvbHVtblxyXG4gICAgaGVpZ2h0OiBudW1iZXIgLy8gTWlsaW1ldHJlc1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGRlcHRoOiBudW1iZXIgLy8gTWlsaW1ldHJlc1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGdsYXNzVGhpY2tuZXNzOiBudW1iZXIgLy8gTWlsaW1ldHJlc1xyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIFVuaXF1ZSwgSGFzTWFueSwgRGVmYXVsdCwgRGF0YVR5cGV9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtTb2NpYWxMb2dpbn0gZnJvbSAnZGIvbW9kZWxzL1NvY2lhbExvZ2luJ1xyXG5pbXBvcnQge0ZvbGxvd30gZnJvbSAnZGIvbW9kZWxzL0ZvbGxvdydcclxuaW1wb3J0IHtMaWtlfSBmcm9tICdkYi9tb2RlbHMvTGlrZSdcclxuXHJcbkBUYWJsZSh7cGFyYW5vaWQ6IHRydWV9KVxyXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIE1vZGVsPFVzZXI+IHtcclxuICAgIEBDb2x1bW5cclxuICAgIGVtYWlsOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwYXNzd29yZDogc3RyaW5nXHJcblxyXG4gICAgQERlZmF1bHQoZmFsc2UpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBlbWFpbENvbmZpcm1lZDogYm9vbGVhblxyXG5cclxuICAgIEBVbmlxdWVcclxuICAgIEBDb2x1bW5cclxuICAgIHNsdWc6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIG5hbWU6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW4oe3R5cGU6IERhdGFUeXBlLlNUUklORyg1MDApfSlcclxuICAgIGFib3V0OiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBwcm9maWxlSW1hZ2U6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIHByb2ZpbGVJbWFnZVB1YmxpY0lkOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBjb3ZlckltYWdlOiBzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uXHJcbiAgICBjb3ZlckltYWdlUHVibGljSWQ6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW5cclxuICAgIGNvdW50cnk6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW4oe3R5cGU6IERhdGFUeXBlLlRFWFR9KVxyXG4gICAgZmFjZWJvb2tVcmw6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW4oe3R5cGU6IERhdGFUeXBlLlRFWFR9KVxyXG4gICAgeW91dHViZVVybDogc3RyaW5nXHJcblxyXG4gICAgQENvbHVtbih7dHlwZTogRGF0YVR5cGUuVEVYVH0pXHJcbiAgICBpbnN0YWdyYW1Vcmw6IHN0cmluZ1xyXG5cclxuICAgIEBDb2x1bW4oe3R5cGU6IERhdGFUeXBlLlRFWFR9KVxyXG4gICAgdHdpdHRlclVybDogc3RyaW5nXHJcblxyXG4gICAgQEhhc01hbnkoKCkgPT4gU29jaWFsTG9naW4pXHJcbiAgICBzb2NpYWw6IFNvY2lhbExvZ2luW11cclxuXHJcbiAgICBASGFzTWFueSgoKSA9PiBBcXVhc2NhcGUpXHJcbiAgICBhcXVhc2NhcGVzOiBBcXVhc2NhcGVbXVxyXG5cclxuICAgIEBIYXNNYW55KCgpID0+IExpa2UpXHJcbiAgICBsaWtlczogTGlrZVtdXHJcblxyXG4gICAgQEhhc01hbnkoKCkgPT4gRm9sbG93LCAnZm9sbG93ZXJVc2VySWQnKVxyXG4gICAgZm9sbG93aW5nOiBGb2xsb3dbXVxyXG5cclxuICAgIEBIYXNNYW55KCgpID0+IEZvbGxvdywgJ2ZvbGxvd2VkVXNlcklkJylcclxuICAgIGZvbGxvd2VyczogRm9sbG93W11cclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtBcXVhc2NhcGV9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGUnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIFZpc2l0b3IgZXh0ZW5kcyBNb2RlbDxWaXNpdG9yPiB7XHJcbiAgICBAQ29sdW1uXHJcbiAgICB2aXNpdG9ySWQ6IHN0cmluZ1xyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEFxdWFzY2FwZSlcclxuICAgIEBDb2x1bW5cclxuICAgIGFxdWFzY2FwZUlkOiBudW1iZXJcclxufVxyXG4iLCJleHBvcnQge0FkZGl0aXZlfSBmcm9tICcuL0FkZGl0aXZlJ1xyXG5leHBvcnQge0FxdWFzY2FwZX0gZnJvbSAnLi9BcXVhc2NhcGUnXHJcbmV4cG9ydCB7QXF1YXNjYXBlSW1hZ2V9IGZyb20gJy4vQXF1YXNjYXBlSW1hZ2UnXHJcbmV4cG9ydCB7QXF1YXNjYXBlVGFnfSBmcm9tICcuL0FxdWFzY2FwZVRhZydcclxuZXhwb3J0IHtDTzJ9IGZyb20gJy4vQ08yJ1xyXG5leHBvcnQge0NvbW1lbnR9IGZyb20gJy4vQ29tbWVudCdcclxuZXhwb3J0IHtGaWx0ZXJ9IGZyb20gJy4vRmlsdGVyJ1xyXG5leHBvcnQge0ZvbGxvd30gZnJvbSAnLi9Gb2xsb3cnXHJcbmV4cG9ydCB7SGFyZHNjYXBlfSBmcm9tICcuL0hhcmRzY2FwZSdcclxuZXhwb3J0IHtMaWdodH0gZnJvbSAnLi9MaWdodCdcclxuZXhwb3J0IHtMaWtlfSBmcm9tICcuL0xpa2UnXHJcbmV4cG9ydCB7TGl2ZXN0b2NrfSBmcm9tICcuL0xpdmVzdG9jaydcclxuZXhwb3J0IHtQbGFudH0gZnJvbSAnLi9QbGFudCdcclxuZXhwb3J0IHtTb2NpYWxMb2dpbn0gZnJvbSAnLi9Tb2NpYWxMb2dpbidcclxuZXhwb3J0IHtTdWJzdHJhdGV9IGZyb20gJy4vU3Vic3RyYXRlJ1xyXG5leHBvcnQge1RhZ30gZnJvbSAnLi9UYWcnXHJcbmV4cG9ydCB7VGFua30gZnJvbSAnLi9UYW5rJ1xyXG5leHBvcnQge1VzZXJ9IGZyb20gJy4vVXNlcidcclxuZXhwb3J0IHtWaXNpdG9yfSBmcm9tICcuL1Zpc2l0b3InXHJcbmV4cG9ydCB7RW1haWxDb25maXJtYXRpb259IGZyb20gJy4vRW1haWxDb25maXJtYXRpb24nXHJcbmV4cG9ydCAqIGZyb20gJy4vbWFueVRvTWFueSdcclxuIiwiaW1wb3J0IHtUYWJsZSwgQ29sdW1uLCBNb2RlbCwgRm9yZWlnbktleX0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcbmltcG9ydCB7QXF1YXNjYXBlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlJ1xyXG5pbXBvcnQge0FkZGl0aXZlfSBmcm9tICdkYi9tb2RlbHMvQWRkaXRpdmUnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZUFkZGl0aXZlIGV4dGVuZHMgTW9kZWw8QXF1YXNjYXBlQWRkaXRpdmU+IHtcclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEFxdWFzY2FwZSlcclxuICAgIEBDb2x1bW5cclxuICAgIGFxdWFzY2FwZUlkOiBudW1iZXJcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBBZGRpdGl2ZSlcclxuICAgIEBDb2x1bW5cclxuICAgIGFkZGl0aXZlSWQ6IG51bWJlclxyXG59XHJcbiIsImltcG9ydCB7RmlsdGVyfSBmcm9tICdkYi9tb2RlbHMvRmlsdGVyJ1xyXG5pbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtBcXVhc2NhcGV9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGUnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZUZpbHRlciBleHRlbmRzIE1vZGVsPEFxdWFzY2FwZUZpbHRlcj4ge1xyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQXF1YXNjYXBlKVxyXG4gICAgQENvbHVtblxyXG4gICAgYXF1YXNjYXBlSWQ6IG51bWJlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEZpbHRlcilcclxuICAgIEBDb2x1bW5cclxuICAgIGZpbHRlcklkOiBudW1iZXJcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtBcXVhc2NhcGV9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGUnXHJcbmltcG9ydCB7SGFyZHNjYXBlfSBmcm9tICdkYi9tb2RlbHMvSGFyZHNjYXBlJ1xyXG5cclxuQFRhYmxlXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGVIYXJkc2NhcGUgZXh0ZW5kcyBNb2RlbDxBcXVhc2NhcGVIYXJkc2NhcGU+IHtcclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEFxdWFzY2FwZSlcclxuICAgIEBDb2x1bW5cclxuICAgIGFxdWFzY2FwZUlkOiBudW1iZXJcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBIYXJkc2NhcGUpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBoYXJkc2NhcGVJZDogbnVtYmVyXHJcbn1cclxuIiwiaW1wb3J0IHtMaWdodH0gZnJvbSAnZGIvbW9kZWxzL0xpZ2h0J1xyXG5pbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtBcXVhc2NhcGV9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGUnXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZUxpZ2h0IGV4dGVuZHMgTW9kZWw8QXF1YXNjYXBlTGlnaHQ+IHtcclxuICAgIEBGb3JlaWduS2V5KCgpID0+IEFxdWFzY2FwZSlcclxuICAgIEBDb2x1bW5cclxuICAgIGFxdWFzY2FwZUlkOiBudW1iZXJcclxuXHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBMaWdodClcclxuICAgIEBDb2x1bW5cclxuICAgIGxpZ2h0SWQ6IG51bWJlclxyXG59XHJcbiIsImltcG9ydCB7VGFibGUsIENvbHVtbiwgTW9kZWwsIEZvcmVpZ25LZXl9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtMaXZlc3RvY2t9IGZyb20gJ2RiL21vZGVscy9MaXZlc3RvY2snXHJcblxyXG5AVGFibGVcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZUxpdmVzdG9jayBleHRlbmRzIE1vZGVsPEFxdWFzY2FwZUxpdmVzdG9jaz4ge1xyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQXF1YXNjYXBlKVxyXG4gICAgQENvbHVtblxyXG4gICAgYXF1YXNjYXBlSWQ6IG51bWJlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IExpdmVzdG9jaylcclxuICAgIEBDb2x1bW5cclxuICAgIGxpdmVzdG9ja0lkOiBudW1iZXJcclxufVxyXG4iLCJpbXBvcnQge1RhYmxlLCBDb2x1bW4sIE1vZGVsLCBGb3JlaWduS2V5fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCdcclxuaW1wb3J0IHtBcXVhc2NhcGV9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGUnXHJcbmltcG9ydCB7UGxhbnR9IGZyb20gJ2RiL21vZGVscy9QbGFudCdcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQXF1YXNjYXBlUGxhbnQgZXh0ZW5kcyBNb2RlbDxBcXVhc2NhcGVQbGFudD4ge1xyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQXF1YXNjYXBlKVxyXG4gICAgQENvbHVtblxyXG4gICAgYXF1YXNjYXBlSWQ6IG51bWJlclxyXG5cclxuICAgIEBGb3JlaWduS2V5KCgpID0+IFBsYW50KVxyXG4gICAgQENvbHVtblxyXG4gICAgcGxhbnRJZDogbnVtYmVyXHJcbn1cclxuIiwiaW1wb3J0IHtUYWJsZSwgQ29sdW1uLCBNb2RlbCwgRm9yZWlnbktleX0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnXHJcbmltcG9ydCB7QXF1YXNjYXBlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlJ1xyXG5pbXBvcnQge1N1YnN0cmF0ZX0gZnJvbSAnZGIvbW9kZWxzL1N1YnN0cmF0ZSdcclxuXHJcbkBUYWJsZVxyXG5leHBvcnQgY2xhc3MgQXF1YXNjYXBlU3Vic3RyYXRlIGV4dGVuZHMgTW9kZWw8QXF1YXNjYXBlU3Vic3RyYXRlPiB7XHJcbiAgICBARm9yZWlnbktleSgoKSA9PiBBcXVhc2NhcGUpXHJcbiAgICBAQ29sdW1uXHJcbiAgICBhcXVhc2NhcGVJZDogbnVtYmVyXHJcblxyXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gU3Vic3RyYXRlKVxyXG4gICAgQENvbHVtblxyXG4gICAgc3Vic3RyYXRlSWQ6IG51bWJlclxyXG59XHJcbiIsImV4cG9ydCB7QXF1YXNjYXBlQWRkaXRpdmV9IGZyb20gJy4vQXF1YXNjYXBlQWRkaXRpdmUnXHJcbmV4cG9ydCB7QXF1YXNjYXBlRmlsdGVyfSBmcm9tICcuL0FxdWFzY2FwZUZpbHRlcidcclxuZXhwb3J0IHtBcXVhc2NhcGVIYXJkc2NhcGV9IGZyb20gJy4vQXF1YXNjYXBlSGFyZHNjYXBlJ1xyXG5leHBvcnQge0FxdWFzY2FwZUxpZ2h0fSBmcm9tICcuL0FxdWFzY2FwZUxpZ2h0J1xyXG5leHBvcnQge0FxdWFzY2FwZUxpdmVzdG9ja30gZnJvbSAnLi9BcXVhc2NhcGVMaXZlc3RvY2snXHJcbmV4cG9ydCB7QXF1YXNjYXBlUGxhbnR9IGZyb20gJy4vQXF1YXNjYXBlUGxhbnQnXHJcbmV4cG9ydCB7QXF1YXNjYXBlU3Vic3RyYXRlfSBmcm9tICcuL0FxdWFzY2FwZVN1YnN0cmF0ZSciLCJpbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuXHJcbmltcG9ydCB7QmFzZVJlcG9zaXRvcnksIEVxdWlwbWVudFJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0FkZGl0aXZlfSBmcm9tICdkYi9tb2RlbHMvQWRkaXRpdmUnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFkZGl0aXZlUmVwb3NpdG9yeUludGVyZmFjZSBleHRlbmRzIEVxdWlwbWVudFJlcG9zaXRvcnlJbnRlcmZhY2U8QWRkaXRpdmU+IHtcclxuICAgIGdldEFkZGl0aXZlczogKCkgPT4gQmx1ZWJpcmQ8QWRkaXRpdmVbXT5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQWRkaXRpdmVSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8QWRkaXRpdmU+XHJcbiAgICBpbXBsZW1lbnRzIEFkZGl0aXZlUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBZGRpdGl2ZSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRBZGRpdGl2ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7d2hlcmU6IHtwcmVkZWZpbmVkOiB0cnVlfX0pXHJcbiAgICB9XHJcblxyXG4gICAgZmluZEJ5SWQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRPbmUoe3doZXJlOiB7aWR9fSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcXVpcG1lbnQobW9kZWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7bW9kZWx9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUVxdWlwbWVudChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSh7d2hlcmU6IHtpZH19KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuaW1wb3J0IHtJbmNsdWRlYWJsZSwgT3JkZXIsIFdoZXJlT3B0aW9uc30gZnJvbSAnc2VxdWVsaXplL3R5cGVzJ1xyXG5pbXBvcnQge2xpdGVyYWx9IGZyb20gJ3NlcXVlbGl6ZSdcclxuaW1wb3J0IHtPcH0gZnJvbSAnc2VxdWVsaXplJ1xyXG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcblxyXG5pbXBvcnQge0FxdWFzY2FwZX0gZnJvbSAnZGIvbW9kZWxzL0FxdWFzY2FwZSdcclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUltYWdlfSBmcm9tICdkYi9tb2RlbHMvQXF1YXNjYXBlSW1hZ2UnXHJcbmltcG9ydCB7UGFnaW5hdGlvbn0gZnJvbSAnYXBpL2dlbmVyYXRlZC90eXBlcydcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5SW50ZXJmYWNlPEFxdWFzY2FwZT4ge1xyXG4gICAgZ2V0QXF1YXNjYXBlczogKFxyXG4gICAgICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb24sXHJcbiAgICAgICAgdXNlcklkPzogbnVtYmVyLFxyXG4gICAgICAgIHJhbmRvbT86IGJvb2xlYW4sXHJcbiAgICAgICAgaW5jbHVkZT86IEluY2x1ZGVhYmxlW11cclxuICAgICkgPT4gUHJvbWlzZTx7cm93czogQXF1YXNjYXBlW107IGNvdW50OiBudW1iZXJ9PlxyXG5cclxuICAgIGdldEZlYXR1cmVkQXF1YXNjYXBlOiAoaW5jbHVkZT86IEluY2x1ZGVhYmxlW10pID0+IEJsdWViaXJkPEFxdWFzY2FwZSB8IG51bGw+XHJcblxyXG4gICAgZ2V0VHJlbmRpbmdBcXVhc2NhcGVzOiAoXHJcbiAgICAgICAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbixcclxuICAgICAgICBpbmNsdWRlPzogSW5jbHVkZWFibGVbXVxyXG4gICAgKSA9PiBCbHVlYmlyZDxBcXVhc2NhcGVbXT5cclxuXHJcbiAgICBnZXRBcXVhc2NhcGVCeUlkOiAoaWQ6IG51bWJlciwgaW5jbHVkZT86IEluY2x1ZGVhYmxlW10pID0+IEJsdWViaXJkPEFxdWFzY2FwZSB8IG51bGw+XHJcblxyXG4gICAgZ2V0QXF1YXNjYXBlSW1hZ2VzOiAoYXF1YXNjYXBlSWQ6IG51bWJlcikgPT4gQmx1ZWJpcmQ8QXF1YXNjYXBlSW1hZ2VbXT5cclxuXHJcbiAgICB1cGRhdGVBcXVhc2NhcGVUaXRsZTogKGlkOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcpID0+IEJsdWViaXJkPFtudW1iZXIsIEFxdWFzY2FwZVtdXT5cclxuXHJcbiAgICB1cGRhdGVBcXVhc2NhcGVNYWluSW1hZ2U6IChcclxuICAgICAgICBpZDogbnVtYmVyLFxyXG4gICAgICAgIGltYWdlUHVibGljSWQ6IHN0cmluZyxcclxuICAgICAgICBpbWFnZVVybDogc3RyaW5nXHJcbiAgICApID0+IEJsdWViaXJkPFtudW1iZXIsIEFxdWFzY2FwZVtdXT5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXF1YXNjYXBlUmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PEFxdWFzY2FwZT5cclxuICAgIGltcGxlbWVudHMgQXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBcXVhc2NhcGUpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0QXF1YXNjYXBlcyhcclxuICAgICAgICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uLFxyXG4gICAgICAgIHVzZXJJZD86IG51bWJlcixcclxuICAgICAgICByYW5kb20/OiBib29sZWFuLFxyXG4gICAgICAgIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCB3aGVyZTogV2hlcmVPcHRpb25zID0ge31cclxuICAgICAgICBjb25zdCByYW5kb21PcmRlcjogT3JkZXIgPSBsaXRlcmFsKCdyYW5kb20oKScpXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFnaW5hdGlvbi5vZmZzZXQgfHwgMFxyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRPcmRlcjogT3JkZXIgPSBbXHJcbiAgICAgICAgICAgIFsnY3JlYXRlZEF0JywgJ0RFU0MnXSxcclxuICAgICAgICAgICAgWydpZCcsICdERVNDJ10sXHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICBpZiAodXNlcklkKSB7XHJcbiAgICAgICAgICAgIHdoZXJlLnVzZXJJZCA9IHVzZXJJZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLmNvdW50KHt3aGVyZX0pXHJcblxyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uLmN1cnNvcikge1xyXG4gICAgICAgICAgICB3aGVyZS5jcmVhdGVkQXQgPSB7XHJcbiAgICAgICAgICAgICAgICBbT3AubHRdOiBuZXcgRGF0ZShOdW1iZXIocGFnaW5hdGlvbi5jdXJzb3IpKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZmluZEFsbCh7XHJcbiAgICAgICAgICAgIHdoZXJlLFxyXG4gICAgICAgICAgICBpbmNsdWRlLFxyXG4gICAgICAgICAgICBvcmRlcjogcmFuZG9tID8gcmFuZG9tT3JkZXIgOiBkZWZhdWx0T3JkZXIsXHJcbiAgICAgICAgICAgIGxpbWl0OiBwYWdpbmF0aW9uLmxpbWl0LFxyXG4gICAgICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHtyb3dzLCBjb3VudH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUcmVuZGluZ0FxdWFzY2FwZXMocGFnaW5hdGlvbjogUGFnaW5hdGlvbiwgaW5jbHVkZT86IEluY2x1ZGVhYmxlW10pIHtcclxuICAgICAgICBjb25zdCB3aGVyZTogV2hlcmVPcHRpb25zID0ge3RyZW5kaW5nOiB0cnVlfVxyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbi5jdXJzb3IpIHtcclxuICAgICAgICAgICAgd2hlcmUuY3JlYXRlZEF0ID0ge1xyXG4gICAgICAgICAgICAgICAgW09wLmx0XTogbmV3IERhdGUoTnVtYmVyKHBhZ2luYXRpb24uY3Vyc29yKSksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xyXG4gICAgICAgICAgICB3aGVyZSxcclxuICAgICAgICAgICAgaW5jbHVkZSxcclxuICAgICAgICAgICAgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLFxyXG4gICAgICAgICAgICBsaW1pdDogcGFnaW5hdGlvbi5saW1pdCxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZlYXR1cmVkQXF1YXNjYXBlKGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE9uZSh7d2hlcmU6IHtmZWF0dXJlZDogdHJ1ZX0sIGluY2x1ZGV9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFxdWFzY2FwZUJ5SWQoaWQ6IG51bWJlciwgaW5jbHVkZT86IEluY2x1ZGVhYmxlW10pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kT25lKHt3aGVyZToge2lkfSwgaW5jbHVkZX0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXF1YXNjYXBlSW1hZ2VzKGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gQXF1YXNjYXBlSW1hZ2UuZmluZEFsbCh7d2hlcmU6IHthcXVhc2NhcGVJZH19KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFxdWFzY2FwZVRpdGxlKGlkOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoe3RpdGxlfSwge3doZXJlOiB7aWR9LCByZXR1cm5pbmc6IHRydWV9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFxdWFzY2FwZU1haW5JbWFnZShpZDogbnVtYmVyLCBtYWluSW1hZ2VQdWJsaWNJZDogc3RyaW5nLCBtYWluSW1hZ2VVcmw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWFpbkltYWdlUHVibGljSWQsXHJcbiAgICAgICAgICAgICAgICBtYWluSW1hZ2VVcmwsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuXHJcbmltcG9ydCB7QmFzZVJlcG9zaXRvcnksIEVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0FxdWFzY2FwZUFkZGl0aXZlfSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVBZGRpdGl2ZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXF1YXNjYXBlQWRkaXRpdmVSZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICBleHRlbmRzIEVxdWlwbWVudEFxdWFzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2U8QXF1YXNjYXBlQWRkaXRpdmU+IHt9XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGVBZGRpdGl2ZVJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxBcXVhc2NhcGVBZGRpdGl2ZT5cclxuICAgIGltcGxlbWVudHMgQXF1YXNjYXBlQWRkaXRpdmVSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEFxdWFzY2FwZUFkZGl0aXZlKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEFkZGl0aXZlRm9yQXF1YXNjYXBlKGFkZGl0aXZlSWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7YWRkaXRpdmVJZCwgYXF1YXNjYXBlSWR9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEVxdWlwbWVudEZvckFxdWFzY2FwZShhZGRpdGl2ZUlkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe2FkZGl0aXZlSWQsIGFxdWFzY2FwZUlkfSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFcXVpcG1lbnRGcm9tQXF1YXNjYXBlKGFkZGl0aXZlSWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3koe3doZXJlOiB7YWRkaXRpdmVJZCwgYXF1YXNjYXBlSWR9fSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQmFzZSdcclxuaW1wb3J0IHtBcXVhc2NhcGVGaWx0ZXJ9IGZyb20gJ2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZUZpbHRlcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXF1YXNjYXBlRmlsdGVyUmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgZXh0ZW5kcyBFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlPEFxdWFzY2FwZUZpbHRlcj4ge31cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZUZpbHRlclJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxBcXVhc2NhcGVGaWx0ZXI+XHJcbiAgICBpbXBsZW1lbnRzIEFxdWFzY2FwZUZpbHRlclJlcG9zaXRvcnlJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoQXF1YXNjYXBlRmlsdGVyKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEZpbHRlckZvckFxdWFzY2FwZShmaWx0ZXJJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHtmaWx0ZXJJZCwgYXF1YXNjYXBlSWR9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEVxdWlwbWVudEZvckFxdWFzY2FwZShmaWx0ZXJJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHtmaWx0ZXJJZCwgYXF1YXNjYXBlSWR9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUVxdWlwbWVudEZyb21BcXVhc2NhcGUoZmlsdGVySWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3koe3doZXJlOiB7ZmlsdGVySWQsIGFxdWFzY2FwZUlkfX0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlSGFyZHNjYXBlfSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVIYXJkc2NhcGUnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFxdWFzY2FwZUhhcmRzY2FwZVJlcG9zaXRvcnlJbnRlcmZhY2UgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeUludGVyZmFjZTxBcXVhc2NhcGVIYXJkc2NhcGU+IHtcclxuICAgIGFkZEhhcmRzY2FwZUZvckFxdWFzY2FwZShoYXJkc2NhcGVJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKTogQmx1ZWJpcmQ8QXF1YXNjYXBlSGFyZHNjYXBlPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGVIYXJkc2NhcGVSZXBvc2l0b3J5XHJcbiAgICBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PEFxdWFzY2FwZUhhcmRzY2FwZT5cclxuICAgIGltcGxlbWVudHMgQXF1YXNjYXBlSGFyZHNjYXBlUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBcXVhc2NhcGVIYXJkc2NhcGUpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkSGFyZHNjYXBlRm9yQXF1YXNjYXBlKGhhcmRzY2FwZUlkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe2hhcmRzY2FwZUlkLCBhcXVhc2NhcGVJZH0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlSW1hZ2V9IGZyb20gJ2RiL21vZGVscy9BcXVhc2NhcGVJbWFnZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXF1YXNjYXBlSW1hZ2VSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8QXF1YXNjYXBlSW1hZ2U+IHtcclxuICAgIGFkZEltYWdlKGFxdWFzY2FwZUlkOiBudW1iZXIsIHB1YmxpY0lkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogQmx1ZWJpcmQ8QXF1YXNjYXBlSW1hZ2U+XHJcblxyXG4gICAgcmVtb3ZlSW1hZ2UoYXF1YXNjYXBlSWQ6IG51bWJlciwgaW1hZ2VJZDogbnVtYmVyKTogQmx1ZWJpcmQ8bnVtYmVyPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGVJbWFnZVJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxBcXVhc2NhcGVJbWFnZT5cclxuICAgIGltcGxlbWVudHMgQXF1YXNjYXBlSW1hZ2VSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEFxdWFzY2FwZUltYWdlKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEltYWdlKGFxdWFzY2FwZUlkOiBudW1iZXIsIHB1YmxpY0lkOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHthcXVhc2NhcGVJZCwgcHVibGljSWQsIHVybH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSW1hZ2UoYXF1YXNjYXBlSWQ6IG51bWJlciwgaW1hZ2VJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSh7d2hlcmU6IHthcXVhc2NhcGVJZCwgaWQ6IGltYWdlSWR9fSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQmFzZSdcclxuaW1wb3J0IHtBcXVhc2NhcGVMaWdodH0gZnJvbSAnZGIvbW9kZWxzL21hbnlUb01hbnkvQXF1YXNjYXBlTGlnaHQnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFxdWFzY2FwZUxpZ2h0UmVwb3NpdG9yeUludGVyZmFjZVxyXG4gICAgZXh0ZW5kcyBFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlPEFxdWFzY2FwZUxpZ2h0PiB7fVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXF1YXNjYXBlTGlnaHRSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8QXF1YXNjYXBlTGlnaHQ+XHJcbiAgICBpbXBsZW1lbnRzIEFxdWFzY2FwZUxpZ2h0UmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBcXVhc2NhcGVMaWdodClcclxuICAgIH1cclxuXHJcbiAgICBhZGRMaWdodEZvckFxdWFzY2FwZShsaWdodElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe2xpZ2h0SWQsIGFxdWFzY2FwZUlkfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcXVpcG1lbnRGb3JBcXVhc2NhcGUobGlnaHRJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHtsaWdodElkLCBhcXVhc2NhcGVJZH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRXF1aXBtZW50RnJvbUFxdWFzY2FwZShsaWdodElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95KHt3aGVyZToge2xpZ2h0SWQsIGFxdWFzY2FwZUlkfX0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlTGl2ZXN0b2NrfSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVMaXZlc3RvY2snXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFxdWFzY2FwZUxpdmVzdG9ja1JlcG9zaXRvcnlJbnRlcmZhY2UgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeUludGVyZmFjZTxBcXVhc2NhcGVMaXZlc3RvY2s+IHtcclxuICAgIGFkZExpdmVzdG9ja0ZvckFxdWFzY2FwZShsaXZlc3RvY2tJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKTogQmx1ZWJpcmQ8QXF1YXNjYXBlTGl2ZXN0b2NrPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGVMaXZlc3RvY2tSZXBvc2l0b3J5XHJcbiAgICBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PEFxdWFzY2FwZUxpdmVzdG9jaz5cclxuICAgIGltcGxlbWVudHMgQXF1YXNjYXBlTGl2ZXN0b2NrUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBcXVhc2NhcGVMaXZlc3RvY2spXHJcbiAgICB9XHJcblxyXG4gICAgYWRkTGl2ZXN0b2NrRm9yQXF1YXNjYXBlKGxpdmVzdG9ja0lkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe2xpdmVzdG9ja0lkLCBhcXVhc2NhcGVJZH0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlUGxhbnR9IGZyb20gJ2RiL21vZGVscy9tYW55VG9NYW55L0FxdWFzY2FwZVBsYW50J1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBcXVhc2NhcGVQbGFudFJlcG9zaXRvcnlJbnRlcmZhY2UgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeUludGVyZmFjZTxBcXVhc2NhcGVQbGFudD4ge1xyXG4gICAgYWRkUGxhbnRGb3JBcXVhc2NhcGUocGxhbnRJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKTogQmx1ZWJpcmQ8QXF1YXNjYXBlUGxhbnQ+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFxdWFzY2FwZVBsYW50UmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PEFxdWFzY2FwZVBsYW50PlxyXG4gICAgaW1wbGVtZW50cyBBcXVhc2NhcGVQbGFudFJlcG9zaXRvcnlJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoQXF1YXNjYXBlUGxhbnQpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkUGxhbnRGb3JBcXVhc2NhcGUocGxhbnRJZDogbnVtYmVyLCBhcXVhc2NhcGVJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHtwbGFudElkLCBhcXVhc2NhcGVJZH0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5cclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgRXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7QXF1YXNjYXBlU3Vic3RyYXRlfSBmcm9tICdkYi9tb2RlbHMvbWFueVRvTWFueS9BcXVhc2NhcGVTdWJzdHJhdGUnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFxdWFzY2FwZVN1YnN0cmF0ZVJlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgIGV4dGVuZHMgRXF1aXBtZW50QXF1YXNjYXBlUmVwb3NpdG9yeUludGVyZmFjZTxBcXVhc2NhcGVTdWJzdHJhdGU+IHt9XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcXVhc2NhcGVTdWJzdHJhdGVSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8QXF1YXNjYXBlU3Vic3RyYXRlPlxyXG4gICAgaW1wbGVtZW50cyBBcXVhc2NhcGVTdWJzdHJhdGVSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEFxdWFzY2FwZVN1YnN0cmF0ZSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdWJzdHJhdGVGb3JBcXVhc2NhcGUoc3Vic3RyYXRlSWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7c3Vic3RyYXRlSWQsIGFxdWFzY2FwZUlkfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcXVpcG1lbnRGb3JBcXVhc2NhcGUoc3Vic3RyYXRlSWQ6IG51bWJlciwgYXF1YXNjYXBlSWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7c3Vic3RyYXRlSWQsIGFxdWFzY2FwZUlkfSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFcXVpcG1lbnRGcm9tQXF1YXNjYXBlKHN1YnN0cmF0ZUlkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95KHt3aGVyZToge3N1YnN0cmF0ZUlkLCBhcXVhc2NhcGVJZH19KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7TW9kZWx9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0J1xyXG5pbXBvcnQge05vbkFic3RyYWN0fSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdC9kaXN0L21vZGVsJ1xyXG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7XHJcbiAgICBCdWxrQ3JlYXRlT3B0aW9ucyxcclxuICAgIENvdW50T3B0aW9ucyxcclxuICAgIENyZWF0ZU9wdGlvbnMsXHJcbiAgICBEZXN0cm95T3B0aW9ucyxcclxuICAgIEZpbmRBbmRDb3VudE9wdGlvbnMsXHJcbiAgICBGaW5kT3B0aW9ucyxcclxuICAgIEZpbmRPckNyZWF0ZU9wdGlvbnMsXHJcbiAgICBQcm9taXNlLFxyXG4gICAgVXBkYXRlT3B0aW9ucyxcclxufSBmcm9tICdzZXF1ZWxpemUnXHJcblxyXG50eXBlIFN0YXRpY01lbWJlcnMgPSBOb25BYnN0cmFjdDx0eXBlb2YgTW9kZWw+XHJcbnR5cGUgQ29uc3RydWN0b3I8VD4gPSBuZXcgKCkgPT4gVFxyXG50eXBlIE1vZGVsVHlwZTxUPiA9IENvbnN0cnVjdG9yPFQ+ICYgU3RhdGljTWVtYmVyc1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYXNlUmVwb3NpdG9yeUludGVyZmFjZTxUPiB7XHJcbiAgICBjcmVhdGUodmFsdWVzOiBvYmplY3QsIG9wdGlvbnM/OiBDcmVhdGVPcHRpb25zICYge3JldHVybmluZzogYm9vbGVhbn0pOiBCbHVlYmlyZDxUPlxyXG5cclxuICAgIGZpbmRPbmUob3B0aW9uczogRmluZE9wdGlvbnMpOiBCbHVlYmlyZDxUIHwgbnVsbD5cclxuXHJcbiAgICBmaW5kQWxsKG9wdGlvbnM/OiBGaW5kT3B0aW9ucyk6IFByb21pc2U8VFtdPlxyXG5cclxuICAgIHVwZGF0ZSh2YWx1ZXM6IG9iamVjdCwgb3B0aW9uczogVXBkYXRlT3B0aW9ucyk6IFByb21pc2U8W251bWJlciwgVFtdXT5cclxuXHJcbiAgICBkZXN0cm95KG9wdGlvbnM/OiBEZXN0cm95T3B0aW9ucyk6IFByb21pc2U8bnVtYmVyPlxyXG5cclxuICAgIGJ1bGtDcmVhdGUocmVjb3Jkczogb2JqZWN0W10sIG9wdGlvbnM/OiBCdWxrQ3JlYXRlT3B0aW9ucyk6IFByb21pc2U8VFtdPlxyXG5cclxuICAgIGZpbmRBbmRDb3VudEFsbChvcHRpb25zPzogRmluZEFuZENvdW50T3B0aW9ucyk6IFByb21pc2U8e3Jvd3M6IFRbXTsgY291bnQ6IG51bWJlcn0+XHJcblxyXG4gICAgZmluZE9yQ3JlYXRlKG9wdGlvbnM6IEZpbmRPckNyZWF0ZU9wdGlvbnMpOiBQcm9taXNlPFtULCBib29sZWFuXT5cclxuXHJcbiAgICBjb3VudChvcHRpb25zPzogQ291bnRPcHRpb25zKTogUHJvbWlzZTxudW1iZXI+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUmVwb3NpdG9yeTxUIGV4dGVuZHMgTW9kZWw8VD4+IGltcGxlbWVudHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8VD4ge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWxhdGlvbjogTW9kZWxUeXBlPFQ+KSB7fVxyXG5cclxuICAgIGNyZWF0ZSh2YWx1ZXM6IG9iamVjdCwgb3B0aW9ucz86IENyZWF0ZU9wdGlvbnMgJiB7cmV0dXJuaW5nOiBib29sZWFufSk6IEJsdWViaXJkPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi5jcmVhdGU8VD4odmFsdWVzLCBvcHRpb25zKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRPbmUob3B0aW9uczogRmluZE9wdGlvbnMpOiBCbHVlYmlyZDxUIHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9uLmZpbmRPbmUob3B0aW9ucylcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQWxsKG9wdGlvbnM/OiBGaW5kT3B0aW9ucyk6IFByb21pc2U8VFtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpb24uZmluZEFsbChvcHRpb25zKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRBbmRDb3VudEFsbChvcHRpb25zPzogRmluZEFuZENvdW50T3B0aW9ucyk6IFByb21pc2U8e3Jvd3M6IFRbXTsgY291bnQ6IG51bWJlcn0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi5maW5kQW5kQ291bnRBbGwob3B0aW9ucylcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodmFsdWVzOiBvYmplY3QsIG9wdGlvbnM6IFVwZGF0ZU9wdGlvbnMpOiBQcm9taXNlPFtudW1iZXIsIFRbXV0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi51cGRhdGUodmFsdWVzLCBvcHRpb25zKVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3kob3B0aW9ucz86IERlc3Ryb3lPcHRpb25zKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi5kZXN0cm95KG9wdGlvbnMpXHJcbiAgICB9XHJcblxyXG4gICAgYnVsa0NyZWF0ZShyZWNvcmRzOiBvYmplY3RbXSwgb3B0aW9ucz86IEJ1bGtDcmVhdGVPcHRpb25zKTogUHJvbWlzZTxUW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGlvbi5idWxrQ3JlYXRlKHJlY29yZHMsIG9wdGlvbnMpXHJcbiAgICB9XHJcblxyXG4gICAgZmluZE9yQ3JlYXRlKG9wdGlvbnM6IEZpbmRPckNyZWF0ZU9wdGlvbnMpOiBQcm9taXNlPFtULCBib29sZWFuXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9uLmZpbmRPckNyZWF0ZShvcHRpb25zKVxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50KG9wdGlvbnM/OiBDb3VudE9wdGlvbnMpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9uLmNvdW50KG9wdGlvbnMpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXF1aXBtZW50UmVwb3NpdG9yeUludGVyZmFjZTxUPiBleHRlbmRzIEJhc2VSZXBvc2l0b3J5SW50ZXJmYWNlPFQ+IHtcclxuICAgIGFkZEVxdWlwbWVudChtb2RlbDogc3RyaW5nKTogUHJvbWlzZTxUPlxyXG4gICAgcmVtb3ZlRXF1aXBtZW50KGVxdWlwbWVudElkOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj5cclxuICAgIGZpbmRCeUlkKGlkOiBudW1iZXIpOiBCbHVlYmlyZDxUIHwgbnVsbD5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFcXVpcG1lbnRBcXVhc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlPFQ+IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8VD4ge1xyXG4gICAgYWRkRXF1aXBtZW50Rm9yQXF1YXNjYXBlKGVxdWlwbWVudElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBQcm9taXNlPFQ+XHJcbiAgICByZW1vdmVFcXVpcG1lbnRGcm9tQXF1YXNjYXBlKGVxdWlwbWVudElkOiBudW1iZXIsIGFxdWFzY2FwZUlkOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj5cclxufVxyXG4iLCJpbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgUHJvdmlkZXJTY29wZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuaW1wb3J0ICogYXMgRGF0YUxvYWRlciBmcm9tICdkYXRhbG9hZGVyJ1xyXG5cclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0JyYW5kfSBmcm9tICdkYi9tb2RlbHMvQnJhbmQnXHJcbmltcG9ydCB7R3JhcGhRTEhlbHBlcn0gZnJvbSAndXRpbHMvR3JhcGhRTEhlbHBlcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQnJhbmRSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8QnJhbmQ+IHtcclxuICAgIGdldEJyYW5kczogKCkgPT4gQmx1ZWJpcmQ8QnJhbmRbXT5cclxuICAgIGZpbmRCcmFuZEJ5SWQ6IChpZDogbnVtYmVyKSA9PiBQcm9taXNlPEJyYW5kIHwgbnVsbD5cclxufVxyXG5cclxuQEluamVjdGFibGUoe3Njb3BlOiBQcm92aWRlclNjb3BlLlNlc3Npb259KVxyXG5leHBvcnQgY2xhc3MgQnJhbmRSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8QnJhbmQ+IGltcGxlbWVudHMgQnJhbmRSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGJyYW5kTG9hZGVyOiBEYXRhTG9hZGVyPG51bWJlciwgQnJhbmQ+XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoQnJhbmQpXHJcbiAgICAgICAgdGhpcy5icmFuZExvYWRlciA9IG5ldyBEYXRhTG9hZGVyKHRoaXMuYmF0Y2hMb2FkQnJhbmRzKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJyYW5kcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kQWxsKHt3aGVyZToge3ByZWRlZmluZWQ6IHRydWV9fSlcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQnJhbmRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5icmFuZExvYWRlci5sb2FkKGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmF0Y2hMb2FkQnJhbmRzID0gYXN5bmMgKGlkczogbnVtYmVyW10pID0+IHtcclxuICAgICAgICBjb25zdCBicmFuZHMgPSBhd2FpdCB0aGlzLmZpbmRBbGwoe3doZXJlOiB7aWQ6IGlkc319KVxyXG4gICAgICAgIHJldHVybiBHcmFwaFFMSGVscGVyLmVuc3VyZU9yZGVyKHtcclxuICAgICAgICAgICAgZG9jczogYnJhbmRzLFxyXG4gICAgICAgICAgICBrZXlzOiBpZHMsXHJcbiAgICAgICAgICAgIHByb3A6ICdpZCcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5cclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0NvbW1lbnR9IGZyb20gJ2RiL21vZGVscy9Db21tZW50J1xyXG5pbXBvcnQge0luY2x1ZGVhYmxlfSBmcm9tICdzZXF1ZWxpemUvdHlwZXMnXHJcbmltcG9ydCB7VXNlcklucHV0RXJyb3J9IGZyb20gJ2Fwb2xsby1zZXJ2ZXInXHJcblxyXG5leHBvcnQgZW51bSBDb21tZW50RW50aXR5VHlwZSB7XHJcbiAgICBBUVVBU0NBUEUgPSAnQVFVQVNDQVBFJyxcclxuICAgIElNQUdFID0gJ0lNQUdFJyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBZGRDb21tZW50QXJncyB7XHJcbiAgICBjb250ZW50OiBzdHJpbmdcclxuICAgIHVzZXJJZDogbnVtYmVyXHJcbiAgICBlbnRpdHlUeXBlOiBDb21tZW50RW50aXR5VHlwZVxyXG4gICAgZW50aXR5SWQ6IG51bWJlclxyXG4gICAgcGFyZW50Q29tbWVudElkPzogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWVudFJlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8Q29tbWVudD4ge1xyXG4gICAgZ2V0Q29tbWVudHMoXHJcbiAgICAgICAgZW50aXR5VHlwZTogQ29tbWVudEVudGl0eVR5cGUsXHJcbiAgICAgICAgZW50aXR5SWQ6IG51bWJlcixcclxuICAgICAgICBpbmNsdWRlPzogSW5jbHVkZWFibGVbXVxyXG4gICAgKTogQmx1ZWJpcmQ8Q29tbWVudFtdPlxyXG5cclxuICAgIGFkZENvbW1lbnQoZGF0YTogQWRkQ29tbWVudEFyZ3MpOiBCbHVlYmlyZDxDb21tZW50PlxyXG5cclxuICAgIHJlbW92ZUNvbW1lbnQoaWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIpOiBCbHVlYmlyZDxDb21tZW50PlxyXG59XHJcblxyXG5jb25zdCBlbnRpdHlUb0ZpZWxkTWFwcGVyID0ge1xyXG4gICAgW0NvbW1lbnRFbnRpdHlUeXBlLkFRVUFTQ0FQRV06ICdhcXVhc2NhcGVJZCcsXHJcbiAgICBbQ29tbWVudEVudGl0eVR5cGUuSU1BR0VdOiAnYXF1YXNjYXBlSW1hZ2VJZCcsXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbW1lbnRSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8Q29tbWVudD4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoQ29tbWVudClcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21tZW50cyhcclxuICAgICAgICBlbnRpdHlUeXBlOiBDb21tZW50RW50aXR5VHlwZSxcclxuICAgICAgICBlbnRpdHlJZDogbnVtYmVyLFxyXG4gICAgICAgIGluY2x1ZGU/OiBJbmNsdWRlYWJsZVtdXHJcbiAgICApOiBCbHVlYmlyZDxDb21tZW50W10+IHtcclxuICAgICAgICBjb25zdCBlbnRpdHkgPSBlbnRpdHlUb0ZpZWxkTWFwcGVyW2VudGl0eVR5cGVdXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe1xyXG4gICAgICAgICAgICB3aGVyZToge1tlbnRpdHldOiBlbnRpdHlJZH0sXHJcbiAgICAgICAgICAgIGluY2x1ZGUsXHJcbiAgICAgICAgICAgIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbW1lbnQoZGF0YTogQWRkQ29tbWVudEFyZ3MpIHtcclxuICAgICAgICBjb25zdCBlbnRpdHkgPSBlbnRpdHlUb0ZpZWxkTWFwcGVyW2RhdGEuZW50aXR5VHlwZV1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgdXNlcklkOiBkYXRhLnVzZXJJZCxcclxuICAgICAgICAgICAgW2VudGl0eV06IGRhdGEuZW50aXR5SWQsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuY29udGVudCxcclxuICAgICAgICAgICAgcGFyZW50Q29tbWVudElkOiBkYXRhLnBhcmVudENvbW1lbnRJZCxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlbW92ZUNvbW1lbnQoaWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgdGhpcy5maW5kT25lKHt3aGVyZToge2lkLCB1c2VySWR9fSlcclxuXHJcbiAgICAgICAgaWYgKCFjb21tZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBVc2VySW5wdXRFcnJvcignQ29tbWVudCBub3QgZm91bmQuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtjb21tZW50LmRlc3Ryb3koKSwgdGhpcy5kZXN0cm95KHt3aGVyZToge3BhcmVudENvbW1lbnRJZDogY29tbWVudC5pZH19KV0pXHJcblxyXG4gICAgICAgIHJldHVybiBjb21tZW50XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50J1xyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gJ3V1aWQvdjQnXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7RW1haWxDb25maXJtYXRpb259IGZyb20gJ2RiL21vZGVscy9FbWFpbENvbmZpcm1hdGlvbidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxDb25maXJtYXRpb25SZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICBleHRlbmRzIEJhc2VSZXBvc2l0b3J5SW50ZXJmYWNlPEVtYWlsQ29uZmlybWF0aW9uPiB7XHJcbiAgICBjcmVhdGVDb25maXJtYXRpb25LZXkoZW1haWw6IHN0cmluZyk6IFByb21pc2U8RW1haWxDb25maXJtYXRpb24+XHJcbiAgICBjb25maXJtRW1haWwoZW1haWw6IHN0cmluZywgY29kZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPlxyXG4gICAgY29uZmlybWF0aW9uRXhwaXJlZChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFbWFpbENvbmZpcm1hdGlvblJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxFbWFpbENvbmZpcm1hdGlvbj5cclxuICAgIGltcGxlbWVudHMgRW1haWxDb25maXJtYXRpb25SZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEVtYWlsQ29uZmlybWF0aW9uKVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbmZpcm1hdGlvbktleShlbWFpbDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICAgIGNvZGU6IHV1aWQoKSxcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiBtb21lbnQoKS5hZGQoMywgJ2hvdXJzJyksXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjb25maXJtRW1haWwoZW1haWw6IHN0cmluZywgY29kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXNWYWxpZENvZGUgPSBhd2FpdCB0aGlzLmlzVmFsaWRDb2RlKGVtYWlsLCBjb2RlKVxyXG5cclxuICAgICAgICBpZiAoIWlzVmFsaWRDb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kZXN0cm95KHt3aGVyZToge2VtYWlsLCBjb2RlfX0pXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY29uZmlybWF0aW9uRXhwaXJlZChlbWFpbDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmlybWF0aW9uID0gYXdhaXQgdGhpcy5maW5kT25lKHt3aGVyZToge2VtYWlsfX0pXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oY29uZmlybWF0aW9uICYmIG1vbWVudChjb25maXJtYXRpb24uZXhwaXJlc0F0KS5pc0JlZm9yZShtb21lbnQoKSkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpc1ZhbGlkQ29kZShlbWFpbDogc3RyaW5nLCBjb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBjb25maXJtYXRpb24gPSBhd2FpdCB0aGlzLmZpbmRPbmUoe3doZXJlOiB7ZW1haWwsIGNvZGV9fSlcclxuICAgICAgICByZXR1cm4gQm9vbGVhbihjb25maXJtYXRpb24gJiYgbW9tZW50KGNvbmZpcm1hdGlvbi5leHBpcmVzQXQpLmlzQWZ0ZXIobW9tZW50KCkpKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5cclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgRXF1aXBtZW50UmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7RmlsdGVyfSBmcm9tICdkYi9tb2RlbHMvRmlsdGVyJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgRXF1aXBtZW50UmVwb3NpdG9yeUludGVyZmFjZTxGaWx0ZXI+IHtcclxuICAgIGdldEZpbHRlcnM6ICgpID0+IEJsdWViaXJkPEZpbHRlcltdPlxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8RmlsdGVyPiBpbXBsZW1lbnRzIEZpbHRlclJlcG9zaXRvcnlJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoRmlsdGVyKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZpbHRlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7d2hlcmU6IHtwcmVkZWZpbmVkOiB0cnVlfX0pXHJcbiAgICB9XHJcblxyXG4gICAgZmluZEJ5SWQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRPbmUoe3doZXJlOiB7aWR9fSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRFcXVpcG1lbnQobW9kZWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSh7bW9kZWx9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUVxdWlwbWVudChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSh7d2hlcmU6IHtpZH19KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuaW1wb3J0ICogYXMgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7Rm9sbG93fSBmcm9tICdkYi9tb2RlbHMvRm9sbG93J1xyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvbGxvd1JlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8Rm9sbG93PiB7XHJcbiAgICBmb2xsb3dVc2VyOiAoXHJcbiAgICAgICAgZm9sbG93ZWRJZDogbnVtYmVyLFxyXG4gICAgICAgIGZvbGxvd2VySWQ6IG51bWJlclxyXG4gICAgKSA9PiBCbHVlYmlyZDxGb2xsb3cgfCBudWxsPlxyXG4gICAgdW5mb2xsb3dVc2VyOiAoXHJcbiAgICAgICAgZm9sbG93ZWRJZDogbnVtYmVyLFxyXG4gICAgICAgIGZvbGxvd2VySWQ6IG51bWJlclxyXG4gICAgKSA9PiBCbHVlYmlyZDxGb2xsb3cgfCBudWxsPlxyXG4gICAgZ2V0Rm9sbG93czogKFxyXG4gICAgICAgIHVzZXJJZDogbnVtYmVyXHJcbiAgICApID0+IFByb21pc2U8e2ZvbGxvd2VyczogRm9sbG93W10sIGZvbGxvd2luZzogRm9sbG93W119PlxyXG4gICAgaXNGb2xsb3dlZEJ5OiAoZm9sbG93ZXJJZDogbnVtYmVyLCBmb2xsb3dlZElkOiBudW1iZXIpID0+IFByb21pc2U8Ym9vbGVhbj5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9sbG93UmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PEZvbGxvdz4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoRm9sbG93KVxyXG4gICAgfVxyXG5cclxuICAgIGZvbGxvd1VzZXIoZm9sbG93ZWRJZDogbnVtYmVyLCBmb2xsb3dlcklkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe2ZvbGxvd2VyVXNlcklkOiBmb2xsb3dlcklkLCBmb2xsb3dlZFVzZXJJZDogZm9sbG93ZWRJZH0pXHJcbiAgICB9XHJcblxyXG4gICAgdW5mb2xsb3dVc2VyKGZvbGxvd2VkSWQ6IG51bWJlciwgZm9sbG93ZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveSh7d2hlcmU6IHtmb2xsb3dlclVzZXJJZDogZm9sbG93ZXJJZCwgZm9sbG93ZWRVc2VySWQ6IGZvbGxvd2VkSWR9fSlcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpc0ZvbGxvd2VkQnkoZm9sbG93ZXJJZDogbnVtYmVyLCBmb2xsb3dlZElkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBmb2xsb3cgPSBhd2FpdCB0aGlzLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgZm9sbG93ZXJVc2VySWQ6IGZvbGxvd2VySWQsXHJcbiAgICAgICAgICAgICAgICBmb2xsb3dlZFVzZXJJZDogZm9sbG93ZWRJZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gQm9vbGVhbihmb2xsb3cpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0Rm9sbG93cyh1c2VySWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IFtmb2xsb3dlcnMsIGZvbGxvd2luZ10gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEFsbCh7d2hlcmU6IHtmb2xsb3dlZFVzZXJJZDogdXNlcklkfX0pLFxyXG4gICAgICAgICAgICB0aGlzLmZpbmRBbGwoe3doZXJlOiB7Zm9sbG93ZXJVc2VySWQ6IHVzZXJJZH19KSxcclxuICAgICAgICBdKVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmb2xsb3dlcnMsXHJcbiAgICAgICAgICAgIGZvbGxvd2luZyxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7SGFyZHNjYXBlfSBmcm9tICdkYi9tb2RlbHMvSGFyZHNjYXBlJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIYXJkc2NhcGVSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8SGFyZHNjYXBlPiB7XHJcbiAgICBnZXRIYXJkc2NhcGU6ICgpID0+IEJsdWViaXJkPEhhcmRzY2FwZVtdPlxyXG4gICAgZmluZEhhcmRzY2FwZUJ5SWQoaWQ6IG51bWJlcik6IEJsdWViaXJkPEhhcmRzY2FwZSB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhcmRzY2FwZVJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxIYXJkc2NhcGU+IGltcGxlbWVudHMgSGFyZHNjYXBlUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihIYXJkc2NhcGUpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFyZHNjYXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe3doZXJlOiB7cHJlZGVmaW5lZDogdHJ1ZX19KVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRIYXJkc2NhcGVCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kT25lKHt3aGVyZToge2lkfX0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBFcXVpcG1lbnRSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQmFzZSdcclxuaW1wb3J0IHtMaWdodH0gZnJvbSAnZGIvbW9kZWxzL0xpZ2h0J1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaWdodFJlcG9zaXRvcnlJbnRlcmZhY2UgZXh0ZW5kcyBFcXVpcG1lbnRSZXBvc2l0b3J5SW50ZXJmYWNlPExpZ2h0PiB7fVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTGlnaHRSZXBvc2l0b3J5IGV4dGVuZHMgQmFzZVJlcG9zaXRvcnk8TGlnaHQ+IGltcGxlbWVudHMgTGlnaHRSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKExpZ2h0KVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kT25lKHt3aGVyZToge2lkfX0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXF1aXBtZW50KG1vZGVsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe21vZGVsfSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVFcXVpcG1lbnQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3koe3doZXJlOiB7aWR9fSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIFByb3ZpZGVyU2NvcGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCB7VXNlcklucHV0RXJyb3J9IGZyb20gJ2Fwb2xsby1zZXJ2ZXInXHJcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCdcclxuaW1wb3J0ICogYXMgRGF0YUxvYWRlciBmcm9tICdkYXRhbG9hZGVyJ1xyXG5cclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0xpa2V9IGZyb20gJ2RiL21vZGVscy9MaWtlJ1xyXG5cclxuZXhwb3J0IGVudW0gTGlrZUVudGl0eVR5cGUge1xyXG4gICAgQVFVQVNDQVBFID0gJ0FRVUFTQ0FQRScsXHJcbiAgICBJTUFHRSA9ICdJTUFHRScsXHJcbiAgICBDT01NRU5UID0gJ0NPTU1FTlQnLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpa2VSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8TGlrZT4ge1xyXG4gICAgbGlrZShlbnRpdHk6IExpa2VFbnRpdHlUeXBlLCBlbnRpdHlJZDogbnVtYmVyLCB1c2VySWQ6IG51bWJlcik6IEJsdWViaXJkPExpa2U+XHJcbiAgICBkaXNsaWtlKGVudGl0eTogTGlrZUVudGl0eVR5cGUsIGVudGl0eUlkOiBudW1iZXIsIHVzZXJJZDogbnVtYmVyKTogQmx1ZWJpcmQ8TGlrZT5cclxuICAgIGNvdW50TGlrZXMoZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPlxyXG4gICAgaXNMaWtlZEJ5KHVzZXJJZDogbnVtYmVyLCBlbnRpdHk6IExpa2VFbnRpdHlUeXBlLCBlbnRpdHlJZDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPlxyXG59XHJcblxyXG5jb25zdCBlbnRpdHlUb0ZpZWxkTWFwcGVyID0ge1xyXG4gICAgW0xpa2VFbnRpdHlUeXBlLkFRVUFTQ0FQRV06ICdhcXVhc2NhcGVJZCcsXHJcbiAgICBbTGlrZUVudGl0eVR5cGUuSU1BR0VdOiAnYXF1YXNjYXBlSW1hZ2VJZCcsXHJcbiAgICBbTGlrZUVudGl0eVR5cGUuQ09NTUVOVF06ICdjb21tZW50SWQnLFxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7c2NvcGU6IFByb3ZpZGVyU2NvcGUuU2Vzc2lvbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWtlUmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PExpa2U+IHtcclxuICAgIGFxdWFzY2FwZUxpa2VzTG9hZGVyOiBEYXRhTG9hZGVyPG51bWJlciwgbnVtYmVyPlxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKExpa2UpXHJcbiAgICAgICAgdGhpcy5hcXVhc2NhcGVMaWtlc0xvYWRlciA9IG5ldyBEYXRhTG9hZGVyKHRoaXMuYmF0Y2hDb3VudEFxdWFzY2FwZUxpa2VzKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGxpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IGVudGl0eVRvRmllbGRNYXBwZXJbZW50aXR5XVxyXG4gICAgICAgIGNvbnN0IGxpa2UgPSBhd2FpdCB0aGlzLmZpbmRPbmUoe3doZXJlOiB7dXNlcklkLCBbZmllbGRdOiBlbnRpdHlJZH19KVxyXG5cclxuICAgICAgICBpZiAobGlrZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGxpa2UpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoe3VzZXJJZCwgW2ZpZWxkXTogZW50aXR5SWR9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRpc2xpa2UoZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IGVudGl0eVRvRmllbGRNYXBwZXJbZW50aXR5XVxyXG4gICAgICAgIGNvbnN0IGxpa2UgPSBhd2FpdCB0aGlzLmZpbmRPbmUoe3doZXJlOiB7dXNlcklkLCBbZmllbGRdOiBlbnRpdHlJZH19KVxyXG5cclxuICAgICAgICBpZiAoIWxpa2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFVzZXJJbnB1dEVycm9yKCdMaWtlIG5vdCBmb3VuZCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmRlc3Ryb3koe3doZXJlOiB7dXNlcklkLCBbZmllbGRdOiBlbnRpdHlJZH19KVxyXG5cclxuICAgICAgICByZXR1cm4gbGlrZVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGlzTGlrZWRCeSh1c2VySWQ6IG51bWJlciwgZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGZpZWxkID0gZW50aXR5VG9GaWVsZE1hcHBlcltlbnRpdHldXHJcbiAgICAgICAgY29uc3QgbGlrZSA9IGF3YWl0IHRoaXMuZmluZE9uZSh7XHJcbiAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICBbZmllbGRdOiBlbnRpdHlJZCxcclxuICAgICAgICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gQm9vbGVhbihsaWtlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50TGlrZXMoZW50aXR5OiBMaWtlRW50aXR5VHlwZSwgZW50aXR5SWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGZpZWxkID0gZW50aXR5VG9GaWVsZE1hcHBlcltlbnRpdHldXHJcblxyXG4gICAgICAgIHN3aXRjaCAoZmllbGQpIHtcclxuICAgICAgICAgICAgY2FzZSBlbnRpdHlUb0ZpZWxkTWFwcGVyW0xpa2VFbnRpdHlUeXBlLkFRVUFTQ0FQRV06XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcXVhc2NhcGVMaWtlc0xvYWRlci5sb2FkKGVudGl0eUlkKVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiYXRjaENvdW50QXF1YXNjYXBlTGlrZXMgPSBhc3luYyAoaWRzOiBudW1iZXJbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpa2VzID0gYXdhaXQgdGhpcy5maW5kQWxsKHtcclxuICAgICAgICAgICAgd2hlcmU6IHtbZW50aXR5VG9GaWVsZE1hcHBlcltMaWtlRW50aXR5VHlwZS5BUVVBU0NBUEVdXTogaWRzfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gaWRzLm1hcChpZCA9PiBsaWtlcy5maWx0ZXIobGlrZSA9PiBsaWtlLmFxdWFzY2FwZUlkID09PSBpZCkubGVuZ3RoKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJ1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcblxyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7TGl2ZXN0b2NrfSBmcm9tICdkYi9tb2RlbHMvTGl2ZXN0b2NrJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaXZlc3RvY2tSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8TGl2ZXN0b2NrPiB7XHJcbiAgICBnZXRMaXZlc3RvY2s6ICgpID0+IEJsdWViaXJkPExpdmVzdG9ja1tdPlxyXG4gICAgZmluZExpdmVzdG9ja0J5SWQoaWQ6IG51bWJlcik6IEJsdWViaXJkPExpdmVzdG9jayB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExpdmVzdG9ja1JlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxMaXZlc3RvY2s+IGltcGxlbWVudHMgTGl2ZXN0b2NrUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihMaXZlc3RvY2spXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGl2ZXN0b2NrKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbGwoe3doZXJlOiB7cHJlZGVmaW5lZDogdHJ1ZX19KVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXZlc3RvY2tCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kT25lKHt3aGVyZToge2lkfX0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuXHJcbmltcG9ydCB7QmFzZVJlcG9zaXRvcnksIEJhc2VSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQmFzZSdcclxuaW1wb3J0IHtQbGFudH0gZnJvbSAnZGIvbW9kZWxzL1BsYW50J1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQbGFudFJlcG9zaXRvcnlJbnRlcmZhY2UgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeUludGVyZmFjZTxQbGFudD4ge1xyXG4gICAgZ2V0UGxhbnRzKCk6IEJsdWViaXJkPFBsYW50W10+XHJcbiAgICBmaW5kUGxhbnRCeUlkKGlkOiBudW1iZXIpOiBCbHVlYmlyZDxQbGFudCB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBsYW50UmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PFBsYW50PiBpbXBsZW1lbnRzIFBsYW50UmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihQbGFudClcclxuICAgIH1cclxuXHJcbiAgICBnZXRQbGFudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEFsbCh7d2hlcmU6IHtwcmVkZWZpbmVkOiB0cnVlfX0pXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFBsYW50QnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE9uZSh7d2hlcmU6IHtpZH19KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge1NvY2lhbExvZ2lufSBmcm9tICdkYi9tb2RlbHMvU29jaWFsTG9naW4nXHJcbmltcG9ydCBzb2NpYWxQcm92aWRlcnMgZnJvbSAnY29uc3RhbnRzL3NvY2lhbFByb3ZpZGVycydcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29jaWFsTG9naW5SZXBvc2l0b3J5SW50ZXJmYWNlXHJcbiAgICBleHRlbmRzIEJhc2VSZXBvc2l0b3J5SW50ZXJmYWNlPFNvY2lhbExvZ2luPiB7XHJcbiAgICBhZGRGYWNlYm9va0xvZ2luKHVzZXJJZDogbnVtYmVyLCBzb2NpYWxJZDogc3RyaW5nKTogUHJvbWlzZTxTb2NpYWxMb2dpbj5cclxuICAgIGZpbmRTb2NpYWxMb2dpbihzb2NpYWxJZDogc3RyaW5nKTogUHJvbWlzZTxTb2NpYWxMb2dpbiB8IG51bGw+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNvY2lhbExvZ2luUmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PFNvY2lhbExvZ2luPlxyXG4gICAgaW1wbGVtZW50cyBTb2NpYWxMb2dpblJlcG9zaXRvcnlJbnRlcmZhY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoU29jaWFsTG9naW4pXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZmluZFNvY2lhbExvZ2luKHNvY2lhbElkOiBzdHJpbmcpOiBQcm9taXNlPFNvY2lhbExvZ2luIHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICB3aGVyZToge3NvY2lhbElkfSxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGFkZEZhY2Vib29rTG9naW4oXHJcbiAgICAgICAgdXNlcklkOiBudW1iZXIsXHJcbiAgICAgICAgc29jaWFsSWQ6IHN0cmluZ1xyXG4gICAgKTogUHJvbWlzZTxTb2NpYWxMb2dpbj4ge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgICAgc29jaWFsSWQsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyOiBzb2NpYWxQcm92aWRlcnMuRkFDRUJPT0ssXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGdyYXBocWwtbW9kdWxlcy9kaSdcclxuXHJcbmltcG9ydCB7QmFzZVJlcG9zaXRvcnksIEVxdWlwbWVudFJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge1N1YnN0cmF0ZX0gZnJvbSAnZGIvbW9kZWxzL1N1YnN0cmF0ZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3Vic3RyYXRlUmVwb3NpdG9yeUludGVyZmFjZSBleHRlbmRzIEVxdWlwbWVudFJlcG9zaXRvcnlJbnRlcmZhY2U8U3Vic3RyYXRlPiB7XHJcbiAgICBnZXRTdWJzdHJhdGVzOiAoKSA9PiBCbHVlYmlyZDxTdWJzdHJhdGVbXT5cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3Vic3RyYXRlUmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PFN1YnN0cmF0ZT5cclxuICAgIGltcGxlbWVudHMgU3Vic3RyYXRlUmVwb3NpdG9yeUludGVyZmFjZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihTdWJzdHJhdGUpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3Vic3RyYXRlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kQWxsKHt3aGVyZToge3ByZWRlZmluZWQ6IHRydWV9fSlcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE9uZSh7d2hlcmU6IHtpZH19KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEVxdWlwbWVudChtb2RlbDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHttb2RlbH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRXF1aXBtZW50KGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95KHt3aGVyZToge2lkfX0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5pbXBvcnQge0Jhc2VSZXBvc2l0b3J5LCBCYXNlUmVwb3NpdG9yeUludGVyZmFjZX0gZnJvbSAnZGIvcmVwb3NpdG9yaWVzL0Jhc2UnXHJcbmltcG9ydCB7VGFnfSBmcm9tICdkYi9tb2RlbHMvVGFnJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWdSZXBvc2l0b3J5SW50ZXJmYWNlIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8VGFnPiB7fVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGFnUmVwb3NpdG9yeSBleHRlbmRzIEJhc2VSZXBvc2l0b3J5PFRhZz4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoVGFnKVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIERhdGFMb2FkZXIgZnJvbSAnZGF0YWxvYWRlcidcclxuaW1wb3J0IHtJbmplY3RhYmxlLCBQcm92aWRlclNjb3BlfSBmcm9tICdAZ3JhcGhxbC1tb2R1bGVzL2RpJ1xyXG5cclxuaW1wb3J0IHtVc2VyfSBmcm9tICdkYi9tb2RlbHMvVXNlcidcclxuaW1wb3J0IHtCYXNlUmVwb3NpdG9yeSwgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2V9IGZyb20gJ2RiL3JlcG9zaXRvcmllcy9CYXNlJ1xyXG5pbXBvcnQge0dyYXBoUUxIZWxwZXJ9IGZyb20gJ3V0aWxzL0dyYXBoUUxIZWxwZXInXHJcbmltcG9ydCB7VXNlckRldGFpbHN9IGZyb20gJ2ludGVyZmFjZXMvZ3JhcGhxbC90eXBlcydcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclJlcG9zaXRvcnlJbnRlcmZhY2UgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeUludGVyZmFjZTxVc2VyPiB7XHJcbiAgICBmaW5kVXNlckJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8VXNlciB8IG51bGw+XHJcbiAgICBmaW5kVXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8VXNlciB8IG51bGw+XHJcbiAgICBmaW5kVXNlckJ5U2x1ZyhzbHVnOiBzdHJpbmcpOiBQcm9taXNlPFVzZXIgfCBudWxsPlxyXG4gICAgdXBkYXRlUHJvZmlsZUltYWdlKHVzZXJJZDogbnVtYmVyLCBwdWJsaWNJZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IFByb21pc2U8W251bWJlciwgVXNlcltdXT5cclxuICAgIHVwZGF0ZUNvdmVySW1hZ2UodXNlcklkOiBudW1iZXIsIHB1YmxpY0lkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogUHJvbWlzZTxbbnVtYmVyLCBVc2VyW11dPlxyXG4gICAgdXBkYXRlVXNlckRldGFpbHModXNlcklkOiBudW1iZXIsIHVzZXJEZXRhaWxzOiBVc2VyRGV0YWlscyk6IFByb21pc2U8W251bWJlciwgVXNlcltdXT5cclxufVxyXG5cclxuQEluamVjdGFibGUoe3Njb3BlOiBQcm92aWRlclNjb3BlLlNlc3Npb259KVxyXG5leHBvcnQgY2xhc3MgVXNlclJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxVc2VyPiBpbXBsZW1lbnRzIFVzZXJSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGRhdGFMb2FkZXI6IERhdGFMb2FkZXI8bnVtYmVyLCBVc2VyPlxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFVzZXIpXHJcbiAgICAgICAgdGhpcy5kYXRhTG9hZGVyID0gbmV3IERhdGFMb2FkZXIodGhpcy5iYXRjaEdldFVzZXJCeUlkKVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZpbmRVc2VyQnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFMb2FkZXIubG9hZChpZClcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kT25lKHt3aGVyZToge2VtYWlsfX0pXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFVzZXJCeVNsdWcoc2x1Zzogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRPbmUoe3doZXJlOiB7c2x1Z319KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVByb2ZpbGVJbWFnZSh1c2VySWQ6IG51bWJlciwgcHVibGljSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVJbWFnZTogdXJsLFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZUltYWdlUHVibGljSWQ6IHB1YmxpY0lkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7d2hlcmU6IHtpZDogdXNlcklkfX1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ292ZXJJbWFnZSh1c2VySWQ6IG51bWJlciwgcHVibGljSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdmVySW1hZ2U6IHVybCxcclxuICAgICAgICAgICAgICAgIGNvdmVySW1hZ2VQdWJsaWNJZDogcHVibGljSWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHt3aGVyZToge2lkOiB1c2VySWR9fVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVVc2VyRGV0YWlscyh1c2VySWQ6IG51bWJlciwgdXNlckRldGFpbHM6IFVzZXJEZXRhaWxzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKHVzZXJEZXRhaWxzLCB7d2hlcmU6IHtpZDogdXNlcklkfSwgcmV0dXJuaW5nOiB0cnVlfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJhdGNoR2V0VXNlckJ5SWQgPSBhc3luYyAoaWRzOiBudW1iZXJbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdGhpcy5maW5kQWxsKHt3aGVyZToge2lkOiBpZHN9fSlcclxuICAgICAgICByZXR1cm4gR3JhcGhRTEhlbHBlci5lbnN1cmVPcmRlcih7XHJcbiAgICAgICAgICAgIGRvY3M6IHVzZXJzLFxyXG4gICAgICAgICAgICBrZXlzOiBpZHMsXHJcbiAgICAgICAgICAgIHByb3A6ICdpZCcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGUsIFByb3ZpZGVyU2NvcGV9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvZGknXHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZC92NCdcclxuaW1wb3J0ICogYXMgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXHJcbmltcG9ydCAqIGFzIERhdGFMb2FkZXIgZnJvbSAnZGF0YWxvYWRlcidcclxuXHJcbmltcG9ydCB7QmFzZVJlcG9zaXRvcnksIEJhc2VSZXBvc2l0b3J5SW50ZXJmYWNlfSBmcm9tICdkYi9yZXBvc2l0b3JpZXMvQmFzZSdcclxuaW1wb3J0IHtWaXNpdG9yfSBmcm9tICdkYi9tb2RlbHMvVmlzaXRvcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlzaXRvclJlcG9zaXRvcnlJbnRlcmZhY2VcclxuICAgIGV4dGVuZHMgQmFzZVJlcG9zaXRvcnlJbnRlcmZhY2U8VmlzaXRvcj4ge1xyXG4gICAgYWRkVmlzaXRvcihcclxuICAgICAgICBhcXVhc2NhcGVJZDogbnVtYmVyLFxyXG4gICAgICAgIHZpc2l0b3JJZD86IHN0cmluZ1xyXG4gICAgKTogQmx1ZWJpcmQ8W1Zpc2l0b3IsIGJvb2xlYW5dPlxyXG4gICAgY291bnRWaWV3cyhhcXVhc2NhcGVJZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHsgc2NvcGU6IFByb3ZpZGVyU2NvcGUuU2Vzc2lvbiB9KVxyXG5leHBvcnQgY2xhc3MgVmlzaXRvclJlcG9zaXRvcnkgZXh0ZW5kcyBCYXNlUmVwb3NpdG9yeTxWaXNpdG9yPiBpbXBsZW1lbnRzIFZpc2l0b3JSZXBvc2l0b3J5SW50ZXJmYWNlIHtcclxuICAgIGFxdWFzY2FwZVZpc2l0TG9hZGVyOiBEYXRhTG9hZGVyPG51bWJlciwgbnVtYmVyPlxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFZpc2l0b3IpXHJcbiAgICAgICAgdGhpcy5hcXVhc2NhcGVWaXNpdExvYWRlciA9IG5ldyBEYXRhTG9hZGVyKFxyXG4gICAgICAgICAgICB0aGlzLmJhdGNoQ291bnRBcXVhc2NhcGVWaXNpdHNcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVmlzaXRvcihhcXVhc2NhcGVJZDogbnVtYmVyLCB2aXNpdG9ySWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kT3JDcmVhdGUoe1xyXG4gICAgICAgICAgICB3aGVyZToge3Zpc2l0b3JJZDogdmlzaXRvcklkIHx8IHV1aWQoKSwgYXF1YXNjYXBlSWR9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY291bnRWaWV3cyhhcXVhc2NhcGVJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXF1YXNjYXBlVmlzaXRMb2FkZXIubG9hZChhcXVhc2NhcGVJZClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJhdGNoQ291bnRBcXVhc2NhcGVWaXNpdHMgPSBhc3luYyAoaWRzOiBudW1iZXJbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gYXdhaXQgdGhpcy5maW5kQWxsKHsgd2hlcmU6IHthcXVhc2NhcGVJZDogaWRzfX0pXHJcblxyXG4gICAgICAgIHJldHVybiBpZHMubWFwKGlkID0+IHZpZXdzLmZpbHRlcih2aWV3ID0+IHZpZXcuYXF1YXNjYXBlSWQgPT09IGlkKS5sZW5ndGgpXHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IHRva2VucyA9IHtcclxuICAgIEVRVUlQTUVOVF9QUk9WSURFUjogJ0VRVUlQTUVOVF9QUk9WSURFUicsXHJcbiAgICBVU0VSX1BST1ZJREVSOiAnVVNFUlNfUFJPVklERVInLFxyXG4gICAgRk9MTE9XX1BST1ZJREVSOiAnRk9MTE9XX1BST1ZJREVSJyxcclxuICAgIEFVVEhfUFJPVklERVI6ICdBVVRIX1BST1ZJREVSJyxcclxuICAgIEFRVUFTQ0FQRV9QUk9WSURFUjogJ0FRVUFTQ0FQRV9QUk9WSURFUicsXHJcbiAgICBMSUdIVF9QUk9WSURFUjogJ0xJR0hUX1BST1ZJREVSJyxcclxuICAgIExJS0VfUFJPVklERVI6ICdMSUtFX1BST1ZJREVSJyxcclxuICAgIFZJU0lUT1JfUFJPVklERVI6ICdWSVNJVE9SX1BST1ZJREVSJyxcclxuICAgIFRBR19QUk9WSURFUjogJ1RBR19QUk9WSURFUicsXHJcbiAgICBBUVVBU0NBUEVfSU1BR0VfUFJPVklERVI6ICdBUVVBU0NBUEVfSU1BR0VfUFJPVklERVInLFxyXG4gICAgQ09NTUVOVF9QUk9WSURFUjogJ0NPTU1FTlRfUFJPVklERVInLFxyXG4gICAgUExBTlRfUFJPVklERVI6ICdQTEFOVF9QUk9WSURFUicsXHJcbiAgICBIQVJEU0NBUEVfUFJPVklERVI6ICdIQVJEU0NBUEVfUFJPVklERVInLFxyXG4gICAgTElWRVNUT0NLX1BST1ZJREVSOiAnTElWRVNUT0NLX1BST1ZJREVSJyxcclxuICAgIFNVQlNUUkFURV9QUk9WSURFUjogJ1NVQlNUUkFURV9QUk9WSURFUicsXHJcbiAgICBBRERJVElWRV9QUk9WSURFUjogJ0FERElUSVZFX1BST1ZJREVSJyxcclxuICAgIEZJTFRFUl9QUk9WSURFUjogJ0ZJTFRFUl9QUk9WSURFUicsXHJcbiAgICBCUkFORF9QUk9WSURFUjogJ0JSQU5EX1BST1ZJREVSJyxcclxuXHJcbiAgICBGSUxURVJfUkVQT1NJVE9SWTogJ0ZJTFRFUl9SRVBPU0lUT1JZJyxcclxuICAgIEJSQU5EX1JFUE9TSVRPUlk6ICdCUkFORF9SRVBPU0lUT1JZJyxcclxuICAgIEFERElUSVZFX1JFUE9TSVRPUlk6ICdBRERJVElWRV9SRVBPU0lUT1JZJyxcclxuICAgIFNVQlNUUkFURV9SRVBPU0lUT1JZOiAnU1VCU1RSQVRFX1JFUE9TSVRPUlknLFxyXG4gICAgVVNFUl9SRVBPU0lUT1JZOiAnVVNFUl9SRVBPU0lUT1JZJyxcclxuICAgIExJVkVTVE9DS19SRVBPU0lUT1JZOiAnTElWRVNUT0NLX1JFUE9TSVRPUlknLFxyXG4gICAgSEFSRFNDQVBFX1JFUE9TSVRPUlk6ICdIQVJEU0NBUEVfUkVQT1NJVE9SWScsXHJcbiAgICBQTEFOVF9SRVBPU0lUT1JZOiAnUExBTlRfUkVQT1NJVE9SWScsXHJcbiAgICBMSUtFX1JFUE9TSVRPUlk6ICdMSUtFX1JFUE9TSVRPUlknLFxyXG4gICAgU09DSUFMX0xPR0lOX1JFUE9TSVRPUlk6ICdTT0NJQUxfTE9HSU5fUkVQT1NJVE9SWScsXHJcbiAgICBDT01NRU5UX1JFUE9TSVRPUlk6ICdDT01NRU5UX1JFUE9TSVRPUlknLFxyXG4gICAgRk9MTE9XX1JFUE9TSVRPUlk6ICdGT0xMT1dfUkVQT1NJVE9SWScsXHJcbiAgICBBUVVBU0NBUEVfUkVQT1NJVE9SWTogJ0FRVUFTQ0FQRV9SRVBPU0lUT1JZJyxcclxuICAgIFZJU0lUT1JfUkVQT1NJVE9SWTogJ1ZJU0lUT1JfUkVQT1NJVE9SWScsXHJcbiAgICBMSUdIVF9SRVBPU0lUT1JZOiAnTElHSFRfUkVQT1NJVE9SWScsXHJcbiAgICBUQUdfUkVQT1NJVE9SWTogJ1RBR19SRVBPU0lUT1JZJyxcclxuICAgIEVNQUlMX0NPTkZJUk1BVElPTl9SRVBPU0lUT1JZOiAnRU1BSUxfQ09ORklSTUFUSU9OX1JFUE9TSVRPUlknLFxyXG4gICAgQVFVQVNDQVBFX0lNQUdFX1JFUE9TSVRPUlk6ICdBUVVBU0NBUEVfSU1BR0VfUkVQT1NJVE9SWScsXHJcbiAgICBBUVVBU0NBUEVfUExBTlRfUkVQT1NJVE9SWTogJ0FRVUFTQ0FQRV9QTEFOVF9SRVBPU0lUT1JZJyxcclxuICAgIEFRVUFTQ0FQRV9MSVZFU1RPQ0tfUkVQT1NJVE9SWTogJ0FRVUFTQ0FQRV9MSVZFU1RPQ0tfUkVQT1NJVE9SWScsXHJcbiAgICBBUVVBU0NBUEVfSEFSRFNDQVBFX1JFUE9TSVRPUlk6ICdBUVVBU0NBUEVfSEFSRFNDQVBFX1JFUE9TSVRPUlknLFxyXG4gICAgQVFVQVNDQVBFX0ZJTFRFUl9SRVBPU0lUT1JZOiAnQVFVQVNDQVBFX0hBUkRTQ0FQRV9SRVBPU0lUT1JZJyxcclxuICAgIEFRVUFTQ0FQRV9MSUdIVF9SRVBPU0lUT1JZOiAnQVFVQVNDQVBFX0xJR0hUX1JFUE9TSVRPUlknLFxyXG4gICAgQVFVQVNDQVBFX1NVQlNUUkFURV9SRVBPU0lUT1JZOiAnQVFVQVNDQVBFX1NVQlNUUkFURV9SRVBPU0lUT1JZJyxcclxuICAgIEFRVUFTQ0FQRV9BRERJVElWRVNfUkVQT1NJVE9SWTogJ0FRVUFTQ0FQRV9BRERJVElWRVNfUkVQT1NJVE9SWScsXHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cclxuaW1wb3J0IHsgR3JhcGhRTFJlc29sdmVJbmZvLCBHcmFwaFFMU2NhbGFyVHlwZSwgR3JhcGhRTFNjYWxhclR5cGVDb25maWcgfSBmcm9tICdncmFwaHFsJztcclxuZXhwb3J0IHR5cGUgTWF5YmU8VD4gPSBUIHwgbnVsbDtcclxuXHJcbi8qKiBBbGwgYnVpbHQtaW4gYW5kIGN1c3RvbSBzY2FsYXJzLCBtYXBwZWQgdG8gdGhlaXIgYWN0dWFsIHZhbHVlcyAqL1xyXG5leHBvcnQgdHlwZSBTY2FsYXJzID0ge1xyXG4gIElEOiBzdHJpbmcsXHJcbiAgU3RyaW5nOiBzdHJpbmcsXHJcbiAgQm9vbGVhbjogYm9vbGVhbixcclxuICBJbnQ6IG51bWJlcixcclxuICBGbG9hdDogbnVtYmVyLFxyXG4gIFVwbG9hZDogYW55LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQWRkaXRpdmUgPSBFcXVpcG1lbnQgJiB7XHJcbiAgX190eXBlbmFtZT86ICdBZGRpdGl2ZScsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIHByZWRlZmluZWQ6IFNjYWxhcnNbJ0Jvb2xlYW4nXSxcclxuICBtb2RlbDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgZGVzY3JpcHRpb24/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgaW1hZ2U/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgYnJhbmQ/OiBNYXliZTxCcmFuZD4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBBcXVhc2NhcGUgPSB7XHJcbiAgX190eXBlbmFtZT86ICdBcXVhc2NhcGUnLFxyXG4gIGxpa2VzQ291bnQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGlzTGlrZWRCeU1lOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGNyZWF0ZWRBdDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgdXBkYXRlZEF0OiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICB0aXRsZT86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBmZWF0dXJlZDogU2NhbGFyc1snQm9vbGVhbiddLFxyXG4gIHRyZW5kaW5nOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbiAgZGVzY3JpcHRpb24/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgdXNlcklkOiBTY2FsYXJzWydJbnQnXSxcclxuICB1c2VyPzogTWF5YmU8VXNlcj4sXHJcbiAgY28yPzogTWF5YmU8Q28yPixcclxuICB0YW5rPzogTWF5YmU8VGFuaz4sXHJcbiAgbWFpbkltYWdlVXJsPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIG1haW5JbWFnZVB1YmxpY0lkPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGltYWdlczogQXJyYXk8QXF1YXNjYXBlSW1hZ2U+LFxyXG4gIHRhZ3M6IEFycmF5PFRhZz4sXHJcbiAgcGxhbnRzOiBBcnJheTxQbGFudD4sXHJcbiAgaGFyZHNjYXBlOiBBcnJheTxIYXJkc2NhcGU+LFxyXG4gIGxpdmVzdG9jazogQXJyYXk8TGl2ZXN0b2NrPixcclxuICBmaWx0ZXJzOiBBcnJheTxGaWx0ZXI+LFxyXG4gIGxpZ2h0czogQXJyYXk8TGlnaHQ+LFxyXG4gIHN1YnN0cmF0ZXM6IEFycmF5PFN1YnN0cmF0ZT4sXHJcbiAgYWRkaXRpdmVzOiBBcnJheTxBZGRpdGl2ZT4sXHJcbiAgY29tbWVudHM6IEFycmF5PENvbW1lbnQ+LFxyXG4gIHZpZXdzQ291bnQ6IFNjYWxhcnNbJ0ludCddLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQXF1YXNjYXBlSW1hZ2UgPSB7XHJcbiAgX190eXBlbmFtZT86ICdBcXVhc2NhcGVJbWFnZScsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIHRpdGxlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGRlc2NyaXB0aW9uPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIHVybDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgcHVibGljSWQ6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIGNyZWF0ZWRBdDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgdXBkYXRlZEF0OiBTY2FsYXJzWydTdHJpbmcnXSxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEFxdWFzY2FwZXNGaWx0ZXIgPSB7XHJcbiAgdHJlbmRpbmc/OiBNYXliZTxTY2FsYXJzWydCb29sZWFuJ10+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQXF1YXNjYXBlc1Jlc3VsdCA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0FxdWFzY2FwZXNSZXN1bHQnLFxyXG4gIHJvd3M6IEFycmF5PEFxdWFzY2FwZT4sXHJcbiAgY291bnQ6IFNjYWxhcnNbJ0ludCddLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQXV0aFBheWxvYWQgPSB7XHJcbiAgX190eXBlbmFtZT86ICdBdXRoUGF5bG9hZCcsXHJcbiAgdG9rZW46IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIHVzZXI6IFVzZXIsXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBCcmFuZCA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0JyYW5kJyxcclxuICBpZDogU2NhbGFyc1snSW50J10sXHJcbiAgcHJlZGVmaW5lZDogU2NhbGFyc1snQm9vbGVhbiddLFxyXG4gIG5hbWU6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIGxvZ28/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgYWRkcmVzcz86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIENvMiA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0NPMicsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIHR5cGU/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgYnBzPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQ29tbWVudCA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0NvbW1lbnQnLFxyXG4gIGlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBjcmVhdGVkQXQ6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIGNvbnRlbnQ6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIHBhcmVudENvbW1lbnRJZD86IE1heWJlPFNjYWxhcnNbJ0ludCddPixcclxuICBsaWtlczogQXJyYXk8TGlrZT4sXHJcbiAgdXNlcjogVXNlcixcclxuICBhcXVhc2NhcGVJbWFnZUlkPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIGFxdWFzY2FwZUlkPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIGNvbW1lbnRJZD86IE1heWJlPFNjYWxhcnNbJ0ludCddPixcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIENvbW1lbnRFbnRpdHlUeXBlIHtcclxuICBBcXVhc2NhcGUgPSAnQVFVQVNDQVBFJyxcclxuICBJbWFnZSA9ICdJTUFHRSdcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRXF1aXBtZW50ID0ge1xyXG4gIGlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBwcmVkZWZpbmVkOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbiAgbW9kZWw6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIGRlc2NyaXB0aW9uPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGltYWdlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGJyYW5kPzogTWF5YmU8QnJhbmQ+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXF1aXBtZW50QXJncyA9IHtcclxuICBlcXVpcG1lbnRUeXBlOiBFcXVpcG1lbnRUeXBlLFxyXG4gIGVxdWlwbWVudElkPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIG5hbWU/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBFcXVpcG1lbnRUeXBlIHtcclxuICBGaWx0ZXIgPSAnRklMVEVSJyxcclxuICBTdWJzdHJhdGUgPSAnU1VCU1RSQVRFJyxcclxuICBMaWdodCA9ICdMSUdIVCcsXHJcbiAgQWRkaXRpdmVzID0gJ0FERElUSVZFUydcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRmlsdGVyID0gRXF1aXBtZW50ICYge1xyXG4gIF9fdHlwZW5hbWU/OiAnRmlsdGVyJyxcclxuICBpZDogU2NhbGFyc1snSW50J10sXHJcbiAgcHJlZGVmaW5lZDogU2NhbGFyc1snQm9vbGVhbiddLFxyXG4gIG1vZGVsOiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICBkZXNjcmlwdGlvbj86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBpbWFnZT86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBicmFuZD86IE1heWJlPEJyYW5kPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEZvbGxvdyA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0ZvbGxvdycsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGZvbGxvd2VkVXNlcklkOiBTY2FsYXJzWydJbnQnXSxcclxuICBmb2xsb3dlclVzZXJJZDogU2NhbGFyc1snSW50J10sXHJcbiAgZm9sbG93ZWQ6IFVzZXIsXHJcbiAgZm9sbG93ZXI6IFVzZXIsXHJcbiAgdXBkYXRlZEF0OiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICBjcmVhdGVkQXQ6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRm9sbG93cyA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0ZvbGxvd3MnLFxyXG4gIGZvbGxvd2luZz86IE1heWJlPEFycmF5PE1heWJlPEZvbGxvdz4+PixcclxuICBmb2xsb3dlcnM/OiBNYXliZTxBcnJheTxNYXliZTxGb2xsb3c+Pj4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBIYXJkc2NhcGUgPSB7XHJcbiAgX190eXBlbmFtZT86ICdIYXJkc2NhcGUnLFxyXG4gIGlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBwcmVkZWZpbmVkOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbiAgbmFtZTogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgZGVzY3JpcHRpb24/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgaW1hZ2U/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJbWFnZVVwbG9hZFJlc3VsdCA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0ltYWdlVXBsb2FkUmVzdWx0JyxcclxuICBpbWFnZVVybDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgaW1hZ2VQdWJsaWNJZDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBJbWFnZVZhcmlhbnQge1xyXG4gIFByb2ZpbGUgPSAnUFJPRklMRScsXHJcbiAgQ292ZXIgPSAnQ09WRVInXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIExpZ2h0ID0gRXF1aXBtZW50ICYge1xyXG4gIF9fdHlwZW5hbWU/OiAnTGlnaHQnLFxyXG4gIGlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBwcmVkZWZpbmVkOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbiAgbW9kZWw6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIHdpZHRoPzogTWF5YmU8U2NhbGFyc1snRmxvYXQnXT4sXHJcbiAgaGVpZ2h0PzogTWF5YmU8U2NhbGFyc1snRmxvYXQnXT4sXHJcbiAgZGVwdGg/OiBNYXliZTxTY2FsYXJzWydGbG9hdCddPixcclxuICBwb3dlcj86IE1heWJlPFNjYWxhcnNbJ0Zsb2F0J10+LFxyXG4gIGx1bWVuTWluPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIGx1bWVuTWF4PzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIGtlbHZpbk1pbj86IE1heWJlPFNjYWxhcnNbJ0ludCddPixcclxuICBrZWx2aW5NYXg/OiBNYXliZTxTY2FsYXJzWydJbnQnXT4sXHJcbiAgZGltbWFibGU/OiBNYXliZTxTY2FsYXJzWydCb29sZWFuJ10+LFxyXG4gIGRlc2NyaXB0aW9uPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGltYWdlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGJyYW5kPzogTWF5YmU8QnJhbmQ+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTGlrZSA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0xpa2UnLFxyXG4gIGlkOiBTY2FsYXJzWydJbnQnXSxcclxuICB1c2VySWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGFxdWFzY2FwZUltYWdlSWQ/OiBNYXliZTxTY2FsYXJzWydJbnQnXT4sXHJcbiAgYXF1YXNjYXBlSWQ/OiBNYXliZTxTY2FsYXJzWydJbnQnXT4sXHJcbiAgY29tbWVudElkPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG59O1xyXG5cclxuZXhwb3J0IGVudW0gTGlrZUVudGl0eVR5cGUge1xyXG4gIEFxdWFzY2FwZSA9ICdBUVVBU0NBUEUnLFxyXG4gIEltYWdlID0gJ0lNQUdFJyxcclxuICBDb21tZW50ID0gJ0NPTU1FTlQnXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIExpdmVzdG9jayA9IHtcclxuICBfX3R5cGVuYW1lPzogJ0xpdmVzdG9jaycsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIG5hbWU6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIGRlc2NyaXB0aW9uPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGltYWdlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTWFpbkltYWdlVXBsb2FkUmVzdWx0ID0ge1xyXG4gIF9fdHlwZW5hbWU/OiAnTWFpbkltYWdlVXBsb2FkUmVzdWx0JyxcclxuICBtYWluSW1hZ2VQdWJsaWNJZDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgbWFpbkltYWdlVXJsOiBTY2FsYXJzWydTdHJpbmcnXSxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uID0ge1xyXG4gIF9fdHlwZW5hbWU/OiAnTXV0YXRpb24nLFxyXG4gIHVwbG9hZFVzZXJJbWFnZTogSW1hZ2VVcGxvYWRSZXN1bHQsXHJcbiAgdXBkYXRlVXNlckRldGFpbHM/OiBNYXliZTxBcnJheTxNYXliZTxVc2VyPj4+LFxyXG4gIGNvbmZpcm1FbWFpbD86IE1heWJlPEF1dGhQYXlsb2FkPixcclxuICBhZGRFcXVpcG1lbnQ6IEVxdWlwbWVudCxcclxuICByZW1vdmVFcXVpcG1lbnQ/OiBNYXliZTxFcXVpcG1lbnQ+LFxyXG4gIGFkZExpZ2h0OiBMaWdodCxcclxuICByZW1vdmVMaWdodD86IE1heWJlPExpZ2h0PixcclxuICBhZGRQbGFudDogUGxhbnQsXHJcbiAgcmVtb3ZlUGxhbnQ/OiBNYXliZTxQbGFudD4sXHJcbiAgYWRkSGFyZHNjYXBlOiBIYXJkc2NhcGUsXHJcbiAgcmVtb3ZlSGFyZHNjYXBlPzogTWF5YmU8SGFyZHNjYXBlPixcclxuICBhZGRMaXZlc3RvY2s6IExpdmVzdG9jayxcclxuICByZW1vdmVMaXZlc3RvY2s/OiBNYXliZTxMaXZlc3RvY2s+LFxyXG4gIGxpa2U/OiBNYXliZTxMaWtlPixcclxuICBkaXNsaWtlPzogTWF5YmU8TGlrZT4sXHJcbiAgYWRkQXF1YXNjYXBlSW1hZ2U6IEFxdWFzY2FwZUltYWdlLFxyXG4gIGRlbGV0ZUFxdWFzY2FwZUltYWdlPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIGNyZWF0ZUFxdWFzY2FwZTogQXF1YXNjYXBlLFxyXG4gIHVwZGF0ZUFxdWFzY2FwZVRpdGxlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIHVwZGF0ZUFxdWFzY2FwZU1haW5JbWFnZTogTWFpbkltYWdlVXBsb2FkUmVzdWx0LFxyXG4gIGFkZENvbW1lbnQ/OiBNYXliZTxDb21tZW50PixcclxuICByZW1vdmVDb21tZW50PzogTWF5YmU8Q29tbWVudD4sXHJcbiAgZm9sbG93VXNlcj86IE1heWJlPFVzZXI+LFxyXG4gIHVuZm9sbG93VXNlcj86IE1heWJlPFVzZXI+LFxyXG4gIGxvZ2luPzogTWF5YmU8QXV0aFBheWxvYWQ+LFxyXG4gIHJlZ2lzdGVyPzogTWF5YmU8VXNlcj4sXHJcbiAgZmJSZWdpc3Rlcj86IE1heWJlPEF1dGhQYXlsb2FkPixcclxuICBnb29nbGVSZWdpc3Rlcj86IE1heWJlPEF1dGhQYXlsb2FkPixcclxuICB2aXNpdEFxdWFzY2FwZTogVmlzaXRBcXVhc2NhcGVSZXN1bHQsXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25VcGxvYWRVc2VySW1hZ2VBcmdzID0ge1xyXG4gIGZpbGU6IFNjYWxhcnNbJ1VwbG9hZCddLFxyXG4gIGltYWdlVmFyaWFudDogSW1hZ2VWYXJpYW50XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25VcGRhdGVVc2VyRGV0YWlsc0FyZ3MgPSB7XHJcbiAgZGV0YWlsczogVXNlckRldGFpbHNcclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvbkNvbmZpcm1FbWFpbEFyZ3MgPSB7XHJcbiAgdG9rZW46IFNjYWxhcnNbJ1N0cmluZyddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25BZGRFcXVpcG1lbnRBcmdzID0ge1xyXG4gIGVxdWlwbWVudDogRXF1aXBtZW50QXJncyxcclxuICBhcXVhc2NhcGVJZDogU2NhbGFyc1snSW50J11cclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvblJlbW92ZUVxdWlwbWVudEFyZ3MgPSB7XHJcbiAgZXF1aXBtZW50OiBFcXVpcG1lbnRBcmdzLFxyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uQWRkTGlnaHRBcmdzID0ge1xyXG4gIGJyYW5kOiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICBtb2RlbDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgYXF1YXNjYXBlSWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25SZW1vdmVMaWdodEFyZ3MgPSB7XHJcbiAgbGlnaHRJZDogU2NhbGFyc1snSW50J10sXHJcbiAgYXF1YXNjYXBlSWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25BZGRQbGFudEFyZ3MgPSB7XHJcbiAgcGxhbnRJZD86IE1heWJlPFNjYWxhcnNbJ0ludCddPixcclxuICBuYW1lPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uUmVtb3ZlUGxhbnRBcmdzID0ge1xyXG4gIHBsYW50SWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uQWRkSGFyZHNjYXBlQXJncyA9IHtcclxuICBoYXJkc2NhcGVJZD86IE1heWJlPFNjYWxhcnNbJ0ludCddPixcclxuICBuYW1lPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uUmVtb3ZlSGFyZHNjYXBlQXJncyA9IHtcclxuICBoYXJkc2NhcGVJZDogU2NhbGFyc1snSW50J10sXHJcbiAgYXF1YXNjYXBlSWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25BZGRMaXZlc3RvY2tBcmdzID0ge1xyXG4gIGxpdmVzdG9ja0lkPzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIG5hbWU/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgYXF1YXNjYXBlSWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25SZW1vdmVMaXZlc3RvY2tBcmdzID0ge1xyXG4gIGxpdmVzdG9ja0lkOiBTY2FsYXJzWydJbnQnXSxcclxuICBhcXVhc2NhcGVJZDogU2NhbGFyc1snSW50J11cclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvbkxpa2VBcmdzID0ge1xyXG4gIGVudGl0eTogTGlrZUVudGl0eVR5cGUsXHJcbiAgZW50aXR5SWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25EaXNsaWtlQXJncyA9IHtcclxuICBlbnRpdHk6IExpa2VFbnRpdHlUeXBlLFxyXG4gIGVudGl0eUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uQWRkQXF1YXNjYXBlSW1hZ2VBcmdzID0ge1xyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBmaWxlOiBTY2FsYXJzWydVcGxvYWQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uRGVsZXRlQXF1YXNjYXBlSW1hZ2VBcmdzID0ge1xyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBpbWFnZUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uVXBkYXRlQXF1YXNjYXBlVGl0bGVBcmdzID0ge1xyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXSxcclxuICB0aXRsZTogU2NhbGFyc1snU3RyaW5nJ11cclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvblVwZGF0ZUFxdWFzY2FwZU1haW5JbWFnZUFyZ3MgPSB7XHJcbiAgYXF1YXNjYXBlSWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGZpbGU6IFNjYWxhcnNbJ1VwbG9hZCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25BZGRDb21tZW50QXJncyA9IHtcclxuICBlbnRpdHk6IENvbW1lbnRFbnRpdHlUeXBlLFxyXG4gIGVudGl0eUlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBjb250ZW50OiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICBwYXJlbnRDb21tZW50SWQ/OiBNYXliZTxTY2FsYXJzWydJbnQnXT5cclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvblJlbW92ZUNvbW1lbnRBcmdzID0ge1xyXG4gIGlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uRm9sbG93VXNlckFyZ3MgPSB7XHJcbiAgdXNlcklkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uVW5mb2xsb3dVc2VyQXJncyA9IHtcclxuICB1c2VySWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgTXV0YXRpb25Mb2dpbkFyZ3MgPSB7XHJcbiAgZW1haWw6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIHBhc3N3b3JkOiBTY2FsYXJzWydTdHJpbmcnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uUmVnaXN0ZXJBcmdzID0ge1xyXG4gIGVtYWlsOiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICBwYXNzd29yZDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgbmFtZTogU2NhbGFyc1snU3RyaW5nJ11cclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvbkZiUmVnaXN0ZXJBcmdzID0ge1xyXG4gIHRva2VuOiBTY2FsYXJzWydTdHJpbmcnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uR29vZ2xlUmVnaXN0ZXJBcmdzID0ge1xyXG4gIHRva2VuOiBTY2FsYXJzWydTdHJpbmcnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIE11dGF0aW9uVmlzaXRBcXVhc2NhcGVBcmdzID0ge1xyXG4gIGFxdWFzY2FwZUlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUGFnaW5hdGlvbiA9IHtcclxuICBsaW1pdD86IE1heWJlPFNjYWxhcnNbJ0ludCddPixcclxuICBjdXJzb3I/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgb2Zmc2V0PzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUGxhbnQgPSB7XHJcbiAgX190eXBlbmFtZT86ICdQbGFudCcsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIG5hbWU6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIGRlc2NyaXB0aW9uPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGltYWdlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIG9yaWdpbj86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBtaW5IZWlnaHQ/OiBNYXliZTxTY2FsYXJzWydJbnQnXT4sXHJcbiAgbWF4SGVpZ2h0PzogTWF5YmU8U2NhbGFyc1snSW50J10+LFxyXG4gIHBvc2l0aW9uPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGx1bWlub3NpdHk/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgZ3Jvd3RoU3BlZWQ/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgZGlmZmljdWx0eT86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFF1ZXJ5ID0ge1xyXG4gIF9fdHlwZW5hbWU/OiAnUXVlcnknLFxyXG4gIG1lPzogTWF5YmU8VXNlcj4sXHJcbiAgdXNlcj86IE1heWJlPFVzZXI+LFxyXG4gIHVzZXJCeVNsdWc/OiBNYXliZTxVc2VyPixcclxuICB1c2VyczogQXJyYXk8TWF5YmU8VXNlcj4+LFxyXG4gIGZpbHRlcnM6IEFycmF5PEZpbHRlcj4sXHJcbiAgbGlnaHRzOiBBcnJheTxMaWdodD4sXHJcbiAgcGxhbnRzOiBBcnJheTxQbGFudD4sXHJcbiAgaGFyZHNjYXBlOiBBcnJheTxIYXJkc2NhcGU+LFxyXG4gIGxpdmVzdG9jazogQXJyYXk8TGl2ZXN0b2NrPixcclxuICBzdWJzdHJhdGVzOiBBcnJheTxTdWJzdHJhdGU+LFxyXG4gIGFkZGl0aXZlczogQXJyYXk8QWRkaXRpdmU+LFxyXG4gIGFxdWFzY2FwZXM6IEFxdWFzY2FwZXNSZXN1bHQsXHJcbiAgdHJlbmRpbmdBcXVhc2NhcGVzOiBBcnJheTxBcXVhc2NhcGU+LFxyXG4gIGZlYXR1cmVkQXF1YXNjYXBlPzogTWF5YmU8QXF1YXNjYXBlPixcclxuICBhcXVhc2NhcGU/OiBNYXliZTxBcXVhc2NhcGU+LFxyXG4gIGJyYW5kczogQXJyYXk8QnJhbmQ+LFxyXG4gIGNvbW1lbnRzOiBBcnJheTxDb21tZW50PixcclxuICB1c2VyUHJvZmlsZVNsdWdFeGlzdHM/OiBNYXliZTxTY2FsYXJzWydCb29sZWFuJ10+LFxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFF1ZXJ5VXNlckFyZ3MgPSB7XHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlVc2VyQnlTbHVnQXJncyA9IHtcclxuICBzbHVnOiBTY2FsYXJzWydTdHJpbmcnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFF1ZXJ5QXF1YXNjYXBlc0FyZ3MgPSB7XHJcbiAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbixcclxuICB1c2VySWQ/OiBNYXliZTxTY2FsYXJzWydJbnQnXT4sXHJcbiAgcmFuZG9tPzogTWF5YmU8U2NhbGFyc1snQm9vbGVhbiddPlxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFF1ZXJ5VHJlbmRpbmdBcXVhc2NhcGVzQXJncyA9IHtcclxuICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlBcXVhc2NhcGVBcmdzID0ge1xyXG4gIGlkOiBTY2FsYXJzWydJbnQnXVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFF1ZXJ5Q29tbWVudHNBcmdzID0ge1xyXG4gIGVudGl0eTogQ29tbWVudEVudGl0eVR5cGUsXHJcbiAgZW50aXR5SWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb25cclxufTtcclxuXHJcblxyXG5leHBvcnQgdHlwZSBRdWVyeVVzZXJQcm9maWxlU2x1Z0V4aXN0c0FyZ3MgPSB7XHJcbiAgc2x1ZzogU2NhbGFyc1snU3RyaW5nJ11cclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFN1YnN0cmF0ZSA9IEVxdWlwbWVudCAmIHtcclxuICBfX3R5cGVuYW1lPzogJ1N1YnN0cmF0ZScsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIHByZWRlZmluZWQ6IFNjYWxhcnNbJ0Jvb2xlYW4nXSxcclxuICBtb2RlbDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgZGVzY3JpcHRpb24/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgaW1hZ2U/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgYnJhbmQ/OiBNYXliZTxCcmFuZD4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUYWcgPSB7XHJcbiAgX190eXBlbmFtZT86ICdUYWcnLFxyXG4gIGlkOiBTY2FsYXJzWydJbnQnXSxcclxuICBwcmVkZWZpbmVkOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbiAgbmFtZTogU2NhbGFyc1snU3RyaW5nJ10sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUYW5rID0ge1xyXG4gIF9fdHlwZW5hbWU/OiAnVGFuaycsXHJcbiAgaWQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIHZvbHVtZT86IE1heWJlPFNjYWxhcnNbJ0Zsb2F0J10+LFxyXG4gIHdpZHRoPzogTWF5YmU8U2NhbGFyc1snRmxvYXQnXT4sXHJcbiAgaGVpZ2h0PzogTWF5YmU8U2NhbGFyc1snRmxvYXQnXT4sXHJcbiAgZGVwdGg/OiBNYXliZTxTY2FsYXJzWydGbG9hdCddPixcclxuICBnbGFzc1RoaWNrbmVzcz86IE1heWJlPFNjYWxhcnNbJ0Zsb2F0J10+LFxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFVzZXIgPSB7XHJcbiAgX190eXBlbmFtZT86ICdVc2VyJyxcclxuICBpZDogU2NhbGFyc1snSW50J10sXHJcbiAgc2x1ZzogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgbmFtZTogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgYWJvdXQ/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgcHJvZmlsZUltYWdlPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIHByb2ZpbGVJbWFnZVB1YmxpY0lkPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGNvdmVySW1hZ2U/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgY292ZXJJbWFnZVB1YmxpY0lkPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGNvdW50cnk/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgZmFjZWJvb2tVcmw/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgeW91dHViZVVybD86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBpbnN0YWdyYW1Vcmw/OiBNYXliZTxTY2FsYXJzWydTdHJpbmcnXT4sXHJcbiAgdHdpdHRlclVybD86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBjcmVhdGVkQXQ6IFNjYWxhcnNbJ1N0cmluZyddLFxyXG4gIHVwZGF0ZWRBdDogU2NhbGFyc1snU3RyaW5nJ10sXHJcbiAgYXF1YXNjYXBlczogQXF1YXNjYXBlc1Jlc3VsdCxcclxuICBmb2xsb3dlcnNDb3VudDogU2NhbGFyc1snSW50J10sXHJcbiAgZm9sbG93aW5nQ291bnQ6IFNjYWxhcnNbJ0ludCddLFxyXG4gIGlzRm9sbG93ZWRCeU1lOiBTY2FsYXJzWydCb29sZWFuJ10sXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgVXNlckFxdWFzY2FwZXNBcmdzID0ge1xyXG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb24sXHJcbiAgcmFuZG9tPzogTWF5YmU8U2NhbGFyc1snQm9vbGVhbiddPlxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlckRldGFpbHMgPSB7XHJcbiAgbmFtZT86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBhYm91dD86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICBmYWNlYm9va1VybD86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICB5b3V0dWJlVXJsPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIGluc3RhZ3JhbVVybD86IE1heWJlPFNjYWxhcnNbJ1N0cmluZyddPixcclxuICB0d2l0dGVyVXJsPzogTWF5YmU8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVmlzaXRBcXVhc2NhcGVSZXN1bHQgPSB7XHJcbiAgX190eXBlbmFtZT86ICdWaXNpdEFxdWFzY2FwZVJlc3VsdCcsXHJcbiAgdmlzaXRvcjogVmlzaXRvcixcclxuICBjcmVhdGVkPzogTWF5YmU8U2NhbGFyc1snQm9vbGVhbiddPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFZpc2l0b3IgPSB7XHJcbiAgX190eXBlbmFtZT86ICdWaXNpdG9yJyxcclxuICBpZDogU2NhbGFyc1snSW50J10sXHJcbiAgdmlzaXRvcklkOiBTY2FsYXJzWydTdHJpbmcnXSxcclxuICBhcXVhc2NhcGVJZDogU2NhbGFyc1snSW50J10sXHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFJlc29sdmVyVHlwZVdyYXBwZXI8VD4gPSBQcm9taXNlPFQ+IHwgVDtcclxuXHJcbmV4cG9ydCB0eXBlIFJlc29sdmVyRm48VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPiA9IChcclxuICBwYXJlbnQ6IFRQYXJlbnQsXHJcbiAgYXJnczogVEFyZ3MsXHJcbiAgY29udGV4dDogVENvbnRleHQsXHJcbiAgaW5mbzogR3JhcGhRTFJlc29sdmVJbmZvXHJcbikgPT4gUHJvbWlzZTxUUmVzdWx0PiB8IFRSZXN1bHQ7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgU3RpdGNoaW5nUmVzb2x2ZXI8VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPiA9IHtcclxuICBmcmFnbWVudDogc3RyaW5nO1xyXG4gIHJlc29sdmU6IFJlc29sdmVyRm48VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFJlc29sdmVyPFRSZXN1bHQsIFRQYXJlbnQgPSB7fSwgVENvbnRleHQgPSB7fSwgVEFyZ3MgPSB7fT4gPVxyXG4gIHwgUmVzb2x2ZXJGbjxUUmVzdWx0LCBUUGFyZW50LCBUQ29udGV4dCwgVEFyZ3M+XHJcbiAgfCBTdGl0Y2hpbmdSZXNvbHZlcjxUUmVzdWx0LCBUUGFyZW50LCBUQ29udGV4dCwgVEFyZ3M+O1xyXG5cclxuZXhwb3J0IHR5cGUgU3Vic2NyaXB0aW9uU3Vic2NyaWJlRm48VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPiA9IChcclxuICBwYXJlbnQ6IFRQYXJlbnQsXHJcbiAgYXJnczogVEFyZ3MsXHJcbiAgY29udGV4dDogVENvbnRleHQsXHJcbiAgaW5mbzogR3JhcGhRTFJlc29sdmVJbmZvXHJcbikgPT4gQXN5bmNJdGVyYXRvcjxUUmVzdWx0PiB8IFByb21pc2U8QXN5bmNJdGVyYXRvcjxUUmVzdWx0Pj47XHJcblxyXG5leHBvcnQgdHlwZSBTdWJzY3JpcHRpb25SZXNvbHZlRm48VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPiA9IChcclxuICBwYXJlbnQ6IFRQYXJlbnQsXHJcbiAgYXJnczogVEFyZ3MsXHJcbiAgY29udGV4dDogVENvbnRleHQsXHJcbiAgaW5mbzogR3JhcGhRTFJlc29sdmVJbmZvXHJcbikgPT4gVFJlc3VsdCB8IFByb21pc2U8VFJlc3VsdD47XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN1YnNjcmlwdGlvblJlc29sdmVyT2JqZWN0PFRSZXN1bHQsIFRQYXJlbnQsIFRDb250ZXh0LCBUQXJncz4ge1xyXG4gIHN1YnNjcmliZTogU3Vic2NyaXB0aW9uU3Vic2NyaWJlRm48VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPjtcclxuICByZXNvbHZlPzogU3Vic2NyaXB0aW9uUmVzb2x2ZUZuPFRSZXN1bHQsIFRQYXJlbnQsIFRDb250ZXh0LCBUQXJncz47XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFN1YnNjcmlwdGlvblJlc29sdmVyPFRSZXN1bHQsIFRQYXJlbnQgPSB7fSwgVENvbnRleHQgPSB7fSwgVEFyZ3MgPSB7fT4gPVxyXG4gIHwgKCguLi5hcmdzOiBhbnlbXSkgPT4gU3Vic2NyaXB0aW9uUmVzb2x2ZXJPYmplY3Q8VFJlc3VsdCwgVFBhcmVudCwgVENvbnRleHQsIFRBcmdzPilcclxuICB8IFN1YnNjcmlwdGlvblJlc29sdmVyT2JqZWN0PFRSZXN1bHQsIFRQYXJlbnQsIFRDb250ZXh0LCBUQXJncz47XHJcblxyXG5leHBvcnQgdHlwZSBUeXBlUmVzb2x2ZUZuPFRUeXBlcywgVFBhcmVudCA9IHt9LCBUQ29udGV4dCA9IHt9PiA9IChcclxuICBwYXJlbnQ6IFRQYXJlbnQsXHJcbiAgY29udGV4dDogVENvbnRleHQsXHJcbiAgaW5mbzogR3JhcGhRTFJlc29sdmVJbmZvXHJcbikgPT4gTWF5YmU8VFR5cGVzPjtcclxuXHJcbmV4cG9ydCB0eXBlIE5leHRSZXNvbHZlckZuPFQ+ID0gKCkgPT4gUHJvbWlzZTxUPjtcclxuXHJcbmV4cG9ydCB0eXBlIERpcmVjdGl2ZVJlc29sdmVyRm48VFJlc3VsdCA9IHt9LCBUUGFyZW50ID0ge30sIFRDb250ZXh0ID0ge30sIFRBcmdzID0ge30+ID0gKFxyXG4gIG5leHQ6IE5leHRSZXNvbHZlckZuPFRSZXN1bHQ+LFxyXG4gIHBhcmVudDogVFBhcmVudCxcclxuICBhcmdzOiBUQXJncyxcclxuICBjb250ZXh0OiBUQ29udGV4dCxcclxuICBpbmZvOiBHcmFwaFFMUmVzb2x2ZUluZm9cclxuKSA9PiBUUmVzdWx0IHwgUHJvbWlzZTxUUmVzdWx0PjtcclxuXHJcbi8qKiBNYXBwaW5nIGJldHdlZW4gYWxsIGF2YWlsYWJsZSBzY2hlbWEgdHlwZXMgYW5kIHRoZSByZXNvbHZlcnMgdHlwZXMgKi9cclxuZXhwb3J0IHR5cGUgUmVzb2x2ZXJzVHlwZXMgPSB7XHJcbiAgUXVlcnk6IFJlc29sdmVyVHlwZVdyYXBwZXI8e30+LFxyXG4gIFVzZXI6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxVc2VyPj4sXHJcbiAgSW50OiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8U2NhbGFyc1snSW50J10+PixcclxuICBTdHJpbmc6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxTY2FsYXJzWydTdHJpbmcnXT4+LFxyXG4gIFBhZ2luYXRpb246IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxQYWdpbmF0aW9uPj4sXHJcbiAgQm9vbGVhbjogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPFNjYWxhcnNbJ0Jvb2xlYW4nXT4+LFxyXG4gIEFxdWFzY2FwZXNSZXN1bHQ6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxBcXVhc2NhcGVzUmVzdWx0Pj4sXHJcbiAgQXF1YXNjYXBlOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8QXF1YXNjYXBlPj4sXHJcbiAgQ08yOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8Q28yPj4sXHJcbiAgVGFuazogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPFRhbms+PixcclxuICBGbG9hdDogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPFNjYWxhcnNbJ0Zsb2F0J10+PixcclxuICBBcXVhc2NhcGVJbWFnZTogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEFxdWFzY2FwZUltYWdlPj4sXHJcbiAgVGFnOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8VGFnPj4sXHJcbiAgUGxhbnQ6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxQbGFudD4+LFxyXG4gIEhhcmRzY2FwZTogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEhhcmRzY2FwZT4+LFxyXG4gIExpdmVzdG9jazogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPExpdmVzdG9jaz4+LFxyXG4gIEZpbHRlcjogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEZpbHRlcj4+LFxyXG4gIEVxdWlwbWVudDogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEVxdWlwbWVudD4+LFxyXG4gIEJyYW5kOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8QnJhbmQ+PixcclxuICBMaWdodDogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPExpZ2h0Pj4sXHJcbiAgU3Vic3RyYXRlOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8U3Vic3RyYXRlPj4sXHJcbiAgQWRkaXRpdmU6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxBZGRpdGl2ZT4+LFxyXG4gIENvbW1lbnQ6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxDb21tZW50Pj4sXHJcbiAgTGlrZTogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPExpa2U+PixcclxuICBDb21tZW50RW50aXR5VHlwZTogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPENvbW1lbnRFbnRpdHlUeXBlPj4sXHJcbiAgTXV0YXRpb246IFJlc29sdmVyVHlwZVdyYXBwZXI8e30+LFxyXG4gIFVwbG9hZDogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPFNjYWxhcnNbJ1VwbG9hZCddPj4sXHJcbiAgSW1hZ2VWYXJpYW50OiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8SW1hZ2VWYXJpYW50Pj4sXHJcbiAgSW1hZ2VVcGxvYWRSZXN1bHQ6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxJbWFnZVVwbG9hZFJlc3VsdD4+LFxyXG4gIFVzZXJEZXRhaWxzOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8VXNlckRldGFpbHM+PixcclxuICBBdXRoUGF5bG9hZDogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEF1dGhQYXlsb2FkPj4sXHJcbiAgRXF1aXBtZW50QXJnczogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEVxdWlwbWVudEFyZ3M+PixcclxuICBFcXVpcG1lbnRUeXBlOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8RXF1aXBtZW50VHlwZT4+LFxyXG4gIExpa2VFbnRpdHlUeXBlOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8TGlrZUVudGl0eVR5cGU+PixcclxuICBNYWluSW1hZ2VVcGxvYWRSZXN1bHQ6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxNYWluSW1hZ2VVcGxvYWRSZXN1bHQ+PixcclxuICBWaXNpdEFxdWFzY2FwZVJlc3VsdDogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPFZpc2l0QXF1YXNjYXBlUmVzdWx0Pj4sXHJcbiAgVmlzaXRvcjogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPFZpc2l0b3I+PixcclxuICBBcXVhc2NhcGVzRmlsdGVyOiBSZXNvbHZlclR5cGVXcmFwcGVyPFBhcnRpYWw8QXF1YXNjYXBlc0ZpbHRlcj4+LFxyXG4gIEZvbGxvdzogUmVzb2x2ZXJUeXBlV3JhcHBlcjxQYXJ0aWFsPEZvbGxvdz4+LFxyXG4gIEZvbGxvd3M6IFJlc29sdmVyVHlwZVdyYXBwZXI8UGFydGlhbDxGb2xsb3dzPj4sXHJcbn07XHJcblxyXG4vKiogTWFwcGluZyBiZXR3ZWVuIGFsbCBhdmFpbGFibGUgc2NoZW1hIHR5cGVzIGFuZCB0aGUgcmVzb2x2ZXJzIHBhcmVudHMgKi9cclxuZXhwb3J0IHR5cGUgUmVzb2x2ZXJzUGFyZW50VHlwZXMgPSB7XHJcbiAgUXVlcnk6IHt9LFxyXG4gIFVzZXI6IFBhcnRpYWw8VXNlcj4sXHJcbiAgSW50OiBQYXJ0aWFsPFNjYWxhcnNbJ0ludCddPixcclxuICBTdHJpbmc6IFBhcnRpYWw8U2NhbGFyc1snU3RyaW5nJ10+LFxyXG4gIFBhZ2luYXRpb246IFBhcnRpYWw8UGFnaW5hdGlvbj4sXHJcbiAgQm9vbGVhbjogUGFydGlhbDxTY2FsYXJzWydCb29sZWFuJ10+LFxyXG4gIEFxdWFzY2FwZXNSZXN1bHQ6IFBhcnRpYWw8QXF1YXNjYXBlc1Jlc3VsdD4sXHJcbiAgQXF1YXNjYXBlOiBQYXJ0aWFsPEFxdWFzY2FwZT4sXHJcbiAgQ08yOiBQYXJ0aWFsPENvMj4sXHJcbiAgVGFuazogUGFydGlhbDxUYW5rPixcclxuICBGbG9hdDogUGFydGlhbDxTY2FsYXJzWydGbG9hdCddPixcclxuICBBcXVhc2NhcGVJbWFnZTogUGFydGlhbDxBcXVhc2NhcGVJbWFnZT4sXHJcbiAgVGFnOiBQYXJ0aWFsPFRhZz4sXHJcbiAgUGxhbnQ6IFBhcnRpYWw8UGxhbnQ+LFxyXG4gIEhhcmRzY2FwZTogUGFydGlhbDxIYXJkc2NhcGU+LFxyXG4gIExpdmVzdG9jazogUGFydGlhbDxMaXZlc3RvY2s+LFxyXG4gIEZpbHRlcjogUGFydGlhbDxGaWx0ZXI+LFxyXG4gIEVxdWlwbWVudDogUGFydGlhbDxFcXVpcG1lbnQ+LFxyXG4gIEJyYW5kOiBQYXJ0aWFsPEJyYW5kPixcclxuICBMaWdodDogUGFydGlhbDxMaWdodD4sXHJcbiAgU3Vic3RyYXRlOiBQYXJ0aWFsPFN1YnN0cmF0ZT4sXHJcbiAgQWRkaXRpdmU6IFBhcnRpYWw8QWRkaXRpdmU+LFxyXG4gIENvbW1lbnQ6IFBhcnRpYWw8Q29tbWVudD4sXHJcbiAgTGlrZTogUGFydGlhbDxMaWtlPixcclxuICBDb21tZW50RW50aXR5VHlwZTogUGFydGlhbDxDb21tZW50RW50aXR5VHlwZT4sXHJcbiAgTXV0YXRpb246IHt9LFxyXG4gIFVwbG9hZDogUGFydGlhbDxTY2FsYXJzWydVcGxvYWQnXT4sXHJcbiAgSW1hZ2VWYXJpYW50OiBQYXJ0aWFsPEltYWdlVmFyaWFudD4sXHJcbiAgSW1hZ2VVcGxvYWRSZXN1bHQ6IFBhcnRpYWw8SW1hZ2VVcGxvYWRSZXN1bHQ+LFxyXG4gIFVzZXJEZXRhaWxzOiBQYXJ0aWFsPFVzZXJEZXRhaWxzPixcclxuICBBdXRoUGF5bG9hZDogUGFydGlhbDxBdXRoUGF5bG9hZD4sXHJcbiAgRXF1aXBtZW50QXJnczogUGFydGlhbDxFcXVpcG1lbnRBcmdzPixcclxuICBFcXVpcG1lbnRUeXBlOiBQYXJ0aWFsPEVxdWlwbWVudFR5cGU+LFxyXG4gIExpa2VFbnRpdHlUeXBlOiBQYXJ0aWFsPExpa2VFbnRpdHlUeXBlPixcclxuICBNYWluSW1hZ2VVcGxvYWRSZXN1bHQ6IFBhcnRpYWw8TWFpbkltYWdlVXBsb2FkUmVzdWx0PixcclxuICBWaXNpdEFxdWFzY2FwZVJlc3VsdDogUGFydGlhbDxWaXNpdEFxdWFzY2FwZVJlc3VsdD4sXHJcbiAgVmlzaXRvcjogUGFydGlhbDxWaXNpdG9yPixcclxuICBBcXVhc2NhcGVzRmlsdGVyOiBQYXJ0aWFsPEFxdWFzY2FwZXNGaWx0ZXI+LFxyXG4gIEZvbGxvdzogUGFydGlhbDxGb2xsb3c+LFxyXG4gIEZvbGxvd3M6IFBhcnRpYWw8Rm9sbG93cz4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBBZGRpdGl2ZVJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydBZGRpdGl2ZSddPiA9IHtcclxuICBpZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHByZWRlZmluZWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snQm9vbGVhbiddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbW9kZWw/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBkZXNjcmlwdGlvbj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBpbWFnZT86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBicmFuZD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydCcmFuZCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgQXF1YXNjYXBlUmVzb2x2ZXJzPENvbnRleHRUeXBlID0gYW55LCBQYXJlbnRUeXBlID0gUmVzb2x2ZXJzUGFyZW50VHlwZXNbJ0FxdWFzY2FwZSddPiA9IHtcclxuICBsaWtlc0NvdW50PzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaXNMaWtlZEJ5TWU/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snQm9vbGVhbiddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjcmVhdGVkQXQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB1cGRhdGVkQXQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB0aXRsZT86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBmZWF0dXJlZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydCb29sZWFuJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB0cmVuZGluZz86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydCb29sZWFuJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBkZXNjcmlwdGlvbj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB1c2VySWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB1c2VyPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1VzZXInXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjbzI/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQ08yJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgdGFuaz86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydUYW5rJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbWFpbkltYWdlVXJsPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIG1haW5JbWFnZVB1YmxpY0lkPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGltYWdlcz86IFJlc29sdmVyPEFycmF5PFJlc29sdmVyc1R5cGVzWydBcXVhc2NhcGVJbWFnZSddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHRhZ3M/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snVGFnJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgcGxhbnRzPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ1BsYW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaGFyZHNjYXBlPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ0hhcmRzY2FwZSddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGxpdmVzdG9jaz86IFJlc29sdmVyPEFycmF5PFJlc29sdmVyc1R5cGVzWydMaXZlc3RvY2snXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBmaWx0ZXJzPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ0ZpbHRlciddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGxpZ2h0cz86IFJlc29sdmVyPEFycmF5PFJlc29sdmVyc1R5cGVzWydMaWdodCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHN1YnN0cmF0ZXM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snU3Vic3RyYXRlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYWRkaXRpdmVzPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ0FkZGl0aXZlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgY29tbWVudHM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snQ29tbWVudCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHZpZXdzQ291bnQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEFxdWFzY2FwZUltYWdlUmVzb2x2ZXJzPENvbnRleHRUeXBlID0gYW55LCBQYXJlbnRUeXBlID0gUmVzb2x2ZXJzUGFyZW50VHlwZXNbJ0FxdWFzY2FwZUltYWdlJ10+ID0ge1xyXG4gIGlkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgdGl0bGU/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgdXJsPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgcHVibGljSWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjcmVhdGVkQXQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB1cGRhdGVkQXQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEFxdWFzY2FwZXNSZXN1bHRSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snQXF1YXNjYXBlc1Jlc3VsdCddPiA9IHtcclxuICByb3dzPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ0FxdWFzY2FwZSddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGNvdW50PzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBBdXRoUGF5bG9hZFJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydBdXRoUGF5bG9hZCddPiA9IHtcclxuICB0b2tlbj86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHVzZXI/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snVXNlciddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBCcmFuZFJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydCcmFuZCddPiA9IHtcclxuICBpZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHByZWRlZmluZWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snQm9vbGVhbiddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbmFtZT86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGxvZ28/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYWRkcmVzcz86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIENvMlJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydDTzInXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB0eXBlPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGJwcz86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydJbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIENvbW1lbnRSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snQ29tbWVudCddPiA9IHtcclxuICBpZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGNyZWF0ZWRBdD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGNvbnRlbnQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwYXJlbnRDb21tZW50SWQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snSW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbGlrZXM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snTGlrZSddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHVzZXI/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snVXNlciddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYXF1YXNjYXBlSW1hZ2VJZD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydJbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBhcXVhc2NhcGVJZD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydJbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjb21tZW50SWQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snSW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFcXVpcG1lbnRSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snRXF1aXBtZW50J10+ID0ge1xyXG4gIF9fcmVzb2x2ZVR5cGU6IFR5cGVSZXNvbHZlRm48J0ZpbHRlcicgfCAnTGlnaHQnIHwgJ1N1YnN0cmF0ZScgfCAnQWRkaXRpdmUnLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwcmVkZWZpbmVkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0Jvb2xlYW4nXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIG1vZGVsPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYnJhbmQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQnJhbmQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEZpbHRlclJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydGaWx0ZXInXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwcmVkZWZpbmVkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0Jvb2xlYW4nXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIG1vZGVsPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYnJhbmQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQnJhbmQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEZvbGxvd1Jlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydGb2xsb3cnXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBmb2xsb3dlZFVzZXJJZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGZvbGxvd2VyVXNlcklkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZm9sbG93ZWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snVXNlciddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZm9sbG93ZXI/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snVXNlciddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgdXBkYXRlZEF0PzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgY3JlYXRlZEF0PzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBGb2xsb3dzUmVzb2x2ZXJzPENvbnRleHRUeXBlID0gYW55LCBQYXJlbnRUeXBlID0gUmVzb2x2ZXJzUGFyZW50VHlwZXNbJ0ZvbGxvd3MnXT4gPSB7XHJcbiAgZm9sbG93aW5nPzogUmVzb2x2ZXI8TWF5YmU8QXJyYXk8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0ZvbGxvdyddPj4+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZm9sbG93ZXJzPzogUmVzb2x2ZXI8TWF5YmU8QXJyYXk8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0ZvbGxvdyddPj4+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBIYXJkc2NhcGVSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snSGFyZHNjYXBlJ10+ID0ge1xyXG4gIGlkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgcHJlZGVmaW5lZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydCb29sZWFuJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBuYW1lPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJbWFnZVVwbG9hZFJlc3VsdFJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydJbWFnZVVwbG9hZFJlc3VsdCddPiA9IHtcclxuICBpbWFnZVVybD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGltYWdlUHVibGljSWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIExpZ2h0UmVzb2x2ZXJzPENvbnRleHRUeXBlID0gYW55LCBQYXJlbnRUeXBlID0gUmVzb2x2ZXJzUGFyZW50VHlwZXNbJ0xpZ2h0J10+ID0ge1xyXG4gIGlkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgcHJlZGVmaW5lZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydCb29sZWFuJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBtb2RlbD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHdpZHRoPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0Zsb2F0J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaGVpZ2h0PzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0Zsb2F0J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVwdGg/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snRmxvYXQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwb3dlcj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydGbG9hdCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGx1bWVuTWluPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0ludCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGx1bWVuTWF4PzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0ludCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGtlbHZpbk1pbj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydJbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBrZWx2aW5NYXg/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snSW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGltbWFibGU/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQm9vbGVhbiddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGRlc2NyaXB0aW9uPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGltYWdlPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGJyYW5kPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0JyYW5kJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBMaWtlUmVzb2x2ZXJzPENvbnRleHRUeXBlID0gYW55LCBQYXJlbnRUeXBlID0gUmVzb2x2ZXJzUGFyZW50VHlwZXNbJ0xpa2UnXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB1c2VySWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBhcXVhc2NhcGVJbWFnZUlkPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0ludCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGFxdWFzY2FwZUlkPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0ludCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGNvbW1lbnRJZD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydJbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIExpdmVzdG9ja1Jlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydMaXZlc3RvY2snXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBuYW1lPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBNYWluSW1hZ2VVcGxvYWRSZXN1bHRSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snTWFpbkltYWdlVXBsb2FkUmVzdWx0J10+ID0ge1xyXG4gIG1haW5JbWFnZVB1YmxpY0lkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbWFpbkltYWdlVXJsPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBNdXRhdGlvblJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydNdXRhdGlvbiddPiA9IHtcclxuICB1cGxvYWRVc2VySW1hZ2U/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW1hZ2VVcGxvYWRSZXN1bHQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uVXBsb2FkVXNlckltYWdlQXJncz4sXHJcbiAgdXBkYXRlVXNlckRldGFpbHM/OiBSZXNvbHZlcjxNYXliZTxBcnJheTxNYXliZTxSZXNvbHZlcnNUeXBlc1snVXNlciddPj4+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25VcGRhdGVVc2VyRGV0YWlsc0FyZ3M+LFxyXG4gIGNvbmZpcm1FbWFpbD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydBdXRoUGF5bG9hZCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uQ29uZmlybUVtYWlsQXJncz4sXHJcbiAgYWRkRXF1aXBtZW50PzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0VxdWlwbWVudCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25BZGRFcXVpcG1lbnRBcmdzPixcclxuICByZW1vdmVFcXVpcG1lbnQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snRXF1aXBtZW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25SZW1vdmVFcXVpcG1lbnRBcmdzPixcclxuICBhZGRMaWdodD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydMaWdodCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25BZGRMaWdodEFyZ3M+LFxyXG4gIHJlbW92ZUxpZ2h0PzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0xpZ2h0J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25SZW1vdmVMaWdodEFyZ3M+LFxyXG4gIGFkZFBsYW50PzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1BsYW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvbkFkZFBsYW50QXJncz4sXHJcbiAgcmVtb3ZlUGxhbnQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snUGxhbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvblJlbW92ZVBsYW50QXJncz4sXHJcbiAgYWRkSGFyZHNjYXBlPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0hhcmRzY2FwZSddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25BZGRIYXJkc2NhcGVBcmdzPixcclxuICByZW1vdmVIYXJkc2NhcGU/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snSGFyZHNjYXBlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25SZW1vdmVIYXJkc2NhcGVBcmdzPixcclxuICBhZGRMaXZlc3RvY2s/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snTGl2ZXN0b2NrJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvbkFkZExpdmVzdG9ja0FyZ3M+LFxyXG4gIHJlbW92ZUxpdmVzdG9jaz86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydMaXZlc3RvY2snXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvblJlbW92ZUxpdmVzdG9ja0FyZ3M+LFxyXG4gIGxpa2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snTGlrZSddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uTGlrZUFyZ3M+LFxyXG4gIGRpc2xpa2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snTGlrZSddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uRGlzbGlrZUFyZ3M+LFxyXG4gIGFkZEFxdWFzY2FwZUltYWdlPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0FxdWFzY2FwZUltYWdlJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvbkFkZEFxdWFzY2FwZUltYWdlQXJncz4sXHJcbiAgZGVsZXRlQXF1YXNjYXBlSW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snSW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25EZWxldGVBcXVhc2NhcGVJbWFnZUFyZ3M+LFxyXG4gIGNyZWF0ZUFxdWFzY2FwZT86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydBcXVhc2NhcGUnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHVwZGF0ZUFxdWFzY2FwZVRpdGxlPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uVXBkYXRlQXF1YXNjYXBlVGl0bGVBcmdzPixcclxuICB1cGRhdGVBcXVhc2NhcGVNYWluSW1hZ2U/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snTWFpbkltYWdlVXBsb2FkUmVzdWx0J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvblVwZGF0ZUFxdWFzY2FwZU1haW5JbWFnZUFyZ3M+LFxyXG4gIGFkZENvbW1lbnQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQ29tbWVudCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uQWRkQ29tbWVudEFyZ3M+LFxyXG4gIHJlbW92ZUNvbW1lbnQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQ29tbWVudCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uUmVtb3ZlQ29tbWVudEFyZ3M+LFxyXG4gIGZvbGxvd1VzZXI/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snVXNlciddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uRm9sbG93VXNlckFyZ3M+LFxyXG4gIHVuZm9sbG93VXNlcj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydVc2VyJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25VbmZvbGxvd1VzZXJBcmdzPixcclxuICBsb2dpbj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydBdXRoUGF5bG9hZCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uTG9naW5BcmdzPixcclxuICByZWdpc3Rlcj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydVc2VyJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25SZWdpc3RlckFyZ3M+LFxyXG4gIGZiUmVnaXN0ZXI/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQXV0aFBheWxvYWQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBNdXRhdGlvbkZiUmVnaXN0ZXJBcmdzPixcclxuICBnb29nbGVSZWdpc3Rlcj86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydBdXRoUGF5bG9hZCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIE11dGF0aW9uR29vZ2xlUmVnaXN0ZXJBcmdzPixcclxuICB2aXNpdEFxdWFzY2FwZT86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydWaXNpdEFxdWFzY2FwZVJlc3VsdCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgTXV0YXRpb25WaXNpdEFxdWFzY2FwZUFyZ3M+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUGxhbnRSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snUGxhbnQnXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBuYW1lPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgb3JpZ2luPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIG1pbkhlaWdodD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydJbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBtYXhIZWlnaHQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snSW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgcG9zaXRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbHVtaW5vc2l0eT86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBncm93dGhTcGVlZD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBkaWZmaWN1bHR5PzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUXVlcnlSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snUXVlcnknXT4gPSB7XHJcbiAgbWU/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snVXNlciddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHVzZXI/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snVXNlciddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIFF1ZXJ5VXNlckFyZ3M+LFxyXG4gIHVzZXJCeVNsdWc/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snVXNlciddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIFF1ZXJ5VXNlckJ5U2x1Z0FyZ3M+LFxyXG4gIHVzZXJzPzogUmVzb2x2ZXI8QXJyYXk8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1VzZXInXT4+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZmlsdGVycz86IFJlc29sdmVyPEFycmF5PFJlc29sdmVyc1R5cGVzWydGaWx0ZXInXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBsaWdodHM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snTGlnaHQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwbGFudHM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snUGxhbnQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBoYXJkc2NhcGU/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snSGFyZHNjYXBlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgbGl2ZXN0b2NrPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ0xpdmVzdG9jayddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHN1YnN0cmF0ZXM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snU3Vic3RyYXRlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYWRkaXRpdmVzPzogUmVzb2x2ZXI8QXJyYXk8UmVzb2x2ZXJzVHlwZXNbJ0FkZGl0aXZlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYXF1YXNjYXBlcz86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydBcXVhc2NhcGVzUmVzdWx0J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlLCBRdWVyeUFxdWFzY2FwZXNBcmdzPixcclxuICB0cmVuZGluZ0FxdWFzY2FwZXM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snQXF1YXNjYXBlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgUXVlcnlUcmVuZGluZ0FxdWFzY2FwZXNBcmdzPixcclxuICBmZWF0dXJlZEFxdWFzY2FwZT86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydBcXVhc2NhcGUnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBhcXVhc2NhcGU/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQXF1YXNjYXBlJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgUXVlcnlBcXVhc2NhcGVBcmdzPixcclxuICBicmFuZHM/OiBSZXNvbHZlcjxBcnJheTxSZXNvbHZlcnNUeXBlc1snQnJhbmQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjb21tZW50cz86IFJlc29sdmVyPEFycmF5PFJlc29sdmVyc1R5cGVzWydDb21tZW50J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgUXVlcnlDb21tZW50c0FyZ3M+LFxyXG4gIHVzZXJQcm9maWxlU2x1Z0V4aXN0cz86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydCb29sZWFuJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZSwgUXVlcnlVc2VyUHJvZmlsZVNsdWdFeGlzdHNBcmdzPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFN1YnN0cmF0ZVJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydTdWJzdHJhdGUnXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwcmVkZWZpbmVkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0Jvb2xlYW4nXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIG1vZGVsPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVzY3JpcHRpb24/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYnJhbmQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snQnJhbmQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRhZ1Jlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueSwgUGFyZW50VHlwZSA9IFJlc29sdmVyc1BhcmVudFR5cGVzWydUYWcnXT4gPSB7XHJcbiAgaWQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBwcmVkZWZpbmVkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0Jvb2xlYW4nXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIG5hbWU/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRhbmtSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snVGFuayddPiA9IHtcclxuICBpZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHZvbHVtZT86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydGbG9hdCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHdpZHRoPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0Zsb2F0J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgaGVpZ2h0PzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0Zsb2F0J10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZGVwdGg/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snRmxvYXQnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBnbGFzc1RoaWNrbmVzcz86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydGbG9hdCddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWRTY2FsYXJDb25maWcgZXh0ZW5kcyBHcmFwaFFMU2NhbGFyVHlwZUNvbmZpZzxSZXNvbHZlcnNUeXBlc1snVXBsb2FkJ10sIGFueT4ge1xyXG4gIG5hbWU6ICdVcGxvYWQnXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFVzZXJSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snVXNlciddPiA9IHtcclxuICBpZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHNsdWc/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBuYW1lPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgYWJvdXQ/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgcHJvZmlsZUltYWdlPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHByb2ZpbGVJbWFnZVB1YmxpY0lkPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGNvdmVySW1hZ2U/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgY292ZXJJbWFnZVB1YmxpY0lkPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ1N0cmluZyddPiwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGNvdW50cnk/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgZmFjZWJvb2tVcmw/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgeW91dHViZVVybD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBpbnN0YWdyYW1Vcmw/OiBSZXNvbHZlcjxNYXliZTxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10+LCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbiAgdHdpdHRlclVybD86IFJlc29sdmVyPE1heWJlPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjcmVhdGVkQXQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICB1cGRhdGVkQXQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snU3RyaW5nJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBhcXVhc2NhcGVzPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0FxdWFzY2FwZXNSZXN1bHQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGUsIFVzZXJBcXVhc2NhcGVzQXJncz4sXHJcbiAgZm9sbG93ZXJzQ291bnQ/OiBSZXNvbHZlcjxSZXNvbHZlcnNUeXBlc1snSW50J10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBmb2xsb3dpbmdDb3VudD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGlzRm9sbG93ZWRCeU1lPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0Jvb2xlYW4nXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVmlzaXRBcXVhc2NhcGVSZXN1bHRSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snVmlzaXRBcXVhc2NhcGVSZXN1bHQnXT4gPSB7XHJcbiAgdmlzaXRvcj86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydWaXNpdG9yJ10sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxuICBjcmVhdGVkPzogUmVzb2x2ZXI8TWF5YmU8UmVzb2x2ZXJzVHlwZXNbJ0Jvb2xlYW4nXT4sIFBhcmVudFR5cGUsIENvbnRleHRUeXBlPixcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFZpc2l0b3JSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnksIFBhcmVudFR5cGUgPSBSZXNvbHZlcnNQYXJlbnRUeXBlc1snVmlzaXRvciddPiA9IHtcclxuICBpZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydJbnQnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIHZpc2l0b3JJZD86IFJlc29sdmVyPFJlc29sdmVyc1R5cGVzWydTdHJpbmcnXSwgUGFyZW50VHlwZSwgQ29udGV4dFR5cGU+LFxyXG4gIGFxdWFzY2FwZUlkPzogUmVzb2x2ZXI8UmVzb2x2ZXJzVHlwZXNbJ0ludCddLCBQYXJlbnRUeXBlLCBDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBSZXNvbHZlcnM8Q29udGV4dFR5cGUgPSBhbnk+ID0ge1xyXG4gIEFkZGl0aXZlPzogQWRkaXRpdmVSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIEFxdWFzY2FwZT86IEFxdWFzY2FwZVJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgQXF1YXNjYXBlSW1hZ2U/OiBBcXVhc2NhcGVJbWFnZVJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgQXF1YXNjYXBlc1Jlc3VsdD86IEFxdWFzY2FwZXNSZXN1bHRSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIEF1dGhQYXlsb2FkPzogQXV0aFBheWxvYWRSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIEJyYW5kPzogQnJhbmRSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIENPMj86IENvMlJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgQ29tbWVudD86IENvbW1lbnRSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIEVxdWlwbWVudD86IEVxdWlwbWVudFJlc29sdmVycyxcclxuICBGaWx0ZXI/OiBGaWx0ZXJSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIEZvbGxvdz86IEZvbGxvd1Jlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgRm9sbG93cz86IEZvbGxvd3NSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIEhhcmRzY2FwZT86IEhhcmRzY2FwZVJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgSW1hZ2VVcGxvYWRSZXN1bHQ/OiBJbWFnZVVwbG9hZFJlc3VsdFJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgTGlnaHQ/OiBMaWdodFJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgTGlrZT86IExpa2VSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIExpdmVzdG9jaz86IExpdmVzdG9ja1Jlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgTWFpbkltYWdlVXBsb2FkUmVzdWx0PzogTWFpbkltYWdlVXBsb2FkUmVzdWx0UmVzb2x2ZXJzPENvbnRleHRUeXBlPixcclxuICBNdXRhdGlvbj86IE11dGF0aW9uUmVzb2x2ZXJzPENvbnRleHRUeXBlPixcclxuICBQbGFudD86IFBsYW50UmVzb2x2ZXJzPENvbnRleHRUeXBlPixcclxuICBRdWVyeT86IFF1ZXJ5UmVzb2x2ZXJzPENvbnRleHRUeXBlPixcclxuICBTdWJzdHJhdGU/OiBTdWJzdHJhdGVSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIFRhZz86IFRhZ1Jlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbiAgVGFuaz86IFRhbmtSZXNvbHZlcnM8Q29udGV4dFR5cGU+LFxyXG4gIFVwbG9hZD86IEdyYXBoUUxTY2FsYXJUeXBlLFxyXG4gIFVzZXI/OiBVc2VyUmVzb2x2ZXJzPENvbnRleHRUeXBlPixcclxuICBWaXNpdEFxdWFzY2FwZVJlc3VsdD86IFZpc2l0QXF1YXNjYXBlUmVzdWx0UmVzb2x2ZXJzPENvbnRleHRUeXBlPixcclxuICBWaXNpdG9yPzogVmlzaXRvclJlc29sdmVyczxDb250ZXh0VHlwZT4sXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqIFVzZSBcIlJlc29sdmVyc1wiIHJvb3Qgb2JqZWN0IGluc3RlYWQuIElmIHlvdSB3aXNoIHRvIGdldCBcIklSZXNvbHZlcnNcIiwgYWRkIFwidHlwZXNQcmVmaXg6IElcIiB0byB5b3VyIGNvbmZpZy5cclxuKi9cclxuZXhwb3J0IHR5cGUgSVJlc29sdmVyczxDb250ZXh0VHlwZSA9IGFueT4gPSBSZXNvbHZlcnM8Q29udGV4dFR5cGU+O1xyXG4iLCJpbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nXHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XHJcbiAgICB0cmFuc3BvcnRzOiBbbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKCldLFxyXG59KVxyXG4iLCJpbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnXHJcbmltcG9ydCB7c3RhcnR1cH0gZnJvbSAnc2VydmVyJ1xyXG5pbXBvcnQge0FwcE1vZHVsZX0gZnJvbSAnYXBpL21vZHVsZXMvQXBwJ1xyXG5cclxuc3RhcnR1cChBcHBNb2R1bGUpXHJcbiIsImltcG9ydCB7QXBvbGxvU2VydmVyfSBmcm9tICdhcG9sbG8tc2VydmVyJ1xyXG5pbXBvcnQge01vZHVsZUNvbnRleHR9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSdcclxuaW1wb3J0IHtTZXF1ZWxpemVBZGFwdGVyfSBmcm9tICdkYi9hZGFwdGVycy9TZXF1ZWxpemVBZGFwdGVyJ1xyXG5pbXBvcnQge0RhdGFiYXNlfSBmcm9tICdkYi9EYXRhYmFzZSdcclxuaW1wb3J0IHtpbml0UGFzc3BvcnR9IGZyb20gJ2FwaS9tb2R1bGVzL0F1dGgvcGFzc3BvcnQnXHJcblxyXG5leHBvcnQgY29uc3QgY29ubmVjdFRvRGF0YWJhc2UgPSAob25Db25uZWN0PzogKGRiOiBEYXRhYmFzZSkgPT4gdm9pZCkgPT4ge1xyXG4gICAgY29uc3QgYWRhcHRlciA9IG5ldyBTZXF1ZWxpemVBZGFwdGVyKClcclxuICAgIGNvbnN0IGRhdGFiYXNlID0gbmV3IERhdGFiYXNlKGFkYXB0ZXIpXHJcblxyXG4gICAgZGF0YWJhc2UuY29ubmVjdCh7XHJcbiAgICAgICAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCAnJyxcclxuICAgICAgICB1c2VybmFtZTogcHJvY2Vzcy5lbnYuREJfVVNFUiB8fCAnJyxcclxuICAgICAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTUyB8fCAnJyxcclxuICAgICAgICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfTkFNRSB8fCAnJyxcclxuICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5EQl9QT1JUID8gTnVtYmVyKHByb2Nlc3MuZW52LkRCX1BPUlQpIDogdW5kZWZpbmVkLFxyXG4gICAgfSlcclxuXHJcbiAgICBkYXRhYmFzZVxyXG4gICAgICAgIC50ZXN0Q29ubmVjdGlvbigpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coYPCfmoAgQ29ubmVjdGVkIHRvICR7cHJvY2Vzcy5lbnYuREJfTkFNRX0gZGF0YWJhc2VgKSlcclxuICAgICAgICAudGhlbigoKSA9PiBvbkNvbm5lY3QgJiYgb25Db25uZWN0KGRhdGFiYXNlKSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4gY29uc29sZS5sb2coJ+KaoO+4jyBGYWlsZWQgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2UhJykpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdGFydHVwID0gKEFwcE1vZHVsZTogTW9kdWxlQ29udGV4dCkgPT4ge1xyXG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MFxyXG5cclxuICAgIGNvbm5lY3RUb0RhdGFiYXNlKClcclxuICAgIGluaXRQYXNzcG9ydCgpXHJcblxyXG4gICAgY29uc3Qgc2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XHJcbiAgICAgICAgc2NoZW1hOiBBcHBNb2R1bGUuc2NoZW1hLFxyXG4gICAgICAgIGNvbnRleHQ6IEFwcE1vZHVsZS5jb250ZXh0LFxyXG4gICAgICAgIGludHJvc3BlY3Rpb246IHRydWUsXHJcbiAgICAgICAgcGxheWdyb3VuZDogdHJ1ZSxcclxuICAgIH0pXHJcblxyXG4gICAgc2VydmVyLmxpc3Rlbihwb3J0KS50aGVuKCh7dXJsfSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGDwn5qAICBTZXJ2ZXIgcmVhZHkgYXQgJHt1cmx9YClcclxuICAgIH0pXHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJ2NvbmZpZy9lbnZpcm9ubWVudCdcclxuaW1wb3J0IGNsb3VkaW5hcnkgPSByZXF1aXJlKCdjbG91ZGluYXJ5JylcclxuaW1wb3J0IHtVcGxvYWRBcGlPcHRpb25zfSBmcm9tICdjbG91ZGluYXJ5J1xyXG5cclxudHlwZSBJbWFnZVR5cGVzID0gJ3VzZXJQcm9maWxlSW1hZ2UnIHwgJ3VzZXJDb3ZlckltYWdlJyB8ICdhcXVhc2NhcGVJbWFnZScgfCAnYXF1YXNjYXBlTWFpbkltYWdlJ1xyXG5cclxudHlwZSBJbWFnZVVwbG9hZE9wdGlvbnMgPSB7XHJcbiAgICBba2V5IGluIEltYWdlVHlwZXNdOiBVcGxvYWRBcGlPcHRpb25zXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpbWFnZVVwbG9hZE9wdGlvbnM6IEltYWdlVXBsb2FkT3B0aW9ucyA9IHtcclxuICAgIHVzZXJQcm9maWxlSW1hZ2U6IHtcclxuICAgICAgICBmb2xkZXI6ICdwcm9maWxlX2ltYWdlcycsXHJcbiAgICAgICAgZm9ybWF0OiAnanBnJyxcclxuICAgICAgICB0cmFuc2Zvcm1hdGlvbjoge1xyXG4gICAgICAgICAgICB3aWR0aDogMTQyLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDE0MixcclxuICAgICAgICAgICAgY3JvcDogJ2ZpbGwnLFxyXG4gICAgICAgICAgICBxOiAnYXV0bzpnb29kJyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHVzZXJDb3ZlckltYWdlOiB7XHJcbiAgICAgICAgZm9sZGVyOiAnY292ZXJfaW1hZ2VzJyxcclxuICAgICAgICBmb3JtYXQ6ICdqcGcnLFxyXG4gICAgICAgIHRyYW5zZm9ybWF0aW9uOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxNDcwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDI3MCxcclxuICAgICAgICAgICAgY3JvcDogJ2xmaWxsJyxcclxuICAgICAgICAgICAgcXVhbGl0eTogJ2F1dG86Z29vZCcsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBhcXVhc2NhcGVJbWFnZToge1xyXG4gICAgICAgIGZvbGRlcjogJ2FxdWFzY2FwZV9pbWFnZXMnLFxyXG4gICAgICAgIGZvcm1hdDogJ2pwZycsXHJcbiAgICAgICAgdHJhbnNmb3JtYXRpb246IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMjQsXHJcbiAgICAgICAgICAgIGhlaWdodDogNzY4LFxyXG4gICAgICAgICAgICBjcm9wOiAnbGZpbGwnLFxyXG4gICAgICAgICAgICBxdWFsaXR5OiAnYXV0bzpnb29kJyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGFxdWFzY2FwZU1haW5JbWFnZToge1xyXG4gICAgICAgIGZvbGRlcjogJ2FxdWFzY2FwZV9tYWluX2ltYWdlcycsXHJcbiAgICAgICAgZm9ybWF0OiAnanBnJyxcclxuICAgICAgICB0cmFuc2Zvcm1hdGlvbjoge1xyXG4gICAgICAgICAgICB3aWR0aDogMTQ0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA5MDAsXHJcbiAgICAgICAgICAgIGNyb3A6ICdsZmlsbCcsXHJcbiAgICAgICAgICAgIHF1YWxpdHk6ICdhdXRvOmJlc3QnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENsb3VkaW5hcnlVcGxvYWRSZXN1bHQge1xyXG4gICAgcHVibGljX2lkOiBzdHJpbmdcclxuICAgIHZlcnNpb246IG51bWJlclxyXG4gICAgc2lnbmF0dXJlOiBzdHJpbmdcclxuICAgIHdpZHRoOiBudW1iZXJcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICBmb3JtYXQ6IHN0cmluZ1xyXG4gICAgcmVzb3VyY2VfdHlwZTogc3RyaW5nXHJcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmdcclxuICAgIGJ5dGVzOiBudW1iZXJcclxuICAgIHR5cGU6IHN0cmluZ1xyXG4gICAgdXJsOiBzdHJpbmdcclxuICAgIHNlY3VyZV91cmw6IHN0cmluZ1xyXG59XHJcblxyXG5jbG91ZGluYXJ5LnYyLmNvbmZpZyh7XHJcbiAgICBhcGlfa2V5OiBlbnZpcm9ubWVudC5DTE9VRElOQVJZX0FQSV9LRVksXHJcbiAgICBhcGlfc2VjcmV0OiBlbnZpcm9ubWVudC5DTE9VRElOQVJZX0FQSV9TRUNSRVQsXHJcbiAgICBjbG91ZF9uYW1lOiBlbnZpcm9ubWVudC5DTE9VRElOQVJZX0NMT1VEX05BTUUsXHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlRmlsZSA9IChpZDogc3RyaW5nKSA9PlxyXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNsb3VkaW5hcnkudjIudXBsb2FkZXIuZGVzdHJveShpZCwgKGVycm9yOiBzdHJpbmcsIHJlc3VsdD86IHN0cmluZykgPT5cclxuICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgICAgKVxyXG4gICAgfSlcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGaWxlID0gKGlkOiBzdHJpbmcpID0+XHJcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY2xvdWRpbmFyeS52Mi5hcGkucmVzb3VyY2UoaWQsIChyZXN1bHQ6IGFueSkgPT5cclxuICAgICAgICAgICAgcmVzdWx0LmVycm9yID8gcmVqZWN0KHJlc3VsdC5lcnJvcikgOiByZXNvbHZlKHJlc3VsdClcclxuICAgICAgICApXHJcbiAgICB9KVxyXG5cclxuZXhwb3J0IGNvbnN0IHVwbG9hZFN0cmVhbUZpbGUgPSAoZmlsZVN0cmVhbTogYW55LCBvcHRpb25zPzogVXBsb2FkQXBpT3B0aW9ucykgPT5cclxuICAgIG5ldyBQcm9taXNlPENsb3VkaW5hcnlVcGxvYWRSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCByZWFkU3RyZWFtID0gZmlsZVN0cmVhbSgpXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IHVwbG9hZFN0cmVhbSA9IGNsb3VkaW5hcnkudjIudXBsb2FkZXIudXBsb2FkX3N0cmVhbShvcHRpb25zLCAoZXJyb3IsIHJlc3VsdCkgPT5cclxuICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICByZWFkU3RyZWFtLm9uKCdvcGVuJywgKCkgPT4gcmVhZFN0cmVhbS5waXBlKHVwbG9hZFN0cmVhbSkpXHJcbiAgICB9KVxyXG4iLCJleHBvcnQgKiBmcm9tICcuL2Nsb3VkaW5hcnknIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG5pbXBvcnQgKiBhcyBtYWlsZXIgZnJvbSAnQHNlbmRncmlkL21haWwnXHJcbmltcG9ydCB7TWFpbERhdGF9IGZyb20gJ0BzZW5kZ3JpZC9oZWxwZXJzL2NsYXNzZXMvbWFpbCdcclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJ2NvbmZpZy9lbnZpcm9ubWVudCdcclxuXHJcbm1haWxlci5zZXRBcGlLZXkoZW52aXJvbm1lbnQuU0VOREdSSURfQVBJX0tFWSlcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kTWFpbCA9IChtYWlsOiBNYWlsRGF0YSkgPT4gbWFpbGVyLnNlbmQobWFpbClcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kQ29uZmlybWF0aW9uTWFpbCA9IChyZWNlaXZlcjogc3RyaW5nLCB0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBjb25maXJtYXRpb25MaW5rID0gYCR7ZW52aXJvbm1lbnQuSE9TVH0vcmVnaXN0ZXIvdmFsaWRhdGUvJHt0b2tlbn1gXHJcblxyXG4gICAgcmV0dXJuIHNlbmRNYWlsKHtcclxuICAgICAgICBmcm9tOiBlbnZpcm9ubWVudC5FTUFJTF9TRU5ERVIsXHJcbiAgICAgICAgdG86IHJlY2VpdmVyLFxyXG4gICAgICAgIHN1YmplY3Q6ICdTY2FwZXN0b3J5IC0gY29uZmlybWF0aW9uIGxpbmsnLFxyXG4gICAgICAgIHRleHQ6IGBXZWxjb21lIHRvIFNjYXBlc3RvcnkhIENsaWNrIG9uIHRoaXMgbGluayAke2NvbmZpcm1hdGlvbkxpbmt9IG9yIGNvcHkgaXQgaW50byB5b3VyIGFkZHJlc3MgYmFyIGlmIHlvdSBjYW4ndCBjbGljayBpdC5gLFxyXG4gICAgICAgIGh0bWw6IGBcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aDE+V2VsY29tZSB0byBTY2FwZXN0b3J5ITwvaDE+XHJcbiAgICAgICAgICAgIDxwPkNsaWNrIG9uIHRoZSBsaW5rIGJlbG93IHRvIGNvbmZpcm0geW91ciBlbWFpbCBhbmQgY29udGludWUgdXNpbmcgU2NhcGVzdG9yeSE8cC8+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9JHtjb25maXJtYXRpb25MaW5rfT4ke2NvbmZpcm1hdGlvbkxpbmt9PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICB9KVxyXG59XHJcbiIsImltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnXHJcbmltcG9ydCB7Y29tcGFyZVN5bmMsIGhhc2hTeW5jfSBmcm9tICdiY3J5cHQnXHJcbmltcG9ydCB7ZW5jb2RlLCBkZWNvZGV9IGZyb20gJ2p3dC1zaW1wbGUnXHJcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tICdjb25maWcvZW52aXJvbm1lbnQnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhUb2tlblBheWxvYWQge1xyXG4gICAgdXNlcklkOiBudW1iZXJcclxuICAgIGlhdDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxDb25maXJtYXRpb25QYXlsb2FkIHtcclxuICAgIGVtYWlsOiBzdHJpbmdcclxuICAgIGNvZGU6IHN0cmluZ1xyXG4gICAgaWF0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF1dGhIZWxwZXIge1xyXG4gICAgc3RhdGljIGNoZWNrUGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZywgZW5jcnlwdGVkUGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlU3luYyhwYXNzd29yZCwgZW5jcnlwdGVkUGFzc3dvcmQpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyeXB0UGFzc3dvcmQocmF3UGFzc3dvcmQ6IHN0cmluZywgcm91bmRzOiBudW1iZXIgPSAxMCkge1xyXG4gICAgICAgIHJldHVybiBoYXNoU3luYyhyYXdQYXNzd29yZCwgcm91bmRzKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVKV1RUb2tlbihwYXlsb2FkOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyfSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbG9hZCA9IHsuLi5wYXlsb2FkLCBpYXQ6IG1vbWVudCgpLnVuaXgoKX1cclxuICAgICAgICByZXR1cm4gZW5jb2RlKGxvYWQsIGVudmlyb25tZW50LlNFQ1VSSVRZX1RPS0VOX1NFQ1JFVClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlQXV0aFRva2VuKHVzZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIEF1dGhIZWxwZXIuY3JlYXRlSldUVG9rZW4oe3VzZXJJZH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZUVtYWlsQ29uZmlybWF0aW9uVG9rZW4oZW1haWw6IHN0cmluZywgY29kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIEF1dGhIZWxwZXIuY3JlYXRlSldUVG9rZW4oe2VtYWlsLCBjb2RlfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGVjb2RlSldUVG9rZW48UGF5bG9hZFR5cGU+KHRva2VuOiBzdHJpbmcpOiBQYXlsb2FkVHlwZSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGUodG9rZW4sIGVudmlyb25tZW50LlNFQ1VSSVRZX1RPS0VOX1NFQ1JFVClcclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXHJcbmltcG9ydCAqIGFzIGdyYXBocWxGaWVsZHMgZnJvbSAnZ3JhcGhxbC1maWVsZHMnXHJcbmltcG9ydCB7SW5jbHVkZWFibGV9IGZyb20gJ3NlcXVlbGl6ZS90eXBlcydcclxuaW1wb3J0IHtHcmFwaFFMUmVzb2x2ZUluZm99IGZyb20gJ2dyYXBocWwnXHJcblxyXG5jb25zdCBmbGF0dGVuT2JqZWN0S2V5cyA9IChvYmo6IFJlY29yZDxzdHJpbmcsIGFueT4pID0+XHJcbiAgICBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgICAgICBhY2MgPSBbLi4uYWNjLCAuLi5mbGF0dGVuT2JqZWN0S2V5cyhvYmpba2V5XSldXHJcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGtleV1cclxuICAgIH0sIFtdIGFzIHN0cmluZ1tdKVxyXG5cclxuZXhwb3J0IGNsYXNzIEdyYXBoUUxIZWxwZXIge1xyXG4gICAgc3RhdGljIGdldEluY2x1ZGVhYmxlRmllbGRzKFxyXG4gICAgICAgIGluZm86IEdyYXBoUUxSZXNvbHZlSW5mbyxcclxuICAgICAgICBtb2RlbE1hcHBpbmc6IHtba2V5OiBzdHJpbmddOiBhbnl9XHJcbiAgICApIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgZmllbGRzID0gZmxhdHRlbk9iamVjdEtleXMoZ3JhcGhxbEZpZWxkcyhpbmZvKSlcclxuICAgICAgICBjb25zdCBpbmNsdWRlOiBJbmNsdWRlYWJsZVtdID0gW11cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbW9kZWxNYXBwaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZHMuaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZS5wdXNoKHttb2RlbDogbW9kZWxNYXBwaW5nW2tleV19KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5jbHVkZVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBlbnN1cmVPcmRlciA9IDxNb2RlbFR5cGU+KG9wdGlvbnM6IHtkb2NzOiBNb2RlbFR5cGVbXSwga2V5czogKHN0cmluZyB8IG51bWJlcilbXSwgcHJvcDogc3RyaW5nfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgZG9jcyxcclxuICAgICAgICAgICAga2V5cyxcclxuICAgICAgICAgICAgcHJvcCxcclxuICAgICAgICB9ID0gb3B0aW9uc1xyXG5cclxuICAgICAgICBjb25zdCBkb2NzTWFwID0gbmV3IE1hcCgpXHJcbiAgICAgICAgZG9jcy5mb3JFYWNoKGRvYyA9PiBkb2NzTWFwLnNldChkb2NbcHJvcF0sIGRvYykpXHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGtleSA9PiBkb2NzTWFwLmdldChrZXkpKVxyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBncmFwaHFsLW1vZHVsZXMvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAZ3JhcGhxbC1tb2R1bGVzL2RpXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBzZW5kZ3JpZC9tYWlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsb3VkaW5hcnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGF0YWxvYWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC1maWVsZHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiand0LXNpbXBsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtZmFjZWJvb2stdG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtZ29vZ2xlLXRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNsdWdpZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZC92NFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInl1cFwiKTsiXSwic291cmNlUm9vdCI6IiJ9