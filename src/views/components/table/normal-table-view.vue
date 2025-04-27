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
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    handleSizeChange: {
      type: Function,
      default: (val: number) => {},
    },
    handleCurrentChange: {
      type: Function,
      default: (current: number) => {},
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
import {ref} from "vue";

function clickAdd() {
  console.log('clickNothing')
}
</script>

<template>
  <section style="width: 100%; flex: 1; display: flex; flex-direction: column; ">
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
      <el-table-column v-if="item.prop != 'btn'"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width ? item.width : defaultColumnsWidth"
                       align="center"
                       :show-overflow-tooltip="true"
                       :fixed="item.fixed === 'right' ? 'right' : !!item.fixed"
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
      <el-table-column v-else-if="item.prop == 'btn'"
                       :label="item.label"
                       :width="item.width ? item.width : defaultColumnsWidth"
                       align="center"
                       :fixed="item.fixed === 'right' ? 'right' : !!item.fixed"
      >
          <template #default="scope">
            <template v-for="(btnText, i) in item.btnTexts" :key="btnText">
              <el-button text type="primary" @click="item.clickBtn && item.clickBtn(scope.row, i)">
                {{btnText}}
              </el-button>
            </template>
          </template>
      </el-table-column>
    </template>
  </el-table>
    <footer style="display: flex; justify-content: flex-end; margin-top: 20px">
      <el-pagination
          :current-page="currentPage"
          :page-size="size"
          :background="true"
          layout='total, prev, pager, next, sizes, jumper'
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </footer>
  </section>
</template>

<style scoped lang="less">
:deep(.warning-header) {
  background-color: #EEEEEE !important;
  color: #333333 !important;
  font-size: 20px;
}
</style>