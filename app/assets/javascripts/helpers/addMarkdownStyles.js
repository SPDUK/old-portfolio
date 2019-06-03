function addMarkdownStyles() {
  $('blockquote').each((_idx, el) => $(el).addClass('border-left border-dark '));
  // todo: add copy link to each div.highlight
  $('div.highlight').each((_idx, el) => {
    $(el).append($('<div class="copy">Copy</div>'));
  });
}
