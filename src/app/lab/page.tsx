"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { X, FlaskConical, RotateCcw } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { artifacts } from "./artifacts"

const STORAGE_KEY = "lab:hidden"

function LabContent() {
  const [hidden, setHidden] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const canEdit = searchParams.get("edit") === "true"

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

  function restoreAll() {
    setHidden([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const visible = artifacts.filter((a) => !hidden.includes(a.href))

  if (!mounted) return null

  return (
    <>
      {canEdit && hidden.length > 0 && (
        <button
          onClick={restoreAll}
          className="flex items-center gap-1.5 mb-6 text-[12px] text-white/30 hover:text-white/60 transition-colors"
        >
          <RotateCcw size={12} />
          Restaurar todos ({hidden.length} oculto{hidden.length > 1 ? "s" : ""})
        </button>
      )}

      {visible.length === 0 ? (
        <p className="text-sm text-white/30">Nenhum artefato visível.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {visible.map((artifact) => (
            <li key={artifact.href} className="group flex flex-col">
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
                <div className="absolute inset-0" />
              </Link>

              <div className="flex items-start justify-between gap-2 mt-2.5 px-0.5">
                <Link href={artifact.href} className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-[13px] font-medium text-white/90 truncate group-hover:text-purple-300 transition-colors">
                      {artifact.name}
                    </p>
                    {artifact.category && (
                      <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                        {artifact.category}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-white/35 leading-snug line-clamp-2">
                    {artifact.description}
                  </p>
                </Link>
                {canEdit && (
                  <button
                    onClick={() => hide(artifact.href)}
                    title="Remover do lab"
                    className="shrink-0 mt-0.5 p-1 rounded text-white/20 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5 mb-10">
          <FlaskConical size={18} className="text-purple-400" />
          <h1 className="text-[15px] font-semibold text-white">Lab</h1>
          <span className="text-[13px] text-white/30">— artefatos de estudo</span>
        </div>
        <Suspense>
          <LabContent />
        </Suspense>
      </div>
    </div>
  )
}
