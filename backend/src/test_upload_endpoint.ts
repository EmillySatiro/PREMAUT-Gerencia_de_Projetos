import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function testUpload() {
    // Cria um arquivo de teste
    const testContent = Buffer.from('Test file content', 'utf-8');
    const testFilePath = '/tmp/test_upload.txt';
    fs.writeFileSync(testFilePath, testContent);

    const formData = new FormData();
    formData.append('file', fs.createReadStream(testFilePath), 'test_upload.txt');

    try {
        console.log('Testing upload to http://localhost:3001/api/materiais...');

        const response = await fetch('http://localhost:3001/api/materiais', {
            method: 'POST',
            body: formData as any,
        });

        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);

        const data = await response.json();
        console.log('Response:', data);

        if (response.ok) {
            console.log('✅ Upload successful!');
            console.log('URL:', data.url);
        } else {
            console.log('❌ Upload failed');
        }
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        // Limpa o arquivo de teste
        fs.unlinkSync(testFilePath);
    }
}

testUpload();
