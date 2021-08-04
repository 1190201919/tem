<template>
  <div class="app-container">
      <h3>请买家和卖家进行货物确认</h3>
      <h3>确认完毕后进行再过户</h3>
      <h3>免责声明：该页面由客户进行确认点击</h3>
      <h3>若出现问题本公司概不负责！！！！！</h3>
      <h4>请输入买家和卖家id</h4>
      <el-form ref="form" label-width="80px">
      <el-form-item label="买家ICid">
        <el-input v-model="cid1"></el-input>
      </el-form-item>
      <el-form-item label="卖家ICid">
        <el-input v-model="cid2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >确认过户</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updategt} from "@/api/return";
export default {
  data() {
      return{
          cid1:"",
          cid2:""
      }
  }
  methods: {
      onSubmit(){
          this.updategt(cid1,cid2)
      }
  }