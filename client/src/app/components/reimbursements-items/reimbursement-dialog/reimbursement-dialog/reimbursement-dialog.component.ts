import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Receipt } from 'src/app/models/receipt.model';
import { Reimbursement } from 'src/app/models/reimbursement.model';
import { Item } from 'src/app/models/item.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ReimbursementsService } from 'src/app/services/reimbursements/reimbursements.service';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Injectable()
class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'yyyy/MM/dd', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-reimbursement-dialog',
  templateUrl: './reimbursement-dialog.component.html',
  styleUrls: ['./reimbursement-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
    [DatePipe],
  ],
})
export class ReimbursementDialogComponent implements OnInit {
  reimbursementFormGroup: FormGroup;
  itemFormGroup: FormGroup[];
  reimbursementData: Reimbursement;
  itemData: Item[] = [];
  receiptData: Receipt[];
  categories: Category[];
  requests: Promise<any>[];
  isAddReimbursement: Boolean;
  isEditReimbursement: Boolean;
  minDate: Date = new Date();
  imagePath;
  images: any[] = [];
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ReimbursementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reimbursement,
    private reimbursementsService: ReimbursementsService,
    private loginService: LoginService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    if (data) {
      this.reimbursementData = data;
      this.isAddReimbursement = false;
    } else {
      this.itemData.push(new Item(-1));
      this.isAddReimbursement = true;
    }
  }

  async ngOnInit() {
    try {
      this.initForm();

      this.requests = [];
      this.requests.push(this.reimbursementsService.getCategories());

      if (this.isAddReimbursement) {
        const [resCategories] = await Promise.all(this.requests);
        this.categories = resCategories.rmbCategories;
        return;
      }

      this.requests.push(
        this.reimbursementsService.getItems(
          this.reimbursementData._reimbursementId
        )
      );
      this.requests.push(
        this.reimbursementsService.getReceipts(
          this.reimbursementData._reimbursementId
        )
      );
      const [resCategories, resItems, resReceipts] = await Promise.all(
        this.requests
      );

      this.categories = resCategories.rmbCategories;
      this.itemData = resItems.rmbItems;
      this.receiptData = resReceipts.rmbReceipts;

      this.previewReceipt(this.receiptData, false);

      this.initForm();
    } catch (err) {
      console.log(err);
      alert(err.error.error_message);
      this.loginService.logout();
      this.router.navigate(['api/v1/login']);
    }
  }

  initForm() {
    if (this.isAddReimbursement) {
      this.reimbursementFormGroup = new FormGroup({
        _categoryId: new FormControl('', Validators.required),
        purpose: new FormControl('', Validators.required),
        totalCost: new FormControl(
          { value: (0).toFixed(2), disabled: true },
          Validators.required
        ),
        plannedDate: new FormControl('', Validators.required),
        remarks: new FormControl('', Validators.required),
      });

      this.itemFormGroup = [];
      this.itemFormGroup.push(
        new FormGroup({
          _itemId: new FormControl(-1),
          item: new FormControl('', Validators.required),
          qty: new FormControl(0, Validators.required),
          cost: new FormControl((0).toFixed(2), Validators.required),
        })
      );
    } else {
      this.reimbursementFormGroup = new FormGroup({
        _categoryId: new FormControl(
          { value: this.reimbursementData._categoryId, disabled: true },
          Validators.required
        ),
        purpose: new FormControl(
          { value: this.reimbursementData.purpose, disabled: true },
          Validators.required
        ),
        totalCost: new FormControl(
          { value: this.reimbursementData.totalCost, disabled: true },
          Validators.required
        ),
        plannedDate: new FormControl(
          { value: this.reimbursementData.plannedDate, disabled: true },
          Validators.required
        ),
        status: new FormControl(
          { value: this.reimbursementData.status, disabled: true },
          Validators.required
        ),
        createdDate: new FormControl(
          {
            value: this.reimbursementData.createdDate ?? new Date(),
            disabled: true,
          },
          Validators.required
        ),
        approvalDate: new FormControl(
          { value: this.reimbursementData.approvalDate, disabled: true },
          Validators.required
        ),
        rejectionDate: new FormControl(
          { value: this.reimbursementData.rejectionDate, disabled: true },
          Validators.required
        ),
        releaseDate: new FormControl(
          { value: this.reimbursementData.releaseDate, disabled: true },
          Validators.required
        ),
        remarks: new FormControl(
          { value: this.reimbursementData.remarks, disabled: true },
          Validators.required
        ),
      });

      this.itemFormGroup = [];
      if (this.itemData.length === 0) {
        this.itemFormGroup.push(
          new FormGroup({
            _itemId: new FormControl(-1),
            item: new FormControl('', Validators.required),
            qty: new FormControl('', Validators.required),
            cost: new FormControl('', Validators.required),
          })
        );
      }
      for (let item of this.itemData) {
        this.itemFormGroup.push(
          new FormGroup({
            __itemIdid: new FormControl(item._itemId),
            item: new FormControl(
              { value: item.item, disabled: true },
              Validators.required
            ),
            qty: new FormControl(
              { value: item.qty, disabled: true },
              Validators.required
            ),
            cost: new FormControl(
              { value: item.cost, disabled: true },
              Validators.required
            ),
          })
        );
      }
    }
  }

  toggleEdit() {
    if (this.isEditReimbursement) {
      this.reimbursementFormGroup.enable();
      for (let item of this.itemFormGroup) {
        item.enable();
      }
    } else {
      this.reimbursementFormGroup.disable();
      for (let item of this.itemFormGroup) {
        item.disable();
      }
    }

    this.reimbursementFormGroup.controls['totalCost'].disable();
  }

  formatMoney(e, i: number) {
    if (e.target.value === '') {
      let val0 = 0;
      this.itemFormGroup[i].controls['cost'].setValue(val0.toFixed(2));
    }
    let val = !Number.isNaN(Number.parseFloat(e.target.value))
      ? Number.parseFloat(e.target.value)
      : 0;
    this.itemFormGroup[i].controls['cost'].setValue(val.toFixed(2));
  }

  computeTotal() {
    let totalCost = 0;
    for (let item of this.itemFormGroup) {
      let cost = !Number.isNaN(Number.parseFloat(item.controls['cost'].value))
        ? Number.parseFloat(item.controls['cost'].value)
        : 0;
      let qty = !Number.isNaN(Number.parseFloat(item.controls['qty'].value))
        ? Number.parseFloat(item.controls['qty'].value)
        : 0;

      totalCost += cost * qty;
    }

    this.reimbursementFormGroup.controls['totalCost'].setValue(
      totalCost.toFixed(2)
    );
  }

  async previewReceipt(files, upload: boolean) {
    if (files.length === 0) return;
    let readers = [];
    let cnt = 0;

    if (upload) {
      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      this.imagePath = files;
      for (let file of files) {
        let reader = (readers[cnt] = new FileReader());
        console.log(reader);
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.images.push(reader.result);
        };
        cnt++;
      }
    } else {
      for (let file of files) {
        let bytes = new Uint8Array(file.image.data.length);
        for (let i = 0; i < file.image.data.length; i++) {
          bytes[i] = file.image.data[i];
        }
        let blob = new Blob([bytes], { type: file.type });

        let reader = (readers[cnt] = new FileReader());
        reader.readAsDataURL(blob);
        reader.onload = (_event) => {
          this.images.push(reader.result);
        };
        cnt++;
      }
    }
  }

  addItemClick(): void {
    let item = new Item(this.reimbursementData?._reimbursementId ?? -1);
    this.itemData.push(item);
    this.itemFormGroup.push(
      new FormGroup({
        _id: new FormControl(-this.itemFormGroup.length - 1),
        item: new FormControl(
          { value: item.item, disabled: false },
          Validators.required
        ),
        qty: new FormControl(
          { value: item.qty, disabled: false },
          Validators.required
        ),
        cost: new FormControl(
          { value: item.cost.toFixed(2), disabled: false },
          Validators.required
        ),
      })
    );
  }

  deleteItemClick(item: Item): void {
    if (!item._itemId) {
      this.itemData = this.itemData.filter(
        (i) => i.createdDate !== item.createdDate
      );
      this.itemFormGroup = this.itemFormGroup.filter(
        (i) =>
          Number.parseInt(i.controls['_itemId'].value) !==
          -this.itemFormGroup.length
      );
      console.log(this.itemFormGroup, -this.itemFormGroup.length);
    } else {
      this.itemData = this.itemData.filter((i) => i._itemId !== item._itemId);
      this.itemFormGroup = this.itemFormGroup.filter(
        (i) => Number.parseInt(i.controls['_itemId'].value) !== item._itemId
      );
    }
  }

  onAddClick(files): void {
    if (this.reimbursementFormGroup.valid) {
      const reimbursementInfo = this.reimbursementFormGroup.getRawValue();
      reimbursementInfo.plannedDate = this.datePipe.transform(
        reimbursementInfo.plannedDate,
        'yyyy-MM-dd hh:mm:ss'
      );
      const newReimbursementData = {
        newReimbursement: reimbursementInfo,
        newItems: [],
      };

      for (let item of this.itemFormGroup) {
        if (!item.valid) {
          return;
        } else {
          newReimbursementData.newItems.push(item.getRawValue());
        }
      }

      const data = new FormData();
      data.set('data', JSON.stringify(newReimbursementData));

      for (let file of files) {
        data.append('files', file, file.name);
      }
      this.reimbursementsService.postNewReimbursement(data).subscribe(
        (res) => {
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          alert(err.error.error_message);
        }
      );
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
