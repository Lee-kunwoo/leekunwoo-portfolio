/* ========================================
   Constants - 설정값 관리
   ======================================== */
const CONFIG = {
    TYPING_SPEED: 200,
    AUTO_TYPING_SPEED: 100,
    SCROLL_THRESHOLD: 190,
    NAV_CHANGE_OFFSET: 100,
    MOBILE_BREAKPOINT: 600,
    
    HEADER_TYPING_TEXT: `열정은 누구에게나 있지만
실천하는 사람만이 
꿈을 현실로 만든다`,
    
    AUTO_TYPING_LINES: [
        { text: "꿈을 현실로 만드는 순간이 시작됩니다", id: "line1" },
        { text: "웹퍼블리셔는 젊은 세대만이 할 수 있는 일은 아닙니다", id: "line2" },
        { text: "저는 반백이 훨씬 지난 나이에도 불구하고 시작하였습니다", id: "line3" },
        { text: "하나씩 하나씩 그 꿈을 이루기 위해 나아가고 있습니다", id: "line4" }
    ],
    
    DREAM_GRADIENT: "linear-gradient(360deg, #FF6655, #F77F00, #000000)"
};

/* ========================================
   Navigation
   ======================================== */
function initNavigation() {
    const $nav = $("nav");
    const $window = $(window);
    
    if ($window.width() <= CONFIG.MOBILE_BREAKPOINT) {
        $nav.addClass('act');
        return;
    }
    
    const changePoint = $("#top").height() - CONFIG.NAV_CHANGE_OFFSET;
    
    $window.scroll(function() {
        if ($window.scrollTop() >= changePoint) {
            $nav.addClass('act');
        } else {
            $nav.removeClass('act');
        }
    });
}

/* ========================================
   Header Typing Effect - 헤더 타이핑 효과 (수정)
   ======================================== */
function initHeaderTyping() {
    const typingText = CONFIG.HEADER_TYPING_TEXT;
    const typingLength = typingText.length;
    const typingElement = document.querySelector("#typing");
    const scrollIcon = document.querySelector("#click");
    
    if (!typingElement) return;
    
    let index = 0;
    let displayText = "";
    
    function typeCharacter() {
        if (index < typingLength) {
            displayText += typingText[index];
            typingElement.innerText = displayText;
            index++;
            setTimeout(typeCharacter, CONFIG.TYPING_SPEED);
        } else {
            // 타이핑 완료 후 0.5초 뒤 스크롤 아이콘 표시
            if (scrollIcon) {
                setTimeout(() => {
                    scrollIcon.classList.add('show');
                }, 500);
            }
        }
    }
    
    typeCharacter();
}

/* ========================================
   Dream Section Background - 스크롤 시 배경색 변경
   ======================================== */
function initDreamBackground() {
    const dreamElement = document.getElementById('dream');
    if (!dreamElement) return;
    
    let backgroundChanged = false;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY >= CONFIG.SCROLL_THRESHOLD && !backgroundChanged) {
            backgroundChanged = true;
            // 클래스 추가로 CSS transition 활용
            dreamElement.classList.add('scrolled');
        } else if (window.scrollY < CONFIG.SCROLL_THRESHOLD && backgroundChanged) {
            // 다시 위로 스크롤하면 원래대로
            backgroundChanged = false;
            dreamElement.classList.remove('scrolled');
        }
    });
}

/* ========================================
   [index.js] initAutoTyping 함수 전체 교체
   ======================================== */

