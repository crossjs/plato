import db from 'leancloud-storage'

const appId = 'GQHNdUFpLzaMhfeuXLsV7seW-gzGzoHsz'
const appKey = 'y3tGzcqWr2P5674KmXdb8cVH'
const region = 'cn'

db.init({ appId, appKey, region })

export default db
