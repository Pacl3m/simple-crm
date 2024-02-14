import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from '../firebase-service/firebase.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user: User | any;
  loading = false;
  userId: string | any;
  test: UserDetailComponent | any;


  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestoreService: FirestoreService,
  ) { }


  onNoClick() {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    let cleanJson = this.firestoreService.toJSON(this.user);
    this.firestoreService.updateDetails(this.userId, cleanJson)
      .then(() => {
        setTimeout(() => {
        this.loading = false;
        this.onNoClick();
        }, 500);
      })
  }


  toJSON(obj: any) {
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
}
function callback(data: any): void {
  throw new Error('Function not implemented.');
}

