// 发布到远端
fis.media('qa').match('*',{
  deploy:fis.plugin('http-push',{
    receiver:'http://plan.icloudinn.com/receiver.php',
    to:'./'
  })
})
// 所有css文件的合并与压缩
fis.match('/styles/**.css',{
  optimizer:fis.plugin('clean-css')
})
// 对所有图片进行压缩
fis.match('*.png',{
  optimizer:fis.plugin('png-compressor')
})
// cmd
// fis3 server start
// fis3 release qa -wl
