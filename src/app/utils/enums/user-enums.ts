export const enum UserRoles {
  Admin = 'Admin',
  Customer = 'Customer',
  SupportEngineer = 'Support Engineer',
}

export const enum UserPermissions {
  CreateRequest = 'create-request',
  ApproveRequest = 'approve-request',
  DeleteRequest = 'delete-request',
  RejectRequest = 'reject-request',
}
