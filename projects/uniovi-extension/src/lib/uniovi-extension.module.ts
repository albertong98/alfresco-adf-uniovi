import { NgModule } from '@angular/core';
import { UnioviExtensionComponent } from './uniovi-extension.component';
import { provideExtensionConfig } from '@alfresco/adf-extensions';
import { TranslationService } from '@alfresco/adf-core';
import { CustomListComponent } from './components/custom-list/custom-list.component';



@NgModule({
  declarations: [
    UnioviExtensionComponent,
    CustomListComponent
  ],
  imports: [
  ],
  exports: [
    UnioviExtensionComponent,
    CustomListComponent
  ],
  providers:[
    provideExtensionConfig(['uniovi.extension.json'])
  ]
})
export class UnioviExtensionModule {
  constructor(private translation:TranslationService){
    this.translation.addTranslationFolder('uniovi-extension','assets/uniovi-extension')
  }
}
