<template id="modal-template">
  <transition name="modal">
    <div class="fixed z-9998 top-0 left-0 w-full h-full table transition-opacity modal-mask">
      <div class="table-cell align-middle">
        <div class="w-2/3 m-auto p-2 bg-white rounded shadow transition-all">
          <div class="text-blue-600 text-2xl font-bold">
            <slot name="header"> default header </slot>
          </div>

          <div class="flex justify-center py-3">
            <slot name="body"> default body </slot>
          </div>

          <div>
            <slot name="footer">
              default footer
              <button class="float-right" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style>
.modal-mask {
  background-color: rgba(0, 0, 0, 0.5);  
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>