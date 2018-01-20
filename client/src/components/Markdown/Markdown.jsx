import React from 'react'
import PropTypes from 'prop-types'
import Remarkable from 'remarkable'
import styles from './Markdown.scss'

const md = new Remarkable({
  html:         true,         // Enable HTML tags in source
  xhtmlOut:     true,         // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed
  highlight: function (/*str, lang*/) { return '' }
})

const Markdown = ({ children, className }) => (
  <div
    className={`${styles.markdown} ${className}`}
    dangerouslySetInnerHTML={{ __html: md.render(children) }}
  />
)

Markdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Markdown.defaultProps = {
  className: '',
}

export default Markdown
