import { useEffect, useRef } from 'react'
import { articles, navLinks, projects, site } from '../data/site'

interface BlogSectionsProps {
  onSectionChange: (sectionId: string) => void
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    el.querySelectorAll('.reveal').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return ref
}

export default function BlogSections({ onSectionChange }: BlogSectionsProps) {
  const containerRef = useReveal()

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('[data-section]')
    if (!sections) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section')
            if (id) onSectionChange(id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [onSectionChange, containerRef])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="blog" ref={containerRef}>
      <header className="blog__header">
        <a href="#hero" className="blog__logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
          <span className="blog__logo-mark">◈</span>
          <span>{site.name}</span>
        </a>
        <nav className="blog__nav" aria-label="主导航">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="blog__nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="blog__menu-btn"
          aria-label="打开菜单"
          onClick={() => document.querySelector('.blog__nav')?.classList.toggle('blog__nav--open')}
        >
          ☰
        </button>
      </header>

      <section id="hero" data-section="hero" className="hero reveal">
        <div className="hero__badge">个人博客 · 清新版</div>
        <h1 className="hero__title">
          <span className="hero__title-line">{site.name}</span>
          <span className="hero__title-sub">{site.tagline}</span>
        </h1>
        <p className="hero__desc">{site.bio}</p>
        <div className="hero__actions">
          <a href="#articles" className="btn btn--primary" onClick={(e) => { e.preventDefault(); scrollTo('articles') }}>
            阅读文章
          </a>
          <a href="#about" className="btn btn--ghost" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>
            关于我
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">{articles.length}</span>
            <span className="hero__stat-label">篇文章</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">{projects.length}</span>
            <span className="hero__stat-label">个项目</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">∞</span>
            <span className="hero__stat-label">好奇心</span>
          </div>
        </div>
      </section>

      <section id="articles" data-section="articles" className="section reveal">
        <div className="section__head">
          <h2 className="section__title">文章</h2>
          <p className="section__sub">技术笔记与实验记录</p>
        </div>
        <div className="card-grid">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className="card card--article"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="card__meta">
                <time dateTime={article.date}>{article.date}</time>
                <span>{article.readMin} min</span>
              </div>
              <h3 className="card__title">{article.title}</h3>
              <p className="card__desc">{article.summary}</p>
              <div className="card__tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a href="#" className="card__link">阅读全文 →</a>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" data-section="projects" className="section reveal">
        <div className="section__head">
          <h2 className="section__title">项目</h2>
          <p className="section__sub">实验陈列柜</p>
        </div>
        <div className="card-grid card-grid--projects">
          {projects.map((project) => (
            <article key={project.id} className="card card--project">
              <h3 className="card__title">{project.title}</h3>
              <p className="card__desc">{project.description}</p>
              <div className="card__tags">
                {project.tech.map((t) => (
                  <span key={t} className="tag tag--tech">{t}</span>
                ))}
              </div>
              <a href={project.url} className="card__link">查看项目 →</a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" data-section="about" className="section reveal">
        <div className="section__head">
          <h2 className="section__title">关于</h2>
          <p className="section__sub">实验室的主人</p>
        </div>
        <div className="about-panel">
          <div className="about-panel__avatar">
            <span>{site.author.charAt(0)}</span>
          </div>
          <div className="about-panel__body">
            <h3>{site.author}</h3>
            <p>{site.bio}</p>
            <div className="about-panel__social">
              {site.social.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span aria-hidden>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="blog__footer">
        <p>© {new Date().getFullYear()} {site.author} · {site.name}</p>
        <p className="blog__footer-sub">Built with React + Vite · 小向导陪伴中 ♡</p>
      </footer>
    </div>
  )
}
