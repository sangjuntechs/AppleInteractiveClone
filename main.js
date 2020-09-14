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
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    allSceneHeight = sceneInfo[0].scrollHeight * 4;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }
      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        currentScene++;
      }
      if (yOffset < prevScrollHeight) {
        if (currentScene === 0 ) return;
        currentScene--;
      }
      else if (yOffset > allSceneHeight) {
        currentScene = 3;
      }
    console.log(currentScene)
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    console.log(yOffset)
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  
  setLayout();
})();
