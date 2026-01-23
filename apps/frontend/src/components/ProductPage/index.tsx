import React from 'react';
import Image from 'next/image';

import type { LogoVariant, Product, Section } from '@/types';
/* -----------------------------
   Shared / utility types
------------------------------ */

export type ProductPageProps = {
  data: Product;
};

const LOGO_LABELS: Record<Exclude<LogoVariant, 'without_logo'>, string> = {
  digid: 'DigiD',
  eherkenning: 'eHerkenning',
  eidas: 'eIDAS',
};

export const ProductPage = ({ data }: ProductPageProps) => {
  if (!data) {
    return <div>No product found</div>;
  }

  const renderSection = (section: Section, index: number) => {
    if ('__typename' in section) {
      switch (section.__typename) {
        case 'ComponentComponentsUtrechtRichText':
          return (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          );

        case 'ComponentComponentsUtrechtLogoButton':
          return (
            <div key={index}>
              <a href={section.href}>
                {section.logo && section.logo !== 'without_logo' && <span>{LOGO_LABELS[section.logo]}</span>}
                <span>{section.label ?? section.textContent}</span>
              </a>
            </div>
          );

        case 'ComponentComponentsUtrechtSpotlight':
          return (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          );

        case 'ComponentComponentsUtrechtMultiColumnsButton':
          return (
            <div
              key={index}
              style={{
                columnCount: 2,
                inlineSize: '100%',
              }}
            >
              {section.column.map((col) => (
                <div key={col.id}>
                  <h3>{col.title}</h3>
                  {col.logoButton.map((btn, i) => (
                    <a key={i} href={btn.href}>
                      {btn.logo && btn.logo !== 'without_logo' && <span>{LOGO_LABELS[btn.logo]}</span>}
                      <span>{btn.label ?? btn.textContent}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          );

        case 'ComponentComponentsContactInformationPublic':
          return (
            <div key={index}>
              {section.contact_information_public.contentBlock.map((block, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: block.content,
                  }}
                />
              ))}
            </div>
          );

        case 'ComponentComponentsUtrechtImage':
          return (
            <div key={index}>
              <Image
                src={section.imageData.url}
                alt={section.imageData.alternativeText ?? ''}
                width={section.imageData.width}
                height={section.imageData.height}
              />
            </div>
          );

        default:
          return null;
      }
    }

    // Accordion (no __typename)
    if ('item' in section) {
      return (
        <div key={index}>
          {section.item.map((item) => (
            <div key={item.id}>
              <h2>{item.label}</h2>
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="utrecht-html">
      <h1>{data?.title}</h1>

      {/* Intro content */}
      <div
        dangerouslySetInnerHTML={{
          __html: data.content.content,
        }}
      />

      {/* Public contact info */}
      {data.contact_information_public?.contentBlock.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
      ))}

      {/* Sections */}
      {data.sections.map(renderSection)}
    </div>
  );
};
