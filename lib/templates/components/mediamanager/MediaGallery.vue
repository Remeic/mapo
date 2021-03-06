<template>
  <div class="pa-4">
    <v-row v-if="selection.length" class="selection mb-4 mx-1">
      <v-col
        v-for="media in selection"
        :key="media.file"
        class="d-flex"
        cols="2"
        sm="1"
        md="1"
        @click.stop="selectMedia(media)"
      >
        <v-img
          :src="media.file"
          :lazy-src="media.thumbnail"
          aspect-ratio="1"
          class="grey lighten-2 elevation-4 selection__item"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row
      v-if="!medias.length"
      class="d-flex flex-column"
      dense
      align="center"
      justify="center"
    >
      <v-icon size="60"> mdi-alert-circle-outline </v-icon>
      <p>No media fund...</p>
    </v-row>
    <v-row v-if="medias.length">
      <v-col
        v-for="media in medias"
        :key="media.file"
        class="img-container"
        cols="6"
        sm="3"
        md="2"
      >
        <v-btn
          @click.stop="editMedia(media)"
          icon
          small
          :ripple="false"
          color="white"
          class="img-container__btn"
        >
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>

        <v-img
          v-bind:class="{ selected: isSelected(media) }"
          :src="media.file"
          :lazy-src="media.thumbnail"
          aspect-ratio="1"
          class="grey lighten-2 elevation-4"
          @click.stop="selectMedia(media)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-if="pages > 1"
          v-model="currentPage"
          :length="pages"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.img-container {
  display: flex;
  position: relative;
  &__btn {
    position: absolute;
    z-index: 1;
    right: 12px;
    bottom: 12px;
    background: #1e1e1ea1;
    border-radius: 50% 0 0;
  }
}
.selection {
  border-radius: 5px;
  background: #79797908;
  box-shadow: inset 5px 5px 18px #151515, inset -5px -5px 18px #151515;
  &__confirm {
    margin: auto 0 auto auto;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
  }
  &__item:hover::before {
    content: "\F0156";
    font: normal normal normal 30px/1 "Material Design Icons";
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #00000082;
    border: solid #ffffff6e 2px;
  }
}
.selected {
  &::after {
    content: "";
    background: #56be5057;
    border: solid #5bc853 2px;
    width: 100%;
    height: 100%;
  }
}
.theme--light .selection {
  box-shadow: inset 5px 5px 10px #e3e3e3, inset -5px -5px 10px #e3e3e3;
}
</style>

<script>
export default {
  data() {
    return {
      selection: [],
    };
  },
  props: {
    medias: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    pages: {
      type: Number,
      default: 1,
    },
    select: {
      defaut: "none",
      type: String,
      validator(value) {
        return ["none", "single", "multi"].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("pageChange", val);
      },
    },
  },
  methods: {
    isSelected(media) {
      return this.selection.findIndex((m) => m.id === media.id) !== -1;
    },
    selectMedia(media) {
      if (this.select == "single") {
        this.$emit("selectionChange", media);
      } else if (this.select == "multi") {
        const index = this.selection.findIndex((m) => m.id === media.id);
        index == -1
          ? this.selection.push(media)
          : this.selection.splice(index, 1);
        this.selection = this.selection.slice();
        this.$emit("selectionChange", this.selection);
      }
    },
    editMedia(media) {
      this.$emit("editMedia", media);
    },
  },
};
</script>
