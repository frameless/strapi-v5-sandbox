import { Box } from '@strapi/design-system';
import styled from 'styled-components';

export const EditorBox = styled(Box)`

& .utrecht-rich-text-editor-canvas {
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.neutral400};
  max-block-size: var(--utrecht-rich-text-editor-min-block-size, 60vh);
  min-block-size: var(--utrecht-rich-text-editor-min-block-size, 200px);
  overflow: auto;
  padding-block-end: var(--utrecht-rich-text-editor-canvas-padding, var(--utrecht-space-block-sm));
  padding-block-start: var(--utrecht-rich-text-editor-canvas-padding, var(--utrecht-space-block-sm));
  padding-inline-end: var(--utrecht-rich-text-editor-canvas-padding, var(--utrecht-space-inline-sm));
  padding-inline-start: var(--utrecht-rich-text-editor-canvas-padding, var(--utrecht-space-inline-sm));
  resize: block;
  background-color: ${({ theme }) => theme.colors.neutral0};
}

& .utrecht-table-widget {
  --utrecht-table-widget-hover-outline-color: var(--utrecht-color-blue-35);
  --utrecht-table-widget-hover-outline-width: 1px;
  --utrecht-table-widget-button-size: 24px;
  --utrecht-button-padding-block-start: 0;
  --utrecht-button-padding-block-end: 0;
  --utrecht-button-padding-inline-start: 0;
  --utrecht-button-padding-inline-end: 0;
  --utrecht-button-border-radius: 50%;
  --utrecht-button-min-inline-size: var(--utrecht-table-widget-button-size);
  --utrecht-button-min-block-size: var(--utrecht-table-widget-button-size);

  position: relative;
  width: fit-content;

  & .utrecht-table-widget__button--top {
    left: 5px;
    top: -22px;
  }
  & .utrecht-table-widget__button--down {
    bottom: -22px;
    right: 5px;
  }
  & .utrecht-table-widget__button {
    display: var(--_utrecht-table-button-display, none) !important;
    position: absolute;
  }
  &:hover {
    outline-color: var(--utrecht-table-widget-hover-outline-color);
    outline-style: solid;
    outline-width: var(--utrecht-table-widget-hover-outline-width);
    & .utrecht-table-widget__button {
      --_utrecht-table-button-display: inline-flex;
    }
  }
}

.utrecht-node-viewer--captured-table:has(.utrecht-node-viewer) {
  & .utrecht-node-viewer {
    --utrecht-table-widget-hover-outline-color: transparent;

    & .utrecht-table-widget__button {
      --_utrecht-table-button-display: none;
    }
    & :hover {
      --utrecht-table-widget-hover-outline-color: transparent;
    }
  }
}

  min-inline-block: 350px;
  .tippy-box {
    background: transparent;
  }
  
  .ProseMirror[contenteditable="false"] {
    background-color: ${({ theme }) => theme.colors.neutral150};
    cursor: not-allowed;
  }
  
  .ProseMirror .ProseMirror-selectednode {
    border: none !important;
  }
  .ProseMirror {
    outline: none;

    figure {
      inline-size: fit-content;
    }

    figcaption {
      border: 2px dashed #0d0d0d20;
      padding-inline: 1rem;
      padding-block: 0.5rem;
      break-inside: avoid;
      color: var(--utrecht-table-caption-color);
      font-family: var(--utrecht-table-caption-font-family);
      font-size: var(--utrecht-table-caption-font-size);
      font-weight: var(--utrecht-table-caption-font-weight);
      line-height: var(--utrecht-table-caption-line-height);
      margin-block-end: var(--utrecht-table-caption-margin-block-end);
      page-break-after: avoid;
      text-align: var(--utrecht-table-caption-text-align, center);
    }

    p[data-lead='true'] {
      color: var(
        --utrecht-paragraph-lead-color,
        var(--utrecht-paragraph-color, var(--utrecht-document-color, inherit))
      );
      font-size: var(--utrecht-paragraph-lead-font-size, var(--utrecht-paragraph-font-size, inherit));
      font-weight: var(--utrecht-paragraph-lead-font-weight, var(--utrecht-paragraph-font-weight, inherit));
      line-height: var(--utrecht-paragraph-lead-line-height, var(--utrecht-paragraph-line-height, inherit));
    }

    .ProseMirror-selectednode {
      border: 5px solid ${({ theme }) => theme.colors.neutral800};
      box-sizing: border-box;
    }

    ol {
      list-style-type: decimal;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    table {
      inline-size: fit-content;
    }

    table * p {
      --utrecht-space-around: 0;
    }

    td,
    th {
      --utrecht-table-header-cell-font-weight: var(--utrecht-table-header-font-weight);
      border: 1px solid #ced4da;
      min-inline-size: 3em;
    }

    th {
      border-block-end-color: var(--utrecht-table-header-border-block-end-color, transparent);
      border-block-end-style: solid;
      border-block-end-width: var(--utrecht-table-header-border-block-end-width, 0);
    }
  }

.tiptap .utrecht-details {
  align-items: stretch;
  border-block-color: var(--utrecht-details-border-block-color, var(--utrecht-color-grey-90));
  border-block-style: solid;
  border-block-width: var(--utrecht-details-border-block-width, 2px);
  display: flex;
  margin-block: var(--utrecht-details-margin-block, 12px);
}

/* Summary text */
.tiptap .utrecht-details summary {
  color: var(--utrecht-details-summary-color, var(--utrecht-color-blue-40));
  cursor: pointer;
  font-size: var(--utrecht-details-summary-font-size, 18px);
  outline: none;
  padding-block: var(--utrecht-details-summary-padding-block, 16px);
  padding-inline-end: var(--utrecht-details-summary-padding-inline-end, 16px);
  user-select: none;
}

/* Toggle button for collapse/expand */
.tiptap .utrecht-details > button {
  --utrecht-details-icon-color: var(--utrecht-color-blue-40);
  --utrecht-button-hover-color: var(--utrecht-details-icon-color);

  align-items: center;
  background: transparent;
  border: none;
  color: var(--utrecht-details-icon-color);
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-block: 0;
  min-block-size: var(--utrecht-details-icon-min-block-size, 58px);
  padding-block: var(--utrecht-details-summary-padding-block, 16px);
  padding-inline-end: 0;
  padding-inline-start: var(--utrecht-details-summary-padding-inline-start, 16px);
}

/* Toggle button icon */
.tiptap .utrecht-details > button::before {
  background-color: currentColor;
  content: "";
  display: inline-block;
  height: 1em;
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgOGMtLjI2IDAtLjUxLS4xLS43MS0uMjlMNyAyLjQxbC01LjI5IDUuM0EuOTk2Ljk5NiAwIDEgMSAuMyA2LjNMNi4yOS4yOWEuOTk2Ljk5NiAwIDAgMSAxLjQxIDBsNiA2YS45OTYuOTk2IDAgMCAxLS43MSAxLjdaIi8+PC9zdmc+");
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  transform: rotate(180deg);
  transition-duration: var(--utrecht-details-icon-transition-duration, 0.2s);
  transition-property: transform;
  transition-timing-function: ease;
  width: 1em;
}

/* Rotate arrow when details is open */
.tiptap .utrecht-details.is-open > button::before {
  transform: rotate(0deg);
}

/* Content wrapper */
.tiptap .utrecht-details > div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

// placeholder styling
.tiptap .is-empty::before {
  color: var(--utrecht-details-placeholder, var(--utrecht-color-blue-40));
  content: attr(data-placeholder);
  float: left;
  font-size: 16px;
  height: 0;
  pointer-events: none;
}

// Content area
.tiptap .utrecht-details div[data-type="detailsContent"] {
  padding-block-end: var(--utrecht-details-content-padding-block-end, 8px);
  padding-block-start: var(--utrecht-details-content-padding-block-start, 8px);
}

// reduce motion preference
@media (prefers-reduced-motion: reduce) {
  .tiptap .utrecht-details > button::before {
    --utrecht-details-icon-transition-duration: 0s;
  }
}

`;
