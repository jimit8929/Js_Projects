module.exports = {
  darkMode: 'class',            // ← you already have this
  content: [
    './*.html',                 // any top‑level HTML (e.g. index.html)
    './02_Task_Management/**/*.html',    // all HTML in your project folder
    './02_Task_Management/scripts/**/*.js', // your JS entrypoints
  ],
  theme: {
    extend: {
      // (optional) anything custom you had in index.css
    }
  },
  plugins: [],
}
