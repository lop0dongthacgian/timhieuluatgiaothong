(() => {
  const menuButtons = document.querySelectorAll('.menuBtn');
  const sections = document.querySelectorAll('section.contentSection');
  const closeButtons = document.querySelectorAll('.closeBtn');
  const exitBtn = document.getElementById('exitBtn');

  let currentSection = null;

  // Menu click to open section
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) { // Ensure data-target exists for section buttons
        openSection(targetId);
      } else if (btn.id === 'exitBtn') { // Handle exit button separately
        handleExitApplication();
      }
    });
  });

  // Close section button
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      closeSection();
    });
  });

  // Exit application button (delegated to a function for clarity)
  function handleExitApplication() {
    if(confirm('Bạn có chắc muốn thoát ứng dụng?')) {
      // Dừng nhạc khi thoát ứng dụng
      pauseMusic();
      // Để mô phỏng "thoát ứng dụng" trên web, bạn có thể:
      // 1. Chuyển hướng về một trang trống:
      // window.location.href = 'about:blank';
      // 2. Tải lại trang (để đưa về trạng thái ban đầu):
      window.location.reload();
      // Hoặc đóng cửa sổ/tab nếu được mở bằng script (có thể bị chặn bởi trình duyệt):
      // window.close();
    }
  }
  // No need for a separate event listener for exitBtn if already handled in menuButtons loop
  // If exitBtn is not part of menuButtons:
  // exitBtn.addEventListener('click', handleExitApplication);


  function openSection(id) {
    if(currentSection) {
      currentSection.classList.remove('active');
    }
    currentSection = document.getElementById(id);
    if(currentSection) {
      currentSection.classList.add('active');
      currentSection.focus(); // Focus on the section for accessibility
      // Specific logic for quiz section
      if (id === 'quizSection') {
          startQuiz();
      } else if (id === 'signsSection') {
          // Reset sign categories filter when opening
          document.querySelector('.signCategoryBtn.active')?.classList.remove('active');
          document.querySelector('.signCategoryBtn[data-category="all"]').classList.add('active');
          filterSigns('all');
      }
    }
  }

  function closeSection() {
    if(currentSection) {
      currentSection.classList.remove('active');
      currentSection = null;
      // Focus back to the main menu or a logical element after closing a section
      // For example, focus on the first menu button
      document.querySelector('.menuBtn')?.focus();
    }
  }

  // Traffic signs modal logic
  const signCards = document.querySelectorAll('.signCard');
  const signModal = document.getElementById('signModal');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const closeModalBtn = signModal.querySelector('.closeModal');
  const signCategoryBtns = document.querySelectorAll('.signCategoryBtn');
  const signsGrid = document.querySelector('.signsGrid');

  signCards.forEach(card => {
    card.addEventListener('click', () => {
      openSignModal(card);
    });
    // Add keyboard accessibility for sign cards
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent scrolling when pressing space
        openSignModal(card);
      }
    });
  });

  closeModalBtn.addEventListener('click', () => {
    closeSignModal();
  });

  // Close modal when clicking outside of the content
  signModal.addEventListener('click', (e) => {
    if(e.target === signModal) {
      closeSignModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && signModal.classList.contains('active')) {
      closeSignModal();
    }
  });

  function openSignModal(card) {
    modalImg.src = card.dataset.img || '';
    modalImg.alt = card.dataset.desc || 'Biển báo';
    modalDesc.textContent = card.dataset.desc || '';
    signModal.classList.add('active');
    signModal.focus(); // Focus on the modal for accessibility
  }

  function closeSignModal() {
    signModal.classList.remove('active');
    modalImg.src = '';
    modalImg.alt = '';
    modalDesc.textContent = '';
    // After closing modal, return focus to the card that opened it (if possible)
    // This requires storing the last focused card
  }

  // Sign category filtering
  signCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          document.querySelector('.signCategoryBtn.active')?.classList.remove('active');
          btn.classList.add('active');
          filterSigns(btn.dataset.category);
      });
  });

  function filterSigns(category) {
      signCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
              card.style.display = 'flex'; // Use flex to maintain vertical alignment in cards
          } else {
              card.style.display = 'none';
          }
      });
  }

  // Music control
  const bgMusic = document.getElementById('bgMusic');
  const toggleMusicBtn = document.getElementById('toggleMusicBtn');
  const musicIcon = {
    waves: document.getElementById('soundWaves'),
    muteCross1: document.getElementById('muteCross1'),
    muteCross2: document.getElementById('muteCross2')
  };
  let musicPlaying = false; // Theo dõi trạng thái nhạc

  function updateMusicIcon(playing) {
    if(playing) {
      toggleMusicBtn.setAttribute('aria-pressed', 'true');
      toggleMusicBtn.setAttribute('aria-label', 'Tắt nhạc nền');
      toggleMusicBtn.title = 'Tắt nhạc';
      musicIcon.waves.style.display = 'inline';
      musicIcon.muteCross1.style.display = 'none';
      musicIcon.muteCross2.style.display = 'none';
    } else {
      toggleMusicBtn.setAttribute('aria-pressed', 'false');
      toggleMusicBtn.setAttribute('aria-label', 'Bật nhạc nền');
      toggleMusicBtn.title = 'Bật nhạc';
      musicIcon.waves.style.display = 'none';
      musicIcon.muteCross1.style.display = 'inline';
      musicIcon.muteCross2.style.display = 'inline';
    }
  }

  function playMusic() {
    // Để khắc phục hạn chế autoplay của trình duyệt, thử unmuted trước khi play
    bgMusic.muted = false;
    bgMusic.play().then(() => {
      musicPlaying = true;
      updateMusicIcon(true);
    }).catch(error => {
      console.warn("Autoplay was prevented. User interaction might be needed to play music.", error);
      // Nếu autoplay bị chặn, đảm bảo biểu tượng hiển thị đúng trạng thái tắt
      musicPlaying = false;
      updateMusicIcon(false);
    });
  }

  function pauseMusic() {
    bgMusic.pause();
    musicPlaying = false;
    updateMusicIcon(false);
  }

  toggleMusicBtn.addEventListener('click', () => {
    if(musicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // Tự động phát nhạc khi trang tải xong (nếu trình duyệt cho phép)
  // Nếu trình duyệt không cho phép autoplay khi chưa có tương tác,
  // nhạc sẽ không phát cho đến khi người dùng click vào nút play.
  // Chúng ta sẽ đảm bảo trạng thái icon là 'tắt' nếu nhạc không tự phát được.
  window.addEventListener('load', () => {
    playMusic();
  });


  // Dark mode toggle
  const darkModeBtn = document.getElementById('toggleDarkModeBtn');
  const sun = document.getElementById('sun');
  const sunRays = document.getElementById('sunRays');
  const moon = document.getElementById('moon');

  function updateDarkModeIcon(enabled) {
    if(enabled) {
      darkModeBtn.setAttribute('aria-pressed', 'true');
      darkModeBtn.setAttribute('aria-label', 'Chế độ sáng');
      darkModeBtn.title = 'Chuyển sang chế độ sáng';
      sun.style.display = 'none';
      sunRays.style.display = 'none';
      moon.style.display = 'inline';
    } else {
      darkModeBtn.setAttribute('aria-pressed', 'false');
      darkModeBtn.setAttribute('aria-label', 'Chế độ tối');
      darkModeBtn.title = 'Chuyển sang chế độ tối';
      sun.style.display = 'inline';
      sunRays.style.display = 'inline';
      moon.style.display = 'none';
    }
  }

  function enableDarkMode(enable) {
    if(enable) {
      document.body.classList.add('dark');
      updateDarkModeIcon(true);
    } else {
      document.body.classList.remove('dark');
      updateDarkModeIcon(false);
    }
    localStorage.setItem('darkMode', enable ? '1' : '0');
  }

  darkModeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    enableDarkMode(!isDark);
  });

  // Load dark mode setting
  const darkModeSetting = localStorage.getItem('darkMode');
  if(darkModeSetting === '1') {
    enableDarkMode(true);
  } else {
    enableDarkMode(false);
  }

  // Quiz logic (Now in global scope for questions.js to access if needed, but better to keep self-contained)
  const quizSection = document.getElementById('quizSection');
  const quizQuestionEl = quizSection.querySelector('.quizQuestion');
  const quizAnswersEl = quizSection.querySelector('.quizAnswers');
  const btnRestart = document.getElementById('btnRestart');
  const btnHelp = document.getElementById('btnHelp');
  const btnExitQuiz = document.getElementById('btnExitQuiz');
  const scoreEl = document.getElementById('score');
  const totalEl = document.getElementById('total');

  // questions array is now loaded from js/questions.js (make sure questions.js is loaded BEFORE script.js)

  let quizOrder = [];
  let currentQuestionIndex = 0;
  let score = 0;

  function shuffleArray(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Expose startQuiz globally so it can be called from openSection
  window.startQuiz = function() {
    score = 0;
    currentQuestionIndex = 0;
    // Check if questions array exists and is populated
    if (typeof questions === 'undefined' || !Array.isArray(questions) || questions.length === 0) {
        quizQuestionEl.textContent = "Không tìm thấy câu hỏi. Vui lòng kiểm tra file questions.js.";
        disableAnswerButtons(true);
        totalEl.textContent = 0;
        scoreEl.textContent = 0;
        return;
    }
    quizOrder = shuffleArray([...Array(questions.length).keys()]);
    totalEl.textContent = questions.length;
    scoreEl.textContent = score;
    showQuestion();
  }

  function showQuestion() {
    clearAnswers();
    if(currentQuestionIndex >= quizOrder.length) {
      quizQuestionEl.textContent = `Bạn đã hoàn thành bài thi! Bạn đạt ${score} trên ${questions.length} câu.`;
      disableAnswerButtons(true);
      return;
    }
    const qIndex = quizOrder[currentQuestionIndex];
    const q = questions[qIndex];
    quizQuestionEl.textContent = q.question;
    q.answers.forEach((a,i) => {
      const btn = document.createElement('button');
      btn.textContent = a.text;
      btn.type = "button"; // Good practice for buttons
      btn.addEventListener('click', () => selectAnswer(i));
      quizAnswersEl.appendChild(document.createElement('li')).appendChild(btn);
    });
    disableAnswerButtons(false);
  }

  function clearAnswers() {
    quizAnswersEl.innerHTML = '';
  }

  function disableAnswerButtons(disabled) {
    quizAnswersEl.querySelectorAll('button').forEach(b => b.disabled = disabled);
  }

  function selectAnswer(idx) {
    disableAnswerButtons(true);
    const qIndex = quizOrder[currentQuestionIndex];
    const q = questions[qIndex];
    const buttons = quizAnswersEl.querySelectorAll('button');
    buttons.forEach((btn,i) => {
      if(q.answers[i].correct) {
        btn.classList.add('correct');
      } else if(i === idx) {
        btn.classList.add('wrong');
      }
    });
    if(q.answers[idx].correct) {
      score++;
      scoreEl.textContent = score;
    }
    currentQuestionIndex++;
    setTimeout(() => {
      showQuestion();
    }, 1500); // 1.5 giây để người dùng xem kết quả
  }

  btnRestart.addEventListener('click', () => {
    startQuiz();
  });
  btnHelp.addEventListener('click', () => {
    alert("Chọn đáp án đúng cho câu hỏi trắc nghiệm.\\nSau khi chọn, màu của ô trả lời đúng/sai sẽ hiện ra, sau đó tự động chuyển sang câu tiếp theo.\\nBạn có thể chơi lại hoặc thoát bất cứ lúc nào.");
  });
  btnExitQuiz.addEventListener('click', () => {
    closeSection();
  });
})();