import { Work } from '../types';
import { designers } from './designers';
import {
  convergenceDescriptionsByName,
  convergenceDescriptionsByStudentNumber,
  innovationDescriptionsByName,
  innovationDescriptionsByStudentNumber
} from './innovation-descriptions';

// 작품 제목 템플릿
const titlePrefixes = ['새로운', '변화하는', '연결된', '지속가능한', '미래의', '공감하는', '소통하는', '창의적인', '실험적인', '혁신적인'];
const titleSuffixes = ['시선', '이야기', '경험', '여정', '공간', '순간', '감각', '리듬', '조화', '울림'];

// 프로젝트 타입
const projectTypes = ['브랜딩', 'UI/UX 디자인', '편집 디자인', '타이포그래피', '일러스트레이션', '모션 그래픽', '패키지 디자인', '웹 디자인', '광고 디자인', '환경 디자인'];

// 사용 도구
const toolsOptions = [
  ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'],
  ['Figma', 'Sketch', 'Adobe XD'],
  ['After Effects', 'Cinema 4D', 'Blender'],
  ['Procreate', 'Adobe Fresco'],
  ['HTML/CSS', 'JavaScript', 'React']
];

// 태그
const tagOptions = [
  ['그래픽디자인', '타이포그래피', '브랜딩'],
  ['UI디자인', 'UX디자인', '인터랙션'],
  ['모션그래픽', '영상디자인', '3D'],
  ['일러스트레이션', '캐릭터디자인', '스토리텔링'],
  ['웹디자인', '반응형디자인', '프론트엔드']
];

// 작품 설명 템플릿
const descriptionTemplates = [
  "이 작품은 현대 사회의 복잡한 관계성을 시각적으로 풀어낸 프로젝트입니다. 다양한 디자인 요소와 창의적인 접근을 통해 새로운 시각적 경험을 제공하며, 세부적인 디테일과 조화로운 구성을 통해 관람객에게 깊은 인상을 남기는 것을 목표로 하였습니다.",
  "일상에서 쉽게 지나칠 수 있는 순간들을 포착하여 재해석한 작업입니다. 미니멀한 디자인 언어를 통해 본질적인 메시지를 전달하고자 했으며, 사용자와의 인터랙션을 통해 완성되는 경험을 설계했습니다.",
  "전통과 현대의 조화를 추구한 이 프로젝트는 한국적 정서를 현대적으로 재해석하였습니다. 디지털 매체의 특성을 활용하면서도 아날로그적 감성을 놓치지 않으려 노력했으며, 문화적 정체성에 대한 고민을 담았습니다.",
  "사용자 경험을 중심으로 설계된 이 작품은 직관적이면서도 혁신적인 인터페이스를 제공합니다. 데이터 분석을 바탕으로 사용자의 니즈를 파악하고, 이를 시각적으로 구현하여 효과적인 커뮤니케이션을 달성했습니다.",
  "환경과 지속가능성에 대한 메시지를 담은 프로젝트입니다. 친환경 소재와 공정을 고려한 디자인으로 실질적인 변화를 추구했으며, 시각적 아름다움과 사회적 가치를 동시에 실현하고자 했습니다."
];

// 교수 명단
const professors = {
  '혁신디자인스튜디오': ['김한솔 교수님', '손우성 교수님', '서승연 교수님', '안혜선 교수님'],
  '융합디자인스튜디오': ['유동관 교수님', '이원제 교수님', '신윤진 교수님', '남정 교수님']
};

