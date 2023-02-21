<script setup lang="ts">
import { ref } from 'vue'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

const emit = defineEmits(['newUserClick', 'editClick'])

// * 定义函数发送网络请求
const fetchUserListData = (searchForm: any = {}) => {
  // 获取offset,size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { offset, size }

  // 发起网络请求
  const queryInfo = { ...info, ...searchForm }
  systemStore.postUserListAction(queryInfo)
}

// 1.发起action, 请求数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 2. 获取usersList信息
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3. 页面相关逻辑
const handleSizeChange = () => {
  fetchUserListData()
}
const handleCurrentChange = () => {
  fetchUserListData()
}

// 4. 删除和编辑操作
const handleDeleteClick = (id: number) => {
  console.log('delete', id)
  systemStore.deleteUserByIdAction(id)
  currentPage.value = 1
}
const handleEditClick = (itemData: any) => {
  console.log('edit', itemData)
  emit('editClick', itemData)
  currentPage.value = 1
}

const handleNewUserClick = () => {
  emit('newUserClick')
  currentPage.value = 1
}

defineExpose({ fetchUserListData })
</script>

<template>
  <div class="content">
    <div class="head">
      <h3>用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" stripe style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" prop="name" label="用户名" width="120px" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="120px" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
        <el-table-column align="center" prop="enable" label="状态" width="80px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'success' : 'danger'"
              disabled
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              icon="Edit"
              text
              size="small"
              type="primary"
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              icon="Delete"
              text
              size="small"
              type="danger"
              @click="handleDeleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
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
