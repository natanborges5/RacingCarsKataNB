import { readFileSync } from 'fs';
/* 
  Este codigo foi todo refeito, sendo aplicado as tecnicas de Uso de Funções com Nomes Descritivos, Uso de Mapeamento Funcional em Vez de Estruturas de Controle e
  Eliminação de Variáveis Desnecessárias.
*/
export default class HtmlTextConverter {
  private fullFilenameWithPath: string;

  constructor(fullFilenameWithPath: string) {
    this.fullFilenameWithPath = fullFilenameWithPath;
  }

  /**
   * The function `convertToHtml` reads a file, escapes special HTML characters, and converts newlines
   * to `<br>` tags to return the content as HTML.
   * @returns The function `convertToHtml` returns a string that represents the input text converted to
   * HTML format.
   */
  public convertToHtml(): string {
    const text = readFileSync(this.fullFilenameWithPath, 'utf-8');

    function escapeHtmlChar(char: string): string {
      const escapeMap: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
      };
      return escapeMap[char] || char;
    }
    const html = text
      .split('\n')
      .map(line => line.split('').map(escapeHtmlChar).join(''))
      .join('<br />');
    return html;
  }

  /**
   * The function "getFilename" returns the full filename with its path as a string.
   * @returns The method `getFilename()` is returning a string value, specifically the value of the
   * variable `this.fullFilenameWithPath`.
   */
  public getFilename(): string {
    return this.fullFilenameWithPath;
  }
}
