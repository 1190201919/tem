<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="入库单id：" prop="itid">
        <el-input v-model="ruleForm.itid"></el-input>
      </el-form-item>
      <el-form-item label="其他信息" prop="info">
    <el-input type="textarea" v-model="ruleForm.info"></el-input>
  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询费用</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="itid"
      label="入库单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="storeprice"
      label="仓储价格（元/吨*天）"
      width="180">
    </el-table-column>
    <el-table-column
      prop="laborprice"
      label="力资费（元/吨）">
    </el-table-column>
    <el-table-column
      prop="otherprice"
      label="其他费用">
    </el-table-column>
  </el-table> 
  </div>
</template>

<script>
  import {
    check,getIT,getGood,getITA,
  } from '@/api/form'
import { get } from 'js-cookie';
  export default {
    data() {
      return {
        tableData: [],
        ruleForm: {
          itid: '',
          storeprice: '',
          laborprice: '',
          otherprice: '',
          gid:'',
          info:'',
        },
        need:{
            info:'',
        },
        rules: {
          itid: [{
              required: true,
              message: '请输入入库单id',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
        }
      };
    },
    created(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        getITA().then(response=>{
        this.tableData=response.data;
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.need.info=this.ruleForm.info;
            check(this.need,this.ruleForm.itid);
            getIT(this.ruleForm.itid).then(response=>{
                var laborprice=response.data.laborprice;
                var gid=response.data.gid;
                var otherprice=response.data.otherprice;
                var count=response.data.count;
                getGood(gid).then(response=>{
                    var size=response.data.size;
                    var name=response.data.name;
                    var tatal=otherprice+laborprice*count*size;
                     alert('该用户一共需要为'+name+'支付'+tatal+'元');
                })
            })
          } else {
            alert('未查询到单号！！');
            console.log('未查询到单号！！');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>