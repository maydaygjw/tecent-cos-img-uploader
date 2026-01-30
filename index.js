#!/usr/bin/env node

const { uploadFile, uploadBuffer, deleteFile, listFiles } = require('./upload');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('腾讯云COS图片上传工具');
    console.log('');
    console.log('用法:');
    console.log('  node index.js upload <文件路径> [目标文件名]');
    console.log('  node index.js list [前缀]');
    console.log('  node index.js delete <文件名>');
    console.log('');
    console.log('示例:');
    console.log('  node index.js upload ./image.png');
    console.log('  node index.js upload ./image.png images/photo.png');
    console.log('  node index.js list images/');
    console.log('  node index.js delete images/photo.png');
    return;
  }

  const command = args[0];

  try {
    switch (command) {
      case 'upload': {
        const filePath = args[1];
        const targetKey = args[2];

        if (!filePath) {
          console.error('错误: 请提供要上传的文件路径');
          process.exit(1);
        }

        console.log(`正在上传: ${filePath}`);
        const result = await uploadFile(filePath, targetKey);
        console.log('上传成功!');
        console.log(`URL: ${result.url}`);
        console.log(`ETag: ${result.ETag}`);
        break;
      }

      case 'list': {
        const prefix = args[1] || '';
        console.log(`正在列出文件 (前缀: ${prefix || '无'})...`);
        const files = await listFiles(prefix);

        if (files.length === 0) {
          console.log('没有找到文件');
        } else {
          console.log(`找到 ${files.length} 个文件:`);
          files.forEach(file => {
            console.log(`  - ${file.Key} (${formatSize(file.Size)})`);
          });
        }
        break;
      }

      case 'delete': {
        const key = args[1];
        if (!key) {
          console.error('错误: 请提供要删除的文件名');
          process.exit(1);
        }

        console.log(`正在删除: ${key}`);
        await deleteFile(key);
        console.log('删除成功!');
        break;
      }

      default:
        console.error(`未知命令: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error('操作失败:', error.message);
    process.exit(1);
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

main();
