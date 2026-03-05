import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Content from '@theme/CodeBlock/Content';
import Buttons from '@theme/CodeBlock/Buttons';
import type { Props } from '@theme/CodeBlock/Layout';

import styles from './styles.module.css';

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'terminal',
  console: 'terminal',
  go: 'go',
  javascript: 'javascript',
  js: 'javascript',
  json: 'json',
  python: 'python',
  py: 'python',
  sh: 'terminal',
  shell: 'terminal',
  ts: 'typescript',
  tsx: 'typescript',
  typescript: 'typescript',
  yaml: 'yaml',
  yml: 'yaml',
};

function hasTitle(title: ReactNode): boolean {
  if (typeof title === 'string') {
    return title.trim().length > 0;
  }

  return Boolean(title);
}

function formatLanguageTitle(language: string): string {
  const normalized = language.trim().toLowerCase();
  const label = LANGUAGE_LABELS[normalized] ?? normalized;

  if (!label) {
    return 'code';
  }

  return label;
}

export default function CodeBlockLayout({ className }: Props): ReactNode {
  const { metadata } = useCodeBlockContext();
  const title = hasTitle(metadata.title)
    ? metadata.title
    : formatLanguageTitle(metadata.language);

  return (
    <Container
      as="div"
      className={clsx(className, metadata.className, styles.terminalFrame)}
    >
      <div className={styles.chrome}>
        <div className={styles.titleRow}>
          <div className={styles.controls} aria-hidden="true">
            <span className={clsx(styles.controlDot, styles.controlClose)} />
            <span className={clsx(styles.controlDot, styles.controlMinimize)} />
            <span className={clsx(styles.controlDot, styles.controlExpand)} />
          </div>
          <span className={styles.title}>{title}</span>
        </div>
        <Buttons className={styles.actions} />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </Container>
  );
}
