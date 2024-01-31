import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRender = ({ response }) => {
  return <ReactMarkdown>{response}</ReactMarkdown>;
};

export default MarkdownRender;