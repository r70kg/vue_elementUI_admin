<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form ref="form" :form-label="operateFormLabel" :form="operateForm" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <!--<el-button type="primary" @click="addUser">+ 新增</el-button>-->
      <common-form inline :form-label="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom)">搜索</el-button>
      </common-form>
    </div>
    <!--依次是: 表格数据 表格标签数据 分页数据  列表方法 更新方法 删除方法-->
    <common-table :table-data="tableData" :table-label="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser" />
  </div>
</template>

<script type="text/ecmascript-6">
import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable'
import { fetchList } from '@/api/article'

export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      operateType: 'add',
      isShow: false,
      tableData: [],
      tableLabel: [
        {
          prop: 'author',
          label: '姓名'
        },
        {
          prop: 'image_uri',
          label: '头像'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'author',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      searchFrom: {

      },
      formLabel: [
        {
          model: 'keyword',
          label: '条件一',
          type: 'input'
        },
        {
          model: 'keyword2',
          label: '条件二',
          type: 'input'
        },
        {
          model: 'keyword3',
          label: '条件二',
          type: 'select',
          opts: [
            {
              value: 1,
              label: '条件一'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(name = '') {
      console.log(name)

      // this.config.loading = true
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : ''

      // this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.config.loading = false
        }, 1.5 * 1000)
      })
    },
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    confirm() {
      /* if (this.operateType === 'edit') {
            console.log(this.operateForm)
            this.$http.post('/api/user/edit', this.operateForm).then(res => {
              console.log(res.data)
              this.isShow = false
              this.getList()
            })
          } else {
            this.$http.post('/api/user/add', this.operateForm).then(res => {
              console.log(res.data)
              this.isShow = false
              this.getList()
            })
          }*/
    },
    delUser(row) {
      /* this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              let id = row.id
              this.$http
                .get('/api/user/del', {
                  params: {
                    id
                  }
                })
                .then(res => {
                  console.log(res.data)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.getList()
                })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })*/
    }
  }
}
</script>

<style type="text/scss" lang="scss">

</style>
