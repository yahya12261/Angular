import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

export const CanActivate = () => {
    const tokenStorageService = new  TokenStorageService
    // const authService = inject(AuthService);
    const router = inject(Router);

    if(tokenStorageService.getToken()){
        return true;
    }else{
        router.navigate(['/login']);
        return false;
    }
}

export const CanActivateChild = () => {
    return CanActivate();
}

// export const resolve = () =>{
//     // const courseService = inject(CourseService);
//     // return courseService.getAllcourses();
// }