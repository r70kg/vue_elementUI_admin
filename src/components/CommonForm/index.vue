<template>
  <div>
    <!--是否行内表单-->
    <el-form ref="form" :inline="inline" :model="form" label-width="100px">
      <!--标签显示名称-->
      <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
        <!--根据type来显示是什么标签-->
        <el-input v-if="item.type==='input'" v-model="form[item.model]" :placeholder="'请输入' + item.label" />
        <el-select v-if="item.type === 'select'" v-model="form[item.model]" placeholder="请选择">
          <!--如果是select或者checkbox 、Radio就还需要选项信息-->
          <el-option v-for="subitem in item.opts" :key="subitem.value" :label="subitem.label" :value="subitem.value" />
        </el-select>
        <el-switch v-if="item.type === 'switch'" v-model="form[item.model]" />
        <el-date-picker v-if="item.type === 'date'" v-model="form[item.model]" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <!--留一个插槽-->
      <el-form-item><slot /></el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    inline: {
      type:Boolean,
      default:false
    },
    form: {
      type:Object,
      default: []
    },
    formLabel: {
      type:Array,
      default:[]
    }
  },
  // inline 属性可以让表单域变为行内的表单域
  // form 表单数据 formLabel 是标签数据
  data() {
    return {}
  }
}
</script>

<style type="text/scss" lang="scss">

</style>
