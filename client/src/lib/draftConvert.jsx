import React from 'react'
import { convertToHTML } from 'draft-convert'
import { convertFromRaw } from 'draft-js'

export const Block = {
  UNSTYLED: 'unstyled',
  PARAGRAPH: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption',
  TODO: 'todo',
  IMAGE: 'atomic:image',
  BREAK: 'atomic:break',
}

export const Inline = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
  HIGHLIGHT: 'HIGHLIGHT',
}

export const Entity = {
  LINK: 'LINK',
}

export const styleToHTML = (style) => {
  switch (style) {
    case Inline.ITALIC:
      return <em className={`md-inline-${style.toLowerCase()}`} />
    case Inline.BOLD:
      return <strong className={`md-inline-${style.toLowerCase()}`} />
    case Inline.STRIKETHROUGH:
      return <strike className={`md-inline-${style.toLowerCase()}`} />
    case Inline.UNDERLINE:
      return <u className={`md-inline-${style.toLowerCase()}`} />
    case Inline.HIGHLIGHT:
      return <span className={`md-inline-${style.toLowerCase()}`} />
    case Inline.CODE:
      return <code className={`md-inline-${style.toLowerCase()}`} />
    default:
      return null
  }
}

export const blockToHTML = (block) => {
  const blockType = block.type
  switch (blockType) {
    case Block.H1:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h1 className={`md-block-${blockType.toLowerCase()}`} />
    case Block.H2:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h2 className={`md-block-${blockType.toLowerCase()}`} />
    case Block.H3:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h3 className={`md-block-${blockType.toLowerCase()}`} />
    case Block.H4:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h4 className={`md-block-${blockType.toLowerCase()}`} />
    case Block.H5:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h5 className={`md-block-${blockType.toLowerCase()}`} />
    case Block.H6:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h6 className={`md-block-${blockType.toLowerCase()}`} />
    case Block.BLOCKQUOTE_CAPTION:
    case Block.CAPTION:
      return {
        start: `<p class="md-block-${blockType.toLowerCase()}"><caption>`,
        end: '</caption></p>',
      }
    case Block.IMAGE: {
      const imgData = block.data
      const text = block.text
      const extraClass = (text.length > 0 ? ' md-block-image-has-caption' : '')
      return {
        start: `<figure class="md-block-image${extraClass}"><img src="${imgData.src}" alt="${block.text}" /><figcaption className="md-block-image-caption">`,
        end: '</figcaption></figure>',
      }
    }
    case Block.ATOMIC:
      return {
        start: `<figure className="md-block-${blockType.toLowerCase()}">`,
        end: '</figure>',
      }
    case Block.TODO: {
      const checked = block.data.checked || false
      let inp = ''
      let containerClass = ''
      if (checked) {
        inp = '<input type=checkbox disabled checked="checked" />'
        containerClass = 'md-block-todo-checked'
      } else {
        inp = '<input type=checkbox disabled />'
        containerClass = 'md-block-todo-unchecked'
      }
      return {
        start: `<div class="md-block-${blockType.toLowerCase()} ${containerClass}">${inp}<p>`,
        end: '</p></div>',
      }
    }
    case Block.BREAK:
      return <hr className={`md-block-${blockType.toLowerCase()}`} />
    case Block.BLOCKQUOTE:
      return <blockquote className={`md-block-${blockType.toLowerCase()}`} />
    case Block.OL:
      return {
        element: <li />,
        nest: <ol className={`md-block-${blockType.toLowerCase()}`} />,
      }
    case Block.UL:
      return {
        element: <li />,
        nest: <ul className={`md-block-${blockType.toLowerCase()}`} />,
      }
    case Block.UNSTYLED:
      if (block.text.length < 1) {
        return <p className={`md-block-${blockType.toLowerCase()}`}><br /></p>
      }
      return <p className={`md-block-${blockType.toLowerCase()}`} />
    default:
      return null
  }
}

export const entityToHTML = (entity, originalText) => {
  if (entity.type === Entity.LINK) {
    return (
      <a
        className="md-inline-link"
        href={entity.data.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {originalText}
      </a>
    )
  }
  return originalText
}

export default (content, blocks) => {
  const raw = JSON.parse(content)
  raw.blocks.splice(blocks !== undefined ? blocks : raw.blocks.length, raw.blocks.length)

  return convertToHTML({ styleToHTML, blockToHTML, entityToHTML })(convertFromRaw(raw))
}
