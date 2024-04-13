import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // class file
import { OnInit } from '@angular/core';

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

}

class User{
  name!:string;
}
