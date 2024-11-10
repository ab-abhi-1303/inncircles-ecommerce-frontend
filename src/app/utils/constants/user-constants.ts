import { UserPermissions, UserRoles } from '@utils/enums/user-enums';

export const userRolePermissions: { [key: string]: string[] } = {
  [UserRoles.Admin]: [
    UserPermissions.DeleteRequest,
    UserPermissions.ApproveRequest,
    UserPermissions.RejectRequest,
  ],
  [UserRoles.SupportEngineer]: [
    UserPermissions.ApproveRequest,
    UserPermissions.RejectRequest,
  ],
  [UserRoles.Customer]: [UserPermissions.CreateRequest],
};

export const userRoles = [
  UserRoles.Admin,
  UserRoles.Customer,
  UserRoles.SupportEngineer,
];
