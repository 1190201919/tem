<template>
  <div class="app-container">
    <el-form ref="form" :model="outticket" label-width="80px">
      <el-form-item label="货物id">
        <el-input v-model="gtid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >导入明细</el-button
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
        <el-button type="primary" :disabled="disable" @click="onSubmit1"
          >确认出库</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getgt, deletegt} from "@/api/return";//需要修改
export default {
  data() {
    return {
      //出库货物明细简表
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
      gtid:"",
      disable: false,
    };
  },
  methods: {
    onSubmit() {
      this.getInfo(this.gtid);
    },
    onSubmit1() {
      deletegt(this.gtid);
      alert('出库成功');
    },
    //获得货物明细简表
    //查询goodsticket库
    getInfo(gtid) {
      getgt(gtid).then((response) => {
        this.tableData = response.data;//需要修改
      });
    },
  },
};
</script>