#!/usr/bin/env node
/**
 * wp-sync.js
 * Pushes tfa-sponsorship.html to the WordPress sponsorship page via REST API.
 * Credentials are read from .env.wp (never committed to git).
 *
 * Usage:  node wp-sync.js
 * Auto-run: called by .git/hooks/post-commit on every commit
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

// ── Config ────────────────────────────────────────────────────────────────────
const WP_SITE   = 'https://txfordaquatics.com';
const PAGE_ID   = 7259;
const HTML_FILE = '/Volumes/SSD 2026/000 Claude/Go Local Group/TX Ford Aquatics/Sponsorship page/tfa-sponsorship.html';
const ENV_FILE  = path.join(__dirname, '.env.wp');

// ── Load credentials from .env.wp ─────────────────────────────────────────────
if (!fs.existsSync(ENV_FILE)) {
  console.error('');
  console.error('❌  Missing .env.wp file.');
  console.error('    Create it at the project root with this exact content:');
  console.error('');
  console.error('    WP_USER=golocalgroup');
  console.error('    WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx');
  console.error('');
  process.exit(1);
}

const env = {};
fs.readFileSync(ENV_FILE, 'utf8').split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
});

const { WP_USER, WP_APP_PASSWORD } = env;
if (!WP_USER || !WP_APP_PASSWORD) {
  console.error('❌  .env.wp must contain WP_USER and WP_APP_PASSWORD');
  process.exit(1);
}

// WordPress Application Passwords use Basic Auth with spaces stripped
const token = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD.replace(/\s/g, '')}`).toString('base64');

// ── Read & encode HTML ────────────────────────────────────────────────────────
if (!fs.existsSync(HTML_FILE)) {
  console.error(`❌  HTML file not found: ${HTML_FILE}`);
  process.exit(1);
}

const html    = fs.readFileSync(HTML_FILE, 'utf8');
// WPBakery Raw HTML element stores content as base64 inside [vc_raw_html]
const encoded = Buffer.from(encodeURIComponent(html)).toString('base64');
const content = `[vc_raw_html]${encoded}[/vc_raw_html]`;

// ── Push to WordPress REST API ────────────────────────────────────────────────
const body    = JSON.stringify({ content });
const apiPath = `/wp-json/wp/v2/pages/${PAGE_ID}`;

const options = {
  hostname: new URL(WP_SITE).hostname,
  path:     apiPath,
  method:   'POST',
  headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type':  'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log(`⏳  Pushing to ${WP_SITE}${apiPath} …`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅  WordPress sponsorship page updated successfully!');
      console.log(`    View: ${WP_SITE}/7259-2/`);
    } else {
      console.error(`❌  WordPress returned HTTP ${res.statusCode}`);
      try {
        const json = JSON.parse(data);
        console.error('   ', json.message || json.code || data.slice(0, 400));
      } catch {
        console.error('   ', data.slice(0, 400));
      }
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('❌  Network error:', err.message);
  process.exit(1);
});

req.write(body);
req.end();
