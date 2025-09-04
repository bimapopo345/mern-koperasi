import conf from "../conf/conf.js";

/**
 * Convert local file path to full URL
 * @param {string} filePath - Local file path (e.g., "uploads/savings/file.jpg")
 * @returns {string} - Full URL (e.g., "https://your-domain.com/uploads/savings/file.jpg")
 */
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  
  // If already a full URL, return as is
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  
  // Normalize path separators (convert Windows backslashes to forward slashes)
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Convert local path to full URL
  const baseUrl = conf.serverUrl.endsWith('/') ? conf.serverUrl.slice(0, -1) : conf.serverUrl;
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  
  return `${baseUrl}${cleanPath}`;
};

/**
 * Extract file path from full URL for storage
 * @param {string} fileUrl - Full URL or local path
 * @returns {string} - Local file path for database storage
 */
export const getStoragePath = (fileUrl) => {
  if (!fileUrl) return null;
  
  // If it's a full URL, extract the path part
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    try {
      const url = new URL(fileUrl);
      let pathname = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
      // Normalize path separators for storage
      return pathname.replace(/\\/g, '/');
    } catch (error) {
      console.error('Invalid URL:', fileUrl);
      return fileUrl;
    }
  }
  
  // If it's already a local path, normalize separators
  return fileUrl.replace(/\\/g, '/');
};

/**
 * Transform savings data to include full file URLs
 * @param {Object|Array} data - Savings data (single object or array)
 * @returns {Object|Array} - Transformed data with full URLs
 */
export const transformSavingsWithFileUrls = (data) => {
  if (!data) return data;
  
  const transformSingle = (savings) => {
    if (!savings) return savings;
    
    const transformed = { ...savings };
    if (savings.proofFile) {
      transformed.proofFile = getFileUrl(savings.proofFile);
    }
    
    // Handle if it's a Mongoose document
    if (savings.toObject && typeof savings.toObject === 'function') {
      const obj = savings.toObject();
      if (obj.proofFile) {
        obj.proofFile = getFileUrl(obj.proofFile);
      }
      return obj;
    }
    
    return transformed;
  };
  
  if (Array.isArray(data)) {
    return data.map(transformSingle);
  }
  
  return transformSingle(data);
};