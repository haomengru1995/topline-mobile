module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDiretory: 'es',
      style: true
    }, 'vant']
  ]
}
