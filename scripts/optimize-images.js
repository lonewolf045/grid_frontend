#!/usr/bin/env node

/**
 * Image Optimization Script
 * Helps identify duplicate images and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
const SRC_IMAGES_DIR = path.join(__dirname, '../src/components/images');

/**
 * Get file hash for duplicate detection
 */
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Scan directory for images
 */
function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);
  const images = [];

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      images.push({
        name: file,
        path: filePath,
        size: getFileSize(filePath),
        hash: getFileHash(filePath),
        directory: path.basename(dirPath)
      });
    }
  });

  return images;
}

/**
 * Find duplicate images
 */
function findDuplicates(images) {
  const hashMap = new Map();
  const duplicates = [];

  images.forEach(image => {
    if (hashMap.has(image.hash)) {
      const existing = hashMap.get(image.hash);
      duplicates.push({
        original: existing,
        duplicate: image
      });
    } else {
      hashMap.set(image.hash, image);
    }
  });

  return duplicates;
}

/**
 * Analyze image optimization opportunities
 */
function analyzeOptimization(images) {
  const analysis = {
    totalImages: images.length,
    totalSize: 0,
    largeImages: [],
    recommendations: []
  };

  images.forEach(image => {
    analysis.totalSize += image.size;
    
    // Flag large images (> 500KB)
    if (image.size > 500 * 1024) {
      analysis.largeImages.push(image);
    }
  });

  // Generate recommendations
  if (analysis.largeImages.length > 0) {
    analysis.recommendations.push(
      `${analysis.largeImages.length} images are larger than 500KB and should be compressed`
    );
  }

  const avgSize = analysis.totalSize / analysis.totalImages;
  if (avgSize > 200 * 1024) {
    analysis.recommendations.push(
      'Average image size is high. Consider implementing WebP format and compression'
    );
  }

  return analysis;
}

/**
 * Generate cleanup script
 */
function generateCleanupScript(duplicates) {
  const script = [
    '#!/bin/bash',
    '# Image cleanup script - removes duplicate images from src/components/images',
    '# Keep images only in public/images directory',
    '',
    'echo "Removing duplicate images from src/components/images..."',
    ''
  ];

  duplicates.forEach(({ duplicate }) => {
    if (duplicate.directory === 'images' && duplicate.path.includes('src/components')) {
      script.push(`rm "${duplicate.path}"`);
    }
  });

  script.push('');
  script.push('echo "Cleanup complete!"');

  return script.join('\n');
}

/**
 * Main execution
 */
function main() {
  console.log('🖼️  Image Optimization Analysis\n');

  // Scan both directories
  const publicImages = scanDirectory(PUBLIC_IMAGES_DIR);
  const srcImages = scanDirectory(SRC_IMAGES_DIR);
  const allImages = [...publicImages, ...srcImages];

  console.log(`📁 Found ${publicImages.length} images in public/images`);
  console.log(`📁 Found ${srcImages.length} images in src/components/images`);
  console.log(`📊 Total images: ${allImages.length}\n`);

  // Find duplicates
  const duplicates = findDuplicates(allImages);
  
  if (duplicates.length > 0) {
    console.log(`🔍 Found ${duplicates.length} duplicate images:\n`);
    
    duplicates.forEach(({ original, duplicate }, index) => {
      console.log(`${index + 1}. ${original.name}`);
      console.log(`   Original: ${original.path} (${formatFileSize(original.size)})`);
      console.log(`   Duplicate: ${duplicate.path} (${formatFileSize(duplicate.size)})`);
      console.log('');
    });

    // Generate cleanup script
    const cleanupScript = generateCleanupScript(duplicates);
    const scriptPath = path.join(__dirname, 'cleanup-images.sh');
    fs.writeFileSync(scriptPath, cleanupScript);
    fs.chmodSync(scriptPath, '755');
    
    console.log(`📝 Generated cleanup script: ${scriptPath}`);
    console.log('   Run with: ./scripts/cleanup-images.sh\n');
  } else {
    console.log('✅ No duplicate images found\n');
  }

  // Analyze optimization opportunities
  const analysis = analyzeOptimization(allImages);
  
  console.log('📈 Optimization Analysis:');
  console.log(`   Total images: ${analysis.totalImages}`);
  console.log(`   Total size: ${formatFileSize(analysis.totalSize)}`);
  console.log(`   Average size: ${formatFileSize(analysis.totalSize / analysis.totalImages)}`);
  
  if (analysis.largeImages.length > 0) {
    console.log(`\n🚨 Large images (> 500KB):`);
    analysis.largeImages.forEach(image => {
      console.log(`   ${image.name}: ${formatFileSize(image.size)}`);
    });
  }

  if (analysis.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    analysis.recommendations.forEach(rec => {
      console.log(`   • ${rec}`);
    });
  }

  console.log('\n🛠️  Next Steps:');
  console.log('   1. Run cleanup script to remove duplicates');
  console.log('   2. Compress large images using tools like ImageOptim or TinyPNG');
  console.log('   3. Consider converting images to WebP format');
  console.log('   4. Implement responsive images with multiple sizes');
  console.log('   5. Use the ProductImageOptimizer utility in your components');
}

// Run the analysis
main();