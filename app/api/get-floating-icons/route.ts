import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get the absolute path to the public directory
    const publicDir = path.join(process.cwd(), 'public', 'floating-icons');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Read all files from the directory
    const files = fs.readdirSync(publicDir);
    
    // Filter for SVG files only
    const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));
    
    return NextResponse.json(svgFiles);
  } catch (error) {
    console.error('Error reading floating-icons directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
