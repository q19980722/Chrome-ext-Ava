
<template>
  <el-card style="width: 30%">
    <template #header>
      <h3>工作模式下黑名单列表</h3>
    </template>
    <el-table :data="Data">
      <el-table-column prop="keyword" label="关键字" width="120" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button type="danger" @click="deleteBlockList(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>  
    <el-row justify="space-between">
      <el-col :span="16">
        <el-input v-model="keyword" placeholder="关键字"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="addBlockList()">添加</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-divider/>
  <el-row style="padding: 10px">
    <el-button size="large"  @click="reset">清空缓存</el-button>  
  </el-row>


</template>




<script>
  export default {
    name: 'app',
    data() {
      return {
        keyword: '',
        Data: [],
      };
    },
    created () {
      this.getBlockList();
    },
    methods: {
      getBlockList () {
        chrome.storage.local.get("blockList", (entry) => {
          this.Data = (typeof(entry.blockList) == 'undefined') ? [] : Object.values(entry.blockList);
        });
      },
      saveBlockList () {
        chrome.storage.local.set({"blockList":this.Data});
      },
      deleteBlockList (index) {
        this.Data.splice(index, 1);
        this.saveBlockList();
      },
      addBlockList () {
        this.Data.push({'keyword': this.keyword});
        this.keyword='';
        this.saveBlockList();
      },
      reset () {
        chrome.storage.local.clear(() => {console.log("clear")})
        this.getBlockList();
      },
    }
  };
</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}

.plan_items p{
  color: #444;
  font-size: 22px;
  margin: 0px 0px 5px 0px;
}
.plan_items .el-row{
  margin: 0px 0px 5px 0px;
  color: #666;
  font-size: 16px;
}
.plan_items .el-row .el-input-number{
  max-width: 100%;
}
</style>
