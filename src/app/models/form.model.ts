import { Request } from './request.model';

export interface FieldInfo<T> {
  fieldName: keyof T;
  displayName: string;
}
