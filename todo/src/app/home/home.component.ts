import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}  

  ngOnInit(): void {
  }
  fileName = '';  
   

  onFileSelected(event:any) {  

      const file:File = event.target.files[0];  

      if (file) {  

          this.fileName = file.name;  

          const formData = new FormData();  

          formData.append("thumbnail", file);  

          const upload$ = this.http.post('https://v2.convertapi.com/upload', formData);  

          upload$.subscribe();  
      }  
  }  
}
