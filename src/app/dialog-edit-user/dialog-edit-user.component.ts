import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user: User | any;
  userId: string | any;
  birthdate: string | any;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    public firestoreService: FirestoreService) {

  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthdate.getTime();
    let cleanJson = this.firestoreService.toJSON(this.user);
    this.firestoreService.updateDetails(this.userId, cleanJson)
      .then(() => {
        setTimeout(() => {
        this.loading = false;
        this.onNoClick();
        }, 500);
      })
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
