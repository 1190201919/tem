<template>
  <div class="app-container">
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户id">
        <el-input v-model="user.id"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="user.accout"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="user.pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input-number v-model="user.group" controls-position="right" :min="0" :max="5"></el-input-number>
      </el-form-item>
      <el-form-item label="性别">
        <el-input-number v-model="user.gender" controls-position="right" :min="0" :max="2"></el-input-number>
      </el-form-item>
      <el-form-item label="状态">
        <el-input-number v-model="user.state" controls-position="right" :min="0" :max="1"></el-input-number>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="user.info"></el-input>
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
      label="用户id"
      width="180" prop="id">
    </el-table-column>
    <el-table-column
      label="用户名"
      width="180" prop="name">
    </el-table-column>
        <el-table-column
      label="权限"
      width="180" prop="group">
    </el-table-column>
    <el-table-column
      label="状态"
      width="180" prop="status">
    </el-table-column>
    <el-table-column
      label="备注信息"
      width="180" prop="info">
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
import { adduser,getalluser,deleteuser} from "@/api/return";
export default {
  data() {
    return {
      user: {
        id: "",
        name: "",
        accout: "",
        pwd: "",
        group: "",
        gender: "",
        state: "",
        info:"",
      },
      disable: false,
      users:[]
    };
  },
  created(){
      this.getUsers()
  },
  methods: {
    onSubmit() {
      this.addInfo(this.user);
    },
    addInfo(user) {
      addcous(user).then((response) => {
        // 提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      });
    },
    getUsers(){
        getalluser().then(response => {
         this.users = response.data.items//可能需要修改
       })
    },
    handleDelete(id){
      // 弹出提示框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          // 如果点击了确定则调用then
        }).then(() => {
          // 调用api中删除讲师的方法
          deletecous(id).then(response=>{
            // 删除成功后，重新加载讲师列表
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