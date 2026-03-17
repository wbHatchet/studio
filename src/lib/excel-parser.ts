import * as XLSX from 'xlsx';

/**
 * Parses an Excel file into a standardized job format for the 20-agent pipeline.
 * Supports .xlsx, .xls, and .csv formats.
 */
export const processExcelUpload = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        
        // Map Excel rows to standardized Agent Inputs
        const formattedJobs = json.map((row: any) => ({
          topic: row.Topic || row.Title || 'Untitled Topic',
          niche: row.Niche || row.Category || 'General',
          mood: row.Mood || 'Lofi',
          status: 'pending',
          steps: [],
          createdAt: new Date().toISOString()
        }));
        
        resolve(formattedJobs);
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please ensure it follows the standard template.'));
      }
    };
    reader.onerror = () => reject(new Error('File reading error.'));
    reader.readAsArrayBuffer(file);
  });
};
