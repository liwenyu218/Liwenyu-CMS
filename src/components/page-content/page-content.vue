<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import usePermissions from '@/hooks/usePermissions'
import { formatUTC } from '@/utils/format'
import type { IContentConfig } from './type'

interface IProps {
  contentConfig: IContentConfig
}

const props = defineProps<IProps>()

const emit = defineEmits(['newClick', 'editClick'])

// 0.获取增删改查权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isEdit = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// * 定义函数发送网络请求
const fetchPageListData = (searchForm: any = {}) => {
  if (!isQuery) return

  // 获取offset,size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { offset, size }

  // 发起网络请求
  const queryInfo = { ...info, ...searchForm }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 1.发起action, 请求数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 2. 获取usersList信息
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3. 页面相关逻辑
const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

// 4. 删除和编辑操作
const handleDeleteClick = (id: number) => {
  console.log('delete', id)
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
const handleEditClick = (itemData: any) => {
  console.log('edit', itemData)
  emit('editClick', itemData)
}

const handleNewUserClick = () => {
  emit('newClick')
}

// 监听store中的action
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

defineExpose({ fetchPageListData })
</script>

<template>
  <div class="content">
    <div class="head">
      <h3>{{ contentConfig?.header?.title ?? '用户列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">
        {{ contentConfig?.header?.btnTitle ?? '新建用户' }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        stripe
        v-bind="props.contentConfig.childrenTree"
        style="width: 100%"
      >
        <template v-for="item in props.contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  icon="Edit"
                  text
                  size="small"
                  type="primary"
                  @click="handleEditClick(scope.row)"
                  v-if="isEdit"
                >
                  编辑
                </el-button>
                <el-button
                  icon="Delete"
                  text
                  size="small"
                  type="danger"
                  @click="handleDeleteClick(scope.row.id)"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination" v-if="pageTotalCount">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
    }

    .el-button--small {
      padding: 5px 8px;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
