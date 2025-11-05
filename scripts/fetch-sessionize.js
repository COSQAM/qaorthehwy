#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Load .env file if it exists (for local development)
try {
  const envContent = readFileSync('.env', 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (err) {
  // .env file not found - this is okay in CI/CD environments
  console.log('No .env file found, using environment variables');
}

const eventId = process.env.SESSIONIZE_EVENT_ID;

if (!eventId || eventId === 'your-event-id-here') {
  console.error('Please set SESSIONIZE_EVENT_ID in your .env file');
  process.exit(1);
}

console.log('Fetching Sessionize data...');

try {
  // Fetch All endpoint (regular sessions + speakers)
  console.log('Fetching All endpoint...');
  const allData = execSync(
    `curl -f -s "https://sessionize.com/api/v2/${eventId}/view/All"`,
    { encoding: 'utf-8' }
  );
  const allJson = JSON.parse(allData);

  // Fetch GridSmart endpoint (includes service sessions)
  console.log('Fetching GridSmart endpoint...');
  const gridData = execSync(
    `curl -f -s "https://sessionize.com/api/v2/${eventId}/view/GridSmart"`,
    { encoding: 'utf-8' }
  );
  const gridJson = JSON.parse(gridData);

  // Extract service sessions from GridSmart
  const serviceSessions = [];
  const existingSessionIds = new Set(allJson.sessions.map(s => s.id));

  gridJson.forEach(day => {
    day.rooms?.forEach(room => {
      room.sessions?.forEach(session => {
        // Add sessions that aren't already in the All endpoint (likely service sessions)
        if (!existingSessionIds.has(session.id)) {
          serviceSessions.push(session);
        }
      });
    });
  });

  // Merge service sessions into the main data
  allJson.sessions = [...allJson.sessions, ...serviceSessions];

  console.log(`✓ Found ${allJson.sessions.length} total sessions (${serviceSessions.length} service sessions)`);

  // Save merged data
  writeFileSync('src/data/sessionize.json', JSON.stringify(allJson, null, 2));

  console.log('✓ Sessionize data updated successfully!');
} catch (err) {
  console.error('Failed to fetch Sessionize data:', err.message);
  process.exit(1);
}
