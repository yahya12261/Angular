import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  private  router = inject(Router)
  ngOnInit(): void {
    
  }

  routerNavigate(route:String){
    this.router.navigateByUrl(route+"")
  }

}
