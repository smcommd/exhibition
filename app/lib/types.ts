export type StudioKey = '혁신디자인스튜디오' | '융합디자인스튜디오'

// 디자이너(학생) 타입 정의
export interface Designer {
  id: number;
  name: string;
  major: string;
  studios: StudioKey[];
  profile_image: string;
  profile_blur_data_url?: string;
  profile_width?: number;
  profile_height?: number;
  bio: string;
  email: string;
  instagram?: string;
  website?: string;
  interview1: string;
  interview2: string;
  student_number?: string;
  innovation_thumbnail_path?: string;
  innovation_detail_path?: string;
  convergence_thumbnail_path?: string;
  convergence_detail_path?: string;
}

// 작품 타입 정의
export interface Work {
  id: number;
  title: string;
  description: string;
  images: string[];
  thumbnail: string;
  category: StudioKey;
  professor: string;
  tags: string[];
  userId: number; // Designer의 id와 연결
  designerName: string;
  projectType: string; // 프로젝트 유형 (브랜딩, UI/UX, 편집, 타이포그래피 등)
  tools?: string[]; // 사용 도구 (Photoshop, Illustrator, Figma 등)
  year: number;
}

// 교수 타입 정의
export interface Professor {
  id: number;
  name: string;
  studio: StudioKey;
  position?: string;
}

// 졸업전시 정보 타입
export interface Exhibition {
  id: number;
  year: number;
  title: string;
  subtitle: string;
  theme: string;
  startDate: string;
  endDate: string;
  location: string;
  address: string;
  openingDate: string;
  openingTime: string;
}
