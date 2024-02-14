import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firebase-service/firebase.service';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from "@angular/fire/firestore";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  userId: string | null | undefined;
  singelUserDetail: User | undefined;


  constructor(private route: ActivatedRoute,
    public firestore: FirestoreService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.getUser(this.userId);
    });
  }


  getUser(userId: any) {
    this.firestore.loadSingleUser(userId, (data) => {
      this.singelUserDetail = data;
    });
  }


  openAddressEditDialog() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.toJSON(this.singelUserDetail));
    dialog.componentInstance.userId = this.userId;
  }

  openUserEditDialog() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    let getBirthdate: number | any = this.singelUserDetail?.birthDate;
    dialog.componentInstance.user = new User(this.toJSON(this.singelUserDetail));
    dialog.componentInstance.userId = this.userId;
    dialog.componentInstance.birthdate = new Date(getBirthdate);
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
