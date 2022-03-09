"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletAdapterClass = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
const wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
function getWalletAdapterClass(name) {
    var k = new WalletAdapterClass(name);
    return k;
}
exports.getWalletAdapterClass = getWalletAdapterClass;
function ToBase64(u8) {
    return btoa(String.fromCharCode.apply(null, u8));
}
class WalletAdapterClass {
    constructor(name) {
        this.name = name;
        switch (this.name) {
            case "Phantom":
                this.adapter = new wallet_adapter_wallets_1.PhantomWalletAdapter();
                this.hasSignMessage = true;
                break;
            case "Solflare":
                this.adapter = new wallet_adapter_wallets_1.SolletWalletAdapter({ provider: 'https://solflare.com/access-wallet' });
                this.hasSignMessage = true;
                break;
            case "SolflareWeb":
                this.adapter = new wallet_adapter_wallets_1.SolletWalletAdapter({ provider: 'https://solflare.com/access-wallet' });
                this.hasSignMessage = true;
                break;
            case "Sollet":
                this.adapter = new wallet_adapter_wallets_1.SolletWalletAdapter({ provider: 'https://www.sollet.io' });
                this.hasSignMessage = true;
                break;
            case "Sollet Extension":
                this.adapter = new wallet_adapter_wallets_1.SolletWalletAdapter({ provider: 'https://www.sollet.io' });
                this.hasSignMessage = true;
                break;
            case "Solong":
                this.adapter = new wallet_adapter_wallets_1.SolongWalletAdapter();
                this.hasSignMessage = false;
                break;
            default:
                break;
        }
    }
    GetAdapter() {
        return this.adapter;
    }
    signTransaction(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var msg1 = web3_js_1.Message.from(message);
            var tx = web3_js_1.Transaction.populate(msg1, [this.adapter.publicKey.toString()]);
            tx.compileMessage();
            return ToBase64(yield (yield this.adapter.signTransaction(tx)).serialize());
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasSignMessage) {
                return ToBase64(yield this.adapter.signMessage(message));
            }
        });
    }
    ConnectedHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            var argstopass = new Object();
            yield this.instance.invokeMethodAsync("OnEvent", argstopass);
        });
    }
    ;
    removeEventListener() {
        this.adapter.removeListener('connect');
    }
    addEventListener(instance) {
        this.removeEventListener();
        this.instance = instance;
        this.adapter.on('connect', () => this.ConnectedHandler());
    }
}
//# sourceMappingURL=index.js.map