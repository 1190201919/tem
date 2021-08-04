<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="入库单id：" prop="itid">
        <el-input v-model="ruleForm.itid"></el-input>
      </el-form-item>
      <el-form-item label="货物名：" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="货物规格：" prop="size">
        <el-input v-model="ruleForm.size"></el-input>
      </el-form-item>
      <el-form-item label="入库件数：" prop="count">
        <el-input v-model="ruleForm.count"></el-input>
      </el-form-item>
      <el-form-item label="盘号：" prop="plate">
        <el-input v-model="ruleForm.plate"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      prop="gid"
      label="货单id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="count"
      label="货物件数">
    </el-table-column>
  </el-table> 
  </div>
</template>

<script>
  import {
    check,goodin,getITA
  } from '@/api/form'
  export default {
    data() {
      return {
        tableData: [],
        ruleForm: {
          itid: '',
          count: '',
          plate:'',
          name:'',
          size:'',
          gid:'',
        },
        good:{
            name:'',
            size:'',
        },
        need:{
                gid:'',
                count:'',
                plate:''
            },

        rules: {
          itid: [{
              required: true,
              message: '请输入货物id',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
          count: [{
            required: true,
            message: '请输入入库件数',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入货物名',
            trigger: 'blur'
          }],
          size:[{
            required: true,
            message: '请输入货物规格（公斤/件）',
            trigger: 'blur'
          }],
          plate: [{
            required: true,
            message: '请输入盘号',
            trigger: 'blur'
          }],
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
              this.good.name=this.ruleForm.name;
              this.good.size=this.ruleForm.size;
              goodin(this.good).then(response=>{
                this.need.gid=response.data.gid;
                this.need.count=this.ruleForm.count;
                this.need.plate=this.ruleForm.plate;
                check(this.need,this.ruleForm.itid);
                alert('货物已经分批装盘，本批装盘货物如下：'+this.good.name+','+this.need.count+'件'+this.good.size+'公斤/件,装盘成功！请确认，如有任何疑问请及时联系我们。【物联网中心】');
              })
          } else {
            console.log('办理失败！！');
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