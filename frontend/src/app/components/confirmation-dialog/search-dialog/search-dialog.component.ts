import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  title: string;
  message: string[] = [];
  searchtext: string;

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.searchtext = data.searchtext;
  }


  ngOnInit() {
    console.log(this.message);
  }

  onConfirm(inp, inp2): void {
    // Close the dialog, return true
    var temp = [inp, inp2];
    this.dialogRef.close(temp);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
export class SearchDialogModel {

  constructor(public title: string, public message: string[] = [], public searchtext: string) {
  }
}

