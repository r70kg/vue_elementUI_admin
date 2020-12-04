<template>
  <div>
    <div class="common-table">
      <el-row type="flex" class="export" justify="flex-end">
        <slot />

        <el-col class="box">
          <el-button size="min" type="primary" @click="handleImport()">导入</el-button>
          <el-button size="min" type="primary" @click="handleExport()">导出</el-button>
        </el-col>
      </el-row>
      <!--stripe	是否为斑马纹  v-loading  -->
      <el-table v-loading="config.loading" :data="tableData" stripe>
        <!--第一行为序号 默认写死-->
        <el-table-column label="序号" width="85">
          <!--slot-scope="scope" 这里取到当前单元格,scope.$index就是索引 默认从0开始这里从1开始-->
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <!--show-overflow-tooltip 当内容过长被隐藏时显示 tooltip-->
        <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          show-overflow-tooltip
          :label="item.label"

        >

          <!--其实可以在上面:prop="item.prop"就可以显示表单数据 这里设置插槽的方式话更加灵活 我们可以写样式-->
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>

        <!--操作-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="min" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="min" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="pagination-container">
        <el-pagination
          class="pager"
          layout="prev, pager, next"
          :total="config.total"
          :current-page.sync="config.page"
          :page-size="10"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// config分页数据，这里面至少包括当前页码 总数量
export default {
  props: {
    tableData: {
      type:Array,
      default: []
    },
    tableLabel: {
      type:Array,
      default: []
    },
    config: {
      type:Object,
      default:{}
    }
  },
  data() {
    return {}
  },
  methods: {
    // 导入
    handleImport() {
      console.log('导入')
    },
    // 导出
    handleExport() {
      // this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        // this.downloadLoading = false
      })
    },
    // 更新
    handleEdit(row) {
      this.$emit('edit', row)
    },
    // 删除
    handleDelete(row) {
      this.$emit('del', row)
    },
    // 分页
    changePage(page) {
      this.$emit('changePage', page)
    },

    // 数据请求
    getDate(page = 1) {

    }
  }
}
</script>

<style type="text/scss" lang="scss">
  .box {
    display: flex;
    justify-content: flex-end;
  }
</style>
