const Mock = require('mockjs')

const menuList = [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                      id: 4,
                      label: '二级 1-1',
                      children: [{
                        id: 9,
                        label: '三级 1-1-1'
                      }, {
                        id: 10,
                        label: '三级 1-1-2'
                      }]
                    }]
                  }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                      id: 5,
                      label: '二级 2-1'
                    }, {
                      id: 6,
                      label: '二级 2-2'
                    }]
                  }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                      id: 7,
                      label: '二级 3-1'
                    }, {
                      id: 8,
                      label: '二级 3-2',
                      children: [{
                      id: 11,
                        label: '三级 3-2-1'
                      }, {
                        id: 12,
                        label: '三级 3-2-2'
                      }, {
                        id: 13,
                        label: '三级 3-2-3'
                      }]
                    }]
                  }]

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
        code: 20000,
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
  //       code: 20000,
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
