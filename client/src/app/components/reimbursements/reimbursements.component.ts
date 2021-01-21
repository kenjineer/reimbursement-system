import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ReimbursementsService } from 'src/app/services/reimbursements/reimbursements.service';
import {
  ReimbursementsDataSource,
  ReimbursementsItem,
} from './reimbursements-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ReimbursementDialogComponent } from '../reimbursements-items/reimbursement-dialog/reimbursement-dialog/reimbursement-dialog.component';
import { Reimbursement } from 'src/app/models/reimbursement.model';

@Component({
  selector: 'app-reimbursements',
  templateUrl: './reimbursements.component.html',
  styleUrls: ['./reimbursements.component.css'],
})
export class ReimbursementsComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private reimbursementsService: ReimbursementsService,
    private loginService: LoginService,
    public reimbursementDialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ReimbursementsItem>;
  dataSource: ReimbursementsDataSource;
  data: ReimbursementsItem[];
  reimbursements: Reimbursement[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    '_reimbursementId',
    'categoryName',
    'purpose',
    'totalCost',
    'approved',
    'submittedDate',
  ];

  async ngAfterViewInit() {
    try {
      const res = await this.reimbursementsService.getUserReimbursements();
      this.reimbursements = res.reimbursements;
      this.data = res.reimbursements;
      this.dataSource = new ReimbursementsDataSource(this.data);
    } catch (err) {
      console.log(err);
      alert(`${err.error.message}\n${err.error.jwt.message}`);
      this.loginService.logout();
      this.router.navigate(['api/login']);
    }

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openReimbursement(_reimbursementId: number): void {
    const dialogRef = this.reimbursementDialog.open(
      ReimbursementDialogComponent,
      {
        width: '800px',
        height: '900px',
        data: this.reimbursements.find(
          (data) => data._reimbursementId === _reimbursementId
        ),
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addReimbursement(): void {
    const dialogRef = this.reimbursementDialog.open(
      ReimbursementDialogComponent,
      {
        width: '800px',
        height: '900px',
        data: null,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.ngAfterViewInit();
    });
  }
}
