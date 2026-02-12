import React from 'react';
import type { Schema } from '@strapi/types';
import type { Editor } from '@tiptap/react';

/**
 * Image asset from Strapi Media Library
 */
export interface MediaAsset {
  id: number;
  name: string;
  alternativeText?: string;
  caption: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Formatted image for TipTap editor
 */
export interface FormattedImage {
  src: string;
  alt: string;
  'data-figcaption': string | null;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export interface MediaLibProps {
  /** TipTap editor instance */
  editor: Editor;
  /** Whether the media library is open */
  isOpen: boolean;
  /** Callback to close the media library */
  onClose: () => void;
  /** Optional: Force insert even if image is already active */
  forceInsert?: boolean;
  /** Optional: Custom components from Strapi App */
  components?: Record<string, React.ComponentType<any>>;
}

/**
 * MediaLib component for TipTap editor integration with Strapi Media Library
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <MediaLib
 *   editor={editor}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
export const MediaLib: React.FC<MediaLibProps> = ({ components, editor, isOpen, onClose, forceInsert = false }) => {
  // Early return if not open or components not loaded
  if (!isOpen || !components) {
    return null;
  }

  const MediaLibraryDialog = components['media-library'] as React.ComponentType<{
    allowedTypes: Schema.Attribute.MediaKind[];
    onClose: () => void;
    onSelectAssets: (images: MediaAsset[]) => void;
  }>;

  // Return null if MediaLibraryDialog is not available
  if (!MediaLibraryDialog) {
    return null;
  }

  /**
   * Transform media asset to TipTap image attributes
   */
  const formatImageForEditor = (asset: MediaAsset): FormattedImage => {
    const image: FormattedImage = {
      src: asset.url,
      alt: asset.alternativeText ?? '',
      'data-figcaption': asset.caption,
    };

    // Add optional width/height
    if (asset.width) {
      image.width = asset.width;
    }
    if (asset.height) {
      image.height = asset.height;
    }

    // Add lazy loading if URL contains 'lazy' or caption is 'lazy'
    if (asset.url?.includes('lazy') || asset.caption === 'lazy') {
      image.loading = 'lazy';
    }

    return image;
  };

  /**
   * Handle asset selection from media library
   */
  const handleSelectAssets = (assets: MediaAsset[]) => {
    // Filter only image assets
    const imageAssets = assets.filter((asset) => asset.mime.includes('image'));

    if (imageAssets.length === 0) {
      onClose();
      return;
    }

    // Determine if we should update existing image or insert new ones
    const shouldUpdate = !forceInsert && editor.isActive('image');

    imageAssets.forEach((asset) => {
      const formattedImage = formatImageForEditor(asset);

      if (shouldUpdate) {
        // Update the currently selected image
        editor.chain().focus().setImage(formattedImage).run();
      } else {
        // Insert new image
        editor.commands.setImage(formattedImage);
      }
    });

    onClose();
  };

  return <MediaLibraryDialog allowedTypes={['images']} onClose={onClose} onSelectAssets={handleSelectAssets} />;
};
