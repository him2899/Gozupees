#!/usr/bin/env node

/**
 * Layout Migration Helper Script
 * 
 * This script helps identify and validate pages for Layout component migration
 * Usage: node scripts/migration-helper.js [command]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../pages');
const EXCLUDED_PAGES = ['_app.tsx', '_document.tsx', '404.tsx', 'agents.tsx'];

// Commands
const commands = {
  scan: scanPages,
  extract: extractMetadata,
  validate: validatePage,
  help: showHelp
};

function scanPages() {
  console.log('🔍 Scanning pages directory for Layout component usage...\n');
  
  const pages = getAllPages();
  const results = {
    withLayout: [],
    withoutLayout: [],
    excluded: []
  };
  
  pages.forEach(pagePath => {
    const fileName = path.basename(pagePath);
    
    if (EXCLUDED_PAGES.includes(fileName)) {
      results.excluded.push(pagePath);
      return;
    }
    
    const content = fs.readFileSync(pagePath, 'utf8');
    const hasLayout = content.includes('import Layout') || content.includes('<Layout');
    
    if (hasLayout) {
      results.withLayout.push(pagePath);
    } else {
      results.withoutLayout.push(pagePath);
    }
  });
  
  console.log(`📊 Migration Status Report:`);
  console.log(`✅ Pages using Layout: ${results.withLayout.length}`);
  console.log(`❌ Pages needing migration: ${results.withoutLayout.length}`);
  console.log(`⚪ Excluded pages: ${results.excluded.length}`);
  
  console.log(`\n🎯 Priority Migration Candidates (Simple Pages):`);
  const simpleCandidates = results.withoutLayout.filter(page => 
    ['contact.tsx', 'pricing.tsx', 'careers.tsx', 'ethics.tsx', 'privacy-policy.tsx']
      .some(simple => page.includes(simple))
  );
  
  simpleCandidates.forEach(page => {
    console.log(`  - ${path.relative(PAGES_DIR, page)}`);
  });
  
  return results;
}

function extractMetadata(pagePath) {
  if (!pagePath) {
    console.error('❌ Please provide a page path: node migration-helper.js extract pages/contact.tsx');
    return;
  }
  
  const fullPath = path.resolve(pagePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Page not found: ${fullPath}`);
    return;
  }
  
  console.log(`🔍 Extracting metadata from: ${pagePath}\n`);
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const metadata = {};
  
  // Extract title
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  if (titleMatch) metadata.title = titleMatch[1];
  
  // Extract description
  const descMatch = content.match(/name="description"\s+content="(.*?)"/);
  if (descMatch) metadata.description = descMatch[1];
  
  // Extract canonical
  const canonicalMatch = content.match(/rel="canonical"\s+href="(.*?)"/);
  if (canonicalMatch) metadata.canonical = canonicalMatch[1];
  
  // Extract OG image
  const ogImageMatch = content.match(/property="og:image"\s+content="(.*?)"/);
  if (ogImageMatch) metadata.ogImage = ogImageMatch[1];
  
  // Extract OG type
  const ogTypeMatch = content.match(/property="og:type"\s+content="(.*?)"/);
  if (ogTypeMatch) metadata.ogType = ogTypeMatch[1];
  
  console.log('📋 Extracted metadata:');
  console.log(JSON.stringify(metadata, null, 2));
  
  // Generate Layout component props
  console.log('\n🔧 Generated Layout props:');
  console.log(`<Layout`);
  if (metadata.title) console.log(`  title="${metadata.title}"`);
  if (metadata.description) console.log(`  description="${metadata.description}"`);
  if (metadata.canonical) console.log(`  canonical="${metadata.canonical}"`);
  if (metadata.ogImage) console.log(`  ogImage="${metadata.ogImage}"`);
  if (metadata.ogType) console.log(`  ogType="${metadata.ogType}"`);
  console.log(`>`);
  
  return metadata;
}

function validatePage(pagePath) {
  if (!pagePath) {
    console.error('❌ Please provide a page path: node migration-helper.js validate pages/contact.tsx');
    return;
  }
  
  console.log(`🧪 Validating page: ${pagePath}\n`);
  
  // Check if page exists and builds successfully
  try {
    console.log('✅ Building page...');
    execSync(`npm run build -- --page ${pagePath}`, { stdio: 'inherit' });
    
    console.log('✅ Page builds successfully');
    
    // TODO: Add more validation checks:
    // - SEO metadata presence
    // - GTM tag verification
    // - Cookie consent integration
    // - Visual regression tests
    
  } catch (error) {
    console.error('❌ Page build failed:', error.message);
    return false;
  }
  
  return true;
}

function getAllPages() {
  const pages = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        pages.push(filePath);
      }
    });
  }
  
  walkDir(PAGES_DIR);
  return pages;
}

function showHelp() {
  console.log(`
🚀 Layout Migration Helper

Commands:
  scan                    - Scan all pages and show migration status
  extract <page-path>     - Extract SEO metadata from a page
  validate <page-path>    - Validate a page builds correctly
  help                    - Show this help message

Examples:
  node scripts/migration-helper.js scan
  node scripts/migration-helper.js extract pages/contact.tsx
  node scripts/migration-helper.js validate pages/pricing.tsx
`);
}

// Main execution
const command = process.argv[2] || 'help';
const arg = process.argv[3];

if (commands[command]) {
  commands[command](arg);
} else {
  console.error(`❌ Unknown command: ${command}`);
  showHelp();
}