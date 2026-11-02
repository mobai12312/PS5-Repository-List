// Fill empty translation source snapshots from the latest database.
// Never modify the manually maintained Simplified Chinese strings.
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../json');
const database = JSON.parse(fs.readFileSync(path.join(dir, 'repos-database.json'), 'utf8'));
const translationPath = path.join(dir, 'translations.zh-CN.json');
const translations = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
const normalize = value => String(value || '').trim().toLowerCase().split('github.com/').pop().split('/').filter(Boolean).join('/');
let seeded = 0;
for (const repo of database.repos || []) {
  const key = normalize(repo.fullName || repo.url);
  const entry = translations[key];
  if (!entry || typeof entry.zh !== 'string' || !entry.zh.trim()) continue;
  if (entry.source === '' && (repo.description || '') !== '') {
    entry.source = repo.description;
    seeded++;
  }
}
if (seeded) fs.writeFileSync(translationPath, JSON.stringify(translations, null, 2) + '\n', 'utf8');
console.log('已建立英文简介对照快照：' + seeded + ' 条；既有中文译文未修改。');
