import React, { useEffect, useState } from 'react';
import { Image, AlertCircle, Check, Loader2, Upload, Trash } from 'lucide-react';
import { uploadToCloudinary } from '../services/cloudinary';

interface ImagePreviewProps {
  url: string;
  onUrlChange: (url: string) => void;
  label: string;
}

export function ImagePreview({ url, onUrlChange, label }: ImagePreviewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(url);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  // Sync external url updates
  useEffect(() => {
    setPreviewUrl(url);
  }, [url]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      setIsValid(false);
      return;
    }

    setError('');
    setIsValid(null);
    setSelectedFile(file);

    // Instant local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      setError('');
      setIsValid(null);

      const uploadedUrl = await uploadToCloudinary(selectedFile);

      setPreviewUrl(uploadedUrl);
      setIsValid(true);
      onUrlChange(uploadedUrl);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setError('Image upload failed. Please try again.');
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setIsValid(null);
    setError('');
    onUrlChange('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs text-terminal-muted uppercase tracking-wider">
        {label}
      </label>

      {/* File Input */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 px-3 py-2 bg-terminal-black border border-terminal-border rounded cursor-pointer hover:border-accent-blue transition">
          <Upload size={16} />
          <span className="text-xs">Choose Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="px-3 py-2 bg-accent-green hover:bg-green-600 text-white text-xs rounded transition-colors disabled:opacity-60"
          >
            {isLoading ? 'Uploading…' : 'Upload'}
          </button>
        )}

        {/* Status Icons */}
        <div>
          {isLoading && <Loader2 size={16} className="animate-spin text-accent-blue" />}
          {isValid === true && <Check size={16} className="text-accent-green" />}
          {isValid === false && <AlertCircle size={16} className="text-accent-red" />}
        </div>

        {previewUrl && (
          <button
            onClick={handleRemove}
            className="flex items-center gap-2 px-3 py-2 border border-red-600 text-accent-red text-xs rounded hover:bg-red-600 hover:text-white transition-colors"
          >
            <Trash size={16} />
            <span>Remove Image</span>
            
          </button>
        )}
      </div>

      {error && (
        <p className="text-accent-red text-xs flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {/* Preview */}
      <div className="border border-terminal-border rounded-lg overflow-hidden bg-terminal-black">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-terminal-black/80 px-2 py-1 rounded text-xs text-accent-green">
              Preview
            </div>
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-terminal-muted">
            <Image size={32} className="mb-2 opacity-50" />
            <span className="text-xs">No image selected</span>
          </div>
        )}
      </div>     

      <p className="text-xs text-terminal-muted">
        Images are uploaded to Cloudinary and stored as URLs in Firestore.
      </p>
    </div>
  );
}
