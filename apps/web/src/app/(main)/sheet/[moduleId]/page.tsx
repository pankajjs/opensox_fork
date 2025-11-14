"use client";

import { notFound, useParams } from "next/navigation";
import { sheetModules } from "@/data/sheet";
import Link from "next/link";
import { ArrowLeft, Download, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ModuleDocPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const [copied, setCopied] = useState(false);
  
  const currentModule = sheetModules.find((m) => m.id === moduleId);

  const handleDownloadPDF = () => {
    if (!currentModule) return;
    
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentModule.name} - 30 days of Open Source sheet</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              background: white;
              color: black;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { font-size: 24px; margin-bottom: 10px; }
            .content {
              line-height: 1.6;
            }
            .content h1 { font-size: 20px; margin-top: 20px; }
            .content h2 { font-size: 18px; margin-top: 15px; }
            .content p { margin-bottom: 10px; }
            .content ul { margin-left: 20px; }
            .content li { margin-bottom: 5px; }
            .content pre {
              background: #f5f5f5;
              padding: 10px;
              border-radius: 4px;
              overflow-x: auto;
            }
            .content code {
              background: #f5f5f5;
              padding: 2px 4px;
              border-radius: 2px;
            }
          </style>
        </head>
        <body>
          <h1>${currentModule.name}</h1>
          <div class="content">
            ${currentModule.docContent}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentModule?.name || "Module Documentation",
          text: `Check out this module: ${currentModule?.name}`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback to clipboard if share fails
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardErr) {
        console.error("Failed to copy:", clipboardErr);
      }
    }
  };

  if (!currentModule) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ox-header text-white font-DMfont">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header with back button and actions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <Link
              href="/dashboard/sheet"
              className="inline-flex items-center gap-2 text-ox-purple hover:text-ox-purple-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sheet</span>
            </Link>
            <div className="flex items-center gap-3 flex-shrink-0">
              {copied && (
                <Badge className="bg-ox-purple text-white border-0 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Copied
                </Badge>
              )}
              <button
                onClick={handleDownloadPDF}
                className="p-2 text-white hover:text-ox-purple transition-colors rounded-md hover:bg-ox-content/50"
                title="Download as PDF"
                aria-label="Download as PDF"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-white hover:text-ox-purple transition-colors rounded-md hover:bg-ox-content/50"
                title="Share module"
                aria-label="Share module"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{currentModule.name}</h1>
        </div>

        {/* Content */}
        <div className="bg-ox-content rounded-lg p-8 prose prose-invert max-w-none font-DMfont border border-ox-header">
          <div
            dangerouslySetInnerHTML={{ __html: currentModule.docContent }}
            className="text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-white [&_p]:text-gray-300 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:text-gray-300 [&_li]:mb-2 [&_pre]:bg-ox-sidebar [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:font-DMfont [&_pre]:border [&_pre]:border-ox-header [&_code]:text-ox-purple [&_code]:bg-ox-sidebar [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-DMfont [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-5 [&_img]:border [&_img]:border-ox-header"
          />
        </div>
      </div>
    </div>
  );
}
