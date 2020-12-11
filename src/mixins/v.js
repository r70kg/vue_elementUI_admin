/**
 * Created by Dell on 2020/10/9.
 */
// 各个组件 混入绑定Vue组件实例 实现数据自动绑定到data


let MIXIN = {
  created() {
    this.v();
    console.log(this);
  },
  methods:{
    v(){
      this.msv.v(this);
    }
  }
}
export {
  MIXIN
};

