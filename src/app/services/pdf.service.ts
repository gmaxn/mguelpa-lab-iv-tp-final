import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
  }

  generatePDF(docDefinition:any) {
    pdfMake.createPdf(
      docDefinition,
      {},
      {
        // Default font should still be available
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-Italic.ttf'
        },
        // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
        TimesNewRoman: {
          normal: 'Times-New-Roman-Regular.ttf',
          bold: 'Times-New-Roman-Bold.ttf',
          italics: 'Times-New-Roman-Italics.ttf',
          bolditalics: 'Times-New-Roman-Italics.ttf'
        }
      },
      pdfFonts.pdfMake.vfs).open();
  }
}
