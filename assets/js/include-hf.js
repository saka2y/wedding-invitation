const el_inc_h = document.querySelector('[src*="include-hf.js"]');
const el_inc_h_src = el_inc_h.getAttribute('src');
const DOMAIN = el_inc_h_src.replace('/assets/js/include-hf.js', '');
console.log(DOMAIN);



let html_h = `
<header class="l-header">
  <div class="l-header__inner">



    <div class="l-headerSp__btn">
      <span class="bar bar-top"></span>
      <span class="bar bar-middle"></span>
      <span class="bar bar-bottom"></span>
    </div>
  </div>
  <div class="l-headerSpMenu">
    <ul class="l-headerSpMenuList">
      <li class="l-headerSpMenuList__item">
        <a href="#messege" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_messege.png" alt="メッセージ">
        </a>
      </li>
      <li class="l-headerSpMenuList__item">
        <a href="#Host" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_host.png" alt="プロフィール">
        </a>
      </li>
      <li class="l-headerSpMenuList__item">
        <a href="#infomation" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_infomation.png" alt="日時">
        </a>
      </li>
      <li class="l-headerSpMenuList__item">
        <a href="#VenueAccess" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_venueaccess.png" alt="アクセス">
        </a>
      </li>
      <li class="l-headerSpMenuList__item">
        <a href="#Dresscode" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_dresscode.png" alt="ドレスコード">
        </a>
      </li>
      <li class="l-headerSpMenuList__item">
        <a href="#gift" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_giftmoney.png" alt="ご祝儀について">
        </a>
      </li>
      <li class="l-headerSpMenuList__item">
        <a href="#rsvp" class="l-headerSpMenuList__itemLink">
          <img class="l-headerSpMenuList__itemLinkImg" src="/assets/img/top/menu_rsvp.png" alt="出席確認">
        </a>
      </li>
    </ul>
  </div>
  <div class="l-header__bottom">
    <div class="l-inner">
      <ul class="l-headerNaviList">
      <li class="l-headerNaviList__item"><a href="#messege" class="l-headerNaviList__itemLink">messege</a></li>
      <li class="l-headerNaviList__item"><a href="#Host" class="l-headerNaviList__itemLink">Host</a></li>
      <li class="l-headerNaviList__item"><a href="#infomation" class="l-headerNaviList__itemLink">infomation</a></li>
      <li class="l-headerNaviList__item"><a href="#VenueAccess" class="l-headerNaviList__itemLink">Venue Access</a></li>
      <li class="l-headerNaviList__item"><a href="#Dresscode" class="l-headerNaviList__itemLink">Dress code</a></li>
      <li class="l-headerNaviList__item"><a href="#gift" class="l-headerNaviList__itemLink">ご祝儀について</a></li>
      <li class="l-headerNaviList__item"><a href="#rsvp" class="l-headerNaviList__itemLink">RSVP</a></li>
      </ul>
    </div>
  </div>
</header>

`;



let html_f = `


<a href="#" class="pagetop">
  <img class="pagetop_icon" src="/assets/img/top/topicon@2x.png" alt="ページ上部へ">
</a>

<footer class="l-footer">
  <div class="l-inner">
    
  </div>

  <div class="l-copyRight">
    <small class="l-Copyright__text">thank you for always supporting us  ...<br>
    <a target="_blank"style="color: #fff; href="https://icons8.com/icon/80355/%E3%82%B9%E3%82%BF%E3%83%BC">スター</a> icon by <a target="_blank" style="color: #fff; href="https://icons8.com">Icons8</a></small>
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

// SPメニュー
const spBtnCollection = document.getElementsByClassName('l-headerSp__btn');
const spMenuCollection = document.getElementsByClassName('l-headerSpMenu');
const spMenuListItemCollection = document.getElementsByClassName('l-headerSpMenuList__itemLink');
const body = document.body;

spBtnCollection[0].addEventListener('click', function () {
  this.classList.toggle('active');
  spMenuCollection[0].classList.toggle('active');
  body.classList.toggle('active');
});

spMenuListItemCollection[0].addEventListener('click', function () {
  this.classList.toggle('active');
  spMenuCollection[0].classList.toggle('active');
  body.classList.toggle('active');
});

$('.l-headerSpMenuList__item a').on('click',function() {
  $('.l-headerSpMenu').removeClass('active');
} );

// pagetop
const pagetopCollection = document.getElementsByClassName('pagetop');
console.log(pagetopCollection[0]);
pagetopCollection[0].setAttribute('href', '#');


