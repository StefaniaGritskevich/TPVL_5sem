import { createClient } from 'webdav';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webdavClient = createClient(
  'https://webdav.yandex.ru/', 
  {
    username: 'gritskevitchstefania', 
    password: 'tjtszyneliqdqsiq' 
  }
);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createFolder(folderPath) {
    try {
      await webdavClient.createDirectory(folderPath);
      console.log(`Папка '${folderPath}' успешно создана.`);
    } catch (error) {
      console.error(`Ошибка при создании папки: ${error.message}`);
    }
  }
  
  async function uploadFile(localFilePath, remoteFilePath) {
    try {
      const fileStream = fs.createReadStream(localFilePath);
      await webdavClient.putFileContents(remoteFilePath, fileStream, { overwrite: true });
      console.log(`Файл '${localFilePath}' успешно загружен в '${remoteFilePath}'.`);
    } catch (error) {
      console.error(`Ошибка при загрузке файла: ${error.message}`);
    }
  }
  
  async function downloadFile(remoteFilePath, localFilePath) {
    try {
      const fileContents = await webdavClient.getFileContents(remoteFilePath);
      const localStream = fs.createWriteStream(localFilePath);
      localStream.write(fileContents);
      localStream.end();
  
      console.log(`Файл '${remoteFilePath}' успешно скачан в '${localFilePath}'.`);
    } catch (error) {
      console.error(`Ошибка при скачивании файла: ${error.message}`);
    }
  }
  
  async function copyFile(sourcePath, destinationPath) {
    try {
      await webdavClient.copyFile(sourcePath, destinationPath);
      console.log(`Файл '${sourcePath}' успешно скопирован в '${destinationPath}'.`);
    } catch (error) {
      console.error(`Ошибка при копировании файла: ${error.message}`);
    }
  }
  
  async function deleteFile(filePath) {
    try {
      await webdavClient.deleteFile(filePath);
      console.log(`Файл '${filePath}' успешно удален.`);
    } catch (error) {
      console.error(`Ошибка при удалении файла: ${error.message}`);
    }
  }
  
  async function deleteFolder(folderPath) {
    try {
      await webdavClient.deleteFile(folderPath);
      console.log(`Папка '${folderPath}' успешно удалена.`);
    } catch (error) {
      console.error(`Ошибка при удалении папки: ${error.message}`);
    }
  }
  
  
  
    async function handleCommand(command) {
      const folderPath = '/test_folder';
      const localFilePath = path.join(__dirname, 'test.txt');
      const remoteFilePath = `${folderPath}/test.txt`;
      const copyPath = `${folderPath}/copy_test.txt`;
      const downloadPath = path.join(__dirname, 'downloaded_test.txt');
    
      switch (command) {
        case 'create':
          await createFolder(folderPath);
          break;
        case 'upload':
          await uploadFile(localFilePath, remoteFilePath);
          break;
        case 'download':
          await downloadFile(remoteFilePath, downloadPath);
          break;
        case 'copy':
          await copyFile(remoteFilePath, copyPath);
          break;
        case 'delete':
          await deleteFile(copyPath);
          break;
        case 'delete-folder':
          await deleteFolder(folderPath);
          break;
        case 'exit':
          console.log('Выход из программы.');
          rl.close();
          return;
        default:
          console.log('Неверный выбор. Используйте: create, upload, download, copy, delete, delete-folder, exit.');
      }
      prompt(); 
    }
    

    function prompt() {
      rl.question('Введите команду: ', (command) => {
        handleCommand(command).then(() => prompt());
      });
    }
    
    (async () => {
      console.log('Сервер запущен. Введите команду:');
      prompt();
    })();
    