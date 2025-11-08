import { Designer, StudioKey } from '../types';
import {
  realStudentData as studentData,
  instagramHandlesByName,
  emailByName,
  bioByName,
  interview1ByName,
  interview2ByName,
  buildStudentNameKey,
} from './student-data';

// 실제 학생 데이터는 student-data.ts에서 import
/* const studentData = [
  { name: '강규리', studentNumber: '202120194', phone: '010 7167 4120', email: 'kyuri1414@naver.com' },
  { name: '강민서', studentNumber: '202220190', phone: '010 4751 8353', email: 'det072927@gmail.com' },
  { name: '고세진', studentNumber: '202120200', phone: '010 4227 0109', email: 'stopsejin@gmail.com' },
  { name: '고유빈', studentNumber: '202020188', phone: '010 9265 9553', email: 'gyubbin30@gmail.com' },
  { name: '고유정', studentNumber: '202120201', phone: '010 5766 8909', email: 'rhdbwjd8909@gmail.com' },
  { name: '금예은', studentNumber: '202120208', phone: '010 2680 1871', email: 'miso1871@naver.com' },
  { name: '김가은', studentNumber: '202220206', phone: '010 2529 1884', email: 'beyeong1884@gmail.com' },
  { name: '김가현', studentNumber: '202220207', phone: '010 2200 4300', email: 'ghkim4300@gmail.com' },
  { name: '김다예', studentNumber: '202120213', phone: '010 4936 1664', email: 'gdaye1334@gmail.com' },
  { name: '김미연', studentNumber: '202120216', phone: '010 5250 9281', email: 'miyeonkim37@gmail.com' },
  { name: '김민지', studentNumber: '202120222', phone: '010 6769 1517', email: 'mj22.ala@gmail.com' },
  { name: '김민지', studentNumber: '202120221', phone: '010 2274 2496', email: 'charlotte061680@gmail.com' },
  { name: '김서영', studentNumber: '202120225', phone: '010 4899 6370', email: 'idsy1549@naver.com' },
  { name: '김서진', studentNumber: '202120227', phone: '010 9956 3718', email: 'sjk080529334@gmail.com' },
  { name: '김세미', studentNumber: '201820460', phone: '010 7768 9113', email: 'gvgvmm1202@naver.com' },
  { name: '김수연', studentNumber: '202120229', phone: '010 5184 9179', email: 'kimsy9179@naver.com' },
  { name: '김수인', studentNumber: '202120230', phone: '010 9470 2390', email: 'sooiiin24@gmail.com' },
  { name: '김아름', studentNumber: '202120233', phone: '010 8077 0295', email: 'jangin0708@gmail.com' },
  { name: '김원경', studentNumber: '202120235', phone: '010 9868 8400', email: 'yuki121002@naver.com' },
  { name: '김유빈', studentNumber: '202121457', phone: '010 9402 0696', email: 'bibbi0406@gmail.com' },
  { name: '김은영', studentNumber: '202220233', phone: '010 2874 9752', email: 'kimeunyeong0220@gmail.com' },
  { name: '김재겸', studentNumber: '202020227', phone: '010 3147 0936', email: 'kjbj1031@gmail.com' },
  { name: '김준서', studentNumber: '202020231', phone: '010 6486 9656', email: 'kimkjs100@naver.com' },
  { name: '김지현', studentNumber: '202121459', phone: '010 7577 6527', email: 'ooib_@naver.com' },
  { name: '김지혜', studentNumber: '202120242', phone: '010 2465 0818', email: 'kimjhye0903@gmail.com' },
  { name: '김채연', studentNumber: '202020408', phone: '010 9635 3656', email: 'ellen_k01@naver.com' },
  { name: '김태희', studentNumber: '202120244', phone: '010 3760 3441', email: 'tb3441@naver.com' },
  { name: '김하늘', studentNumber: '202020237', phone: '010 8286 2132', email: 'gksmf7686@naver.com' },
  { name: '김하은', studentNumber: '202220242', phone: '010 2396 7339', email: 'haeunkim2002@gmail.com' },
  { name: '김혜림', studentNumber: '202120248', phone: '010 7748 2905', email: 'khr05252@naver.com' },
  { name: '김혜숙', studentNumber: '202220248', phone: '010 4680 0436', email: 'hhye0718@naver.com' },
  { name: '김혜진', studentNumber: '202220249', phone: '010 9069 1985', email: 'kkimhj030417@gmail.com' },
  { name: '김희수', studentNumber: '202020240', phone: '010 9530 2125', email: 'khsu010203@gmail.com' },
  { name: '명규민', studentNumber: '202120258', phone: '010 4136 9676', email: 'gm021219@naver.com' },
  { name: '문송', studentNumber: '202120261', phone: '010 5395 3485', email: 'ssonge1255@gmail.com' },
  { name: '문예현', studentNumber: '202020475', phone: '010 8434 3916', email: 'linamoon01@naver.com' },
  { name: '박규영', studentNumber: '202120264', phone: '010 6645 7355', email: 'duddl_8@naver.com' },
  { name: '박규희', studentNumber: '202120265', phone: '010 3064 2618', email: 'kkyuheeya0408@gmail.com' },
  { name: '박부규', studentNumber: '202120268', phone: '010 4224 3660', email: 'syp107277001@gmail.com' },
  { name: '박서진', studentNumber: '202120269', phone: '010 2906 2057', email: 'sepjini2057@gmail.com' },
  { name: '박소연', studentNumber: '202021406', phone: '010 2705 6394', email: 'amyroom0201@gmail.com' },
  { name: '박수진', studentNumber: '202121460', phone: '010 8816 4172', email: 'tnwlsdl1214@naver.com' },
  { name: '박시온', studentNumber: '202120275', phone: '010 5549 5449', email: 'ooo5440@naver.com' },
  { name: '박정민', studentNumber: '202120281', phone: '010 7714 6116', email: 'gimigimi72@naver.com' },
  { name: '박준혁', studentNumber: '202020052', phone: '010 6486 3146', email: 'jacobopark@naver.com' },
  { name: '박하빈', studentNumber: '202020260', phone: '010 6725 1243', email: 'habin0624@naver.com' },
  { name: '박하은', studentNumber: '202221492', phone: '010 3799 4295', email: 'hayen730@naver.com' },
  { name: '박현민', studentNumber: '202121461', phone: '010 9580 3889', email: 'phm0237@naver.com' },
  { name: '배가온', studentNumber: '202120287', phone: '010 3857 4933', email: 'qorkdhs3857@gmail.com' },
  { name: '백지민', studentNumber: '202221493', phone: '010 2216 6201', email: 'jimini6201@naver.com' },
  { name: '서다연', studentNumber: '201720241', phone: '010 9438 0182', email: 'sdy526@naver.com' },
  { name: '송시후', studentNumber: '202220285', phone: '010 3411 6617', email: 'songsilu7@gmail.com' },
  { name: '송지수', studentNumber: '202120301', phone: '010 9142 4632', email: 'jssong1115@naver.com' },
  { name: '송희원', studentNumber: '202021395', phone: '010 4335 7140', email: 'gstdvvip@naver.com' },
  { name: '신은혜', studentNumber: '202221494', phone: '010 6628 8832', email: 'ququb1234@gmail.com' },
  { name: '안민', studentNumber: '202120312', phone: '010 3374 8662', email: 'asbin1005@gmail.com' },
  { name: '엄채은', studentNumber: '202220302', phone: '010 6652 6643', email: 'codms1588@naver.com' },
  { name: '오민주', studentNumber: '201820257', phone: '010-8301-0087', email: 'minju3374@gmail.com' },
  { name: '유경주', studentNumber: '202120319', phone: '010 4490 6221', email: 'roro_owo@naver.com' },
  { name: '유서윤', studentNumber: '202120320', phone: '010 6500 0824', email: 'fuha2001@gmail.com' },
  { name: '유현정', studentNumber: '202120322', phone: '010 7630 8331', email: 'yhj21340@naver.com' },
  { name: '유현주', studentNumber: '202220312', phone: '010 3340 8331', email: '202220312@sangmyung.kr' },
  { name: '유환희', studentNumber: '202020295', phone: '010 5060 5495', email: 'book7194@gmail.com' },
  { name: '윤서진', studentNumber: '202120323', phone: '010 7212 3393', email: 'smu21ysj@gmail.com' },
  { name: '이관렬', studentNumber: '202020303', phone: '010 8220 1261', email: 'gwanlyeoli@gmail.com' },
  { name: '이서영', studentNumber: '202121463', phone: '010 6687 0245', email: 'seoyoung020503@gmail.com' },
  { name: '이소현', studentNumber: '201820269', phone: '010 3124 6783', email: 'oxhyun128@naver.com' },
  { name: '이수현', studentNumber: '202221495', phone: '010 3396 2813', email: 'luve2813@naver.com' },
  { name: '이승주', studentNumber: '202020310', phone: '010 7942 1523', email: 'luh321264@gmail.com' },
  { name: '이예슬', studentNumber: '202220326', phone: '010 3354 7360', email: 'daepts01@naver.com' },
  { name: '이유진', studentNumber: '202120338', phone: '010 9880 2028', email: 'dldbwls726@gmail.com' },
  { name: '이은민', studentNumber: '202120340', phone: '010 7108 6373', email: 'dmsalsdl1203@naver.com' },
  { name: '이은솔', studentNumber: '202220330', phone: '010 3319 6087', email: 'leees0903@naver.com' },
  { name: '이은진', studentNumber: '201920265', phone: '010 4841 2287', email: 'catlee74@naver.com' },
  { name: '이정오', studentNumber: '202020319', phone: '010 4424 3439', email: 'wjddh1201@gmail.com' },
  { name: '이지수', studentNumber: '202140343', phone: '010 3739 9780', email: 'cocu1234@naver.com' },
  { name: '이지수', studentNumber: '202120344', phone: '010 3400 3378', email: 'dl239287@gmail.com' },
  { name: '이진영', studentNumber: '202121484', phone: '010 4106 5116', email: 'leejy54231@naver.com' },
  { name: '이채영', studentNumber: '202120347', phone: '010 9755 3989', email: 'tjsdndlcodud1@gmail.com' },
  { name: '이혁수', studentNumber: '202021410', phone: '010 7494 5414', email: 'hslee000106@gmail.com' },
  { name: '이현영', studentNumber: '202120348', phone: '010 6773 0687', email: 'smanhyy@gmail.com' },
  { name: '이현정', studentNumber: '202221497', phone: '010 4059 5408', email: 'lee540855@gmail.com' },
  { name: '이혜경', studentNumber: '202120349', phone: '010 2650 4079', email: 'ms40790@naver.com' },
  { name: '임아늘', studentNumber: '202120354', phone: '010 3597 7354', email: 'limdksmf@gmail.com' },
  { name: '임지은', studentNumber: '202120358', phone: '010 7121 3529', email: 'bella1124@naver.com' },
  { name: '임지현', studentNumber: '202120359', phone: '010 4877 8323', email: 'sdrhc146@gmail.com' },
  { name: '전은총', studentNumber: '202120362', phone: '010 2633 7984', email: 'vvvapak@gmail.com' },
  { name: '전초윤', studentNumber: '202120364', phone: '010 8225 8545', email: 'chdnsdldmldk@naver.com' },
  { name: '정다인', studentNumber: '202220350', phone: '010 8341 5959', email: 'jeongdain7@naver.com' },
  { name: '정명진', studentNumber: '202220351', phone: '010 7528 3418', email: 'jinpink10@gmail.com' },
  { name: '정유선', studentNumber: '202120370', phone: '010 4728 1939', email: 'qorhvk1507@gmail.com' },
  { name: '정재원', studentNumber: '202020348', phone: '010 3940 2661', email: 'jaewon3940@gmail.com' },
  { name: '정지수', studentNumber: '202120377', phone: '010 3092 9212', email: 'seagull0032@naver.com' },
  { name: '정지온', studentNumber: '201920294', phone: '010 6518 2499', email: 'jiondog@naver.com' },
  { name: '조은영', studentNumber: '202120384', phone: '010 9475 7364', email: 'eyoung2627@gmail.com' },
  { name: '조은희', studentNumber: '202120385', phone: '010 5105 0311', email: 'whdmsgml0311@naver.com' },
  { name: '지예린', studentNumber: '202221498', phone: '010 6680 5623', email: 'ryusday0925@gmail.com' },
  { name: '천다영', studentNumber: '202120388', phone: '010 3776 1394', email: 'cj457927@gmail.com' },
  { name: '최지윤', studentNumber: '202020381', phone: '010 3483 3042', email: 'jeenee0826@naver.com' },
  { name: '최지윤', studentNumber: '202120393', phone: '010 4052 5594', email: 'vhrxkstlwkr1234@naver.com' },
  { name: '한유진', studentNumber: '202120396', phone: '010 8864 2427', email: '202120396@sangmyung.kr' },
  { name: '허림', studentNumber: '202020393', phone: '010 9443 4761', email: 'rim4761@naver.com' },
  { name: '허윤서', studentNumber: '202120400', phone: '010 9074 7612', email: 'holly0928@naver.com' },
  { name: '허자연', studentNumber: '202120401', phone: '010 3521 6514', email: 'wiint.nov@gmail.com' },
  { name: '홍남영', studentNumber: '202120402', phone: '010 2569 4233', email: 'hny0207@naver.com' },
  { name: '홍유리', studentNumber: '202020399', phone: '010 6679 0555', email: '8410hong@naver.com' },
  { name: '황보민정', studentNumber: '202020402', phone: '010 3700 3018', email: 'hbmj0511@gmail.com' }
]; */

