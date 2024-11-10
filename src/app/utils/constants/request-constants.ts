import { FieldInfo as AttributesInfo } from '@models/form.model';
import { Request } from '@models/request.model';

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
