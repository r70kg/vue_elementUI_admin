
/**
 * 引入各个模块
 */

import login from './login.js'
import user from './user'
// 统计
import stc from './stc.js'

import myserver from '../request/getrequest.js'


myserver.parseRouter('login', login)
myserver.parseRouter('user', user)
myserver.parseRouter('stc', stc)

export default myserver



/**
 * 引入各个模块 【遍历引入】
 */

/*import myserver from '../request/getrequest.js'

// get all modules
const modulesFiles = require.context('./',true, /\.js$/);

modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  console.log(value.default)

  // filter index.js
  if(value.default){
    myserver.parseRouter(moduleName, value.default)
  }
}, {})

export default myserver*/

