<template>
    <!-- 商品刪除 start -->
    <div ref="modal" class="modal fade" id="deleteModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-white bg-danger" data-bs-theme="dark">
                    <h5 class="modal-title fs-6">商品刪除</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>確定要刪除此{{ data.item }}嗎?</p>
                    <p>
                        <strong>{{ data.text }}</strong>
                    </p>
                    <p><small class="text-danger">{{ data.item }}刪除後將無法恢復</small></p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn btn-outline-danger" @click="deleteMethod()">
                        確定
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- 商品刪除 end -->
</template>

<script>
import { Modal } from 'bootstrap'
export default {
    props: ['data'],
    data () {
        return {
            modal: {}
            // data: {
            //     title: '',
            //     item: ''
            // }
        }
    },
    mounted () {
        this.modal = new Modal((this.$refs.modal), {
            keyboard: false
        })
    },
    methods: {
        show () {
            this.modal.show()
        },
        hide () {
            this.modal.hide()
        },
        deleteMethod () {
            this.$emit('delete')
        }
    }
}
</script>
