
// const req = require.context('../../icons/svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys()

// const re = /\.\/(.*)\.svg/

// const icons = requireAll(req).map(i => {
//   return i.match(re)[1]
// })

// console.log('icons:',icons)
import iconJson from '../../icons/icons.json'

const icons = iconJson.glyphs.reduce((pre,cur,index,arr)=>{
  pre.push(`iconfont icon-${cur.font_class}`)
},[])
console.log(icons);
export default icons
