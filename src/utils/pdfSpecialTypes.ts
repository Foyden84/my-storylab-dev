import jsPDF from 'jspdf';
import { kidFriendlyPDFs, quickReferenceCards } from '../data/kidFriendlyContent';

// Generate exercise workbook PDF
export async function generateWorkbookPDF(moduleId: string): Promise<Blob> {
  const doc = new jsPDF();
  const content = kidFriendlyPDFs[moduleId];
  
  if (!content) {
    throw new Error(`No workbook content found for module: ${moduleId}`);
  }

  // Title page
  doc.setFontSize(24);
  doc.setTextColor(34, 197, 94); // Green-500
  doc.text(`${content.title} Workbook`, 20, 30);
  
  doc.setFontSize(16);
  doc.setTextColor(107, 114, 128);
  doc.text("Practice Exercises & Activities", 20, 45);
  
  doc.setFontSize(12);
  doc.text("Name: ________________________", 20, 70);
  doc.text("Date: ________________________", 20, 85);

  let yPosition = 110;

  // Add exercises for each section
  content.sections.forEach((section, sectionIndex) => {
    if (section.exercises) {
      section.exercises.forEach((exercise, exerciseIndex) => {
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }

        // Exercise title
        doc.setFontSize(16);
        doc.setTextColor(168, 85, 247); // Purple-500
        doc.text(`Exercise ${sectionIndex + 1}.${exerciseIndex + 1}: ${exercise.title}`, 20, yPosition);
        yPosition += 15;

        // Instructions
        doc.setFontSize(11);
        doc.setTextColor(75, 85, 99);
        const instructionLines = doc.splitTextToSize(exercise.instructions, 170);
        doc.text(instructionLines, 20, yPosition);
        yPosition += instructionLines.length * 5 + 10;

        // Example
        if (exercise.example) {
          doc.setFontSize(10);
          doc.setTextColor(34, 197, 94);
          doc.text("Example:", 20, yPosition);
          yPosition += 6;
          doc.setTextColor(107, 114, 128);
          const exampleLines = doc.splitTextToSize(exercise.example, 170);
          doc.text(exampleLines, 20, yPosition);
          yPosition += exampleLines.length * 4 + 10;
        }

        // Workspace
        if (exercise.workspace) {
          doc.setFontSize(10);
          doc.setTextColor(107, 114, 128);
          doc.text("Your turn! Write your ideas here:", 20, yPosition);
          yPosition += 10;

          // Draw lines for writing
          for (let i = 0; i < 8; i++) {
            doc.setDrawColor(200, 200, 200);
            doc.line(20, yPosition + (i * 8), 190, yPosition + (i * 8));
          }
          yPosition += 70;
        }
      });
    }
  });

  return doc.output('blob');
}

// Generate quick reference card PDF
export async function generateReferencePDF(moduleId: string): Promise<Blob> {
  const doc = new jsPDF();
  const referenceData = quickReferenceCards[moduleId];
  
  if (!referenceData) {
    throw new Error(`No reference content found for module: ${moduleId}`);
  }

  // Title
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246); // Blue-500
  doc.text(referenceData.title, 20, 30);

  let yPosition = 50;

  // Tips section
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11); // Amber-500
  doc.text("🌟 Quick Tips:", 20, yPosition);
  yPosition += 15;

  referenceData.tips.forEach((tip: string, index: number) => {
    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    const tipLines = doc.splitTextToSize(`${index + 1}. ${tip}`, 170);
    doc.text(tipLines, 25, yPosition);
    yPosition += tipLines.length * 5 + 3;
  });

  yPosition += 10;

  // Examples section
  if (referenceData.examples) {
    doc.setFontSize(14);
    doc.setTextColor(168, 85, 247); // Purple-500
    doc.text("💡 Example Ideas:", 20, yPosition);
    yPosition += 15;

    referenceData.examples.forEach((example: string) => {
      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      doc.text(`• ${example}`, 25, yPosition);
      yPosition += 8;
    });
  }

  // Add decorative border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(2);
  doc.rect(15, 15, 180, 267);

  return doc.output('blob');
}

