'use client';

import * as runtime from 'react/jsx-runtime';
import { useMemo } from 'react';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';
import { MdxImage } from './MdxImage';
import { MdxLink } from './MdxLink';

type MDXComponents = Record<string, React.ComponentType<Record<string, unknown>>>;

const defaultComponents: MDXComponents = {
  pre: CodeBlock as unknown as React.ComponentType<Record<string, unknown>>,
  blockquote: Callout as unknown as React.ComponentType<Record<string, unknown>>,
  img: MdxImage as unknown as React.ComponentType<Record<string, unknown>>,
  a: MdxLink as unknown as React.ComponentType<Record<string, unknown>>,
};

function useMDXComponent(code: string) {
  return useMemo(() => {
    const fn = new Function(code);
    return fn(runtime).default;
  }, [code]);
}

interface MdxRendererProps {
  code: string;
  components?: MDXComponents;
}

export function MdxRenderer({ code, components = {} }: Readonly<MdxRendererProps>) {
  const Component = useMDXComponent(code);
  const mergedComponents = { ...defaultComponents, ...components };
  return <Component components={mergedComponents} />;
}
