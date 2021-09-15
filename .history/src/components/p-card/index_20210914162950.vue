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
      <div class="card-body-content"
        :style="bodyStyle">
        <slot name='body'></slot>
      </div>
      <div class="card-footer"
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
  .p-page-container {
          padding: 0px 50px;
          .p-search-bar {
            margin: 0 10px;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            -webkit-transition: 0.3s;
            transition: 0.3s;

            .el-col {
              height: 50px;
            }

            .p-border-r {
              border-right: 2px solid $theme-bg-color;
            }

            .p-search-btn {
              height: 100%;
              width: 100%;

              .el-button {
                width: 100%;
                text-align: center;
                margin: 5px 0 0 0;
              }
            }

            .el-form-item {
              margin-top: 5px;
              width: 100%;

              .el-form-item__content {
                width: 100%;
              }

              .el-select {
                width: 100%;
              }
            }

            .el-input-group__prepend {
              border: none;
              background-color: transparent;
              padding: 0 10px 0 40px;
            }

            .el-input-group__append {
              border: none;
              background-color: transparent;
            }

            .el-input__inner {
              height: 40px;
              line-height: 40px;
              border: none;
              background-color: transparent;
              font-weight: bold;
              color: #484d5e;
              font-size: 14px;
            }

            .el-select__caret {
              font-size: 16px !important;
            }

            .line {
              width: 1px;
              height: 26px;
              background-color: #c5c5c5;
              margin-left: 14px;
            }
          }

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
        }
</style>
