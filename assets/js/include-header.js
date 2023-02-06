//
var el_inc_h = document.querySelector('[src*="include-header.js"]');
var el_inc_h_src = el_inc_h.getAttribute('src');
var domain_ = el_inc_h_src.replace('/assets/js/include-header.js', '');
console.log(domain_);

const DOMAIN = domain_;
// const DOMAIN = 'https://atodekaeru';

let html_h = `
<header class="l-header">

  <ul class="l-headerNaviList">
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">messege</a></li>
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">Host</a></li>
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">infomation</a></li>
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">Venue Access</a></li>
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">Dress code</a></li>
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">ご祝儀について</a></li>
    <li class="l-headerNaviList__item"><a href="" class="l-headerNaviList__itemLink">RSVP</a></li>
  </ul>

  <div class="l-headerSp__btn">
    <span class="bar bar-top"></span>
    <span class="bar bar-middle"></span>
    <span class="bar bar-bottom"></span>
  </div>
</header>

<div class="l-headerSpMenu">
<a href="/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_messege.png" alt="メッセージ">
</a>
</li>
<li class="l-headerSpMenuList__item">
<a href="/about/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_host.png" alt="プロフィール">
</a>
</li>
<li class="l-headerSpMenuList__item">
<a href="/open-account/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_infomation.png" alt="日時">
</a>
</li>
<li class="l-headerSpMenuList__item">
<a href="../service/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_venueaccess.png" alt="アクセス">
</a>
</li>
<li class="l-headerSpMenuList__item">
<a href="../point/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_dresscode.png" alt="ドレスコード">
</a>
</li>
<li class="l-headerSpMenuList__item">
<a href="../fees/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_giftmoney.png" alt="ご祝儀について">
</a>
</li>
<li class="l-headerSpMenuList__item">
<a href="../campaign/" class="l-headerSpMenuList__itemLink">
<img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_rsvp.png" alt="出席確認">
</a>
</li>
</ul>
</div>
`;



let html_f = `

<a href="#" class="pagetop">
  <img class="pagetop_icon" src="/assets/img/top/topicon@2x.png" alt="ページ上部へ">
</a>

<footer class="l-footer">
  <div class="l-copyRight">
    <small class="l-Copyright__text">thank you for always supporting us  ...</small>
  </div>
  <div class="l-footerAppDl">
    <a href="#l-appDl" class="l-footerAppDl__link">
      アプリダウンロードはこちら
    </a>
  </div>
</footer>
`

// ルート書き換え
html_h = html_h.split('src="/').join(`src="${DOMAIN}/`);
html_h = html_h.split('href="/').join(`href="${DOMAIN}/`);
html_h = html_h.split('href=""').join(`href="${DOMAIN}/"`);

html_f = html_f.split('src="/').join(`src="${DOMAIN}/`);
html_f = html_f.split('href="/').join(`href="${DOMAIN}/`);
html_f = html_f.split('href=""').join(`href="${DOMAIN}/"`);

// 出力
let el_h = document.getElementById('include-header');
el_h.insertAdjacentHTML('beforeend', html_h);


let el_f = document.getElementById('include-footer');
el_f.insertAdjacentHTML('beforeend', html_f);

