const topicPlan = [
  { days: [1, 2, 3], topic: "Basic Daily English", level: "A1" },
  { days: [4, 5, 6], topic: "Education", level: "A1" },
  { days: [7, 8, 9], topic: "Technology", level: "A2" },
  { days: [10, 11, 12], topic: "Health", level: "A2" },
  { days: [13, 14, 15], topic: "Environment", level: "B1" },
  { days: [16, 17, 18], topic: "Work", level: "B1" },
  { days: [19, 20, 21], topic: "City & Transport", level: "B1" },
  { days: [22, 23, 24], topic: "Family & Society", level: "B1" },
  { days: [25, 26, 27], topic: "Media & Internet", level: "B2" },
  { days: [28, 29, 30], topic: "IELTS Common Words", level: "B2" },
];

const dayRows = {
  1: ["hello|noun|lời chào", "name|noun|tên", "country|noun|đất nước", "city|noun|thành phố", "home|noun|nhà", "food|noun|đồ ăn", "water|noun|nước", "friend|noun|bạn bè", "morning|noun|buổi sáng", "family|noun|gia đình"],
  2: ["listen|verb|lắng nghe", "speak|verb|nói", "read|verb|đọc", "write|verb|viết", "learn|verb|học", "need|verb|cần", "want|verb|muốn", "like|verb|thích", "start|verb|bắt đầu", "finish|verb|kết thúc"],
  3: ["easy|adjective|dễ", "difficult|adjective|khó", "important|adjective|quan trọng", "happy|adjective|vui vẻ", "busy|adjective|bận rộn", "quiet|adjective|yên tĩnh", "clean|adjective|sạch sẽ", "new|adjective|mới", "old|adjective|cũ", "small|adjective|nhỏ"],
  4: ["school|noun|trường học", "teacher|noun|giáo viên", "student|noun|học sinh", "class|noun|lớp học", "lesson|noun|bài học", "book|noun|quyển sách", "notebook|noun|vở ghi", "homework|noun|bài tập về nhà", "test|noun|bài kiểm tra", "score|noun|điểm số"],
  5: ["study|verb|học tập", "practice|verb|luyện tập", "review|verb|ôn lại", "answer|verb|trả lời", "explain|verb|giải thích", "remember|verb|ghi nhớ", "forget|verb|quên", "improve|verb|cải thiện", "prepare|verb|chuẩn bị", "join|verb|tham gia"],
  6: ["education|noun|giáo dục", "subject|noun|môn học", "grammar|noun|ngữ pháp", "vocabulary|noun|từ vựng", "exam|noun|kỳ thi", "library|noun|thư viện", "course|noun|khóa học", "skill|noun|kỹ năng", "mistake|noun|lỗi sai", "progress|noun|sự tiến bộ"],
  7: ["computer|noun|máy tính", "phone|noun|điện thoại", "screen|noun|màn hình", "keyboard|noun|bàn phím", "website|noun|trang web", "email|noun|thư điện tử", "password|noun|mật khẩu", "file|noun|tệp tin", "app|noun|ứng dụng", "device|noun|thiết bị"],
  8: ["connect|verb|kết nối", "download|verb|tải xuống", "upload|verb|tải lên", "search|verb|tìm kiếm", "share|verb|chia sẻ", "save|verb|lưu", "delete|verb|xóa", "click|verb|nhấp chuột", "type|verb|gõ chữ", "update|verb|cập nhật"],
  9: ["digital|adjective|thuộc kỹ thuật số", "online|adjective|trực tuyến", "useful|adjective|hữu ích", "fast|adjective|nhanh", "modern|adjective|hiện đại", "popular|adjective|phổ biến", "private|adjective|riêng tư", "safe|adjective|an toàn", "automatic|adjective|tự động", "simple|adjective|đơn giản"],
  10: ["health|noun|sức khỏe", "body|noun|cơ thể", "doctor|noun|bác sĩ", "medicine|noun|thuốc", "exercise|noun|bài tập thể dục", "sleep|noun|giấc ngủ", "diet|noun|chế độ ăn", "pain|noun|cơn đau", "stress|noun|căng thẳng", "energy|noun|năng lượng"],
  11: ["healthy|adjective|khỏe mạnh", "tired|adjective|mệt", "sick|adjective|ốm", "active|adjective|năng động", "fresh|adjective|tươi mới", "strong|adjective|khỏe", "weak|adjective|yếu", "mental|adjective|thuộc tinh thần", "regular|adjective|đều đặn", "serious|adjective|nghiêm trọng"],
  12: ["breathe|verb|thở", "rest|verb|nghỉ ngơi", "recover|verb|hồi phục", "avoid|verb|tránh", "reduce|verb|giảm", "protect|verb|bảo vệ", "check|verb|kiểm tra", "treat|verb|điều trị", "relax|verb|thư giãn", "balance|verb|cân bằng"],
  13: ["environment|noun|môi trường", "pollution|noun|ô nhiễm", "climate|noun|khí hậu", "weather|noun|thời tiết", "waste|noun|rác thải", "plastic|noun|nhựa", "forest|noun|rừng", "river|noun|dòng sông", "wildlife|noun|động vật hoang dã", "resource|noun|tài nguyên"],
  14: ["recycle|verb|tái chế", "reuse|verb|tái sử dụng", "save|verb|tiết kiệm", "plant|verb|trồng cây", "damage|verb|gây hại", "pollute|verb|làm ô nhiễm", "increase|verb|tăng", "decrease|verb|giảm", "conserve|verb|bảo tồn", "adapt|verb|thích nghi"],
  15: ["sustainable|adjective|bền vững", "natural|adjective|tự nhiên", "global|adjective|toàn cầu", "harmful|adjective|có hại", "renewable|adjective|có thể tái tạo", "serious|adjective|nghiêm trọng", "local|adjective|địa phương", "clean|adjective|sạch", "limited|adjective|hạn chế", "responsible|adjective|có trách nhiệm"],
  16: ["job|noun|công việc", "career|noun|sự nghiệp", "company|noun|công ty", "office|noun|văn phòng", "manager|noun|quản lý", "colleague|noun|đồng nghiệp", "meeting|noun|cuộc họp", "salary|noun|lương", "task|noun|nhiệm vụ", "deadline|noun|hạn chót"],
  17: ["apply|verb|ứng tuyển", "hire|verb|tuyển dụng", "train|verb|đào tạo", "manage|verb|quản lý", "communicate|verb|giao tiếp", "organize|verb|sắp xếp", "complete|verb|hoàn thành", "achieve|verb|đạt được", "cooperate|verb|hợp tác", "solve|verb|giải quyết"],
  18: ["professional|adjective|chuyên nghiệp", "creative|adjective|sáng tạo", "flexible|adjective|linh hoạt", "efficient|adjective|hiệu quả", "responsible|adjective|có trách nhiệm", "confident|adjective|tự tin", "experienced|adjective|có kinh nghiệm", "productive|adjective|năng suất", "challenging|adjective|đầy thử thách", "competitive|adjective|cạnh tranh"],
  19: ["city|noun|thành phố", "traffic|noun|giao thông", "bus|noun|xe buýt", "train|noun|tàu", "station|noun|nhà ga", "airport|noun|sân bay", "street|noun|đường phố", "bridge|noun|cây cầu", "vehicle|noun|phương tiện", "journey|noun|chuyến đi"],
  20: ["travel|verb|di chuyển", "commute|verb|đi làm hằng ngày", "drive|verb|lái xe", "ride|verb|đi xe", "walk|verb|đi bộ", "cross|verb|băng qua", "arrive|verb|đến nơi", "delay|verb|trì hoãn", "park|verb|đỗ xe", "navigate|verb|định hướng"],
  21: ["crowded|adjective|đông đúc", "convenient|adjective|tiện lợi", "public|adjective|công cộng", "urban|adjective|thuộc đô thị", "rural|adjective|thuộc nông thôn", "expensive|adjective|đắt đỏ", "affordable|adjective|vừa túi tiền", "noisy|adjective|ồn ào", "safe|adjective|an toàn", "available|adjective|có sẵn"],
  22: ["parent|noun|cha hoặc mẹ", "child|noun|trẻ em", "relative|noun|họ hàng", "neighbor|noun|hàng xóm", "community|noun|cộng đồng", "relationship|noun|mối quan hệ", "support|noun|sự hỗ trợ", "culture|noun|văn hóa", "tradition|noun|truyền thống", "generation|noun|thế hệ"],
  23: ["respect|verb|tôn trọng", "support|verb|ủng hộ", "share|verb|chia sẻ", "celebrate|verb|ăn mừng", "argue|verb|tranh luận", "discuss|verb|thảo luận", "care|verb|quan tâm", "depend|verb|phụ thuộc", "encourage|verb|khuyến khích", "volunteer|verb|tình nguyện"],
  24: ["social|adjective|thuộc xã hội", "traditional|adjective|mang tính truyền thống", "independent|adjective|độc lập", "elderly|adjective|cao tuổi", "young|adjective|trẻ", "equal|adjective|bình đẳng", "polite|adjective|lịch sự", "patient|adjective|kiên nhẫn", "kind|adjective|tử tế", "fair|adjective|công bằng"],
  25: ["media|noun|truyền thông", "internet|noun|mạng internet", "news|noun|tin tức", "article|noun|bài báo", "video|noun|video", "podcast|noun|chương trình âm thanh", "advertisement|noun|quảng cáo", "audience|noun|khán giả", "platform|noun|nền tảng", "content|noun|nội dung"],
  26: ["post|verb|đăng bài", "comment|verb|bình luận", "follow|verb|theo dõi", "subscribe|verb|đăng ký theo dõi", "stream|verb|phát trực tuyến", "edit|verb|chỉnh sửa", "publish|verb|xuất bản", "influence|verb|ảnh hưởng", "inform|verb|cung cấp thông tin", "compare|verb|so sánh"],
  27: ["reliable|adjective|đáng tin cậy", "accurate|adjective|chính xác", "viral|adjective|lan truyền nhanh", "interactive|adjective|có tính tương tác", "visual|adjective|thuộc hình ảnh", "biased|adjective|thiên vị", "current|adjective|hiện tại", "negative|adjective|tiêu cực", "positive|adjective|tích cực", "effective|adjective|hiệu quả"],
  28: ["factor|noun|yếu tố", "issue|noun|vấn đề", "benefit|noun|lợi ích", "challenge|noun|thách thức", "solution|noun|giải pháp", "impact|noun|tác động", "evidence|noun|bằng chứng", "trend|noun|xu hướng", "opinion|noun|ý kiến", "reason|noun|lý do"],
  29: ["analyze|verb|phân tích", "compare|verb|so sánh", "suggest|verb|đề xuất", "argue|verb|lập luận", "support|verb|ủng hộ", "describe|verb|miêu tả", "predict|verb|dự đoán", "evaluate|verb|đánh giá", "emphasize|verb|nhấn mạnh", "conclude|verb|kết luận"],
  30: ["significant|adjective|đáng kể", "essential|adjective|thiết yếu", "common|adjective|phổ biến", "major|adjective|chính", "minor|adjective|nhỏ", "complex|adjective|phức tạp", "possible|adjective|có thể", "practical|adjective|thực tế", "valuable|adjective|có giá trị", "overall|adjective|tổng thể"],
};

