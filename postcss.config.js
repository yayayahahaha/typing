module.exports = {
  plugins: [require('autoprefixer')]
  // 不知道為什麼在換成 vite 後，原本不需要有的 postcss.config.js 就必須要有了
  // 還要幫加上 require('autoprefixer') 這個 plugins..
}
