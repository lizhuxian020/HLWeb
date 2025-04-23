<script lang="ts">
import {defineComponent} from 'vue'
import type { TableColumn, TableActionButton, } from '../../../ts/global'

export default defineComponent({
  name: "normal-table-view",
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array<TableColumn>,
      default: () => []
    },
    addAction: {
      type: Object as () => TableActionButton,
      default: null
    }
  },
  computed: {
    defaultColumnsWidth() {
      let innerWidth = window.innerWidth
      return innerWidth > 1920 ? 'auto' : '200'
    }
  },
  methods: {
    defaultFormatter(item: any, origin: any)  {
      if (item[origin.property] || item[origin.property] === 0) {
        return item[origin.property]
      }
      return '-'
    },
    tableRowClassName({row, rowIndex}: {row: any, rowIndex: number}) {
      console.log("rowIndex" + rowIndex)
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
  },
})

</script>

<script lang="ts" setup>
function clickAdd() {
  console.log('clickNothing')
}
</script>

<template>
  <div style="width: 100%; flex: 1; display: flex; flex-direction: column; ">
    <template v-if="addAction">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="addAction.onClick">{{addAction.text}}</el-button>
      </div>
    </template>
    <el-table :data="dataSource"
              style="flex: 1"
            border
            empty-text="暂无数据"
            row-class-name="warning-cell"
            header-cell-class-name="warning-header"
  >
    <template v-for="item in columns" :key="item.prop">
      <el-table-column :prop="item.prop"
                       :label="item.label"
                       :width="item.width ? item.width : defaultColumnsWidth"
                       align="center"
                       :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <slot
              :name="item.prop"
              :row="{ ...scope.row, $index: scope.$index }"
              :index="scope.$index"
              :column="{ ...item }"
              style="background-color: #4191F1; font-size: 40px"
          >
          {{
            item?.compute ? item?.compute(scope.row, scope.column, scope.row[item.prop], scope.$index) : defaultFormatter(scope.row, scope.column)
          }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  </div>
</template>

<style scoped lang="less">
:deep(.warning-header) {
  background-color: #EEEEEE !important;
  color: #333333 !important;
  font-size: 20px;
}
</style>