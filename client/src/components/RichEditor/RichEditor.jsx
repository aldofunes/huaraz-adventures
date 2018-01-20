import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor, RichUtils } from 'draft-js'
import cx from 'classnames'
import { STYLE_MAP } from './constants'
import { getBlockStyle } from './utils'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'
import styles from './RichEditor.scss'

class RichEditor extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = editorState => this.props.onChange(editorState)

  handleTab = (event) => {
    const { editorState } = this.props
    const maxDepth = 4

    this.handleChange(RichUtils.onTab(event, editorState, maxDepth))
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      this.handleChange(newState)
      return true
    }
    return false
  }

  focus = () => this.editor.focus()

  toggleBlockType = (blockType) => {
    const { editorState } = this.props

    this.handleChange(RichUtils.toggleBlockType(
      editorState,
      blockType,
    ))
  }

  toggleInlineStyle = (inlineStyle) => {
    const { editorState } = this.props

    this.handleChange(RichUtils.toggleInlineStyle(
      editorState,
      inlineStyle,
    ))
  }

  render() {
    const { editorState } = this.props
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const contentState = editorState.getCurrentContent()

    return (
      <div className={styles.root}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div
          className={cx(styles.editor, {
            [styles.hidePlaceholder]: (
              !contentState.hasText() && contentState.getBlockMap().first().getType() !== 'unstyled'
            ),
          })}
          onClick={this.focus}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={STYLE_MAP}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onTab={this.handleTab}
            placeholder="Escribe algo interesante..."
            ref={(ref) => { this.editor = ref }}
            spellCheck
          />
        </div>
      </div>
    )
  }
}

export default RichEditor
