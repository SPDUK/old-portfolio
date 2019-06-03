// when clicked copy any of the code inside to the clipboard
async function handleCopyClick(evt) {
  // get all of the pre divs (code blocks), remove any extra divs, such as the copy button
  const codeBlocks = $(evt.target.parentElement)
    .children()
    .filter('pre');

  // get the text of the codeBlocks
  const text = codeBlocks.text();

  // copy all of the text to the clipboard
  await navigator.clipboard.writeText(text);

  // notify of success
  $.gritter.add({
    title: 'Code copied to clipboard! 👍',
    text: ' ',
    time: 3000
  });
}

function addMarkdownStyles() {
  // add borders to each blockquote
  $('blockquote').each((_idx, el) => $(el).addClass('border-left border-dark '));

  $('div.highlight').each((_idx, el) => {
    // add a copy button to each code block
    $(el).append($('<div class="copy">Copy</div>'));
    // add an event to run when the button is clicked to copy the code to clipboard
    $(el).click(handleCopyClick);
  });
}
