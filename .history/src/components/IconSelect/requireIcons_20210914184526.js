/*eslint-disable*/
// const req = require.context('../../icons/svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys()

// const re = /\.\/(.*)\.svg/

// const icons = requireAll(req).map(i => {
//   return i.match(re)[1]
// })

// console.log('icons:',icons)
import iconJson from '../../icons/icons.json'

console.log(typeof(iconJson.glyphs));

const icons = iconJson.glyphs.reduce((pre,cur,index,arr)=>{
  console.log('pre:',pre)
  console.log('cur:',cur)
  console.log('cur2:',`iconfont icon-${cur.font_class}`)
  let item = `iconfont icon-${cur.font_class}`
  pre.push(item)
},[])
console.log(icons);
export default icons
