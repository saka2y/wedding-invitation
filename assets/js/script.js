!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,a=-1,n=function(t){return parseFloat(t)||0},o=function(e){var a=t(e),o=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),i=r.length>0?r[r.length-1]:null;null===i?r.push(e):1>=Math.floor(Math.abs(o-a))?r[r.length-1]=i.add(e):r.push(e),o=a}),r},r=function(e){var a={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(a,e):("boolean"==typeof e?a.byRow=e:"remove"===e&&(a.remove=!0),a)},i=t.fn.matchHeight=function(e){var a=r(e);if(a.remove){var n=this;return this.css(a.property,""),t.each(i._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!a.target||(i._groups.push({elements:this,options:a}),i._apply(this,a)),this};i.version="0.7.2",i._groups=[],i._throttle=80,i._maintainScroll=!1,i._beforeUpdate=null,i._afterUpdate=null,i._rows=o,i._parse=n,i._parseOptions=r,i._apply=function(e,a){var s=r(a),c=t(e),h=[c],l=t(window).scrollTop(),p=t("html").outerHeight(!0),u=c.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(c.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"flex"!==a&&"inline-flex"!==a&&(a="block"),e.data("style-cache",e.attr("style")),e.css({display:a,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),h=o(c),c.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(h,function(e,a){var o=t(a),r=0;if(s.target)r=s.target.outerHeight(!1);else{if(s.byRow&&o.length<=1){o.css(s.property,"");return}o.each(function(){var e=t(this),a=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var o={display:n};o[s.property]="",e.css(o),e.outerHeight(!1)>r&&(r=e.outerHeight(!1)),a?e.attr("style",a):e.css("display","")})}o.each(function(){var e=t(this),a=0;!(s.target&&e.is(s.target))&&("border-box"!==e.css("box-sizing")&&(a+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),a+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,r-a+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),i._maintainScroll&&t(window).scrollTop(l/p*t("html").outerHeight(!0)),this},i._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var a=t(this),n=a.attr("data-mh")||a.attr("data-match-height");n in e?e[n]=e[n].add(a):e[n]=a}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){i._beforeUpdate&&i._beforeUpdate(e,i._groups),t.each(i._groups,function(){i._apply(this.elements,this.options)}),i._afterUpdate&&i._afterUpdate(e,i._groups)};i._update=function(n,o){if(o&&"resize"===o.type){var r=t(window).width();if(r===e)return;e=r}n?-1===a&&(a=setTimeout(function(){s(o),a=-1},i._throttle)):s(o)},t(i._applyDataApi);var c=t.fn.on?"on":"bind";t(window)[c]("load",function(t){i._update(!1,t)}),t(window)[c]("resize orientationchange",function(t){i._update(!0,t)})});

// 375px未満対応を終わらせるJS
!function() {
  var viewport = document.querySelector('meta[name="viewport"]');
  function adjustViewport () {
    var value = window.outerWidth >= 375 ? 'width=device-width,initial-scale=1' : 'width=375';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  addEventListener('resize', adjustViewport, false);
  adjustViewport();
}();

// SPサイズかどうか
function is_sp_width() {
  return window.innerWidth < 768;
}


$(function(){

  // スムーススクロール
  const urlHash = location.hash;
  if(urlHash){
    $('body,html').stop().scrollTop(0);
    const $target = $(urlHash);
    if($target.length) {
      setTimeout(function(){
          let position = $target.offset().top ;
          $('body,html').animate({scrollTop:position}, 400, 'swing');
      },900);
    }
  }

  // $('a[href^="#"]').on('click', function() {
  //   const href = $(this).attr('href');
  //   const $target = $(href !== '#' ? href : 'html');
  //   if($target.length) {
  //     let position = $target.offset().top;
  //     // ヘッダー追従の場合は、ヘッダー分調整する
  //     position = $target.offset().top - $('.header.js-fixed').height();
  //     if($target.hasClass('js-inview') && !$target.hasClass('js-inview--show')) {
  //       position -= 80;
  //     }
  //     $('body,html').animate({scrollTop:position}, 400, 'swing');
  //     return false;
  //   }
  // });

});

// inview
const inview = {
  y: 0,

  set_y: function() {
    // 画面の下から30%にくると表示するようにする
    this.y = $(window).height() * 0.3;
  },

  init: function() {

    // 最初に一回実行（現在一より上のものは表示する）
    this.main();

    // 実行してから、ずらし距離をセットする
    this.set_y();

    $(window).resize(function(){
      // リサイズごとに値を変更する
      inview.set_y();

    }).scroll(function(){
      // スクロールごとに実行
      inview.main();
    });
  },

  main: function() {
    const _y = this.y;
    $('.js-inview').each(function(){
      // console.log($(this).get(0).className, $(this).offset().top);
      if($(window).scrollTop() + $(window).height() - _y  > $(this).offset().top) {
        $(this).addClass('js-inview--show');
      }
    });
  }
}

$(function(){
  inview.init();

  //アコーディオン
  $('.js-accodion__cont:not([data-acc-sp])').hide();
  $('.js-accodion__cont[data-acc-sp]').addClass('u-none_sp');

  $('.js-accodion__click').on('click', function(e) {
    $click = $(this);
    let key = $click.attr('data-acc');
    let attr = 'data-acc';
    if(!key && is_sp_width()) {
      key = $click.attr('data-acc-sp');
      attr = 'data-acc-sp';
    }
    if(!key && !is_sp_width()) {
      key = $click.attr('data-acc-pc');
      attr = 'data-acc-pc';
    }

    if(key) {
      e.preventDefault();

      $cont = $(`.js-accodion__cont[${attr}="${key}"]`);
      if(!$click.hasClass('js-open')) {
        $click.addClass('js-open');
        $cont.removeClass('u-none_sp u-none_pc').slideDown(100);
      }else{
        $click.removeClass('js-open');
        $cont.slideUp(100);
      }
    }
  });
});


// タブ
$(function(){
  $('.js-tab__click').click(function(e){
    e.preventDefault();
    let index = $('.js-tab__click').index($(this));

    $('.js-tab__click').removeClass('js-active');
    $(this).addClass('js-active');

    $('.js-tab__cont').removeClass('js-show');
    $('.js-tab__cont').eq(index).addClass('js-show');

    return false;
  })
});

// Contact
$(function() {
  $('.p-contactCol__title').matchHeight();
  $('.p-contactCol__list').matchHeight();
});

// Process
$(function() {
  $('.tab__content.-show').show();
  $('body').on('click', '.tab__title', function(){
    $(this).toggleClass('-active');
    $(this).next().toggleClass('-open').slideToggle()
  })
});

// top

// トップスライダー
function top_slider() {
  $('.p-topMV').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
}

$(function() {

  // if($('[data-module="slick-dot"]').length){
  // 	$('[data-module="slick-dot"]').slick({
  // 		dots: true,
	// 	  infinite: false,
	// 	  speed: 300,
	// 	  slidesToShow: 3,
	// 	  slidesToScroll: 1,
	// 	  responsive: [
	// 	    {
	// 	      breakpoint: 1024,
	// 	      settings: {
	// 	        slidesToShow: 3,
	// 	        slidesToScroll: 3,
	// 	        infinite: true,
	// 	        dots: true
	// 	      }
	// 	    },
	// 	    {
	// 	      breakpoint: 600,
	// 	      settings: {
	// 	        slidesToShow: 2,
	// 	        slidesToScroll: 2
	// 	      }
	// 	    },
	// 	    {
	// 	      breakpoint: 480,
	// 	      settings: {
	// 	        slidesToShow: 1,
	// 	        slidesToScroll: 1
	// 	      }
	// 	    }
	// 	  ]
  // 	})
  // }
});

// Page
console.log('page');

$(".slider").slick({
  arrows: false,
  autoplay: true,
  adaptiveHeight: true,
  centerMode: true,
  centerPadding: "15%",
  dots: true,
});

$(function() {
  $('.p-openaccAccor__head a').click(function() {
    $(this).parent().children().removeClass('open');
    $(this).toggleClass('open');
    $(this).parents('.p-openaccAccor').find('.p-openaccAccor__content').hide();
    $($(this).attr('href')).stop().fadeIn(400);
    $('html, body').animate({ scrollTop: $('.p-openaccAccor').offset().top }, 200);
    return false;
  });

  $('.p-openaccQA__q').click(function() {
    $(this).toggleClass('open');
    $(this).next('.p-openaccQA__a').stop().slideToggle(300);
  });
});

// info

// �ո������Ф�ȡ��
const get_infoDate = (ymd) => {
  if(ymd) {
    return {
      y : ymd.substr(0, 4),
      m : ymd.substr(4, 2),
      d : ymd.substr(6, 2)
    }
  }
  return {y: 0, m: 0, d: 0};
}

const get_pagerLink = (n) => {
  return (1 < n) ? location.pathname + `?page=${n}` : location.pathname ;
}

$(function(){
  // �ȥå�
  if($('.js-newsList__top').length) {
    const $infoList = $('.js-newsList__top');

    $.ajax({
      type: 'GET',
      url: '/data/info.json',
      cache: false
    }).done(function(jsonData) {
      const data = jsonData.list;
      const type = jsonData.type;

      let listHTML = '';
      let n = 0;
      for (let key in data) {
        const _item = data[key];

        // TOP�Ǥ�5���ޤ�
        if(n < 5) {
          const date = get_infoDate(_item['date']);
          const dateFormat = `${date['y']}.${date['m']}.${date['d']}`;

          listHTML += `
            <li>
              <a href="${_item['link']}">
                <div class="head">
                  <div class="date">${dateFormat}</div>
                  <div class="stt">${type[_item['type']]}</div>
                </div>
                <p class="text">${_item['title']}</p>
              </a>
            </li>
          `;
          n++;

        }else{
          break;
        }
      }

      listHTML = `<ul class="p-topNews__list">${listHTML}</ul>`;

      $infoList.append(listHTML);

    }).fail(function() {
      console.log('error');
    }).always(function() {
      // console.log('complete');
    });
  }

  // ��֪�餻һ�E
  if($('.js-infoList').length) {
    const $infoList = $('.js-infoList');
    const $infoPager = $('.js-infoList__pager');
    const thisType = $('.js-infoList').attr('data-filter');

    $.ajax({
      type: 'GET',
      url: '/data/info.json',
      cache: false
    }).done(function(jsonData) {
      const data = jsonData.list;
      const type = jsonData.type;
      const option = jsonData.option;
      const format = jsonData.format;
      console.log(format);

      // �ک`����`������O��
      let targetData = {};
      // ���ƥ�����
      if(thisType) {
        for (let key in data) {
          const _item = data[key];
          if(data[key]['type'] === thisType) {
            targetData[key] = _item;
          }
        }
      }else{
        // ȫ�ƤΈ���
        targetData = data;
      }

      const pagerNow = location.search ? parseInt(location.search.replace('?page=', '')) : 1 ;

      const listLength = Object.keys(targetData).length;
      const pagerNum = Math.ceil(listLength / option['numberposts']);

      // �ک`����`��HTML
      let $pager = $();

      // prev
      if(1 < pagerNow) {
        prev = format['pager_prev'];
        prev = prev.replace('{link}', get_pagerLink(pagerNow-1));
        $pager = $pager.add(prev);
      }

      for (let i = 0; i < pagerNum; i++) {
        const pagerlink = get_pagerLink(i+1);
        // const pagerlink = (0 < i) ? location.pathname + `?page=${i+1}` : location.pathname ;
        const pagerText = i + 1;

        let pagerHTML = format['pager'];
        pagerHTML = pagerHTML.replace('{link}', pagerlink);
        pagerHTML = pagerHTML.replace('{text}', pagerText);
        $pager = $pager.add(pagerHTML);
      }

      // next
      if(pagerNow < pagerNum) {
        next = format['pager_next'];
        next = next.replace('{link}', get_pagerLink(pagerNow+1));
        $pager = $pager.add(next);
      }

      // �ک`����`����
      $infoPager.append($(format['pager_wrap']).wrapInner($pager));
      $('.l-info__page').eq(pagerNow-1).addClass('active');

      // ��ʾ�������������μ�����ָ��
      const start = (pagerNow - 1) * option['numberposts'];
      const end = pagerNow * option['numberposts'] - 1;

      // �ꥹ��
      let listHTML = '';
      let n = 0;
      for (let key in targetData) {
        const _item = targetData[key];

        // ��������
        if(start <= n && n <= end) {
          // type��ָ�������ä����ϡ��������
          if((thisType != '' && thisType == _item['type']) || !thisType) {
            const date = get_infoDate(_item['date']);
            const dateFormat = `${date['y']}/${date['m']}/${date['d']}`;

            listHTML += `
              <dl class="l-info__content">
                <dt class="l-info__date">${dateFormat}<span class="l-info__tags ${_item['type']}">${type[_item['type']]}</span></dt>
                <dt class="l-info__text"><a href="${_item['link']}" class="l-info__link">${_item['title']}</a></dt>
              </dl>
            `;

          }
        }
        n++;
      }
      $infoList.append(listHTML);



    }).fail(function() {
      console.log('error');
    }).always(function() {
      // console.log('complete');
    });
  }
})

// campaign

const Campaign = {
  _data: {
    'closed': []
  },

  $closedListWrap: null,
  $closedBtnMore: null,

  // �ޤȤ�Ƴ����������
  closedNum: 9,

  // �K�ˤ��������ک`��γ���
  echo_closed_item_list: function() {
    if(Campaign['_data']['closed'].length) {
      const arr = Campaign['_data']['closed'].slice(0, Campaign.closedNum);
      Campaign['_data']['closed'].splice(0, Campaign.closedNum);

      // console.log(arr);
      // console.log(Campaign['_data']['closed']);

      // ����
      html = '';
      for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        html += this.get_closed_item(arr[i]);
      }
      Campaign.$closedListWrap.append(html);

      if(Campaign['_data']['closed'].length  === 0) {
        Campaign.$closedBtnMore.addClass('js-btn-invalid');
      }
    }

  },

  // �K�ˤ��������ک`��һ�ĤҤȤĤ�htmlȡ��
  get_closed_item: function(arr) {
    // console.log(arr);
    const date1 = this.get_campaignDate(arr['date'][0]);
    const date2 = this.get_campaignDate(arr['date'][1]);
    let date = Campaign['_data']['format']['date'];
    date = date.replace('date1', `${date1['y']}/${date1['m']}/${date1['d']}`);
    date = date.replace('date2', `${date2['y']}/${date2['m']}/${date2['d']}`);

    return `
      <div class="l-closed__item">
        <div class="l-closed__titleWrapper">
          <p class="l-closed__status">${Campaign['_data']['statusC']['closed']}</p>
          <h2 class="l-closed__title">
            ${arr['title']}
          </h2>
          <p class="l-closed__date">${date}</p>
        </div>

        <div class="l-closed__content">
          <img class="l-closed__contentImg--width" src="${arr['img']}" alt="">
        </div>
      </div>
    `;
  },

  // �ո������Ф�ȡ��
  get_campaignDate: function(ymd) {
    if(ymd) {
      return {
        y : ymd.substr(0, 4),
        m : ymd.substr(4, 2),
        d : ymd.substr(6, 2)
      }
    }
    return {y: 0, m: 0, d: 0};
  }
}

const get_campaignDate = (ymd) => {
  if(ymd) {
    return {
      y : ymd.substr(0, 4),
      m : ymd.substr(4, 2),
      d : ymd.substr(6, 2)
    }
  }
  return {y: 0, m: 0, d: 0};
}

$(function(){
  // �ȥåף�MV
  if($('.js-campaignCarousel__t').length) {
    const $campaignCarousel = $('.js-campaignCarousel__t');

    $.ajax({
      type: 'GET',
      url:'/data/campaign.json',
      cache: false
    }).done(function(jsonData) {
      const data = jsonData.top;
      // console.log(data);

      let listHTML = '';
      let carouselHTML = '';
      for (let key in data) {
        const _item = data[key];
        // console.log(_item);

        carouselHTML += `
          <div class="p-topMV__item">
            <a href="${_item['link']}">
              <span class="u-none_sp"><img src="${_item['img_top_pc']}" alt="${_item['alt']}"></span>
              <span class="u-none_pc"><img src="${_item['img_top_sp']}" alt="${_item['alt']}"></span>
            </a>
          </div>
        `;
      }

      $campaignCarousel.append(listHTML);

      // �����ک`��ȥåץ���`����
      $campaignCarousel
        .append(carouselHTML)
        .slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        });

    }).fail(function() {
      console.log('error');
    }).always(function() {
      // console.log('complete');
    });

  }

  // �ȥåף������ک`�����
  if($('.p-topCampain__list').length) {
    let $campaignList = $('.p-topCampain__list');

    $.ajax({
      type: 'GET',
      url:'/data/campaign.json',
      cache: false
    }).done(function(jsonData) {
      const data = jsonData.list;
      // console.log(data);

      let carouselHTML = '';
      for (let key in data) {
        const _item = data[key];
        // console.log(_item);

        // �gʩ�У��K�ˤˤ��Ƥ��ʤ���Σ����ʾ
        if(_item['closed'] === 0) {
          // console.log(_item);

          carouselHTML += `
            <div class="p-topCampain__item">
              <img src="${_item['img']}"">
              <!--
              <picture class="w100">
                <source media="(max-width: 767px)" srcset="${_item['img_top_sp']}">
                <source media="(min-width: 768px)" srcset="${_item['img_top_pc']}">
                <img src="${_item['img_top_sp']}" alt="">
              </picture> -->
            </div>
          `;
        }
      }

      // �����ک`��ȥåץ���`����
      $campaignList
        .append(carouselHTML)
        .slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });

    }).fail(function() {
      console.log('error');
    }).always(function() {
      // console.log('complete');
    });
  }

  // �����ک`��ȥå�
  if($('.js-campaignList__top').length) {
    const $campaignList = $('.js-campaignList__top');

    $.ajax({
      type: 'GET',
      url:'/data/campaign.json',
      cache: false
    }).done(function(jsonData) {
      const data = jsonData.list;
      const format = jsonData.format;
      const status = jsonData.status;
      // console.log(data);
      // console.log(status);

      let listHTML = '';
      let carouselHTML = '';
      for (let key in data) {
        const _item = data[key];
        // console.log(_item);

        // console.log(status[_item['status']], _item['closed']);
        // �gʩ�У��K�ˤˤ��Ƥ��ʤ���Σ����ʾ
        if(_item['closed'] === 0) {
          // console.log(_item);
          const date1 = Campaign.get_campaignDate(_item['date'][0]);
          const date2 = Campaign.get_campaignDate(_item['date'][1]);
          let date = format['date'];
          date = date.replace('date1', `${date1['y']}/${date1['m']}/${date1['d']}`);
          date = date.replace('date2', `${date2['y']}/${date2['m']}/${date2['d']}`);

          // console.log(_item['status']);
          let htmlStatus = _item['status'].map(function(tag){
            return `<p class="l-campaign__status ${tag}">${status[tag]}</p>`;
          })
          // console.log(htmlStatus);

          let htmlNew = '';
          if(_item['new']) {
            htmlNew = '<p class="l-campaign__new">NEW</p>';
          }

          listHTML += `
            <div class="l-campaign__item">
              <div class="l-campaign__titleWrapper">
                <div class="l-campaign__head">
                  ${htmlStatus.join('')}
                </div>
                <h2 class="l-campaign__title">
                  ${_item['title']}
                </h2>
                <p class="l-campaign__date">${date}</p>
              </div>

              <div class="l-campaign__content">
                <img src="${_item['img']}" alt="">
              </div>
            </div>
          `;

          carouselHTML += `
            <li>
              <picture class="l-campaign__contentImg--width">
                <source media="(max-width: 767px)" srcset="${_item['img_top_sp']}">
                <source media="(min-width: 768px)" srcset="${_item['img_top_pc']}">
                <img src="${_item['img_top_sp']}" alt="">
              </picture>
            </li>
          `;
        }
      }

      $campaignList.append(listHTML);

      // �����ک`��ȥåץ���`����
      $('.js-campaignCarousel__c')
        .append(carouselHTML)
        .slick({
          arrows: false,
          autoplay: true,
          adaptiveHeight: true,
          centerMode: true,
          centerPadding: "15%",
          dots: true,
        });

    }).fail(function() {
      console.log('error');
    }).always(function() {
      // console.log('complete');
    });
  }

  // �K�ˤ��������ک`��
  if($('.js-campaignList__closed').length) {
    Campaign.$closedListWrap = $('.js-campaignList__closed');
    Campaign.$closedBtnMore = $('.js-campaignList__closedMore');

    $.ajax({
      type: 'GET',
      url:'/data/campaign.json',
      cache: false
    }).done(function(jsonData) {
      const dataAll = jsonData['list'];
      Campaign['_data']['list'] = jsonData['list'];
      Campaign['_data']['format'] = jsonData['format'];
      Campaign['_data']['statusC'] = jsonData['status-closed'];

      let listHTML = '';
      for (let key in dataAll) {
        const _item = dataAll[key];

        // �gʩ�ФǤϤʤ���Τ�ǩ`��������
        if(_item['closed'] === 1) {
          Campaign['_data']['closed'].push(dataAll[key]);
        }

      }

      Campaign.echo_closed_item_list();

      // ��äȤߤ��Ѻ�����r
      Campaign.$closedBtnMore.click(function(e){
        e.preventDefault();

        Campaign.echo_closed_item_list();

        return false;
      })

    }).fail(function() {
      console.log('error');
    }).always(function() {
      // console.log('complete');
    });
  }
})

