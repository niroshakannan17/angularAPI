import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // class file
import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  user:User[]=[];

  constructor(private http:HttpClient){

  }

  // when we have to load data on page load
  //so we have to use ngoninit 
  ngOnInit(): void {
    
    this.getUserData().subscribe((response)=>{
      console.log('userData :',response);
      this.user = response;
    })
  }

  getUserData(){
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

  


  userAddform = new FormGroup({
    username : new FormControl(),
    useremail : new FormControl()
  })

  addUserData(){
    return this.http.post<User>('https://jsonplaceholder.typicode.com/users',{
      name : this.userAddform.controls.username.value,
      email :  this.userAddform.controls.useremail.value
     })
  }

  save(){
    console.log(this.userAddform)
    this.addUserData().subscribe((response)=>{
      this.user.push(response)
    })
  }

}

class User{
  name!:string;
  email!:string;
}
