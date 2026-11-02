# PS5 Repository List（简体中文说明）

[Français / 法语原版](README.fr.md) · [上游项目](https://github.com/nexgen999/PS5-Repository-List)

**PS5 Repository List** 是一个整理和追踪 PS5 相关 GitHub 开源项目的网页目录。它按用途分类展示项目，并提供仓库链接、GitHub 星标、提交动态、发布版本和下载附件等信息。

> 本文档是本 Fork 补充的中文使用说明。项目、版本和下载信息以各项目的 GitHub 仓库为准；收录在列表中不代表已经验证安全性、兼容性或适用固件版本。

## 一、快速使用

1. 打开本仓库提供的网页（如已启用 GitHub Pages），或使用浏览器查看项目的网页部署。
2. 首次访问默认显示**简体中文**，也可以在设置中切换其他界面语言。
3. 使用搜索框按项目名称、作者、关键字等查找项目，也可以按分类浏览。
4. 点击项目卡片查看 GitHub 源仓库、README、最近提交及发布信息；如有 Release 附件，可通过链接前往下载。

**注意：** 页面所显示的项目 README 和 GitHub 仓库简介一般来自原项目，不一定有中文版本；界面切换为中文会显示已维护的中文项目简介，但第三方 README、提交记录和版本发布说明仍以原文为准。下载或安装前请核对原项目要求、固件兼容性以及发布来源。

## 二、项目文件结构

```text
PS5-Repository-List/
├── .github/workflows/deploy.yml    # GitHub Actions 定时更新数据库
├── assets/                         # 网页前端 JS/CSS 静态资源
├── index.html                      # 网页入口
├── json/
│   ├── repos-config.json          # 项目分类和仓库清单（主要维护文件）
│   ├── repos-database.json        # 自动生成的项目详情数据库
│   └── translations.json          # 多语言界面文案（含简体中文 zh）
├── Repository-to-add/
│   ├── next_add.txt               # 待考虑加入的项目
│   └── removed.txt                # 移除记录
├── scripts/update-db.js           # 使用 GitHub API 更新数据库
├── tool/
│   ├── config_manager.py          # 图形化配置工具
│   └── config_manager_v0.2.py
├── README.md                       # 上游原版说明
└── README.zh-CN.md                 # 本中文说明
```

## 三、如何添加或维护项目

**推荐方法：修改 `json/repos-config.json`。** 其中：

- `categories`：分类的 ID、名称、颜色等。
- `repos`：需要追踪的 GitHub 仓库 URL、所属分类 `categoryId`，以及可选的自定义备注和标签。

新增项目时，请确认 URL 指向真实的 GitHub 仓库，`categoryId` 与现有分类一致，并避免重复添加同一个 URL。修改前建议检查 JSON 语法。

如果更习惯图形界面，可在安装了 Python 3 和 Tkinter 的桌面环境中，从仓库根目录运行：

```bash
python tool/config_manager.py
```

此工具可管理项目和分类并保存到 `json/repos-config.json`。注意目录名是 **`tool`**（不是 `tools`）。

## 四、更新项目数据

在安装了 **Node.js 20 或兼容版本** 的环境中，进入仓库根目录后执行：

```bash
node scripts/update-db.js
```

脚本会读取 `json/repos-config.json`，依次通过 GitHub API 获取仓库资料、README、最近提交、Release 和附件等，并重新生成 `json/repos-database.json`。如果遇到 GitHub API 限流，可在环境中设置有权限的 `GITHUB_TOKEN`。

仓库还自带 `.github/workflows/deploy.yml`，设定了**每小时**计划触发，也可以在 GitHub 的 **Actions** 中手动运行。GitHub 定时任务可能延迟，不保证每次都准点执行；是否成功应查看实际工作流记录。

**重要区别：自动更新数据库不等于同步上游代码。** 这套工作流只刷新项目数据，不会自动把上游对网页、配置或程序的更改合并进你的 Fork。

## 五、如何同步上游并保留中文

上游仓库：[nexgen999/PS5-Repository-List](https://github.com/nexgen999/PS5-Repository-List)

如需获取上游后续更新，建议先比较提交与文件差异，再合并上游 `main` 分支。保留本 Fork 的 `README.zh-CN.md` 和中文入口，不要直接用上游内容强行覆盖整个分支。

由于本 Fork 增加了中文文档，今后两个分支的提交 ID 可能不同；**提交不同不代表上游代码没有同步**，需要查看相对上游新增和落后的提交。

## 六、中文维护机制

截至 2026 年 11 月 2 日，当前配置收录的 336 个不同 GitHub 仓库地址均已提供中文简介（配置文件有一条重复记录）。分类名称和项目简介通过独立汉化文件提供，不会修改第三方仓库的原始数据；切换到其他语言仍可查看原始信息。

- `json/translations.zh-CN.json`：按仓库地址保存中文项目简介。
- `assets/zh-adapter.js`：根据简体中文语言选项显示中文分类及简介。
- `scripts/check-translations.js`：检查新增未翻译项目，以及 GitHub 原文变化后需要人工复核的译文。
- `scripts/seed-translation-sources.js`：为尚未建立英文原文对照的译文保存初始参考值，不修改已有中文译文。

后续同步上游时需保留这些文件，并检查 `assets/index.js` 的中文适配入口。自动数据库更新不能代替新增项目的人工译文维护。

## 七、常见疑问

**为什么有些项目没有版本或下载按钮？**  
部分仓库没有发布 GitHub Releases，或最新发布没有附件；这不一定表示项目无法使用。

**为什么打开某个项目后说明仍是英文？**  
中文界面只负责本网站的按钮、菜单等 UI 文案，第三方仓库 README 和开发者说明不一定提供翻译。

**为什么页面统计不是最新的？**  
网站可能展示上次生成的数据库，更新需要等待 GitHub Actions 执行成功或手动重新生成数据。部分数据也可能受 GitHub API 限流影响。

**该如何选择 PS5 工具？**  
请先阅读项目的原始 README、固件版本要求和 Release 说明。不同 PS5 系统版本、设备环境可能不兼容；切勿仅凭目录分类判断能否安装或运行。

---

此中文文档用于便于中文用户了解项目结构与维护方式；原项目的代码、网页和数据版权与许可遵循各自上游仓库说明。
