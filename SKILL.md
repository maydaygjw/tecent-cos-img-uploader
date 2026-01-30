---
name: tencent-cos-uploader
description: Upload images and files to Tencent Cloud Object Storage (COS) and get public URLs. Use this skill when:
- User wants to upload an image or file to Tencent COS
- User asks to "upload to COS", "upload to Tencent cloud", or "upload to 腾讯云"
- User needs to batch upload multiple images
- User mentions "腾讯云" or "COS" with upload intent
- User provides local file paths and wants public URLs
- User needs to manage files in Tencent Cloud storage

metadata: {"clawdbot":{"emoji":"☁️","requires":{"npm":["cos-nodejs-sdk-v5","dotenv"]},"primaryEnv":"COS_SECRET_ID"}}
---

# Tencent COS File Uploader

Upload files to Tencent Cloud Object Storage (COS) and get public URLs.

## Features

- ☁️ Upload local files to Tencent COS
- 📝 Custom target path/filename support
- 📋 List files in bucket
- 🗑️ Delete files from bucket
- 🔗 Auto-generate public access URLs

## Setup

### 1. Install dependencies

```bash
cd d:\app\code\tecent-cos-img-uploader
npm install
```

### 2. Get Tencent Cloud COS Credentials

1. Go to [Tencent Cloud Console](https://console.cloud.tencent.com/cam/capi)
2. Create or use existing API key (SecretId + SecretKey)
3. Go to [COS Console](https://console.cloud.tencent.com/cos5/bucket) to get bucket name and region

### 3. Configure Environment

Create `.env` file in project root:
```bash
COS_SECRET_ID=your_secret_id_here
COS_SECRET_KEY=your_secret_key_here
COS_BUCKET=your_bucket_name-1234567890
COS_REGION=ap-guangzhou
```

## Usage

### Upload File

```bash
cd d:\app\code\tecent-cos-img-uploader

# Upload with original filename
node index.js upload /path/to/image.png

# Upload with custom target path
node index.js upload /path/to/image.png images/photo.png
```

Returns URL: `https://{bucket}.cos.{region}.myqcloud.com/{filename}`

### List Files

```bash
cd d:\app\code\tecent-cos-img-uploader

# List all files
node index.js list

# List files with prefix
node index.js list images/
```

### Delete File

```bash
cd d:\app\code\tecent-cos-img-uploader
node index.js delete images/photo.png
```

## Common Workflows

### 1. Upload Single Image and Get URL

```bash
cd d:\app\code\tecent-cos-img-uploader
node index.js upload /path/to/screenshot.png screenshots/2024-01-30.png
```

Output:
```
上传成功!
URL: https://bucket-123456.cos.ap-guangzhou.myqcloud.com/screenshots/2024-01-30.png
```

### 2. Batch Upload Multiple Images

```bash
cd d:\app\code\tecent-cos-img-uploader
for file in /path/to/images/*.png; do
  node index.js upload "$file" "batch/$(basename $file)"
done
```

### 3. Check Uploaded Files

```bash
cd d:\app\code\tecent-cos-img-uploader
node index.js list batch/
```

## Region Reference

| Region Code | Location |
|-------------|----------|
| ap-guangzhou | 广州 |
| ap-shanghai | 上海 |
| ap-beijing | 北京 |
| ap-chengdu | 成都 |
| ap-hongkong | 香港 |
| ap-singapore | 新加坡 |

## Notes

- Uploaded files are publicly accessible via the returned URL
- URL format: `https://{bucket}.cos.{region}.myqcloud.com/{key}`
- Ensure bucket has proper public read permissions configured
