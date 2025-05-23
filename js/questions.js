// js/questions.js
const questions = [
  {
    question: "Hành vi nào dưới đây bị nghiêm cấm theo Luật Giao thông đường bộ?",
    answers: [
      { text: "Đỗ xe ở lề đường", correct: false },
      { text: "Điều khiển xe máy khi chưa đủ tuổi", correct: true },
      { text: "Bật đèn xi nhan khi chuyển hướng", correct: false },
      { text: "Đi đúng tốc độ quy định", correct: false }
    ]
  },
  {
    question: "Biển báo nào dưới đây là biển báo cấm đi ngược chiều?",
    answers: [
      { text: "Biển hình tròn viền đỏ, nền trắng, có dấu gạch ngang màu đen", correct: false },
      { text: "Biển hình tròn nền đỏ, có vạch ngang trắng", correct: true },
      { text: "Biển hình tam giác, viền đỏ, nền vàng, có hình ô tô", correct: false },
      { text: "Biển hình vuông nền xanh, có mũi tên trắng chỉ lên", correct: false }
    ]
  },
  {
    question: "Khi điều khiển xe mô tô, xe gắn máy, người lái xe phải đội mũ bảo hiểm có cài quai đúng quy cách khi nào?",
    answers: [
      { text: "Khi đi trên đường cao tốc", correct: false },
      { text: "Khi đi trong khu đô thị", correct: false },
      { text: "Khi tham gia giao thông trên đường bộ", correct: true },
      { text: "Khi trời mưa", correct: false }
    ]
  },
  {
    question: "Người lái xe phải giảm tốc độ đến mức không nguy hiểm hoặc có thể dừng lại an toàn trong trường hợp nào dưới đây?",
    answers: [
      { text: "Có biển báo nguy hiểm", correct: false },
      { text: "Khi qua cầu, cống hẹp", correct: false },
      { text: "Khi qua đường giao nhau có tín hiệu đèn xanh", correct: false },
      { text: "Tất cả các trường hợp trên", correct: true }
    ]
  },
  {
    question: "Biển báo hiệu lệnh có đặc điểm nhận dạng nào?",
    answers: [
      { text: "Hình tròn, nền xanh lam, có hình vẽ hoặc chữ viết màu trắng", correct: true },
      { text: "Hình tròn, viền đỏ, nền trắng, có hình vẽ hoặc chữ viết màu đen", correct: false },
      { text: "Hình tam giác đều, viền đỏ, nền vàng, có hình vẽ màu đen", correct: false },
      { text: "Hình vuông hoặc chữ nhật, nền xanh, chữ trắng", correct: false }
    ]
  },
  {
    question: "Độ tuổi tối thiểu để được cấp giấy phép lái xe hạng A1 (xe máy dưới 175cm3) là bao nhiêu?",
    answers: [
      { text: "16 tuổi", correct: false },
      { text: "18 tuổi", correct: true },
      { text: "17 tuổi", correct: false },
      { text: "20 tuổi", correct: false }
    ]
  },
  {
    question: "Khi điều khiển xe ô tô, người lái xe phải bật đèn chiếu sáng trong trường hợp nào?",
    answers: [
      { text: "Khi trời tối", correct: false },
      { text: "Khi có sương mù, thời tiết xấu làm hạn chế tầm nhìn", correct: false },
      { text: "Khi đi qua hầm đường bộ", correct: false },
      { text: "Tất cả các trường hợp trên", correct: true }
    ]
  },
  {
    question: "Biển báo 'Cấm đỗ xe' có ý nghĩa gì?",
    answers: [
      { text: "Cấm tất cả các loại xe dừng lại", correct: false },
      { text: "Cấm tất cả các loại xe đỗ lại", correct: false },
      { text: "Cấm tất cả các loại xe dừng và đỗ lại", correct: false },
      { text: "Cấm các phương tiện dừng xe quá 5 phút", correct: false },
      { text: "Cấm các phương tiện đỗ xe nhưng được phép dừng xe", correct: true }
    ]
  },
  {
    question: "Người lái xe không được phép vượt trong trường hợp nào?",
    answers: [
      { text: "Trên cầu có một làn xe", correct: true },
      { text: "Khi có xe ngược chiều đang tới gần", correct: true },
      { text: "Trong hầm đường bộ", correct: true },
      { text: "Tất cả các trường hợp trên", correct: true } // Since multiple answers are correct, this one implies "any of these situations"
    ]
  },
  {
    question: "Biển báo 'Đường ưu tiên' có hình dạng nào?",
    answers: [
      { text: "Hình tam giác ngược, nền vàng, viền đỏ", correct: false },
      { text: "Hình thoi, nền trắng, viền đen", correct: true },
      { text: "Hình tròn, nền xanh, mũi tên trắng", correct: false },
      { text: "Hình chữ nhật, nền xanh, chữ trắng", correct: false }
    ]
  },
  {
    question: "Khi tham gia giao thông, người điều khiển phương tiện phải chấp hành tín hiệu đèn giao thông theo thứ tự ưu tiên nào?",
    answers: [
      { text: "Đèn đỏ, đèn vàng, đèn xanh", correct: false },
      { text: "Đèn xanh, đèn vàng, đèn đỏ", correct: true },
      { text: "Đèn vàng nhấp nháy, đèn xanh, đèn đỏ", correct: false },
      { text: "Đèn xanh, đèn đỏ, đèn vàng", correct: false }
    ]
  },
  {
    question: "Người đi bộ phải đi ở đâu để đảm bảo an toàn giao thông?",
    answers: [
      { text: "Trên lòng đường", correct: false },
      { text: "Trên vỉa hè hoặc lề đường", correct: true },
      { text: "Giữa đường", correct: false },
      { text: "Dưới lòng đường, sát dải phân cách", correct: false }
    ]
  }
];