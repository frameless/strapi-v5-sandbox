import { useState } from 'react';
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Flex,
  Field,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system';
import {
  Bold,
  BulletList,
  Code,
  Italic,
  Image,
  Link,
  NumberList,
  Pencil,
  StrikeThrough,
  Underline,
  Quotes,
} from '@strapi/icons';
import type { Editor as EditorTypes } from '@tiptap/react';
import {
  AiFillYoutube,
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineLine,
} from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';
import { useIntl } from 'react-intl';

import defaultSettings from '../../../../../utils/defaults';
import { useLink } from '../../../hooks/useLink';
import { PriceListTypes } from '../../../types';
import { getTranslation } from '../../../utils';
import { localizeLanguagesNames } from '../../../utils/localizeLanguagesNames';
import { LinkDialog } from '../LinkDialog';
import { useContentLocale } from '../../../hooks/useContentLocale';

import { ToolbarWrapper } from './ToolbarWrapper';
import { TableControls } from './Table/TableControls';
import { PriceList } from './PriceList';
import { ToolbarItemHeadingWithID } from './HeadingWithID';
import { TextStyleControls } from './TextStyleControls';
import { LanguagesList } from './LanguagesList';
import { ToolbarButton, ToolbarIconButtonGroup } from './ToolbarButton';

type SetYouTubeVideoOptions = { src: string; width?: number; height?: number; start?: number; 'data-title': string };
type DetailsEventsTypes = 'details' | 'unsetDetails';

interface ToolbarProps {
  editor: EditorTypes;
  settings: typeof defaultSettings;
  toggleMediaLib: () => void;
  productPrice?: PriceListTypes;
  disabled?: boolean;
}

