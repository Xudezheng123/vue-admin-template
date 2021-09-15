const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }],
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // {
  //   url: '/vue-admin-template/menu/getAllMenu',
  //   type: 'get',
  //   response: config => {
  //     const items = data.items
  //     return {
  //       code: 200,
  //       data: {
  //         total: items.length,
  //         menus: menuList
  //       }
  //     }
  //   }    
  // },
  // {
  //   url:'/vue-admin-template/menu/deleteMenu',
  //   type:'post',
  //   response:config=>{
  //     const menus = menuList.filter((item,index,array)=>item);

  //     return{
  //       code:200,
  //       data:{
  //         menus:menus
  //       }
  //     }
  //   }
  // },
  // {
  //   url:'/vue-admin-template/menu/editMenu',
  //   type:'post',
  //   response:config=>{

  //   }
  // }
]
