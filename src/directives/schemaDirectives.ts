import { AuthenticatedDirective } from './authenticated.directive';
import { AuthorizedDirective } from './authorized.directive';
import { FormatDateDirective } from './dateFormat.directive';
import { ValidMongoIdDirective } from './validMongoId.directive';

export const schemaDirectives = {
  authenticated: AuthenticatedDirective,
  authorized: AuthorizedDirective,
  formatDate: FormatDateDirective,
  validMongoId: ValidMongoIdDirective,
};
