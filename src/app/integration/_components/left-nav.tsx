"use client"

import {
  LogOut,
  LayoutGrid,
  BookOpen,
  Rocket,
  MonitorDown,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Section } from "./types"

const navItems: { icon: React.ElementType; label: string; section: Section }[] = [
  { icon: LayoutGrid,  label: "Canvas",       section: "canvas"       },
  { icon: BookOpen,    label: "Documentação",  section: "documentacao" },
  { icon: Rocket,      label: "Implantação",   section: "implantacao"  },
  { icon: MonitorDown, label: "Publicação",    section: "publicacao"   },
  { icon: Settings,    label: "Configuração",  section: "configuracao" },
]

type Props = {
  active: Section
  onChange: (s: Section) => void
}

export function LeftNav({ active, onChange }: Props) {
  return (
    <aside
      className="shrink-0 flex flex-col items-center"
      style={{ width: 75, backgroundColor: "#7c22c0", height: "100%" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center w-full shrink-0" style={{ height: 56 }}>
        <button
          className="flex items-center justify-center rounded-md transition-colors hover:bg-white/10"
          style={{ width: 38, height: 38, backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <LogOut size={18} color="white" strokeWidth={1.8} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col w-full flex-1">
        {navItems.map(({ icon: Icon, label, section }) => (
          <button
            key={section}
            onClick={() => onChange(section)}
            className={cn(
              "flex flex-col items-center justify-center w-full gap-1.5 cursor-pointer transition-colors",
              active === section ? "bg-white/20" : "hover:bg-white/10"
            )}
            style={{ height: 64 }}
          >
            <Icon size={22} color="white" strokeWidth={1.6} />
            <span
              style={{
                fontSize: 9.5,
                color: "white",
                fontFamily: "Noto Sans, sans-serif",
                textAlign: "center",
                lineHeight: 1.2,
                maxWidth: 60,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
