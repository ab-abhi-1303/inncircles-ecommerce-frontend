import { FieldInfo as AttributesInfo } from '@models/form.model';
import { Request } from '@models/request.model';
import { UserRoles } from '@utils/enums/user-enums';

export const requestAttributes: AttributesInfo<Request>[] = [
  {
    displayName: 'Issue Description',
    fieldName: 'issueDescription',
  },
  {
    displayName: 'Status',
    fieldName: 'status',
  },
  {
    displayName: 'Created At',
    fieldName: 'createdAt',
  },
  {
    displayName: 'Updated At',
    fieldName: 'updatedAt',
  },
];

export const RequestStatus = {
  inProgress: 'In Progress',
  refundPending: 'Refund Pending',
  refundSent: ' Refund Sent',
  rejected: 'Rejected',
};

export const requestStatusTimeline = [
  {
    status: RequestStatus.inProgress,
    color: 'gray',
  },
  {
    status: RequestStatus.refundPending,
    color: 'yellow',
  },
  {
    status: RequestStatus.refundSent,
    color: 'green',
  },
];

const displayedColumnsDefault = [
  'issueDescription',
  'status',
  'createdAt',
  'updatedAt',
];

export const displayedColumnsByRole: { [key: string]: string[] } = {
  [UserRoles.Admin]: [
    ...displayedColumnsDefault,
    'approve',
    'reject',
    'delete',
  ],
  [UserRoles.SupportEngineer]: [
    ...displayedColumnsDefault,
    'approve',
    'reject',
    'chat',
  ],
  [UserRoles.Customer]: [...displayedColumnsDefault, 'chat'],
};
