import { UserRoles } from '@utils/enums/user-enums';

export interface User {
  id: string;
  username: string;
  role: UserRoles;
}

export interface UserCredentials {
  username: string;
  password: string;
}
