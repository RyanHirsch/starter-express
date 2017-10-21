import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

export default new JSONAPISerializer('users', {
  attributes: ['name'],
});