// 인터뷰 답변 템플릿
const interview1Templates = [
  "이번 전시를 통해 4년간의 배움과 경험을 표현할 수 있어서 뜻깊었습니다. 많은 시행착오와 고민을 거쳐 완성된 작품들이라 더욱 의미가 있습니다.",
  "졸업 전시는 제게 있어 하나의 마침표이자 새로운 시작점입니다. 그동안 배운 것들을 종합하여 보여줄 수 있는 기회였고, 앞으로 나아갈 방향을 고민하는 시간이었습니다.",
  "처음엔 막막했지만, 작품을 하나씩 완성해가며 성장하는 제 자신을 발견할 수 있었습니다. 특히 동료들과 함께 준비하며 많은 것을 배웠습니다.",
  "전시를 준비하면서 디자이너로서의 정체성을 확립할 수 있었습니다. 제 작품을 통해 관객들과 소통할 수 있다는 점이 가장 보람있었습니다.",
  "긴장되면서도 설레는 경험이었습니다. 4년간의 노력이 결실을 맺는 순간이라 감회가 새롭고, 많은 분들께 제 작품을 선보일 수 있어 기뻤습니다."
];

const interview2Templates = [
  "작업 과정에서 가장 어려웠던 점은 콘셉트를 명확히 정의하고 그것을 시각적으로 표현하는 과정이었습니다. 여러 번의 피드백과 수정을 거쳐 최종 결과물을 만들어내는 과정이 기억에 남습니다.",
  "아이디어는 많았지만, 그것을 구체화하고 실현하는 과정이 가장 도전적이었습니다. 특히 기술적인 한계를 극복하면서도 창의성을 잃지 않으려 노력했습니다.",
  "사용자의 관점에서 생각하고 디자인하는 것이 가장 큰 고민이었습니다. 단순히 예쁜 디자인이 아닌, 실제로 가치를 전달할 수 있는 작품을 만들고자 했습니다.",
  "주제를 선정하는 과정부터 쉽지 않았습니다. 제가 진정으로 표현하고 싶은 것이 무엇인지 깊이 고민했고, 그 과정에서 저 자신에 대해서도 많이 알게 되었습니다.",
  "디테일을 놓치지 않으면서도 전체적인 조화를 이루는 것이 어려웠습니다. 작은 요소 하나하나가 전체 작품에 미치는 영향을 고려하며 작업했습니다."
];

