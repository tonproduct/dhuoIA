"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, FlaskConical } from "lucide-react"
import { artifacts } from "./artifacts"

const STORAGE_KEY = "lab:hidden"

export default function LabPage() {
  const [hidden, setHidden] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setHidden(JSON.parse(stored))
    setMounted(true)
  }, [])

  function hide(href: string) {
    const next = [...hidden, href]
    setHidden(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const visible = artifacts.filter((a) => !hidden.includes(a.href))

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#1e1e1e] px-10 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-10">
          <FlaskConical size={18} className="text-purple-400" />
          <h1 className="text-[15px] font-semibold text-white">Lab</h1>
          <span className="text-[13px] text-white/30">— artefatos de estudo</span>
        </div>

        {visible.length === 0 ? (
          <p className="text-sm text-white/30">
            Nenhum artefato. Adicione em{" "}
            <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/50">
              src/app/lab/artifacts.ts
            </code>
          </p>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {visible.map((artifact) => (
              <li key={artifact.href} className="group flex flex-col">
                {/* Preview */}
                <Link href={artifact.href} className="block relative rounded-lg overflow-hidden border border-white/10 bg-[#2c2c2c] aspect-[4/3] hover:border-purple-500/60 transition-colors">
                  <iframe
                    src={artifact.href}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                      width: "200%",
                      height: "200%",
                    }}
                    tabIndex={-1}
                  />
                  {/* Overlay to block interaction */}
                  <div className="absolute inset-0" />
                </Link>

                {/* Footer */}
                <div className="flex items-start justify-between gap-2 mt-2.5 px-0.5">
                  <Link href={artifact.href} className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white/90 truncate group-hover:text-purple-300 transition-colors">
                      {artifact.name}
                    </p>
                    <p className="text-[12px] text-white/35 mt-0.5 leading-snug line-clamp-2">
                      {artifact.description}
                    </p>
                  </Link>
                  <button
                    onClick={() => hide(artifact.href)}
                    title="Remover do lab"
                    className="shrink-0 mt-0.5 p-1 rounded text-white/20 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
