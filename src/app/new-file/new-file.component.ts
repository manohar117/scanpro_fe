import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileHandlerService } from '../Services/file-handler.service';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrl: './new-file.component.css'
})
export class NewFileComponent implements OnInit {
  path :string ="";
  type:string ='files';
  
  imageInput:File |null =null;
  name:string="";

  constructor(private router :Router,private route:ActivatedRoute,private fileService:FileHandlerService){
  }
  
  ngOnInit(): void {
    this.path =this.route.snapshot.params["path"];
    this.type =this.route.snapshot.params["type"];
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageInput = fileList[0];
    }
  }
 
  goBack(){
    this.router.navigate(["repo",this.path]);
  }

  UploadFile(){
    this.name = this.name.toUpperCase()+"." +this.imageInput?.name.split(".")[1];

    let formData =new FormData();
    formData.append("name",this.name);
    formData.append("path",this.path);
    if(this.imageInput!=null){
      formData.append("file",this.imageInput);
    }
    
    this.fileService.uploadFile(formData).subscribe((res :any)=>{
      console.log(res);
        if(res['message']=="Saved!"){
          this.router.navigate(["repo", this.path])
        }
    })
  }

}
