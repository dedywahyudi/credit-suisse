import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { SearchPageComponent } from './pages/search/search.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import { RegulatorsPageComponent } from './pages/regulators/regulators.component';
import { RegulationsPageComponent } from './pages/regulations/regulations.component';
import { NotificationsPageComponent } from './pages/notifications/notifications.component';

import { AdminOverviewPageComponent } from './pages/admin-overview/admin-overview.component';
import { AdminEventsPageComponent } from './pages/admin-events/admin-events.component';
import { AdminEditEventPageComponent } from './pages/admin-edit-event/admin-edit-event.component';
import { AdminEditQuickGuidePageComponent } from './pages/admin-edit-quick-guide/admin-edit-quick-guide.component';
import { AdminEditUserPageComponent } from './pages/admin-edit-user/admin-edit-user.component';
import { AdminEditGlossaryPageComponent } from './pages/admin-edit-glossary/admin-edit-glossary.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'profile', component:  ProfilePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'regulators', component: RegulatorsPageComponent },
  { path: 'regulations', component: RegulationsPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },

  { path: 'admin', component: AdminOverviewPageComponent },
  { path: 'admin/events', component: AdminEventsPageComponent },
  { path: 'admin/edit-event', component: AdminEditEventPageComponent },
  { path: 'admin/edit-quick-guide', component: AdminEditQuickGuidePageComponent },
  { path: 'admin/edit-user', component: AdminEditUserPageComponent },
  { path: 'admin/edit-glossary', component: AdminEditGlossaryPageComponent },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