// 혁신디자인스튜디오 작품/교수 수동 매핑 (이름 기준, 동명이인은 배열 순서로 매칭)
const innovationOverridesList: Array<{ name: string; title: string; professor?: string }> = [
  { name: '유환희', title: '거인에게서 살아남기', professor: '김한솔 교수님' },
  { name: '강규리', title: 'Prep: 나만의 AI 발표·면접 트레이너', professor: '서승연 교수님' },
  { name: '강민서', title: '비감정 보고서 : The Non-Affective Files', professor: '손우성 교수님' },
  { name: '고세진', title: 'KittyHouse', professor: '김한솔 교수님' },
  { name: '고유빈', title: 'ADXN Belief : 믿음 중독', professor: '김한솔 교수님' },
  { name: '고유정', title: 'Defamiliarization Project', professor: '서승연 교수님' },
  { name: '금예은', title: 'NEOFLORA', professor: '손우성 교수님' },
  { name: '김가은', title: 'How to be loved', professor: '김한솔 교수님' },
  { name: '김가현', title: 'Hamlet Syndrome', professor: '안혜선 교수님' },
  { name: '김다예', title: '향으로 여는 기억, <프루스트 현상>', professor: '손우성 교수님' },
  { name: '김미연', title: '극락고사: 극락왕생을 위한 당신의 선택', professor: '안혜선 교수님' },
  { name: '김민지', title: 'MEDINOTE', professor: '서승연 교수님' },
  { name: '김민지', title: '미래 복원 박물관', professor: '손우성 교수님' },
  { name: '김서영', title: 'D.E.LAB : 변종된 미래인간 아카이브', professor: '서승연 교수님' },
  { name: '김서진', title: '엉뚱한 데이트코스, 구트 GOOTE', professor: '서승연 교수님' },
  { name: '김세미', title: '나만의 오너먼트 - 패턴의 미학', professor: '안혜선 교수님' },
  { name: '김수연', title: 'HRFDI(폭염 대응 식품 개발 연구소)', professor: '김한솔 교수님' },
  { name: '김수인', title: 'Linked We are', professor: '김한솔 교수님' },
  { name: '김원경', title: '실시간으로 만드는 여행 지도: 프렌지', professor: '손우성 교수님' },
  { name: '김재겸', title: 'Deus ex Machina - 기계 장치에서 나온 신', professor: '손우성 교수님' },
  { name: '김준서', title: '국민기억부', professor: '손우성 교수님' },
  { name: '김지현', title: '오늘도 무사히', professor: '김한솔 교수님' },
  { name: '김지혜', title: '감정 기생충 분석기', professor: '안혜선 교수님' },
  { name: '김태희', title: '낯설고도 익숙한 레스토랑, Vescera', professor: '안혜선 교수님' },
  { name: '김혜림', title: '( )척', professor: '손우성 교수님' },
  { name: '김혜숙', title: '시선가도', professor: '서승연 교수님' },
  { name: '김혜진', title: '무정', professor: '서승연 교수님' },
  { name: '김희수', title: '베일링', professor: '안혜선 교수님' },
  { name: '명규민', title: 'MODO', professor: '서승연 교수님' },
  { name: '문송', title: 'AI 한글 암호 전쟁', professor: '손우성 교수님' },
  { name: '문예현', title: 'GENESIS LAB', professor: '김한솔 교수님' },
  { name: '박규영', title: 'K-pop 가계도', professor: '손우성 교수님' },
  { name: '박규희', title: '탁상행정 : TABLEWORK', professor: '김한솔 교수님' },
  { name: '박부규', title: '바이웨이', professor: '안혜선 교수님' },
  { name: '박서진', title: '인재(人災)보험사', professor: '손우성 교수님' },
  { name: '박소연', title: '신화력:신화로 읽는 달력', professor: '서승연 교수님' },
  { name: '박시온', title: '370: 과잉의 서가', professor: '김한솔 교수님' },
  { name: '박정민', title: 'REEF SAFE CLUB', professor: '김한솔 교수님' },
  { name: '박준혁', title: '한국인을 위한 서울 지도', professor: '손우성 교수님' },
  { name: '박하빈', title: 'FIDGET: 디자이너를 위한 피젯토이', professor: '손우성 교수님' },
  { name: '박하은', title: 'The Living Archive', professor: '안혜선 교수님' },
  { name: '박현민', title: '밈 별자리로 보는 시대의 궤적', professor: '서승연 교수님' },
  { name: '배가온', title: '디자인 별자리', professor: '손우성 교수님' },
  { name: '백지민', title: '스마트한 사회생활', professor: '안혜선 교수님' },
  { name: '송시후', title: '네버랜드 빌리지', professor: '김한솔 교수님' },
  { name: '송지수', title: '인간쓰레기 도감: 쓰레기 아포칼립스', professor: '서승연 교수님' },
  { name: '송희원', title: '보이지 않는 규칙: 어른들을 위한 예절 가이드', professor: '손우성 교수님' },
  { name: '신은혜', title: '독방체험: 디지털 세대를 위한 문해력 향상 보드게임', professor: '서승연 교수님' },
  { name: '안민', title: '감정의 공간으로', professor: '안혜선 교수님' },
  { name: '엄채은', title: 'CLOZYTECH : 나쁜습관의 미래', professor: '서승연 교수님' },
  { name: '유경주', title: 'Record of Silence', professor: '안혜선 교수님' },
  { name: '유서윤', title: 'TURN STRESS 5FF', professor: '김한솔 교수님' },
  { name: '유현정', title: '단어의 시간 여행', professor: '김한솔 교수님' },
  { name: '유현주', title: 'Villain Within', professor: '김한솔 교수님' },
  { name: '윤서진', title: 'Four seasons', professor: '안혜선 교수님' },
  { name: '이관렬', title: '날씨의 모습', professor: '서승연 교수님' },
  { name: '이서영', title: '믿음과 착각 사이', professor: '김한솔 교수님' },
  { name: '이승주', title: '버츄얼 프로젝트: Quetzal', professor: '손우성 교수님' },
  { name: '이예슬', title: '프리랜서 지망생을 위한 파티 팝업 브랜드', professor: '서승연 교수님' },
  { name: '이유진', title: '천사 숭배', professor: '안혜선 교수님' },
  { name: '이은솔', title: '매운맛 탐구 프로젝트 : MAPDA', professor: '안혜선 교수님' },
  { name: '이은진', title: '절망의 텍스트', professor: '손우성 교수님' },
  { name: '이정오', title: 'HUMON 도감', professor: '손우성 교수님' },
  { name: '이지수', title: '세상의 모든 데이', professor: '손우성 교수님' },
  { name: '이지수', title: '같은상징 다른이야기/ Object Subject', professor: '서승연 교수님' },
  { name: '이진영', title: 'Brickit', professor: '서승연 교수님' },
  { name: '이채영', title: '편안하지 않은 집', professor: '안혜선 교수님' },
  { name: '이현영', title: '극단적 완곡어법 라이브러리', professor: '안혜선 교수님' },
  { name: '이현정', title: 'THE AFTERSTARS', professor: '손우성 교수님' },
  { name: '이혜경', title: '목격담 아카이브', professor: '안혜선 교수님' },
  { name: '임아늘', title: '팔자상회, 운명을 팝니다.', professor: '김한솔 교수님' },
  { name: '임지은', title: 'Before the Disaster', professor: '안혜선 교수님' },
  { name: '임지현', title: '기억 없이, 사회에 던져졌습니다', professor: '김한솔 교수님' },
  { name: '전은총', title: '바흐 추에', professor: '서승연 교수님' },
  { name: '전초윤', title: '레전드이슈연구소', professor: '손우성 교수님' },
  { name: '정다인', title: '속담 리믹스 프로젝트', professor: '김한솔 교수님' },
  { name: '정유선', title: '21세기 청개구리 안전 국가 보고서', professor: '손우성 교수님' },
  { name: '정재원', title: 'Own Legacy', professor: '안혜선 교수님' },
  { name: '정지수', title: 'MetaphoRE : Sound of Metaphor', professor: '안혜선 교수님' },
  { name: '정지온', title: '21세기 쾌락의 정원', professor: '안혜선 교수님' },
  { name: '조은영', title: '온결', professor: '김한솔 교수님' },
  { name: '조은희', title: 'Emotion Bin', professor: '안혜선 교수님' },
  { name: '지예린', title: '사투리 교향곡', professor: '김한솔 교수님' },
  { name: '천다영', title: '디지털 21세기 화석 발굴관', professor: '안혜선 교수님' },
  { name: '최지윤', title: 'PLASTIQUARIUM', professor: '서승연 교수님' },
  { name: '최지윤', title: 'stick it my day', professor: '김한솔 교수님' },
  { name: '한유진', title: '꼬순내', professor: '안혜선 교수님' },
  { name: '허윤서', title: '사소한 죄의식으로부터의 해방', professor: '김한솔 교수님' },
  { name: '홍남영', title: '그들은 무엇을 두려워 했는가', professor: '안혜선 교수님' },
  { name: '홍유리', title: '9 RE:SENSES : 메마른 디지털 사회의 현대인들을 위한 감각 재생 키트', professor: '서승연 교수님' },
  { name: '황보민정', title: '기생건축: 도시의 숨은 생명체', professor: '김한솔 교수님' },
  { name: '박수진', title: '나쁜 아이도 크리스마스 선물 받아요', professor: '김한솔 교수님' },
  { name: '김아름', title: '자동차 관상학 / Car Physiognomy', professor: '손우성 교수님' },
  { name: '허자연', title: 'Nush', professor: '서승연 교수님' },
  // 개별 추가 요청
  { name: '이혁수', title: '반려돌: 감정이 선이 되는 정원', professor: '손우성 교수님' },
];

