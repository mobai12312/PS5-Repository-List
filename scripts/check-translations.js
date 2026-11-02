// Report missing, changed and non-localized repo descriptions without editing Chinese.
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../json');
const config = JSON.parse(fs.readFileSync(path.join(dir, 'repos-config.json'), 'utf8'));
const database = JSON.parse(fs.readFileSync(path.join(dir, 'repos-database.json'), 'utf8'));
const translations = JSON.parse(fs.readFileSync(path.join(dir, 'translations.zh-CN.json'), 'utf8'));
const normalize = value => String(value || '').trim().toLowerCase().split('github.com/').pop().split('/').filter(Boolean).join('/');
const ids = [...new Set((config.repos || []).map(repo => normalize(repo.url)))];
const missing = ids.filter(id => !translations[id] || typeof translations[id].zh !== 'string' || !translations[id].zh.trim());
const stale = [];
for (const repo of database.repos || []) {
  const key = normalize(repo.fullName || repo.url);
  const entry = translations[key];
  if (!entry || typeof entry.source !== 'string') continue;
  if (entry.source !== (repo.description || '')) stale.push(repo.fullName || repo.url);
}
const report = [
  '## PS5 简体中文覆盖率', '',
  '- 配置中不同仓库地址：' + ids.length,
  '- 已有中文译文：' + (ids.length - missing.length),
  '- 缺少中文译文：' + missing.length,
  '- GitHub 简介已变更、需要人工复核：' + stale.length, '',
  ...(missing.length ? ['### 尚未汉化的仓库', ...missing.map(x => '- ' + x), ''] : []),
  ...(stale.length ? ['### 英文原文已变化（中文保留，待复核）', ...stale.map(x => '- ' + x), ''] : [])
].join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n', 'utf8');
