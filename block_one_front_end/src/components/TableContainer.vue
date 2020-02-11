<template>
  <div
    class="table_wrapper align-items-center"
    :class="{ 'justify-content-center': !blocksAlreadyLoaded }"
  >
    <v-btn
      v-if="!loading && !blocksAlreadyLoaded"
      x-large
      @click="loadBlockTable"
      >Load the most recent {{ blocksToLoad }} blocks</v-btn
    >
    <div v-else-if="!blocksAlreadyLoaded" class="align-items-center">
      <v-progress-circular
        indeterminate
        color="blue"
        :size="loadingSize"
        width="20"
      />
      <p class="mt-5">Please wait as we load the latest blocks...</p>
    </div>
    <div v-else class="mt-5">
      <h1 class="mb-3">Most recent blocks</h1>
      <div class="scroll">
        <v-data-table
          :headers="headers"
          :items="mostRecentBlocks"
          :items-per-page="10"
          v-if="blocksAlreadyLoaded"
          show-expand
          :expanded="expanded"
          @click:row="expandRow"
          class="elevation-2"
          single-expand
          :loading="loading"
          expand-icon="fa-chevron-up"
          hide-default-footer
        >
          <template v-slot:item.timestamp="{ item }">
            {{ formatTimeStamp(item.timestamp) }}
          </template>
          <template v-slot:item.transactions="{ item }">
            {{ getActionCount(item) }}
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length + 1">
              <div class="expansion_panel_wrapper">
                <RecursiveDataViewer
                  :value="item"
                  label="Block Details"
                  :default-expanded="true"
                />
              </div>
            </td>
          </template>
        </v-data-table>
      </div>
      <v-btn class="mt-3" :disabled="loading" @click="loadBlockTable">{{
        loading ? "Refreshing..." : "Refresh"
      }}</v-btn>
    </div>
  </div>
</template>

<!--
  TODO:
    - bonus!
    - sort out mobile (extra credit)
    - sort out border and scrolling
-->

<script>
import moment from "moment";
import RecursiveDataViewer from "./RecursiveDataViewer";
import fetchMostRecentBlocks from "../modules/fetch-most-recent-blocks";
import getActionCount from "../modules/get-action-count";

export default {
  name: "TableContainer",
  components: {
    RecursiveDataViewer
  },
  props: {},
  inject: ["errorSnack", "successSnack"],
  data: function() {
    return {
      blocksToLoad: 10,
      width: 0,
      loading: false,
      mostRecentBlocks: [],
      expanded: [],
      headers: [
        {
          text: "Hash",
          sortable: true,
          value: "id"
        },
        { text: "Timestamp", value: "timestamp", sortable: true },
        {
          text: "Number of Actions",
          sortable: true,
          value: "transactions"
        }
      ]
    };
  },
  computed: {
    loadingSize() {
      return Math.min(this.width / 3, 200);
    },
    blocksAlreadyLoaded() {
      return !!this.mostRecentBlocks.length;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResizeSetWidth);
    this.onResizeSetWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResizeSetWidth);
  },
  methods: {
    expandRow(row) {
      const rowIndex = this.expanded.findIndex(
        expandedRow => expandedRow.id === row.id
      );
      rowIndex > -1
        ? this.expanded.splice(rowIndex, 1)
        : this.expanded.push(row);
    },
    onResizeSetWidth() {
      this.width = this.$el.clientWidth;
    },
    loadBlockTable() {
      this.loading = true;
      fetchMostRecentBlocks(this.blocksToLoad)
        .then(res => {
          this.mostRecentBlocks = res.data;
        })
        .catch(err => {
          this.errorSnack(
            "Sorry, there was a problem loading the blocks.  Please refresh the page and try again."
          );
          // eslint-disable-next-line no-console
          console.error(err);
        })
        .finally(() => {
          this.expanded = [];
          this.loading = false;
        });
    },
    formatTimeStamp(timestamp) {
      return moment(timestamp).format("MMM DD, YYYY HH:mm:ss UTC");
    },
    getActionCount(block) {
      return getActionCount(block);
    }
  }
};
</script>

<style scoped>
.table_wrapper {
  margin: auto 10%;
  height: 100vh;
}

.align-items-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.v-data-table >>> .v-data-table-header {
  background-color: #42a5f5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

.v-data-table >>> th span {
  color: white;
}

.expansion_panel_wrapper {
  padding-left: 5%;
  max-height: 30vh;
  min-height: 75px;
  overflow: scroll;
}

.scroll {
  max-height: 60vh;
  overflow: scroll;
}
</style>
