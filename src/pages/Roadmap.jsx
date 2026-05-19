const roadmap = [
  [
    "Day 1-50",
    "Foundation A1",
    "Học từ cơ bản về bản thân, gia đình, trường học, đồ vật và hành động thường ngày.",
  ],
  [
    "Day 51-110",
    "Elementary A2",
    "Học từ giao tiếp phổ biến, thói quen, du lịch, mua sắm và công việc cơ bản.",
  ],
  [
    "Day 111-210",
    "Intermediate B1",
    "Học từ theo chủ đề IELTS như education, health, environment, technology và society.",
  ],
  [
    "Day 211-300",
    "Upper-intermediate B2 / IELTS 5.5-6.5",
    "Học từ học thuật nhẹ, collocation, opinion vocabulary, cause-effect và problem-solution.",
  ],
];

const steps = [
  "Học 10 từ",
  "Viết lại từ",
  "Đọc to ví dụ",
  "Tự đặt câu",
  "Làm quiz",
  "Ôn lại ngày hôm sau",
];

export default function Roadmap() {
  return (
    <div className="page-shell">
      <div className="mb-6">
        <p className="text-sm font-bold text-leaf">Roadmap</p>
        <h1 className="text-3xl font-black">Lộ trình 300 ngày</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Từ A1 đến B2, phù hợp người mới bắt đầu xây nền để hướng tới mục tiêu IELTS 6.5.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="grid gap-3">
          {roadmap.map(([days, topic, description], index) => (
            <article key={days} className="panel flex items-center gap-4 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-skysoft text-sm font-black text-leaf">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-black">{days}</h2>
                <p className="font-semibold text-slate-700">{topic}</p>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="panel p-6">
          <h2 className="text-xl font-black">Cách học mỗi ngày</h2>
          <ol className="mt-4 grid gap-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 font-semibold text-slate-700">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-leaf text-sm font-black text-white">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