function initAutoTyping() {
    const lines = CONFIG.AUTO_TYPING_LINES;
    let currentLineIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    let hasStarted = false;
    let hasCompleted = false;
    
    function typeLine() {
        const line = lines[currentLineIndex];
        const typingElement = document.getElementById(line.id);
        
        if (!typingElement) return;
        
        // [수정 포인트 1] 타이핑 시작 시 커서 클래스 추가
        if (charIndex === 0) {
            typingElement.classList.add('active-cursor');
        }

        if (charIndex < line.text.length) {
            typingElement.textContent += line.text.charAt(charIndex);
            charIndex++;
            setTimeout(typeLine, CONFIG.AUTO_TYPING_SPEED);
        } else {
            // [수정 포인트 2] 한 줄 타이핑 완료 시 처리
            
            // 현재 줄의 커서 제거 (깜빡임 멈춤)
            typingElement.classList.remove('active-cursor');
            
            charIndex = 0;
            currentLineIndex++;
            
            if (currentLineIndex >= lines.length) {
                // 모든 줄 타이핑 완료
                isTyping = false;
                hasCompleted = true;
                // 마지막 줄에 커서를 남기고 싶다면 아래 주석 해제
                // typingElement.classList.add('active-cursor'); 
            } else {
                // 다음 줄 타이핑 시작
                setTimeout(typeLine, CONFIG.AUTO_TYPING_SPEED);
            }
        }
    }
    
    function resetTyping() {
        currentLineIndex = 0;
        charIndex = 0;
        hasStarted = false;
        hasCompleted = false;
        lines.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = "";
                // [수정 포인트 3] 리셋 시 모든 커서 클래스 제거
                element.classList.remove('active-cursor');
            }
        });
    }
    
    function checkVisibility() {
        const autoTypingElement = document.getElementById("autotyping");
        if (!autoTypingElement) return;
        
        const containerPosition = autoTypingElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const isVisible = containerPosition.top < viewportHeight * 0.7;
        const isGone = containerPosition.bottom < 0;
        
        if (isVisible && !hasStarted && !isTyping) {
            hasStarted = true;
            isTyping = true;
            typeLine();
        } else if (isGone && hasCompleted) {
            resetTyping();
        }
    }
    
    document.addEventListener("scroll", checkVisibility);
}

/* ========================================
   Video Popup - 비디오 팝업 제어
   ======================================== */
function initVideoPopup() {
    const popupDisplay = document.querySelector(".popup_display");
    const popupButton = document.querySelector(".card_popup");
    const closeButton = document.querySelector(".popup_close");
    const video = document.querySelector(".popup_display video");
    
    if (!popupDisplay || !popupButton || !closeButton) return;
    
    popupButton.addEventListener("click", function() {
        popupDisplay.style.position = "fixed";
        popupDisplay.style.top = "0";
        popupDisplay.style.left = "0";
        popupDisplay.style.display = "block";
        
        if (video) {
            video.play();
        }
    });
    
    closeButton.addEventListener("click", function() {
        popupDisplay.style.display = "none";
        popupDisplay.style.position = "absolute";
        
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
    
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && popupDisplay.style.display === "block") {
            closeButton.click();
        }
    });
}

/* ========================================
   Portfolio Slider - 포트폴리오 슬라이더
   ======================================== */
function initPortfolioSlider() {
    const $section = $('#section7');
    if ($section.length === 0) return;
    
    $section.addClass('active');
    
    const $slides = $('.sec7 .slide_list li');
    const slideCount = $slides.length;
    const $dots = $('.sec7 .slide_dot li');
    const $navButtons = $('.sec7 .slide_nav span');
    
    let currentIndex = 0;
    
    function updateSlidePosition(index) {
        currentIndex = index;
        
        $slides.each(function(i) {
            let offset = i - currentIndex;
            if (offset < 0) {
                offset += slideCount;
            }
            
            for (let j = 0; j <= slideCount; j++) {
                $(this).removeClass('item' + j);
            }
            
            $(this).addClass('item' + (offset + 1));
        });
        
        $dots.eq(index).addClass('active').siblings('li').removeClass('active');
    }
    
    $navButtons.on('click', function() {
        const isPrev = $(this).hasClass('prev');
        const delta = isPrev ? -1 : 1;
        let newIndex = (currentIndex + delta) % slideCount;
        
        if (newIndex < 0) {
            newIndex += slideCount;
        }
        
        updateSlidePosition(newIndex);
    });
    
    $dots.on('click', function() {
        const index = $(this).index();
        updateSlidePosition(index);
    });
    
    $(document).on('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            $navButtons.filter('.prev').trigger('click');
        } else if (e.key === 'ArrowRight') {
            $navButtons.filter('.next').trigger('click');
        }
    });
}

/* ========================================
   Scroll Animations - 스크롤 애니메이션
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.sec7, .container');
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/* ========================================
   Initialize All - 모든 초기화 함수 실행
   ======================================== */
$(document).ready(function() {
    'use strict';
    
    initNavigation();
    initHeaderTyping();
    initDreamBackground();
    initAutoTyping();
    initPortfolioSlider();
    initScrollAnimations();
});

document.addEventListener("DOMContentLoaded", function() {
    initVideoPopup();
});