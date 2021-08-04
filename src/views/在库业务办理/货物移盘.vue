<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="货物单id：" prop="gtid">
        <el-input v-model="ruleForm.gtid"></el-input>
      </el-form-item>
      <el-form-item label="盘号：" prop="plate">
        <el-input v-model="ruleForm.plate"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">移盘</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="gtid"
      label="货单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="plate"
      label="盘号">
    </el-table-column>
  </el-table> 
  </div>
</template>

<script>
  import {
    checkG,
    getGT,
    getGood,
    getGTA
  } from '@/api/form'
  export default {
    data() {
      return {
        tableData: [],
        ruleForm: {
          gtid: '',
          plate:'',
        },
        plate: {
          plate:'',
        },
        rules: {
          gtid: [{
              required: true,
              message: '请输入货物单id',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
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
        getGTA().then(response=>{
        this.tableData=response.data;
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.plate.plate=this.ruleForm.plate;
            checkG(this.plate, this.ruleForm.gtid);
            getGT(this.ruleForm.gtid).then(response => {
              var gid = response.data.gid;
              var count = response.data.num;
              getGood(gid).then(response => {
                alert('你的货物已经成功移盘，本批移盘物品信息如下：' + response.data.name + ',' + count + ' 件 ,' + response.data
                  .size + ' 公斤/件！请确认，如有任何疑问请及时联系我们。【物联网中心】"');
              })
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