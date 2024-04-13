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
  isEdit:boolean = false;
  editId = 0;

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
   
    this.addUserData().subscribe((response)=>{
      this.user.push(response)
    })
  }

  editUserData(id:number){
    this.isEdit = true;
    this.user.find((response)=>{
      if(id==response.id){
        this.userAddform.controls.username.setValue(response.name);
        this.userAddform.controls.useremail.setValue(response.email);
        this.editId = response.id;
        
      }
    })

  }

  update(){
    const editUser = this.http.put<User>("https://jsonplaceholder.typicode.com/users/"+this.editId,{
      name : this.userAddform.controls.username.value,
      email :  this.userAddform.controls.useremail.value
    })

    editUser.subscribe((resp)=>{
      this.user.map((users)=>{
        if(users.id==resp.id){
          users.name = resp.name;
          users.email = resp.email;
        }
      })
    })
  }

}

class User{
  name!:string;
  email!:string;
  id!:number;
}
