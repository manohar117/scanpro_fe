import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';

@Component({
  selector: 'app-repo-manage',
  templateUrl: './repo-manage.component.html',
  styleUrl: './repo-manage.component.css'
})
export class RepoManageComponent implements OnInit {
  ownerEmail:string ="";
  repoName:string="my";
  jwtToken :string  = "";
  content:any;
  emailList:string[]=[];
  tempUserEmail:string="";

  constructor(private route:ActivatedRoute,private router:Router,private repoService:RepoService,private jwtService:JwtService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.repoName = params['name']; 
    });
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.ownerEmail =this.jwtService.getClaim(this.jwtToken,"email");
    this.fetchRepo();
  }

  async fetchRepo(){
     await this.repoService.fetchRepo(this.repoName).subscribe((data:any)=>{
      this.content =data['repo']['accessUser'];
      for(let i=0;i<this.content.length;i++){
        if(this.content[i]['email']==this.ownerEmail)continue;
        this.emailList.push(this.content[i]['email']);
      }
    })
    
  }

  addUser(){
    const index = this.emailList.indexOf(this.tempUserEmail);
    if (index > -1 || this.tempUserEmail==this.ownerEmail) { 
      alert("User Already added!");return;
    }
    this.emailList.push(this.tempUserEmail);
    this.tempUserEmail="";
  }

  removeUser(){
    if(this.tempUserEmail==this.ownerEmail){alert("cannt remove owner");return;}
    const index = this.emailList.indexOf(this.tempUserEmail);
    if (index > -1) { 
      this.emailList.splice(index, 1); 
    }
    this.tempUserEmail="";
  }

  removeUserEmail(email:string){
    const index = this.emailList.indexOf(email);
    if (index > -1) { 
      this.emailList.splice(index, 1); 
    }
  }


  UpdateRepo(){
    this.repoService.updateRepo({"name":this.repoName,"emaillist":this.emailList}).subscribe((res:any)=>{
      alert(res['message']);
      this.fetchRepo();
    });
  }


  GoToHome(){
    this.router.navigate([""]);
  }
}
