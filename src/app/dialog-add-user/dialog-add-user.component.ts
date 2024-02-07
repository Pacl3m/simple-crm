import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { FirestoreService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {

  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestoreService: FirestoreService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    if (this.birthDate instanceof Date) {
      this.user.birthDate = this.birthDate.getTime();
    }
    let userJson = this.toJSON(this.user);
    console.log(userJson);
    this.firestoreService.saveInFirestore(userJson);
    setTimeout(() => {
      this.loading = false;
      this.onNoClick();
    }, 1000);
  }

  toJSON(obj: User) {
    return {
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,
    }
  }

  areAllFieldsFilled(): boolean {
    return !!this.user.firstName && !!this.user.lastName && !!this.user.email &&
      !!this.user.street && !!this.user.zipCode && !!this.user.city &&
      this.birthDate instanceof Date;
  }
}
