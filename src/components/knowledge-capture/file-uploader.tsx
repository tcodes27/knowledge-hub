import { useRef, useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  FileArchive,
  FileCode,
  File as FileIcon,
  UploadCloud,
  X,
} from "lucide-react";

const FORMATS = [
  { label: "PDF", ext: "pdf" },
  { label: "Word", ext: "docx" },
  { label: "Excel", ext: "xlsx" },
  { label: "PowerPoint", ext: "pptx" },
  { label: "CSV", ext: "csv" },
  { label: "TXT", ext: "txt" },
  { label: "Markdown", ext: "md" },
  { label: "Images", ext: "img" },
  { label: "ZIP", ext: "zip" },
];

type StagedFile = { id: string; name: string; size: number; ext: string };

function extOf(name: string) {
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

function iconFor(ext: string) {
  if (["pdf"].includes(ext)) return FileText;
  if (["docx", "doc", "txt", "md", "rtf"].includes(ext)) return FileText;
  if (["xlsx", "xls", "csv"].includes(ext)) return FileSpreadsheet;
  if (["pptx", "ppt", "key"].includes(ext)) return Presentation;
  if (["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"].includes(ext)) return ImageIcon;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return FileArchive;
  if (["json", "yml", "yaml", "xml"].includes(ext)) return FileCode;
  return FileIcon;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader() {
  const [files, setFiles] = useState<StagedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: StagedFile[] = Array.from(list).map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      name: f.name,
      size: f.size,
      ext: extOf(f.name),
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  return (
    <div className="space-y-5">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload files by clicking or dragging and dropping"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border bg-background hover:border-primary/50 hover:bg-muted/40"
        }`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-6 w-6" />
        </span>
        <div>
          <p className="text-base font-semibold">Drop files here or click to browse</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Max 25 MB per file · Multiple files supported
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Supported formats
        </p>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Staged files ({files.length})
          </p>
          <ul className="space-y-2">
            {files.map((f) => {
              const Icon = iconFor(f.ext);
              return (
                <li
                  key={f.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatSize(f.size)}</span>
                      <span className="uppercase">{f.ext || "file"}</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-full rounded-full bg-primary/40" />
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                    className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-muted-foreground">Available in Phase 2 — files are not uploaded yet.</p>
        </div>
      )}
    </div>
  );
}