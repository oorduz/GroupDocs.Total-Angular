import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SearchAppComponent} from './search-app.component';
import {
  Api,
  CommonComponentsModule,
  ErrorInterceptorService, LoadingMaskInterceptorService,
  LoadingMaskService
} from '@groupdocs.examples.angular/common-components';
import {SearchService} from "./search.service";
import {ConfigService} from "@groupdocs.examples.angular/common-components";
import {SearchConfigService} from "./search-config.service";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SearchPanelComponent} from './search-panel/search-panel.component';
import {SearchResultSummaryComponent} from './search-result-summary/search-result-summary.component';
import {SearchResultItemComponent} from './search-result-item/search-result-item.component';
import {IndexedFilesListComponent} from './indexed-files-list/indexed-files-list.component';
import {IndexedFileComponent} from './indexed-file/indexed-file.component';
import {SearchBrowseFilesModalComponent} from './search-browse-files-modal/search-browse-files-modal.component';
import {SearchOptionsPanelComponent} from './search-options-panel/search-options-panel.component';
import {SearchOptionsService} from './search-options.service';
import {IndexPropertiesService} from './index-properties.service';
import { IndexPropertiesPanelComponent } from './index-properties-panel/index-properties-panel.component';
import { DictionaryListComponent } from './dictionary-list/dictionary-list.component';
import { AliasDictionaryComponent } from './alias-dictionary/alias-dictionary.component';
import { AlphabetDictionaryComponent } from './alphabet-dictionary/alphabet-dictionary.component';
import { AlphabetDictionaryService } from './alphabet-dictionary.service';
import { CommandsService } from './commands.service';
import { StopWordDictionaryComponent } from './stop-word-dictionary/stop-word-dictionary.component';

export function initializeApp(searchConfigService: SearchConfigService) {
  const result = () => searchConfigService.load();
  return result;
}

// NOTE: this is required during library compilation see https://github.com/angular/angular/issues/23629#issuecomment-440942981
// @dynamic
export function setupLoadingInterceptor(service: LoadingMaskService) {
  return new LoadingMaskInterceptorService(service);
}

@NgModule({
  declarations: [
    SearchAppComponent,
    SearchPanelComponent,
    SearchResultSummaryComponent,
    SearchResultItemComponent,
    IndexedFilesListComponent,
    IndexedFileComponent,
    SearchBrowseFilesModalComponent,
    SearchOptionsPanelComponent,
    IndexPropertiesPanelComponent,
    DictionaryListComponent,
    AliasDictionaryComponent,
    AlphabetDictionaryComponent,
    StopWordDictionaryComponent
  ],
  imports: [
    BrowserModule,
    CommonComponentsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    SearchAppComponent,
    CommonComponentsModule,
    SearchPanelComponent,
    SearchResultSummaryComponent,
    SearchResultItemComponent,
    IndexedFilesListComponent,
    IndexedFileComponent,
    SearchBrowseFilesModalComponent
  ],
  providers: [
    SearchService,
    SearchOptionsService,
    IndexPropertiesService,
    AlphabetDictionaryService,
    CommandsService,
    ConfigService,
    SearchConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [SearchConfigService], multi: true
    },
    LoadingMaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: setupLoadingInterceptor,
      multi: true,
      deps: [LoadingMaskService]
    }
  ]
})
export class SearchModule {
  static forRoot(apiEndpoint: string): ModuleWithProviders {
    Api.DEFAULT_API_ENDPOINT = apiEndpoint;
    return {
      ngModule: SearchModule
    };
  }
}
