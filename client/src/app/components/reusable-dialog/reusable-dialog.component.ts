import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reusable-dialog',
  templateUrl: './reusable-dialog.component.html',
  styleUrls: ['./reusable-dialog.component.css'],
})
export class ReusableDialogComponent implements OnInit {
  static componentFlag: string = '';
  static imageURL: string = '';
  static title: string = '';
  static content: string = '';

  constructor() {}

  ngOnInit(): void {}

  openErrorDialog(content: string, reusableDialog: MatDialog) {
    ReusableDialogComponent.componentFlag = 'Common';
    ReusableDialogComponent.title = 'Error';
    ReusableDialogComponent.content = content;
    reusableDialog.open(ReusableDialogComponent);
  }

  openSuccessDialog(content: string, reusableDialog: MatDialog) {
    ReusableDialogComponent.componentFlag = 'Common';
    ReusableDialogComponent.title = 'Success';
    ReusableDialogComponent.content = content;
    reusableDialog.open(ReusableDialogComponent);
  }

  getComponentFlag() {
    return ReusableDialogComponent.componentFlag;
  }

  getImageURL() {
    return ReusableDialogComponent.imageURL;
  }

  getDialogTitle() {
    return ReusableDialogComponent.title;
  }

  getDialogContent() {
    return ReusableDialogComponent.content;
  }
}
