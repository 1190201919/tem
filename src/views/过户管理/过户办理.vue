<template>
  <div class="app-container">
    <el-form ref="form" label-width="80px">
      <el-form-item label="买家ICid">
        <el-input v-model="icid1"></el-input>
      </el-form-item>
      <el-form-item label="卖家ICid">
        <el-input v-model="icid2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >拉取信息</el-button
        >
        <el-button type="primary" :disabled="disable" @click="onSubmit3"
          >获取卖家id下货单id</el-button
        >
      </el-form-item>
    </el-form>
    <h3>卖家id下的货单id</h3>
    <el-table
    :data="gtids"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="180">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      label="货物id"
      width="180" prop="gtid">
    </el-table-column>
    </el-table>
    <h3>请输入你所要查询的货单id</h3>
    <el-form ref="form"  label-width="80px">
      <el-form-item label="订单id">
        <el-input v-model="gtid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit1"
          >拉取明细</el-button
        >
      </el-form-item>
    </el-form>
    <h3>买方顾客信息</h3>
    <el-form ref="form" :model="coustomer1" label-width="100px">
      <el-form-item label="客户id">
        <el-input v-model="coustomer1.cid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="coustomer1.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="ic卡编号">
        <el-input v-model="coustomer1.icid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="coustomer1.phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="coustomer1.status" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <h3>卖方顾客信息</h3>
    <el-form ref="form" :model="coustomer2" label-width="100px">
      <el-form-item label="客户id">
        <el-input v-model="coustomer2.cid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="coustomer2.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="ic卡编号">
        <el-input v-model="coustomer2.icid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="coustomer2.phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="coustomer2.status" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <h3>货物明细信息简表</h3>
    <el-form ref="form" :model="tableData" label-width="100px">
      <el-form-item label="货物订单id">
        <el-input v-model="tableData.gtid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="入库时间">
        <el-input v-model="tableData.date" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="存储价格">
        <el-input v-model="tableData.price" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="仓库号">
        <el-input v-model="tableData.warehouse" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="仓位号">
        <el-input v-model="tableData.ware" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="盘号">
        <el-input v-model="tableData.plate" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="数目">
        <el-input v-model="tableData.num" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="信息">
        <el-input v-model="tableData.info" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getgt, getcous,getgid} from "@/api/return";
export default {
  data() {
    return {
      tableData: {
        gtid: "",
        date: "",
        price: "",
        warehouse: "",
        ware: "",
        cid: "",
        gid: "",
        num: "",
        info: "",
        plate: "",
      },
      coustomer1: {
        cid: "",
        name: "",
        icid: "",
        phone: "",
        status: "",
        tel: "",
        sex: "",
      },
      coustomer2: {
        cid: "",
        name: "",
        icid: "",
        phone: "",
        status: "",
        tel: "",
        sex: "",
      },
      icid1:"",
      icid2:"",
      gtid:"",
      gtids:"",
      disable: false,
    };
  },
  methods: {
    //不知会不会按顺序，看测试结果修改
    onSubmit() {
      this.getcoustomer1(this.icid1)
      this.getcoustomer2(this.icid2)
    },
    onSubmit1() {
      this.getInfo(this.gtid);
    },
    onSubmit3(){
      this.localgetgid(this.coustomer2.cid);
    },
    //获得货物明细简表
    //查询goodsticket库
    getInfo(cid) {
      getgt(cid).then((response) => {
        this.tableData = response.data;//需要修改
      });
    }, 
    getcoustomer1(icid1) {
      getcous(icid1).then((response) => {
        this.coustomer1 = response.data;//需要修改
      });
    },
    getcoustomer2(icid2) {
      getcous(icid2).then((response) => {
        this.coustomer2 = response.data;//需要修改
      });
    },
    localgetgid(cid) {
      getgid(cid).then((response) => {
        this.gtids = response.data;//需要修改
      });
    },
  },
};
</script>