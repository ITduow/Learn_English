import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, "src", "data", "vocabulary");

const topics = [
  {
    topic: "Basic Daily English",
    nouns: [["morning routine", "thói quen buổi sáng"], ["daily habit", "thói quen hằng ngày"], ["home address", "địa chỉ nhà"], ["phone number", "số điện thoại"], ["simple question", "câu hỏi đơn giản"], ["short answer", "câu trả lời ngắn"], ["personal plan", "kế hoạch cá nhân"], ["free time", "thời gian rảnh"], ["daily task", "việc hằng ngày"], ["basic need", "nhu cầu cơ bản"], ["local shop", "cửa hàng gần nhà"], ["clean room", "phòng sạch sẽ"], ["warm meal", "bữa ăn ấm"], ["quiet place", "nơi yên tĩnh"], ["small problem", "vấn đề nhỏ"]],
    verbs: [["ask for help", "nhờ giúp đỡ"], ["make a plan", "lập kế hoạch"], ["check the time", "xem giờ"], ["open the door", "mở cửa"], ["close the window", "đóng cửa sổ"], ["carry a bag", "mang túi"], ["write a note", "viết ghi chú"], ["read a sign", "đọc biển báo"], ["wait in line", "xếp hàng chờ"], ["pay the bill", "trả hóa đơn"]],
    adjectives: [["early", "sớm"], ["late", "muộn"], ["ready", "sẵn sàng"], ["careful", "cẩn thận"], ["friendly", "thân thiện"], ["quiet", "yên tĩnh"], ["clean", "sạch sẽ"], ["simple", "đơn giản"], ["useful", "hữu ích"], ["comfortable", "thoải mái"]],
  },
  {
    topic: "Family & Friends",
    nouns: [["close friend", "bạn thân"], ["family member", "thành viên gia đình"], ["older brother", "anh trai"], ["younger sister", "em gái"], ["family meal", "bữa ăn gia đình"], ["birthday party", "tiệc sinh nhật"], ["shared memory", "kỷ niệm chung"], ["kind neighbor", "hàng xóm tốt bụng"], ["family support", "sự hỗ trợ từ gia đình"], ["honest conversation", "cuộc trò chuyện chân thật"], ["childhood friend", "bạn thời thơ ấu"], ["family rule", "quy tắc gia đình"], ["weekend visit", "chuyến thăm cuối tuần"], ["strong relationship", "mối quan hệ bền chặt"], ["family tradition", "truyền thống gia đình"]],
    verbs: [["spend time with", "dành thời gian với"], ["take care of", "chăm sóc"], ["keep in touch", "giữ liên lạc"], ["share a story", "chia sẻ câu chuyện"], ["give advice", "đưa ra lời khuyên"], ["show respect", "thể hiện sự tôn trọng"], ["solve a conflict", "giải quyết mâu thuẫn"], ["celebrate together", "ăn mừng cùng nhau"], ["trust a friend", "tin tưởng bạn bè"], ["support each other", "hỗ trợ lẫn nhau"]],
    adjectives: [["caring", "biết quan tâm"], ["reliable", "đáng tin cậy"], ["patient", "kiên nhẫn"], ["generous", "hào phóng"], ["polite", "lịch sự"], ["loyal", "trung thành"], ["close", "thân thiết"], ["honest", "trung thực"], ["supportive", "hay hỗ trợ"], ["respectful", "tôn trọng người khác"]],
  },
  {
    topic: "School & Education",
    nouns: [["school subject", "môn học"], ["classroom activity", "hoạt động trên lớp"], ["learning goal", "mục tiêu học tập"], ["study schedule", "lịch học"], ["exam result", "kết quả thi"], ["language skill", "kỹ năng ngôn ngữ"], ["grammar point", "điểm ngữ pháp"], ["reading passage", "bài đọc"], ["writing task", "bài viết"], ["group project", "dự án nhóm"], ["online course", "khóa học trực tuyến"], ["student progress", "tiến bộ của học sinh"], ["teacher feedback", "nhận xét của giáo viên"], ["library card", "thẻ thư viện"], ["learning method", "phương pháp học"]],
    verbs: [["attend a class", "tham gia lớp học"], ["take notes", "ghi chú"], ["review a lesson", "ôn lại bài"], ["submit homework", "nộp bài tập"], ["pass an exam", "vượt qua kỳ thi"], ["improve a skill", "cải thiện kỹ năng"], ["explain an idea", "giải thích ý tưởng"], ["memorize vocabulary", "ghi nhớ từ vựng"], ["join a course", "tham gia khóa học"], ["prepare for a test", "chuẩn bị cho bài kiểm tra"]],
    adjectives: [["academic", "thuộc học thuật"], ["practical", "thực tế"], ["clear", "rõ ràng"], ["challenging", "có tính thử thách"], ["useful", "hữu ích"], ["regular", "đều đặn"], ["effective", "hiệu quả"], ["confident", "tự tin"], ["focused", "tập trung"], ["independent", "độc lập"]],
  },
  {
    topic: "Work & Career",
    nouns: [["job interview", "buổi phỏng vấn xin việc"], ["career goal", "mục tiêu nghề nghiệp"], ["work experience", "kinh nghiệm làm việc"], ["office task", "nhiệm vụ văn phòng"], ["team meeting", "cuộc họp nhóm"], ["project deadline", "hạn chót dự án"], ["monthly salary", "lương hằng tháng"], ["workplace culture", "văn hóa nơi làm việc"], ["professional skill", "kỹ năng chuyên môn"], ["business trip", "chuyến công tác"], ["training session", "buổi đào tạo"], ["customer service", "dịch vụ khách hàng"], ["work schedule", "lịch làm việc"], ["career path", "con đường sự nghiệp"], ["job satisfaction", "sự hài lòng trong công việc"]],
    verbs: [["apply for a job", "ứng tuyển việc làm"], ["manage a team", "quản lý một nhóm"], ["complete a task", "hoàn thành nhiệm vụ"], ["meet a deadline", "kịp hạn chót"], ["gain experience", "tích lũy kinh nghiệm"], ["solve a problem", "giải quyết vấn đề"], ["communicate clearly", "giao tiếp rõ ràng"], ["train new staff", "đào tạo nhân viên mới"], ["increase productivity", "tăng năng suất"], ["develop a career", "phát triển sự nghiệp"]],
    adjectives: [["professional", "chuyên nghiệp"], ["productive", "năng suất"], ["flexible", "linh hoạt"], ["creative", "sáng tạo"], ["responsible", "có trách nhiệm"], ["experienced", "có kinh nghiệm"], ["competitive", "cạnh tranh"], ["efficient", "hiệu quả"], ["motivated", "có động lực"], ["ambitious", "có tham vọng"]],
  },
  {
    topic: "Technology",
    nouns: [["mobile device", "thiết bị di động"], ["computer screen", "màn hình máy tính"], ["digital tool", "công cụ kỹ thuật số"], ["software update", "bản cập nhật phần mềm"], ["online account", "tài khoản trực tuyến"], ["data storage", "lưu trữ dữ liệu"], ["smart device", "thiết bị thông minh"], ["video call", "cuộc gọi video"], ["tech company", "công ty công nghệ"], ["user experience", "trải nghiệm người dùng"], ["security system", "hệ thống bảo mật"], ["cloud service", "dịch vụ đám mây"], ["electric vehicle", "xe điện"], ["artificial intelligence", "trí tuệ nhân tạo"], ["digital skill", "kỹ năng số"]],
    verbs: [["install an app", "cài ứng dụng"], ["update software", "cập nhật phần mềm"], ["protect data", "bảo vệ dữ liệu"], ["connect a device", "kết nối thiết bị"], ["store information", "lưu trữ thông tin"], ["solve technical issues", "xử lý vấn đề kỹ thuật"], ["use technology", "sử dụng công nghệ"], ["automate a task", "tự động hóa một việc"], ["improve access", "cải thiện khả năng tiếp cận"], ["reduce errors", "giảm lỗi"]],
    adjectives: [["digital", "thuộc kỹ thuật số"], ["automatic", "tự động"], ["secure", "an toàn bảo mật"], ["innovative", "đổi mới"], ["portable", "dễ mang theo"], ["advanced", "tiên tiến"], ["user-friendly", "dễ dùng"], ["technical", "thuộc kỹ thuật"], ["reliable", "đáng tin cậy"], ["efficient", "hiệu quả"]],
  },
  {
    topic: "Internet & Social Media",
    nouns: [["social network", "mạng xã hội"], ["online profile", "hồ sơ trực tuyến"], ["web browser", "trình duyệt web"], ["search result", "kết quả tìm kiếm"], ["online comment", "bình luận trực tuyến"], ["digital privacy", "quyền riêng tư số"], ["internet connection", "kết nối internet"], ["online community", "cộng đồng trực tuyến"], ["content creator", "người tạo nội dung"], ["personal blog", "blog cá nhân"], ["viral post", "bài đăng lan truyền"], ["screen time", "thời gian dùng màn hình"], ["online safety", "an toàn trực tuyến"], ["fake account", "tài khoản giả"], ["digital footprint", "dấu vết số"]],
    verbs: [["post a photo", "đăng ảnh"], ["share information", "chia sẻ thông tin"], ["follow an account", "theo dõi tài khoản"], ["check a message", "kiểm tra tin nhắn"], ["protect privacy", "bảo vệ quyền riêng tư"], ["search online", "tìm kiếm trực tuyến"], ["block a user", "chặn người dùng"], ["join a group", "tham gia nhóm"], ["create content", "tạo nội dung"], ["limit screen time", "giới hạn thời gian dùng màn hình"]],
    adjectives: [["online", "trực tuyến"], ["viral", "lan truyền nhanh"], ["interactive", "có tính tương tác"], ["private", "riêng tư"], ["public", "công khai"], ["informative", "cung cấp thông tin"], ["harmful", "có hại"], ["addictive", "dễ gây nghiện"], ["popular", "phổ biến"], ["responsible", "có trách nhiệm"]],
  },
  {
    topic: "Health",
    nouns: [["healthy diet", "chế độ ăn lành mạnh"], ["mental health", "sức khỏe tinh thần"], ["medical treatment", "điều trị y tế"], ["regular exercise", "tập thể dục đều đặn"], ["sleep quality", "chất lượng giấc ngủ"], ["health problem", "vấn đề sức khỏe"], ["balanced lifestyle", "lối sống cân bằng"], ["public health", "y tế công cộng"], ["doctor appointment", "lịch hẹn bác sĩ"], ["daily stress", "căng thẳng hằng ngày"], ["body weight", "cân nặng cơ thể"], ["fresh food", "thực phẩm tươi"], ["health insurance", "bảo hiểm y tế"], ["fitness goal", "mục tiêu thể lực"], ["medical advice", "lời khuyên y tế"]],
    verbs: [["take medicine", "uống thuốc"], ["reduce stress", "giảm căng thẳng"], ["build strength", "tăng sức mạnh"], ["improve sleep", "cải thiện giấc ngủ"], ["avoid illness", "tránh bệnh tật"], ["check symptoms", "kiểm tra triệu chứng"], ["follow advice", "làm theo lời khuyên"], ["recover from illness", "hồi phục sau bệnh"], ["maintain health", "duy trì sức khỏe"], ["develop a habit", "hình thành thói quen"]],
    adjectives: [["healthy", "khỏe mạnh"], ["active", "năng động"], ["balanced", "cân bằng"], ["medical", "thuộc y tế"], ["physical", "thuộc thể chất"], ["mental", "thuộc tinh thần"], ["serious", "nghiêm trọng"], ["painful", "đau đớn"], ["fit", "cân đối"], ["preventable", "có thể phòng tránh"]],
  },
  {
    topic: "Food & Lifestyle",
    nouns: [["home-cooked meal", "bữa ăn nấu tại nhà"], ["eating habit", "thói quen ăn uống"], ["fresh vegetable", "rau tươi"], ["balanced meal", "bữa ăn cân bằng"], ["fast food", "đồ ăn nhanh"], ["local dish", "món ăn địa phương"], ["food choice", "lựa chọn thực phẩm"], ["daily routine", "lịch sinh hoạt hằng ngày"], ["healthy snack", "đồ ăn nhẹ lành mạnh"], ["busy lifestyle", "lối sống bận rộn"], ["coffee shop", "quán cà phê"], ["family dinner", "bữa tối gia đình"], ["food waste", "lãng phí thực phẩm"], ["cooking skill", "kỹ năng nấu ăn"], ["personal taste", "khẩu vị cá nhân"]],
    verbs: [["cook at home", "nấu ăn ở nhà"], ["eat out", "ăn ngoài"], ["choose fresh food", "chọn thực phẩm tươi"], ["reduce sugar", "giảm đường"], ["prepare a meal", "chuẩn bị bữa ăn"], ["try local food", "thử món địa phương"], ["avoid waste", "tránh lãng phí"], ["change a habit", "thay đổi thói quen"], ["enjoy a meal", "thưởng thức bữa ăn"], ["follow a routine", "theo một lịch sinh hoạt"]],
    adjectives: [["fresh", "tươi"], ["tasty", "ngon"], ["nutritious", "bổ dưỡng"], ["convenient", "tiện lợi"], ["homemade", "tự làm tại nhà"], ["spicy", "cay"], ["sweet", "ngọt"], ["balanced", "cân bằng"], ["affordable", "vừa túi tiền"], ["unhealthy", "không lành mạnh"]],
  },
  {
    topic: "Environment",
    nouns: [["air pollution", "ô nhiễm không khí"], ["climate change", "biến đổi khí hậu"], ["plastic waste", "rác thải nhựa"], ["natural resource", "tài nguyên thiên nhiên"], ["renewable energy", "năng lượng tái tạo"], ["wildlife protection", "bảo vệ động vật hoang dã"], ["green space", "không gian xanh"], ["carbon emission", "khí thải carbon"], ["environmental problem", "vấn đề môi trường"], ["water shortage", "thiếu nước"], ["forest area", "khu vực rừng"], ["recycling system", "hệ thống tái chế"], ["clean energy", "năng lượng sạch"], ["public awareness", "nhận thức cộng đồng"], ["sustainable development", "phát triển bền vững"]],
    verbs: [["protect the environment", "bảo vệ môi trường"], ["reduce pollution", "giảm ô nhiễm"], ["save energy", "tiết kiệm năng lượng"], ["recycle plastic", "tái chế nhựa"], ["plant trees", "trồng cây"], ["conserve water", "tiết kiệm nước"], ["damage nature", "gây hại thiên nhiên"], ["raise awareness", "nâng cao nhận thức"], ["use renewable energy", "dùng năng lượng tái tạo"], ["limit waste", "hạn chế rác thải"]],
    adjectives: [["sustainable", "bền vững"], ["renewable", "có thể tái tạo"], ["harmful", "có hại"], ["natural", "tự nhiên"], ["global", "toàn cầu"], ["environmental", "thuộc môi trường"], ["serious", "nghiêm trọng"], ["green", "xanh, thân thiện môi trường"], ["limited", "hạn chế"], ["responsible", "có trách nhiệm"]],
  },
  {
    topic: "City & Transport",
    nouns: [["public transport", "phương tiện công cộng"], ["traffic jam", "kẹt xe"], ["city center", "trung tâm thành phố"], ["train station", "nhà ga"], ["bus stop", "trạm xe buýt"], ["bike lane", "làn đường xe đạp"], ["road safety", "an toàn đường bộ"], ["urban area", "khu đô thị"], ["parking space", "chỗ đỗ xe"], ["daily commute", "việc đi làm hằng ngày"], ["transport system", "hệ thống giao thông"], ["crowded street", "đường phố đông đúc"], ["walking distance", "khoảng cách đi bộ"], ["high-speed train", "tàu cao tốc"], ["city service", "dịch vụ thành phố"]],
    verbs: [["take a bus", "đi xe buýt"], ["drive to work", "lái xe đi làm"], ["cross the road", "băng qua đường"], ["avoid traffic", "tránh giao thông đông"], ["improve transport", "cải thiện giao thông"], ["park a car", "đỗ xe"], ["reduce congestion", "giảm ùn tắc"], ["travel by train", "đi bằng tàu"], ["walk to school", "đi bộ đến trường"], ["use a map", "dùng bản đồ"]],
    adjectives: [["crowded", "đông đúc"], ["urban", "thuộc đô thị"], ["convenient", "tiện lợi"], ["affordable", "vừa túi tiền"], ["noisy", "ồn ào"], ["safe", "an toàn"], ["modern", "hiện đại"], ["public", "công cộng"], ["accessible", "dễ tiếp cận"], ["efficient", "hiệu quả"]],
  },
  {
    topic: "Travel & Culture",
    nouns: [["tourist attraction", "điểm thu hút du khách"], ["local culture", "văn hóa địa phương"], ["travel experience", "trải nghiệm du lịch"], ["cultural tradition", "truyền thống văn hóa"], ["historic site", "di tích lịch sử"], ["travel document", "giấy tờ du lịch"], ["guided tour", "tour có hướng dẫn"], ["foreign language", "ngoại ngữ"], ["local custom", "phong tục địa phương"], ["holiday destination", "điểm đến kỳ nghỉ"], ["museum visit", "chuyến thăm bảo tàng"], ["cultural exchange", "trao đổi văn hóa"], ["travel cost", "chi phí du lịch"], ["tourism industry", "ngành du lịch"], ["memorable trip", "chuyến đi đáng nhớ"]],
    verbs: [["visit a museum", "thăm bảo tàng"], ["book a hotel", "đặt khách sạn"], ["learn about culture", "tìm hiểu văn hóa"], ["respect local customs", "tôn trọng phong tục địa phương"], ["explore a city", "khám phá thành phố"], ["try local food", "thử món địa phương"], ["take photos", "chụp ảnh"], ["plan a trip", "lên kế hoạch chuyến đi"], ["meet local people", "gặp người địa phương"], ["experience tradition", "trải nghiệm truyền thống"]],
    adjectives: [["cultural", "thuộc văn hóa"], ["historic", "mang tính lịch sử"], ["memorable", "đáng nhớ"], ["foreign", "nước ngoài"], ["local", "địa phương"], ["traditional", "truyền thống"], ["touristy", "đông khách du lịch"], ["peaceful", "yên bình"], ["unique", "độc đáo"], ["expensive", "đắt đỏ"]],
  },
  {
    topic: "Sports & Hobbies",
    nouns: [["favorite hobby", "sở thích yêu thích"], ["team sport", "môn thể thao đồng đội"], ["fitness club", "câu lạc bộ thể hình"], ["music lesson", "buổi học nhạc"], ["reading habit", "thói quen đọc sách"], ["creative activity", "hoạt động sáng tạo"], ["sports event", "sự kiện thể thao"], ["free-time activity", "hoạt động lúc rảnh"], ["healthy competition", "cuộc thi lành mạnh"], ["personal interest", "sở thích cá nhân"], ["outdoor activity", "hoạt động ngoài trời"], ["practice session", "buổi luyện tập"], ["sports equipment", "dụng cụ thể thao"], ["physical exercise", "bài tập thể chất"], ["hobby group", "nhóm sở thích"]],
    verbs: [["play a sport", "chơi một môn thể thao"], ["join a club", "tham gia câu lạc bộ"], ["practice regularly", "luyện tập đều đặn"], ["watch a match", "xem trận đấu"], ["develop a hobby", "phát triển sở thích"], ["relax after work", "thư giãn sau giờ làm"], ["win a competition", "thắng cuộc thi"], ["improve fitness", "cải thiện thể lực"], ["learn an instrument", "học nhạc cụ"], ["spend time outdoors", "dành thời gian ngoài trời"]],
    adjectives: [["active", "năng động"], ["creative", "sáng tạo"], ["competitive", "cạnh tranh"], ["enjoyable", "thú vị"], ["relaxing", "giúp thư giãn"], ["physical", "thuộc thể chất"], ["popular", "phổ biến"], ["regular", "đều đặn"], ["outdoor", "ngoài trời"], ["challenging", "có tính thử thách"]],
  },
  {
    topic: "Shopping & Money",
    nouns: [["shopping habit", "thói quen mua sắm"], ["online payment", "thanh toán trực tuyến"], ["monthly budget", "ngân sách hằng tháng"], ["saving account", "tài khoản tiết kiệm"], ["product price", "giá sản phẩm"], ["customer choice", "lựa chọn của khách hàng"], ["special offer", "ưu đãi đặc biệt"], ["shopping mall", "trung tâm mua sắm"], ["cash payment", "thanh toán tiền mặt"], ["financial plan", "kế hoạch tài chính"], ["consumer behavior", "hành vi tiêu dùng"], ["bank card", "thẻ ngân hàng"], ["price comparison", "so sánh giá"], ["household expense", "chi phí gia đình"], ["money management", "quản lý tiền bạc"]],
    verbs: [["save money", "tiết kiệm tiền"], ["compare prices", "so sánh giá"], ["buy online", "mua trực tuyến"], ["pay by card", "trả bằng thẻ"], ["control spending", "kiểm soát chi tiêu"], ["make a budget", "lập ngân sách"], ["return a product", "trả lại sản phẩm"], ["choose quality", "chọn chất lượng"], ["avoid debt", "tránh nợ"], ["invest wisely", "đầu tư khôn ngoan"]],
    adjectives: [["affordable", "vừa túi tiền"], ["expensive", "đắt"], ["cheap", "rẻ"], ["financial", "thuộc tài chính"], ["valuable", "có giá trị"], ["reasonable", "hợp lý"], ["wasteful", "lãng phí"], ["careful", "cẩn thận"], ["secure", "an toàn"], ["convenient", "tiện lợi"]],
  },
  {
    topic: "Society",
    nouns: [["social issue", "vấn đề xã hội"], ["public opinion", "ý kiến công chúng"], ["community support", "sự hỗ trợ cộng đồng"], ["equal opportunity", "cơ hội bình đẳng"], ["living standard", "mức sống"], ["social change", "thay đổi xã hội"], ["population growth", "tăng dân số"], ["cultural difference", "khác biệt văn hóa"], ["quality of life", "chất lượng cuộc sống"], ["social responsibility", "trách nhiệm xã hội"], ["community center", "trung tâm cộng đồng"], ["public behavior", "hành vi nơi công cộng"], ["social pressure", "áp lực xã hội"], ["income gap", "khoảng cách thu nhập"], ["volunteer work", "công việc tình nguyện"]],
    verbs: [["support the community", "hỗ trợ cộng đồng"], ["reduce inequality", "giảm bất bình đẳng"], ["respect differences", "tôn trọng khác biệt"], ["improve living standards", "cải thiện mức sống"], ["raise public awareness", "nâng cao nhận thức cộng đồng"], ["encourage cooperation", "khuyến khích hợp tác"], ["protect rights", "bảo vệ quyền lợi"], ["solve social problems", "giải quyết vấn đề xã hội"], ["promote fairness", "thúc đẩy công bằng"], ["join volunteer work", "tham gia tình nguyện"]],
    adjectives: [["social", "thuộc xã hội"], ["equal", "bình đẳng"], ["fair", "công bằng"], ["diverse", "đa dạng"], ["inclusive", "bao trùm"], ["responsible", "có trách nhiệm"], ["public", "công cộng"], ["cultural", "thuộc văn hóa"], ["modern", "hiện đại"], ["traditional", "truyền thống"]],
  },
  {
    topic: "Crime & Law",
    nouns: [["traffic law", "luật giao thông"], ["legal right", "quyền hợp pháp"], ["crime rate", "tỷ lệ tội phạm"], ["police officer", "cảnh sát"], ["court decision", "quyết định của tòa án"], ["public safety", "an toàn công cộng"], ["serious crime", "tội nghiêm trọng"], ["legal system", "hệ thống pháp luật"], ["security camera", "camera an ninh"], ["victim support", "hỗ trợ nạn nhân"], ["community safety", "an toàn cộng đồng"], ["law enforcement", "thực thi pháp luật"], ["personal responsibility", "trách nhiệm cá nhân"], ["criminal behavior", "hành vi phạm tội"], ["safety measure", "biện pháp an toàn"]],
    verbs: [["follow the law", "tuân thủ luật"], ["report a crime", "trình báo tội phạm"], ["protect citizens", "bảo vệ công dân"], ["punish offenders", "trừng phạt người phạm tội"], ["prevent crime", "ngăn ngừa tội phạm"], ["respect legal rights", "tôn trọng quyền hợp pháp"], ["increase security", "tăng an ninh"], ["investigate a case", "điều tra vụ việc"], ["reduce risk", "giảm rủi ro"], ["enforce rules", "thực thi quy định"]],
    adjectives: [["legal", "hợp pháp"], ["illegal", "bất hợp pháp"], ["criminal", "thuộc tội phạm"], ["safe", "an toàn"], ["strict", "nghiêm khắc"], ["serious", "nghiêm trọng"], ["violent", "bạo lực"], ["responsible", "có trách nhiệm"], ["fair", "công bằng"], ["public", "công cộng"]],
  },
  {
    topic: "Government & Public Services",
    nouns: [["public service", "dịch vụ công"], ["government policy", "chính sách chính phủ"], ["local authority", "chính quyền địa phương"], ["healthcare system", "hệ thống chăm sóc sức khỏe"], ["education funding", "tài trợ giáo dục"], ["public transport", "giao thông công cộng"], ["tax money", "tiền thuế"], ["community project", "dự án cộng đồng"], ["public facility", "cơ sở công cộng"], ["national budget", "ngân sách quốc gia"], ["citizen need", "nhu cầu của công dân"], ["social program", "chương trình xã hội"], ["public school", "trường công"], ["emergency service", "dịch vụ khẩn cấp"], ["urban planning", "quy hoạch đô thị"]],
    verbs: [["provide services", "cung cấp dịch vụ"], ["improve facilities", "cải thiện cơ sở vật chất"], ["fund education", "tài trợ giáo dục"], ["support citizens", "hỗ trợ công dân"], ["manage resources", "quản lý nguồn lực"], ["build infrastructure", "xây dựng hạ tầng"], ["collect taxes", "thu thuế"], ["make policies", "ban hành chính sách"], ["solve public issues", "giải quyết vấn đề công"], ["serve the community", "phục vụ cộng đồng"]],
    adjectives: [["public", "công cộng"], ["national", "quốc gia"], ["local", "địa phương"], ["official", "chính thức"], ["effective", "hiệu quả"], ["transparent", "minh bạch"], ["accessible", "dễ tiếp cận"], ["essential", "thiết yếu"], ["fair", "công bằng"], ["responsible", "có trách nhiệm"]],
  },
  {
    topic: "Media & Advertising",
    nouns: [["news report", "bản tin"], ["advertising campaign", "chiến dịch quảng cáo"], ["target audience", "đối tượng khán giả"], ["media message", "thông điệp truyền thông"], ["brand image", "hình ảnh thương hiệu"], ["online advertisement", "quảng cáo trực tuyến"], ["TV program", "chương trình TV"], ["public attention", "sự chú ý của công chúng"], ["marketing strategy", "chiến lược tiếp thị"], ["consumer trust", "niềm tin của người tiêu dùng"], ["media coverage", "sự đưa tin của truyền thông"], ["visual image", "hình ảnh trực quan"], ["product promotion", "quảng bá sản phẩm"], ["news source", "nguồn tin"], ["advertising cost", "chi phí quảng cáo"]],
    verbs: [["attract attention", "thu hút sự chú ý"], ["promote a product", "quảng bá sản phẩm"], ["influence consumers", "ảnh hưởng người tiêu dùng"], ["spread information", "lan truyền thông tin"], ["create an image", "tạo hình ảnh"], ["check a source", "kiểm tra nguồn tin"], ["compare products", "so sánh sản phẩm"], ["inform the public", "thông tin cho công chúng"], ["build trust", "xây dựng niềm tin"], ["avoid false claims", "tránh tuyên bố sai"]],
    adjectives: [["commercial", "mang tính thương mại"], ["persuasive", "có sức thuyết phục"], ["visual", "thuộc hình ảnh"], ["reliable", "đáng tin"], ["biased", "thiên vị"], ["informative", "cung cấp thông tin"], ["creative", "sáng tạo"], ["effective", "hiệu quả"], ["misleading", "gây hiểu lầm"], ["popular", "phổ biến"]],
  },
  {
    topic: "Science",
    nouns: [["scientific research", "nghiên cứu khoa học"], ["laboratory test", "thí nghiệm trong phòng lab"], ["research finding", "phát hiện nghiên cứu"], ["natural science", "khoa học tự nhiên"], ["space exploration", "khám phá không gian"], ["medical discovery", "phát hiện y học"], ["scientific evidence", "bằng chứng khoa học"], ["climate data", "dữ liệu khí hậu"], ["energy source", "nguồn năng lượng"], ["research method", "phương pháp nghiên cứu"], ["technology development", "phát triển công nghệ"], ["human brain", "não người"], ["scientific theory", "lý thuyết khoa học"], ["practical experiment", "thí nghiệm thực tế"], ["future invention", "phát minh tương lai"]],
    verbs: [["conduct research", "tiến hành nghiên cứu"], ["collect data", "thu thập dữ liệu"], ["test a theory", "kiểm chứng lý thuyết"], ["discover a solution", "khám phá giải pháp"], ["explain a result", "giải thích kết quả"], ["support evidence", "ủng hộ bằng chứng"], ["develop technology", "phát triển công nghệ"], ["observe changes", "quan sát thay đổi"], ["measure progress", "đo lường tiến bộ"], ["solve scientific problems", "giải quyết vấn đề khoa học"]],
    adjectives: [["scientific", "thuộc khoa học"], ["natural", "tự nhiên"], ["accurate", "chính xác"], ["experimental", "thuộc thí nghiệm"], ["logical", "hợp logic"], ["technical", "thuộc kỹ thuật"], ["complex", "phức tạp"], ["innovative", "đổi mới"], ["practical", "thực tế"], ["reliable", "đáng tin cậy"]],
  },
  {
    topic: "Art & Music",
    nouns: [["art exhibition", "triển lãm nghệ thuật"], ["music festival", "lễ hội âm nhạc"], ["creative expression", "sự thể hiện sáng tạo"], ["traditional music", "âm nhạc truyền thống"], ["modern art", "nghệ thuật hiện đại"], ["public performance", "buổi biểu diễn công cộng"], ["cultural value", "giá trị văn hóa"], ["music lesson", "buổi học nhạc"], ["visual art", "nghệ thuật thị giác"], ["local artist", "nghệ sĩ địa phương"], ["creative industry", "ngành sáng tạo"], ["song lyrics", "lời bài hát"], ["art gallery", "phòng trưng bày nghệ thuật"], ["musical instrument", "nhạc cụ"], ["personal style", "phong cách cá nhân"]],
    verbs: [["create artwork", "tạo tác phẩm nghệ thuật"], ["play an instrument", "chơi nhạc cụ"], ["perform on stage", "biểu diễn trên sân khấu"], ["express emotions", "thể hiện cảm xúc"], ["visit a gallery", "thăm phòng trưng bày"], ["support artists", "ủng hộ nghệ sĩ"], ["learn music", "học âm nhạc"], ["appreciate culture", "trân trọng văn hóa"], ["develop creativity", "phát triển sự sáng tạo"], ["share a performance", "chia sẻ buổi biểu diễn"]],
    adjectives: [["artistic", "thuộc nghệ thuật"], ["musical", "thuộc âm nhạc"], ["creative", "sáng tạo"], ["traditional", "truyền thống"], ["modern", "hiện đại"], ["emotional", "giàu cảm xúc"], ["cultural", "thuộc văn hóa"], ["visual", "thuộc hình ảnh"], ["original", "nguyên bản"], ["inspiring", "truyền cảm hứng"]],
  },
  {
    topic: "IELTS Academic Common Words",
    nouns: [["major factor", "yếu tố chính"], ["possible solution", "giải pháp khả thi"], ["serious issue", "vấn đề nghiêm trọng"], ["positive impact", "tác động tích cực"], ["negative effect", "ảnh hưởng tiêu cực"], ["strong evidence", "bằng chứng mạnh"], ["general trend", "xu hướng chung"], ["public concern", "mối quan tâm công chúng"], ["key reason", "lý do then chốt"], ["long-term benefit", "lợi ích dài hạn"], ["main argument", "luận điểm chính"], ["clear example", "ví dụ rõ ràng"], ["practical approach", "cách tiếp cận thực tế"], ["global problem", "vấn đề toàn cầu"], ["balanced view", "quan điểm cân bằng"]],
    verbs: [["analyze the issue", "phân tích vấn đề"], ["compare two views", "so sánh hai quan điểm"], ["support an argument", "ủng hộ một lập luận"], ["provide evidence", "đưa ra bằng chứng"], ["suggest a solution", "đề xuất giải pháp"], ["evaluate the impact", "đánh giá tác động"], ["describe a trend", "miêu tả xu hướng"], ["explain the reason", "giải thích lý do"], ["emphasize the importance", "nhấn mạnh tầm quan trọng"], ["draw a conclusion", "rút ra kết luận"]],
    adjectives: [["significant", "đáng kể"], ["essential", "thiết yếu"], ["effective", "hiệu quả"], ["complex", "phức tạp"], ["beneficial", "có lợi"], ["negative", "tiêu cực"], ["positive", "tích cực"], ["practical", "thực tế"], ["global", "toàn cầu"], ["overall", "tổng thể"]],
  },
];

