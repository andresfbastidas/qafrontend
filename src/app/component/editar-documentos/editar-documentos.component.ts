import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.scss']
})
export class EditarDocumentosComponent implements OnInit, AfterViewInit  {

  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  wvInstance: any;

  ngAfterViewInit(): void {

    const input = document.getElementById('file_upload');
    WebViewer({
      path: '../assets/lib',
    }, this.viewer.nativeElement).then(instance => {
      input.addEventListener('change', () => {

        // Get the file from the input
        let file = (<HTMLInputElement>document.getElementById('file_upload')).files[0];
        instance.loadDocument(file, { filename: file.name });
      });

      const { docViewer } = instance;
      docViewer.on('documentLoaded', () => {
        // perform document operations
      });
    });
  }

  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    annotManager.addAnnotation(rectangle);
    annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs
  }

}
