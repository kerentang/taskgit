// input is array,split by /n;
function block (input) {
  let blockPatterns = [
        { pattern: /^#\s+(.*)/, name: 'h1' },
        { pattern: /^#{2}\s+(.*)/, name: 'h2' },
        { pattern: /^#{3}\s+(.*)/, name: 'h3' },
        { pattern: /^#{4}\s+(.*)/, name: 'h4' },
        { pattern: /^#{5}\s+(.*)/, name: 'h5' },
        { pattern: /^={6,}\s*$/, name: 'header' },
        { pattern: /^-{6,}\s*$/, name: 'subheader' },
        { pattern: /^>\s+(.*)/, name: 'blockquote' },
        { pattern: /^\s*$/, name: 'blank' },
        { pattern: /^[-*]\s+(.*)/, name: 'ul' },
        { pattern: /^[0-9]+\.\s+(.*)/, name: 'ol' },
        { pattern: /^-{3,5}\s*$/, name: 'hr' },
        { pattern: /^`{3,}\s*$/, name: 'codeblockopen' },
        { pattern: /(.+)/, name: 'para' }
  ]
  // 使用两个数组分别存储左边的输入内容，将正则表达式匹配到的内容存入右边的数组，然后每次渲染最后一项即可；
  let right = [];
  var last;
  for (let index in input) {
    for (let obj of blockPatterns) {
      if (obj.pattern.test(input[index])) {
        if (right.length > 0) {
          last = right[right.length - 1];
          if (last.type === 'codeblockopen') {
            if (obj.name === 'codeblockopen') {
              last.type = 'pre';
            } else {
              last.content += (RegExp.input + '\n');
            }
            break;
          }
        } else {
          last = null;
        }
        switch (obj.name) {
          case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'blockquote':
            right.push({ content: RegExp.$1, type: obj.name });
            break;
          case 'header':
            if (last) {
              last.type = 'h1';
            }
            break;
          case 'subheader':
            if (last) {
              last.type = 'h2';
            }
            break;
          case 'blank': case 'hr': case 'codeblockopen':
            right.push({ content: '', type: obj.name });
            break;
          case 'para':
            if (!last) {
              right.push({ content: RegExp.$1, type: 'p' });
              break;
            }
            if (last.type === 'p' || last.type === 'blockquote') {
              last.content += (' ' + RegExp.$1);
            } else {
              right.push({ content: RegExp.$1, type: 'p' });
            }
            break;
          case 'ul': case 'ol':
            if (last.type === obj.name) {
              last.content.push(RegExp.$1);
            } else {
              right.push({
                content: [RegExp.$1],
                type: obj.name
              })
            }
            break;
        }
        break;
      }
    }
  }
  return right;
}
// this **![Link](https://www.baidy.com)**
// 对 input->right 过程中，对block return 的 right数组进一步处理：blank,code,ul/ol,join -> string
function inline (rightarr) {
  var right = [];
  for (let obj of rightarr) {
    if (obj.type === 'blank') {
      continue;
    }
    if (obj.type === 'pre') {
      right.push('<pre>' + obj.content + '</pre>');
      continue;
    }
    if (obj.type === 'ol' || obj.type === 'ul') {
      let content = '<' + obj.type + '>';
      for (let item of obj.content) {
        content += `<li>${replace(item)}</li>`;
      }
      content += '</' + obj.type + '>';
      right.push(content);
      continue;
    }
    right.push(`<${obj.type}>${replace(obj.content)}</${obj.type}>`);
  }
  return right.join('');
}
function replace (str) {
  var start = str.indexOf('`');
  var end = str.indexOf('`', start + 1);
  if (start === -1 || end === -1) {
    return str.replace(/\*\*(.+?)\*\*/g, `<strong>$1</strong>`).replace(/\*(.+?)\*/g, `<em>$1</em>`)
  } else {
    return replace(str.substring(0, start)) + '<code>' + str.substring(start + 1, end) + '</code>' + replace(str.substring(end + 1, str.length));
  }
}
function markmark (left, option) {
  var input = left.split('\n');
  var blockright = block(input);

  return inline(blockright);
}
