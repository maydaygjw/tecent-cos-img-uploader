# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

腾讯云COS图片上传工具 - A Node.js CLI tool for uploading images to Tencent Cloud Object Storage.

## Commands

```bash
# Install dependencies
npm install

# CLI usage
node index.js upload <file_path> [target_key]   # Upload file
node index.js list [prefix]                      # List files
node index.js delete <key>                       # Delete file

# Or use npm link for global cos-upload command
npm link
cos-upload upload ./image.png
```

## Architecture

- `index.js` - CLI entry point with command parsing (upload/list/delete)
- `upload.js` - Core module exporting: `uploadFile`, `uploadBuffer`, `deleteFile`, `listFiles`
- `config.js` - Loads COS credentials from environment variables via dotenv

## Environment Variables

Required in `.env`:
```
COS_SECRET_ID=xxx
COS_SECRET_KEY=xxx
COS_BUCKET=bucketname-appid
COS_REGION=ap-guangzhou
```

## SDK

Uses `cos-nodejs-sdk-v5` - the official Tencent Cloud COS Node.js SDK.

URL format: `https://{bucket}.cos.{region}.myqcloud.com/{filename}`
