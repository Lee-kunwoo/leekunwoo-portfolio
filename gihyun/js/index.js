$(document).ready(function(){
  'use strict';
  
  // fade-in 효과를 위해 active 클래스 추가
  $('#section7').addClass('active');
  
  const phone = $('.sec7 .slide_list li');
  const phoneLength = phone.length;
  const dots = $('.sec7 .slide_dot li');
  const nav = $('.sec7 .slide_nav span');
  
  let mobile_current_index = 0;
  
  function followingProduct(index) {
    mobile_current_index = index;
    
    phone.each(function (i) {
      let offset = i - mobile_current_index;
      if (offset < 0) offset += phoneLength;
      let j;
      for (j = 0; j < phoneLength + 1; j++) {
          $(this).removeClass('item' + j);
      }
      $(this).addClass('item' + (offset + 1));
    });
    
    dots.eq(index).addClass('active').siblings('li').removeClass('active');
  }
  
  /* 화살표 버튼 클릭 */
  nav.click(function () {
    const delta = $(this).hasClass('prev') ? -1 : 1;
    let delta_product_index = (mobile_current_index + delta) % phoneLength;
    if (delta_product_index < 0) {
      delta_product_index = (mobile_current_index + delta) % phoneLength + phoneLength;
    }
    followingProduct(delta_product_index);
  });
  
  /* 페이지네이션 클릭 */
  dots.click(function () {
    followingProduct($(this).index());
  });
});