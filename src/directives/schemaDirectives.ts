import { AuthenticatedDirective } from './authenticated.directive';
import { AuthorizedDirective } from './authorized.directive';
import { FormatDateDirective } from './dateFormat.directive';

export const schemaDirectives = {
  authenticated: AuthenticatedDirective,
  authorized: AuthorizedDirective,
  formatDate: FormatDateDirective,
};
