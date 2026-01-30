# 腾讯云COS图片上传工具

一个简单易用的腾讯云对象存储（COS）图片上传工具，基于Node.js开发。

## 功能特性

- 上传本地图片到腾讯云COS
- 支持自定义文件名和路径
- 列出存储桶中的文件
- 删除指定文件
- 支持Buffer上传
- 自动生成访问URL

## 安装

```bash
npm install
```

## 配置

本工具支持三种配置方式，优先级从高到低为：**环境变量 > 用户配置文件 > .env 文件**

### 方式一：用户配置文件（推荐）

在用户主目录创建 `~/.tecent-cos-img-uploader.json` 文件：

```json
{
  "secretId": "your_secret_id_here",
  "secretKey": "your_secret_key_here",
  "bucket": "your_bucket_name-1234567890",
  "region": "ap-guangzhou"
}
```

**优点**：
- 全局配置，所有项目共享
- 无需在每个项目中创建 `.env` 文件
- 不会意外提交到版本控制系统

### 方式二：.env 文件

1. 复制配置文件模板：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的腾讯云COS配置信息：

```env
COS_SECRET_ID=your_secret_id_here
COS_SECRET_KEY=your_secret_key_here
COS_BUCKET=your_bucket_name-1234567890
COS_REGION=ap-guangzhou
```

### 方式三：环境变量

直接设置环境变量（优先级最高）：

```bash
# Linux/Mac
export COS_SECRET_ID=your_secret_id_here
export COS_SECRET_KEY=your_secret_key_here
export COS_BUCKET=your_bucket_name-1234567890
export COS_REGION=ap-guangzhou

# Windows (PowerShell)
$env:COS_SECRET_ID="your_secret_id_here"
$env:COS_SECRET_KEY="your_secret_key_here"
$env:COS_BUCKET="your_bucket_name-1234567890"
$env:COS_REGION="ap-guangzhou"
```

### 获取配置信息

- **SecretId 和 SecretKey**: 访问 [腾讯云API密钥管理](https://console.cloud.tencent.com/cam/capi)
- **Bucket**: 在 [COS控制台](https://console.cloud.tencent.com/cos5/bucket) 创建或查看存储桶
- **Region**: 存储桶所在地域，如 `ap-guangzhou`（广州）、`ap-shanghai`（上海）、`ap-beijing`（北京）

## 使用方法

### 命令行工具

本工具支持两种命令行使用方式：

**方式一：使用 node 命令**
```bash
node index.js <命令> [参数]
```

**方式二：使用 npx（推荐）**
```bash
# 本地开发时
npm link
cos-upload <命令> [参数]

# 或直接使用 npx
npx . <命令> [参数]

# 如果已发布到 npm
npx tecent-cos-img-uploader <命令> [参数]
# 或
npx cos-upload <命令> [参数]
```

#### 上传文件

```bash
# 使用 node 命令
# 上传图片（使用原文件名）
node index.js upload ./image.png

# 上传图片并指定目标路径和文件名
node index.js upload ./image.png images/photo.png

# 使用 npx（需先执行 npm link）
cos-upload upload ./image.png
cos-upload upload ./image.png images/photo.png
```

#### 列出文件

```bash
# 使用 node 命令
node index.js list              # 列出所有文件
node index.js list images/      # 列出指定前缀的文件

# 使用 npx
cos-upload list
cos-upload list images/
```

#### 删除文件

```bash
# 使用 node 命令
node index.js delete images/photo.png

# 使用 npx
cos-upload delete images/photo.png
```

### 作为模块使用

```javascript
const { uploadFile, uploadBuffer, deleteFile, listFiles } = require('./upload');

// 上传文件
async function example() {
  try {
    // 上传本地文件
    const result = await uploadFile('./image.png', 'uploads/image.png');
    console.log('上传成功:', result.url);

    // 上传Buffer
    const buffer = Buffer.from('image data');
    const result2 = await uploadBuffer(buffer, 'uploads/buffer-image.png');
    console.log('上传成功:', result2.url);

    // 列出文件
    const files = await listFiles('uploads/');
    console.log('文件列表:', files);

    // 删除文件
    await deleteFile('uploads/image.png');
    console.log('删除成功');
  } catch (error) {
    console.error('操作失败:', error);
  }
}
```

## API 文档

### uploadFile(filePath, targetKey)

上传本地文件到COS。

- `filePath` (string): 本地文件路径
- `targetKey` (string, 可选): COS中的目标文件名/路径，默认使用原文件名
- 返回: Promise<{ url, ETag, ... }>

### uploadBuffer(buffer, fileName)

上传Buffer数据到COS。

- `buffer` (Buffer): 要上传的Buffer数据
- `fileName` (string): COS中的文件名/路径
- 返回: Promise<{ url, ETag, ... }>

### deleteFile(key)

删除COS中的文件。

- `key` (string): 要删除的文件名/路径
- 返回: Promise<Object>

### listFiles(prefix)

列出COS中的文件。

- `prefix` (string, 可选): 文件前缀，用于过滤
- 返回: Promise<Array>

## 项目结构

```
.
├── index.js           # CLI命令行工具
├── upload.js          # 核心上传功能模块
├── config.js          # 配置文件加载
├── .env.example       # 配置文件模板
├── .env               # 实际配置文件（需自行创建）
├── package.json       # 项目依赖
└── README.md          # 项目文档
```

## 注意事项

1. 请妥善保管配置文件中的密钥信息，不要提交到版本控制系统
2. 用户配置文件 `~/.tecent-cos-img-uploader.json` 存储在用户主目录，注意文件权限
3. 确保存储桶的访问权限配置正确
4. 上传的文件URL格式为：`https://{bucket}.cos.{region}.myqcloud.com/{filename}`
5. 建议在生产环境中使用临时密钥（STS）而非永久密钥

## 许可证

MIT
# tecent-cos-img-uploader
