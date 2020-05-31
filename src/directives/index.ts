import { AuthenticatedDirective } from './authenticated.directive';
import { AuthorizedDirective } from './authorized.directive';

export const schemaDirectives = {
  authenticated: AuthenticatedDirective,
  authorized: AuthorizedDirective,
};
