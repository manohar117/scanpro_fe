import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';

@Component({
  selector: 'app-show-img',
  templateUrl: './show-img.component.html',
  styleUrl: './show-img.component.css'
})
export class ShowImgComponent {
  imageUrl: string | ArrayBuffer | null = null;
  viewingImg:boolean =false;
  path :string ="";
  name:string ='';

  ScannedData:any =[{"Invoice Number":"3123123","Date":"18/3/2001","Total":"56757","Tax":"678","Subtotal":"57435"}]
  ScannedAddress:any=[{"Name":"Rohit","Phone":"8901564207","Address":"Vill-Kuksi, 123028,Mahendragarh"}]
  
  constructor(private route:ActivatedRoute,private router:Router,private fileService:FileHandlerService,private jwtService: JwtService){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => { 
      this.path = params['path']; 
      this.name = params['name']; 
  });
    this.fetchFile()
  }
  


  fetchFile(){
    let filePath = this.path+"/"+this.name;
    this.fileService.fetchFile(filePath).subscribe((data:any)=>{
       this.imageUrl =this.Base64ToImgConverter(data["content"]);
     })
  }

  Base64ToImgConverter(data:string):string{
    return 'data:image/png;base64,' + data;
  }

  DownloadInvoice(){

  }

  Close(){
    this.router.navigate(['repo',this.path]);
  }
}
