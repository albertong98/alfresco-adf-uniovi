import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent {

  @Output()
  filesChanged = new EventEmitter<File[]>();

  selectedFiles: File[] = [];

  isDragOver = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  removeFile(file: File): void {
    this.selectedFiles =
      this.selectedFiles.filter(f => f !== file);

    this.filesChanged.emit(this.selectedFiles);
  }

  private addFiles(files: File[]): void {
    this.selectedFiles.push(...files);
    this.filesChanged.emit(this.selectedFiles);
  }
}