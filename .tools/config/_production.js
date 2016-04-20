/* eslint key-spacing:0 */
export default config => ({
  compiler_fail_on_warning : false,
  compiler_hash_type       : 'chunkhash',
  compiler_stats           : {
    modules : false,
    children : false,
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_public_path     : '/'
})
