import re
from pathlib import Path

RAW_PATH = Path('scripts/work-media-raw.txt')
OUT_PATH = Path('app/lib/data/work-media.ts')

VIDEO_KEYWORDS = ('youtube', 'youtu.be', 'youtu', 'vimeo')

raw_lines = [line.strip() for line in RAW_PATH.read_text().splitlines() if line.strip()]
entries = []

url_pattern = re.compile(r'https?://[^\s,]+')

def extract_urls(field: str):
    field = field.strip()
    if not field or field == '없음':
        return []
    urls = url_pattern.findall(field)
    cleaned = []
    for url in urls:
        cleaned_url = url.rstrip(')."')
        cleaned.append(cleaned_url)
    return cleaned

def build_entry(field: str, uses_ai_flag: str):
    urls = extract_urls(field)
    if not urls and uses_ai_flag != 'O':
        return None
    videos = []
    prototypes = []
    for url in urls:
        lower = url.lower()
        if any(keyword in lower for keyword in VIDEO_KEYWORDS):
            videos.append(url)
        else:
            prototypes.append(url)
    entry = {}
    if videos:
        entry['videos'] = videos
    if prototypes:
        entry['prototypes'] = prototypes
    if uses_ai_flag == 'O':
        entry['usesAI'] = True
    if not entry:
        return None
    return entry

for line in raw_lines:
    parts = line.split('\t')
    if len(parts) != 6:
        raise ValueError(f'Line does not have 6 columns: {line}')
    name, student_number, innovation_field, convergence_field, innovation_ai, convergence_ai = [part.strip() for part in parts]
    innovation_entry = build_entry(innovation_field, innovation_ai)
    convergence_entry = build_entry(convergence_field, convergence_ai)
    entries.append((student_number, name, innovation_entry, convergence_entry))

entries.sort(key=lambda x: x[0])

lines = []
lines.append('// ⚠️ 자동 생성 파일입니다. 데이터를 변경하려면 `scripts/work-media-raw.txt`를 편집한 뒤')
lines.append('// `python3 scripts/generate_work_media_ts.py` 를 실행하세요.\n')
lines.append('export type WorkMediaEntry = {\n  videos?: string[]\n  prototypes?: string[]\n  usesAI?: boolean\n}\n')
lines.append('\nexport type WorkMediaMap = Record<\n  string,\n  {\n    innovation?: WorkMediaEntry\n    convergence?: WorkMediaEntry\n  }\n>\n')
lines.append('\nexport const workMediaByStudentNumber: WorkMediaMap = {')
for student_number, name, innovation_entry, convergence_entry in entries:
    lines.append(f"  // {name}")
    lines.append(f"  '{student_number}': {{")
    if innovation_entry:
        lines.append('    innovation: {')
        if 'videos' in innovation_entry:
            vids = ', '.join(f"'{v}'" for v in innovation_entry['videos'])
            lines.append(f'      videos: [{vids}],')
        if 'prototypes' in innovation_entry:
            protos = ', '.join(f"'{p}'" for p in innovation_entry['prototypes'])
            lines.append(f'      prototypes: [{protos}],')
        if innovation_entry.get('usesAI'):
            lines.append('      usesAI: true,')
        lines.append('    },')
    if convergence_entry:
        lines.append('    convergence: {')
        if 'videos' in convergence_entry:
            vids = ', '.join(f"'{v}'" for v in convergence_entry['videos'])
            lines.append(f'      videos: [{vids}],')
        if 'prototypes' in convergence_entry:
            protos = ', '.join(f"'{p}'" for p in convergence_entry['prototypes'])
            lines.append(f'      prototypes: [{protos}],')
        if convergence_entry.get('usesAI'):
            lines.append('      usesAI: true,')
        lines.append('    },')
    lines.append('  },')
lines.append('}\n')

OUT_PATH.write_text('\n'.join(lines))
