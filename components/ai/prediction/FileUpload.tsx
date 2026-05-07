"use client";

import { useState, useRef } from "react";
import Papa from "papaparse";
import { UploadCloud, FileType, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface FileUploadProps {
  onDataParsed: (data: any[], metadata: any) => void;
}

export default function FileUpload({ onDataParsed }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setError(null);
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Only CSV files are supported.");
      return;
    }
    setFile(selectedFile);
    parseFile(selectedFile);
  };

  const parseFile = (fileToParse: File) => {
    setParsing(true);
    Papa.parse(fileToParse, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsing(false);
        if (results.errors.length > 0) {
          setError("Errors occurred while parsing the CSV. Check data format.");
          console.error(results.errors);
          return;
        }
        
        if (results.data.length === 0) {
          setError("The CSV file is empty.");
          return;
        }

        onDataParsed(results.data, {
          fileName: fileToParse.name,
          size: fileToParse.size,
          rowCount: results.data.length,
          columns: results.meta.fields || []
        });
      },
      error: (err) => {
        setParsing(false);
        setError(err.message);
      }
    });
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />
      
      <div 
        className={`w-full border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
          isDragging ? "border-indigo-500 bg-indigo-500/10" : 
          file && !error ? "border-green-500/50 bg-green-500/5" : 
          error ? "border-rose-500/50 bg-rose-500/5" : 
          "border-white/10 hover:border-indigo-400 hover:bg-white/5"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center cursor-pointer">
          {parsing ? (
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
          ) : error ? (
            <AlertTriangle className="w-12 h-12 text-rose-400 mb-4" />
          ) : file ? (
            <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
          ) : (
            <UploadCloud className="w-12 h-12 text-indigo-400 mb-4" />
          )}

          <h3 className="text-xl font-bold text-white mb-2">
            {parsing ? "Parsing Dataset..." : file ? file.name : "Upload Election Dataset"}
          </h3>
          <p className="text-white/50 text-sm max-w-sm mx-auto">
            {error ? error : file && !parsing ? "Dataset parsed successfully. Generating Analytics..." : "Drag and drop your .csv file here, or click to browse. Our AI engine will automatically analyze the structure."}
          </p>

          {!file && !parsing && (
             <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
               <FileType className="w-4 h-4" /> CSV Format Supported
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
