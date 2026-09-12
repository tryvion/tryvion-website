import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <main className="cms-home">
      <div className="ambient ambient-blue" aria-hidden="true" />
      <div className="ambient ambient-gold" aria-hidden="true" />

      <section className="cms-panel" aria-labelledby="cms-title">
        <div className="brand-area">
          <img className="tryvion-logo-image" src="/tryvion_light_logo.svg" alt="TRYVION" />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-label">Tryvion CMS</span>
        </div>

        <div className="content">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            CONTENT MANAGEMENT SYSTEM
          </div>

          <h1 id="cms-title">{user ? 'Welcome back.' : 'Welcome to TRYVION.'}</h1>

          {user ? (
            <p className="intro">
              Your content workspace is ready. You are signed in as <strong>{user.email}</strong>.
            </p>
          ) : (
            <p className="intro">
              Manage TRYVION forms, insights, media and blogs website experiences from one secure
              workspace.
            </p>
          )}

          <div className="actions">
            <a
              className="primary-action"
              href={payloadConfig.routes.admin}
              aria-label="Open TRYVION CMS admin panel"
            >
              <span>Open CMS Admin</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <footer className="footer">
          <div>
            <span className="footer-title">TRYVION</span>
            <span className="footer-separator">·</span>
            <span>The Future Is a Choice.</span>
          </div>
          <span className="footer-status">
            <span className="status-dot" aria-hidden="true" />
            Secure workspace
          </span>
        </footer>
      </section>
    </main>
  )
}
