// 푸터 상수들
export const FOOTER_CONSTANTS = {
  COLORS: {
    BACKGROUND: '#171717',
    TEXT: '#FBFBFB',
    BAR: {
      GRAY: '#DFDFDF',
      GREEN: '#DDFF8E', 
      BROWN: '#D5B27D',
      BLUE: '#B5EEFF'
    }
  },
  
  DIMENSIONS: {
    HEIGHT: '260px',
    BAR_HEIGHT: '11px'
  },
  
  EXHIBITION_DATA: {
    TITLE: '2025 상명대학교\n커뮤니케이션디자인전공 졸업전시\n지우고, 다시 쓰고, 반복하는',
    DATES: '2025.11.14(금) – 11.18(화) 11:00 – 19:00',
    VENUE: '더 서울라이티움 제1전시장\n서울특별시 성동구 서울숲2길 32-14\n갤러리아포레 G층(B2층)',
    INSTAGRAM: '@smucd2025'
    // PHONE: '031-0000-0000'
  },
  
  LABELS: {
    OPENING: '전시오프닝',
    VENUE: '전시장 위치', 
    INSTAGRAM: '인스타그램',
    // PHONE: '문의전화',
    ARCHIVE: '졸업전시 아카이브'
  },

  POSITIONS: {
    // Footer 내부 바운드(964px + 52px padding)의 좌측 기준에 맞춘 고정 좌표
    // LABEL_LEFT는 메인 타이틀(최대 432px) 오른쪽 + 여백(약 54px)
    LABEL_LEFT: '538px',
    // CONTENT_LEFT는 라벨 오른쪽에 적당한 여백을 더한 위치
    CONTENT_LEFT: '650px'
  }
} as const

// 반응형 스타일 함수들
export const FOOTER_STYLES = {
  container: {
    width: '100%',
    height: FOOTER_CONSTANTS.DIMENSIONS.HEIGHT,
    position: 'relative' as const,
    background: FOOTER_CONSTANTS.COLORS.BACKGROUND,
    overflow: 'hidden' as const
  },
  // 중앙 바운드(섹션과 동일) : 964px + 좌우 52px padding
  bound: {
    position: 'relative' as const,
    width: '964px',
    maxWidth: '100%',
    height: '100%',
    margin: '0 auto',
    paddingLeft: '52px',
    paddingRight: '52px',
    boxSizing: 'border-box' as const,
  },
  
  mainTitle: {
    width: 'min(432px, 100%)',
    left: '0px',
    top: '36px',
    position: 'absolute' as const,
    color: FOOTER_CONSTANTS.COLORS.TEXT,
    fontSize: '22px',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '500',
    lineHeight: '1.5',
    wordWrap: 'break-word' as const
  },
  
  labelStyle: {
    position: 'absolute' as const,
    color: FOOTER_CONSTANTS.COLORS.TEXT,
    fontSize: '18px',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '500',
    lineHeight: '1.8',
    wordWrap: 'break-word' as const
  },
  
  contentStyle: {
    color: FOOTER_CONSTANTS.COLORS.TEXT,
    fontSize: '18px',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    wordWrap: 'break-word' as const
  },
  
  contentContainer: {
    // 바운드 내부 좌표에 맞춤
    left: FOOTER_CONSTANTS.POSITIONS.CONTENT_LEFT,
    right: '52px',
    width: 'auto',
    marginLeft: '0px',
    top: '36px',
    position: 'absolute' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'flex-start' as const,
    gap: '12px',
    display: 'inline-flex' as const
  },
  
  archiveLink: {
    left: '0px',
    top: '200px',
    position: 'absolute' as const,
    color: FOOTER_CONSTANTS.COLORS.TEXT,
    fontSize: '18px',
    fontFamily: '"rixdongnimgothic-pro", sans-serif',
    fontWeight: '400',
    textDecoration: 'underline' as const,
    lineHeight: '1.8',
    wordWrap: 'break-word' as const,
    cursor: 'pointer' as const,
    transition: 'opacity 0.2s ease'
  },
  
  colorBar: {
    width: '100vw', // 화면 전체 너비
    height: FOOTER_CONSTANTS.DIMENSIONS.BAR_HEIGHT,
    display: 'flex' as const,
    flexDirection: 'row' as const,
    position: 'relative' as const,
    left: '50%',
    transform: 'translateX(-50%)', // 중앙 정렬
    margin: '0',
    padding: '0'
  },
  
  colorSegment: (color: string) => ({
    flex: '1',
    height: FOOTER_CONSTANTS.DIMENSIONS.BAR_HEIGHT,
    background: color,
    minWidth: '0' // flex 아이템이 축소될 수 있도록
  })
}