const bioTemplates = [
  "디자인을 통해 새로운 가치를 창출하고자 합니다. 시각 디자인을 중심으로 다양한 미디어와 플랫폼에서 사용자 경험을 향상시키는 작업을 진행해왔습니다.",
  "일상 속 작은 불편함을 해결하는 디자인을 추구합니다. 사용자 중심의 사고로 더 나은 경험을 만들어가는 디자이너가 되고자 합니다.",
  "창의적인 시각 언어로 메시지를 전달하는 것에 관심이 많습니다. 브랜딩과 아이덴티티 디자인을 중심으로 활동하고 있습니다.",
  "디지털과 아날로그의 경계를 넘나들며 실험적인 작업을 추구합니다. 새로운 기술과 전통적인 디자인 방법론을 융합하여 독창적인 결과물을 만들어냅니다.",
  "소통과 공감을 중시하는 디자이너입니다. 디자인이 사회에 긍정적인 영향을 미칠 수 있다고 믿으며, 의미 있는 프로젝트에 참여하고자 합니다."
];

const normalizeInstagramHandle = (handle?: string): string =>
  (handle ?? '').trim().replace(/^@/, '');

// 실제 디자이너 데이터 생성
export function generateDesigners(inputStudentData?: any[]): Designer[] {
  const dataToUse = inputStudentData || studentData;
  return dataToUse.map((student, index) => {
    const nameKey = buildStudentNameKey(student.name, student.studentNumber);
    const instagram = normalizeInstagramHandle(
      instagramHandlesByName[nameKey] ?? instagramHandlesByName[student.name],
    );
    const email =
      emailByName[nameKey] ?? emailByName[student.name] ?? student.email;

    const bio =
      bioByName[nameKey] ??
      bioByName[student.name] ??
      bioTemplates[Math.floor(Math.random() * bioTemplates.length)];

    const interview1 =
      interview1ByName[nameKey] ??
      interview1ByName[student.name] ??
      interview1Templates[Math.floor(Math.random() * interview1Templates.length)];

    const interview2 =
      interview2ByName[nameKey] ??
      interview2ByName[student.name] ??
      interview2Templates[Math.floor(Math.random() * interview2Templates.length)];

    return {
      id: index + 1,
      name: student.name,
      major: '커뮤니케이션디자인',
      studios: ['혁신디자인스튜디오', '융합디자인스튜디오'],
      profile_image: `/images/profiles/user-${index + 1}.jpg`,
      bio,
      email,
      instagram: instagram,
      website: undefined,
      interview1,
      interview2,
      student_number: student.studentNumber
    };
  });
}

// 디자이너 데이터 export
export const designers: Designer[] = generateDesigners();

// ID로 디자이너 찾기
export function getDesignerById(id: number): Designer | undefined {
  return designers.find(designer => designer.id === id);
}

// 스튜디오별 디자이너 찾기
export function getDesignersByStudio(studio: StudioKey): Designer[] {
  return designers.filter(designer => designer.studios.includes(studio));
}

// 이름으로 디자이너 검색
export function searchDesignersByName(query: string): Designer[] {
  const lowerQuery = query.toLowerCase();
  return designers.filter(designer => 
    designer.name.toLowerCase().includes(lowerQuery)
  );
}

// 학번으로 디자이너 찾기
export function getDesignerByStudentNumber(studentNumber: string): Designer | undefined {
  return designers.find(designer => designer.student_number === studentNumber);
}
