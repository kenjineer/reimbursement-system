import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementsService {
  constructor(private http: HttpClient) {}

  getUserReimbursements(): Promise<any> {
    return this.http
      .get(`${baseUrls.reimbursements}/reimbursements`)
      .toPromise();
  }

  getReimbursementItems(_reimbursementId: number): Promise<any> {
    return this.http
      .get(
        `${baseUrls.reimbursements}/reimbursements/${_reimbursementId}/reimbursement-items`
      )
      .toPromise();
  }

  getReceipts(_reimbursementId: number): Promise<any> {
    return this.http
      .get(
        `${baseUrls.reimbursements}/reimbursements/${_reimbursementId}/receipts`
      )
      .toPromise();
  }

  getCategories(): Promise<any> {
    return this.http
      .get(`${baseUrls.reimbursements}/reimbursements/categories`)
      .toPromise();
  }

  postNewReimbursement(data: FormData): Observable<any> {
    return this.http.post(
      `${baseUrls.reimbursements}/reimbursements/new-reimbursement`,
      data
    );
  }

  putReimbursement(_reimbursementId: number, data: FormData): Observable<any> {
    return this.http.put(
      `${baseUrls.reimbursements}/reimbursements/${_reimbursementId}/edit-reimbursement`,
      data
    );
  }

  deleteReimbursements(_reimbursementIds: number[]): Observable<any> {
    let url;
    for (let _reimbursementId of _reimbursementIds) {
      url += `_reimbursementId=${_reimbursementId}&`;
    }
    return this.http.delete(
      `${baseUrls.reimbursements}/reimbursements/delete-reimbursement?${url}`
    );
  }
}
