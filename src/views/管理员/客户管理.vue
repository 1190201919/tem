<template>
  <div class="app-container">
    <el-form ref="form" :model="coustomer" label-width="80px">
      <el-form-item label="客户id">
        <el-input v-model="coustomer.cid"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="coustomer.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input-number v-model="coustomer.sex" controls-position="right" :min="0" :max="2"></el-input-number>
      </el-form-item>
      <el-form-item label="IC卡编号">
        <el-input v-model="coustomer.icid"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="coustomer.phone"></el-input>
      </el-form-item>
      <el-form-item label="电话号">
        <el-input v-model="coustomer.tel"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input-number v-model="coustomer.status" controls-position="right" :min="0" :max="1"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disable" @click="onSubmit"
          >上传</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
    :data="coustomers"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="90">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      label="客户id"
      width="180"prop="cid">
    </el-table-column>
    <el-table-column
      label="客户姓名"
      width="180" prop="name">
    </el-table-column>
        <el-table-column
      label="手机号"
      width="180" prop="phone">
    </el-table-column>
    <el-table-column
      label="状态"
      width="180" prop="status">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { addcous,getallcous,deletecous} from "@/api/return";
export default {
  data() {
    return {
      coustomer: {
        cid: "",
        name: "",
        icid: "",
        phone: "",
        tel: "",
        sex: "",
        status: "",
      },
      disable: false,
      coustomers:[]
    };
  },
  created(){
      this.getCoustomers()
  },
  methods: {
    onSubmit() {
      this.addInfo(this.coustomer);
    },
    addInfo(coustomer) {
      addcous(coustomer).then((response) => {
        // 提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      });
    },
    getCoustomers(){
        getallcous().then(response => {
         this.coustomers = response.data.items//可能需要修改
       })
    },
    handleDelete(id){
      // 弹出提示框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletecous(id).then(response=>{
            this.getCoustomers()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        })
    },
  },
};
</script>