const innovationOverrides: Record<string, { title: string; professor?: string }[]> = innovationOverridesList.reduce((acc, cur) => {
  const arr = acc[cur.name] || [];
  arr.push({ title: cur.title, professor: cur.professor });
  acc[cur.name] = arr;
  return acc;
}, {} as Record<string, { title: string; professor?: string }[]>);

// 융합디자인스튜디오 작품/교수 수동 매핑 (이름 기준, 동명이인은 배열 순서로 매칭)
const convergenceOverridesList: Array<{ name: string; title: string; professor?: string }> = [
  { name: '유환희', title: 'Dani’s Magical Garden', professor: '신윤진 교수님' },
  { name: '강규리', title: 'Brompton: Fold & Custom', professor: '이원제 교수님' },
  { name: '강민서', title: 'CUSTOM TEA BRAND : OOTD', professor: '남정 교수님' },
  { name: '고세진', title: 'Nachat', professor: '신윤진 교수님' },
  { name: '고유빈', title: '나의 동네', professor: '유동관 교수님' },
  { name: '고유정', title: 'Hotel Staydium', professor: '신윤진 교수님' },
  { name: '금예은', title: '오늘의 집 브랜드 경험 프로젝트', professor: '이원제 교수님' },
  { name: '김가은', title: '인어의 팔레트', professor: '유동관 교수님' },
  { name: '김가현', title: '지구에 온 린트', professor: '유동관 교수님' },
  { name: '김다예', title: '깨달음의 길, <SATYA>', professor: '신윤진 교수님' },
  { name: '김미연', title: '향으로 기록하는 지구, Geosent31', professor: '남정 교수님' },
  { name: '김민지', title: 'CO-HAB', professor: '신윤진 교수님' },
  { name: '김민지', title: '어 그게... 거시기', professor: '신윤진 교수님' },
  { name: '김서영', title: 'MASIGN : 화성 시각언어 안내 시스템', professor: '신윤진 교수님' },
  { name: '김서진', title: '비행', professor: '유동관 교수님' },
  { name: '김세미', title: '바이닐즈 (Vinlyz)', professor: '남정 교수님' },
  { name: '김수연', title: '다이나믹 칵테일 바', professor: '이원제 교수님' },
  { name: '김수인', title: "S'CO", professor: '신윤진 교수님' },
  { name: '김원경', title: '조각조각 별', professor: '유동관 교수님' },
  { name: '김재겸', title: 'EVERLANE - better than ever', professor: '이원제 교수님' },
  { name: '김준서', title: '로컬 중심 여행동선 추천 서비스', professor: '이원제 교수님' },
  { name: '김지현', title: 'YARNN', professor: '남정 교수님' },
  { name: '김지혜', title: '개인 맞춤형 마스크팩 facefit', professor: '남정 교수님' },
  { name: '김태희', title: '차와 시를 잇는 공간, Poetea', professor: '남정 교수님' },
  { name: '김혜림', title: 'ROOKIE', professor: '남정 교수님' },
  { name: '김혜숙', title: '기억을 휘날리다', professor: '신윤진 교수님' },
  { name: '김혜진', title: '버려진 인형', professor: '유동관 교수님' },
  { name: '김희수', title: '꽃밭', professor: '유동관 교수님' },
  { name: '명규민', title: '별구름 팬케이크', professor: '유동관 교수님' },
  { name: '문송', title: '난 디저트 아니면 안 먹어!', professor: '유동관 교수님' },
  { name: '문예현', title: 'NEURING', professor: '남정 교수님' },
  { name: '박규영', title: 'Flying Tiger Copenhagen Rebranding', professor: '이원제 교수님' },
  { name: '박규희', title: '퍼스널 웨딩 플래너, WEDYS', professor: '남정 교수님' },
  { name: '박부규', title: '씬짜오, 씬짜오', professor: '유동관 교수님' },
  { name: '박서진', title: '신(新)한자 프로젝트', professor: '신윤진 교수님' },
  { name: '박소연', title: 'MeMemorial Park', professor: '신윤진 교수님' },
  { name: '박시온', title: 'Camel Lion Child', professor: '신윤진 교수님' },
  { name: '박정민', title: 'Stack', professor: '신윤진 교수님' },
  { name: '박준혁', title: 'Accord : Persnal Fragrance Curation', professor: '이원제 교수님' },
  { name: '박하빈', title: 'AUM', professor: '남정 교수님' },
  { name: '박하은', title: 'RECNIC', professor: '남정 교수님' },
  { name: '박현민', title: 'WAGGLY | 교감으로 완성하는 펫케어', professor: '이원제 교수님' },
  { name: '배가온', title: 'MURMUR MOTION', professor: '신윤진 교수님' },
  { name: '백지민', title: '감정여행', professor: '유동관 교수님' },
  { name: '송시후', title: 'Dear.', professor: '남정 교수님' },
  { name: '송지수', title: 'Case #182: 스미싱 범죄를 잡아라!', professor: '신윤진 교수님' },
  { name: '송희원', title: '따라가유', professor: '신윤진 교수님' },
  { name: '신은혜', title: '페토페스 : 반려동물 입양자격을 위한 가상훈련 시스템', professor: '신윤진 교수님' },
  { name: '안민', title: '페르가 도와줄게', professor: '유동관 교수님' },
  { name: '엄채은', title: '욕심보다 더 큰 열매', professor: '유동관 교수님' },
  { name: '유경주', title: 'SleepHy', professor: '신윤진 교수님' },
  { name: '유서윤', title: 'SPONGE BRAIN', professor: '신윤진 교수님' },
  { name: '유현정', title: 'RE:NEWSIC (리뉴직)', professor: '신윤진 교수님' },
  { name: '유현주', title: '직업 혐오의 메커니즘', professor: '신윤진 교수님' },
  { name: '윤서진', title: '별을 주운 고양이', professor: '유동관 교수님' },
  { name: '이관렬', title: '프리미엄 세탁소 - Prestige', professor: '이원제 교수님' },
  { name: '이서영', title: '사쿠라의 도전', professor: '신윤진 교수님' },
  { name: '이승주', title: '할머니의 조각보', professor: '유동관 교수님' },
  { name: '이예슬', title: '나쁜 언어 개선 도우미 서비스 BEEP', professor: '남정 교수님' },
  { name: '이유진', title: 'Naomi Vona X DOVER STREET MARKET', professor: '이원제 교수님' },
  { name: '이은솔', title: 'Ramuseum : 전 세계 라면 편의점', professor: '이원제 교수님' },
  { name: '이은진', title: '여명 아래', professor: '유동관 교수님' },
  { name: '이정오', title: 'FORGOTTEN', professor: '이원제 교수님' },
  { name: '이지수', title: '물결 흐르는', professor: '유동관 교수님' },
  { name: '이지수', title: '별아의 옷장', professor: '유동관 교수님' },
  { name: '이진영', title: '프리미엄 조명 브랜드 – Lumine', professor: '이원제 교수님' },
  { name: '이채영', title: 'INWARD', professor: '남정 교수님' },
  { name: '이현영', title: '동네 미용실 디제잉 파티 : 싹둑 레이브', professor: '남정 교수님' },
  { name: '이현정', title: '사계의 여정', professor: '유동관 교수님' },
  { name: '이혜경', title: '하나의 첫 심부름', professor: '유동관 교수님' },
  { name: '임아늘', title: '신선하고 간편한 식사의 시작, 블루에이프런', professor: '이원제 교수님' },
  { name: '임지은', title: 'EXITALK 엑시톡', professor: '남정 교수님' },
  { name: '임지현', title: 'TIMELOG', professor: '남정 교수님' },
  { name: '전은총', title: 'Toastable', professor: '신윤진 교수님' },
  { name: '전초윤', title: 'Lincon : K-pop 콘서트 관람을 위한 단 하나의 플랫폼', professor: '신윤진 교수님' },
  { name: '정다인', title: 'SCENTRY | 향과 감각으로 떠나는 자연 여행', professor: '이원제 교수님' },
  { name: '정유선', title: '세상에서 가장작은 코끼리', professor: '유동관 교수님' },
  { name: '정재원', title: 'BUNBYRUN : 번바이런', professor: '남정 교수님' },
  { name: '정지수', title: 'OMNISIA : Synesthesia Becomes Presence', professor: '남정 교수님' },
  { name: '정지온', title: 'Ortolan', professor: '유동관 교수님' },
  { name: '조은영', title: '씨네틈', professor: '남정 교수님' },
  { name: '조은희', title: '보이지 않는 두려움', professor: '유동관 교수님' },
  { name: '지예린', title: 'Loopin', professor: '남정 교수님' },
  { name: '천다영', title: '시니어를 위한 덕질 리스트', professor: '남정 교수님' },
  { name: '최지윤', title: 'SLOWTONE(슬로우톤)', professor: '남정 교수님' },
  { name: '최지윤', title: 'UGLY DOG CLUB', professor: '남정 교수님' },
  { name: '한유진', title: '삶은 고양이처럼', professor: '유동관 교수님' },
  { name: '허윤서', title: 'Snove 스노브', professor: '남정 교수님' },
  { name: '홍남영', title: '화성 정착민 감정 기록: Marenfold', professor: '신윤진 교수님' },
  { name: '홍유리', title: 'Light Up : AI 기반 스마트 뷰티 케어', professor: '신윤진 교수님' },
  { name: '황보민정', title: '부유하는 시간, Oloo', professor: '남정 교수님' },
  { name: '박수진', title: '한입의 달콤한 세계여행 TREETS!', professor: '남정 교수님' },
  { name: '김아름', title: '야생 속으로 / Into the Wilderness', professor: '이원제 교수님' },
  { name: '허자연', title: 'Plan Bee', professor: '신윤진 교수님' },
  // 개별 추가 요청
  { name: '이혁수', title: 'MOPEZ: Customize Your Ride', professor: '이원제 교수님' },
];

