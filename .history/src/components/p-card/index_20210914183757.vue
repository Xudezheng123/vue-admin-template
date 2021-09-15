<template>
  <div>
    <el-card :shadow="shadow">
      <div slot="header">
        <div class="card-header">
          <div class="card-header__left">
            <span class="p-tab-item p-tab-selected"> {{title}}
              <slot name='header-title'></slot>
            </span>
            <slot name='header-subtitle'></slot>
          </div>
          <div class="card-header__right">
            <slot name='header-right'></slot>
          </div>
        </div>
      </div>
      <div
        class="card-body-content"
        :style="bodyStyle">
        <slot name='body'></slot>
      </div>
      <div
        class="card-footer"
        v-if='$slots.footer'>
        <slot name='footer'></slot>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'p-card',
  props: {
    title: {
      type: String,
      default: ''
    },
    bodyStyle: {
      type: Object,
      default() {
        return {
          padding: ' 20px 20px 0'
        }
      }
    },
    shadow: {
      type: String,
      default: 'never'
    }
  }
}
</script>
<style lang="scss">
  // @import '~@/styles/theme-base.scss';
  .el-card {
    margin: 0 0 20px 0;

    .card-header {
      clear: both;
      height: 17px;

      .card-header__left {
        float: left;
      }

      .card-header__right {
        float: right;

        .el-button {
          margin-top: -3px !important;
          font-weight: bold;
        }
      }
    }

    .el-card__body {
      padding: 0 !important;
    }

    .card-body {
      margin: 0 10px;
      min-height: 300px;

      .el-table-column--selection {
        .cell {
          padding-left: 14px !important;
        }
      }

      .el-table {
        font-size: 12px;
      }
    }

    .card-footer {
      margin: 20px 0;
    }
  }
</style>
