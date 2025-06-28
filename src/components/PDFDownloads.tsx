import React, { useState } from 'react';
import { Download, FileText, BookOpen, Award, Loader2 } from 'lucide-react';
import { generateModulePDF, downloadPDF } from '../utils/pdfGenerator';
import { generateWorkbookPDF, generateReferencePDF, generateCertificatePDF } from '../utils/pdfSpecialTypes';

interface PDFDownloadsProps {
  moduleId: string;
  moduleTitle: string;
  userProgress?: {
    completedSteps: string[];
    totalSteps: number;
  };
}

export default function PDFDownloads({ moduleId, moduleTitle, userProgress }: PDFDownloadsProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleDownload = async (type: 'guide' | 'workbook' | 'reference' | 'certificate') => {
    setIsGenerating(type);

    try {
      let blob: Blob;
      let filename: string;

      switch (type) {
        case 'guide':
          blob = await generateModulePDF(moduleId);
          filename = `${moduleTitle} - Complete Guide.pdf`;
          break;
        case 'workbook':
          blob = await generateWorkbookPDF(moduleId);
          filename = `${moduleTitle} - Exercise Workbook.pdf`;
          break;
        case 'reference':
          blob = await generateReferencePDF(moduleId);
          filename = `${moduleTitle} - Quick Reference.pdf`;
          break;
        case 'certificate':
          blob = await generateCertificatePDF(moduleId, moduleTitle);
          filename = `${moduleTitle} - Completion Certificate.pdf`;
          break;
        default:
          throw new Error('Unknown PDF type');
      }

      downloadPDF(blob, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again!');
    } finally {
      setIsGenerating(null);
    }
  };

  const isModuleComplete = userProgress && 
    userProgress.completedSteps.length === userProgress.totalSteps;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Download className="w-6 h-6 text-blue-500 mr-2" />
        Downloadable Resources
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Complete Guide */}
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Complete Guide</h4>
                <p className="text-sm text-gray-600">Comprehensive theory & examples</p>
              </div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">PDF</span>
          </div>
          <button
            onClick={() => handleDownload('guide')}
            disabled={isGenerating !== null}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating === 'guide' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating PDF...
              </>
            ) : (
              'Download Guide'
            )}
          </button>
        </div>

        {/* Exercise Workbook */}
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Exercise Workbook</h4>
                <p className="text-sm text-gray-600">Printable worksheets & exercises</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">PDF</span>
          </div>
          <button
            onClick={() => handleDownload('workbook')}
            disabled={isGenerating !== null}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating === 'workbook' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating PDF...
              </>
            ) : (
              'Download Workbook'
            )}
          </button>
        </div>

        {/* Quick Reference */}
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <h4 className="font-semibold text-gray-900">Quick Reference</h4>
                <p className="text-sm text-gray-600">Key concepts summary card</p>
              </div>
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">PDF</span>
          </div>
          <button
            onClick={() => handleDownload('reference')}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
          >
            Download Reference
          </button>
        </div>

        {/* Completion Certificate */}
        <div className={`border rounded-lg p-4 transition-shadow ${
          isModuleComplete 
            ? 'border-yellow-200 bg-yellow-50 hover:shadow-md' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <Award className={`w-5 h-5 mr-2 ${
                isModuleComplete ? 'text-yellow-500' : 'text-gray-400'
              }`} />
              <div>
                <h4 className={`font-semibold ${
                  isModuleComplete ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Completion Certificate
                </h4>
                <p className={`text-sm ${
                  isModuleComplete ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {isModuleComplete ? 'Congratulations!' : 'Complete module to unlock'}
                </p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              isModuleComplete 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              PDF
            </span>
          </div>
          <button
            onClick={() => handleDownload('certificate')}
            disabled={!isModuleComplete}
            className={`w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              isModuleComplete
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isModuleComplete ? 'Download Certificate' : 'Complete Module First'}
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Download the workbook to practice exercises offline, 
          and use the reference card as a quick reminder while writing!
        </p>
      </div>
    </div>
  );
}
