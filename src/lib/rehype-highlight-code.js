/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-var-requires */
// Thanks to https://ped.ro/blog/code-blocks-but-better

import {toString} from 'hast-util-to-string';
import rangeParser from 'parse-numeric-range';
import {refractor} from 'refractor'
import { visit } from 'unist-util-visit';

import highlightLine from './rehype-highlight-line'
import highlightWord from './rehype-highlight-word'

export default (_options = {}) => {
  return tree => {
    visit(tree, 'element', visitor)
  }

  function visitor(node, _index, parent) {
    if (
      !parent ||
      parent.tagName !== 'pre' ||
      node.tagName !== 'code' ||
      !node.properties.className
    ) {
      return
    }

    const [_, lang] = node.properties.className[0].split('-');
    const codeString = toString(node)
    let result = refractor.highlight(codeString, lang)

    const linesToHighlight = rangeParser(node.properties.line || '0')
    result = highlightLine(result, linesToHighlight)

    result = highlightWord(result)

    node.children = result
  }
}