// Generate completion certificate PDF
export async function generateCertificatePDF(moduleId: string, moduleTitle: string): Promise<Blob> {
  const doc = new jsPDF('landscape'); // Landscape orientation for certificate
  
  // Certificate border
  doc.setDrawColor(212, 175, 55); // Gold color
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);
  
  doc.setLineWidth(1);
  doc.rect(15, 15, 267, 180);

  // Title
  doc.setFontSize(28);
  doc.setTextColor(212, 175, 55);
  doc.text("Certificate of Achievement", 148, 40, { align: 'center' });

  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(75, 85, 99);
  doc.text("This certifies that", 148, 60, { align: 'center' });

  // Name line
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  doc.text("_________________________________", 148, 85, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  doc.text("(Write your name here)", 148, 95, { align: 'center' });

  // Achievement text
  doc.setFontSize(16);
  doc.setTextColor(75, 85, 99);
  doc.text("has successfully completed the", 148, 115, { align: 'center' });

  doc.setFontSize(20);
  doc.setTextColor(168, 85, 247);
  doc.text(`${moduleTitle} Module`, 148, 135, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(75, 85, 99);
  doc.text("in StoryLab's Creative Writing Course", 148, 150, { align: 'center' });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128);
  const today = new Date().toLocaleDateString();
  doc.text(`Date: ${today}`, 148, 170, { align: 'center' });

  // Add some decorative elements
  doc.setFontSize(30);
  doc.setTextColor(212, 175, 55);
  doc.text("⭐", 50, 100);
  doc.text("⭐", 246, 100);
  doc.text("🎉", 50, 150);
  doc.text("🎉", 246, 150);

  return doc.output('blob');
}

// Generate comprehensive guide with kid-friendly content
export async function generateKidFriendlyGuide(moduleId: string): Promise<Blob> {
  const doc = new jsPDF();
  const content = kidFriendlyPDFs[moduleId];
  
  if (!content) {
    throw new Error(`No content found for module: ${moduleId}`);
  }

  // Title page with fun styling
  doc.setFontSize(24);
  doc.setTextColor(168, 85, 247); // Purple-500
  doc.text(content.title, 20, 30);
  
  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94); // Green-500
  doc.text(content.subtitle, 20, 45);
  
  doc.setFontSize(12);
  doc.setTextColor(245, 158, 11); // Amber-500
  doc.text(content.ageGroup, 20, 60);

  // Fun intro message
  doc.setFontSize(11);
  doc.setTextColor(75, 85, 99);
  const introText = "Welcome to your awesome storytelling adventure! This guide is packed with fun examples, cool tips, and everything you need to create amazing stories. Let's get started! 🚀";
  const introLines = doc.splitTextToSize(introText, 170);
  doc.text(introLines, 20, 80);

  let yPosition = 110;

  // Add all sections with kid-friendly formatting
  content.sections.forEach((section) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Section heading with emoji
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246); // Blue-500
    doc.text(section.heading, 20, yPosition);
    yPosition += 15;

    // Section content
    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    const contentLines = doc.splitTextToSize(section.content, 170);
    doc.text(contentLines, 20, yPosition);
    yPosition += contentLines.length * 5 + 10;

    // Add examples with fun formatting
    if (section.examples) {
      section.examples.forEach((example) => {
        if (yPosition > 230) {
          doc.addPage();
          yPosition = 20;
        }

        // Example title with emoji
        doc.setFontSize(14);
        doc.setTextColor(168, 85, 247);
        doc.text(`📖 ${example.title}`, 25, yPosition);
        yPosition += 12;

        // Before example (if exists)
        if (example.before) {
          doc.setFontSize(10);
          doc.setTextColor(239, 68, 68);
          doc.text("😴 Boring version:", 30, yPosition);
          yPosition += 6;
          doc.setTextColor(75, 85, 99);
          const beforeLines = doc.splitTextToSize(`"${example.before}"`, 160);
          doc.text(beforeLines, 30, yPosition);
          yPosition += beforeLines.length * 4 + 5;
        }

        // After example
        doc.setFontSize(10);
        doc.setTextColor(34, 197, 94);
        doc.text("🎉 Awesome version:", 30, yPosition);
        yPosition += 6;
        doc.setTextColor(75, 85, 99);
        const afterLines = doc.splitTextToSize(`"${example.after}"`, 160);
        doc.text(afterLines, 30, yPosition);
        yPosition += afterLines.length * 4 + 5;

        // Explanation
        doc.setFontSize(9);
        doc.setTextColor(107, 114, 128);
        const explanationLines = doc.splitTextToSize(`💡 Why this works: ${example.explanation}`, 160);
        doc.text(explanationLines, 30, yPosition);
        yPosition += explanationLines.length * 3 + 10;
      });
    }

    // Add tips section
    if (section.tips) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(245, 158, 11);
      doc.text("🌟 Super Tips:", 25, yPosition);
      yPosition += 10;

      section.tips.forEach((tip, index) => {
        doc.setFontSize(10);
        doc.setTextColor(75, 85, 99);
        const tipLines = doc.splitTextToSize(`${index + 1}. ${tip}`, 160);
        doc.text(tipLines, 30, yPosition);
        yPosition += tipLines.length * 4 + 3;
      });
      yPosition += 15;
    }
  });

  return doc.output('blob');
}
