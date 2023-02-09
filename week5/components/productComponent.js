export default {
  data() {
    return {
      num: 1,
      modal: {},
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    show() {
      this.modal.show();
    },
  },
  props: ["product", "isNew"],
  template: `<div ref="modal" class="modal fade">
  <div class="modal-dialog modal-lg">
    <div class="modal-content border-0">
      <div class="modal-header bg-secondary text-white">
        <h5 id="productModalLabel" class="modal-title m-0">
          商品內容
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="product-img border" :style="{backgroundImage:'url(' + product.imageUrl + ')'}"></div>
              <div class="d-flex mt-4">
                <div class="product-small-img border me-4" :style="{backgroundImage:'url(' + product.imageUrl + ')'}"></div>
                <div class="product-small-img border me-4" :style="{backgroundImage:'url(' + product.imageUrl + ')'}"></div>
                <div class="product-small-img border " :style="{backgroundImage:'url(' + product.imageUrl + ')'}"></div>
              </div>
            </div>
            <div class="col">
              <p>首頁 / 商品 / {{product.category}}</p>
              <h3>{{product.title}}</h3>
              <div>
                <p>{{product.description}}</p>
                <p>{{product.content}}</p>
                <p class="mt-4">
                  <small class="fs-4">$ {{product.price}} 元</small>
                  <small class="ms-2 text-secondary">/ {{product.unit}}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>`,
};
