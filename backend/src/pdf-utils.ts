import pdfParse from 'pdf-parse';

 async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    const extracted = (data.text || '').trim();

    if (!extracted || extracted.length < 60) {
      const errMsg =
        'Extracted text is empty or too short. PDF may be scanned image only or contains protected content.';
      console.warn(errMsg, { length: extracted.length, textPreview: extracted.slice(0, 120) });
      throw new Error(errMsg);
    }

    return extracted;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to extract text from PDF: ${error.message}`
        : 'Failed to extract text from PDF'
    );
  }
}

export default extractTextFromPDF;