//= require helpers/copyToClipboard

// when clicked copy any of the code inside to the clipboard
async function handleCopyClick(evt) {
  // get the children of the parent element
  const { children } = evt.target.parentElement;
  // grab the first element (we append the copy div on afterwards, so the first will be the code element)
  // destructure the innerText from the code block
  const { innerText } = Array.from(children)[0];

  // copy all of the code to the clipboard
  copyToClipboard(innerText, 'Code copied to clipboard! 👍');
}

function addMarkdownStyles() {
  // add borders to each blockquote
  $('blockquote').each((_idx, el) => $(el).addClass('border-left border-dark '));

  $('div.highlight').each((_idx, el) => {
    // add a copy button to each code block
    const copy = $('<div class="copy">Copy</div>');
    $(el).append(copy);
    // add an event to run when the button is clicked to copy the code to clipboard
    $(copy).click(handleCopyClick);
  });
}
