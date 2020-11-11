export class CategoryRank {
  categoryName: string;
  total: number;
}

export class PendingReimbursements {
  _reimbursementId: number;
  _userId: bigint;
  employeeName: string;
  _managerId: bigint;
  managerName: string;
  categoryName: string;
  purpose: string;
  totalCost: number;
  plannedDate: Date;
  approved: number;
  submittedDate: Date;
  approvalDate: Date;
  rejectionDate: Date;
  createdDate: Date;
  updatedDate: Date;
}

export class RecentReimbursements {
  _reimbursementId: number;
  _userId: bigint;
  employeeName: string;
  _managerId: bigint;
  managerName: string;
  categoryName: string;
  purpose: string;
  totalCost: number;
  plannedDate: Date;
  approved: number;
  submittedDate: Date;
  approvalDate: Date;
  rejectionDate: Date;
  createdDate: Date;
  updatedDate: Date;
}
