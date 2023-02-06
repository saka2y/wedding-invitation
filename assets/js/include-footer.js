var host = location.host;
var req_footer = new XMLHttpRequest();
var footer = document.getElementById('include-footer');

req_footer.onreadystatechange = function() {
  if (req_footer.readyState == 4) {
  // 通信の完了時
    if (req_footer.status == 200) {
    // 通信の成功時
      // console.log('success', req_footer.responseText);
      footer.insertAdjacentHTML('beforeend', req_footer.responseText);
    }
  // }else{
    // result.innerHTML = "通信中...";
  }
}
console.log(host);
req_footer.open('GET', host+'/assets/include/footer.html', true);
req_footer.send(null);
