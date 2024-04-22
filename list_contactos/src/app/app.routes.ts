import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';

export const routes: Routes = [
    {path:'', component: ContactTableComponent }
];
