<template>
  <div class="app-container">
    <el-form ref="form" :model="outticket" label-width="80px">
      <el-form-item label="ICid">
        <el-input v-model="icid"></el-input>
      </el-form-item>
      <el-form-item label="其他价格">
        <el-input v-model="outticket.otherprice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >确认</el-button
        >
         <el-button type="primary" :disabled="disable" @click="onSubmit3"
          >查看该id下货物</el-button
        >
      </el-form-item>
    </el-form>
    <h3>该id下的货物id</h3>
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
    <h3>请输入你所要查询的货物id</h3>
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
    <h3>出库货物明细简表</h3>
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
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit2"
          >上传出库单</el-button
        >
      </el-form-item>
      <h3>注意：上传的为明细表显示的货物id！</h3>
    </el-form>
  </div>
</template>

<script>
import { addot, getgt, getcid, getgid,getcous} from "@/api/return";//需要修改
export default {
  data() {
    return {
      //出库货物明细简表,来自goodsticket
      tableData: {
        gtid:"",
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
      //出库单
      outticket: {
        gtid: "",
        otherprice: "",
      },
      icid:"",
      cid:"",
      gtid:"",
      gtids:[],
      disable: false,
    };
  },

  methods: {
    //不知会不会按顺序，看测试结果修改
    onSubmit() {
      this.localgetcid(this.icid);
    },
    onSubmit1() {
      this.outticket.gtid = this.gtid
      this.getInfo(this.gtid)
    },
    onSubmit2() {
      this.addInfo(this.outticket)
    },
    onSubmit3() {
      this.localgetgid(this.cid);
    },
    //上传出库单
    addInfo(outticket) {
      addot(outticket).then((response) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      });
    },
    //获得货物明细简表
    //查询goodsticket库
    getInfo(gtid) {
      getgt(gtid).then((response) => {
        this.tableData = response.data;//需要修改
      });
    }, 
    localgetcid(icid) {
      getcous(icid).then((response) => {
        this.cid = response.data.cid;//需要修改
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
