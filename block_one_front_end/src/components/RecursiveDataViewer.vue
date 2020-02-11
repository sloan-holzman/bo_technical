<template>
  <div>
    <div class="row">
      <template v-if="expandable && showColon">
        <v-icon @click="toggleExpanded" class="icon-expander">{{
          expanded ? "fa-chevron-down" : "fa-chevron-up"
        }}</v-icon>
      </template>
      <span class="indent" :style="{ width: indent + 'px' }" v-else></span>
      <span class="label">{{ label }}</span>
      <span class="label-colon" v-if="showColon">: &nbsp;</span>
      <span class="value" v-if="!expandable"> {{ value }}</span>
    </div>
    <div v-if="expanded">
      <div class="row" v-for="(subValue, subKey) in value" :key="subKey">
        <div class="indent" :style="{ width: indent + 'px' }"></div>
        <recursive-data-viewer
          :label="subKey"
          :value="subValue"
          :indent="indent"
        ></recursive-data-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
export default {
  name: "RecursiveDataViewer",
  props: {
    label: { type: [String, Number], default: "" },
    value: { type: [Object, Array, String, Number], default: "" },
    indent: { type: Number, default: 24 },
    defaultExpanded: { type: Boolean, default: false }
  },
  data() {
    return { expanded: this.defaultExpanded };
  },
  computed: {
    expandable() {
      return this.value && this.value instanceof Object;
    },
    showColon() {
      if (!this.expandable) {
        return true;
      }
      return !isEmpty(this.value);
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style scoped>
.icon-expander {
  min-width: 22px;
}
.row {
  display: flex;
  flex-direction: row;
}
.indent {
  height: 1em;
}
.label {
  font-weight: bold;
  padding-left: 1em;
}
.label-colon {
  font-weight: bold;
}
.value {
  max-width: 50vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
