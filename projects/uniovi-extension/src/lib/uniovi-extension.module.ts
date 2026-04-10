import { NgModule } from '@angular/core';
import { UnioviExtensionComponent } from './uniovi-extension.component';
import { provideExtensionConfig } from '@alfresco/adf-extensions';
import { TranslationService } from '@alfresco/adf-core';



@NgModule({
  declarations: [
    UnioviExtensionComponent
  ],
  imports: [
  ],
  exports: [
    UnioviExtensionComponent
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
