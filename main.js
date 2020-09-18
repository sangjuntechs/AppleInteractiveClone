(() => {
  let yOffset = 0; //pageYoffset
  let prevScrollHeight = 0; //현재 스크롤 이전의 스크롤 높이의 합
  let currentScene = 0; //현재 보고있는 scroll section

  const sceneInfo = [
    {
      //scene id 0
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById("scroll_section_0"),
        messageOne: document.querySelector(
          "#scroll_section_0 .main_message.one"
        ),
        messageTwo: document.querySelector(
          "#scroll_section_0 .main_message.two"
        ),
        messageThree: document.querySelector(
          "#scroll_section_0 .main_message.three"
        ),
        messageFour: document.querySelector(
          "#scroll_section_0 .main_message.four"
        ),
      },
      values: {
        messageOneOpacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageOneOpacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageTwoOpacity: [0, 1, { start: 0.3, end: 0.4 }],
        messageThreeOpacity: [0, 1, { start: 0.5, end: 0.6 }],
        messageFourOpacity: [0, 1, { start: 0.7, end: 0.8 }],
      },
    },
    {
      //scene id 1
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById("scroll_section_1"),
      },
    },
    {
      //scene id 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById("scroll_section_2"),
      },
    },
    {
      //scene id 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById("scroll_section_3"),
      },
    },
  ];

  function setLayout() {
    // scroll section 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show_scene_${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      //start - end 사이에 실행
      const scrollStartPart = values[2].start * scrollHeight;
      const scrollEndPart = values[2].end * scrollHeight;
      const scrollHeightPart = scrollEndPart - scrollStartPart;

      if (
        currentYOffset <= scrollEndPart &&
        currentYOffset >= scrollStartPart
      ) {
        rv =
          ((currentYOffset - scrollStartPart) / scrollHeightPart) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < scrollStartPart) {
        rv = values[0];
      } else if (currentYOffset > scrollEndPart) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values; //현재 스크롤 섹션의 values 객체
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    let currentYOffset = yOffset - prevScrollHeight; //현재 스크롤 섹션에서 스크롤이 얼마나 됐는지에 대한 값
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        let messageOneOpacity_in = calcValues(
          values.messageOneOpacity_in,
          currentYOffset
        );
        let messageOneOpacity_out = calcValues(
          values.messageOneOpacity_out,
          currentYOffset
        );
        if (scrollRatio <= 0.25) {
          objs.messageOne.style.opacity = messageOneOpacity_in;
        } else {
          objs.messageOne.style.opacity = messageOneOpacity_out;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    allSceneHeight = sceneInfo[0].scrollHeight * 4;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show_scene_${currentScene}`); //sticky_elem 요소들 scrollHeight에 맞춰 display: block;
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 모바일 스크롤로 인한 -수치 방지
      currentScene--;
      document.body.setAttribute("id", `show_scene_${currentScene}`); //sticky_elem 요소들 scrollHeight에 맞춰 display: block;
    } else if (yOffset > allSceneHeight) {
      // 모바일 스크롤로 인한 수치 넘어감 방지
      currentScene = 3;
    }
    playAnimation();
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("load", setLayout);
})();
