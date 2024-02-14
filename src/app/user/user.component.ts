import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { FirestoreService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public firestoreService: FirestoreService) { }

  ngOnInit(): void {

  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  onNoClick() {
    this.dialog.closeAll()
  }
}