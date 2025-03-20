// 기존 jQuery 문서 준비 함수는 그대로 두되, 헤더 내 타이핑 효과(#typing)는 그대로 실행됩니다.
$(document).ready(function(){
    // 상단메뉴 배경색 조절 (기존 코드 유지)
    if($(window).width() <= 600 ){
    $("nav").addClass('act');
}
else {
    const change = $("#top").height()-100;
    $(window).scroll(function(){
if( $(window).scrollTop() >= change ){
    $("nav").addClass('act');
} else {
    $("nav").removeClass('act');
    }
});
}
// 헤더 내 타이핑 효과 (기존 코드 유지)
    const $typing = `
    열정은 누구에게나 있지만
    실천하는 사람만이 
    꿈을 현실로 만든다
    `;
    const tyLen  = $typing.length;
    let i = 0;
    let txt = "";
    function type(){
if( i < tyLen ){
    txt += $typing[i];
    // #typing 요소에 타이핑 (기존 방식)
    document.querySelector("#typing").innerText = txt;
    i++;
    setTimeout( type, 200);
    }
    }
    type();	
});
     // 높이 190px 에 도달하면 배경색이 변함함
    let dream = document.getElementById('dream');
    let backgroundChanged = false;
    window.addEventListener('scroll', function() {
if (window.scrollY >= 190 && !backgroundChanged) {
    backgroundChanged = true;
    // 예시로 360도 각도로 변경 (transition으로 부드럽게 변경됨)
    dream.style.background = "linear-gradient(360deg, #FF6655, #F77F00, #000000)";
    console.log(window.scrollY)
}
});
    const lines = [
    { text: "꿈을 현실로 만드는 순간이 시작됩니다", id: "line1" },
    { text: "웹퍼블리셔는 젊은 세대만이 할 수 있는 일은 아닙니다", id: "line2" },
    { text: "저는 반백이 훨씬 지난 나이에도 불구하고 시작하였습니다", id: "line3" },
    { text: "하나씩 하나씩 그 꿈을 이루기 위해 나아가고 있습니다", id: "line4" }
    ];
    let currentLine = 0;
    let charIndex = 0;
    let isTyping = false;

    function typeLine() {
    const line = lines[currentLine];
    const typingElement = document.getElementById(line.id);
if (charIndex < line.text.length) {
    typingElement.textContent += line.text.charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 100); // 다음 글자 타이핑
} else {
    // 타이핑 완료 후 다음 줄로 이동
    charIndex = 0;
    currentLine++;
    isTyping = false;
}
}
    document.addEventListener("scroll", () => {
    const dream = document.getElementById("autotyping");
    const containerPosition = dream.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

// 컨테이너가 화면 중앙에 들어왔을 때
if (containerPosition.top >= 0 && containerPosition.bottom <= viewportHeight) {
if (!isTyping && currentLine < lines.length) {
    isTyping = true;
    typeLine();
} else if (currentLine >= lines.length) {
// 타이핑이 끝나면 초기화
    currentLine = 0;
    charIndex = 0;
    lines.forEach(({ id }) => {
    document.getElementById(id).textContent = ""; // 모든 텍스트 초기화
});
}
}
});

document.addEventListener("DOMContentLoaded", function() {
    const popupDisplay = document.querySelector(".popup_display");
    const popupButton = document.querySelector(".card_popup");
    const closeButton = document.querySelector(".popup_close");

    // Popup 버튼 클릭 시 전체화면 팝업 활성화
    popupButton.addEventListener("click", function() {
      // 팝업을 화면 전체에 고정
      popupDisplay.style.position = "fixed";
      popupDisplay.style.top = "0";
      popupDisplay.style.left = "0";
      // 팝업 보이기
      popupDisplay.style.display = "block";
    });

    // Close 버튼 클릭 시 팝업 숨김 (초기 상태 복원)
    closeButton.addEventListener("click", function() {
      popupDisplay.style.display = "none";
      // 초기 상태 복원이 필요하다면 추가 스타일을 재설정할 수 있습니다.
      popupDisplay.style.position = "absolute";
    });
  });


  