export class Reimbursement {
  _reimbursementId: number;
  _userId: bigint;
  employeeName: string;
  _managerId: bigint;
  managerName: string;
  _categoryId: number;
  categoryName: string;
  purpose: string;
  totalCost: number;
  plannedDate: Date;
  approved: number;
  submittedDate: Date;
  approvalDate: Date;
  rejectionDate: Date;
  remarks: string;
  createdDate: Date;
  updatedDate: Date;
}
