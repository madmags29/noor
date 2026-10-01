#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const flutterDir = path.join(rootDir, 'noor-flutter');
const pubspecPath = path.join(flutterDir, 'pubspec.yaml');

// 1. Read and parse pubspec.yaml version
const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
const versionMatch = pubspecContent.match(/^version:\s*([0-9]+\.[0-9]+\.[0-9]+)\+([0-9]+)/m);

if (!versionMatch) {
  console.error('❌ Could not parse version in pubspec.yaml');
  process.exit(1);
}

const versionName = versionMatch[1];
const currentBuildNumber = parseInt(versionMatch[2], 10);
const newBuildNumber = currentBuildNumber + 1;
const newVersionString = `${versionName}+${newBuildNumber}`;

console.log(`\n🚀 [NOOR AUTO-VERSION] Incrementing version: ${versionName}+${currentBuildNumber} ➡️ ${newVersionString}`);

// 2. Update pubspec.yaml with new version
const updatedPubspec = pubspecContent.replace(/^version:\s*.*$/m, `version: ${newVersionString}`);
fs.writeFileSync(pubspecPath, updatedPubspec, 'utf8');
console.log(`✅ Updated pubspec.yaml -> version: ${newVersionString}`);

// 3. Build Flutter AppBundle (Release)
console.log(`\n📦 Building signed Release AppBundle (.aab)...`);
try {
  execSync('flutter build appbundle --release', {
    cwd: flutterDir,
    stdio: 'inherit',
  });
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// 4. Copy generated AAB to root
const builtAabPath = path.join(flutterDir, 'build', 'app', 'outputs', 'bundle', 'release', 'app-release.aab');
const destAabPath = path.join(rootDir, 'noor-e-ilahi-release.aab');
const destVersionedAabPath = path.join(rootDir, `noor-e-ilahi-v${versionName}_b${newBuildNumber}.aab`);

if (fs.existsSync(builtAabPath)) {
  fs.copyFileSync(builtAabPath, destAabPath);
  fs.copyFileSync(builtAabPath, destVersionedAabPath);
  console.log(`\n🎉 Success! Release App Bundle created:`);
  console.log(`   📁 File: ${destAabPath}`);
  console.log(`   📁 Archive Copy: ${destVersionedAabPath}`);
  console.log(`   🏷️  Release Version: ${versionName}`);
  console.log(`   🔢 Version Code: ${newBuildNumber}`);
  console.log(`\n📱 Local download URL: http://192.168.3.45:8080/noor-e-ilahi-release.aab\n`);
} else {
  console.error(`❌ Could not locate output file at: ${builtAabPath}`);
}
