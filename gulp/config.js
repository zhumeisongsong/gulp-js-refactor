var dir_root = './assets/'
var dir_dest = dir_root + 'build'; // 出力先ディレクトリ
var dir_src = dir_root + 'dev';  // ソースディレクトリ

module.exports = {
  // 出力先の指定
  dest: dir_dest,
 // mocのビルド設定
  moc: {
    entry: dir_src + '/moc/',
    dest: dir_dest + '/moc/'
  },
   // fontのビルド設定
  font: {
    entry: dir_src + '/font/',
    dest: dir_dest + '/font/'
  },
  // scssのビルド設定
  stylesheet: {
    entry: dir_src + '/stylesheet/',
    dest: dir_dest + '/stylesheet/'
  },
  // jsのビルド設定
  js: {
    entry: dir_src + '/javascript/',
    dest: dir_dest + '/javascript/'
  },

}