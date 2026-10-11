[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$RemoteUrl,

    [ValidateNotNullOrEmpty()]
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$rootGit = Join-Path $root ".git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is required but was not found in PATH."
}

if (Test-Path -LiteralPath $rootGit) {
    throw "A repository already exists at '$root'. This script will not alter or overwrite it."
}

if ($RemoteUrl -notmatch '^(https://|ssh://|git@)') {
    throw "RemoteUrl must be an HTTPS, SSH, or git@ GitHub remote URL."
}

$nestedGitDirs = @(
    Get-ChildItem -LiteralPath $root -Recurse -Force -Directory -Filter ".git" |
        Where-Object { $_.FullName -ne $rootGit }
)
$backupRoot = $null
$movedGitDirs = @()

if ($nestedGitDirs.Count -gt 0) {
    $rootName = Split-Path -Leaf $root
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupRoot = Join-Path (Split-Path -Parent $root) "$rootName-nested-git-backup-$stamp"

    if (Test-Path -LiteralPath $backupRoot) {
        throw "Backup destination already exists: '$backupRoot'."
    }

    New-Item -ItemType Directory -Path $backupRoot | Out-Null

    try {
        foreach ($gitDir in $nestedGitDirs) {
            $relativePath = $gitDir.FullName.Substring($root.Length).TrimStart("\", "/")
            $backupPath = Join-Path $backupRoot $relativePath
            $backupParent = Split-Path -Parent $backupPath
            New-Item -ItemType Directory -Path $backupParent -Force | Out-Null
            Move-Item -LiteralPath $gitDir.FullName -Destination $backupPath
            $movedGitDirs += [pscustomobject]@{
                OriginalPath = $gitDir.FullName
                BackupPath = $backupPath
            }
        }

        & git -C $root init -b $Branch
        if ($LASTEXITCODE -ne 0) {
            throw "git init failed."
        }
    }
    catch {
        [array]::Reverse($movedGitDirs)
        foreach ($moved in $movedGitDirs) {
            if (Test-Path -LiteralPath $moved.BackupPath) {
                $originalParent = Split-Path -Parent $moved.OriginalPath
                New-Item -ItemType Directory -Path $originalParent -Force | Out-Null
                Move-Item -LiteralPath $moved.BackupPath -Destination $moved.OriginalPath
            }
        }
        throw
    }
}
else {
    & git -C $root init -b $Branch
    if ($LASTEXITCODE -ne 0) {
        throw "git init failed."
    }
}

& git -C $root add --all
if ($LASTEXITCODE -ne 0) {
    throw "git add failed. Nested Git backups, if any, are at '$backupRoot'."
}

& git -C $root diff --cached --check
if ($LASTEXITCODE -ne 0) {
    throw "The staged diff contains whitespace errors; review it before committing."
}

$htmlFiles = @(& git -C $root ls-files -- "*.html")
$jsFiles = @(& git -C $root ls-files -- "*.js")
if ($LASTEXITCODE -ne 0 -or $htmlFiles.Count -lt 14 -or $jsFiles.Count -lt 12) {
    throw "Expected at least 14 HTML files and 12 JavaScript files in the staged collection. Review nested repository handling and ignored files."
}

& git -C $root var GIT_AUTHOR_IDENT | Out-Null
if ($LASTEXITCODE -ne 0) {
    throw "Configure git user.name and user.email before running this script."
}

& git -C $root remote add origin $RemoteUrl
if ($LASTEXITCODE -ne 0) {
    throw "Could not add origin. The repository is initialized and staged; inspect it before retrying."
}

$commitDate = [DateTimeOffset]::Now.ToString("yyyy-MM-ddTHH:mm:sszzz")
$oldAuthorDate = $env:GIT_AUTHOR_DATE
$oldCommitterDate = $env:GIT_COMMITTER_DATE
try {
    $env:GIT_AUTHOR_DATE = $commitDate
    $env:GIT_COMMITTER_DATE = $commitDate
    & git -C $root commit -m "Prepare JavaScript project collection for GitHub"
    if ($LASTEXITCODE -ne 0) {
        throw "git commit failed. Review the staged content and repository identity."
    }
}
finally {
    $env:GIT_AUTHOR_DATE = $oldAuthorDate
    $env:GIT_COMMITTER_DATE = $oldCommitterDate
}

& git -C $root push --set-upstream origin $Branch
if ($LASTEXITCODE -ne 0) {
    throw "Push failed. The local snapshot commit remains at '$root'; inspect the remote and retry the push."
}

Write-Output "Published the current-dated snapshot to $RemoteUrl on branch '$Branch'."
if ($backupRoot) {
    Write-Output "Nested Git history backups are preserved at: $backupRoot"
    Write-Output "Keep the backup until a fresh clone of the GitHub repository has been verified."
}
