 // 스크롤 이벤트를 감지하여 #hyung_pc가 화면 상단에서 400px 이하로 내려오면 슬라이드 애니메이션 실행
 window.addEventListener('scroll', function() {
    var hyungPc = document.getElementById('hyung_pc');
    var rect = hyungPc.getBoundingClientRect();
    if(rect.top <= 565) {
      hyungPc.classList.add('slide-in');
    }
  });

  // 스크롤 이벤트를 감지하여 #hyung_mobile이 화면 상단에서 600px 이하로 내려오면 슬라이드 애니메이션 실행
  window.addEventListener('scroll', function() {
    var hyungMobile = document.getElementById('hyung_mobile');
    var rect = hyungMobile.getBoundingClientRect();
    if(rect.top <= 775) {
      hyungMobile.classList.add('slide-in');
    }
  });
   // 스크롤 이벤트를 감지하여 #hyung_pc가 화면 상단에서 400px 이하로 내려오면 슬라이드 애니메이션 실행
   window.addEventListener('scroll', function() {
    var nailPc = document.getElementById('nail_pc');
    var rect = nailPc.getBoundingClientRect();
    if(rect.top <= 565) {
      nailPc.classList.add('slide-in');
    }
  });

  // 스크롤 이벤트를 감지하여 #hyung_mobile이 화면 상단에서 600px 이하로 내려오면 슬라이드 애니메이션 실행
  window.addEventListener('scroll', function() {
    var nailMobile = document.getElementById('nail_mobile');
    var rect = nailMobile.getBoundingClientRect();
    if(rect.top <= 775) {
      nailMobile.classList.add('slide-in');
    }
  });