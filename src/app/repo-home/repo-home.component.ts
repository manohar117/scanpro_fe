import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';

@Component({
  selector: 'app-repo-home',
  templateUrl: './repo-home.component.html',
  styleUrl: './repo-home.component.css'
})
export class RepoHomeComponent {
  path:string ="";
  contents :any=[{"name":""},{"name":""}];
  jwtToken :string  = "";
  pathArray:string[] =[""];
  
  constructor(private route:ActivatedRoute,private router:Router,private fileService:FileHandlerService,private jwtService: JwtService){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {  
      this.path = params['path']; 
    });
    
    this.pathArray = this.path.split('/')
    this.pathArray.pop();
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.fetchContent(this.path);
  }

  goTo(i:number){
    let newpath ="";
    for(let j=0;j<=i;j++){
      newpath+=this.pathArray[j]+"/"
    }
    this.path =newpath;
    while(this.pathArray.length-1>i){this.pathArray.pop();console.log(this.pathArray);}
    this.fetchContent(this.path);
  }

  fetchContent(query:string){
      this.fileService.fetchContent(query).subscribe((data:any)=>{
        this.contents =data["files"];
        console.log(data);
      })
  }

  doubleClick(name:string,type:string,id:string){  
    if(type =='dir'){
      this.pathArray.push(name);
      this.path =this.path+name+"/";
      sessionStorage.setItem("path",this.path);
      this.fetchContent(this.path);
    
    }
    else{ 
      this.router.navigate(["showImg",this.path,name]);
    }
  }

  MakeNewFile(){
    this.router.navigate(['addDirectory',this.path,'file']);
  }
  MakeNewFolder(){
    this.router.navigate(['addDirectory',this.path,'folder']);
  }

  goBack(){
    this.pathArray.pop();
     let i = this.path.lastIndexOf("/");
     this.path =this.path.substring(0,i);
     i = this.path.lastIndexOf("/");
     this.path =this.path.substring(0,i+1);
     if(this.path!="")this.fetchContent(this.path);
     else{
       this.router.navigate(['']);
     }
  }

}