const levelRanges = [
  { maxDay: 50, level: "A1" },
  { maxDay: 110, level: "A2" },
  { maxDay: 210, level: "B1" },
  { maxDay: 300, level: "B2" },
];

const quizTemplates = [
  (word) => `"${word}" có nghĩa gần nhất là gì?`,
  (word) => `Chọn nghĩa tiếng Việt phù hợp với "${word}".`,
  (word) => `Trong bài IELTS cơ bản, "${word}" nên hiểu là gì?`,
  (word) => `Đáp án nào diễn tả đúng "${word}"?`,
];

function getLevel(day) {
  return levelRanges.find((range) => day <= range.maxDay).level;
}

function uniqueByWord(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.word.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildTopicItems(topicData) {
  const items = [];
  topicData.nouns.forEach(([word, meaning]) => {
    items.push({
      word,
      meaning_vi: meaning,
      part_of_speech: "noun phrase",
      collocation: `useful ${word}`,
      example_en: `I can use this ${word} in a simple answer.`,
      example_vi: `Tôi có thể dùng ${meaning} này trong một câu trả lời đơn giản.`,
    });
  });

  topicData.verbs.forEach(([word, meaning]) => {
    items.push({
      word,
      meaning_vi: meaning,
      part_of_speech: "verb phrase",
      collocation: `${word} regularly`,
      example_en: `Many people try to ${word} when they can.`,
      example_vi: `Nhiều người cố gắng ${meaning} khi có thể.`,
    });
  });

  topicData.adjectives.forEach(([adjective, meaning]) => {
    topicData.nouns.slice(0, 11).forEach(([noun, nounVi]) => {
      const word = `${adjective} ${noun}`;
      items.push({
        word,
        meaning_vi: `${nounVi} ${meaning}`,
        part_of_speech: "noun phrase",
        collocation: `a ${word}`,
        example_en: `A ${word} can be useful in daily life.`,
        example_vi: `Một ${nounVi} ${meaning} có thể hữu ích trong đời sống hằng ngày.`,
      });
    });
  });

  topicData.verbs.forEach(([verb, verbVi]) => {
    topicData.adjectives.slice(0, 3).forEach(([adjective, adjectiveVi]) => {
      const word = `${verb} in a ${adjective} way`;
      items.push({
        word,
        meaning_vi: `${verbVi} mot cach ${adjectiveVi}`,
        part_of_speech: "verb phrase",
        collocation: `${verb} in a ${adjective} way`,
        example_en: `Students can ${word} to build better habits.`,
        example_vi: `Học viên có thể ${verbVi} một cách ${adjectiveVi} để xây dựng thói quen tốt hơn.`,
      });
    });
  });

  return uniqueByWord(items).slice(0, 150);
}

function makePronunciation(word) {
  return `đọc gần đúng: ${word.toLowerCase().replaceAll("-", " ")}`;
}

function getTopicForDay(day) {
  const zeroBasedDay = day - 1;
  const topicIndex = Math.floor(zeroBasedDay / 15) % topics.length;
  return topics[topicIndex].topic;
}

function buildQuestion(word, id) {
  return quizTemplates[id % quizTemplates.length](word);
}

function makeOptions(correct, topicMeanings, id) {
  const pool = topicMeanings.filter((meaning) => meaning !== correct);
  const options = [
    correct,
    pool[id % pool.length],
    pool[(id + 17) % pool.length],
    pool[(id + 43) % pool.length],
  ];
  return [...new Set(options)].slice(0, 4).sort((a, b) => a.localeCompare(b, "vi"));
}

function buildAllItems() {
  const topicItems = new Map(topics.map((topic) => [topic.topic, buildTopicItems(topic)]));
  const topicOffsets = new Map(topics.map((topic) => [topic.topic, 0]));
  const allItems = [];
  const usedWords = new Set();

  for (let day = 1; day <= 300; day += 1) {
    const topic = getTopicForDay(day);
    const level = getLevel(day);
    const items = topicItems.get(topic);
    const meanings = items.map((item) => item.meaning_vi);
    let offset = topicOffsets.get(topic);

    for (let index = 0; index < 10; index += 1) {
      const source = items[offset % items.length];
      const id = (day - 1) * 10 + index + 1;
      const context = topic.toLowerCase().replaceAll("&", "and");
      const originalWord = source.word;
      const word = usedWords.has(originalWord.toLowerCase()) ? `${originalWord} in ${context}` : originalWord;
      usedWords.add(word.toLowerCase());
      allItems.push({
        id,
        word,
        pronunciation_vi: makePronunciation(word),
        meaning_vi: word === originalWord ? source.meaning_vi : `${source.meaning_vi} trong chủ đề ${topic}`,
        part_of_speech: source.part_of_speech,
        collocation: word === originalWord ? source.collocation : word,
        example_en: source.example_en,
        example_vi: source.example_vi,
        level,
        topic,
        day_number: day,
        quiz: {
          question: buildQuestion(word, id),
          options: makeOptions(word === originalWord ? source.meaning_vi : `${source.meaning_vi} trong chủ đề ${topic}`, meanings, id),
          correct_answer: word === originalWord ? source.meaning_vi : `${source.meaning_vi} trong chủ đề ${topic}`,
        },
      });
      offset += 1;
    }

    topicOffsets.set(topic, offset);
  }

  return allItems;
}

function formatItem(item) {
  return `  createVocabularyItem(${JSON.stringify(item)})`;
}

function writeDayFiles(items) {
  fs.mkdirSync(outputDir, { recursive: true });
  for (let day = 1; day <= 300; day += 1) {
    const dayItems = items.filter((item) => item.day_number === day);
    const fileName = `day${String(day).padStart(3, "0")}.js`;
    const body = [
      `import { createVocabularyItem } from "./factory.js";`,
      "",
      "export default [",
      dayItems.map(formatItem).join(",\n"),
      "];",
      "",
    ].join("\n");
    fs.writeFileSync(path.join(outputDir, fileName), body, "utf8");
  }
}

function writeFactory() {
  fs.mkdirSync(outputDir, { recursive: true });
  const body = `export function createVocabularyItem(item) {
  return item;
}
`;
  fs.writeFileSync(path.join(outputDir, "factory.js"), body, "utf8");
}

function writeIndex() {
  const imports = Array.from({ length: 300 }, (_, index) => {
    const day = String(index + 1).padStart(3, "0");
    return `import day${day} from "./day${day}.js";`;
  }).join("\n");
  const dayList = Array.from({ length: 300 }, (_, index) => `day${String(index + 1).padStart(3, "0")}`).join(",\n  ");
  const body = `${imports}

export const vocabularyDays = [
  ${dayList},
];

export const vocabulary = vocabularyDays.flat();

export function getVocabularyByDay(dayNumber) {
  return vocabularyDays[Number(dayNumber) - 1] || [];
}

export function getAllVocabulary() {
  return vocabulary;
}

export function getVocabularyByTopic(topic) {
  return topic ? vocabulary.filter((item) => item.topic === topic) : vocabulary;
}

export function getVocabularyByLevel(level) {
  return level ? vocabulary.filter((item) => item.level === level) : vocabulary;
}

export function getTotalDays() {
  return vocabularyDays.length;
}

export function getTotalWords() {
  return vocabulary.length;
}

export default vocabulary;
`;
  fs.writeFileSync(path.join(outputDir, "index.js"), body, "utf8");
}

function writeMeta() {
  const topicNames = topics.map((topic) => topic.topic);
  const body = `export const TOTAL_DAYS = 300;
export const TOTAL_WORDS = 3000;
export const TOPICS = ${JSON.stringify(topicNames, null, 2)};
`;
  fs.writeFileSync(path.join(outputDir, "meta.js"), body, "utf8");
}

const allItems = buildAllItems();
writeFactory();
writeDayFiles(allItems);
writeIndex();
writeMeta();

console.log(`Generated ${allItems.length} vocabulary items in ${outputDir}`);
