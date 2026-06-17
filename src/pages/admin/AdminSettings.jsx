export default function AdminSettings() {
  return (
    <div>
      <h1 className="mb-8 text-display-lg font-bold text-ink">사이트설정</h1>
      <div className="rounded-md border border-hairline p-6 shadow-card">
        <p className="text-body-md text-body">
          회사소개 본문(연혁, 오시는 길 등)과 회사 이미지는 현재 MVP 범위에서 정적 콘텐츠로 관리됩니다.
        </p>
        <p className="mt-2 text-body-sm text-muted">
          src/pages/company 디렉터리의 각 페이지 코드를 직접 수정하거나, Storage `company` 버킷에 이미지를
          업로드해 교체하세요.
        </p>
      </div>
    </div>
  )
}
