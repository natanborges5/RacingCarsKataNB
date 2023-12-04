import { expect } from 'chai';
import 'mocha';
import HtmlTextConverter from '../text-converter/html-text-converter';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

describe('Html Converter', () => {

  describe('HtmlTextConverter', () => {

    it('should return the correct filename', async () => {
		const relativeFilePath = 'teste.txt';
		const absoluteFilePath = resolve(__dirname, relativeFilePath);
		const converter = new HtmlTextConverter(absoluteFilePath);
		try {
			expect(converter.getFilename()).to.eql(absoluteFilePath);
		} catch (error) {
			expect.fail(`Error during conversion: ${error}`);
		}
    });
	it('should convert text to HTML', async () => {
		const relativeFilePath = 'teste.txt';
		// Obtenha o caminho absoluto usando a função 'resolve'
		const absoluteFilePath = resolve(__dirname, relativeFilePath);
		const converter = new HtmlTextConverter(absoluteFilePath);
		const fileContent = 'This is a <b>test</b> file with Unicode characters: 你好, 😊.\nSecond line with & special characters.';
      	writeFileSync(absoluteFilePath, fileContent, 'utf-8');
		try {
			const htmlContent = converter.convertToHtml();

			expect(htmlContent).to.include('This is a &lt;b&gt;test&lt;/b&gt; file with Unicode characters: 你好, 😊.');
        	expect(htmlContent).to.include('Second line with &amp; special characters.');
			expect(converter.getFilename()).to.eql(absoluteFilePath);
		} catch (error) {
			expect.fail(`Error during conversion: ${error}`);
		}
    });
	it('should convert ampersand', function () {
		const relativeFilePath = 'teste.txt';
		const absoluteFilePath = resolve(__dirname, relativeFilePath);
		const converter = new HtmlTextConverter(absoluteFilePath);
		const fileContent = 'Cut & Paste';
      	writeFileSync(absoluteFilePath, fileContent, 'utf-8');
		try {
			const htmlContent = converter.convertToHtml();

			expect(htmlContent).to.include('Cut &amp; Paste');
			expect(converter.getFilename()).to.eql(absoluteFilePath);
		} catch (error) {
			expect.fail(`Error during conversion: ${error}`);
		}
	});
	it('should convert greate than and less than', function () {
		const relativeFilePath = 'teste.txt';
		const absoluteFilePath = resolve(__dirname, relativeFilePath);
		const converter = new HtmlTextConverter(absoluteFilePath);
		const fileContent = '10 > 5; 5 < 10';
      	writeFileSync(absoluteFilePath, fileContent, 'utf-8');
		try {
			const htmlContent = converter.convertToHtml();

			expect(htmlContent).to.include('10 &gt; 5; 5 &lt; 10');
			expect(converter.getFilename()).to.eql(absoluteFilePath);
		} catch (error) {
			expect.fail(`Error during conversion: ${error}`);
		}
	});
	it('should add breakline for multiple lines', function () {
		const relativeFilePath = 'teste.txt';
		const absoluteFilePath = resolve(__dirname, relativeFilePath);
		const converter = new HtmlTextConverter(absoluteFilePath);
		const fileContent = 'hello\nhow are you doing?\n';
      	writeFileSync(absoluteFilePath, fileContent, 'utf-8');
		try {
			const htmlContent = converter.convertToHtml();

			expect(htmlContent).to.include('hello<br />how are you doing?<br />');
			expect(converter.getFilename()).to.eql(absoluteFilePath);
		} catch (error) {
			expect.fail(`Error during conversion: ${error}`);
		}

	});

  });

});
