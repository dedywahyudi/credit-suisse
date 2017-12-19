import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// routing module
import { AppRoutingModule } from './app-routing.module';

// bootstrap module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// app main component
import { AppComponent } from './app.component';

// app pages
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { NotificationsPageComponent } from './pages/notifications/notifications.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import { RegulatorsPageComponent } from './pages/regulators/regulators.component';
import { RegulationsPageComponent } from './pages/regulations/regulations.component';
import { SearchPageComponent } from './pages/search/search.component';

// app services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { GoogleMapsLoader } from './services/google-maps-loader.service';

// utils components
import { UrlPipe } from './pipes/url.pipe';
import { SortableDirective } from './directives/sortable.directive';

// app reusable components
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { ContentPanelComponent } from './components/content-panel/content-panel.component';
import { SaveFilterComponent } from './modals/save-filter/save-filter.component';
import { ToggleInputComponent } from './components/toggle-input/toggle-input.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { QuickSearchInputComponent } from './components/quick-search-input/quick-search-input.component';
import { RegulatorDocumentComponent } from './modals/regulator-document/regulator-document.component';
import { RegulatorEventComponent } from './modals/regulator-event/regulator-event.component';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { PageTabsComponent } from './components/page-tabs/page-tabs.component';
import { ListingsPaneComponent } from './components/listings-pane/listings-pane.component';
import { CardsGridComponent } from './components/cards-grid/cards-grid.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { ArticleViewerComponent } from './components/article-viewer/article-viewer.component';
import { TitleDirective } from './directives/title.directive';
import { NgbDropdownInputComponent } from './components/ngb-dropdown-input/ngb-dropdown-input.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    GoogleMapComponent,
    SideNavComponent,
    PageLayoutComponent,
    PageHeaderComponent,
    PageFooterComponent,
    ContentPanelComponent,
    SearchPageComponent,
    UrlPipe,
    SortableDirective,
    SaveFilterComponent,
    ProfilePageComponent,
    ToggleInputComponent,
    EventCardComponent,
    DocumentCardComponent,
    RegulatorsPageComponent,
    RegulationsPageComponent,
    NotificationsPageComponent,
    SidepanelComponent,
    TabsComponent,
    SearchFiltersComponent,
    QuickSearchInputComponent,
    PageTabsComponent,
    RegulatorDocumentComponent,
    RegulatorEventComponent,
    TagsListComponent,
    ListingsPaneComponent,
    CardsGridComponent,
    GlossaryComponent,
    ArticleViewerComponent,
    TitleDirective,
    NgbDropdownInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    AuthService,
    GoogleMapsLoader,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
