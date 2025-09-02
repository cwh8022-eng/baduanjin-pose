
// shim-tmPose.js
// 讓 teachablemachine-pose 在初始化時能找到 Pt.fromPixels
(function () {
  // 確保已載入 tfjs
  if (typeof window.tf === 'undefined') {
    console.error('[shim] TensorFlow.js (tf) is not loaded yet.');
    return;
  }
  // teachablemachine-pose 內部用 Pt.fromPixels；把 Pt 指到 tf
  if (!window.Pt) {
    window.Pt = window.tf;
  }
  // 舊版流程可能呼叫 tf.fromPixels；若不存在就橋接到 tf.browser.fromPixels
  if (typeof tf.fromPixels !== 'function' &&
      tf.browser && typeof tf.browser.fromPixels === 'function') {
    tf.fromPixels = tf.browser.fromPixels;
  }
  console.log('[shim] Pt set to tf, fromPixels shimmed:', typeof tf.fromPixels === 'function');
})();
