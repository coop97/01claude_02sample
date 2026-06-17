import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-soft">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-base font-semibold text-ink">회사정보</h3>
          <p className="text-sm text-muted">㈜회사명</p>
          <p className="text-sm text-muted">대표자: 홍길동</p>
          <p className="text-sm text-muted">서울특별시 어딘가 123</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-semibold text-ink">바로가기</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li><Link to="/company" className="hover:text-ink">회사소개</Link></li>
            <li><Link to="/products" className="hover:text-ink">제품소개</Link></li>
            <li><Link to="/community" className="hover:text-ink">커뮤니티</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-base font-semibold text-ink">고객센터</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li><Link to="/inquiries/new" className="hover:text-ink">온라인문의</Link></li>
            <li>이메일: contact@company.com</li>
            <li>전화: 02-0000-0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline-soft px-4 py-4 text-center text-[13px] text-muted-soft">
        © {new Date().getFullYear()} 회사명. All rights reserved.
      </div>
    </footer>
  )
}