const distractors = [
  "một hoạt động hằng ngày",
  "một nơi công cộng",
  "một cảm xúc tích cực",
  "một kỹ năng học tập",
  "một vấn đề xã hội",
  "một giải pháp đơn giản",
  "một thiết bị hiện đại",
  "một thói quen tốt",
  "một ý kiến cá nhân",
  "một thay đổi nhỏ",
];

function getPlanForDay(day) {
  return topicPlan.find((plan) => plan.days.includes(day));
}

function makePronunciation(word) {
  return `đọc gần đúng: ${word.toLowerCase().replaceAll("-", " ")}`;
}

function makeCollocation(word, partOfSpeech) {
  if (partOfSpeech === "verb") return `${word} regularly`;
  if (partOfSpeech === "adjective") return `${word} for learners`;
  return `basic ${word}`;
}

function makeExample(word, partOfSpeech, meaning) {
  if (partOfSpeech === "verb") {
    return {
      en: `I try to ${word} every day because it helps my English.`,
      vi: `Tôi cố gắng ${meaning} mỗi ngày vì điều đó giúp tiếng Anh của tôi.`,
    };
  }
  if (partOfSpeech === "adjective") {
    return {
      en: `This is a ${word} idea for my daily study plan.`,
      vi: `Đây là một ý tưởng ${meaning} cho kế hoạch học hằng ngày của tôi.`,
    };
  }
  return {
    en: `This ${word} is useful in a simple IELTS Speaking answer.`,
    vi: `${meaning} này hữu ích trong một câu trả lời IELTS Speaking đơn giản.`,
  };
}

function makeOptions(correct, id) {
  const pool = distractors.filter((item) => item !== correct);
  const options = [correct, pool[id % pool.length], pool[(id + 3) % pool.length], pool[(id + 6) % pool.length]];
  return options.sort((a, b) => a.localeCompare(b));
}

const vocabulary = Object.entries(dayRows).flatMap(([dayKey, rows]) => {
  const day = Number(dayKey);
  const plan = getPlanForDay(day);

  return rows.map((row, index) => {
    const [word, part_of_speech, meaning_vi] = row.split("|");
    const id = (day - 1) * 10 + index + 1;
    const example = makeExample(word, part_of_speech, meaning_vi);

    return {
      id,
      word,
      pronunciation_vi: makePronunciation(word),
      meaning_vi,
      part_of_speech,
      collocation: makeCollocation(word, part_of_speech),
      example_en: example.en,
      example_vi: example.vi,
      level: plan.level,
      topic: plan.topic,
      day_number: day,
      quiz: {
        question: `"${word}" có nghĩa gần nhất là gì?`,
        options: makeOptions(meaning_vi, id),
        correct_answer: meaning_vi,
      },
    };
  });
});

export default vocabulary;
