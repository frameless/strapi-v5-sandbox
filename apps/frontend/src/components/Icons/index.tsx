'use client';
import dynamic from 'next/dynamic';
export const UtrechtIconChevronRight = dynamic(
  async () => {
    const Component = (await import('@utrecht/web-component-library-react')).UtrechtIconChevronRight;
    return { default: Component };
  },
  {
    ssr: false,
    // loading: () => <DecisionTreeFormSkeleton />,
  },
) as React.ComponentType<React.HTMLAttributes<HTMLElement>>;
