import { Component,OnInit, inject  } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  router: Router = inject(Router);


  ngOnInit(): void {
      

}
 headerNavigator (route:String){
  this.router.navigateByUrl(`${route}`)
 }
}
