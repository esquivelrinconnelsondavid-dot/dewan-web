; Cierra la app si está corriendo ANTES de copiar archivos.
; Sin esto el instalador pide "Reintentar": la app autoarranca con Windows
; (openAtLogin en main.cjs) y bloquea su propio .exe al actualizar.
; El wildcard cubre las variantes (DEWAN Restaurante / SC).
!macro customInit
  nsExec::Exec 'taskkill /F /T /IM "DEWAN Restaurante*"'
  Pop $0
  Sleep 1800
!macroend

; Lo mismo al desinstalar (el desinstalador sufre el mismo archivo-en-uso).
!macro customUnInit
  nsExec::Exec 'taskkill /F /T /IM "DEWAN Restaurante*"'
  Pop $0
  Sleep 1200
!macroend
