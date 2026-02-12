import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

// Initialize Reveal
let deck = new Reveal({
  plugins: [Markdown, Highlight, Notes],
  hash: true,
  // Slide transitions
  transition: 'convex', // none/fade/slide/convex/concave/zoom
});

deck.initialize().then(() => {
  console.log("Presentation Initialized");
});
