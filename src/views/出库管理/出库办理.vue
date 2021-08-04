<template>
  <div class="app-container">
    <el-form ref="form" :model="outticket" label-width="80px">
      <el-form-item label="客户id">
        <el-input v-model="icid"></el-input>
      </el-form-item>
      <el-form-item label="其他价格">
        <el-input v-model="outticket.otherprice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >确认</el-button
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
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >上传出库单</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addot, getgt, getcid, getgid} from "@/api/return";//需要修改
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
      disable: false,
    };
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getInfo(this.$route.params.id);//可能需要修改
    }
  },
  methods: {
    //不知会不会按顺序，看测试结果修改
    onSubmit() {
      this.localgetcid(this.icid) 
      this.getInfo(this.cid)
      this.outticket.gtid = this.tableData.gid
    },
    onSubmit1() {
      this.addInfo(this.outticket)
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
    getInfo(cid) {
      getgt(cid).then((response) => {
        this.tableData = response.data.teacher;//需要修改
      });
    },
    localgetcid(icid) {
      getgt(icid).then((response) => {
        this.cid = response.data.cid;//需要修改
      });
    },
  },
};
</script>
