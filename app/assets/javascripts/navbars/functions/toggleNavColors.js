// applies the correct theme based on what is being passed in
// removes the opposite, currently swaps between light and transparent theme
// 'light' is dark on the dark theme

function toggleNavColors(theme) {
  const remove = theme === 'light' ? 'transparent' : 'light';
  nav.classList.add(`bg-${theme}`);
  nav.classList.add(`navbar-${theme}`);
  nav.classList.remove(`bg-${remove}`);
  nav.classList.remove(`navbar-${remove}`);
}
