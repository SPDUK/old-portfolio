//= require helpers/copyToClipboard

// when clicked copy any of the code inside to the clipboard
function handleCopyClick(evt) {
  // get the children of the parent element
  const { children } = evt.target.parentElement;
  // grab the first element (we append the copy div on afterwards, so the first will be the code element)
  // destructure the innerText from the code block
  const { innerText } = Array.from(children)[0];

  // copy all of the code to the clipboard
  copyToClipboard(innerText, 'Code copied to clipboard! 👍');
}

// todo: add links to h1-h6 with ids
function addMarkdownStyles() {
  // add borders to each blockquote
  $('blockquote').each((_idx, el) => $(el).addClass('border-left border-dark '));

  // add a the button to each code block
  $('div.highlight').each((_idx, el) => {
    const copy = $('<button class="text-dark">Copy</button>');
    // add an event to run when the button is clicked to copy the code to clipboard
    $(copy).click(handleCopyClick);
    $(el).append(copy);
  });
}
