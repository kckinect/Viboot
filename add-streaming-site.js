#!/usr/bin/env node

/**
 * AutoPlay Video Control - Add New Streaming Site
 * Interactive script to add support for new streaming platforms
 * 
 * Updates:
 * - manifest.json (permissions and content scripts)
 * - streaming-controller.js (detection and platform strategy)
 * - README.md (supported sites list)
 * - SUPPORTED_SITES.md (marketing/advertising list)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// File paths
const MANIFEST_PATH = path.join(__dirname, 'extension/manifest.json');
const CONTROLLER_PATH = path.join(__dirname, 'extension/content/streaming-controller.js');
const README_PATH = path.join(__dirname, 'README.md');
const SUPPORTED_SITES_PATH = path.join(__dirname, 'SUPPORTED_SITES.md');

// Platform template
const PLATFORM_TEMPLATE = {
  detectPattern: '',
  strategy: {
    name: '',
    selectors: ['video'],
    findVideo: `async findVideo() {
      for (const sel of this.selectors) {
        const v = document.querySelector(sel);
        if (v && v.readyState >= 1) return v;
      }
      return null;
    }`,
    pause: `async pause(video) {
      if (video && !video.paused) {
        await video.pause();
        return true;
      }
      return false;
    }`,
    play: `async play(video) {
      if (video && video.paused) {
        await video.play();
        return true;
      }
      return false;
    }`
  },
  fallbacks: ['direct', 'platform', 'generic']
};

async function main() {
  console.log('\n🎬 AutoPlay Video Control - Add New Streaming Site\n');
  console.log('This script will help you add support for a new streaming platform.\n');

  try {
    // Collect site information
    const siteName = await question('Site name (e.g., "Peacock"): ');
    const siteKey = siteName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const domain = await question('Primary domain (e.g., "peacock.com"): ');
    const urlPattern = await question(`URL pattern (default: "*://*.${domain}/*"): `) || `*://*.${domain}/*`;
    
    console.log('\nVideo element selectors (comma-separated, press Enter for default "video"):');
    const selectorsInput = await question('Selectors: ');
    const selectors = selectorsInput ? selectorsInput.split(',').map(s => s.trim()) : ['video'];
    
    console.log('\nPlatform detection string (what appears in the URL?):');
    const detectString = await question(`Detection string (default: "${domain.split('.')[0]}"): `) || domain.split('.')[0];
    
    console.log('\nFallback methods (comma-separated):');
    console.log('Options: direct, platform, iframe, shadowDOM, generic');
    const fallbacksInput = await question('Fallbacks (default: direct,platform,generic): ');
    const fallbacks = fallbacksInput ? fallbacksInput.split(',').map(s => s.trim()) : ['direct', 'platform', 'generic'];

    // Summary
    console.log('\n📋 Summary:');
    console.log(`   Name: ${siteName}`);
    console.log(`   Key: ${siteKey}`);
    console.log(`   Domain: ${domain}`);
    console.log(`   URL Pattern: ${urlPattern}`);
    console.log(`   Selectors: ${selectors.join(', ')}`);
    console.log(`   Detection: ${detectString}`);
    console.log(`   Fallbacks: ${fallbacks.join(', ')}`);
    
    const confirm = await question('\nProceed with these settings? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }

    // Update files
    console.log('\n🔧 Updating files...\n');
    
    updateManifest(urlPattern);
    updateStreamingController(siteKey, siteName, detectString, selectors, fallbacks);
    updateReadme(siteName, domain);
    updateSupportedSites(siteName, domain);
    
    console.log('\n✅ Successfully added support for ' + siteName + '!\n');
    console.log('Next steps:');
    console.log('1. Review the changes in extension/manifest.json');
    console.log('2. Review the changes in extension/content/streaming-controller.js');
    console.log('3. Test the extension on ' + domain);
    console.log('4. Update backend selectors if needed (server/api.js)\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

function updateManifest(urlPattern) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  
  // Add to host_permissions
  if (!manifest.host_permissions.includes(urlPattern)) {
    manifest.host_permissions.push(urlPattern);
    console.log('   ✓ Added to host_permissions');
  }
  
  // Add to content_scripts matches
  const contentScript = manifest.content_scripts[0];
  if (!contentScript.matches.includes(urlPattern)) {
    contentScript.matches.push(urlPattern);
    console.log('   ✓ Added to content_scripts');
  }
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}

function updateStreamingController(key, name, detectString, selectors, fallbacks) {
  let content = fs.readFileSync(CONTROLLER_PATH, 'utf8');
  
  // 1. Add to detectPlatform function
  const detectPlatformRegex = /(if \(url\.includes\('hulu'\)\) return 'hulu';)/;
  const newDetection = `if (url.includes('${detectString}')) return '${key}';\n    $1`;
  
  if (!content.includes(`return '${key}'`)) {
    content = content.replace(detectPlatformRegex, newDetection);
    console.log('   ✓ Added platform detection');
  }
  
  // 2. Add to PlatformStrategies
  const strategyTemplate = `
    ${key}: {
      name: '${name}',
      selectors: [${selectors.map(s => `'${s}'`).join(', ')}],

      async findVideo() {
        for (const sel of this.selectors) {
          const v = document.querySelector(sel);
          if (v && v.readyState >= 1) return v;
        }
        return null;
      },

      async pause(video) {
        if (video && !video.paused) {
          await video.pause();
          return true;
        }
        return false;
      },

      async play(video) {
        if (video && video.paused) {
          await video.play();
          return true;
        }
        return false;
      }
    },`;
  
  const strategiesRegex = /(hulu: {[\s\S]*?}\s*},)\s*(generic: {)/;
  if (!content.includes(`${key}: {`)) {
    content = content.replace(strategiesRegex, `$1\n${strategyTemplate}\n    $2`);
    console.log('   ✓ Added platform strategy');
  }
  
  // 3. Add to PlatformFallbacks
  const fallbacksStr = fallbacks.map(f => `'${f}'`).join(', ');
  const fallbackTemplate = `    // ${name} fallback configuration\n    ${key}: [${fallbacksStr}],\n    `;
  const fallbacksRegex = /(twitch: \[.*?\],\n\s*)/;
  
  if (!content.includes(`${key}: [`)) {
    content = content.replace(fallbacksRegex, `$1${fallbackTemplate}`);
    console.log('   ✓ Added fallback configuration');
  }
  
  fs.writeFileSync(CONTROLLER_PATH, content);
}

function updateReadme(name, domain) {
  let readme = fs.readFileSync(README_PATH, 'utf8');
  
  // Find the supported platforms section and add new platform
  const platformListRegex = /(- \*\*[A-Za-z+\s]+\*\*[^\n]*\n)/g;
  const matches = readme.match(platformListRegex);
  
  if (matches && !readme.includes(`**${name}**`)) {
    const lastPlatform = matches[matches.length - 1];
    const newPlatform = `- **${name}** (${domain})\n`;
    readme = readme.replace(lastPlatform, lastPlatform + newPlatform);
    console.log('   ✓ Updated README.md');
    fs.writeFileSync(README_PATH, readme);
  }
}

function updateSupportedSites(name, domain) {
  let content = '';
  
  // Create or read existing file
  if (fs.existsSync(SUPPORTED_SITES_PATH)) {
    content = fs.readFileSync(SUPPORTED_SITES_PATH, 'utf8');
  } else {
    content = `# AutoPlay Video Control - Supported Streaming Sites

This is a complete list of all streaming platforms supported by AutoPlay Video Control.

Last updated: ${new Date().toISOString().split('T')[0]}

## Streaming Platforms

`;
  }
  
  // Add new site if not already present
  if (!content.includes(name)) {
    const siteEntry = `- **${name}** - ${domain}\n`;
    content += siteEntry;
    
    // Update last updated date
    content = content.replace(/Last updated: .*/, `Last updated: ${new Date().toISOString().split('T')[0]}`);
    
    fs.writeFileSync(SUPPORTED_SITES_PATH, content);
    console.log('   ✓ Updated SUPPORTED_SITES.md');
  }
}

// Run the script
main();
