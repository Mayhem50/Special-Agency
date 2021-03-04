import { Commands, Context, RedirectResult } from "@vaadin/router";
import AuthorizationService from "./authorization";

export class AuthGuard {

  static navigate(context: Context, commands: Commands, redirectPath?: string): RedirectResult | undefined {
    if(!AuthorizationService.instance().isAuthorized()){
      return commands.redirect(redirectPath ?? '/');
    }
  }
}

