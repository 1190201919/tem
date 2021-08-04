<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="入库单id：" prop="itid">
        <el-input v-model="ruleForm.itid"></el-input>
      </el-form-item>
      <el-form-item label="仓库" prop="warehouse">
        <el-select v-model="ruleForm.warehouse" placeholder="请选择仓库区域">
          <el-option label="仓库一" value=1></el-option>
          <el-option label="仓库二" value=2></el-option>
          <el-option label="仓库三" value=3></el-option>
          <el-option label="仓库四" value=4></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="仓位" prop="position">
        <el-select v-model="ruleForm.position" placeholder="请选择仓位区域">
          <el-option label="仓位一" value=1></el-option>
          <el-option label="仓位二" value=2></el-option>
          <el-option label="仓位三" value=3></el-option>
          <el-option label="仓位四" value=4></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">归仓</el-button>
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
      prop="warehouse"
      label="仓库"
      width="180">
    </el-table-column>
    <el-table-column
      prop="position"
      label="仓位">
    </el-table-column>
    <el-table-column
      prop="date"
      label="入库日期">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import {
    check,
    getIT,
    getGood,
    inware,
    getITA,
  } from '@/api/form'
  export default {
    data() {
      return {
        tableData: [],
        ruleForm: {
          itid: '',
          warehouse: '',
          position: '',
        },
        ware: {
          warehouse: '',
          position: '',
        },
        init:{
        },
        rules: {
          itid: [{
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
          warehouse: [{
            required: true,
            message: '请选择仓库',
            trigger: 'change'
          }],
          position: [{
            required: true,
            message: '请选择仓位',
            trigger: 'change'
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
            this.ware.warehouse = this.ruleForm.warehouse;
            this.ware.position = this.ruleForm.position;
            check(this.ware, this.ruleForm.itid);
            getIT(this.ruleForm.itid).then(response => {
              var gid = response.data.gid;
              var count = response.data.count;
              this.init.date=response.data.date;
              this.init.gid=response.data.gid;
              this.init.cid=response.data.uid;
              this.init.num=response.data.count;
              this.init.price=response.data.storeprice;
              this.init.warehouse=response.data.warehouse;
              this.init.ware=response.data.position;
              this.init.plate=response.data.plate;
              this.init.info=response.data.info;
              inware(this.init);
              getGood(gid).then(response => {
                alert('你的货物已经分批入库，本批入库货物信息如下：' + response.data.name + ',' + count + ' 件 ,' + response.data
                  .size + ' 公斤/件,货物入库成功！请确认，如有任何疑问请及时联系我们。【物联 网中心】"');
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