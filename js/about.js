//콘텐츠의 top값을 절대값으로 얻어온다. /상대값은 position().top
	//절대값은 기준이 윈도우 / 상대값은 기준이 부모
	const aboutTop = $("#about").offset().top - 100;	
	const span = $("#about span").offset().top - 400;

let st = 0;
	//스크롤바를 내렸을때의 효과 (스크롤이벤트 감지!)
	$(window).scroll(function(){
		st = $(window).scrollTop();
		console.log(st);

		if( st>= aboutTop ){
			//About에서 오른쪽 "skill" bar 애니메이션
			$("#photo progress").animate({value : 80});
			$("#html progress").delay(100).animate({value : 90});
			$("#jquery progress").delay(200).animate({value : 90});
			$("#springboot progress").delay(300).animate({value : 90});
			$("#Flutter progress").delay(400).animate({value : 70});					
		}

		if( st>= port1Top ){
			$("#port1").addClass("act");
		}
		if( st>= port1main ){
			$("#mainimg").addClass("act");
		}
		if( st>= port2Top ){
			$("#port2").addClass("act");
		}
		if( st>= span ){
			$("#about span").addClass("act");
		}
	});
