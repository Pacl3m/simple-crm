import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot } from "@angular/fire/firestore";
import { User } from "../../models/user.class";


@Injectable({
    providedIn: "root"
})
export class FirestoreService {
    firestore: Firestore = inject(Firestore);
    allUsers: User[] = [];


    collectionRef = collection(this.firestore, 'users');

    unsubUsers;

    constructor() {
        this.unsubUsers = this.loadUsers()
    }



    saveInFirestore(userJson: any) {
        addDoc(this.collectionRef, userJson)
    }

    loadUsers() {
        return onSnapshot(this.collectionRef, (list) => {
            console.log(list);
            this.allUsers = [];
            list.forEach(element => {
                console.log(element.id, ':', element.data());
                this.allUsers.push(this.setUser(element.data(), element.id));
            });
            console.log(this.allUsers);
        })

    }

    setUser(obj: any, id: string) {
        return {
            id: id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            birthDate: obj.birthDate,
            street: obj.street,
            zipCode: obj.zipCode,
            city: obj.city,
        }
    }

    ngOnDestroy() {
        this.unsubUsers();
    }
}