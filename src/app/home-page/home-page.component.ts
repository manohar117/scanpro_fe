import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  jwtToken :string  = "";
  userEmail:string = "";
  contents :any=[{"name":"chal bhai"}];
  repoErr:string ="";

  NewRepoWindow:boolean =false;
  newRepoName:string ="";
  repoDisc:string ="";
  tempUserEmail:string="";
  accessors:string[]=[];
  
  constructor(private route:ActivatedRoute,private router:Router,private reposService:RepoService,private jwtService: JwtService){}
  
  ngOnInit(): void {
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.userEmail = this.jwtService.getClaim(this.jwtToken,"email");
    this.fetchRepos();
  }

  ToogleNewRepoWindow(value:boolean){
    this.NewRepoWindow = value;
  }


  addUser(){
    this.accessors.push(this.tempUserEmail);
    this.tempUserEmail="";
  }

  removeUser(email:string){
    const index = this.accessors.indexOf(email);
    if (index > -1) { 
      this.accessors.splice(index, 1); 
    }
  }

  MakeNewRepo(){
    this.reposService.createRepo({"name":this.newRepoName,"description":this.repoDisc,"emailList":this.accessors}).subscribe((res:any)=>{
      if(res["message"]=="Name exist!"){
        this.repoErr ="Name exist!";
      }
      else{
        this.repoErr ="";
        this.fetchRepos();
      }
    })
    this.ToogleNewRepoWindow(false);
    this.newRepoName = "";
  }

  fetchRepos(){
    this.reposService.fetchRepos().subscribe((res:any)=>{
      this.contents = res["repos"];
      console.log(res);
    })
  }

  OpenRepo(name:string){
    this.router.navigate(["repo",name+"/"]);
  }

  ToManageRepo(name:string){
      this.router.navigate(["manageRepo",name]);
  }

  isOwner(id:any){
    return (id==this.jwtService.getClaim(localStorage.getItem("jwtToken")+"", "Id"));
  }

  doubleClick(name:string){  
      console.log("open "+name);
  }

}
