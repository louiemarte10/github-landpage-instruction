export interface CommandFlag {
  flag: string;
  description: string;
}

export interface CommandExample {
  comment: string;
  code: string;
}

export type CommandCategory =
  | "setup"
  | "repository"
  | "staging"
  | "history"
  | "branching"
  | "remote"
  | "undoing";

export interface Command {
  slug: string;
  name: string;
  category: CommandCategory;
  summary: string;
  description: string;
  syntax: string;
  flags: CommandFlag[];
  examples: CommandExample[];
  related: string[];
}

export const CATEGORIES: Record<CommandCategory, string> = {
  setup: "Setup & Config",
  repository: "Repository",
  staging: "Staging & Commits",
  history: "History",
  branching: "Branching",
  remote: "Remote",
  undoing: "Undoing Changes",
};

export const commands: Command[] = [
  {
    slug: "init",
    name: "git init",
    category: "repository",
    summary: "Create a new Git repository in the current directory.",
    description:
      "Initializes a new, empty Git repository by creating a hidden .git folder in the current directory. This folder stores all configuration, the object database, and the full project history. Running git init is always the first step when starting a project locally from scratch.",
    syntax: "git init [directory]",
    flags: [
      {
        flag: "--bare",
        description:
          "Create a bare repository with no working directory — used for shared/central repositories on servers.",
      },
      {
        flag: "--initial-branch <name>",
        description: "Set the name of the first branch (e.g., main instead of master).",
      },
    ],
    examples: [
      { comment: "Initialize a repo in the current folder", code: "git init" },
      {
        comment: "Initialize with main as the default branch name",
        code: "git init --initial-branch main",
      },
      {
        comment: "Create a new subdirectory and initialize inside it",
        code: "git init my-project",
      },
    ],
    related: ["clone", "config"],
  },
  {
    slug: "clone",
    name: "git clone",
    category: "repository",
    summary: "Download a remote repository to your local machine.",
    description:
      "Creates a complete local copy of a remote repository — including every branch, tag, and commit in its history. The clone is fully self-contained, so you can work offline and commit freely. By convention, the remote is named 'origin' and the default branch is checked out automatically.",
    syntax: "git clone <url> [directory]",
    flags: [
      {
        flag: "--branch <name>",
        description: "Check out a specific branch instead of the remote's default.",
      },
      {
        flag: "--depth <n>",
        description:
          "Create a shallow clone containing only the last n commits — useful for large repositories.",
      },
      {
        flag: "--single-branch",
        description: "Clone only the history of the specified branch, omitting all others.",
      },
    ],
    examples: [
      {
        comment: "Clone a repository using HTTPS",
        code: "git clone https://github.com/user/repo.git",
      },
      {
        comment: "Clone into a custom folder name",
        code: "git clone https://github.com/user/repo.git my-folder",
      },
      {
        comment: "Shallow clone — last 10 commits only",
        code: "git clone --depth 10 https://github.com/user/repo.git",
      },
    ],
    related: ["init", "remote", "fetch"],
  },
  {
    slug: "config",
    name: "git config",
    category: "setup",
    summary: "Read and write Git configuration settings.",
    description:
      "Controls how Git behaves — from your identity (name and email required before your first commit) to editor preferences, line-ending handling, and command aliases. Settings are layered: system-wide, per-user (--global), and per-repository. The most specific level always wins.",
    syntax: "git config [--global] <key> [value]",
    flags: [
      {
        flag: "--global",
        description: "Apply the setting to all repositories for the current user.",
      },
      {
        flag: "--local",
        description: "Apply the setting only to the current repository (this is the default).",
      },
      { flag: "--list", description: "Print every active configuration key-value pair." },
      { flag: "--unset <key>", description: "Remove a configuration entry." },
    ],
    examples: [
      {
        comment: "Set your global display name",
        code: 'git config --global user.name "Your Name"',
      },
      {
        comment: "Set your global commit email",
        code: 'git config --global user.email "you@example.com"',
      },
      {
        comment: "Default to main as the branch name for new repos",
        code: "git config --global init.defaultBranch main",
      },
      { comment: "View all active settings", code: "git config --global --list" },
    ],
    related: ["init"],
  },
  {
    slug: "status",
    name: "git status",
    category: "staging",
    summary: "Show which files are modified, staged, or untracked.",
    description:
      "Gives you an at-a-glance snapshot of your working directory and staging area. It tells you which files have been changed but not staged, which are staged and ready to commit, and which are brand-new files Git has not started tracking. Always run this before staging or committing to catch surprises early.",
    syntax: "git status [options]",
    flags: [
      {
        flag: "-s / --short",
        description: "Display status in a compact, abbreviated one-line-per-file format.",
      },
      {
        flag: "-b",
        description: "Include the current branch and upstream tracking info in short format.",
      },
      {
        flag: "--porcelain",
        description:
          "Machine-readable output format — stable across Git versions, ideal for scripts.",
      },
    ],
    examples: [
      { comment: "Full status with explanatory text", code: "git status" },
      { comment: "Compact one-line-per-file view", code: "git status -s" },
      { comment: "Compact view including branch info", code: "git status -sb" },
    ],
    related: ["add", "diff", "commit"],
  },
  {
    slug: "add",
    name: "git add",
    category: "staging",
    summary: "Stage changes to prepare them for the next commit.",
    description:
      "Moves changes from the working directory into the staging area. Only staged changes are included in the next commit. Staging lets you group logically related edits into a single, focused commit — even when your working directory contains unrelated changes.",
    syntax: "git add <pathspec>",
    flags: [
      {
        flag: "-A / --all",
        description:
          "Stage every change in the repository: new files, modifications, and deletions.",
      },
      {
        flag: "-p / --patch",
        description:
          "Interactively select which specific hunks (sections) within a file to stage.",
      },
      {
        flag: "-u",
        description:
          "Stage only modifications and deletions — skips new, untracked files entirely.",
      },
    ],
    examples: [
      { comment: "Stage a single file", code: "git add README.md" },
      { comment: "Stage multiple specific files", code: "git add index.html styles.css" },
      { comment: "Stage everything in the current directory", code: "git add ." },
      { comment: "Interactively choose which changes to stage", code: "git add -p" },
    ],
    related: ["status", "commit", "reset"],
  },
  {
    slug: "commit",
    name: "git commit",
    category: "staging",
    summary: "Save staged changes as a permanent snapshot in history.",
    description:
      "Creates a new commit containing everything currently in the staging area, paired with a message explaining what changed and why. Each commit is a permanent, referenceable point in your project's history. Strong commit messages — present tense, focused on intent — make future debugging and code review dramatically easier.",
    syntax: "git commit [options] -m <message>",
    flags: [
      { flag: "-m <message>", description: "Supply the commit message directly on the command line." },
      {
        flag: "-a",
        description:
          "Automatically stage all tracked modified files before committing (no separate git add needed).",
      },
      {
        flag: "--amend",
        description:
          "Modify the most recent commit — incorporate new staged changes or rewrite its message.",
      },
      {
        flag: "--no-edit",
        description: "Use with --amend to keep the original commit message unchanged.",
      },
    ],
    examples: [
      {
        comment: "Commit staged changes with a message",
        code: 'git commit -m "Add token expiry check to session handler"',
      },
      {
        comment: "Stage all tracked changes and commit in one step",
        code: 'git commit -am "Fix typo in navigation header"',
      },
      {
        comment: "Rewrite the last commit message",
        code: 'git commit --amend -m "Corrected commit message"',
      },
    ],
    related: ["add", "status", "log", "reset"],
  },
  {
    slug: "diff",
    name: "git diff",
    category: "staging",
    summary: "Show line-by-line differences between file versions.",
    description:
      "Displays exactly what changed and where — comparing the working directory against the staging area, the staging area against the last commit, or any two commits against each other. Use it before staging to review your own work, or after pulling to understand what changed upstream.",
    syntax: "git diff [options] [commit] [--] [path]",
    flags: [
      {
        flag: "--staged / --cached",
        description:
          "Compare what's staged against the last commit — shows exactly what will be committed.",
      },
      {
        flag: "--stat",
        description:
          "Show a summary of changed files and total line counts instead of a full line diff.",
      },
      {
        flag: "<branch1>..<branch2>",
        description: "Compare the tips of two branches directly.",
      },
    ],
    examples: [
      { comment: "View unstaged changes in the working directory", code: "git diff" },
      { comment: "Preview what will be included in the next commit", code: "git diff --staged" },
      { comment: "Compare two branches", code: "git diff main feature/search" },
      { comment: "Summary of changes since the last commit", code: "git diff --stat HEAD~1" },
    ],
    related: ["status", "add", "log"],
  },
  {
    slug: "log",
    name: "git log",
    category: "history",
    summary: "Browse the commit history of a branch.",
    description:
      "Shows the sequence of commits on the current branch, newest first. Each entry includes the commit hash, author, date, and message. With flags you can filter by author or date range, visualize branch topology as an ASCII graph, or search commit messages — making it the primary tool for understanding a project's evolution.",
    syntax: "git log [options] [revision range] [--] [path]",
    flags: [
      {
        flag: "--oneline",
        description: "Condense each commit to a single line: short hash + subject.",
      },
      {
        flag: "--graph",
        description: "Draw an ASCII branch-and-merge graph alongside the log entries.",
      },
      {
        flag: "--all",
        description: "Include commits from all branches, not just the currently checked-out one.",
      },
      { flag: "-n <number>", description: "Limit output to the last n commits." },
      {
        flag: "--author <pattern>",
        description: "Show only commits whose author name or email matches the pattern.",
      },
      {
        flag: "--since / --until",
        description: 'Filter commits to a date range — e.g., --since="2025-01-01".',
      },
    ],
    examples: [
      { comment: "Full log with all metadata", code: "git log" },
      { comment: "Compact single-line-per-commit view", code: "git log --oneline" },
      { comment: "Visualize all branches as a graph", code: "git log --oneline --graph --all" },
      { comment: "Show only the last 5 commits", code: "git log -5" },
      { comment: "Filter commits by author", code: 'git log --author="Jane"' },
    ],
    related: ["diff", "checkout", "branch"],
  },
  {
    slug: "branch",
    name: "git branch",
    category: "branching",
    summary: "List, create, rename, and delete branches.",
    description:
      "Branches let you develop features, fix bugs, or run experiments in complete isolation from the main codebase. The branch command manages these named pointers — you can inspect all branches, spin up new ones, or remove stale ones after merging. Note that creating a branch here does not switch to it; use checkout or switch for that.",
    syntax: "git branch [options] [branch-name]",
    flags: [
      {
        flag: "-a",
        description: "List all branches — both local and remote-tracking.",
      },
      { flag: "-r", description: "List only remote-tracking branches." },
      { flag: "-m <new-name>", description: "Rename the current branch." },
      {
        flag: "-d <name>",
        description: "Delete a branch that has already been merged (safe guard).",
      },
      {
        flag: "-D <name>",
        description: "Force-delete a branch regardless of its merge status.",
      },
    ],
    examples: [
      { comment: "List all local branches", code: "git branch" },
      { comment: "List local and remote-tracking branches", code: "git branch -a" },
      {
        comment: "Create a branch without switching to it",
        code: "git branch feature/dark-mode",
      },
      { comment: "Rename the current branch", code: "git branch -m new-name" },
      { comment: "Delete a merged branch", code: "git branch -d feature/dark-mode" },
    ],
    related: ["checkout", "merge", "log"],
  },
  {
    slug: "checkout",
    name: "git checkout",
    category: "branching",
    summary: "Switch branches or restore files to a previous state.",
    description:
      "One of Git's most versatile commands — it switches your working directory to a different branch, creates and immediately switches to a new one, or restores a single file from a past commit without changing anything else. For branch operations, the modern git switch command is clearer in intent, but checkout remains widely used.",
    syntax: "git checkout [options] <branch|commit|-- file>",
    flags: [
      {
        flag: "-b <name>",
        description: "Create a new branch and switch to it in a single step.",
      },
      {
        flag: "-- <file>",
        description:
          "Restore a file from the staging area, discarding any working directory changes to it.",
      },
      {
        flag: "<commit> -- <file>",
        description: "Restore a file exactly as it existed at a specific commit.",
      },
    ],
    examples: [
      { comment: "Switch to an existing branch", code: "git checkout main" },
      {
        comment: "Create and switch to a new branch",
        code: "git checkout -b feature/user-profile",
      },
      {
        comment: "Discard local changes to a file",
        code: "git checkout -- src/app.js",
      },
      {
        comment: "Restore a file from 3 commits ago",
        code: "git checkout HEAD~3 -- src/app.js",
      },
    ],
    related: ["branch", "stash", "reset"],
  },
  {
    slug: "merge",
    name: "git merge",
    category: "branching",
    summary: "Integrate changes from another branch into the current one.",
    description:
      "Combines the history of a source branch into the current branch. If the branches have diverged, Git creates a merge commit. If the current branch is directly behind (a fast-forward situation), Git simply advances the pointer without adding a commit. Conflicts occur when both branches edited the same lines — Git pauses so you can resolve them manually.",
    syntax: "git merge [options] <branch>",
    flags: [
      {
        flag: "--no-ff",
        description:
          "Always create a merge commit, even when a fast-forward would be possible — preserves branch history.",
      },
      {
        flag: "--squash",
        description:
          "Collapse all commits from the source branch into a single staged changeset (does not auto-commit).",
      },
      {
        flag: "--abort",
        description:
          "Cancel an in-progress conflicted merge and restore the repository to its pre-merge state.",
      },
    ],
    examples: [
      {
        comment: "Merge a feature branch into the current branch",
        code: "git merge feature/user-profile",
      },
      {
        comment: "Merge and always record a merge commit",
        code: "git merge --no-ff feature/user-profile",
      },
      { comment: "Abort a conflicted merge in progress", code: "git merge --abort" },
    ],
    related: ["branch", "rebase", "checkout", "log"],
  },
  {
    slug: "stash",
    name: "git stash",
    category: "branching",
    summary: "Temporarily shelve uncommitted changes without making a commit.",
    description:
      "Stashing saves in-progress work and returns your working directory to a clean state — ideal when you need to switch branches or pull updates without committing half-finished changes. The stash acts as a last-in-first-out stack: you can push multiple entries and restore them selectively.",
    syntax: "git stash [push|pop|list|drop|apply]",
    flags: [
      {
        flag: "push -m <message>",
        description: "Save with a descriptive label for easy identification later.",
      },
      {
        flag: "pop",
        description: "Restore the most recent stash and remove it from the stash list.",
      },
      {
        flag: "apply stash@{n}",
        description: "Restore a specific stash entry without removing it from the list.",
      },
      {
        flag: "list",
        description: "Display all stash entries with their index and description.",
      },
      {
        flag: "drop stash@{n}",
        description: "Permanently delete a specific stash entry.",
      },
    ],
    examples: [
      { comment: "Stash all current uncommitted changes", code: "git stash" },
      {
        comment: "Stash with a label",
        code: 'git stash push -m "WIP: half-done login form"',
      },
      { comment: "List all saved stash entries", code: "git stash list" },
      { comment: "Restore and remove the most recent stash", code: "git stash pop" },
      {
        comment: "Restore a specific stash by index",
        code: "git stash apply stash@{2}",
      },
    ],
    related: ["checkout", "branch", "commit"],
  },
  {
    slug: "remote",
    name: "git remote",
    category: "remote",
    summary: "Manage connections to remote repositories.",
    description:
      "Remotes are named shortcuts for repository URLs — 'origin' is the conventional name for the primary upstream. This command lets you add new remotes, view existing ones, update their URLs, and remove stale connections. Keeping remotes organized matters especially when working with forks or multiple deployment targets.",
    syntax: "git remote [subcommand] [options]",
    flags: [
      { flag: "-v", description: "List all remotes with their full fetch and push URLs." },
      {
        flag: "add <name> <url>",
        description: "Register a new remote under the given name.",
      },
      {
        flag: "set-url <name> <url>",
        description: "Replace the URL of an existing remote.",
      },
      { flag: "remove <name>", description: "Delete a remote connection." },
      { flag: "rename <old> <new>", description: "Rename a remote." },
    ],
    examples: [
      { comment: "List all remotes with URLs", code: "git remote -v" },
      {
        comment: "Connect to a GitHub repository",
        code: "git remote add origin https://github.com/user/repo.git",
      },
      {
        comment: "Update an existing remote URL",
        code: "git remote set-url origin https://github.com/user/new-repo.git",
      },
      { comment: "Remove a remote", code: "git remote remove upstream" },
    ],
    related: ["fetch", "pull", "push", "clone"],
  },
  {
    slug: "fetch",
    name: "git fetch",
    category: "remote",
    summary: "Download remote changes without modifying your working branch.",
    description:
      "Retrieves new commits, branches, and tags from a remote and stores them as remote-tracking references (e.g., origin/main). Unlike pull, fetch never touches your current branch — it is a safe, read-only way to see what changed upstream before you decide to merge or rebase.",
    syntax: "git fetch [remote] [branch]",
    flags: [
      { flag: "--all", description: "Fetch from every configured remote simultaneously." },
      {
        flag: "--prune",
        description:
          "Remove remote-tracking references for branches that were deleted on the remote.",
      },
      { flag: "--tags", description: "Also download all tags from the remote." },
    ],
    examples: [
      { comment: "Fetch all updates from origin", code: "git fetch origin" },
      { comment: "Fetch from all configured remotes", code: "git fetch --all" },
      {
        comment: "Fetch and clean up deleted remote branches",
        code: "git fetch --prune",
      },
      {
        comment: "Preview what changed upstream before merging",
        code: "git fetch origin && git log HEAD..origin/main --oneline",
      },
    ],
    related: ["pull", "merge", "remote", "log"],
  },
  {
    slug: "pull",
    name: "git pull",
    category: "remote",
    summary: "Fetch remote changes and merge them into the current branch.",
    description:
      "Runs git fetch followed by git merge (or rebase) in a single command — downloading new commits from the remote and immediately integrating them into the current branch. Always pull before pushing to avoid rejection. Use --rebase to keep a clean, linear history without merge commits.",
    syntax: "git pull [options] [remote] [branch]",
    flags: [
      {
        flag: "--rebase",
        description:
          "Replay your local commits on top of the fetched changes instead of creating a merge commit.",
      },
      {
        flag: "--no-ff",
        description: "Force a merge commit even when a fast-forward is possible.",
      },
      {
        flag: "--autostash",
        description:
          "Automatically stash local changes before pulling and reapply them afterward.",
      },
    ],
    examples: [
      { comment: "Pull and merge from origin/main", code: "git pull origin main" },
      {
        comment: "Pull with rebase for a clean linear history",
        code: "git pull --rebase origin main",
      },
      {
        comment: "Pull the current branch's configured upstream",
        code: "git pull",
      },
    ],
    related: ["fetch", "merge", "push", "rebase"],
  },
  {
    slug: "push",
    name: "git push",
    category: "remote",
    summary: "Upload local commits to a remote repository branch.",
    description:
      "Sends your committed local changes to the corresponding branch on the remote. The first push of a new branch requires -u to set the upstream tracking reference; after that, a bare git push is sufficient. A push will be rejected if the remote has newer commits — always pull first to synchronize.",
    syntax: "git push [options] [remote] [branch]",
    flags: [
      {
        flag: "-u / --set-upstream",
        description:
          "Set the remote branch as the upstream for the current local branch (required for first push of a new branch).",
      },
      {
        flag: "--force-with-lease",
        description:
          "Force-push only if nobody else has pushed since your last fetch — safer than --force.",
      },
      { flag: "--tags", description: "Push all local tags to the remote." },
      {
        flag: "--delete <branch>",
        description: "Delete a branch on the remote.",
      },
    ],
    examples: [
      {
        comment: "First push of a new branch — set upstream",
        code: "git push -u origin feature/search-bar",
      },
      { comment: "Push to origin/main", code: "git push origin main" },
      { comment: "Push all local tags", code: "git push --tags" },
      {
        comment: "Delete a remote branch",
        code: "git push origin --delete feature/old-feature",
      },
    ],
    related: ["pull", "remote", "commit"],
  },
  {
    slug: "reset",
    name: "git reset",
    category: "undoing",
    summary: "Move HEAD and optionally unstage or discard changes.",
    description:
      "Moves the current branch pointer backward to a target commit, with three modes that differ in how aggressively they clean up. Use --soft to uncommit while keeping changes staged, --mixed (default) to unstage them back to the working directory, or --hard to permanently wipe everything out. Hard resets are destructive and irreversible.",
    syntax: "git reset [--soft|--mixed|--hard] <commit>",
    flags: [
      {
        flag: "--soft",
        description: "Move HEAD to the target; all changes remain staged and ready to recommit.",
      },
      {
        flag: "--mixed (default)",
        description:
          "Move HEAD; unstage all changes but keep them in the working directory as untracked modifications.",
      },
      {
        flag: "--hard",
        description:
          "Move HEAD; permanently discard all staged and working-directory changes. Cannot be undone.",
      },
    ],
    examples: [
      {
        comment: "Undo the last commit — keep changes staged",
        code: "git reset --soft HEAD~1",
      },
      {
        comment: "Undo the last commit — unstage changes",
        code: "git reset HEAD~1",
      },
      {
        comment: "Discard the last commit AND all changes (destructive)",
        code: "git reset --hard HEAD~1",
      },
      { comment: "Unstage a specific file", code: "git reset HEAD src/app.js" },
    ],
    related: ["revert", "commit", "stash", "checkout"],
  },
  {
    slug: "revert",
    name: "git revert",
    category: "undoing",
    summary: "Undo a commit by creating a new one that reverses its changes.",
    description:
      "The safe, history-preserving way to undo changes on a shared branch. Instead of rewriting history like reset does, revert adds a brand new commit that applies the exact inverse of a previous commit's changes. This leaves the original commit intact and is completely safe to push to remotes that others are working on.",
    syntax: "git revert <commit>",
    flags: [
      {
        flag: "--no-commit",
        description:
          "Stage the reversal changes without creating a commit yet — useful for reverting several commits in one go.",
      },
      {
        flag: "-e / --edit",
        description: "Open the message editor before creating the revert commit.",
      },
    ],
    examples: [
      { comment: "Revert the most recent commit", code: "git revert HEAD" },
      {
        comment: "Revert a specific commit by its hash",
        code: "git revert abc1234",
      },
      {
        comment: "Stage the reversal without committing immediately",
        code: "git revert --no-commit HEAD~2",
      },
    ],
    related: ["reset", "log", "commit"],
  },
];

export function getCommandBySlug(slug: string): Command | undefined {
  return commands.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return commands.map((c) => c.slug);
}
