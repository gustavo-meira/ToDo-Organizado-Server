import { v4 as uuid } from 'uuid';
import { IUUIDProvider } from '../IUUIDProvider';

class UUIDProvider implements IUUIDProvider {
  private uuid = uuid;

  generate(): string {
    return this.uuid();
  }
}

export { UUIDProvider };
