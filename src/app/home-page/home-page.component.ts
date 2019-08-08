import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../app-common.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(public commonService:AppCommonService) { }

  ngOnInit() {
    
  }

}
