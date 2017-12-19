import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { SearchPageComponent } from './pages/search/search.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import { RegulatorsPageComponent } from './pages/regulators/regulators.component';
import { RegulationsPageComponent } from './pages/regulations/regulations.component';
import { NotificationsPageComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'profile', component:  ProfilePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'regulators', component: RegulatorsPageComponent },
  { path: 'regulations', component: RegulationsPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
