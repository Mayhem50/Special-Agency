import AuthorizationService from "./authorization";
export class AuthGuard {
    static navigate(context, commands, redirectPath) {
        if (!AuthorizationService.instance().isAuthorized()) {
            return commands.redirect(redirectPath !== null && redirectPath !== void 0 ? redirectPath : '/');
        }
    }
}
//# sourceMappingURL=auth-guard.js.map