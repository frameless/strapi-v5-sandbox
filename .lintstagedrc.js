export default {
  '**/*.{ts, tsx}?(x)': () => 'pnpm lint-build',
  '**/*.{ts, tsx, js, scss, css, html, json}?(x)': () => 'pnpm lint',
};
