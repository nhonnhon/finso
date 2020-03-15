import swal from 'sweetalert2'
import _ from 'lodash'
import { Lang } from 'constants/language'

export { Alert }

function Alert(head, body, onClose, clickConfirm, showCloseButton, showCancelButton = false) {
  const message = !_.isEmpty(body) ? body : ''

  swal({
    title: !_.isEmpty(head) ? head : 'Server Error...',
    html: '<pre style="white-space: pre-wrap;">' + message + '</pre>',
    imageUrl: '',
    imageWidth: 76,
    imageHeight: 76,
    imageAlt: '',
    customClass: '',
    showCloseButton: showCloseButton ? showCloseButton : true,
    confirmButtonClass: 'btn green text white',
    cancelButtonClass: 'btn white h4',
    buttonsStyling: false,
    confirmButtonText: Lang.ok,
    focusConfirm: true,
    focusCancel: true,
    showCancelButton: showCancelButton ? showCancelButton : false,
    onClose,
    cancelButtonText: Lang.cancel,
  }).then(confirm => {
    if (confirm && confirm.value) {
      clickConfirm && clickConfirm()
    }
  })
}
