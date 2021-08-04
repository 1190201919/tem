<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="货主id：" prop="uid">
        <el-input v-model="ruleForm.uid"></el-input>
      </el-form-item>
      <el-form-item label="库存价：" prop="storeprice">
        <el-input v-model="ruleForm.storeprice"></el-input>
      </el-form-item>
      <el-form-item label="力资价：" prop="laborprice">
        <el-input v-model="ruleForm.laborprice"></el-input>
      </el-form-item>
      <el-form-item label="其他价格：" prop="otherprice">
        <el-input v-model="ruleForm.otherprice"></el-input>
      </el-form-item>
      <el-form-item label="其他信息" prop="info">
    <el-input type="textarea" v-model="ruleForm.info"></el-input>
  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    addIn
  } from '@/api/form'
  export default {
    data() {
      return {
        ruleForm: {
          uid: '',
          storeprice: '',
          laborprice: '',
          otherprice: '',
          info:'',
        },
        rules: {
          uid: [{
              required: true,
              message: '请输入货主id',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
          storeprice: [{
            required: true,
            message: '请输入库存价格',
            trigger: 'blur'
          }],
          laborprice: [{
            required: true,
            message: '请输入力资价格',
            trigger: 'blur'
          }],
          otherprice: [{
            required: true,
            message: '请输入力资价格',
            trigger: 'blur'
          }],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addIn(this.ruleForm);
            alert('入库办理成功，进入验货装盘阶段！请确认，如有任何疑 问请及时联系我们。【物联网中心】');
            
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