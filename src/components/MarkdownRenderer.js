import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper: Convert lines with 5 or more equal signs to <hr />
function convertEqualsToHr(markdown) {
  return markdown
    .split('\n')
    .map((line) => (/^[=]{3,}$/.test(line.trim()) ? '--------------' : line))
    .join('\n');
}

// Helper: Sanitize table markdown
function sanitizeTableMarkdown(markdown) {
  return markdown
    .split('\n')
    .map(line => {
      // Remove any problematic table formatting
      if (line.includes('|')) {
        return line.replace(/\|\s*\|\s*/g, '| ').trim();
      }
      return line;
    })
    .join('\n');
}

// Styled Setext H1
const SetextH1 = ({ node, ...props }) => (
  <Typography
    variant="h3"
    component="h1"
    sx={{
      mt: 4,
      mb: 2,
      fontWeight: 700,
      fontSize: '1.75rem',
      borderBottom: '3px solid #8b5cf6',
      paddingBottom: '0.5rem',
      color: '#ECECF1',
    }}
    {...props}
  />
);

// Component overrides for markdown
const components = {
  h1: ({ node, children, ...props }) => {
    if (children && typeof children[0] === 'string') {
      const headerText = children[0].split('\n')[0];
      return <SetextH1 {...props}>{headerText}</SetextH1>;
    }
    return (
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 3,
          mb: 1.5,
          fontWeight: 600,
          fontSize: '1.5rem',
          '&:first-of-type': { mt: 0 },
          color: '#ECECF1',
        }}
        {...props}
      />
    );
  },
  h2: ({ node, ...props }) => (
    <Typography
      variant="h5"
      component="h2"
      sx={{
        mt: 2.5,
        mb: 1.5,
        fontWeight: 600,
        fontSize: '1.25rem',
        '&:first-of-type': { mt: 0 },
        color: '#ECECF1',
      }}
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <Typography
      variant="h6"
      component="h3"
      sx={{
        mt: 2,
        mb: 1,
        fontWeight: 600,
        fontSize: '1.1rem',
        color: '#ECECF1',
      }}
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        mb: 1.5,
        whiteSpace: 'pre-wrap',
        '&:last-child': { mb: 0 },
        color: '#ECECF1',
      }}
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <Box component="ul" sx={{ pl: 3, mb: 1.5, color: '#ECECF1', listStyleType: 'disc' }} {...props} />
  ),
  ol: ({ node, ...props }) => (
    <Box component="ol" sx={{ pl: 3, mb: 1.5, color: '#ECECF1' }} {...props} />
  ),
  li: ({ node, ...props }) => <Typography component="li" sx={{ mb: 0.5, color: '#ECECF1' }} {...props} />,
  strong: ({ node, ...props }) => (
    <Box component="strong" sx={{ fontWeight: 700, color: '#FFFFFF' }} {...props} />
  ),
  em: ({ node, ...props }) => (
    <Box component="em" sx={{ fontStyle: 'italic', color: '#FFFFFF' }} {...props} />
  ),
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <Box
        component="code"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#f8f8f2',
          px: '0.4em',
          py: '0.2em',
          borderRadius: '3px',
          fontFamily: 'monospace',
          fontSize: '0.875em',
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  blockquote: ({ node, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: '4px solid #10a37f',
        pl: 2,
        py: 0.5,
        my: 1.5,
        color: '#ECECF1',
        backgroundColor: 'rgba(16, 163, 127, 0.1)',
        '& > p': { mb: 0 },
      }}
      {...props}
    />
  ),
  a: ({ node, ...props }) => (
    <Box
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: '#10a37f',
        textDecoration: 'underline',
        '&:hover': {
          color: '#0D8C6D',
        },
      }}
      {...props}
    />
  ),
  hr: ({ node, ...props }) => (
    <Divider
      sx={{
        my: 4,
        borderBottomWidth: '4px',
        borderColor: '#fff',
        borderStyle: 'solid',
        opacity: 0.8,
      }}
      {...props}
    />
  ),
  table: ({ node, ...props }) => (
    <Box component="div" sx={{ overflowX: 'auto', my: 1.5 }}>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          color: '#ECECF1',
          'th, td': {
            border: '1px solid rgba(255,255,255,0.2)',
            p: 1,
            textAlign: 'left',
          },
          th: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            fontWeight: 600,
          },
        }}
        {...props}
      />
    </Box>
  ),
  thead: ({ node, ...props }) => <Box component="thead" {...props} />,
  tbody: ({ node, ...props }) => <Box component="tbody" {...props} />,
  tr: ({ node, ...props }) => <Box component="tr" {...props} />,
  th: ({ node, ...props }) => <Box component="th" {...props} />,
  td: ({ node, ...props }) => <Box component="td" {...props} />,
};

// Error boundary component
class MarkdownErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Markdown rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography color="error" sx={{ whiteSpace: 'pre-wrap' }}>
          {this.props.content}
        </Typography>
      );
    }
    return this.props.children;
  }
}

const MarkdownRenderer = ({ content }) => {
  if (typeof content !== 'string') {
    console.error('MarkdownRenderer received non-string content:', content);
    return <Typography color="error">Error: Invalid content type for rendering.</Typography>;
  }

  const processedContent = sanitizeTableMarkdown(convertEqualsToHr(content));

  return (
    <MarkdownErrorBoundary content={content}>
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={components}
        skipHtml={false}
      >
        {processedContent}
      </ReactMarkdown>
    </MarkdownErrorBoundary>
  );
};

export default MarkdownRenderer;
