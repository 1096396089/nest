<template>
  <div>
    <avue-crud
      :data="data.data"
      :option="option"
      :page.sync="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changPage"
      @sort-change="changeSort"
      @search-change="search"
      @refresh-change="refreshChange"
    >
      <template slot="bodyForm" slot-scope="scope">
        <avue-ueditor
          v-model="scope.row.body"
          :options="options"
        ></avue-ueditor>
      </template>

      <template slot="publishtimeForm" slot-scope="scope">
        <avue-date
          v-model="scope.row.publishtime"
          format="yyyy年MM月dd日 hh:mm:ss"
          placeholder="请选择日期"
        ></avue-date>
      </template>
    </avue-crud>
  </div>
</template>

<script>
export default {
  props: {
    resource: {},
  },
  data() {
    return {
      options: {
        //avue 图片上传
        action: "",
      },
      data: {},
      option: {},
      page: {
        pageSize: 20,
        pageSizes: [10, 20, 50, 100],
        total: 1,
      },
      query: {
        sort: { _id: -1 },
      },
    };
  },
  methods: {
    async search(where, done) {
      for (let k in where) {
        const filed = this.option.column.find((v) => v.prop === k);
        if (filed.regex) {
          where[k] = { $regex: where[k] };
        }
      }
      //模糊
      // where.name = { $regex: where.name };

      this.query.where = where;
      this.fetch();
      done();
    },

    async changeSort({ prop, order }) {
      if (!order) {
        this.query.sort = null;
      } else {
        this.query.sort = {
          [prop]: order === "ascending" ? 1 : -1,
        };
      }
      this.fetch();
    },
    async changPage({ pageSize, currentPage }) {
      this.query.page = currentPage;
      this.query.limit = pageSize;
      this.fetch();
    },
    async fetchOption() {
      const res = await this.$http.get(`${this.resource}/option`);
      this.option = res.data;
    },
    async fetch() {
      const res = await this.$http.get(`${this.resource}`, {
        params: {
          query: this.query,
        },
      });
      this.data = res.data;
      this.page.total = res.data.total;
    },
    async create(row, done, loading) {
      await this.$http.post(`${this.resource}`, row);
      this.$message.success("创建成功");
      this.fetch();
      done();
    },
    async update(row, done, loading) {
      const data = JSON.parse(JSON.stringify(row));
      delete data.$index;
      delete data.$author;
      delete data.$release;
      await this.$http.put(`${this.resource}/${row._id}`, data);
      this.$message.success("更新成功");
      this.fetch();
      loading();
      done();
    },
    async remove(row) {
      try {
        await this.$confirm("是否删除");
      } catch (e) {
        return;
      }
      await this.$http.delete(`${this.resource}/${row._id}`);
      this.$message.success("删除成功");
      this.fetch();
    },
    refreshChange() {
      this.fetch();
    },
  },
  created() {
    this.fetchOption();
    this.fetch();
  },
};
</script>
