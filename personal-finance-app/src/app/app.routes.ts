import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}