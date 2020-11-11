import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface PendingTableItem {
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

/**
 * Data source for the PendingTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PendingTableDataSource extends DataSource<PendingTableItem> {
  data: PendingTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(displayData: PendingTableItem[]) {
    super();
    this.data = displayData;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PendingTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PendingTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PendingTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case '_reimbursementId':
          return compare(+a._reimbursementId, +b._reimbursementId, isAsc);
        case '_userId':
          return compare(a._userId, b._userId, isAsc);
        case 'employeeName':
          return compare(a.employeeName, b.employeeName, isAsc);
        case '_managerId':
          return compare(a._managerId, b._managerId, isAsc);
        case 'managerName':
          return compare(a.managerName, b.managerName, isAsc);
        case 'categoryName':
          return compare(a.categoryName, b.categoryName, isAsc);
        case 'purpose':
          return compare(a.purpose, b.purpose, isAsc);
        case 'totalCost':
          return compare(a.totalCost, b.totalCost, isAsc);
        case 'plannedDate':
          return compare(a.plannedDate, b.plannedDate, isAsc);
        case 'approved':
          return compare(a.approved, b.approved, isAsc);
        case 'submittedDate':
          return compare(a.submittedDate, b.submittedDate, isAsc);
        case 'approvalDate':
          return compare(a.approvalDate, b.approvalDate, isAsc);
        case 'rejectionDate':
          return compare(a.rejectionDate, b.rejectionDate, isAsc);
        case 'createdDate':
          return compare(a.createdDate, b.createdDate, isAsc);
        case 'updatedDate':
          return compare(a.updatedDate, b.updatedDate, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number | bigint | Date,
  b: string | number | bigint | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
