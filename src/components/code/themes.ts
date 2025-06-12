import { PrismTheme } from 'prism-react-renderer';

export const lightTheme: PrismTheme = {
  plain: {
    color: '#383a42',
    backgroundColor: '#f8f9fa'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#a0a1a7',
        fontStyle: 'italic'
      }
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#50a14f'
      }
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#383a42'
      }
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
      style: {
        color: '#c18401'
      }
    },
    {
      types: ['atrule', 'keyword', 'attr-name'],
      style: {
        color: '#a626a4'
      }
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#e45649'
      }
    },
    {
      types: ['function-variable'],
      style: {
        color: '#0184bc'
      }
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#0184bc'
      }
    }
  ]
};

export const darkTheme: PrismTheme = {
  plain: {
    color: '#f8f8f2',
    backgroundColor: '#282a36'
  },
  styles: [
    {
      types: ['prolog', 'constant', 'builtin'],
      style: {
        color: '#ff79c6'
      }
    },
    {
      types: ['inserted', 'function'],
      style: {
        color: '#50fa7b'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: '#ff5555'
      }
    },
    {
      types: ['changed'],
      style: {
        color: '#ffb86c'
      }
    },
    {
      types: ['punctuation', 'symbol'],
      style: {
        color: '#f8f8f2'
      }
    },
    {
      types: ['string', 'char', 'tag', 'selector'],
      style: {
        color: '#8be9fd'
      }
    },
    {
      types: ['keyword', 'variable'],
      style: {
        color: '#ff79c6',
        fontStyle: 'italic'
      }
    },
    {
      types: ['comment'],
      style: {
        color: '#6272a4',
        fontStyle: 'italic'
      }
    },
    {
      types: ['attr-name'],
      style: {
        color: '#50fa7b',
        fontStyle: 'italic'
      }
    }
  ]
}; 