import request from '@/utils/request'

//这部分的id都为数据库的顺序序号
//上传顾客
export function addcous(coustomer) {
    return request({
        url: '/api/customers',
        method: 'post',
        data: coustomer
    })
}

//获取所有顾客
export function getallcous() {
    return request({
        url: '/api/customers',
        method: 'get',
    })
}

//删除顾客
export function deletecous(id) {
    return request({
        url: '/api/customers/'+id,
        method: 'delete',
    })
}

//上传用户
export function adduser(user) {
    return request({
        url: '/return/add',
        method: 'post',
        data: user
    })
}

//获取所有用户
export function getalluser() {
    return request({
        url: '/return/add',
        method: 'get',
    })
}

//删除用户
export function deleteuser(id) {
    return request({
        url: '/return/add',
        method: 'get',
        params: { id }
    })
}

export function getgt(id) {
    return request({
      url: '/api/goodstickets/'+id,
      method: 'get',
    })
  }

//上传出库单，按照后端需要进行上传
export function addot(outticket) {
    return request({
      url: '/api/outtickets',
      method: 'post',
      data: outticket
    })
  }

  //用icid访问后端coustomer返回一个cid
  export function getcid(icid) {
    return request({
      url: '/api/customers/icid/'+icid,
      method: 'get',
    })
  }

  //用icid访问返回一个coustomer
  export function getcous(icid) {
    return request({
      url: '/api/customers/icid/'+icid,
      method: 'get',
    })
  }

  //用cid访问后端删除goodsticket该行数据库中的数据
  export function deletegt(cid) {
    return request({
      url: '/api/customers/'+cid,
      method: 'delete',
    })
  }

  //更新gt表cid,为了简便，若需要也可传入全部数据
  export function update(cid1,cid2) {
    return request({
      url: '/teacher/update',
      method: 'post',
      params: { cid1, cid2}
    })
  }

  export function getgid(cid) {
    return request({
      url: '/api/goodstickets/cid'+cid,
      method: 'get',
    })
  }