const convergenceOverrides: Record<string, { title: string; professor?: string }[]> = convergenceOverridesList.reduce((acc, cur) => {
  const arr = acc[cur.name] || [];
  arr.push({ title: cur.title, professor: cur.professor });
  acc[cur.name] = arr;
  return acc;
}, {} as Record<string, { title: string; professor?: string }[]>);

// 작품 데이터 생성 함수
function generateWorks(): Work[] {
  const works: Work[] = [];
  let workId = 1;
  const innovationSeq: Record<string, number> = {};
  const convergenceSeq: Record<string, number> = {};

  designers.forEach((designer) => {
    // 디자이너 상세 페이지 요구사항: 스튜디오 2개(융합/혁신)로 고정 생성
    const categories: Array<'혁신디자인스튜디오' | '융합디자인스튜디오'> = ['융합디자인스튜디오', '혁신디자인스튜디오'];

    categories.forEach((category) => {
      const projectType = projectTypes[Math.floor(Math.random() * projectTypes.length)];
      const toolsIndex = Math.floor(Math.random() * toolsOptions.length);
      const tagIndex = Math.floor(Math.random() * tagOptions.length);

      // 이미지 개수 (3-6개)
      const numImages = Math.floor(Math.random() * 4) + 3;
      const images = Array.from({ length: numImages }, (_, idx) => `/images/works/work-${workId}-${idx + 1}.jpg`);

      // 기본값들
      let title = `${titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)]} ${titleSuffixes[Math.floor(Math.random() * titleSuffixes.length)]}`;
      let professor = professors[category][Math.floor(Math.random() * professors[category].length)];
      let description = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];

      // 혁신디자인스튜디오 수동 오버라이드 적용
      if (category === '혁신디자인스튜디오') {
        const seq = innovationSeq[designer.name] || 0;
        const overrideList = innovationOverrides[designer.name];
        const override = Array.isArray(overrideList) ? overrideList[seq] : undefined;
        if (override) {
          title = override.title;
          if (override.professor) professor = override.professor;
        }

        const nameDescriptions = innovationDescriptionsByName[designer.name];
        const descriptionByName = nameDescriptions?.[seq];
        if (descriptionByName) {
          description = descriptionByName;
        }

        const studentNumber = designer.student_number;
        if (studentNumber) {
          const descriptionOverride = innovationDescriptionsByStudentNumber[studentNumber];
          if (descriptionOverride) {
            description = descriptionOverride;
          }
        }

        innovationSeq[designer.name] = seq + 1;
      }

      // 융합디자인스튜디오 수동 오버라이드 적용
      if (category === '융합디자인스튜디오') {
        const seq = convergenceSeq[designer.name] || 0;
        const overrideList = convergenceOverrides[designer.name];
        const override = Array.isArray(overrideList) ? overrideList[seq] : undefined;
        if (override) {
          title = override.title;
          if (override.professor) professor = override.professor;
        }

        const nameDescriptions = convergenceDescriptionsByName[designer.name];
        const descriptionByName = nameDescriptions?.[seq];
        if (descriptionByName) {
          description = descriptionByName;
        }

        const studentNumber = designer.student_number;
        if (studentNumber) {
          const descriptionOverride = convergenceDescriptionsByStudentNumber[studentNumber];
          if (descriptionOverride) {
            description = descriptionOverride;
          }
        }

        convergenceSeq[designer.name] = seq + 1;
      }

      works.push({
        id: workId,
        title,
        description,
        images,
        thumbnail: `/images/works/work-${workId}-thumb.jpg`,
        category,
        professor,
        tags: tagOptions[tagIndex],
        userId: designer.id,
        projectType,
        tools: toolsOptions[toolsIndex],
        year: 2025,
      });

      workId++;
    });
  });

  return works;
}

// 작품 데이터 export
export const works: Work[] = generateWorks();

// ID로 작품 찾기
export function getWorkById(id: number): Work | undefined {
  return works.find(work => work.id === id);
}

// 사용자 ID로 작품 찾기
export function getWorksByUserId(userId: number): Work[] {
  return works.filter(work => work.userId === userId);
}

// 카테고리별 작품 찾기
export function getWorksByCategory(category: '혁신디자인스튜디오' | '융합디자인스튜디오'): Work[] {
  return works.filter(work => work.category === category);
}

// 프로젝트 타입별 작품 찾기
export function getWorksByProjectType(projectType: string): Work[] {
  return works.filter(work => work.projectType === projectType);
}

// 태그로 작품 검색
export function searchWorksByTag(tag: string): Work[] {
  return works.filter(work => work.tags.includes(tag));
}

// 제목이나 설명으로 작품 검색
export function searchWorks(query: string): Work[] {
  const lowerQuery = query.toLowerCase();
  return works.filter(work => 
    work.title.toLowerCase().includes(lowerQuery) ||
    work.description.toLowerCase().includes(lowerQuery)
  );
}