export const Toolbar = ({ editor, toggleMediaLib, settings, productPrice, disabled }: ToolbarProps) => {
  const {
    isVisibleLinkDialog,
    onCloseLinkDialog,
    linkInput,
    onLinkUrlInputChange,
    openLinkDialog,
    onInsertLink,
    error,
  } = useLink(editor);
  // YouTube
  const [isVisibleYouTubeDialog, setIsVisibleYouTubeDialog] = useState(false);
  const locale = useContentLocale();
  const [youTubeInput, setYouTubeInput] = useState('');
  const [youTubeHeightInput, setYouTubeHeightInput] = useState(settings.youtube.height);
  const [youTubeWidthInput, setYouTubeWidthInput] = useState(settings.youtube.width);
  const [youTubeTitleInput, setYouTubeTitleInput] = useState('');
  const { formatMessage } = useIntl();

  const onInsertYouTubeEmbed = () => {
    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: youTubeInput,
        width: youTubeWidthInput,
        height: youTubeHeightInput,
        'data-title': youTubeTitleInput,
      } as SetYouTubeVideoOptions)
      .run();
    setYouTubeInput('');
    setIsVisibleYouTubeDialog(false);
    setYouTubeTitleInput('');
  };
  // Base64 Image dialog
  const [base64MediaLibVisible, setBase64MediaLibVisible] = useState(false);
  const [base64Input, setBase64Input] = useState('');

  const openBase64Dialog = () => {
    if (editor.getAttributes('image').src && editor.getAttributes('image').src.includes(';base64'))
      setBase64Input(editor.getAttributes('image').src);
    setBase64MediaLibVisible(true);
  };

  const onDetailsChange = (editor: EditorTypes, type: DetailsEventsTypes) => {
    switch (type) {
      case 'details':
        editor.chain().focus().setDetails().run();
        break;
      case 'unsetDetails':
        if (editor.isActive('details')) {
          editor.chain().focus().unsetDetails().run();
        }
        break;
      default:
    }
  };

  const onInsertBase64Image = () => {
    editor.chain().focus().setImage({ src: base64Input }).run();
    setBase64Input('');
    setBase64MediaLibVisible(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <ToolbarWrapper>
      <ToolbarIconButtonGroup>
        <TextStyleControls editor={editor} disabled={disabled} />
      </ToolbarIconButtonGroup>
      {productPrice && productPrice?.price?.length > 0 && productPrice.title && (
        <ToolbarIconButtonGroup>
          <PriceList
            disabled={disabled}
            value={editor.isActive('priceWidget') ? editor.getAttributes('priceWidget')['data-strapi-idref'] : ''}
            onPriceChange={(price) => {
              if (price && editor) {
                editor.chain().focus().insertPriceWidget(price).run();
              }
            }}
            productPrice={productPrice}
          />
        </ToolbarIconButtonGroup>
      )}
      {settings.other.language.enabled && (
        <ToolbarIconButtonGroup>
          <LanguagesList
            disabled={disabled}
            editor={editor}
            languages={localizeLanguagesNames(settings.other.language.default, locale)}
            selectField={{
              placeholder: formatMessage({
                id: getTranslation('components.languagesList.placeholder'),
                defaultMessage: 'Select a language',
              }),
              removeLanguageOption: formatMessage({ id: getTranslation('components.languagesList.removeLanguage') }),
            }}
          />
        </ToolbarIconButtonGroup>
      )}
      <ToolbarIconButtonGroup>
        {settings.bold ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('bold')}
            label={formatMessage({
              id: getTranslation('components.toolbar.bold'),
              defaultMessage: 'Bold',
            })}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </ToolbarButton>
        ) : null}
        {settings.italic ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('italic')}
            label={formatMessage({
              id: getTranslation('components.toolbar.italic'),
              defaultMessage: 'Italic',
            })}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </ToolbarButton>
        ) : null}
        {settings.strikethrough ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('strike')}
            label={formatMessage({
              id: getTranslation('components.toolbar.strikethrough'),
              defaultMessage: 'Strikethrough',
            })}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikeThrough />
          </ToolbarButton>
        ) : null}
        {settings.underline ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('underline')}
            label={formatMessage({
              id: getTranslation('components.toolbar.underline'),
              defaultMessage: 'Underline',
            })}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline />
          </ToolbarButton>
        ) : null}
        {settings.highlight ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('highlight')}
            label={formatMessage({
              id: getTranslation('components.toolbar.highlight'),
              defaultMessage: 'Highlight',
            })}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Pencil />
          </ToolbarButton>
        ) : null}
      </ToolbarIconButtonGroup>

      <ToolbarIconButtonGroup>
        {settings.align.includes('left') ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive({ textAlign: 'left' })}
            label={formatMessage({
              id: getTranslation('components.toolbar.alignLeft'),
              defaultMessage: 'Align left',
            })}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <AiOutlineAlignLeft />
          </ToolbarButton>
        ) : null}
        {settings.align.includes('center') ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive({ textAlign: 'center' })}
            label={formatMessage({
              id: getTranslation('components.toolbar.alignCenter'),
              defaultMessage: 'Align center',
            })}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <AiOutlineAlignCenter />
          </ToolbarButton>
        ) : null}
        {settings.align.includes('right') ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive({ textAlign: 'right' })}
            label={formatMessage({
              id: getTranslation('components.toolbar.alignRight'),
              defaultMessage: 'Align right',
            })}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <AiOutlineAlignRight />
          </ToolbarButton>
        ) : null}
      </ToolbarIconButtonGroup>

      <ToolbarIconButtonGroup>
        {settings.lists.includes('ul') ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('bulletList')}
            label={formatMessage({
              id: getTranslation('components.toolbar.bulletList'),
              defaultMessage: 'Bullet List',
            })}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <BulletList />
          </ToolbarButton>
        ) : null}
        {settings.lists.includes('ol') ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('orderedList')}
            label={formatMessage({
              id: getTranslation('components.toolbar.orderedList'),
              defaultMessage: 'Ordered List',
            })}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <NumberList />
          </ToolbarButton>
        ) : null}
      </ToolbarIconButtonGroup>
      <ToolbarIconButtonGroup>
        {settings.code ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('codeBlock')}
            label={formatMessage({
              id: getTranslation('components.toolbar.code'),
              defaultMessage: 'Code',
            })}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code />
          </ToolbarButton>
        ) : null}
        {settings.blockquote ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('blockquote')}
            label={formatMessage({
              id: getTranslation('components.toolbar.blockquote'),
              defaultMessage: 'Block Quote',
            })}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quotes />
          </ToolbarButton>
        ) : null}
        <LinkDialog
          onDialogClose={onCloseLinkDialog}
          isDialogOpen={isVisibleLinkDialog}
          dialogTitle={formatMessage({
            id: getTranslation('components.toolbar.linkDialog.title'),
            defaultMessage: 'Insert a URL link',
          })}
          textInputProps={{
            label: formatMessage({
              id: getTranslation('components.toolbar.linkDialog.textInput.label'),
              defaultMessage: 'Insert a URL link',
            }),
            placeholder: formatMessage({
              id: getTranslation('components.toolbar.linkDialog.textInput.placeholder'),
              defaultMessage: 'Write or paste the URL here',
            }),
            name: 'url',
            onChange: (e) => onLinkUrlInputChange(e.target.value),
            value: linkInput,
            ariaLabel: 'URL',
            hint: formatMessage({
              id: getTranslation('components.toolbar.linkDialog.textInput.hint'),
              defaultMessage:
                "URLs should start with 'https://' or 'http://', for example: https://www.example.com or https://example.com",
            }),
            error: error
              ? formatMessage({
                  id: getTranslation('components.toolbar.linkDialog.textInput.error'),
                  defaultMessage:
                    "Invalid URL. Ensure it starts with 'https://' or 'http://', for example: https://www.example.com or https://example.com",
                })
              : undefined,
          }}
          startActionButtonProps={{
            onClick: onCloseLinkDialog,
            text: formatMessage({
              id: getTranslation('components.toolbar.linkDialog.startActionButtonText'),
              defaultMessage: 'Cancel',
            }),
          }}
          endActionButtonProps={{
            onClick: onInsertLink,
            text: formatMessage({
              id: getTranslation('components.toolbar.linkDialog.endActionButtonText'),
              defaultMessage: 'Insert URL',
            }),
            disabled: Boolean(error),
          }}
        />
        {settings.links.enabled ? (
          <ToolbarButton
            disabled={disabled}
            onClick={openLinkDialog}
            active={editor.isActive('link')}
            editor={editor}
            label={formatMessage({
              id: getTranslation('components.toolbar.link'),
              defaultMessage: 'Link',
            })}
          >
            <Link />
          </ToolbarButton>
        ) : null}

        {settings.image.enabled ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('image') && !editor.getAttributes('image').src.includes(';base64')}
            label={
              editor.isActive('image')
                ? formatMessage({
                    id: getTranslation('components.toolbar.image.change'),
                    defaultMessage: 'Change image',
                  })
                : formatMessage({
                    id: getTranslation('components.toolbar.image.insert'),
                    defaultMessage: 'Insert image',
                  })
            }
            onClick={toggleMediaLib}
          >
            <Image />
          </ToolbarButton>
        ) : null}

        <Modal.Root open={base64MediaLibVisible} onOpenChange={(open) => !open && setBase64MediaLibVisible(false)}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>
                {formatMessage({
                  id: getTranslation('components.toolbar.base64Dialog.title'),
                  defaultMessage: 'Insert base64 image',
                })}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Flex
                gap={{
                  initial: 2,
                }}
              >
                <Field.Root id="url">
                  <Field.Label>
                    {formatMessage({
                      id: getTranslation('components.toolbar.base64Dialog.textarea.label'),
                      defaultMessage: 'Base64 image',
                    })}
                  </Field.Label>
                  <Textarea
                    placeholder={formatMessage({
                      id: getTranslation('components.toolbar.base64Dialog.textarea.placeholder'),
                      defaultMessage: 'Enter Base64 content',
                    })}
                    name="url"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setBase64Input(event.target.value)}
                    value={base64Input}
                    style={{ maxHeight: '200px' }}
                    aria-label={formatMessage({
                      id: getTranslation('components.toolbar.base64Dialog.textarea.AriaLabel'),
                      defaultMessage: 'Base64 image',
                    })}
                  />
                </Field.Root>
                <Field.Root name="preview">
                  <Flex
                    gap={{
                      initial: 1,
                    }}
                  >
                    <Field.Label>
                      {formatMessage({ id: getTranslation('common.action.preview'), defaultMessage: 'Preview' })}
                    </Field.Label>
                    {base64Input.length ? <img style={{ maxWidth: '100%' }} src={base64Input} alt="" /> : null}
                  </Flex>
                </Field.Root>
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Flex gap={2}>
                <Button
                  onClick={() => {
                    setBase64Input('');
                    setBase64MediaLibVisible(false);
                  }}
                  variant="tertiary"
                >
                  {formatMessage({
                    id: getTranslation('common.action.cancel'),
                    defaultMessage: 'Cancel',
                  })}
                </Button>
                <Button disabled={base64Input.length === 0} onClick={() => onInsertBase64Image()} variant="default">
                  {formatMessage({
                    id: getTranslation('common.action.insert'),
                    defaultMessage: 'Insert',
                  })}
                </Button>
              </Flex>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>

        {settings.image.allowBase64 ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('image') && editor.getAttributes('image').src.includes(';base64')}
            label={
              editor.isActive('image')
                ? formatMessage({
                    id: getTranslation('components.toolbar.base64Content.change'),
                    defaultMessage: 'Change base64 content',
                  })
                : formatMessage({
                    id: getTranslation('components.toolbar.base64Content.insert'),
                    defaultMessage: 'Insert base64 content',
                  })
            }
            onClick={openBase64Dialog}
          >
            <FaImage />
          </ToolbarButton>
        ) : null}
        {settings.table ? <TableControls disabled={disabled} editor={editor} /> : null}
        {settings.youtube.enabled ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('youtube')}
            label={formatMessage({
              id: getTranslation('components.toolbar.youtube'),
              defaultMessage: 'Insert YouTube video',
            })}
            onClick={() => {
              if (editor.getAttributes('youtube').src) {
                setYouTubeInput(editor.getAttributes('youtube').src);
              }
              if (editor.getAttributes('youtube')['aria-label']) {
                setYouTubeTitleInput(editor.getAttributes('youtube')['aria-label']);
              }
              setIsVisibleYouTubeDialog(true);
            }}
          >
            <AiFillYoutube />
          </ToolbarButton>
        ) : null}
        {settings.horizontal ? (
          <ToolbarButton
            disabled={disabled}
            active={editor.isActive('horizontalRule')}
            label={formatMessage({
              id: getTranslation('components.toolbar.horizontalRule'),
              defaultMessage: 'Insert Horizontal Rule',
            })}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <AiOutlineLine />
          </ToolbarButton>
        ) : null}
        <Modal.Root open={isVisibleYouTubeDialog} onOpenChange={(open) => !open && setIsVisibleYouTubeDialog(false)}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>
                {formatMessage({
                  id: getTranslation('components.toolbar.youtubeDialog.label'),
                  defaultMessage: 'Insert YouTube Video',
                })}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Flex
                gap={{
                  initial: 2,
                }}
              >
                <Field.Root id="url">
                  <Field.Label>
                    {formatMessage({
                      id: getTranslation('components.toolbar.youtubeDialog.urlInput.label'),
                      defaultMessage: 'Insert YouTube Video',
                    })}
                  </Field.Label>
                  <TextInput
                    placeholder={formatMessage({
                      id: getTranslation('components.toolbar.youtubeDialog.urlInput.placeholder'),
                      defaultMessage: 'Enter YouTube URL',
                    })}
                    name="url"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setYouTubeInput(event.target.value)}
                    value={youTubeInput}
                    aria-label={formatMessage({
                      id: getTranslation('components.toolbar.youtubeDialog.urlInput.AriaLabel'),
                      defaultMessage: 'YouTube URL',
                    })}
                  />
                </Field.Root>
                <Field.Root id="title">
                  <Field.Label>
                    {formatMessage({
                      id: getTranslation('components.toolbar.youtubeDialog.titleInput.label'),
                      defaultMessage: 'YouTube video Title',
                    })}
                  </Field.Label>
                  <TextInput
                    placeholder={
                      formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.titleInput.placeholder'),
                        defaultMessage: 'Enter YouTube video Title',
                      }) as string
                    }
                    name="title"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setYouTubeTitleInput(event.target.value);
                    }}
                    value={youTubeTitleInput}
                    aria-label={
                      formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.titleInput.AriaLabel'),
                        defaultMessage: 'YouTube video Title',
                      }) as string
                    }
                  />
                </Field.Root>
                <Flex
                  gap={{
                    initial: 2,
                  }}
                >
                  <Field.Root id="url">
                    <Field.Label>
                      {formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.widthInput.label'),
                        defaultMessage: 'YouTube video width',
                      })}
                    </Field.Label>
                    <TextInput
                      type="number"
                      placeholder={formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.widthInput.placeholder'),
                        defaultMessage: 'width of the embed',
                      })}
                      name="url"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setYouTubeWidthInput(Number(event.target.value))
                      }
                      value={youTubeWidthInput}
                      aria-label={formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.widthInput.AriaLabel'),
                        defaultMessage: 'YouTube video width',
                      })}
                    />
                  </Field.Root>
                  <Field.Root id="url">
                    <Field.Label>
                      {formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.heightInput.label'),
                        defaultMessage: 'YouTube video height',
                      })}
                    </Field.Label>
                    <TextInput
                      type="number"
                      placeholder={formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.heightInput.placeholder'),
                        defaultMessage: 'height of the embed',
                      })}
                      name="url"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setYouTubeHeightInput(Number(event.target.value))
                      }
                      value={youTubeHeightInput}
                      aria-label={formatMessage({
                        id: getTranslation('components.toolbar.youtubeDialog.heightInput.AriaLabel'),
                        defaultMessage: 'YouTube video height',
                      })}
                    />
                  </Field.Root>
                </Flex>
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Flex gap={2}>
                <Button
                  onClick={() => {
                    setYouTubeInput('');
                    setIsVisibleYouTubeDialog(false);
                  }}
                  variant="tertiary"
                >
                  {formatMessage({
                    id: getTranslation('common.action.cancel'),
                    defaultMessage: 'Cancel',
                  })}
                </Button>
                <Button
                  disabled={youTubeInput.length === 0 || youTubeTitleInput.length === 0}
                  onClick={() => onInsertYouTubeEmbed()}
                  variant="default"
                >
                  {formatMessage({
                    id: getTranslation('common.action.insert'),
                    defaultMessage: 'Insert',
                  })}
                </Button>
              </Flex>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      </ToolbarIconButtonGroup>
      <ToolbarItemHeadingWithID disabled={disabled} editor={editor} />
      <ToolbarIconButtonGroup>
        <SingleSelect
          disabled={disabled}
          id="select-details"
          size="S"
          placeholder={formatMessage({
            id: getTranslation('components.toolbar.details.placeholder'),
            defaultMessage: 'Accordion',
          })}
          onChange={(value) => onDetailsChange(editor, value as DetailsEventsTypes)}
        >
          <SingleSelectOption value="details">
            {formatMessage({
              id: getTranslation('components.toolbar.details.add'),
              defaultMessage: 'Add Accordion',
            })}
          </SingleSelectOption>
          <SingleSelectOption value="unsetDetails" disabled={!editor.isActive('details')}>
            {formatMessage({
              id: getTranslation('components.toolbar.details.remove'),
              defaultMessage: 'Remove Accordion',
            })}
          </SingleSelectOption>
        </SingleSelect>
      </ToolbarIconButtonGroup>
    </ToolbarWrapper>
  );
};
