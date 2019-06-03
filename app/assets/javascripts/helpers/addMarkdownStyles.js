// when clicked copy any of the code inside to the clipboard
async function handleCopyClick(evt) {
  // get the children of the parent element
  const { children } = evt.target.parentElement;
  // filter out any of the child divs that are not <pre> tags, then grab the first element
  // destructure the innerText from the code block
  const { innerText } = Array.from(children).filter(el => el.tagName === 'PRE')[0];

  // copy all of the text to the clipboard
  await navigator.clipboard.writeText(innerText);

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
    const copy = $('<div class="copy">Copy</div>');
    $(el).append(copy);
    // add an event to run when the button is clicked to copy the code to clipboard
    $(copy).click(handleCopyClick);
  });
}
