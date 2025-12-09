# 部署指南 (Deployment Guide)

想要让朋友通过手机访问这个游戏，你有以下几种方式：

## 方案一：使用 Vercel 免费部署（推荐 🌟）

这是最稳定、最专业的方式。部署后你将获得一个永久的网址（如 `who-is-spy.vercel.app`），任何人在任何地方都能访问。

### 步骤：

1.  **准备代码**：
    *   确保所有图片都已经下载完成（运行过 `node scripts/fetchImages.js`）。
    *   将项目上传到你的 GitHub 仓库。
    *   *注意：由于包含大量图片，首次上传可能需要一点时间。*

2.  **注册/登录 Vercel**：
    *   访问 [vercel.com](https://vercel.com/)。
    *   使用 GitHub 账号登录。

3.  **导入项目**：
    *   点击 "Add New..." -> "Project"。
    *   选择你刚才上传的 GitHub 仓库。
    *   点击 "Import"。

4.  **配置与部署**：
    *   Framework Preset 选择 **Vite**。
    *   Build Command 默认为 `npm run build` (无需修改)。
    *   Output Directory 默认为 `dist` (无需修改)。
    *   点击 **Deploy**。

5.  **完成**：
    *   等待约 1-2 分钟，部署完成后，Vercel 会给你一个访问链接。
    *   将这个链接发给朋友，大家就可以直接玩了！

---

## 方案二：局域网访问（仅限同一 WiFi）

如果你们都在同一个房间，连接着同一个 WiFi，可以使用这种方式。

1.  **修改启动命令**：
    *   打开终端，运行：
        ```bash
        npm run dev -- --host
        ```
    *   或者修改 `package.json` 中的 `dev` 脚本为 `"dev": "vite --host"`。

2.  **查看访问地址**：
    *   终端会显示类似 `Network: http://192.168.1.x:5173` 的地址。
    *   让朋友手机连接同一个 WiFi，输入这个地址即可访问。

---

## 方案三：内网穿透（临时外网访问）

如果你想快速让外网朋友访问，但不想部署到 Vercel，可以使用 `ngrok` 等工具。

1.  **安装 ngrok**：
    *   访问 [ngrok.com](https://ngrok.com/) 下载并安装。

2.  **启动项目**：
    *   在终端运行 `npm run dev`，确保项目在本地 `http://localhost:5173` 运行。

3.  **启动穿透**：
    *   打开一个新的终端窗口，运行：
        ```bash
        ngrok http 5173
        ```

4.  **获取链接**：
    *   ngrok 会生成一个类似 `https://xxxx-xxxx.ngrok-free.app` 的链接。
    *   将这个链接发给朋友即可（注意：免费版 ngrok 链接有效期较短，且速度可能受限）。
