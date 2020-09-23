import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastPageComponent } from './pages/cast-page/cast-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'cast', pathMatch: 'full'},
  {path: 'cast', component: CastPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
