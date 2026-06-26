import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentService, NodesApiService } from '@alfresco/adf-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-list-dialog',
  templateUrl: './document-list-dialog.component.html'
})
export class DocumentListDialogComponent implements OnInit {
  documents!: any[] | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { nodeId: string },
    private contentService: ContentService,
    private router: Router,
    private nodeService: NodesApiService
  ) { }

  ngOnInit(): void {
    this.loadDocuments(this.data.nodeId);
  }

  viewDocument(nodeId: string): void {
    const currentLocation = this.router.url;
    const url = `/view/(viewer:${nodeId})?location=${currentLocation}`;
    window.open(url, '_blank');
  }

  downloadDocument(nodeId: string): void {
    const url = this.contentService.getContentUrl(nodeId, true);

    const link = document.createElement('a');
    link.href = url;
    link.click();
  }


  loadDocuments(folderId: string): void {
    this.nodeService.getNodeChildren(folderId, {
      include: ['properties'],
      maxItems: 1000
    }).subscribe(result => {
      this.documents = result?.list?.entries?.map(item => item.entry).filter(node => node.isFile);
    });
  }
}